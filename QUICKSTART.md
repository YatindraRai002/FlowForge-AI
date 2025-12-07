# 🎯 Quick Start Guide

## For Your Friend Opening This in VS Code

### Step 1: Install Node.js (if not already installed)
1. Go to https://nodejs.org/
2. Download the LTS version
3. Install it (just click Next, Next, Finish)
4. Restart your computer

### Step 2: Open the Project
1. Open VS Code
2. Click **File** → **Open Folder**
3. Select the "multi agent workflow automator" folder
4. Click "Select Folder"

### Step 3: Open Terminal in VS Code
1. Press **Ctrl + `** (that's the backtick key, left of number 1)
2. Or go to **Terminal** → **New Terminal** from the menu
3. You should see a terminal at the bottom of VS Code

### Step 4: Install Packages
In the terminal, type this and press Enter:
```bash
npm install
```

This downloads all the needed files. Takes about 1-2 minutes. You'll see a bunch of text scrolling - that's normal!

### Step 5: Start the App
Once install finishes, type this and press Enter:
```bash
npm run dev
```

Wait a few seconds. You'll see something like:
```
VITE v7.2.6  ready in 800 ms
➜  Local:   http://localhost:3000/
```

### Step 6: Open in Browser
- Hold **Ctrl** and click the http://localhost:3000/ link
- Or just copy that link and paste it in your browser
- The app should open automatically!

## What You Can Do Now

### Homepage
- See the cool landing page with neon effects
- Click "Get Started" button

### Create Campaign Page
1. Fill in:
   - Product (e.g., "AI-powered calculator")
   - Audience (e.g., "Students and engineers")
   - Select channels (click the boxes)
2. Click "Generate Workflow"

### Watch the Workflow
- You'll see 4 agents light up one by one
- Each takes a few seconds
- Click on each card to see what they found
- Progress bar fills up
- Wait about 12 seconds total

### Final Brief
- See the complete marketing brief
- Click "Download Brief" to save it
- Click "Copy to Clipboard" to copy it

## Troubleshooting

**"npm is not recognized"**
- Node.js isn't installed or not in PATH
- Restart VS Code after installing Node.js
- Restart computer if still not working

**"Port 3000 is already in use"**
- It will automatically use 3001, 3002, etc.
- Just use whatever port it shows

**Nothing happens after npm run dev**
- Wait a bit longer (first time is slower)
- Check for error messages in red
- Make sure you ran `npm install` first

**Page looks broken**
- Refresh the browser (Ctrl + R)
- Clear cache (Ctrl + Shift + R)
- Make sure all packages installed

## Stopping the App

In the terminal, press **Ctrl + C**

It will ask "Terminate batch job? (Y/N)" - type **Y** and press Enter

## Restarting the App

Just run `npm run dev` again!

## File Structure (What's What)

```
src/
├── components/         # Reusable parts (buttons, cards, etc.)
├── pages/             # The 4 main pages you see
├── data/              # Fake data for the demo
├── context/           # Dark/light theme switcher
└── App.jsx            # Main app file
```

## Customizing (If You Want)

### Change Colors
Edit `tailwind.config.js` → look for `colors` section

### Change Agent Data
Edit `src/data/dummyData.js`

### Change What Pages Say
Edit files in `src/pages/`

## Common Questions

**Do I need an API key?**
No! Right now it uses fake data. No accounts needed.

**Can I edit the code?**
Yes! Change anything you want.

**Will changes show up automatically?**
Yes! Save the file and the browser refreshes automatically.

**Can I share this with others?**
Yes! Just zip the folder and send it.

---

That's it! You're ready to explore the app. Have fun! 🚀