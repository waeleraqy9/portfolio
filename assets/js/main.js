/**
 * Main Application Logic & Interactivity
 * Eng. Wael Mohamed Eraqy Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTabs();
  initEVMCalculator();
  initLightbox();
  initProjectsFilter();
  initContactForm();
  initEmailCopy();
});

/* ==========================================================================
   1. Mobile Navigation & Drawer
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    function toggleNav(forceState) {
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', shouldOpen);
      hamburger.classList.toggle('active', shouldOpen);
      hamburger.setAttribute('aria-expanded', shouldOpen.toString());
      document.body.style.overflow = shouldOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target) && mobileNav.classList.contains('open')) {
        toggleNav(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleNav(false);
      }
    });

    // Close when clicking any link inside mobile-nav
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleNav(false);
      });
    });
  }
}

/* ==========================================================================
   2. Accessible Tabs System with Deep-Link Hashes
   ========================================================================== */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-wrapper');

  tabContainers.forEach(wrapper => {
    const tabButtons = wrapper.querySelectorAll('.tab-btn');
    const tabPanels = wrapper.querySelectorAll('.tab-panel');

    function activateTab(targetId) {
      tabButtons.forEach(btn => {
        const isActive = btn.getAttribute('data-target') === targetId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
      });

      tabPanels.forEach(panel => {
        const isMatch = panel.getAttribute('id') === targetId;
        panel.classList.toggle('active', isMatch);
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        activateTab(targetId);
        // Update URL hash cleanly
        if (history.pushState) {
          history.pushState(null, null, '#' + targetId);
        } else {
          location.hash = '#' + targetId;
        }
      });
    });

    // Check if initial hash matches one of the tabs
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const matchingBtn = wrapper.querySelector(`.tab-btn[data-target="${hashId}"]`);
      if (matchingBtn) {
        activateTab(hashId);
      }
    }

    window.addEventListener('hashchange', () => {
      const hashId = window.location.hash.substring(1);
      const matchingBtn = wrapper.querySelector(`.tab-btn[data-target="${hashId}"]`);
      if (matchingBtn) {
        activateTab(hashId);
      }
    });
  });
}

/* ==========================================================================
   3. Interactive EVM (Earned Value Management) Calculator
   ========================================================================== */
function initEVMCalculator() {
  const evmBox = document.querySelector('.evm-box');
  if (!evmBox) return;

  const bacInput = document.getElementById('evm-bac');
  const bacRange = document.getElementById('evm-bac-range');
  const plannedInput = document.getElementById('evm-planned');
  const plannedRange = document.getElementById('evm-planned-range');
  const earnedInput = document.getElementById('evm-earned');
  const earnedRange = document.getElementById('evm-earned-range');
  const acInput = document.getElementById('evm-ac');
  const acRange = document.getElementById('evm-ac-range');

  const pvDisplay = document.getElementById('evm-out-pv');
  const evDisplay = document.getElementById('evm-out-ev');
  const cpiDisplay = document.getElementById('evm-out-cpi');
  const spiDisplay = document.getElementById('evm-out-spi');
  const eacDisplay = document.getElementById('evm-out-eac');
  const vacDisplay = document.getElementById('evm-out-vac');
  const diagnosisDisplay = document.getElementById('evm-out-diagnosis');

  function syncAndCalculate(source, target) {
    if (source && target) target.value = source.value;
    calculateEVM();
  }

  function formatCurrency(val) {
    const isAr = (currentLang === 'ar');
    const curr = isAr ? 'ج.م' : 'EGP';
    const formatted = Math.round(val).toLocaleString('en-US');
    return val < 0 ? `−${Math.abs(Math.round(val)).toLocaleString('en-US')} ${curr}` : `${formatted} ${curr}`;
  }

  function calculateEVM() {
    const bac = parseFloat(bacInput.value) || 0;
    const plannedPct = (parseFloat(plannedInput.value) || 0) / 100;
    const earnedPct = (parseFloat(earnedInput.value) || 0) / 100;
    const ac = parseFloat(acInput.value) || 0;

    const pv = bac * plannedPct;
    const ev = bac * earnedPct;
    const cpi = ac > 0 ? (ev / ac) : 1;
    const spi = pv > 0 ? (ev / pv) : 1;
    const eac = cpi > 0 ? (bac / cpi) : bac;
    const vac = bac - eac;

    pvDisplay.textContent = formatCurrency(pv);
    evDisplay.textContent = formatCurrency(ev);
    cpiDisplay.textContent = cpi.toFixed(2);
    spiDisplay.textContent = spi.toFixed(2);
    eacDisplay.textContent = formatCurrency(eac);
    vacDisplay.textContent = formatCurrency(vac);

    // Style chips
    updateChip('evm-cpi-chip', cpi >= 1.0 ? 'success' : 'danger', cpi >= 1.0 ? (currentLang === 'ar' ? 'وفر بالتكلفة' : 'Under Budget') : (currentLang === 'ar' ? 'تجاوز تكلفة' : 'Cost Overrun'));
    updateChip('evm-spi-chip', spi >= 1.0 ? 'success' : 'danger', spi >= 1.0 ? (currentLang === 'ar' ? 'متقدم/منضبط' : 'Ahead/On Time') : (currentLang === 'ar' ? 'متأخر زمنيًا' : 'Behind Schedule'));

    // Diagnosis Text
    if (diagnosisDisplay) {
      if (cpi >= 1.0 && spi >= 1.0) {
        diagnosisDisplay.textContent = currentLang === 'ar' 
          ? 'المشروع في حالة مثالية: مؤشر التكلفة ممتاز ومعدل الإنجاز الزمني يسبق أو يطابق خط الأساس المعتمد.' 
          : 'Project is in prime condition: Cost index is healthy and progress meets or exceeds the baseline schedule.';
      } else if (cpi < 1.0 && spi >= 1.0) {
        diagnosisDisplay.textContent = currentLang === 'ar'
          ? 'المشروع متقدم أو منضبط زمنيًا لكن يعاني من تجاوز بالتكلفة (Cost Overrun). يلزم تدقيق فواتير المشتريات ومعدلات استهلاك المواد.'
          : 'Project is on schedule but experiencing cost overrun. Material consumption rates and procurement pricing require immediate audit.';
      } else if (cpi >= 1.0 && spi < 1.0) {
        diagnosisDisplay.textContent = currentLang === 'ar'
          ? 'المشروع منضبط ماليًا لكنه متأخر زمنيًا (Behind Schedule). يُوصى بتكثيف الموارد على الأنشطة الحرجة وتطبيق خطة تسريع (Fast-tracking).'
          : 'Project is cost-effective but behind schedule. Recommend resource crashing on critical path activities or schedule fast-tracking.';
      } else {
        diagnosisDisplay.textContent = currentLang === 'ar'
          ? 'تنبيه حرج: المشروع يعاني من تأخر زمني وتجاوز مالي في آنٍ واحد. يتطلب تدخلاً هندسيًا عاجلاً وإعادة موازنة خط الأساس (Re-baselining).'
          : 'Critical Alert: Project faces concurrent schedule delay and cost overruns. Requires immediate PMO intervention and re-baselining.';
      }
    }
  }

  function updateChip(id, statusClass, text) {
    const chip = document.getElementById(id);
    if (!chip) return;
    chip.className = `status-chip ${statusClass}`;
    chip.textContent = text;
  }

  // Bind Listeners
  if (bacInput && bacRange) {
    bacInput.addEventListener('input', () => syncAndCalculate(bacInput, bacRange));
    bacRange.addEventListener('input', () => syncAndCalculate(bacRange, bacInput));
  }
  if (plannedInput && plannedRange) {
    plannedInput.addEventListener('input', () => syncAndCalculate(plannedInput, plannedRange));
    plannedRange.addEventListener('input', () => syncAndCalculate(plannedRange, plannedInput));
  }
  if (earnedInput && earnedRange) {
    earnedInput.addEventListener('input', () => syncAndCalculate(earnedInput, earnedRange));
    earnedRange.addEventListener('input', () => syncAndCalculate(earnedRange, earnedInput));
  }
  if (acInput && acRange) {
    acInput.addEventListener('input', () => syncAndCalculate(acInput, acRange));
    acRange.addEventListener('input', () => syncAndCalculate(acRange, acInput));
  }

  // Scenarios
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-scenario');
      if (type === 'healthy') {
        bacInput.value = 10000000; bacRange.value = 10000000;
        plannedInput.value = 75; plannedRange.value = 75;
        earnedInput.value = 78; earnedRange.value = 78;
        acInput.value = 7200000; acRange.value = 7200000;
      } else if (type === 'cost-overrun') {
        bacInput.value = 10000000; bacRange.value = 10000000;
        plannedInput.value = 70; plannedRange.value = 70;
        earnedInput.value = 70; earnedRange.value = 70;
        acInput.value = 8500000; acRange.value = 8500000;
      } else if (type === 'behind-schedule') {
        bacInput.value = 10000000; bacRange.value = 10000000;
        plannedInput.value = 80; plannedRange.value = 80;
        earnedInput.value = 60; earnedRange.value = 60;
        acInput.value = 6000000; acRange.value = 6000000;
      }
      calculateEVM();
    });
  });

  window.addEventListener('langChanged', calculateEVM);
  calculateEVM();
}

/* ==========================================================================
   4. Photo & Report Gallery Lightbox
   ========================================================================== */
function initLightbox() {
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&lsaquo;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&rsaquo;</button>
      <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="Enlarged view">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentGallery = [];
  let currentIndex = 0;

  function openLightbox(gallery, index) {
    currentGallery = gallery;
    currentIndex = index;
    updateLightboxView();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxView() {
    if (!currentGallery[currentIndex]) return;
    const item = currentGallery[currentIndex];
    lbImg.src = item.src;
    lbCaption.textContent = item.caption || '';
  }

  function nextImage() {
    if (currentIndex < currentGallery.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateLightboxView();
  }

  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentGallery.length - 1;
    }
    updateLightboxView();
  }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') (document.dir === 'rtl') ? prevImage() : nextImage();
    if (e.key === 'ArrowLeft') (document.dir === 'rtl') ? nextImage() : prevImage();
  });

  // Attach click listener to gallery items
  document.querySelectorAll('.gallery-item, .report-thumb-card').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = el.closest('.gallery-grid') || el.closest('.reports-grid') || document;
      const items = Array.from(parent.querySelectorAll('.gallery-item, .report-thumb-card'));
      const galleryData = items.map(it => ({
        src: it.getAttribute('data-full-src') || it.querySelector('img')?.src || '',
        caption: it.getAttribute('data-caption') || it.querySelector('img')?.alt || ''
      }));
      const idx = items.indexOf(el);
      openLightbox(galleryData, Math.max(0, idx));
    });
  });

  // Attach click listener to cert cards & action buttons to trigger lightbox
  document.querySelectorAll('.cert-card').forEach(card => {
    const thumb = card.querySelector('.gallery-item');
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-item') === thumb) return;
      e.preventDefault();
      thumb?.click();
    });
  });
}

/* ==========================================================================
   5. Projects Filtering Logic
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-country]');
  if (!filterBtns.length || !projectCards.length) return;

  // Dynamically update filter count numbers based on actual project cards
  const counts = { all: projectCards.length, egypt: 0, saudi: 0 };
  projectCards.forEach(card => {
    const ctry = card.getAttribute('data-country');
    if (counts[ctry] !== undefined) counts[ctry]++;
  });

  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    const count = counts[filter] !== undefined ? counts[filter] : 0;
    btn.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().startsWith('(')) {
        node.textContent = ` (${count})`;
      }
    });
  });

  function applyFilter(filter) {
    filterBtns.forEach(btn => {
      const match = btn.getAttribute('data-filter') === filter;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', match);
    });

    projectCards.forEach(card => {
      const country = card.getAttribute('data-country');
      if (filter === 'all' || country === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
      if (history.pushState) {
        history.pushState(null, null, filter === 'all' ? '#all' : '#' + filter);
      }
    });
  });

  // Check URL hash
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (hash === 'egypt' || hash === 'saudi' || hash === 'all') {
      applyFilter(hash);
    }
  }
}

/* ==========================================================================
   6. Contact Form (Web3Forms AJAX Submission)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgBox = document.getElementById('form-status-msg');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.textContent = (currentLang === 'ar') ? 'جاري الإرسال...' : 'Sending...';

    msgBox.className = 'form-msg';
    msgBox.style.display = 'none';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (response.status === 200) {
        msgBox.className = 'form-msg success';
        msgBox.textContent = (currentLang === 'ar')
          ? 'وصلت رسالتكم بنجاح. سأقوم بالرد والتواصل معكم خلال 24 ساعة.'
          : 'Your message was sent successfully. I will get back to you within 24 hours.';
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      msgBox.className = 'form-msg error';
      msgBox.textContent = (currentLang === 'ar')
        ? 'تعذر الإرسال حاليًا. يرجى المراسلة مباشرة عبر واتساب أو البريد الإلكتروني.'
        : 'Failed to send message. Please contact me directly via WhatsApp or Email.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ==========================================================================
   7. Copy Email Helper
   ========================================================================== */
function initEmailCopy() {
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'waeleraqy9@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color:#34d399">${currentLang === 'ar' ? 'تم النسخ ✓' : 'Copied ✓'}</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      });
    });
  });
}
