import os
import time
from playwright.sync_api import sync_playwright

def capture_cs_sections():
    os.makedirs('screenshots/sections', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto('http://localhost:4321/Portfolio_Website/work/erp-llm-foundation/', wait_until='networkidle')
        time.sleep(1)

        # 1. Problem + Topology
        sec1 = page.locator("#problem")
        if sec1.count() > 0:
            sec1.scroll_into_view_if_needed()
            time.sleep(0.5)
            page.screenshot(path="screenshots/sections/ink_coral_case_study_body_1440px.png", full_page=False)
            print("Captured CS body view")

        # 2. Failures
        sec2 = page.locator("#failures")
        if sec2.count() > 0:
            sec2.scroll_into_view_if_needed()
            time.sleep(0.5)
            page.screenshot(path="screenshots/sections/ink_coral_case_study_failures_1440px.png", full_page=False)
            print("Captured CS failures view")

        browser.close()

if __name__ == '__main__':
    capture_cs_sections()
