// CompTIA Security+ (SY0-701) Advanced In-App PDF Reader Engine
// Powered by Mozilla PDF.js (100% Offline with HTTP Range Streaming)

(function() {
  'use strict';

  // State
  const STORAGE_KEY_LAST_READ = 'comptia_pdf_last_read_v1';
  const STORAGE_KEY_BOOKMARKS = 'comptia_pdf_bookmarks_v1';
  const STORAGE_KEY_READER_THEME = 'comptia_pdf_theme_v1';

  let pdfDoc = null;
  let currentBookKey = 'dumps'; // 'dumps'
  let pageNum = 1;
  let pageRendering = false;
  let pageNumPending = null;
  let currentScale = 1.25;
  let currentRotation = 0;
  let currentReadingMode = localStorage.getItem(STORAGE_KEY_READER_THEME) || 'normal';
  let activeRenderTask = null;

  const BOOKS = {
    guide: {
      key: 'guide',
      titleEn: 'CompTIA Security+ Study Guide (Exam SY0-701) 9th Edition',
      titleUz: 'CompTIA Security+ Study Guide (SY0-701) 9-Nashr Rasmiy Darslik',
      author: 'Mike Chapple & David Seidl (Sybex / Wiley)',
      totalPages: 993,
      url: 'books/CompTIA Security+ Study Guide SY0-701 Ninth Edition.pdf',
      externalApi: '/api/open-study-guide',
      quickJumps: [
        { nameUz: 'Bosh sahifa / Muqova', nameEn: 'Cover Page', page: 1 },
        { nameUz: 'Mundarija (Contents)', nameEn: 'Table of Contents', page: 15 },
        { nameUz: 'Domain 1.0 (Concepts)', nameEn: 'Domain 1.0: Concepts', page: 47 },
        { nameUz: 'Domain 2.0 (Threats)', nameEn: 'Domain 2.0: Threats', page: 215 },
        { nameUz: 'Domain 3.0 (Architecture)', nameEn: 'Domain 3.0: Architecture', page: 415 },
        { nameUz: 'Domain 4.0 (Operations)', nameEn: 'Domain 4.0: Operations', page: 595 },
        { nameUz: 'Domain 5.0 (Management)', nameEn: 'Domain 5.0: Management', page: 781 },
        { nameUz: 'Amaliy Imtihon (Exam)', nameEn: 'Practice Exam', page: 885 },
        { nameUz: 'Glossariy (Lug\'at)', nameEn: 'Glossary (Terms)', page: 927 }
      ]
    },
    dumps: {
      key: 'dumps',
      titleEn: 'CompTIA SY0-701 Practice Test Dumps',
      titleUz: 'CompTIA SY0-701 Practice Test Dumps (144+ Savollar)',
      author: 'Authentic Real Exam Questions & Explanations',
      totalPages: 279,
      url: 'books/CompTIA-SY0-701 2.pdf',
      externalApi: '/api/open-dumps-pdf',
      quickJumps: [
        { nameUz: '1-savoldan boshlash', nameEn: 'Question #1', page: 1 },
        { nameUz: 'Savol #25+ (30-bet)', nameEn: 'Question #25+ (Page 30)', page: 30 },
        { nameUz: 'Savol #50+ (65-bet)', nameEn: 'Question #50+ (Page 65)', page: 65 },
        { nameUz: 'Savol #80+ (110-bet)', nameEn: 'Question #80+ (Page 110)', page: 110 },
        { nameUz: 'Savol #110+ (160-bet)', nameEn: 'Question #110+ (Page 160)', page: 160 },
        { nameUz: 'Savol #130+ (210-bet)', nameEn: 'Question #130+ (Page 210)', page: 210 },
        { nameUz: 'Yakuniy savollar (260-bet)', nameEn: 'Final Questions (Page 260)', page: 260 }
      ]
    }
  };

  function getLastReadPage(bookKey) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_LAST_READ) || '{}');
      return data[bookKey] || 1;
    } catch {
      return 1;
    }
  }

  function setLastReadPage(bookKey, page) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_LAST_READ) || '{}');
      data[bookKey] = page;
      localStorage.setItem(STORAGE_KEY_LAST_READ, JSON.stringify(data));
    } catch {}
  }

  function getBookmarks(bookKey) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '{}');
      return data[bookKey] || [];
    } catch {
      return [];
    }
  }

  function saveBookmarks(bookKey, list) {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '{}');
      data[bookKey] = list;
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(data));
    } catch {}
  }

  function isPageBookmarked(bookKey, page) {
    const list = getBookmarks(bookKey);
    return list.some(b => b.page === page);
  }

  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.min.js';
  }

  let dom = {};

  function initDom() {
    dom = {
      readerWrapper: document.getElementById('embedded-pdf-reader'),
      catalogView: document.getElementById('pdf-catalog-cards'),
      canvas: document.getElementById('pdf-render-canvas'),
      canvasContainer: document.getElementById('pdf-canvas-container'),
      loadingOverlay: document.getElementById('pdf-loading-overlay'),
      loadingText: document.getElementById('pdf-loading-text'),
      bookTitle: document.getElementById('pdf-active-book-title'),
      pageInput: document.getElementById('pdf-page-num-input'),
      totalPagesSpan: document.getElementById('pdf-total-pages-span'),
      scrubber: document.getElementById('pdf-page-scrubber'),
      btnPrev: document.getElementById('pdf-btn-prev'),
      btnNext: document.getElementById('pdf-btn-next'),
      btnZoomIn: document.getElementById('pdf-btn-zoom-in'),
      btnZoomOut: document.getElementById('pdf-btn-zoom-out'),
      zoomSelect: document.getElementById('pdf-zoom-select'),
      btnFitWidth: document.getElementById('pdf-btn-fit-width'),
      btnRotate: document.getElementById('pdf-btn-rotate'),
      modeNormal: document.getElementById('pdf-mode-normal'),
      modeDark: document.getElementById('pdf-mode-dark'),
      modeSepia: document.getElementById('pdf-mode-sepia'),
      btnBookmark: document.getElementById('pdf-btn-bookmark'),
      bookmarksDrawer: document.getElementById('pdf-bookmarks-drawer'),
      bookmarksList: document.getElementById('pdf-bookmarks-list'),
      btnToggleBookmarks: document.getElementById('pdf-btn-toggle-bookmarks'),
      quickJumpDropdown: document.getElementById('pdf-quick-jump-select'),
      btnFullscreen: document.getElementById('pdf-btn-fullscreen'),
      btnCloseReader: document.getElementById('pdf-btn-close-reader'),
      btnExternalOpen: document.getElementById('pdf-btn-external-open'),
      tabGuide: document.getElementById('pdf-tab-guide'),
      tabDumps: document.getElementById('pdf-tab-dumps')
    };
  }

  window.openEmbeddedPdfReader = function(bookKey, targetPage = null) {
    // If roadmap drawer is open, close it
    const drawer = document.getElementById('detail-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');

    // Switch to PDF tab if not already on it
    const pdfTab = document.querySelector('.nav-tab[data-target="pdf-view"]');
    if (pdfTab && !pdfTab.classList.contains('active')) {
      pdfTab.click();
    }

    if (!dom.readerWrapper) initDom();
    if (!dom.readerWrapper) return;

    currentBookKey = (bookKey === 'guide' ? 'dumps' : bookKey) || 'dumps';
    const book = BOOKS[currentBookKey] || BOOKS.dumps;
    if (!book) return;

    if (dom.catalogView) dom.catalogView.style.display = 'none';
    dom.readerWrapper.style.display = 'flex';
    dom.readerWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (dom.tabGuide) {
      dom.tabGuide.classList.toggle('active', currentBookKey === 'guide');
    }
    if (dom.tabDumps) {
      dom.tabDumps.classList.toggle('active', currentBookKey === 'dumps');
    }

    updateQuickJumpsDropdown();

    if (targetPage && targetPage >= 1) {
      pageNum = targetPage;
    } else {
      pageNum = getLastReadPage(currentBookKey);
    }

    applyReadingMode(currentReadingMode);
    loadPdfDocument(book.url);
  };

  function updateQuickJumpsDropdown() {
    if (!dom.quickJumpDropdown) return;
    const book = BOOKS[currentBookKey];
    if (!book) return;

    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    dom.quickJumpDropdown.innerHTML = `<option value="">⚡ ${isEn ? 'Jump to Domain / Chapter...' : 'Domen yoki Bo\'limga sakrash...'}</option>`;

    book.quickJumps.forEach(jump => {
      const opt = document.createElement('option');
      opt.value = jump.page;
      opt.textContent = `${isEn ? jump.nameEn : jump.nameUz} (p. ${jump.page})`;
      dom.quickJumpDropdown.appendChild(opt);
    });
  }

  function loadPdfDocument(url) {
    showLoading(true, 'Kitob yuklanmoqda (Streaming byte-ranges)...');

    if (activeRenderTask) {
      try { activeRenderTask.cancel(); } catch {}
      activeRenderTask = null;
    }

    if (typeof pdfjsLib === 'undefined') {
      showLoading(false);
      alert('PDF.js kutubxonasi yuklanmadi. Iltimos ilovani qayta ishga tushiring.');
      return;
    }

    const book = BOOKS[currentBookKey];
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
    if (dom.bookTitle) {
      dom.bookTitle.textContent = isEn ? book.titleEn : book.titleUz;
    }

    const loadingTask = pdfjsLib.getDocument({
      url: url,
      rangeChunkSize: 65536,
      disableAutoFetch: true,
      disableStream: false
    });

    loadingTask.promise.then(pdf => {
      pdfDoc = pdf;
      if (dom.totalPagesSpan) {
        dom.totalPagesSpan.textContent = `/ ${pdf.numPages}`;
      }
      if (dom.scrubber) {
        dom.scrubber.max = pdf.numPages;
      }

      if (pageNum > pdf.numPages) pageNum = 1;

      showLoading(false);
      renderPage(pageNum);
      renderBookmarksList();
    }).catch(err => {
      showLoading(false);
      console.error('PDF load error:', err);
      const msg = isEn
        ? `Could not stream book inside reader: ${err.message}. Click 'Open in External App' to read in Adobe/system viewer.`
        : `Kitobni ichki readerda ochishda xatolik: ${err.message}. 'Tashqi dasturda ochish' tugmasi orqali tizim dasturida ochishingiz mumkin.`;
      alert(msg);
    });
  }

  function renderPage(num) {
    if (!pdfDoc) return;
    pageRendering = true;
    showLoading(true, `Sahifa ${num} tayyorlanmoqda...`);

    pdfDoc.getPage(num).then(page => {
      const viewport = page.getViewport({ scale: currentScale, rotation: currentRotation });
      const canvas = dom.canvas;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.height = viewport.height * pixelRatio;
      canvas.width = viewport.width * pixelRatio;
      canvas.style.height = `${viewport.height}px`;
      canvas.style.width = `${viewport.width}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      activeRenderTask = page.render(renderContext);

      activeRenderTask.promise.then(() => {
        pageRendering = false;
        activeRenderTask = null;
        showLoading(false);

        if (dom.pageInput) dom.pageInput.value = num;
        if (dom.scrubber) dom.scrubber.value = num;

        updateBookmarkBtnStatus();
        setLastReadPage(currentBookKey, num);

        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      }).catch(err => {
        if (err.name === 'RenderingCancelledException') return;
        pageRendering = false;
        showLoading(false);
        console.error('Render error:', err);
      });
    });
  }

  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
      if (activeRenderTask) {
        try { activeRenderTask.cancel(); } catch {}
      }
    } else {
      renderPage(num);
    }
  }

  function showLoading(show, text = '') {
    if (dom.loadingOverlay) {
      dom.loadingOverlay.style.display = show ? 'flex' : 'none';
      if (text && dom.loadingText) dom.loadingText.textContent = text;
    }
  }

  function goToPage(target) {
    if (!pdfDoc) return;
    let n = parseInt(target, 10);
    if (isNaN(n)) return;
    if (n < 1) n = 1;
    if (n > pdfDoc.numPages) n = pdfDoc.numPages;
    pageNum = n;
    queueRenderPage(pageNum);
  }

  function onPrevPage() {
    if (!pdfDoc || pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
  }

  function onNextPage() {
    if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
  }

  function zoomIn() {
    currentScale = Math.min(3.0, currentScale + 0.2);
    if (dom.zoomSelect) dom.zoomSelect.value = 'custom';
    queueRenderPage(pageNum);
  }

  function zoomOut() {
    currentScale = Math.max(0.6, currentScale - 0.2);
    if (dom.zoomSelect) dom.zoomSelect.value = 'custom';
    queueRenderPage(pageNum);
  }

  function fitWidth() {
    if (!pdfDoc || !dom.canvasContainer) return;
    pdfDoc.getPage(pageNum).then(page => {
      const containerWidth = dom.canvasContainer.clientWidth - 48;
      const vp = page.getViewport({ scale: 1.0, rotation: currentRotation });
      currentScale = Math.max(0.6, Math.min(2.5, containerWidth / vp.width));
      if (dom.zoomSelect) dom.zoomSelect.value = 'custom';
      queueRenderPage(pageNum);
    });
  }

  function rotateClockwise() {
    currentRotation = (currentRotation + 90) % 360;
    queueRenderPage(pageNum);
  }

  function applyReadingMode(mode) {
    currentReadingMode = mode;
    localStorage.setItem(STORAGE_KEY_READER_THEME, mode);

    if (!dom.canvas) return;
    dom.canvas.classList.remove('pdf-mode-normal', 'pdf-mode-dark', 'pdf-mode-sepia');
    dom.canvas.classList.add(`pdf-mode-${mode}`);

    if (dom.modeNormal && dom.modeDark && dom.modeSepia) {
      dom.modeNormal.classList.toggle('active', mode === 'normal');
      dom.modeDark.classList.toggle('active', mode === 'dark');
      dom.modeSepia.classList.toggle('active', mode === 'sepia');
    }
  }

  function updateBookmarkBtnStatus() {
    if (!dom.btnBookmark) return;
    const isMarked = isPageBookmarked(currentBookKey, pageNum);
    dom.btnBookmark.classList.toggle('bookmarked', isMarked);
    dom.btnBookmark.textContent = isMarked ? '🔖 Saqlangan' : '🏷️ Xatcho\'p';
  }

  function toggleCurrentBookmark() {
    const list = getBookmarks(currentBookKey);
    const idx = list.findIndex(b => b.page === pageNum);
    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      const note = prompt(
        isEn ? `Bookmark Note for Page ${pageNum}:` : `${pageNum}-sahifa uchun qisqa izoh (ixtiyoriy):`,
        isEn ? `Page ${pageNum}` : `${pageNum}-sahifa eslatmasi`
      );
      if (note === null) return;
      list.push({
        page: pageNum,
        note: note || (isEn ? `Page ${pageNum}` : `${pageNum}-bet`),
        date: new Date().toLocaleDateString()
      });
      list.sort((a, b) => a.page - b.page);
    }

    saveBookmarks(currentBookKey, list);
    updateBookmarkBtnStatus();
    renderBookmarksList();
  }

  function renderBookmarksList() {
    if (!dom.bookmarksList) return;
    const list = getBookmarks(currentBookKey);
    dom.bookmarksList.innerHTML = '';

    const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

    if (list.length === 0) {
      dom.bookmarksList.innerHTML = `<div style="padding:14px; text-align:center; color:#94a3b8; font-size:12px;">${isEn ? 'No bookmarks saved yet.' : 'Hozircha xatcho\'plar yo\'q.'}</div>`;
      return;
    }

    list.forEach(b => {
      const item = document.createElement('div');
      item.className = 'pdf-bookmark-item';
      item.innerHTML = `
        <div class="pdf-bm-info" style="cursor:pointer; flex:1;">
          <strong style="color:#38bdf8;">📄 ${isEn ? 'Page' : 'Bet'} ${b.page}</strong>
          <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">${b.note}</div>
        </div>
        <button class="pdf-bm-del" title="${isEn ? 'Delete bookmark' : 'O\'chirish'}" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px;">✕</button>
      `;

      item.querySelector('.pdf-bm-info').addEventListener('click', () => {
        goToPage(b.page);
        if (dom.bookmarksDrawer) dom.bookmarksDrawer.style.display = 'none';
      });

      item.querySelector('.pdf-bm-del').addEventListener('click', (e) => {
        e.stopPropagation();
        const updated = getBookmarks(currentBookKey).filter(x => x.page !== b.page);
        saveBookmarks(currentBookKey, updated);
        updateBookmarkBtnStatus();
        renderBookmarksList();
      });

      dom.bookmarksList.appendChild(item);
    });
  }

  function toggleFullscreen() {
    const el = dom.readerWrapper;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function closeReader() {
    if (!dom.readerWrapper) return;
    dom.readerWrapper.style.display = 'none';
    if (dom.catalogView) {
      dom.catalogView.style.display = 'grid';
      dom.catalogView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function openExternally() {
    const book = BOOKS[currentBookKey];
    if (book && book.externalApi) {
      fetch(book.externalApi).catch(() => {});
    }
  }

  function initListeners() {
    initDom();
    if (!dom.readerWrapper) return;

    if (dom.btnPrev) dom.btnPrev.addEventListener('click', onPrevPage);
    if (dom.btnNext) dom.btnNext.addEventListener('click', onNextPage);

    if (dom.pageInput) {
      dom.pageInput.addEventListener('change', (e) => goToPage(e.target.value));
      dom.pageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') goToPage(e.target.value);
      });
    }

    if (dom.scrubber) {
      dom.scrubber.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (dom.pageInput) dom.pageInput.value = val;
        goToPage(val);
      });
    }

    if (dom.btnZoomIn) dom.btnZoomIn.addEventListener('click', zoomIn);
    if (dom.btnZoomOut) dom.btnZoomOut.addEventListener('click', zoomOut);
    if (dom.btnFitWidth) dom.btnFitWidth.addEventListener('click', fitWidth);
    if (dom.zoomSelect) {
      dom.zoomSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'width') {
          fitWidth();
        } else if (val !== 'custom') {
          currentScale = parseFloat(val);
          queueRenderPage(pageNum);
        }
      });
    }

    if (dom.btnRotate) dom.btnRotate.addEventListener('click', rotateClockwise);

    if (dom.modeNormal) dom.modeNormal.addEventListener('click', () => applyReadingMode('normal'));
    if (dom.modeDark) dom.modeDark.addEventListener('click', () => applyReadingMode('dark'));
    if (dom.modeSepia) dom.modeSepia.addEventListener('click', () => applyReadingMode('sepia'));

    if (dom.btnBookmark) dom.btnBookmark.addEventListener('click', toggleCurrentBookmark);
    if (dom.btnToggleBookmarks) {
      dom.btnToggleBookmarks.addEventListener('click', () => {
        if (!dom.bookmarksDrawer) return;
        const isHidden = dom.bookmarksDrawer.style.display === 'none' || !dom.bookmarksDrawer.style.display;
        dom.bookmarksDrawer.style.display = isHidden ? 'block' : 'none';
        if (isHidden) renderBookmarksList();
      });
    }

    if (dom.quickJumpDropdown) {
      dom.quickJumpDropdown.addEventListener('change', (e) => {
        if (e.target.value) {
          goToPage(e.target.value);
        }
      });
    }

    if (dom.tabGuide) {
      dom.tabGuide.addEventListener('click', () => {
        if (currentBookKey !== 'guide') window.openEmbeddedPdfReader('guide');
      });
    }
    if (dom.tabDumps) {
      dom.tabDumps.addEventListener('click', () => {
        if (currentBookKey !== 'dumps') window.openEmbeddedPdfReader('dumps');
      });
    }

    if (dom.btnFullscreen) dom.btnFullscreen.addEventListener('click', toggleFullscreen);
    if (dom.btnCloseReader) dom.btnCloseReader.addEventListener('click', closeReader);
    if (dom.btnExternalOpen) dom.btnExternalOpen.addEventListener('click', openExternally);

    document.addEventListener('keydown', (e) => {
      if (!dom.readerWrapper || dom.readerWrapper.style.display === 'none') return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        onPrevPage();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        onNextPage();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCurrentBookmark();
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          closeReader();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListeners);
  } else {
    initListeners();
  }

})();
