# AI Agent Onboarding & Collaboration Guide

> _Intended for AI-driven development assistants joining the **Kapsules by GENR8** project._

---

## 1. Purpose & Scope

- **Objective**: Assist human developers by generating, reviewing, and refactoring code for Kapsules by GENR8’s early-stage Next.js scaffold and future modules.
- **Boundaries**:
  - _Allowed_: Propose code snippets, unit tests, documentation updates, task breakdowns.
  - _Not Allowed_: Directly push to `main` branch; perform deployments without human approval; manage secrets or credentials.

---

## 2. Environment Setup

1. **Clone repo**
   ```bash
   git clone https://github.com/your-org/kapsules.git
   cd kapsules
   ```
2. **Install dependencies**
   ```bash
   npm install
   npm run dev
   ```
3. **Verify baseline**
   - Confirm Next.js starter page at `http://localhost:3000`.
   - Run lint & typecheck:
     ```bash
     npm run lint
     npm run typecheck
     ```

---

## 3. Collaboration Workflow

### 3.1 Task Intake

- Read human-assigned tickets or issue descriptions in our issue tracker.
- Acknowledge context, ask clarification questions if ambiguous.

### 3.2 Branching & PR Protocol

1. **Branch**
   - Create feature branch:  
     `git checkout -b feat/your-feature-description`
2. **Work & Commit**
   - Break work into atomic commits, each with a clear message:
     ```
     feat(ui): add PromptInput component with model selector
     test(prompt): add unit tests for PromptInput validation
     fix(lint): correct Tailwind config key ordering
     ```
   - **Leave detailed comments** in code and commit messages explaining the “why” behind changes and any non-obvious logic.
3. **Pull Request**
   - Base: `develop`
   - Title format: `[FEATURE] Short description`
   - Include:
     - Summary of changes
     - Screenshots or code samples (if UI-related)
     - Any manual test steps

---

## 4. Code Style & Conventions

### 4.1 File Structure

- **/components** – Reusable UI components
- **/pages** – Next.js page entries
- **/lib** – Utilities, API clients
- **/docs** – Project documentation

### 4.2 Naming

- **Components**: PascalCase (e.g. `PromptInput.tsx`)
- **Hooks**: prefix `use` (e.g. `useSandboxReload.ts`)
- **Files**: dash-separated for utilities (e.g. `prompt-parser.ts`)

### 4.3 Formatting

- **Prettier** + **ESLint**
- Tailwind classes sorted with [clsx ordering conventions]
- No trailing semicolons in JSX/TSX

---

## 5. Testing & Quality Assurance

- **Unit Tests**: Jest + React Testing Library
- **Snapshots**: Only for pure UI output
- **End-to-End**: Cypress for critical user flows
- **Coverage**: Maintain ≥ 80% overall

---

## 6. CI/CD Integration

- **GitHub Actions** runs on every PR:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test -- --ci`
- Do not modify workflows without human review.

---

## 7. Security & Data Handling

- Never log or commit secrets/API keys.
- If handling user data, ensure compliance with privacy policies.
- Flag any security concerns as high-priority issues.

---

## 8. Communication & Escalation

- **Clarifications**: Post in the PR comment thread or open a dedicated issue.
- **Blocking Issues**: Label with `blocker` and notify the lead developer in Slack.

---

## 9. Human Handoff & Termination

- Upon completion of a feature or milestone, request human review and merge approval.
- If instructed to stand down, clean up temporary branches and notify the team.

---

> _Last updated: 2025-06-13_
