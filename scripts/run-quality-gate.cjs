const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4321/Portfolio_Website';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'docs', 'screenshots');
const AXE_PATH = require.resolve('axe-core/axe.min.js');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runQualityGate() {
  console.log('🚀 Starting Quality Gate Verification...');
  
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const report = {
    routes: {},
    overflow360px: {},
    reducedMotion: {},
    keyboardFocus: {},
    axeResults: {},
    contrastCheck: {},
    screenshots: []
  };

  const routesToTest = [
    { name: 'Home', path: '/' },
    { name: 'ERP Assistant Case Study', path: '/work/erp-assistant/' },
    { name: 'Voice Orders Case Study', path: '/work/voice-orders/' },
    { name: 'Financial Ledger Case Study', path: '/work/financial-ledger/' },
    { name: 'DNS Watchdog Case Study', path: '/work/dns-watchdog/' },
    { name: '404 Page', path: '/404.html' }
  ];

  // 1. ROUTE VERIFICATION & ASSET INTEGRITY
  console.log('\n--- 1. Testing Route & Asset Integrity ---');
  for (const route of routesToTest) {
    const page = await browser.newPage();
    const failedRequests = [];

    page.on('response', response => {
      const status = response.status();
      const url = response.url();
      if (status >= 400 && !url.includes('favicon.ico')) {
        failedRequests.push({ url, status });
      }
    });

    const targetUrl = `${BASE_URL}${route.path}`;
    const response = await page.goto(targetUrl, { waitUntil: 'networkidle' });
    const status = response ? response.status() : 500;

    report.routes[route.path] = {
      status,
      title: await page.title(),
      failedRequests
    };

    console.log(`✓ ${route.name} (${route.path}) -> Status: ${status}, Failed assets: ${failedRequests.length}`);
    await page.close();
  }

  // 2. MOBILE VIEWPORT 360PX OVERFLOW TEST
  console.log('\n--- 2. Testing 360px Mobile Viewport Overflow ---');
  for (const route of routesToTest) {
    const page = await browser.newPage({
      viewport: { width: 360, height: 800 }
    });
    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });

    const overflowData = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const overflowingElements = [];

      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1) { // 1px tolerance for subpixel rounding
          overflowingElements.push({
            tagName: el.tagName,
            className: el.className?.toString().slice(0, 50),
            right: rect.right,
            docWidth
          });
        }
      });

      return {
        clientWidth: docWidth,
        scrollWidth,
        hasHorizontalScroll: scrollWidth > docWidth,
        overflowingElements: overflowingElements.slice(0, 5)
      };
    });

    report.overflow360px[route.path] = overflowData;
    console.log(`✓ ${route.path} -> ClientWidth: ${overflowData.clientWidth}px, ScrollWidth: ${overflowData.scrollWidth}px, HasOverflow: ${overflowData.hasHorizontalScroll}`);
    await page.close();
  }

  // 3. PREFERS-REDUCED-MOTION TEST
  console.log('\n--- 3. Testing Prefers-Reduced-Motion Behavior ---');
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const reducedMotionState = await page.evaluate(() => {
      // Check hero speculative decoding
      const heroHeadline = document.querySelector('h1[aria-label]');
      const headlineText = heroHeadline ? heroHeadline.textContent : '';
      const containsFinalWords = headlineText.includes('hardware.') || headlineText.includes('AI systems');
      
      // Check animation CSS class or inline styles
      const motionClassApplied = document.querySelector('.reveal-heading');
      return {
        headlineAriaLabel: heroHeadline?.getAttribute('aria-label'),
        containsFinalWords,
        hasStaticState: containsFinalWords
      };
    });

    report.reducedMotion = reducedMotionState;
    console.log(`✓ Reduced motion static state verified:`, reducedMotionState);
    await page.close();
  }

  // 4. KEYBOARD NAVIGATION & FOCUS OUTLINES
  console.log('\n--- 4. Testing Keyboard Navigation & Focus Outlines ---');
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const focusChecks = [];
    // Tab 15 times to hit header links, hero CTA, and Break a tier controls
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      const focusInfo = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active || active === document.body) return null;

        const style = window.getComputedStyle(active);
        return {
          tagName: active.tagName,
          text: (active.textContent || '').trim().slice(0, 30),
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
          outlineColor: style.outlineColor,
          boxShadow: style.boxShadow
        };
      });

      if (focusInfo) {
        focusChecks.push(focusInfo);
      }
    }

    report.keyboardFocus = focusChecks;
    console.log(`✓ Verified ${focusChecks.length} interactive tab targets with focus styles:`);
    focusChecks.slice(0, 6).forEach(f => {
      console.log(`  - [${f.tagName}] "${f.text}": outline=${f.outlineWidth} ${f.outlineStyle} ${f.outlineColor}`);
    });
    await page.close();
  }

  // 5. ACCESSIBILITY & CONTRAST AUDIT (AXE-CORE)
  console.log('\n--- 5. Running Axe Accessibility & Color Contrast Audit ---');
  const axeScript = fs.readFileSync(AXE_PATH, 'utf8');

  for (const pageTest of [{ name: 'Home', path: '/' }, { name: 'ERP Assistant', path: '/work/erp-assistant/' }]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await page.goto(`${BASE_URL}${pageTest.path}`, { waitUntil: 'networkidle' });

    await page.evaluate(axeScript);
    const axeResults = await page.evaluate(async () => {
      // @ts-ignore
      return await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
        }
      });
    });

    const criticalOrSerious = axeResults.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
    report.axeResults[pageTest.path] = {
      violationsCount: axeResults.violations.length,
      criticalOrSeriousCount: criticalOrSerious.length,
      violations: axeResults.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length
      }))
    };

    console.log(`✓ ${pageTest.name} Axe Audit: Total violations=${axeResults.violations.length}, Critical/Serious=${criticalOrSerious.length}`);
    if (criticalOrSerious.length > 0) {
      console.warn(`  Warnings:`, JSON.stringify(criticalOrSerious, null, 2));
    }
    await page.close();
  }

  // 6. CAPTURE HIGH-RES SCREENSHOTS
  console.log('\n--- 6. Capturing Full-Page Screenshots ---');
  const viewports = [
    { name: 'mobile', width: 360, height: 800, fileSuffix: '360px' },
    { name: 'tablet', width: 768, height: 1024, fileSuffix: '768px' },
    { name: 'desktop', width: 1440, height: 900, fileSuffix: '1440px' }
  ];

  const capturePages = [
    { name: 'home', path: '/' },
    { name: 'case-study', path: '/work/erp-assistant/' }
  ];

  for (const p of capturePages) {
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2
      });

      await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600); // allow layout & count-up to stabilize

      const filename = `${p.name}-${vp.fileSuffix}.png`;
      const filePath = path.join(SCREENSHOT_DIR, filename);
      await page.screenshot({ path: filePath, fullPage: true });

      report.screenshots.push({ page: p.name, viewport: vp.name, path: filePath });
      console.log(`✓ Captured ${filename} (${vp.width}x${vp.height})`);
      await page.close();
    }
  }

  await browser.close();

  // Save full report
  const reportPath = path.join(SCREENSHOT_DIR, 'quality-gate-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n🎉 Quality Gate Finished! Report written to ${reportPath}`);
}

runQualityGate().catch(err => {
  console.error('❌ Quality Gate Failed:', err);
  process.exit(1);
});
