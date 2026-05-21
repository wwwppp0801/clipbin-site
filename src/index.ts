const TARGET_URL = "https://genclipboard.ai/";
const REDIRECT_DELAY_SECONDS = 5;

export default {
  async fetch(): Promise<Response> {
    return new Response(renderHTML(), {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "refresh": `${REDIRECT_DELAY_SECONDS};url=${TARGET_URL}`,
      },
    });
  },
};

function renderHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ClipBin has moved to GenClipboard</title>
  <meta name="description" content="ClipBin is now GenClipboard. Redirecting to genclipboard.ai" />
  <link rel="canonical" href="${TARGET_URL}" />
  <meta http-equiv="refresh" content="${REDIRECT_DELAY_SECONDS};url=${TARGET_URL}" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📎</text></svg>" />
  <style>
    :root{--bg:#0a0a1a;--surface:#12122a;--border:#1e1e3a;--text:#e8e8f0;--muted:#8888aa;--accent:#3b82f6;--accent-hover:#2563eb}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
    .card{max-width:520px;width:100%;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:48px 32px;text-align:center}
    .icon{font-size:56px;margin-bottom:16px}
    h1{font-size:28px;font-weight:700;letter-spacing:-0.5px;margin-bottom:12px}
    h1 span{color:var(--accent)}
    p{color:var(--muted);font-size:15px;margin-bottom:24px}
    .countdown{font-size:14px;color:var(--muted);margin-bottom:24px}
    .countdown strong{color:var(--accent);font-family:SF Mono,Monaco,monospace;font-size:16px}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;background:var(--accent);color:#fff;font-size:15px;font-weight:600;text-decoration:none;transition:all .2s}
    .btn:hover{background:var(--accent-hover);transform:translateY(-1px)}
    .url{font-family:SF Mono,Monaco,monospace;font-size:13px;color:var(--text);word-break:break-all}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">📎</div>
    <h1>Clip<span>Bin</span> is now <span>GenClipboard</span></h1>
    <p>We've upgraded! The project has moved to a new home.</p>
    <div class="countdown">Redirecting to <span class="url">${TARGET_URL}</span> in <strong id="count">${REDIRECT_DELAY_SECONDS}</strong>s…</div>
    <a class="btn" href="${TARGET_URL}">Go now →</a>
  </div>
  <script>
    (function(){
      var el = document.getElementById('count');
      var n = ${REDIRECT_DELAY_SECONDS};
      var timer = setInterval(function(){
        n -= 1;
        if (el) el.textContent = n;
        if (n <= 0) {
          clearInterval(timer);
          window.location.replace(${JSON.stringify(TARGET_URL)});
        }
      }, 1000);
    })();
  </script>
</body>
</html>`;
}
