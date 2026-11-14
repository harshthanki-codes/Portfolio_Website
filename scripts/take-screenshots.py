import os
import sys
import time
from playwright.sync_api import sync_playwright

def take_screenshots(url, prefix):
    os.makedirs('screenshots', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 390px Mobile Viewport
        page_mobile = browser.new_page(viewport={'width': 390, 'height': 844})
        print(f"Navigating mobile (390px) to {url}...")
        page_mobile.goto(url, wait_until='networkidle')
        time.sleep(1)
        mobile_path = f"screenshots/{prefix}_mobile_390px.png"
        page_mobile.screenshot(path=mobile_path, full_page=False)
        print(f"Saved mobile screenshot: {mobile_path}")
        page_mobile.close()

        # 1440px Desktop Viewport
        page_desktop = browser.new_page(viewport={'width': 1440, 'height': 900})
        print(f"Navigating desktop (1440px) to {url}...")
        page_desktop.goto(url, wait_until='networkidle')
        time.sleep(1)
        desktop_path = f"screenshots/{prefix}_desktop_1440px.png"
        page_desktop.screenshot(path=desktop_path, full_page=False)
        print(f"Saved desktop screenshot: {desktop_path}")
        page_desktop.close()

        browser.close()

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000/Portfolio_Website/'
    prefix = sys.argv[2] if len(sys.argv) > 2 else 'step0_before'
    take_screenshots(url, prefix)
