-- Fix for function_search_path_mutable warning
-- This migration secures the next_auth.uid function by setting a fixed search_path

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS next_auth.uid();

-- Recreate the function with a secure search_path
CREATE OR REPLACE FUNCTION next_auth.uid()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
-- Set explicit search_path to prevent injection attacks
SET search_path = ''
AS $$
    SELECT COALESCE(
        current_setting('request.jwt.claim.sub', true),
        (current_setting('request.jwt.claims', true)::json ->> 'sub')
    )::uuid;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION next_auth.uid() TO authenticated;
GRANT EXECUTE ON FUNCTION next_auth.uid() TO service_role;

-- Add comment explaining the security fix
COMMENT ON FUNCTION next_auth.uid() IS 'Secure version of uid function with fixed search_path to prevent injection attacks';
