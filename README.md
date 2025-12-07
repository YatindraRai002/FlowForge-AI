# 🚀 Multi-Agent Workflow Automator

A modern web app that uses AI agents to generate complete marketing briefs automatically.

## What This Does

Instead of manually researching markets, writing copy, and planning campaigns - this app does it all for you using 4 specialized AI agents working together.

## Quick Start

```bash
# Install dependencies
npm install

# Start the app
npm run dev
```

Then open http://localhost:3000 in your browser.

## The 4 Pages

1. **Landing Page** - Shows what the app does
2. **Create Campaign** - Fill in your product details
3. **Workflow** - Watch the AI agents work
4. **Final Brief** - Download your complete marketing brief

## Tech Stack

- React 19
- TailwindCSS 3 (for styling)
- Framer Motion (for animations)
- Vite (build tool)
- React Router (navigation)

## Folder Structure

```
src/
├── components/     # Reusable UI pieces
├── context/        # Theme system
├── data/          # Sample data
├── pages/         # The 4 main pages
├── App.jsx        # Main app
└── index.css      # Styles
```

## Features

✅ Beautiful neon-themed UI
✅ Smooth animations
✅ Dark/Light mode
✅ Fully responsive
✅ Ready to use

## How It Works

1. You enter product details
2. AI agents run in sequence:
   - Research Agent → analyzes market
   - Copywriter Agent → writes ad copy
   - Art Director → creates visual direction
   - Manager Agent → compiles everything
3. You get a complete marketing brief

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Sharing with Friends

Just zip the folder and share! They need:
1. Node.js installed
2. Run `npm install`
3. Run `npm run dev`

That's it!

## Customization

- Colors: Edit `tailwind.config.js`
- Agent data: Edit `src/data/dummyData.js`
- Pages: Check `src/pages/`

## What's NOT Included

This is frontend only:
- ❌ No real backend
- ❌ No database
- ❌ Uses dummy data for demo
- ✅ Ready to connect your own backend

## Need Help?

Check `QUICKSTART.md` for detailed step-by-step guide.

---

Built with React + TailwindCSS + Framer Motion 🎨