import os
import time
from playwright.sync_api import sync_playwright

def capture_sections():
    os.makedirs('screenshots/sections', exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto('http://localhost:4321/Portfolio_Website/', wait_until='networkidle')
        time.sleep(1)

        sections = ['work', 'about', 'notes', 'contact']
        for sec_id in sections:
            el = page.locator(f"#{sec_id}")
            if el.count() > 0:
                el.scroll_into_view_if_needed()
                time.sleep(0.5)
                out_path = f"screenshots/sections/{sec_id}_desktop_1440px.png"
                el.screenshot(path=out_path)
                print(f"Captured #{sec_id} to {out_path}")

        # Also capture footer
        footer = page.locator('footer')
        if footer.count() > 0:
            footer.scroll_into_view_if_needed()
            time.sleep(0.5)
            out_path = "screenshots/sections/footer_desktop_1440px.png"
            footer.screenshot(path=out_path)
            print(f"Captured footer to {out_path}")

        browser.close()

if __name__ == '__main__':
    capture_sections()
