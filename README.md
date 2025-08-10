# Promptimize AI — AI Prompt Improver

A modern, sleek tool to improve your AI prompts with real-time analysis, version history with side‑by‑side diffs, and easy sharing. Built with React, Vite, Tailwind CSS, TypeScript, and shadcn‑ui.

## ✨ Features

- Real‑time Prompt Analysis: Score (1–10) and actionable suggestions as you type
- Version History & Comparison: View original vs. improved prompts with diffs
- Shareable Links: Generate share links for improved prompts to collaborate
- Clean, Layered UI: Card‑based layout, refined typography, subtle animations
- Overflow‑safe Lists: Recent/Favourites chat items wrap and truncate gracefully
- SEO‑ready: Title/description meta tags, canonical link, and Open Graph image

## 🧰 Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS + tailwindcss-animate
- shadcn‑ui (Radix primitives)
- Lucide Icons

## 🚀 Getting Started

Prerequisites: Node.js 18+ and npm

1. Install dependencies
   npm install

2. Start the dev server
   npm run dev
   The app runs on http://localhost:8080

3. Build for production
   npm run build

4. Preview production build
   npm run preview

## 📁 Project Structure (excerpt)

- index.html — SEO meta, fonts (Inter), app mount
- src/main.tsx — App bootstrap
- src/pages/Index.tsx — Landing page layout
- src/components/PromptImprover.tsx — Main prompt improver UI and logic
- src/components/prompt/PromptAnalysisPanel.tsx — Live scoring/suggestions
- src/components/prompt/VersionHistoryDialog.tsx — Side‑by‑side diffs
- src/components/ui/* — Reusable shadcn‑ui components
- src/index.css — Design tokens and global styles
- tailwind.config.ts — Tailwind setup and theme tokens

## 🎨 Theming & Design System

- Typography: Inter (loaded in index.html)
- Colors: Use semantic tokens defined in src/index.css and tailwind.config.ts
- Components: Prefer shadcn‑ui primitives with project variants over custom CSS
- Animations: Use tailwindcss-animate utilities for subtle micro‑interactions

## 🧪 Using the App

1. Enter or paste a prompt in the input area
2. Click “Improve Prompt” to generate an enhanced version
3. Review the Prompt Analysis panel for score and suggestions
4. Open Version History on any improved entry to compare changes
5. Use Share on an improved entry to copy a link for collaboration

## 🔧 Development Notes

- Follow TypeScript best practices and keep components focused and small
- Use Tailwind utility classes with the project’s semantic tokens (no raw colors)
- Keep SEO tags up‑to‑date in index.html (title, description, canonical, og:image)

## 📦 Deploying

You can deploy the Vite production build to any static host (e.g., Netlify, Vercel, GitHub Pages). Build with npm run build and deploy the dist folder.

## 🤝 Contributing

Issues and PRs are welcome. Please keep changes small and focused; prefer component reuse and consistent theming.

## 📝 License

MIT © 2025
