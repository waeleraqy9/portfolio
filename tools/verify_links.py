import os
import re
import glob

html_files = glob.glob("*.html")
print(f"Testing {len(html_files)} HTML files...")

errors = 0
checked_links = 0

for hf in sorted(html_files):
    with open(hf, "r", encoding="utf-8") as f:
        content = f.read()

    # Check basic HTML structure
    if "<!DOCTYPE html>" not in content:
        print(f"Error: {hf} missing DOCTYPE")
        errors += 1
    if "</html>" not in content:
        print(f"Error: {hf} unclosed html tag")
        errors += 1

    # Extract all href and src
    links = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content)
    for l in links:
        if l.startswith(("http://", "https://", "mailto:", "tel:", "#")):
            continue

        clean_path = l.split("#")[0].split("?")[0]
        if not clean_path:
            continue

        checked_links += 1
        if not os.path.exists(clean_path):
            print(f"Broken link in {hf}: {l} -> file {clean_path} NOT FOUND")
            errors += 1

print(f"Verification finished. Checked {checked_links} local links/assets across {len(html_files)} pages. Total errors: {errors}")
if errors == 0:
    print("ALL LINKS, IMAGES, AND ASSETS ARE VALID AND EXIST!")
