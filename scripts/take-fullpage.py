import os
import sys
import time
from playwright.sync_api import sync_playwright

def take_full_page():
    os.makedirs('screenshots', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1440px Desktop Full Page
        page_desktop = browser.new_page(viewport={'width': 1440, 'height': 900})
        page_desktop.goto('http://localhost:4321/Portfolio_Website/', wait_until='networkidle')
        time.sleep(1)
        page_desktop.screenshot(path='screenshots/full_home_desktop_1440px.png', full_page=True)
        print("Captured desktop full page")
        page_desktop.close()

        # 390px Mobile Full Page
        page_mobile = browser.new_page(viewport={'width': 390, 'height': 844})
        page_mobile.goto('http://localhost:4321/Portfolio_Website/', wait_until='networkidle')
        time.sleep(1)
        page_mobile.screenshot(path='screenshots/full_home_mobile_390px.png', full_page=True)
        print("Captured mobile full page")
        page_mobile.close()

        browser.close()

if __name__ == '__main__':
    take_full_page()
