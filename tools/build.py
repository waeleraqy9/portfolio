#!/usr/bin/env python3
"""
Static Site Build Pipeline & Content Validator
Portfolio of Eng. Wael Mohamed Eraqy
"""

import os
import sys
import json
import glob
import re
import shutil
from pathlib import Path
from PIL import Image, ImageOps

BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIR = BASE_DIR / "content"
TEMPLATES_DIR = BASE_DIR / "templates"
PARTIALS_DIR = TEMPLATES_DIR / "partials"
ASSETS_DIR = BASE_DIR / "assets"
CONTENT_ASSETS_DIR = ASSETS_DIR / "content"
DATA_DIR = ASSETS_DIR / "data"

BLOCKLIST_FILE = CONTENT_DIR / "blocklist.txt"

def load_blocklist():
    if not BLOCKLIST_FILE.exists():
        return []
    with open(BLOCKLIST_FILE, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip() and not line.startswith("#")]
    return lines

def validate_text(text, blocklist, source_label=""):
    if not text:
        return
    for bad in blocklist:
        if bad.lower() in text.lower():
            raise ValueError(f"Blocklisted word '{bad}' found in {source_label}")

def load_partial(name):
    path = PARTIALS_DIR / f"{name}.html"
    if not path.exists():
        return ""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def get_logo_asset():
    for ext in [".jpg", ".png", ".svg", ".webp", ".jpeg"]:
        candidate = ASSETS_DIR / "img" / f"logo{ext}"
        if candidate.exists():
            mime = "image/svg+xml" if ext == ".svg" else ("image/png" if ext == ".png" else "image/jpeg")
            return f"assets/img/logo{ext}", mime
    return "assets/img/logo.jpg", "image/jpeg"

def optimize_image(src_path, dst_path, max_width=1200, quality=80):
    os.makedirs(dst_path.parent, exist_ok=True)
    if dst_path.exists() and dst_path.stat().st_mtime >= src_path.stat().st_mtime:
        return dst_path

    try:
        with Image.open(src_path) as img:
            img = ImageOps.exif_transpose(img)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            w, h = img.size
            if w > max_width:
                new_h = int(h * (max_width / w))
                img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
            
            img.save(dst_path, "WEBP", quality=quality, method=6)
            return dst_path
    except Exception as e:
        print(f"Warning: Could not optimize {src_path}: {e}")
        return src_path

def build_content(check_mode=False):
    blocklist = load_blocklist()
    logo_path, logo_mime = get_logo_asset()
    print(f"Detected active logo: {logo_path} ({logo_mime})")

    announcement_html = load_partial("announcement")
    header_html = load_partial("header")
    header_html = re.sub(r'src=["\']assets/img/logo\.[a-zA-Z]+["\']', f'src="{logo_path}"', header_html)

    contact_block_html = load_partial("contact-block")
    footer_html = load_partial("footer")

    favicon_tag = f'<link rel="icon" type="{logo_mime}" href="{logo_path}">'

    project_template = ""
    case_study_template = ""
    if (TEMPLATES_DIR / "project.html").exists():
        with open(TEMPLATES_DIR / "project.html", "r", encoding="utf-8") as f:
            project_template = f.read()
            project_template = re.sub(r'<link\s+rel=["\']icon["\'][^>]*>', favicon_tag, project_template)
    if (TEMPLATES_DIR / "case-study.html").exists():
        with open(TEMPLATES_DIR / "case-study.html", "r", encoding="utf-8") as f:
            case_study_template = f.read()
            case_study_template = re.sub(r'<link\s+rel=["\']icon["\'][^>]*>', favicon_tag, case_study_template)

    projects = []
    case_studies = []
    reports = []
    generated_pages = []

    print("[1/6] Validating & Collecting Projects...")
    for p_dir in sorted((CONTENT_DIR / "projects").glob("*")):
        if not p_dir.is_dir():
            continue
        meta_path = p_dir / "meta.json"
        if not meta_path.exists():
            continue
        
        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)

        slug = p_dir.name
        meta["slug"] = slug

        if meta.get("status") != "published":
            continue

        # Validate required fields
        for field in ["title", "summary", "country", "city"]:
            if field not in meta:
                raise ValueError(f"Project '{slug}' is missing required field '{field}'")
            if isinstance(meta[field], dict):
                validate_text(meta[field].get("ar", ""), blocklist, f"Project {slug} {field}.ar")
                validate_text(meta[field].get("en", ""), blocklist, f"Project {slug} {field}.en")

        # Resolve cover image
        images_dir = p_dir / "images"
        cover_name = meta.get("cover", "cover.jpg")
        cover_src = images_dir / cover_name
        if not cover_src.exists():
            # Check case-insensitive
            found = False
            for img in images_dir.glob("*"):
                if img.name.lower() == cover_name.lower():
                    cover_src = img
                    found = True
                    break
            if not found:
                raise FileNotFoundError(f"Cover image not found for project '{slug}': {cover_name}")

        dst_cover = CONTENT_ASSETS_DIR / "projects" / slug / "cover.webp"
        if not check_mode:
            optimize_image(cover_src, dst_cover, max_width=1200)

        meta["cover_webp"] = f"assets/content/projects/{slug}/cover.webp"
        meta["cover_raw"] = f"content/projects/{slug}/images/{cover_src.name}"

        # Collect gallery images
        gallery = []
        for img_file in sorted(images_dir.glob("*")):
            if img_file.name.lower().startswith("cover") or img_file.name.startswith("."):
                continue
            if img_file.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]:
                dst_img = CONTENT_ASSETS_DIR / "projects" / slug / f"{img_file.stem}.webp"
                if not check_mode:
                    optimize_image(img_file, dst_img, max_width=1600)
                gallery.append({
                    "raw": f"content/projects/{slug}/images/{img_file.name}",
                    "webp": f"assets/content/projects/{slug}/{img_file.stem}.webp",
                    "name": img_file.stem
                })
        meta["gallery_images"] = gallery

        projects.append(meta)

    print(f" -> Found {len(projects)} published projects.")

    print("[2/6] Validating & Collecting Case Studies...")
    for cs_dir in sorted((CONTENT_DIR / "case-studies").glob("*")):
        if not cs_dir.is_dir():
            continue
        meta_path = cs_dir / "meta.json"
        if not meta_path.exists():
            continue

        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)

        slug = cs_dir.name
        meta["slug"] = slug
        if meta.get("status") != "published":
            continue

        images_dir = cs_dir / "images"
        cover_name = meta.get("cover", "cover.jpg")
        cover_src = images_dir / cover_name
        if not cover_src.exists():
            for img in images_dir.glob("*"):
                if img.name.lower() == cover_name.lower():
                    cover_src = img
                    break

        dst_cover = CONTENT_ASSETS_DIR / "case-studies" / slug / "cover.webp"
        if not check_mode and cover_src.exists():
            optimize_image(cover_src, dst_cover, max_width=1200)

        meta["cover_webp"] = f"assets/content/case-studies/{slug}/cover.webp"
        meta["cover_raw"] = f"content/case-studies/{slug}/images/{cover_src.name}" if cover_src.exists() else ""
        case_studies.append(meta)

    print(f" -> Found {len(case_studies)} published case studies.")

    print("[3/6] Validating & Collecting Reports...")
    for r_dir in sorted((CONTENT_DIR / "reports").glob("*")):
        if not r_dir.is_dir():
            continue
        meta_path = r_dir / "meta.json"
        if not meta_path.exists():
            continue

        with open(meta_path, "r", encoding="utf-8") as f:
            meta = json.load(f)

        slug = r_dir.name
        meta["slug"] = slug
        if meta.get("status") != "published":
            continue

        images_dir = r_dir / "images"
        pages = []
        for p_name in meta.get("pages", []):
            p_src = images_dir / p_name
            if not p_src.exists():
                for img in images_dir.glob("*"):
                    if img.name.lower() == p_name.lower():
                        p_src = img
                        break
            if p_src.exists():
                dst_page = CONTENT_ASSETS_DIR / "reports" / slug / f"{p_src.stem}.webp"
                if not check_mode:
                    optimize_image(p_src, dst_page, max_width=1800)
                pages.append({
                    "raw": f"content/reports/{slug}/images/{p_src.name}",
                    "webp": f"assets/content/reports/{slug}/{p_src.stem}.webp"
                })
        meta["page_files"] = pages
        reports.append(meta)

    print(f" -> Found {len(reports)} published reports.")

    print("[4/6] Validating & Collecting Certifications...")
    certs_dir = ASSETS_DIR / "img" / "certs"
    certs = []
    if certs_dir.exists():
        for cert_file in sorted(certs_dir.glob("*")):
            if cert_file.suffix.lower() in [".png", ".jpg", ".jpeg"]:
                webp_path = cert_file.with_suffix(".webp")
                if not check_mode:
                    optimize_image(cert_file, webp_path, max_width=1600, quality=85)
                certs.append({
                    "name": cert_file.stem,
                    "filename": cert_file.name,
                    "raw": f"assets/img/certs/{cert_file.name}",
                    "webp": f"assets/img/certs/{webp_path.name}"
                })
            elif cert_file.suffix.lower() == ".pdf":
                certs.append({
                    "name": cert_file.stem,
                    "filename": cert_file.name,
                    "raw": f"assets/img/certs/{cert_file.name}",
                    "type": "pdf"
                })
    print(f" -> Found {len(certs)} certificate files in assets/img/certs.")

    # Sort items
    projects.sort(key=lambda x: x.get("order", 99))
    case_studies.sort(key=lambda x: x.get("order", 99))
    reports.sort(key=lambda x: x.get("order", 99))

    if check_mode:
        print("[CHECK MODE] All contents validated successfully with zero errors!")
        return

    # Write content-index.js
    print("[5/6] Generating assets/data/content-index.js...")
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    content_index_data = {
        "projects": projects,
        "caseStudies": case_studies,
        "reports": reports,
        "certifications": certs
    }
    with open(DATA_DIR / "content-index.js", "w", encoding="utf-8") as f:
        f.write("/* Auto-generated by tools/build.py */\n")
        f.write("window.PORTFOLIO_CONTENT = " + json.dumps(content_index_data, ensure_ascii=False, indent=2) + ";\n")

    # Generate Project Detail Pages
    print("[6/6] Compiling HTML Detail Pages...")
    for proj in projects:
        slug = proj["slug"]
        page_name = f"project-{slug}.html"
        generated_pages.append(page_name)

        # Build Scope Items HTML
        scope_ar = proj.get("scope", {}).get("ar", [])
        scope_items_html = ""
        for s in scope_ar:
            scope_items_html += f"""
            <li style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.6rem 0.85rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-sm);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2.5" style="margin-top:2px; flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{s}</span>
            </li>
            """

        # Role block
        my_role_ar = proj.get("my_role", {}).get("ar", "")
        role_block_html = ""
        if my_role_ar:
            role_block_html = f"""
            <div class="fact-item">
              <span class="fact-label">الدور والمسؤولية</span>
              <span class="fact-value" style="color:var(--accent-primary-hover);">{my_role_ar}</span>
            </div>
            """

        # Parties block
        parties_block_html = ""
        party_role_names = {
            "owner": "المالك",
            "consultant": "الاستشاري",
            "owner_consultant": "المالك والاستشاري",
            "contractor": "المقاول",
            "main_contractor": "المقاول الرئيسي",
            "subcontractor": "المقاول الباطن",
            "contractor_consultant": "استشاري المقاول"
        }
        for party in proj.get("parties", []):
            role_key = party.get("role", "owner")
            role_title = party_role_names.get(role_key, "الجهة")
            name_ar = party.get("name", {}).get("ar", "")
            if name_ar:
                parties_block_html += f"""
                <div class="fact-item">
                  <span class="fact-label">{role_title}</span>
                  <span class="fact-value">{name_ar}</span>
                </div>
                """

        # Details block
        details_block_html = ""
        for det in proj.get("details", []):
            label_ar = det.get("label", {}).get("ar", "")
            val_ar = det.get("value", {}).get("ar", "")
            if label_ar and val_ar:
                details_block_html += f"""
                <div class="fact-item">
                  <span class="fact-label">{label_ar}</span>
                  <span class="fact-value">{val_ar}</span>
                </div>
                """

        # Gallery block
        gallery_section_html = ""
        if proj["gallery_images"]:
            gallery_items_html = ""
            for g in proj["gallery_images"]:
                img_path = g["webp"] if os.path.exists(BASE_DIR / g["webp"]) else g["raw"]
                gallery_items_html += f"""
                <div class="gallery-item" data-full-src="{img_path}" data-caption="{proj['title']['ar']} - توثيق موقع">
                  <img src="{img_path}" alt="{proj['title']['ar']}" loading="lazy">
                </div>
                """
            gallery_section_html = f"""
            <div>
              <h2 class="section-title" style="font-size: 1.4rem; margin-bottom: 1rem;" data-i18n="gallery_title">معرض صور المشروع والتوثيق الميداني</h2>
              <div class="gallery-grid">
                {gallery_items_html}
              </div>
            </div>
            """

        if isinstance(proj.get("country_name"), dict) and "ar" in proj["country_name"]:
            country_name = proj["country_name"]["ar"]
        else:
            country_name = "مصر" if proj.get("country") == "egypt" else "المملكة العربية السعودية"
        country_badge = "مصر" if proj.get("country") == "egypt" else "السعودية"

        cover_img_path = proj["cover_webp"] if (BASE_DIR / proj["cover_webp"]).exists() else proj["cover_raw"]

        html = project_template
        html = html.replace("{{announcement}}", announcement_html)
        html = html.replace("{{header}}", header_html)
        html = html.replace("{{contact_block}}", contact_block_html)
        html = html.replace("{{footer}}", footer_html)

        html = html.replace("{{title}}", proj["title"]["ar"])
        html = html.replace("{{title_ar}}", proj["title"]["ar"])
        html = html.replace("{{summary}}", proj["summary"]["ar"])
        html = html.replace("{{summary_ar}}", proj["summary"]["ar"])
        html = html.replace("{{country_badge}}", country_badge)
        html = html.replace("{{country_name}}", country_name)
        html = html.replace("{{city}}", proj["city"]["ar"])
        html = html.replace("{{cover_image}}", cover_img_path)
        html = html.replace("{{scope_items}}", scope_items_html)
        html = html.replace("{{role_block}}", role_block_html)
        html = html.replace("{{parties_block}}", parties_block_html)
        html = html.replace("{{details_block}}", details_block_html)
        html = html.replace("{{gallery_section}}", gallery_section_html)

        with open(BASE_DIR / page_name, "w", encoding="utf-8") as f:
            f.write(html)

    # Generate Case Study Detail Pages
    for cs in case_studies:
        slug = cs["slug"]
        page_name = f"case-study-{slug}.html"
        generated_pages.append(page_name)

        tools_chips_html = "".join([f'<span class="chip">{t}</span>' for t in cs.get("tools", [])])
        
        impact_block_html = ""
        impact_ar = cs.get("impact", {}).get("ar", "")
        if impact_ar:
            impact_block_html = f"""
            <div class="about-card" style="border-color: rgba(14,165,233,0.3);">
              <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--accent-primary-hover); margin-bottom: 0.5rem;">الأثر الهندسي والتنفيذي</h2>
              <p class="about-card-text">{impact_ar}</p>
            </div>
            """

        deliverables_html = ""
        for d in cs.get("deliverables", []):
            d_title = d.get("title", {}).get("ar", "")
            d_type = d.get("type", "dashboard")
            d_plat = d.get("platform", "")
            deliverables_html += f"""
            <div class="pillar-card" style="background:var(--bg-surface);">
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <h3 style="font-size:1.1rem; font-weight:700;">{d_title}</h3>
                <span class="status-badge" style="background:rgba(14,165,233,0.1); color:var(--accent-primary-hover);">{d_plat.upper()}</span>
              </div>
            </div>
            """

        cover_img_path = cs["cover_webp"] if (BASE_DIR / cs["cover_webp"]).exists() else cs["cover_raw"]

        html = case_study_template
        html = html.replace("{{announcement}}", announcement_html)
        html = html.replace("{{header}}", header_html)
        html = html.replace("{{contact_block}}", contact_block_html)
        html = html.replace("{{footer}}", footer_html)

        html = html.replace("{{title}}", cs["title"]["ar"])
        html = html.replace("{{title_ar}}", cs["title"]["ar"])
        html = html.replace("{{summary}}", cs["summary"]["ar"])
        html = html.replace("{{summary_ar}}", cs["summary"]["ar"])
        html = html.replace("{{cover_image}}", cover_img_path)
        html = html.replace("{{problem}}", cs.get("problem", {}).get("ar", ""))
        html = html.replace("{{solution}}", cs.get("solution", {}).get("ar", ""))
        html = html.replace("{{impact_block}}", impact_block_html)
        html = html.replace("{{deliverables_block}}", deliverables_html)
        html = html.replace("{{tools_chips}}", tools_chips_html)

        with open(BASE_DIR / page_name, "w", encoding="utf-8") as f:
            f.write(html)

    # Synchronize header, announcement bar, and favicon in static pages
    print("Synchronizing header, announcement bar, and favicon in static pages...")
    static_page_nav_map = {
        "index.html": "home",
        "services.html": "services",
        "project-management.html": "services",
        "data-automation.html": "services",
        "projects.html": "projects",
        "contact.html": "contact",
        "404.html": ""
    }
    header_regex = re.compile(r'<header class=["\']main-header["\']>.*?</header>', re.DOTALL)
    announcement_regex = re.compile(r'<div class=["\']announcement-bar["\']>.*?</div>\s*(?=(?:<!--.*?-->\s*)?<header)', re.DOTALL)
    favicon_regex = re.compile(r'<link\s+rel=["\']icon["\'][^>]*>', re.IGNORECASE)

    for page_name, nav_active in static_page_nav_map.items():
        page_path = BASE_DIR / page_name
        if not page_path.exists():
            continue
        with open(page_path, "r", encoding="utf-8") as f:
            content = f.read()

        custom_header = header_html
        if nav_active:
            custom_header = custom_header.replace(f'class="nav-link" data-nav="{nav_active}"', f'class="nav-link active" data-nav="{nav_active}"')

        if header_regex.search(content):
            content = header_regex.sub(custom_header, content)

        if announcement_regex.search(content):
            content = announcement_regex.sub(announcement_html + "\n\n  ", content)

        if favicon_regex.search(content):
            content = favicon_regex.sub(favicon_tag, content)

        with open(page_path, "w", encoding="utf-8") as f:
            f.write(content)

    # Generate sitemap.xml
    print("Generating sitemap.xml...")
    site_base = "https://waeleraqy9.github.io/Final-Portofolio"
    static_pages = ["index.html", "services.html", "project-management.html", "data-automation.html", "projects.html", "contact.html"]
    all_pages = static_pages + generated_pages

    sitemap_lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in all_pages:
        sitemap_lines.append(f'  <url>\n    <loc>{site_base}/{p}</loc>\n    <changefreq>monthly</changefreq>\n  </url>')
    sitemap_lines.append('</urlset>')

    with open(BASE_DIR / "sitemap.xml", "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_lines) + "\n")

    print(f"Build complete! Successfully generated {len(generated_pages)} detail pages and sitemap.xml.")

if __name__ == "__main__":
    check_only = "--check" in sys.argv
    build_content(check_mode=check_only)
