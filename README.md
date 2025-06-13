# Kapsules by GENR8

**Status:** 🚧 Early Development — Project scaffold initialized, core features pending implementation.

---

## 🚀 Overview

Kapsules by GENR8 aims to be an AI-driven, no-code platform for generating full-stack web applications from natural language prompts. At this stage, we have:

- Initialized a Next.js application.
- Set up core dependencies and basic project structure.

Further development will expand the AI integration, live preview, and modular scaffolding capabilities.

---

## 🏁 Getting Started

1. **Clone Repository**

   ```bash
   git clone https://github.com/eyes-pick/kapsules.git
   cd kapsules
   ```

2. **Initialize Next.js App**

   ```bash
   npx create-next-app@latest . --typescript --eslint --tailwind
   ```

3. **Install Additional Dependencies**

   ```bash
   npm install shadcn@latest @radix-ui/react
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Verify Setup**

   - Navigate to [http://localhost:3000](http://localhost:3000) to confirm the Next.js starter page.

---

## 📚 Project Roadmap

1. **AI Prompt Processing** — Define architecture for parsing and mapping user prompts to code templates. (_TBD_)
2. **Modular Code Generators** — Create independent modules for UI scaffolding, data models, and API endpoints. (_TBD_)
3. **Live Preview Integration** — Embed sandboxed iframe for real-time code execution. (_TBD_)
4. **Deployment Scripts** — Automate one-click deployments to Vercel, Netlify, and AWS. (_TBD_)
5. **Template Library** — Build reusable component and schema templates. (_TBD_)

---

## 📂 Project Structure (Initial)

```
/
├── pages/                # Next.js pages
├── public/               # Static assets
├── components/           # React components
├── styles/               # Global and Tailwind styles
├── .eslintrc.js          # Linting config
├── tailwind.config.js    # Tailwind config
└── tsconfig.json         # TypeScript config
```

---

## 🤝 Contributing

Contributions are welcome at any stage:

1. Fork the repo.
2. Create a branch: `git checkout -b feature/<name>`.
3. Commit changes: `git commit -m "feat: description"`.
4. Push branch: `git push origin feature/<name>`.
5. Open a PR describing your updates.

Please adhere to our code style and include tests where applicable.

---

## 📄 License

This project is under the MIT License. See [LICENSE](LICENSE.md) for details.
