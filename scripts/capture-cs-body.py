import os
import time
from playwright.sync_api import sync_playwright

def capture_case_study_body():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto('http://localhost:4321/Portfolio_Website/work/erp-llm-foundation/', wait_until='networkidle')
        time.sleep(1)

        # Scroll down to paper body
        el = page.locator('#decisions')
        if el.count() > 0:
            el.scroll_into_view_if_needed()
            time.sleep(0.5)
            page.screenshot(path='screenshots/blueprint_case_study_body_1440px.png')
            print("Captured case study body")

        # Scroll down to what broke
        failures = page.locator('#failures')
        if failures.count() > 0:
            failures.scroll_into_view_if_needed()
            time.sleep(0.5)
            page.screenshot(path='screenshots/blueprint_case_study_failures_1440px.png')
            print("Captured case study failures")

        browser.close()

if __name__ == '__main__':
    capture_case_study_body()
