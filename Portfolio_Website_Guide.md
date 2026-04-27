# Johanna Kitzman — Portfolio Website: Full Build & Launch Guide

*Designed for a non-developer who knows her way around a browser. No frameworks, no installs required beyond a free GitHub account.*

---

## Part 1: Design System (Your Source of Truth)

Before writing a single line of code, lock down these decisions so everything stays consistent.

### Color Palette

| Role | Name | Hex |
|---|---|---|
| Primary background | Chinese Black | `#0C1519` |
| Secondary background | Dark Jungle Green | `#162127` |
| Card / surface | Jet | `#3A3534` |
| Accent / gold | Antique Brass | `#CF9D7B` |
| Gold light | Brass Light | `#E8C9B0` |
| Pop color | Dusty Rose | `#C4877A` |
| Rose light | Rose Light | `#E8C5BE` |
| Body text | Soft White | `rgba(255,255,255,0.82)` |
| Muted text | Ghost White | `rgba(255,255,255,0.45)` |
| Divider / border | Brass Border | `rgba(207,157,123,0.2)` |

### Typography

| Role | Font | Where to get it |
|---|---|---|
| Script / callouts | Sacramento | Google Fonts (free) |
| Headings / display | Cormorant Garamond | Google Fonts (free) |
| Body / UI | Inter | Google Fonts (free) |

Add this single line to the `<head>` of your HTML to load all three:

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Sacramento&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

### Page Sections (in order)

1. **Navigation** — Logo (script font), nav links, CTA button
2. **Hero** — Your name, title, 3 floating stat cards, gilded vein SVG decoration
3. **Gradient divider** — Thin brass-to-rose line
4. **Metrics strip** — 5 key numbers from your real results
5. **About** — Two-column: bio + competency list
6. **Work & Tools** — 3-column project card grid
7. **Quote** — Full-width pull quote in your own words
8. **Contact** — Simple form or email link
9. **Footer** — Logo, links, copyright

### Animations to Include (subtle & unique)

- **Fade-up on scroll** — sections slide up gently as you scroll into them (CSS + Intersection Observer)
- **Gilded vein draw** — the decorative gold SVG path animates in on load (CSS `stroke-dashoffset`)
- **Stat counter** — numbers count up from 0 when the metrics strip enters the viewport
- **Card border glow** — project cards get a subtle brass border glow on hover
- **Cursor dot** — a small custom brass-colored dot follows the cursor (optional, very editorial)

---

## Part 2: Project Setup

### Step 1 — Create your project folder

On your computer, create a folder called `johanna-portfolio`. Inside it, create this structure:

```
johanna-portfolio/
├── index.html          ← your entire website lives here
├── style.css           ← all your CSS
├── script.js           ← animations and interactions
└── assets/
    ├── images/         ← your headshot, project screenshots
    └── resume.pdf      ← downloadable resume
```

### Step 2 — Set up your code editor

Download **VS Code** (free): https://code.visualstudio.com

Install these two extensions inside VS Code:
- **Prettier** — auto-formats your code
- **Live Server** — lets you preview your site in a browser with live reload

Once installed, right-click `index.html` → "Open with Live Server" to preview your site as you build it.

---

## Part 3: Building the HTML

Open `index.html` and paste this starter template. Replace all placeholder content with your real information.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Johanna Kitzman — Strategic Marketing Leader</title>
  <meta name="description" content="Strategic Marketing and Operations Leader with 12+ years building high-growth digital ecosystems, AI-powered tools, and data-driven brand systems." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Sacramento&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- NAVIGATION -->
  <nav class="nav">
    <div class="nav-logo">Johanna Kitzman</div>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#tools">AI Tools</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="assets/resume.pdf" class="nav-btn" download>Download Resume</a>
  </nav>

  <!-- HERO -->
  <section class="hero" id="home">
    <!-- Gilded vein decoration — paste your SVG here -->
    <svg class="hero-vein" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="vein-path" d="M380 0 C320 80, 280 120, 340 200 C400 280, 350 320, 280 380 C210 440, 240 480, 200 500" stroke="#CF9D7B" stroke-width="0.8" fill="none"/>
      <path class="vein-path-2" d="M340 0 C290 60, 340 100, 300 170 C260 240, 310 290, 260 350 C210 410, 230 460, 180 500" stroke="#CF9D7B" stroke-width="0.4" fill="none"/>
    </svg>

    <div class="hero-inner">
      <div class="hero-left">
        <span class="hero-eyebrow">Strategic Marketing Leader</span>
        <h1 class="hero-name">Johanna<br><em>Kitzman</em></h1>
        <p class="hero-title">Performance Marketing · SEO · AI-Powered Workflows · Creative Direction</p>
        <p class="hero-desc">12 years architecting high-growth digital ecosystems where data meets craft. I build the strategies, the tools, and sometimes the websites too.</p>
        <div class="hero-btns">
          <a href="#work" class="btn-fill">View my work</a>
          <a href="assets/resume.pdf" class="btn-outline" download>Download resume</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="float-card">
          <span class="fc-label">Organic growth · Kenzen Koi</span>
          <div class="fc-value">104.9%</div>
          <div class="fc-sub">new user surge in a single month</div>
        </div>
        <div class="float-card accent">
          <span class="fc-label">AI Overview Citations Secured</span>
          <div class="fc-value rose">43</div>
          <div class="fc-sub">top-tier authority in generative search</div>
        </div>
        <div class="float-card">
          <span class="fc-label">Impression growth · month-over-month</span>
          <div class="fc-value">2×</div>
          <div class="fc-sub">22,330 → 44,542 impressions</div>
        </div>
      </div>
    </div>
  </section>

  <!-- METRICS STRIP -->
  <div class="metrics">
    <div class="metric fade-up">
      <span class="metric-num" data-target="12">0</span><span class="metric-num">+</span>
      <span class="metric-label">years experience</span>
    </div>
    <div class="metric fade-up">
      <span class="metric-num" data-target="550">0</span><span class="metric-num">%</span>
      <span class="metric-label">regional traffic surge</span>
    </div>
    <div class="metric fade-up">
      <span class="metric-num" data-target="40">0</span><span class="metric-num">%</span>
      <span class="metric-label">overhead reduced via AI</span>
    </div>
    <div class="metric fade-up">
      <span class="metric-num">7yr</span>
      <span class="metric-label">first-page rankings held</span>
    </div>
    <div class="metric fade-up">
      <span class="metric-num" data-target="30">0</span><span class="metric-num">+</span>
      <span class="metric-label">concurrent projects managed</span>
    </div>
  </div>

  <!-- ABOUT -->
  <section class="about" id="about">
    <div class="about-left fade-up">
      <span class="section-tag">A bit about me</span>
      <h2 class="section-heading">Where <em>strategy</em><br>meets craft</h2>
      <p class="about-body">I'm a Swedish-born, Minnesota-based marketing leader who found her edge at the intersection of technical rigor and creative intuition...</p>
      <!-- Add your full bio here -->
      <div class="pill-row">
        <span class="pill">SEO / SEM</span>
        <span class="pill">GA4</span>
        <span class="pill">AI Workflows</span>
        <span class="pill">Brand Strategy</span>
        <span class="pill">CRO</span>
        <span class="pill">WooCommerce</span>
        <span class="pill">Adobe Suite</span>
        <span class="pill">HubSpot</span>
        <span class="pill">Klaviyo</span>
        <span class="pill">Salesforce</span>
      </div>
    </div>
    <div class="comp-list fade-up">
      <!-- Competency items — repeat this block for each -->
      <div class="comp-item">
        <div class="comp-icon"><div class="comp-icon-inner"></div></div>
        <div>
          <div class="comp-title">Strategic Leadership</div>
          <div class="comp-desc">Program management, roadmap prioritization, cross-functional team leadership and stakeholder alignment.</div>
        </div>
      </div>
      <!-- Add Digital Architecture, AI-Enabled Operations, Creative Direction blocks -->
    </div>
  </section>

  <!-- WORK & TOOLS -->
  <section class="work" id="work">
    <div class="work-header fade-up">
      <span class="section-tag">Selected work</span>
      <h2 class="section-heading">Tools built. <em>Results delivered.</em></h2>
    </div>
    <div class="work-grid">
      <!-- Repeat .work-card for each project -->
      <div class="work-card fade-up">
        <div class="card-top t1">
          <div class="card-top-num">01</div>
          <div class="card-top-label">Kenzen Koi · SEO</div>
        </div>
        <div class="card-body">
          <div class="card-cat">Performance Marketing</div>
          <div class="card-title">Organic Search Overhaul</div>
          <div class="card-desc">Technical SEO + content strategy delivering 104.9% new user growth in a single month.</div>
          <div class="card-stat">↑ 104.9% · impressions 2× · position 10.9 → 8.2</div>
        </div>
      </div>
      <!-- Add cards for: Equine Calculator, Social Platform, Analytics Dashboard, Websites -->
    </div>
  </section>

  <!-- QUOTE -->
  <section class="quote-section fade-up">
    <span class="quote-mark">"</span>
    <p class="quote-text">I build fundamentals-first strategies that drive sustainable, compounding growth — then I build the tools to scale them.</p>
    <div class="quote-attr">— Johanna Kitzman</div>
  </section>

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <span class="section-tag">Get in touch</span>
    <h2 class="section-heading">Let's <em>work together</em></h2>
    <p class="contact-desc">Open to senior marketing, operations, and growth leadership roles.</p>
    <div class="contact-links">
      <a href="mailto:johanna.kitzman@gmail.com" class="btn-fill">Send an email</a>
      <a href="https://linkedin.com/in/johanna-kitzman" class="btn-outline" target="_blank">LinkedIn</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-logo">JK</div>
    <div class="footer-links">
      <a href="https://linkedin.com/in/johanna-kitzman">LinkedIn</a>
      <a href="mailto:johanna.kitzman@gmail.com">Email</a>
      <a href="assets/resume.pdf" download>Resume</a>
    </div>
    <div class="footer-copy">© 2026 Johanna Kitzman · Minnesota</div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

---

## Part 4: CSS (`style.css`)

Paste all the CSS from the mockup into `style.css`. The key variables to define at the top:

```css
:root {
  --black: #0C1519;
  --jungle: #162127;
  --jet: #3A3534;
  --brass: #CF9D7B;
  --brass-light: #E8C9B0;
  --rose: #C4877A;
  --rose-light: #E8C5BE;
  --cream: #f5f0ea;
  --white-soft: rgba(255, 255, 255, 0.82);
  --white-mute: rgba(255, 255, 255, 0.45);
  --white-ghost: rgba(255, 255, 255, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;  /* smooth scrolling when nav links are clicked */
}

body {
  background: var(--black);
  font-family: 'Inter', sans-serif;
}
```

### Key CSS Animations

Add these to your `style.css` for the scroll fade-up effect:

```css
/* Fade-up animation (elements start invisible, rise into view) */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Gilded vein draw animation */
.vein-path {
  stroke-dasharray: 800;
  stroke-dashoffset: 800;
  animation: drawVein 2.5s ease forwards 0.5s;
}

.vein-path-2 {
  stroke-dasharray: 700;
  stroke-dashoffset: 700;
  animation: drawVein 3s ease forwards 0.8s;
}

@keyframes drawVein {
  to { stroke-dashoffset: 0; }
}

/* Card hover glow */
.work-card {
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.work-card:hover {
  border-color: rgba(207, 157, 123, 0.5);
  transform: translateY(-4px);
}

/* Nav link underline animation */
.nav-links a {
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 0.5px;
  background: var(--brass);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}
```

---

## Part 5: JavaScript (`script.js`)

Paste this into `script.js`. It handles scroll animations and the counting stats:

```javascript
// ── SCROLL FADE-UP ──────────────────────────────────────────────
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));


// ── COUNTING STATS ───────────────────────────────────────────────
const counters = document.querySelectorAll('[data-target]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);

      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => countObserver.observe(el));


// ── STICKY NAV BACKGROUND ────────────────────────────────────────
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.borderBottom = '0.5px solid rgba(207,157,123,0.3)';
    nav.style.backdropFilter = 'blur(12px)';
  } else {
    nav.style.borderBottom = '0.5px solid rgba(207,157,123,0.15)';
    nav.style.backdropFilter = 'none';
  }
});


// ── OPTIONAL: Custom cursor dot ───────────────────────────────────
// Uncomment if you want the brass cursor dot effect

/*
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; width: 8px; height: 8px;
  background: #CF9D7B; border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
*/
```

---

## Part 6: Your Content Checklist

Before launching, make sure you have:

- [ ] A professional headshot (optional but powerful — crop square, place in `assets/images/`)
- [ ] Screenshots of each project/tool you've built
- [ ] Your resume saved as `assets/resume.pdf`
- [ ] Real descriptions for each project card (use your resume bullet points as a starting point)
- [ ] Correct email address and LinkedIn URL in the contact section
- [ ] All five metrics filled in with your real numbers

### Project cards to include (based on your resume)

1. Kenzen Koi SEO Overhaul — 104.9% growth, AI Overview citations
2. Equine Supplement Nutritional Calculator — AI tool, live on website
3. Analytics Dashboard — GA4 framework for executive reporting
4. Social Media Planning & Posting Platform — hundreds in monthly savings
5. Young Again Multi-Brand Websites — full design, build, and launch
6. Studio Freyja — 7+ years first-page rankings, luxury studio brand

---

## Part 7: Launching on GitHub Pages (Free Hosting)

GitHub Pages hosts your site for free and gives you a URL like:
`https://yourusername.github.io/johanna-portfolio`

### Step 1 — Create a GitHub account

Go to https://github.com and sign up (free). Your username will appear in your URL, so pick something clean — e.g., `johannakitzman`.

### Step 2 — Create a new repository

1. Click the **+** icon → "New repository"
2. Name it exactly: `johanna-portfolio`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files

Since you're not using the command line, use GitHub's drag-and-drop:

1. Open your new repository
2. Click **"uploading an existing file"** link
3. Drag your entire `johanna-portfolio` folder contents into the upload area
4. Click **Commit changes**

> Important: your `index.html` must be at the root level, not inside a subfolder.

### Step 4 — Enable GitHub Pages

1. In your repository, click **Settings**
2. Scroll to **"Pages"** in the left sidebar
3. Under "Source," select **"Deploy from a branch"**
4. Choose branch: **main** · folder: **/ (root)**
5. Click **Save**

GitHub will show you your live URL within 1–2 minutes. It'll look like:
`https://johannakitzman.github.io/johanna-portfolio`

---

## Part 8: Getting a Free Custom URL

You have two great free options:

### Option A — Netlify (Recommended — easiest)

Netlify is simpler than GitHub Pages and gives you a cleaner free URL.

1. Go to https://netlify.com and sign up free
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your entire `johanna-portfolio` folder onto the upload area
4. Your site is live instantly at a URL like: `https://random-name-123.netlify.app`
5. Go to **Site settings → Domain management → Options → Edit site name**
6. Change it to: `johanna-kitzman` → your URL becomes **`https://johanna-kitzman.netlify.app`**

This is a completely free, professional, shareable URL. No credit card needed.

### Option B — GitHub Pages with a custom `.com` (if you want your own domain later)

If you eventually want `johannakitzman.com`:

1. Buy the domain at https://namecheap.com (~$10–15/year)
2. In GitHub Pages settings → "Custom domain" → enter your domain
3. In Namecheap DNS settings, add the GitHub-provided A records
4. Done — your GitHub Pages site is now at your `.com` address

---

## Part 9: Making Updates After Launch

Every time you want to change something on your site:

1. Edit the file on your computer in VS Code
2. Go to your GitHub repository
3. Click on the file you changed
4. Click the pencil ✏️ icon to edit, or drag-and-drop a new version
5. Click **Commit changes**
6. GitHub Pages and Netlify auto-redeploy within ~60 seconds

For Netlify specifically, you can also connect it directly to your GitHub repository so updates deploy automatically every time you push a change.

---

## Part 10: SEO for Your Portfolio Page

Since SEO is literally your expertise, here's how to make sure *your* site is findable:

### In your `<head>` tag

```html
<!-- Basic SEO -->
<title>Johanna Kitzman — Strategic Marketing & SEO Leader | Minnesota</title>
<meta name="description" content="Strategic Marketing and Operations Leader with 12+ years building high-growth digital ecosystems, AI-powered tools, and data-driven brand systems. Based in Minnesota." />
<meta name="keywords" content="Johanna Kitzman, marketing director, SEO specialist, AI tools, performance marketing, Minnesota" />

<!-- Open Graph (controls how your link looks when shared on LinkedIn) -->
<meta property="og:title" content="Johanna Kitzman — Strategic Marketing Leader" />
<meta property="og:description" content="12 years architecting high-growth digital ecosystems where data meets craft." />
<meta property="og:image" content="https://yourdomain.com/assets/images/og-preview.jpg" />
<meta property="og:url" content="https://johanna-kitzman.netlify.app" />
<meta property="og:type" content="website" />

<!-- Twitter/X card -->
<meta name="twitter:card" content="summary_large_image" />
```

### Structured data (Schema.org — great for AI Overview appearances)

Add this just before your closing `</body>` tag:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Johanna Kitzman",
  "jobTitle": "Strategic Marketing and Operations Leader",
  "url": "https://johanna-kitzman.netlify.app",
  "sameAs": [
    "https://linkedin.com/in/johanna-kitzman"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Minnesota",
    "addressCountry": "US"
  },
  "knowsAbout": ["SEO", "Performance Marketing", "AI Tools", "Analytics", "Brand Strategy"]
}
</script>
```

---

## Quick Reference: Recommended Free Tools

| Tool | Purpose | Link |
|---|---|---|
| VS Code | Code editor | code.visualstudio.com |
| GitHub | Free hosting & version control | github.com |
| Netlify | Free hosting with clean URL | netlify.com |
| Google Fonts | Free typography | fonts.google.com |
| Squoosh | Compress images before upload | squoosh.app |
| Coolors | Fine-tune your palette | coolors.co |
| PageSpeed Insights | Check your site performance | pagespeed.web.dev |

---

*Built with intention. Every pixel earns its place.*
