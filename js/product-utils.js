// ─── PDF Drawing Handler ─────────────────────────────────────────────────────
async function openDrawing(el) {
    const part = el.getAttribute('data-part');
    const msg  = el.getAttribute('data-msg');
    const pdfPath = `/assets/2D-pdf/W-${part}_2D.pdf`;

    try {
        const res = await fetch(pdfPath, { method: 'HEAD' });
        if (res.ok) {
            window.open(pdfPath, '_blank');
        } else {
            window.location.href = '/html/contact-us.html?msg=' + encodeURIComponent(msg);
        }
    } catch {
        window.location.href = '/html/contact-us.html?msg=' + encodeURIComponent(msg);
    }
}

// ─── Lightbox styles (injected once) ─────────────────────────────────────────
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
#img-lightbox {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    align-items: center;
    justify-content: center;
}
#img-lightbox.active { display: flex; }

#lb-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(4px);
}

#lb-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 92vw;
    max-height: 92vh;
}

#lb-img {
    max-width: 88vw;
    max-height: 88vh;
    object-fit: contain;
    border-radius: 6px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    transform-origin: center center;
    transition: transform 0.15s ease;
    cursor: zoom-in;
    user-select: none;
}

#lb-close {
    position: fixed;
    top: 18px;
    right: 22px;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.3);
    color: #fff;
    font-size: 26px;
    line-height: 1;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    z-index: 2;
}
#lb-close:hover { background: rgba(255,255,255,0.25); }

#lb-download {
    position: fixed;
    top: 18px;
    right: 72px;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.3);
    color: #fff;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    text-decoration: none;
    z-index: 2;
}
#lb-download:hover { background: rgba(255,255,255,0.25); }

#lb-hint {
    position: fixed;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.55);
    font-size: 12px;
    pointer-events: none;
    z-index: 2;
}

.prod-gallery-main { cursor: zoom-in; }
    `;
    document.head.appendChild(style);
})();

// ─── Gallery & Lightbox init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Small image switching
    const mainImg = document.getElementById('MainImg');
    const smallImgs = document.getElementsByClassName('small-img');
    for (const img of smallImgs) {
        img.addEventListener('click', function () {
            if (mainImg) mainImg.src = this.src;
        });
    }

    if (!mainImg) return;

    // Inject lightbox markup
    const lb = document.createElement('div');
    lb.id = 'img-lightbox';
    lb.innerHTML = `
        <div id="lb-backdrop"></div>
        <div id="lb-container">
            <button id="lb-close" aria-label="Close">&times;</button>
            <a id="lb-download" aria-label="Download image" download>
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-7 2h14v2H5v-2z"/>
                </svg>
            </a>
            <img id="lb-img" src="" alt="Product image">
            <span id="lb-hint">Scroll or click to zoom &nbsp;·&nbsp; Esc to close</span>
        </div>
    `;
    document.body.appendChild(lb);

    const lbImg      = document.getElementById('lb-img');
    const lbDownload = document.getElementById('lb-download');
    let scale = 1;

    function openLightbox(src) {
        lbImg.src = src;
        lbDownload.href = src;
        lbDownload.download = src.split('/').pop();
        scale = 1;
        lbImg.style.transform = 'scale(1)';
        lbImg.style.cursor = 'zoom-in';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        scale = 1;
        lbImg.style.transform = 'scale(1)';
    }

    mainImg.addEventListener('click', () => openLightbox(mainImg.src));

    document.getElementById('lb-backdrop').addEventListener('click', closeLightbox);
    document.getElementById('lb-close').addEventListener('click', closeLightbox);

    // Click image to toggle zoom
    lbImg.addEventListener('click', (e) => {
        e.stopPropagation();
        scale = scale > 1 ? 1 : 2.5;
        lbImg.style.transform = `scale(${scale})`;
        lbImg.style.cursor = scale > 1 ? 'zoom-out' : 'zoom-in';
    });

    // Scroll to zoom
    lbImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        scale = Math.max(1, Math.min(4, scale - e.deltaY * 0.003));
        lbImg.style.transform = `scale(${scale})`;
        lbImg.style.cursor = scale > 1 ? 'zoom-out' : 'zoom-in';
    }, { passive: false });

    // Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
