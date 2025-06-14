<!-- docs/dev-tasks.md -->

# Developer Task List

A modular, phase-driven breakdown of upcoming work. Check off completed items as you go.

---

## Phase 1: Foundation & Tooling

1. **Project scaffold**
   - [x] Next.js app initialization (v0.1.0)
2. **Styling & lint**
   - [x] Integrate Tailwind CSS
   - [x] Configure `tailwind.config.ts` & base styles
   - [x] Enable ESLint + Prettier with TS support
3. **UI library setup**
   - [x] Install shadcn/ui & Radix primitives
   - [x] Create a ThemeProvider wrapper
4. **Database & Backend**
   - [x] Set up Supabase local development environment
   - [x] Configure PostgreSQL database with migrations
   - [x] Implement database schema (portfolios, projects, build_logs)
   - [x] Set up Row Level Security (RLS) policies
   - [x] Create project pipeline functions
   - [x] Configure environment variables for local development

---

## Phase 2: Prompt-Driven CLI/UI

1. **Prompt input**
   - [ ] Build `<PromptInput>` React component
   - [ ] Wire up model selector dropdown
2. **Mode switch**
   - [ ] Implement ask/chat/edit toggle component
   - [ ] Expose mode state to prompt processor
3. **Page Routing & Modularization**
   - [x] Create Portfolio, Projects, and Settings pages
   - [x] Modularize each page with Content and Shell components
   - [x] Use ReactNode for Shell composition in each page

---

## Phase 3: Core AI & Code-Gen Engine

1. **Prompt processor**
   - [x] Define basic project pipeline structure
   - [ ] Integrate with AI/LLM services for code generation
   - [ ] Map intents to generation modules
2. **Code generator modules**
   - [ ] UI scaffold generator (React + shadcn/ui)
   - [ ] API/data model generator (TypeScript interfaces + endpoints)
   - [ ] File-system & ZIP packaging service
3. **Docker Integration**
   - [x] Create Docker container building framework
   - [ ] Implement actual Docker API integration
   - [ ] Set up containerized build pipeline

---

## Phase 4: Live-Preview Sandbox

1. **Embed sandbox**
   - [ ] Create `<SandboxFrame>` wrapping an iframe
   - [ ] Implement hot-reload on file updates
2. **Security & isolation**
   - [ ] Evaluate sandboxing strategy (postMessage, CSP)
   - [ ] Integrate resource limits

---

## Phase 5: Quality, CI/CD & Testing

1. **CI pipeline**
   - [ ] GitHub Actions: lint, typecheck, build, test
   - [ ] Dockerfile for consistent dev container
2. **Automated tests**
   - [ ] Unit tests for prompt processor
   - [ ] Snapshot tests for generated UI

---

## Phase 6: Documentation & Templates

1. **Docs expansion**
   - [ ] Flesh out `docs/getting-started.md`
   - [ ] Detail `docs/architecture.md` & `docs/roadmap.md`
2. **Template library**
   - [ ] Define folder structure for reusable app templates
   - [ ] Provide one example template

---

## Phase 7: Deployment & Release

1. **One-click deploy**
   - [ ] Vercel/Netlify integration
   - [ ] CLI flag for “deploy” command
2. **Versioning & changelogs**
   - [ ] Automate changelog generation on release
   - [ ] Tag releases with GitHub Actions

---

## Development Notes & Recent Progress

### ✅ Recently Completed (v0.3.0)

- **Supabase Local Setup**: Successfully configured local development environment with PostgreSQL
- **Database Schema**: Created comprehensive schema with user portfolios, AI projects, and build logging
- **Migration System**: Fixed and optimized database migrations for clean deployment
- **Environment Configuration**: Properly configured JWT tokens and local database connections
- **Code Quality**: Resolved ESLint issues and improved project pipeline implementation

### 🔧 Current Development Status

- **Database**: Fully functional with all tables, RLS policies, and stored procedures
- **Authentication**: JWT tokens configured for local development
- **Project Pipeline**: Basic structure in place, ready for AI integration
- **Frontend**: Landing page components and UI library ready
- **Next Steps**: Ready to integrate AI/LLM services for code generation

### 🎯 Immediate Next Tasks

1. **AI Integration**: Connect to OpenAI/Claude API for prompt processing
2. **Prompt Interface**: Build the main prompt input component
3. **Code Generation**: Implement actual code generation from AI responses
4. **Docker Integration**: Complete Docker API integration for containerized builds
5. **Authentication Flow**: Implement user signup/login with Supabase Auth

### 📝 Technical Debt & Improvements

- [ ] Add proper error handling to project pipeline
- [ ] Implement comprehensive logging system
- [ ] Add unit tests for database functions
- [ ] Optimize database queries and indexes
- [ ] Add proper TypeScript types for all database operations

---
