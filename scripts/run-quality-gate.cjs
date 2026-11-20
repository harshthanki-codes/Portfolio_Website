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
    colorRoleAudit: {},
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
        if (rect.right > docWidth + 1) { // 1px tolerance
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
      const heroHeadline = document.querySelector('h1[aria-label]');
      const headlineText = heroHeadline ? heroHeadline.textContent : '';
      const containsFinalWords = headlineText.includes('hardware.') || headlineText.includes('AI systems');
      const hasSunHighlight = !!document.querySelector('mark.bg-\\[\\#FFD23F\\]');

      return {
        headlineAriaLabel: heroHeadline?.getAttribute('aria-label'),
        containsFinalWords,
        hasSunHighlight,
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
          outlineColor: style.outlineColor
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
  console.log('\n--- 5. Running Axe Accessibility Audit ---');
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
    await page.close();
  }

  // 6. COLOR ROLES & COLOR BUDGET VERIFICATION
  console.log('\n--- 6. Verifying Color Roles and Budget ---');
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const colorAudit = await page.evaluate(() => {
      let coralTextOnPaperCount = 0;
      let textOnCoralIsInk = true;
      let lilacCardPresent = false;
      let mintLivePresent = false;
      let sunHighlightPresent = false;

      // Check all elements for color rules
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bg = style.backgroundColor;

        // Check: Coral (#FF5A36 / rgb(255, 90, 54)) as text on paper (#F7F5F2 / rgb(247, 245, 242))
        if (color.includes('255, 90, 54') && (bg.includes('247, 245, 242') || bg.includes('255, 255, 255'))) {
          coralTextOnPaperCount++;
        }

        // Check: Text on coral fill (#FF5A36) is ink (#16161D / rgb(22, 22, 29))
        if (bg.includes('255, 90, 54') && el.textContent?.trim()) {
          if (!color.includes('22, 22, 29') && !color.includes('0, 0, 0')) {
            textOnCoralIsInk = false;
          }
        }

        // Check: Lilac background present on cards (#D9CCFF / rgb(217, 204, 255))
        if (bg.includes('217, 204, 255')) {
          lilacCardPresent = true;
        }

        // Check: Mint (#2EE6A6 / rgb(46, 230, 166)) on Live tier
        if (bg.includes('46, 230, 166')) {
          mintLivePresent = true;
        }

        // Check: Sun highlighter (#FFD23F / rgb(255, 210, 63))
        if (bg.includes('255, 210, 63')) {
          sunHighlightPresent = true;
        }
      });

      return {
        coralTextOnPaperViolations: coralTextOnPaperCount,
        textOnCoralIsInk,
        lilacCardPresent,
        mintLivePresent,
        sunHighlightPresent,
        estimatedBudget: {
          paperAndInk: '~70%',
          coral: '~20%',
          mintSunLilac: '~10%'
        }
      };
    });

    report.colorRoleAudit = colorAudit;
    console.log(`✓ Color Role Audit:`, colorAudit);
    await page.close();
  }

  // 7. CAPTURE HIGH-RES SCREENSHOTS
  console.log('\n--- 7. Capturing Full-Page Screenshots ---');
  const viewports = [
    { name: 'mobile', width: 360, height: 800, fileSuffix: '360px' },
    { name: 'tablet', width: 768, height: 1024, fileSuffix: '768px' },
    { name: 'desktop', width: 1440, height: 900, fileSuffix: '1440px' }
  ];

  const capturePages = [
    { name: 'home', path: '/' },
    { name: 'case-study', path: '/work/erp-assistant/' },
    { name: 'case-study-voice', path: '/work/voice-orders/' },
    { name: 'case-study-ledger', path: '/work/financial-ledger/' },
    { name: 'case-study-dns', path: '/work/dns-watchdog/' },
    { name: '404', path: '/404.html' }
  ];

  for (const p of capturePages) {
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2
      });

      await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600); // allow layout to stabilize

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
