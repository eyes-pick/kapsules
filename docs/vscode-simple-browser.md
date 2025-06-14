# 🌐 VS Code Simple Browser Configuration

## Overview

Your VS Code is now configured to automatically open local development links in the Simple Browser when you click them in the terminal.

## How It Works

When you run development commands like:

```bash
npm run dev
npm run supabase:start
```

The terminal will show clickable links like:

- `http://localhost:3000` (Next.js app)
- `http://127.0.0.1:54324` (Supabase Studio)

**Simply click these links** and they will automatically open in VS Code's Simple Browser instead of your external browser.

## Configuration Details

The `.vscode/settings.json` file configures:

### 🔗 **Link Handling**

```json
"workbench.externalUriOpeners": {
  "http://localhost*": "vscode.simple-browser",
  "http://127.0.0.1*": "vscode.simple-browser"
}
```

### 🖥️ **Terminal Settings**

- Links are enabled and clickable
- Enhanced cursor and font settings
- Auto-save and format on save for better workflow

## Benefits

✅ **One-Click Access** - Click terminal links to open in Simple Browser  
✅ **Integrated Workflow** - No window switching needed  
✅ **Side-by-Side Development** - Code and app in same VS Code window  
✅ **Automatic Configuration** - Works for all local development URLs

## Manual Access

If you need to manually open the Simple Browser:

1. `Ctrl+Shift+P` (Command Palette)
2. Type "Simple Browser: Show"
3. Enter your URL (e.g., `http://localhost:3000`)

## External Browser

If you need to open a link in your external browser:

1. Right-click the link in terminal
2. Select "Open in External Browser"

---

_Now you can click any development URL in the terminal and it will open in VS Code's integrated Simple Browser! 🎉_
