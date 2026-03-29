export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/download") {
      return Response.redirect(
        "https://github.com/wwwppp0801/clipbin/releases/latest",
        302
      );
    }

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ClipBin — Clipboard Manager for macOS</title>
  <meta name="description" content="A lightweight, fast clipboard manager for macOS. Capture text, images, files. Search, pin, organize. Paste with a keystroke." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📎</text></svg>" />
  <style>
    :root {
      --bg: #0a0a1a;
      --surface: #12122a;
      --border: #1e1e3a;
      --text: #e8e8f0;
      --muted: #8888aa;
      --accent: #3b82f6;
      --accent-hover: #2563eb;
      --green: #22c55e;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

    /* Hero */
    .hero {
      text-align: center;
      padding: 80px 0 60px;
    }
    .hero-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    .hero h1 {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1px;
      margin-bottom: 12px;
    }
    .hero h1 span { color: var(--accent); }
    .hero p {
      font-size: 20px;
      color: var(--muted);
      max-width: 560px;
      margin: 0 auto 32px;
    }
    .hero-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: var(--accent);
      color: #fff;
    }
    .btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
    .btn-secondary {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover { border-color: var(--accent); }
    .badge {
      display: inline-block;
      background: var(--green);
      color: #000;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 20px;
      margin-left: 4px;
    }

    /* Screenshot */
    .screenshot {
      text-align: center;
      padding: 40px 0;
    }
    .screenshot img {
      max-width: 100%;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    /* Features */
    .features {
      padding: 60px 0;
    }
    .features h2 {
      text-align: center;
      font-size: 32px;
      margin-bottom: 40px;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .feature-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
    }
    .feature-card .icon { font-size: 28px; margin-bottom: 8px; }
    .feature-card h3 { font-size: 16px; margin-bottom: 6px; }
    .feature-card p { font-size: 14px; color: var(--muted); }

    /* Shortcuts */
    .shortcuts {
      padding: 60px 0;
    }
    .shortcuts h2 {
      text-align: center;
      font-size: 32px;
      margin-bottom: 32px;
    }
    .shortcut-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      max-width: 640px;
      margin: 0 auto;
    }
    .shortcut {
      display: flex;
      justify-content: space-between;
      padding: 10px 16px;
      background: var(--surface);
      border-radius: 8px;
      font-size: 14px;
    }
    .shortcut .keys {
      font-family: SF Mono, Monaco, monospace;
      color: var(--accent);
      font-size: 13px;
    }

    /* Tech */
    .tech {
      padding: 60px 0;
      text-align: center;
    }
    .tech h2 { font-size: 32px; margin-bottom: 16px; }
    .tech p { color: var(--muted); margin-bottom: 32px; }
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
    .tech-tag {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      color: var(--muted);
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
      text-align: center;
      color: var(--muted);
      font-size: 13px;
    }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    @media (max-width: 640px) {
      .hero h1 { font-size: 32px; }
      .hero p { font-size: 16px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <section class="hero">
      <div class="hero-icon">📎</div>
      <h1>Clip<span>Bin</span></h1>
      <p>A lightweight, fast clipboard manager for macOS. Capture everything you copy. Find and paste instantly.</p>
      <div class="hero-buttons">
        <a href="/download" class="btn btn-primary">
          ⬇ Download for macOS <span class="badge">FREE</span>
        </a>
        <a href="https://github.com/wwwppp0801/clipbin" class="btn btn-secondary">
          GitHub
        </a>
      </div>
    </section>

    <section class="screenshot">
      <img src="https://raw.githubusercontent.com/wwwppp0801/clipbin/main/docs/images/01-main-view.png"
           alt="ClipBin clipboard manager interface" />
    </section>

    <section class="features">
      <h2>Everything you need</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon">📋</div>
          <h3>Smart Capture</h3>
          <p>Automatically captures text, rich text, images, files, URLs, and JSON. Detects content type intelligently.</p>
        </div>
        <div class="feature-card">
          <div class="icon">🔍</div>
          <h3>Instant Search</h3>
          <p>Full-text search across your entire clipboard history. Find anything in milliseconds with SQLite FTS5.</p>
        </div>
        <div class="feature-card">
          <div class="icon">⌨️</div>
          <h3>Keyboard First</h3>
          <p>12+ keyboard shortcuts. Press 1-9 to quick paste. Arrow keys to navigate. Tab to search. It's fast.</p>
        </div>
        <div class="feature-card">
          <div class="icon">📌</div>
          <h3>Pin & Organize</h3>
          <p>Pin important clips. Create collections. Pinned items survive clear and never expire.</p>
        </div>
        <div class="feature-card">
          <div class="icon">📸</div>
          <h3>Screenshot Editor</h3>
          <p>Cmd+Shift+A to screenshot. Built-in editor with arrows, shapes, text annotations. Copy or save.</p>
        </div>
        <div class="feature-card">
          <div class="icon">🔒</div>
          <h3>Privacy First</h3>
          <p>All data stays on your Mac. Ignore password managers automatically. No cloud, no tracking.</p>
        </div>
        <div class="feature-card">
          <div class="icon">🎯</div>
          <h3>Click to Paste</h3>
          <p>Select a clip and it's instantly pasted into your active app. Simulates Cmd+V like Maccy does.</p>
        </div>
        <div class="feature-card">
          <div class="icon">🎨</div>
          <h3>Beautiful UI</h3>
          <p>Dark card carousel at the bottom of your screen. Slide animations. Source app tracking. Clean design.</p>
        </div>
        <div class="feature-card">
          <div class="icon">💾</div>
          <h3>Export & Import</h3>
          <p>Export your clipboard history as JSON. Import on another machine. Never lose your snippets.</p>
        </div>
      </div>
    </section>

    <section class="shortcuts">
      <h2>Keyboard shortcuts</h2>
      <div class="shortcut-grid">
        <div class="shortcut"><span>Toggle panel</span><span class="keys">⇧⌘V</span></div>
        <div class="shortcut"><span>Screenshot</span><span class="keys">⇧⌘A</span></div>
        <div class="shortcut"><span>Quick paste</span><span class="keys">1-9</span></div>
        <div class="shortcut"><span>Paste selected</span><span class="keys">Enter</span></div>
        <div class="shortcut"><span>Copy only</span><span class="keys">⌘C</span></div>
        <div class="shortcut"><span>Toggle pin</span><span class="keys">⌘P</span></div>
        <div class="shortcut"><span>Navigate</span><span class="keys">← →</span></div>
        <div class="shortcut"><span>Delete clip</span><span class="keys">⌫</span></div>
        <div class="shortcut"><span>Search</span><span class="keys">Tab</span></div>
        <div class="shortcut"><span>Dismiss</span><span class="keys">Esc</span></div>
      </div>
    </section>

    <section class="tech">
      <h2>Built with modern tech</h2>
      <p>Native performance, tiny footprint, open source.</p>
      <div class="tech-tags">
        <span class="tech-tag">Tauri 2.0</span>
        <span class="tech-tag">Rust</span>
        <span class="tech-tag">React 19</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">SQLite</span>
        <span class="tech-tag">Tailwind CSS</span>
        <span class="tech-tag">Core Graphics</span>
        <span class="tech-tag">NSPasteboard</span>
      </div>
    </section>
  </div>

  <footer>
    <div class="container">
      <p>ClipBin is open source. <a href="https://github.com/wwwppp0801/clipbin">View on GitHub</a></p>
      <p style="margin-top:8px">Made with Rust + React. 2.6 MB download. macOS 10.15+</p>
    </div>
  </footer>
</body>
</html>`;
