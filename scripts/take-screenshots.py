import os
import sys
import time
from playwright.sync_api import sync_playwright

def take_screenshots(base_url, prefix):
    os.makedirs('screenshots', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        pages_to_test = [
            ('', 'home'),
            ('work/erp-llm-foundation/', 'case_study')
        ]

        viewports = [
            (390, 844, 'mobile_390px'),
            (768, 1024, 'tablet_768px'),
            (1440, 900, 'desktop_1440px')
        ]

        for subpath, page_name in pages_to_test:
            target_url = f"{base_url.rstrip('/')}/{subpath}"
            print(f"\n--- Testing page: {page_name} ({target_url}) ---")

            for width, height, vp_label in viewports:
                page = browser.new_page(viewport={'width': width, 'height': height})
                print(f"Loading {vp_label}...")
                page.goto(target_url, wait_until='networkidle')
                time.sleep(1) # Allow CSS animations to settle
                out_path = f"screenshots/{prefix}_{page_name}_{vp_label}.png"
                page.screenshot(path=out_path, full_page=False)
                print(f"Saved: {out_path}")
                page.close()

        browser.close()

if __name__ == '__main__':
    base_url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4321/Portfolio_Website/'
    prefix = sys.argv[2] if len(sys.argv) > 2 else 'review'
    take_screenshots(base_url, prefix)
