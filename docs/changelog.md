<!-- CHANGELOG.md -->

# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] – 2025-06-14

### Added

- Portfolio, Projects, and Settings pages with modular component structure
- Created `PortfolioContent`, `ProjectsContent`, `SettingsContent` and corresponding Shell components
- Each page now imports its Shell and Content as ReactNode for future extensibility

### Changed

- Updated landing page container to use `min-h-screen` for full viewport height

### Fixed

- None for this patch

## [0.3.0] – 2025-06-14

### Added

- **Supabase Local Development**: Complete local Supabase setup with PostgreSQL database
- **Database Schema**: Comprehensive schema with `portfolios`, `projects`, and `build_logs` tables
- **Row Level Security**: RLS policies for secure data access with user authentication
- **Project Pipeline Functions**: SQL functions for creating projects with Docker pipeline integration
- **Environment Configuration**: Local development environment variables and JWT tokens
- **Database Integration Testing**: Verification scripts for database connectivity and table operations

### Changed

- **Migration System**: Fixed migration errors related to `next_auth` schema references
- **Environment Setup**: Updated `.env.local` with proper local Supabase configuration
- **Project Pipeline**: Enhanced `project-pipeline.ts` with proper Docker container building logic

### Fixed

- **Supabase Migration Errors**: Resolved `next_auth` schema reference issues in migration files
- **JWT Token Configuration**: Corrected JWT tokens for local development authentication
- **Docker Volume Cleanup**: Proper cleanup of Docker volumes for fresh database resets
- **ESLint Issues**: Fixed unused variable warnings in project pipeline module
- **JSONB Casting**: Corrected PostgreSQL JSONB type casting in database functions

### Technical Details

- **Database URL**: `postgresql://postgres:postgres@127.0.0.1:54323/postgres`
- **API Endpoint**: `http://127.0.0.1:54321`
- **Studio UI**: `http://127.0.0.1:54324`
- **Storage Buckets**: Configured for avatars, project previews, and assets

## [0.2.0] – 2025-06-14

### Added

- **Landing Page Components**: Complete landing page structure with hero section, site header, and layout
- **UI Component Library**: Comprehensive set of shadcn/ui components including cards, buttons, inputs, menus, and more
- **Responsive Design**: Mobile-first responsive design system with Tailwind CSS
- **Modern Hero Section**: Large gradient title display, improved call-to-action buttons, and feature access buttons
- **Enhanced Navigation**: Sticky header with backdrop blur, improved menubar navigation, and profile dropdown

### Changed

- **Hero Section Redesign**: Updated to feature "Kapsules" as the main title with large gradient typography
- **Site Header Layout**: Simplified navigation structure with better responsive behavior
- **Color Scheme**: Implemented consistent green accent colors with zinc dark theme
- **Layout Structure**: Improved semantic HTML structure and accessibility

### Fixed

- **Component Syntax**: Fixed invalid comment syntax and import statements in layout components
- **Card Structure**: Corrected card component hierarchy and removed invalid CardAction usage
- **Responsive Issues**: Fixed layout problems on mobile and desktop viewports

## [0.1.0] – 2025-06-13

### Added

- Initial Next.js scaffold via  
  `npx create-next-app@latest . --typescript --eslint --tailwind`

_(Project at its earliest phase: nothing beyond the base app exists yet.)_

---

## 📋 **Development History**

For a comprehensive analysis of all git commits, development phases, and code statistics, see the detailed [Git Commit Log](git-commit-log.md).

**Quick Stats:**

- **Total Commits**: 21 commits over 25 hours
- **Code Growth**: ~28,000 net lines added
- **Major Milestones**: 6 key development phases
- **Latest Focus**: Database integration and authentication system
