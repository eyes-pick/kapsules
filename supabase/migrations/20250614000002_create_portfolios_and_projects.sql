-- Create portfolios table (public profiles)
CREATE TABLE portfolios (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default now(),
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  bio text,
  skills text[],
  is_public boolean default true,

  constraint username_length check (char_length(username) >= 3)
);

-- Create projects table with Docker/AI pipeline integration
CREATE TABLE projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  project_id text not null, -- User-friendly identifier
  
  -- Project metadata
  title text not null,
  description text,
  prompt text not null, -- Original AI prompt
  
  -- Docker/Build pipeline
  docker_image_id text, -- Docker container ID
  build_status text default 'pending' check (build_status in ('pending', 'building', 'built', 'failed')),
  build_logs text,
  
  -- Vite/TypeScript app details
  vite_config jsonb default '{}',
  package_json jsonb default '{}',
  source_files jsonb default '{}', -- File structure as JSON
  
  -- AI interpretation
  ai_interpretation jsonb default '{}', -- Parsed prompt analysis
  ai_modifications jsonb default '[]', -- Array of AI-generated changes
  
  -- Preview/Deployment
  preview_url text, -- Sandboxed iframe URL
  is_public boolean default false,
  
  -- Project organization
  tags text[],
  technologies text[] default array['vite', 'typescript'],
  
  -- Timestamps
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  last_built_at timestamp with time zone,
  
  -- Ensure unique project_id per user
  constraint unique_user_project unique (user_id, project_id)
);

-- Create build_logs table for detailed pipeline tracking
CREATE TABLE build_logs (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  stage text not null, -- 'docker_init', 'ai_analysis', 'code_gen', 'build', 'deploy'
  status text not null check (status in ('started', 'completed', 'failed')),
  message text,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now()
);

-- Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_logs ENABLE ROW LEVEL SECURITY;

-- Portfolio policies
CREATE POLICY "Public portfolios viewable by everyone" ON portfolios
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage own portfolio" ON portfolios
  FOR ALL USING ((SELECT auth.uid()) = id);

-- Project policies
CREATE POLICY "Public projects viewable by everyone" ON projects
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage own projects" ON projects
  FOR ALL USING ((SELECT auth.uid()) = user_id);

-- Build logs policies
CREATE POLICY "Users can view own build logs" ON build_logs
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = (SELECT auth.uid())
    )
  );

-- Auto-create portfolio trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.portfolios (id, full_name, avatar_url, username)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to create new project with Docker pipeline
CREATE OR REPLACE FUNCTION public.create_project_with_pipeline(
  p_title text,
  p_description text,
  p_prompt text,
  p_project_id text DEFAULT NULL
)
RETURNS uuid
SET search_path = ''
AS $$
DECLARE
  v_project_id uuid;
  v_user_project_id text;
BEGIN
  -- Generate project_id if not provided
  v_user_project_id := COALESCE(p_project_id, lower(replace(p_title, ' ', '-')) || '-' || substring(gen_random_uuid()::text, 1, 8));
  
  -- Create project
  INSERT INTO public.projects (
    user_id,
    project_id,
    title,
    description,
    prompt,
    build_status,
    vite_config,
    package_json
  ) VALUES (
    (SELECT auth.uid()),
    v_user_project_id,
    p_title,
    p_description,
    p_prompt,
    'pending',    '{"build": {"outDir": "dist"}, "server": {"port": 3000}}'::jsonb,
    ('{"name": "' || v_user_project_id || '", "version": "1.0.0", "type": "module"}')::jsonb
  ) RETURNING id INTO v_project_id;
  
  -- Log initial build stage
  INSERT INTO public.build_logs (project_id, stage, status, message)
  VALUES (v_project_id, 'docker_init', 'started', 'Initializing Docker container');
  
  RETURN v_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update build status
CREATE OR REPLACE FUNCTION public.update_build_status(
  p_project_id uuid,
  p_stage text,
  p_status text,
  p_message text DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'
)
RETURNS void
SET search_path = ''
AS $$
BEGIN
  -- Update project build status if it's a final stage
  IF p_stage IN ('build', 'deploy') AND p_status IN ('completed', 'failed') THEN
    UPDATE public.projects 
    SET 
      build_status = CASE WHEN p_status = 'completed' THEN 'built' ELSE 'failed' END,
      last_built_at = CASE WHEN p_status = 'completed' THEN now() ELSE last_built_at END,
      updated_at = now()
    WHERE id = p_project_id AND user_id = (SELECT auth.uid());
  END IF;
  
  -- Log the build stage
  INSERT INTO public.build_logs (project_id, stage, status, message, metadata)
  VALUES (p_project_id, p_stage, p_status, p_message, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('project-previews', 'project-previews', true),
  ('project-assets', 'project-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND (SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Project previews are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-previews');

CREATE POLICY "Users can manage project assets" ON storage.objects
  FOR ALL USING (
    bucket_id IN ('project-previews', 'project-assets') 
    AND (SELECT auth.uid()) IS NOT NULL
  );
