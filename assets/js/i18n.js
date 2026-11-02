/**
 * Portfolio Internationalization (i18n) Engine
 * Eng. Wael Mohamed Eraqy
 * Fully bilingual (Arabic RTL primary, English LTR secondary)
 */

const translations = {
  ar: {
    // Top Bar
    "status_available": "متاح للعمل والانتقال لمشروعات مصر والمملكة العربية السعودية",
    "nda_badge": "100% التزام بالسرية وعدم الإفصاح (NDA)",
    "lang_toggle": "English",

    // Brand
    "brand_name": "م. وائل محمد عراقي",
    "brand_title": "مهندس إدارة مشروعات ومكتب فني",

    // Nav
    "nav_home": "الرئيسية",
    "nav_work_areas": "مجالات العمل",
    "nav_services": "الخدمات والمسارات",
    "nav_track_pm": "إدارة وضبط المشروعات",
    "nav_track_pm_desc": "ضبط التكاليف (EVM)، التخطيط (P6)، والمكتب الفني",
    "nav_track_data": "تحليل البيانات والأتمتة",
    "nav_track_data_desc": "لوحات Power BI، بايثون، وأتمتة n8n بالذكاء الاصطناعي",
    "nav_projects": "المشاريع",
    "nav_contact": "تواصل معي",
    "nav_cv": "تحميل الـ CV",
    "mobile_quick_contact": "تواصل سريع ومباشر",

    // Hero
    "hero_pill": "مهندس مدني • خبرة 12+ عامًا • إدارة من مصر لمشروعات مصر والمملكة العربية السعودية",
    "hero_title": "قيادة المشروعات الهندسية عبر <span class=\"highlight\">التحكم الصارم في التكاليف</span> والتخطيط الاستراتيجي وذكاء البيانات",
    "hero_lead": "خبرة متكاملة في دورة المكتب الفني الكاملة، بناء خطوط الأساس في Primavera P6، نماذج الميزانية الصفرية (Budget Zero)، وإدارة القيمة المكتسبة (EVM)، مع لوحات Power BI التفاعلية وأتمتة سير العمل عبر n8n للربط اللحظي بين الموقع والإدارة.",
    "btn_view_projects": "استعرض المشاريع",
    "btn_contact_me": "تواصل معي الآن",
    "hero_badge_text": "إدارة تحكم المشروعات والأتمتة",

    // KPIs
    "kpi_exp_num": "12+",
    "kpi_exp_label": "سنوات خبرة مهنية متراكمة",
    "kpi_projects_num": "7",
    "kpi_projects_label": "مشروعات كبرى (6 بمصر • 1 بالسعودية)",
    "kpi_compliance_num": "100%",
    "kpi_compliance_label": "حوكمة التكاليف والالتزام التعاقدي",
    "kpi_tracks_num": "2",
    "kpi_tracks_label": "مسارات عمل هندسية وبيانية متكاملة",

    // About
    "about_tag": "الملف التعريفي",
    "about_title": "خبرة هندسية تجمع بين الصرامة الميدانية وحلول ذكاء البيانات",
    "about_card1_title": "منهجية العمل والقيادة الهندسية",
    "about_card1_text": "إدارة دورة المشروع الإنشائي من دراسة مستندات العقد والمقايسة، تأسيس الميزانية الصفرية (Budget Zero)، مراجعة وتدقيق المخططات التنفيذية وشبكات التغذية، وحوكمة الصرف عبر تدقيق مستخلصات المالك ومقاولي الباطن، مع قيادة فرق العمل نحو إنجاز خالٍ من الهدر والانحرافات.",
    "about_card2_title": "التميز التنافسي: دمج الهندسة بالبيانات والأتمتة",
    "about_card2_text": "توظيف تكنولوجيا تحليل البيانات لتخطي العمل التقليدي؛ عبر نمذجة جداول الكميات والمستخلصات في مستودعات SQL Server، وتطوير لوحات Power BI تفاعلية ترصد مؤشرات الأداء اللحظية، وتصميم وكلاء أتمتة عبر n8n لتوثيق الموقع واستخراج البيانات تلقائيًا مع ضمان الاعتماد الهندسي البشري (HITL).",

    // 4 Pillars
    "pillars_tag": "ركائز التخصص",
    "pillars_title": "الأعمدة الأربعة لمنظومة إدارة وضبط المشروعات",
    "pillar1_title": "التحكم في التكاليف والميزانية الصفرية",
    "pillar1_desc": "تفكيك المقايسة وتأسيس Budget Zero وربط أكواد التكلفة (CA-Codes) مع التحليل الشهري لمؤشرات القيمة المكتسبة (EVM).",
    "pillar2_title": "التخطيط والبرمجة الزمنية (P6)",
    "pillar2_desc": "ورقة الربط (Mapping Sheet) لربط BOQ بـ WBS، تحميل الموارد والتكاليف، منحنيات S-Curve، وتحليل التأخيرات الزمنية.",
    "pillar3_title": "المكتب الفني والشوب دروينج",
    "pillar3_desc": "إعداد وتدقيق المخططات التنفيذية، ملفات الاعتماد (Submittals)، حصر الكميات الهندسي، ومخططات As-Built للتسليم.",
    "pillar4_title": "ذكاء الأعمال والأتمتة بالذكاء الاصطناعي",
    "pillar4_desc": "بناء لوحات Power BI متصلة بقواعد بيانات SQL Server، ونماذج n8n لأتمتة دورة توثيق وتقارير الموقع اليومية.",

    // 2 Tracks
    "tracks_tag": "مسارات العمل المتخصصة",
    "tracks_title": "استكشف مسارات الخبرة والحلول التفصيلية",
    "track1_title": "مسار إدارة وضبط المشروعات الإنشائية",
    "track1_desc": "حزمة شاملة تغطي حوكمة التكاليف، التخطيط والجدولة بـ Primavera P6، وإدارة المكتب الفني المتكاملة.",
    "btn_explore_pm": "استعرض مسار إدارة المشروعات",
    "track2_title": "مسار تحليل البيانات والأتمتة الذكية",
    "track2_desc": "تحويل تدفقات بيانات المشروعات إلى لوحات معلومات داعمة للقرار وأتمتة مسارات العمل بين الميدان والإدارة.",
    "btn_explore_data": "استعرض مسار البيانات والأتمتة",

    // Featured Projects
    "featured_tag": "نماذج مميزة",
    "featured_title": "مشروعات كبرى تمت قيادتها وضبطها",
    "featured_subtitle": "7 مشروعات موثقة وموزعة جغرافيًا: 6 مشروعات بمصر • مشروع رائد بالمملكة العربية السعودية.",
    "btn_view_all_projects": "عرض جميع المشاريع (7 مشاريع: 6 بمصر • 1 بالسعودية)",

    // Education & Certs
    "edu_tag": "المؤهلات والدورات",
    "edu_title": "التعليم الأكاديمي والتطوير المهني المستمر",
    "degree_title": "بكالوريوس الهندسة المدنية",
    "degree_issuer": "جامعة الفيوم – كلية الهندسة (2009 – 2014)",
    "degree_desc": "دراسة متخصصة في الإنشاءات، الهندسة الإدارية، وإدارة المشروعات مع التركيز على التحليل الإنشائي والتنفيذ الميداني.",
    "cert_list_title": "الشهادات والدورات المهنية المعتمدة",
    "course1_title": "دورة التحكم في التكاليف (Cost Control) — HA Management & Experts Academy",
    "course2_title": "دورة التخطيط والمتابعة (Planning & Scheduling) — HA Management",
    "course3_title": "دورة تحليل التأخيرات وتمديد المدة (Delay Analysis & EOT) — HA Management",
    "course4_title": "دورة تحليل البيانات وPower BI المتقدمة — Mazen Analytics",
    "certs_gallery_tag": "الوثائق والشهادات المعتمدة",
    "certs_gallery_title": "معرض الشهادات المهنية المعتمدة",
    "certs_gallery_subtitle": "شهادات إتمام الورش التخصصية الصادرة والمعتمدة من HA Management & Training في إدارة وضبط المشروعات",
    "certs_verified_badge": "شهادات إتمام ورش معتمدة",
    "cert_cost_control_title": "ورشة التحكم وضبط التكاليف للمشاريع (CCW-02)",
    "cert_cost_control_issuer": "HA Management & Training • 20 ساعة تدريبية معتمدة",
    "cert_delay_title": "ورشة تحليل التأخيرات وتمديد المدة (DAW)",
    "cert_delay_issuer": "HA Management & Training • 20 ساعة تدريبية معتمدة",
    "cert_cmw_title": "ورشة إدارة المشروعات الإنشائية (CMW)",
    "cert_cmw_issuer": "HA Management & Training • 20 ساعة تدريبية معتمدة",
    "cert_date_2026": "مايو 2026",
    "cert_date_cmw": "يوليو 2026",
    "cert_view_btn": "استعراض الوثيقة الأصلية",
    "cert_zoom_hint": "تكبير الشهادة",

    // Shared Final Contact
    "contact_block_title": "جاهز لمناقشة مشروعكم القادم؟",
    "contact_block_desc": "سواء كنتم بحاجة لضبط حوكمة التكاليف، إعداد خطة زمنية معتمدة، إدارة المكتب الفني، أو بناء منظومة تحليل بيانات مؤتمتة لمشروعكم.",
    "btn_whatsapp_cta": "محادثة واتساب فورية",
    "btn_email_cta": "إرسال بريد إلكتروني",
    "btn_linkedin_cta": "الملف الشخصي على لينكد إن",
    "btn_contact_page_cta": "صفحة التواصل المباشر",

    // Footer
    "footer_copy": "© 2026 م. وائل محمد عراقي. جميع الحقوق محفوظة.",
    "footer_title": "مهندس إدارة مشروعات ومكتب فني | مصر والسعودية",

    // Projects Page
    "projects_page_title": "سجل المشاريع الهندسية",
    "projects_page_subtitle": "مشروعات إنشائية وبنية تحتية ومستشفيات رائدة تم تنفيذها وإدارتها في مصر والمملكة العربية السعودية (6 بمصر • 1 بالسعودية).",
    "filter_all": "جميع المشاريع",
    "filter_egypt": "مشاريع مصر",
    "filter_saudi": "مشاريع السعودية",
    "project_owner_prefix": "المالك: ",

    // Detail Page
    "back_to_projects": "العودة لجميع المشاريع",
    "facts_title": "بطاقة معلومات المشروع",
    "role_label": "الدور والمسؤولية",
    "scope_title": "نطاق العمل والمسؤوليات المنفذة",
    "gallery_title": "معرض صور المشروع والتوثيق الميداني",

    // Project Management Page
    "pm_page_title": "إدارة وضبط المشروعات الإنشائية",
    "pm_page_subtitle": "منهجية متكاملة تبدأ من دراسة العقد وبناء الميزانية الصفرية إلى الجدولة الزمنية وحوكمة التكاليف.",
    "tab_cost_control": "التحكم في التكاليف (Cost Control)",
    "tab_planning": "التخطيط والبرمجة الزمنية (Planning)",
    "tab_technical_office": "المكتب الفني (Technical Office)",
    "reports_title": "نماذج التقارير والتحليلات الهندسية المعتمدة",

    // Data Automation Page
    "data_page_title": "تحليل البيانات والأتمتة الهندسية",
    "data_page_subtitle": "تحويل البيانات المبعثرة إلى قرارات تنفيذية رصينة، وأتمتة تدفق المعلومات بين الموقع والإدارة.",
    "tab_data_analysis": "تحليل البيانات (Data Analysis)",
    "tab_automation_ai": "الأتمتة والذكاء الاصطناعي (Automation & AI)",
    "case_studies_title": "دراسات الحالة التطبيقية",

    // EVM Calculator
    "evm_title": "محاكي إدارة القيمة المكتسبة (EVM) التفاعلي",
    "evm_badge": "مثال توضيحي قياسي",
    "evm_bac": "الميزانية الكلية عند الإتمام (BAC)",
    "evm_planned": "نسبة الإنجاز المخطط (% Planned)",
    "evm_earned": "نسبة الإنجاز الفعلي (% Earned)",
    "evm_ac": "التكلفة الفعلية المنصرفة (AC)",
    "evm_pv": "القيمة المخططة (PV)",
    "evm_ev": "القيمة المكتسبة (EV)",
    "evm_cpi": "مؤشر أداء التكلفة (CPI)",
    "evm_spi": "مؤشر أداء الجدول (SPI)",
    "evm_eac": "التكلفة المتوقعة عند النهاية (EAC)",
    "evm_vac": "انحراف التكلفة عند الإتمام (VAC)",
    "evm_currency": "ج.م",
    "scenario_healthy": "مشروع منضبط",
    "scenario_cost_overrun": "تجاوز تكلفة",
    "scenario_behind_schedule": "تأخر زمني",

    // Contact Page
    "contact_page_h1": "تواصل معي",
    "contact_page_sub": "متاح لمناقشة فرص العمل، الاستشارات الهندسية، وحوكمة المشروعات.",
    "contact_availability_box": "المقر: مصر • متاح للانتقال الفوري لأي دولة عربية أو التعاقد عن بُعد • الرد مضمون خلال 24 ساعة.",
    "form_name": "الاسم الكامل",
    "form_email": "البريد الإلكتروني",
    "form_phone": "رقم الهاتف / واتساب",
    "form_company": "الشركة أو الجهة",
    "form_type": "طبيعة الرسالة",
    "form_type_placeholder": "اختر نوع التواصل...",
    "form_type_job": "فرصة عمل / تعيين",
    "form_type_project": "مشروع أو إدارة مكتب فني",
    "form_type_consulting": "استشارة أو أتمتة هندسية",
    "form_message": "نص الرسالة أو تفاصيل الاستفسار",
    "form_send_btn": "إرسال الرسالة",
    "form_sending": "جاري الإرسال...",
    "form_success": "وصلت رسالتكم بنجاح. سأقوم بالرد والتواصل معكم خلال 24 ساعة.",
    "form_error": "تعذر الإرسال حاليًا. يرجى المراسلة مباشرة عبر واتساب أو البريد الإلكتروني."
  },
  en: {
    // Top Bar
    "status_available": "Available for Relocation & Remote Work (Egypt & KSA)",
    "nda_badge": "100% NDA Compliant & Confidentiality Assured",
    "lang_toggle": "عربي",

    // Brand
    "brand_name": "Eng. Wael Mohamed Eraqy",
    "brand_title": "Project Controls & Technical Office Engineer",

    // Nav
    "nav_home": "Home",
    "nav_work_areas": "Work Areas",
    "nav_services": "Services & Tracks",
    "nav_track_pm": "Project Management & Controls",
    "nav_track_pm_desc": "Cost Control (EVM), Scheduling (P6), & Technical Office",
    "nav_track_data": "Data Analysis & Automation",
    "nav_track_data_desc": "Power BI Dashboards, Python, & n8n AI Workflows",
    "nav_projects": "Projects",
    "nav_contact": "Contact",
    "nav_cv": "Download CV",
    "mobile_quick_contact": "Quick Contact",

    // Hero
    "hero_pill": "Civil Engineer • 12+ Years Experience • Managing Egypt & KSA Mega Projects",
    "hero_title": "Leading Engineering Projects Through <span class=\"highlight\">Strict Cost Control</span>, Strategic Planning & Data Intelligence",
    "hero_lead": "End-to-end technical office leadership, Primavera P6 baselines, Budget Zero models, and Earned Value Management (EVM), combined with interactive Power BI dashboards and n8n workflow automation bridging site operations with executive management.",
    "btn_view_projects": "View Projects",
    "btn_contact_me": "Contact Me",
    "hero_badge_text": "Project Controls & Engineering Automation",

    // KPIs
    "kpi_exp_num": "12+",
    "kpi_exp_label": "Years of Professional Experience",
    "kpi_projects_num": "7",
    "kpi_projects_label": "Documented Mega Projects (6 Egypt • 1 Saudi Arabia)",
    "kpi_compliance_num": "100%",
    "kpi_compliance_label": "Cost Governance & Contract Compliance",
    "kpi_tracks_num": "2",
    "kpi_tracks_label": "Integrated Engineering & Data Tracks",

    // About
    "about_tag": "Executive Profile",
    "about_title": "Engineering Expertise Combining Field Rigor with Data Intelligence",
    "about_card1_title": "Work Approach & Engineering Leadership",
    "about_card1_text": "Managing the full construction lifecycle from contract review and BOQ breakdown to establishing Budget Zero, coordinating complex multi-disciplinary shop drawings, and enforcing strict financial governance across owner and subcontractor interim payment certificates.",
    "about_card2_title": "Competitive Edge: Engineering Meets Data & AI",
    "about_card2_text": "Elevating project management beyond conventional routines by structuring BOQ and site progress in SQL Server warehouses, developing dynamic Power BI dashboards for executive decision support, and creating automated n8n workflows with Human-in-the-Loop verification.",

    // 4 Pillars
    "pillars_tag": "Core Pillars",
    "pillars_title": "The Four Pillars of Project Controls & Engineering Excellence",
    "pillar1_title": "Cost Control & Budget Zero",
    "pillar1_desc": "BOQ breakdown, Budget Zero establishment, CA-Code allocation, and monthly Earned Value Management (EVM) variance reporting.",
    "pillar2_title": "Planning & Scheduling (P6)",
    "pillar2_desc": "Excel Mapping Sheet linking BOQ to WBS, cost/resource loading, S-Curves, and forensic Delay Impact Analysis.",
    "pillar3_title": "Technical Office & Shop Drawings",
    "pillar3_desc": "Producing and coordinating structural/architectural shop drawings, material submittals, quantity surveying, and final As-Built packages.",
    "pillar4_title": "Business Intelligence & AI Automation",
    "pillar4_desc": "Building Star-Schema Power BI models linked to SQL Server, and deploying n8n workflows for automated daily site documentation.",

    // 2 Tracks
    "tracks_tag": "Specialized Tracks",
    "tracks_title": "Explore Dedicated Capabilities & Methodologies",
    "track1_title": "Project Management & Controls Track",
    "track1_desc": "A comprehensive engineering suite covering cost governance, Primavera P6 planning, and full technical office lifecycle.",
    "btn_explore_pm": "Explore PM & Controls",
    "track2_title": "Data Analysis & Automation Track",
    "track2_desc": "Transforming fragmented project data streams into executive decision intelligence and automated field-to-office workflows.",
    "btn_explore_data": "Explore Data & AI",

    // Featured Projects
    "featured_tag": "Selected Work",
    "featured_title": "Major Projects Managed & Controlled",
    "featured_subtitle": "7 documented projects across key geographies: 6 in Egypt • 1 in Saudi Arabia.",
    "btn_view_all_projects": "View All Projects (7 Projects: 6 in Egypt • 1 in Saudi Arabia)",

    // Education & Certs
    "edu_tag": "Qualifications & Credentials",
    "edu_title": "Academic Background & Professional Certifications",
    "degree_title": "B.Sc. in Civil Engineering",
    "degree_issuer": "Fayoum University – Faculty of Engineering (2009 – 2014)",
    "degree_desc": "Specialized curriculum in structural engineering, construction management, and project controls.",
    "cert_list_title": "Certified Professional Courses & Credentials",
    "course1_title": "Cost Control Course — HA Management & Experts Academy",
    "course2_title": "Planning & Scheduling Course — HA Management",
    "course3_title": "Delay Analysis & EOT Claims Course — HA Management",
    "course4_title": "Advanced Data Analysis & Power BI Course — Mazen Analytics",
    "certs_gallery_tag": "Verified Credentials & Certificates",
    "certs_gallery_title": "Professional Certifications Showcase",
    "certs_gallery_subtitle": "Verified completion certificates issued by HA Management & Training in Project Controls & Management",
    "certs_verified_badge": "Verified Credentials",
    "cert_cost_control_title": "Cost Control 02 Workshop (CCW-02)",
    "cert_cost_control_issuer": "HA Management & Training • 20 Educational Hours",
    "cert_delay_title": "Delay Analysis Workshop (DAW)",
    "cert_delay_issuer": "HA Management & Training • 20 Educational Hours",
    "cert_cmw_title": "Introduction to Construction Management Workshop (CMW)",
    "cert_cmw_issuer": "HA Management & Training • 20 Educational Hours",
    "cert_date_2026": "May 2026",
    "cert_date_cmw": "July 2026",
    "cert_view_btn": "View Full Certificate",
    "cert_zoom_hint": "Click to Enlarge",

    // Shared Final Contact
    "contact_block_title": "Ready to Discuss Your Next Project?",
    "contact_block_desc": "Whether you require cost governance, a baseline schedule, technical office management, or automated data intelligence for your projects.",
    "btn_whatsapp_cta": "Direct WhatsApp Chat",
    "btn_email_cta": "Send an Email",
    "btn_linkedin_cta": "Connect on LinkedIn",
    "btn_contact_page_cta": "Contact Page",

    // Footer
    "footer_copy": "© 2026 Eng. Wael Mohamed Eraqy. All Rights Reserved.",
    "footer_title": "Project Controls & Technical Office Engineer | Egypt & KSA",

    // Projects Page
    "projects_page_title": "Engineering Projects Portfolio",
    "projects_page_subtitle": "Major civil, healthcare, infrastructure, and compound developments delivered across Egypt and Saudi Arabia (6 in Egypt • 1 in Saudi Arabia).",
    "filter_all": "All Projects",
    "filter_egypt": "Egypt Projects",
    "filter_saudi": "Saudi Arabia Projects",
    "project_owner_prefix": "Owner: ",

    // Detail Page
    "back_to_projects": "Back to all projects",
    "facts_title": "Project Facts & Summary",
    "role_label": "Role & Responsibility",
    "scope_title": "Executed Scope of Work",
    "gallery_title": "Project Visual Gallery & Field Documentation",

    // Project Management Page
    "pm_page_title": "Project Management & Controls",
    "pm_page_subtitle": "From contract study and Budget Zero creation to Primavera P6 baselines and periodic progress governance.",
    "tab_cost_control": "Cost Control",
    "tab_planning": "Planning & Scheduling",
    "tab_technical_office": "Technical Office",
    "reports_title": "Verified Engineering Reports & Analysis Packages",

    // Data Automation Page
    "data_page_title": "Data Analysis & Engineering Automation",
    "data_page_subtitle": "Empowering engineering decisions with robust data modeling and automated site-to-office workflows.",
    "tab_data_analysis": "Data Analysis",
    "tab_automation_ai": "Automation & AI",
    "case_studies_title": "Applied Case Studies",

    // EVM Calculator
    "evm_title": "Interactive Earned Value Management (EVM) Simulator",
    "evm_badge": "Standard Illustrative Example",
    "evm_bac": "Budget at Completion (BAC)",
    "evm_planned": "Planned Progress (% Planned)",
    "evm_earned": "Earned Progress (% Earned)",
    "evm_ac": "Actual Cost (AC)",
    "evm_pv": "Planned Value (PV)",
    "evm_ev": "Earned Value (EV)",
    "evm_cpi": "Cost Performance Index (CPI)",
    "evm_spi": "Schedule Performance Index (SPI)",
    "evm_eac": "Estimate at Completion (EAC)",
    "evm_vac": "Variance at Completion (VAC)",
    "evm_currency": "EGP",
    "scenario_healthy": "Healthy Project",
    "scenario_cost_overrun": "Cost Overrun",
    "scenario_behind_schedule": "Behind Schedule",

    // Contact Page
    "contact_page_h1": "Contact Me",
    "contact_page_sub": "Available for career opportunities, engineering consulting, and project controls leadership.",
    "contact_availability_box": "Based in Egypt • Available for immediate relocation or remote engagement • Response guaranteed within 24 hours.",
    "form_name": "Full Name",
    "form_email": "Email Address",
    "form_phone": "Phone / WhatsApp",
    "form_company": "Company / Organization",
    "form_type": "Inquiry Type",
    "form_type_placeholder": "Select inquiry type...",
    "form_type_job": "Career / Job Opportunity",
    "form_type_project": "Project Controls & Technical Office",
    "form_type_consulting": "Consulting or Engineering Automation",
    "form_message": "Message / Project Details",
    "form_send_btn": "Send Message",
    "form_sending": "Sending...",
    "form_success": "Your message was sent successfully. I will get back to you within 24 hours.",
    "form_error": "Failed to send message. Please contact me directly via WhatsApp or Email."
  }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'ar';

function setLanguage(lang) {
  if (lang !== 'ar' && lang !== 'en') lang = 'ar';
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Update translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update bilingual toggle buttons
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.textContent = lang === 'ar' ? 'English' : 'عربي';
  });

  // Update dynamic inputs or placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Trigger custom event
  window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

function toggleLanguage() {
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  });
});
