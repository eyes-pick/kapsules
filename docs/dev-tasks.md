<!-- docs/dev-tasks.md -->

# Developer Task List

A modular, phase-driven breakdown of upcoming work. Check off completed items as you go.

---

## Phase 1: Foundation & Tooling

1. **Project scaffold**
   - [x] Next.js app initialization (v0.1.0)
2. **Styling & lint**
   - [ ] Integrate Tailwind CSS
   - [ ] Configure `tailwind.config.ts` & base styles
   - [ ] Enable ESLint + Prettier with TS support
3. **UI library setup**
   - [ ] Install shadcn/ui & Radix primitives
   - [ ] Create a ThemeProvider wrapper

---

## Phase 2: Prompt-Driven CLI/UI

1. **Prompt input**
   - [ ] Build `<PromptInput>` React component
   - [ ] Wire up model selector dropdown
2. **Mode switch**
   - [ ] Implement ask/chat/edit toggle component
   - [ ] Expose mode state to prompt processor

---

## Phase 3: Core AI & Code-Gen Engine

1. **Prompt processor**
   - [ ] Define frontend service to send prompts to LLM
   - [ ] Map intents to generation modules
2. **Code generator modules**
   - [ ] UI scaffold generator (React + shadcn/ui)
   - [ ] API/data model generator (TypeScript interfaces + endpoints)
   - [ ] File-system & ZIP packaging service

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
