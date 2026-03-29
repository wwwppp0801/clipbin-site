export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/download") {
      return Response.redirect(
        "https://github.com/wwwppp0801/clipbin/releases/latest",
        302
      );
    }

    // Detect language: /en, /zh, /ja, /ko path, or Accept-Language header
    let lang = "";
    const pathLang = url.pathname.replace(/^\//, "").replace(/\/.*/, "");

    if (pathLang && translations[pathLang]) {
      lang = pathLang;
    } else if (pathLang === "") {
      // Root path: use Accept-Language
      const accept = request.headers.get("Accept-Language") || "";
      if (accept.match(/^zh/i)) lang = "zh";
      else if (accept.match(/^ja/i)) lang = "ja";
      else if (accept.match(/^ko/i)) lang = "ko";
      else lang = "en";
    } else {
      lang = "en";
    }

    const t = { ...translations["en"], ...translations[lang] };
    return new Response(renderHTML(t, lang), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};

interface T {
  title: string;
  tagline: string;
  download: string;
  free: string;
  featuresTitle: string;
  features: { icon: string; title: string; desc: string }[];
  shortcutsTitle: string;
  shortcuts: { label: string; keys: string }[];
  techTitle: string;
  techDesc: string;
  footerOSS: string;
  footerMade: string;
  langLabel: string;
}

const translations: Record<string, Partial<T>> = {
  en: {
    title: "ClipBin",
    tagline:
      "A lightweight, fast clipboard manager for macOS. Capture everything you copy. Find and paste instantly.",
    download: "Download for macOS",
    free: "FREE",
    featuresTitle: "Everything you need",
    features: [
      {
        icon: "📋",
        title: "Smart Capture",
        desc: "Automatically captures text, rich text, images, files, URLs, and JSON. Detects content type intelligently.",
      },
      {
        icon: "🔍",
        title: "Instant Search",
        desc: "Full-text search across your entire clipboard history. Find anything in milliseconds with SQLite FTS5.",
      },
      {
        icon: "⌨️",
        title: "Keyboard First",
        desc: "12+ keyboard shortcuts. Press 1-9 to quick paste. Arrow keys to navigate. Tab to search. It's fast.",
      },
      {
        icon: "📌",
        title: "Pin & Organize",
        desc: "Pin important clips. Create collections. Pinned items survive clear and never expire.",
      },
      {
        icon: "📸",
        title: "Screenshot Editor",
        desc: "Cmd+Shift+A to screenshot. Built-in editor with arrows, shapes, text annotations. Copy or save.",
      },
      {
        icon: "🔒",
        title: "Privacy First",
        desc: "All data stays on your Mac. Ignore password managers automatically. No cloud, no tracking.",
      },
      {
        icon: "🎯",
        title: "Click to Paste",
        desc: "Select a clip and it's instantly pasted into your active app via simulated Cmd+V.",
      },
      {
        icon: "🎨",
        title: "Beautiful UI",
        desc: "Dark card carousel at the bottom of your screen. Slide animations. Source app tracking. Clean design.",
      },
      {
        icon: "💾",
        title: "Export & Import",
        desc: "Export your clipboard history as JSON. Import on another machine. Never lose your snippets.",
      },
    ],
    shortcutsTitle: "Keyboard shortcuts",
    shortcuts: [
      { label: "Toggle panel", keys: "⇧⌘V" },
      { label: "Screenshot", keys: "⇧⌘A" },
      { label: "Quick paste", keys: "1-9" },
      { label: "Paste selected", keys: "Enter" },
      { label: "Copy only", keys: "⌘C" },
      { label: "Toggle pin", keys: "⌘P" },
      { label: "Navigate", keys: "← →" },
      { label: "Delete clip", keys: "⌫" },
      { label: "Search", keys: "Tab" },
      { label: "Dismiss", keys: "Esc" },
    ],
    techTitle: "Built with modern tech",
    techDesc: "Native performance, tiny footprint, open source.",
    footerOSS: "ClipBin is open source.",
    footerMade: "Made with Rust + React. 3.1 MB download. macOS 10.15+",
    langLabel: "EN",
  },

  zh: {
    title: "ClipBin",
    tagline:
      "轻量、快速的 macOS 剪贴板管理器。自动捕获你复制的一切，瞬间搜索和粘贴。",
    download: "下载 macOS 版",
    free: "免费",
    featuresTitle: "你需要的一切",
    features: [
      {
        icon: "📋",
        title: "智能捕获",
        desc: "自动捕获文本、富文本、图片、文件、URL 和 JSON，智能识别内容类型。",
      },
      {
        icon: "🔍",
        title: "即时搜索",
        desc: "全文搜索整个剪贴板历史。SQLite FTS5 引擎，毫秒级响应。",
      },
      {
        icon: "⌨️",
        title: "键盘优先",
        desc: "12+ 快捷键。按 1-9 快速粘贴，方向键导航，Tab 搜索，极致效率。",
      },
      {
        icon: "📌",
        title: "固定与分组",
        desc: "固定重要剪贴内容，创建自定义分组。固定项不会被清除或过期。",
      },
      {
        icon: "📸",
        title: "截图编辑器",
        desc: "Cmd+Shift+A 截图，内置编辑器支持箭头、形状、文字标注，复制或保存。",
      },
      {
        icon: "🔒",
        title: "隐私优先",
        desc: "所有数据存在本地。自动忽略密码管理器。无云端，无追踪。",
      },
      {
        icon: "🎯",
        title: "点击即粘贴",
        desc: "选择剪贴内容，自动粘贴到当前活跃应用，模拟 Cmd+V。",
      },
      {
        icon: "🎨",
        title: "精美界面",
        desc: "屏幕底部深色卡片轮播，滑动动画，来源应用追踪，简洁设计。",
      },
      {
        icon: "💾",
        title: "导出与导入",
        desc: "将剪贴板历史导出为 JSON，在另一台机器导入，永不丢失。",
      },
    ],
    shortcutsTitle: "快捷键",
    shortcuts: [
      { label: "切换面板", keys: "⇧⌘V" },
      { label: "截图", keys: "⇧⌘A" },
      { label: "快速粘贴", keys: "1-9" },
      { label: "粘贴选中", keys: "Enter" },
      { label: "仅复制", keys: "⌘C" },
      { label: "切换固定", keys: "⌘P" },
      { label: "导航", keys: "← →" },
      { label: "删除", keys: "⌫" },
      { label: "搜索", keys: "Tab" },
      { label: "关闭", keys: "Esc" },
    ],
    techTitle: "现代技术栈",
    techDesc: "原生性能，极小体积，开源免费。",
    footerOSS: "ClipBin 是开源软件。",
    footerMade: "Rust + React 构建，3.1 MB 下载，支持 macOS 10.15+",
    langLabel: "中文",
  },

  ja: {
    title: "ClipBin",
    tagline:
      "macOS用の軽量・高速クリップボードマネージャー。コピーしたものをすべてキャプチャ。即座に検索・ペースト。",
    download: "macOS版をダウンロード",
    free: "無料",
    featuresTitle: "必要な機能をすべて",
    features: [
      {
        icon: "📋",
        title: "スマートキャプチャ",
        desc: "テキスト、リッチテキスト、画像、ファイル、URL、JSONを自動キャプチャ。コンテンツタイプをインテリジェントに検出。",
      },
      {
        icon: "🔍",
        title: "即座に検索",
        desc: "クリップボード履歴全体を全文検索。SQLite FTS5でミリ秒で検索。",
      },
      {
        icon: "⌨️",
        title: "キーボード優先",
        desc: "12以上のキーボードショートカット。1-9でクイックペースト。矢印キーでナビゲート。",
      },
      {
        icon: "📌",
        title: "ピン＆整理",
        desc: "重要なクリップをピン留め。コレクションを作成。ピンしたアイテムは削除されません。",
      },
      {
        icon: "📸",
        title: "スクリーンショットエディタ",
        desc: "Cmd+Shift+Aでスクリーンショット。矢印、図形、テキスト注釈の内蔵エディタ。",
      },
      {
        icon: "🔒",
        title: "プライバシー最優先",
        desc: "すべてのデータはMac上に保存。パスワードマネージャーを自動的に無視。クラウドなし、トラッキングなし。",
      },
      {
        icon: "🎯",
        title: "クリックでペースト",
        desc: "クリップを選択すると、アクティブなアプリに即座にペースト。Cmd+Vをシミュレート。",
      },
      {
        icon: "🎨",
        title: "美しいUI",
        desc: "画面下部のダークカードカルーセル。スライドアニメーション。ソースアプリ追跡。クリーンなデザイン。",
      },
      {
        icon: "💾",
        title: "エクスポート＆インポート",
        desc: "クリップボード履歴をJSONでエクスポート。別のマシンにインポート。",
      },
    ],
    shortcutsTitle: "キーボードショートカット",
    shortcuts: [
      { label: "パネル切替", keys: "⇧⌘V" },
      { label: "スクリーンショット", keys: "⇧⌘A" },
      { label: "クイックペースト", keys: "1-9" },
      { label: "選択をペースト", keys: "Enter" },
      { label: "コピーのみ", keys: "⌘C" },
      { label: "ピン切替", keys: "⌘P" },
      { label: "ナビゲート", keys: "← →" },
      { label: "クリップ削除", keys: "⌫" },
      { label: "検索", keys: "Tab" },
      { label: "閉じる", keys: "Esc" },
    ],
    techTitle: "モダンな技術スタック",
    techDesc: "ネイティブパフォーマンス、小さなフットプリント、オープンソース。",
    footerOSS: "ClipBinはオープンソースです。",
    footerMade: "Rust + React製。3.1 MBダウンロード。macOS 10.15+",
    langLabel: "日本語",
  },

  ko: {
    title: "ClipBin",
    tagline:
      "macOS용 가볍고 빠른 클립보드 관리자. 복사한 모든 것을 캡처. 즉시 검색하고 붙여넣기.",
    download: "macOS용 다운로드",
    free: "무료",
    featuresTitle: "필요한 모든 것",
    features: [
      {
        icon: "📋",
        title: "스마트 캡처",
        desc: "텍스트, 리치 텍스트, 이미지, 파일, URL, JSON을 자동 캡처. 콘텐츠 유형을 지능적으로 감지.",
      },
      {
        icon: "🔍",
        title: "즉시 검색",
        desc: "전체 클립보드 기록을 전문 검색. SQLite FTS5로 밀리초 만에 검색.",
      },
      {
        icon: "⌨️",
        title: "키보드 우선",
        desc: "12개 이상의 키보드 단축키. 1-9로 빠른 붙여넣기. 화살표 키로 탐색.",
      },
      {
        icon: "📌",
        title: "고정 & 정리",
        desc: "중요한 클립을 고정. 컬렉션 생성. 고정된 항목은 삭제되지 않습니다.",
      },
      {
        icon: "📸",
        title: "스크린샷 편집기",
        desc: "Cmd+Shift+A로 스크린샷. 화살표, 도형, 텍스트 주석이 있는 내장 편집기.",
      },
      {
        icon: "🔒",
        title: "프라이버시 우선",
        desc: "모든 데이터는 Mac에 저장. 비밀번호 관리자 자동 무시. 클라우드 없음, 추적 없음.",
      },
      {
        icon: "🎯",
        title: "클릭으로 붙여넣기",
        desc: "클립을 선택하면 활성 앱에 즉시 붙여넣기. Cmd+V 시뮬레이션.",
      },
      {
        icon: "🎨",
        title: "아름다운 UI",
        desc: "화면 하단의 다크 카드 캐러셀. 슬라이드 애니메이션. 소스 앱 추적. 깔끔한 디자인.",
      },
      {
        icon: "💾",
        title: "내보내기 & 가져오기",
        desc: "클립보드 기록을 JSON으로 내보내기. 다른 기기에서 가져오기.",
      },
    ],
    shortcutsTitle: "키보드 단축키",
    shortcuts: [
      { label: "패널 토글", keys: "⇧⌘V" },
      { label: "스크린샷", keys: "⇧⌘A" },
      { label: "빠른 붙여넣기", keys: "1-9" },
      { label: "선택 붙여넣기", keys: "Enter" },
      { label: "복사만", keys: "⌘C" },
      { label: "고정 토글", keys: "⌘P" },
      { label: "탐색", keys: "← →" },
      { label: "클립 삭제", keys: "⌫" },
      { label: "검색", keys: "Tab" },
      { label: "닫기", keys: "Esc" },
    ],
    techTitle: "현대적인 기술 스택",
    techDesc: "네이티브 성능, 작은 용량, 오픈 소스.",
    footerOSS: "ClipBin은 오픈 소스입니다.",
    footerMade: "Rust + React로 제작. 3.1 MB 다운로드. macOS 10.15+",
    langLabel: "한국어",
  },
};

const LANGS = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

function renderHTML(t: T, currentLang: string): string {
  const langSwitcher = LANGS.map(
    (l) =>
      `<a href="/${l.code}" class="lang-btn ${l.code === currentLang ? "active" : ""}">${l.label}</a>`
  ).join("");

  const featureCards = t.features
    .map(
      (f) => `
    <div class="feature-card">
      <div class="icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`
    )
    .join("");

  const shortcutItems = t.shortcuts
    .map(
      (s) =>
        `<div class="shortcut"><span>${s.label}</span><span class="keys">${s.keys}</span></div>`
    )
    .join("");

  const techTags = [
    "Tauri 2.0",
    "Rust",
    "React 19",
    "TypeScript",
    "SQLite",
    "Tailwind CSS",
    "Core Graphics",
    "NSPasteboard",
  ]
    .map((t) => `<span class="tech-tag">${t}</span>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t.title} — Clipboard Manager for macOS</title>
  <meta name="description" content="${t.tagline}" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📎</text></svg>" />
  <style>
    :root{--bg:#0a0a1a;--surface:#12122a;--border:#1e1e3a;--text:#e8e8f0;--muted:#8888aa;--accent:#3b82f6;--accent-hover:#2563eb;--green:#22c55e}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
    .container{max-width:960px;margin:0 auto;padding:0 24px}
    /* Nav */
    nav{display:flex;justify-content:flex-start;padding:12px 24px;gap:6px}
    .lang-btn{padding:4px 10px;border-radius:6px;font-size:12px;color:var(--muted);text-decoration:none;border:1px solid transparent}
    .lang-btn:hover{border-color:var(--border)}
    .lang-btn.active{color:var(--accent);border-color:var(--accent)}
    /* Hero */
    .hero{text-align:center;padding:60px 0 50px}
    .hero-icon{font-size:64px;margin-bottom:16px}
    .hero h1{font-size:48px;font-weight:700;letter-spacing:-1px;margin-bottom:12px}
    .hero h1 span{color:var(--accent)}
    .hero p{font-size:20px;color:var(--muted);max-width:560px;margin:0 auto 32px}
    .hero-buttons{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:12px;font-size:16px;font-weight:600;text-decoration:none;transition:all .2s}
    .btn-primary{background:var(--accent);color:#fff}
    .btn-primary:hover{background:var(--accent-hover);transform:translateY(-1px)}
    .btn-secondary{background:var(--surface);color:var(--text);border:1px solid var(--border)}
    .btn-secondary:hover{border-color:var(--accent)}
    .badge{display:inline-block;background:var(--green);color:#000;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;margin-left:4px}
    /* Screenshot */
    .screenshot{text-align:center;padding:40px 0}
    .screenshot img{max-width:100%;border-radius:16px;border:1px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.5)}
    /* Features */
    .features{padding:60px 0}
    .features h2{text-align:center;font-size:32px;margin-bottom:40px}
    .feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
    .feature-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px}
    .feature-card .icon{font-size:28px;margin-bottom:8px}
    .feature-card h3{font-size:16px;margin-bottom:6px}
    .feature-card p{font-size:14px;color:var(--muted)}
    /* Shortcuts */
    .shortcuts{padding:60px 0}
    .shortcuts h2{text-align:center;font-size:32px;margin-bottom:32px}
    .shortcut-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;max-width:640px;margin:0 auto}
    .shortcut{display:flex;justify-content:space-between;padding:10px 16px;background:var(--surface);border-radius:8px;font-size:14px}
    .shortcut .keys{font-family:SF Mono,Monaco,monospace;color:var(--accent);font-size:13px}
    /* Tech */
    .tech{padding:60px 0;text-align:center}
    .tech h2{font-size:32px;margin-bottom:16px}
    .tech p{color:var(--muted);margin-bottom:32px}
    .tech-tags{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
    .tech-tag{background:var(--surface);border:1px solid var(--border);padding:6px 14px;border-radius:20px;font-size:13px;color:var(--muted)}
    /* Footer */
    footer{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--muted);font-size:13px}
    footer a{color:var(--accent);text-decoration:none}
    footer a:hover{text-decoration:underline}
    @media(max-width:640px){.hero h1{font-size:32px}.hero p{font-size:16px}}
  </style>
</head>
<body>
  <nav>${langSwitcher}</nav>
  <div class="container">
    <section class="hero">
      <div class="hero-icon">📎</div>
      <h1>Clip<span>Bin</span></h1>
      <p>${t.tagline}</p>
      <div class="hero-buttons">
        <a href="/download" class="btn btn-primary">⬇ ${t.download} <span class="badge">${t.free}</span></a>
        <a href="https://github.com/wwwppp0801/clipbin" class="btn btn-secondary">GitHub</a>
      </div>
    </section>
    <section class="screenshot">
      <p style="font-size:13px;color:var(--muted);margin-bottom:12px">Press <span style="color:var(--accent);font-family:SF Mono,monospace">⇧⌘V</span> to open the clipboard panel</p>
      <img src="https://raw.githubusercontent.com/wwwppp0801/clipbin/main/docs/images/01-main-view.png" alt="ClipBin clipboard panel" />
      <p style="font-size:13px;color:var(--muted);margin-top:32px;margin-bottom:12px">Press <span style="color:var(--accent);font-family:SF Mono,monospace">⇧⌘A</span> to capture & annotate screenshots</p>
      <img src="https://raw.githubusercontent.com/wwwppp0801/clipbin/main/docs/images/02-screenshot-editor.png" alt="ClipBin screenshot editor" />
    </section>
    <section class="features">
      <h2>${t.featuresTitle}</h2>
      <div class="feature-grid">${featureCards}</div>
    </section>
    <section class="shortcuts">
      <h2>${t.shortcutsTitle}</h2>
      <div class="shortcut-grid">${shortcutItems}</div>
    </section>
    <section class="tech">
      <h2>${t.techTitle}</h2>
      <p>${t.techDesc}</p>
      <div class="tech-tags">${techTags}</div>
    </section>
  </div>
  <footer>
    <div class="container">
      <p>${t.footerOSS} <a href="https://github.com/wwwppp0801/clipbin">View on GitHub</a></p>
      <p style="margin-top:8px">${t.footerMade}</p>
      <p style="margin-top:4px;font-size:11px;color:#555">v0.5.0</p>
    </div>
  </footer>
</body>
</html>`;
}
