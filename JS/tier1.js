(function () {
  'use strict';
  function initWhatsAppButton() {
    var btn = document.createElement('a');
    btn.id        = 'wa-float-btn';
    btn.href      = 'https://wa.me/212664890937';
    btn.target    = '_blank';
    btn.rel       = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L.057 23.886a.75.75 0 0 0 .906.906l6.057-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 0 1-4.947-1.354l-.355-.21-3.676.889.905-3.574-.23-.368A9.694 9.694 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>';

    btn.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'left:24px',
      'z-index:9999',
      'width:56px',
      'height:56px',
      'border-radius:50%',
      'background:#25d366',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'box-shadow:0 4px 16px rgba(37,211,102,0.45)',
      'transition:transform 0.2s,box-shadow 0.2s',
      'cursor:pointer',
      'text-decoration:none'
    ].join(';');

    var svg = btn.querySelector('svg');
    svg.style.cssText = 'width:30px;height:30px;fill:#fff;';

    btn.addEventListener('mouseenter', function () {
      btn.style.transform    = 'scale(1.12)';
      btn.style.boxShadow    = '0 6px 24px rgba(37,211,102,0.65)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform    = '';
      btn.style.boxShadow    = '0 4px 16px rgba(37,211,102,0.45)';
    });

    function adjustPosition() {
      var banner = document.getElementById('cookie-banner');
      if (banner && banner.style.display !== 'none' && banner.offsetHeight) {
        btn.style.bottom = (banner.offsetHeight + 12) + 'px';
      } else {
        btn.style.bottom = '24px';
      }
    }

    document.body.appendChild(btn);
    adjustPosition();
    document.addEventListener('cookieConsentDone', adjustPosition);
  }

  function initCookieBanner() {
    if (localStorage.getItem('212-cookie-consent')) return; 

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = [
      'position:fixed',
      'bottom:0',
      'left:0',
      'right:0',
      'z-index:9998',
      'background:#111',
      'border-top:1px solid #2a2a2a',
      'padding:14px 20px',
      'display:flex',
      'align-items:center',
      'justify-content:space-between',
      'gap:16px',
      'flex-wrap:wrap',
      'font-size:0.82rem',
      'color:#aaa',
      'box-shadow:0 -4px 20px rgba(0,0,0,0.5)'
    ].join(';');

    banner.innerHTML =
      '<span data-i18n="cookie.text">We use cookies and similar tools to analyse traffic and improve your experience. By continuing to browse, you accept our use of analytics and advertising cookies.</span>' +
      '<div style="display:flex;gap:10px;flex-shrink:0;">' +
        '<button id="cookie-accept" style="background:#ff4500;border:none;color:#fff;padding:8px 18px;border-radius:20px;font-size:0.8rem;font-weight:600;cursor:pointer;" data-i18n="cookie.accept">Accept</button>' +
        '<button id="cookie-decline" style="background:transparent;border:1px solid #444;color:#aaa;padding:8px 16px;border-radius:20px;font-size:0.8rem;cursor:pointer;" data-i18n="cookie.decline">Decline</button>' +
      '</div>';

    function dismiss(accepted) {
      localStorage.setItem('212-cookie-consent', accepted ? 'accepted' : 'declined');
      if (!accepted) {
        window['ga-disable-' + (window.GA4_MEASUREMENT_ID || '')] = true;
        if (window.fbq) window.fbq('consent', 'revoke');
      } else {
        if (window.fbq) window.fbq('consent', 'grant');
      }
      banner.style.display = 'none';
      document.dispatchEvent(new CustomEvent('cookieConsentDone'));
    }

    document.getElementById && setTimeout(function () {
      var acc = banner.querySelector('#cookie-accept');
      var dec = banner.querySelector('#cookie-decline');
      if (acc) acc.addEventListener('click', function () { dismiss(true); });
      if (dec) dec.addEventListener('click', function () { dismiss(false); });
    }, 0);

    document.body.appendChild(banner);
    document.dispatchEvent(new CustomEvent('cookieBannerShown'));
  }

  window.showBackInStockForm = function (category, soldOutSizes) {
    if (!soldOutSizes || soldOutSizes.length === 0) return;
    if (document.getElementById('bis-form-wrap')) return; 

    var productName = (function () {
      var el = document.getElementById('productName');
      return el ? el.textContent.trim() : document.title;
    })();

    var sizeLabel = soldOutSizes.join(', ');
    var addBtn    = document.getElementById('addToCartButton');
    if (!addBtn) return;

    var wrap = document.createElement('div');
    wrap.id = 'bis-form-wrap';
    wrap.style.cssText = 'margin:16px 0 0;padding:14px 16px;background:#111;border:1px solid #2a2a2a;border-radius:10px;';

    wrap.innerHTML =
      '<p style="font-size:0.82rem;color:#aaa;margin:0 0 10px;" data-i18n="bis.title">Get notified on WhatsApp when <strong style="color:#fff">' + sizeLabel + '</strong> is back in stock:</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
        '<input id="bis-phone" type="tel" placeholder="' + (window.t ? window.t('bis.ph') : '0612345678') + '" ' +
          'style="flex:1;min-width:150px;padding:9px 12px;border-radius:8px;border:1px solid #333;background:#0d0d0d;color:#fff;font-size:0.85rem;">' +
        '<button id="bis-submit" style="background:#ff4500;border:none;color:#fff;padding:9px 18px;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;white-space:nowrap;" data-i18n="bis.btn">Notify Me</button>' +
      '</div>' +
      '<p id="bis-msg" style="font-size:0.78rem;color:#2ecc71;margin:8px 0 0;display:none;"></p>';

    addBtn.insertAdjacentElement('afterend', wrap);

    wrap.querySelector('#bis-submit').addEventListener('click', function () {
      var phone = (wrap.querySelector('#bis-phone').value || '').trim();
      if (!phone || phone.length < 8) {
        var msg = wrap.querySelector('#bis-msg');
        msg.style.color = '#ff4500';
        msg.textContent = window.t ? window.t('bis.err') : 'Please enter a valid phone number.';
        msg.style.display = 'block';
        return;
      }

      var digits = phone.replace(/[^\d]/g, '');
      if (digits.length === 9)  digits = '212' + digits;
      if (digits.length === 10 && digits[0] === '0') digits = '212' + digits.slice(1);

      var text = encodeURIComponent(
        '👋 I want to be notified when ' + productName + ' (' + sizeLabel + ') is back in stock. My number: +' + digits
      );
      window.open('https://wa.me/212664890937?text=' + text, '_blank');

      var msg = wrap.querySelector('#bis-msg');
      msg.style.color  = '#2ecc71';
      msg.textContent  = window.t ? window.t('bis.sent') : '✓ Message sent! We\'ll notify you when it\'s back.';
      msg.style.display = 'block';
      wrap.querySelector('#bis-submit').disabled = true;
    });
  };

  function initImageZoom() {
    var img = document.getElementById('mainProductImage');
    if (!img) return;

    var wrapper = img.parentElement;
    wrapper.style.cssText += ';position:relative;overflow:hidden;cursor:zoom-in;';

    var scale    = 2.2;
    var isTouch  = false;

    function zoom(e) {
      var rect = wrapper.getBoundingClientRect();
      var x, y;
      if (e.touches) {
        x = ((e.touches[0].clientX - rect.left) / rect.width)  * 100;
        y = ((e.touches[0].clientY - rect.top)  / rect.height) * 100;
      } else {
        x = ((e.clientX - rect.left) / rect.width)  * 100;
        y = ((e.clientY - rect.top)  / rect.height) * 100;
      }
      img.style.transformOrigin = x + '% ' + y + '%';
      img.style.transform       = 'scale(' + scale + ')';
      img.style.transition      = 'transform 0.1s ease';
    }

    function unzoom() {
      img.style.transform       = 'scale(1)';
      img.style.transformOrigin = 'center center';
    }

    // Desktop: zoom on hover, track cursor
    wrapper.addEventListener('mouseenter', function () {
      if (isTouch) return;
      img.style.transition = 'transform 0.25s ease';
      img.style.transform  = 'scale(' + scale + ')';
      img.style.transformOrigin = '50% 50%';
    });
    wrapper.addEventListener('mousemove', function (e) {
      if (isTouch) return;
      zoom(e);
    });
    wrapper.addEventListener('mouseleave', function () {
      if (isTouch) return;
      unzoom();
      wrapper.style.cursor = 'zoom-in';
    });

    var zoomed = false;
    wrapper.addEventListener('touchstart', function () { isTouch = true; }, { passive: true });
    wrapper.addEventListener('touchend', function (e) {
      if (!zoomed) {
        zoom(e.changedTouches ? { touches: e.changedTouches } : e);
        zoomed = true;
        wrapper.style.cursor = 'zoom-out';
      } else {
        unzoom();
        zoomed = false;
        wrapper.style.cursor = 'zoom-in';
      }
    }, { passive: true });
  }


  document.addEventListener('DOMContentLoaded', function () {
    var preloader = document.getElementById('preloader');
    var isFirstVisit = preloader &&
      getComputedStyle(preloader).visibility !== 'hidden' &&
      getComputedStyle(preloader).opacity !== '0';

    var delay = isFirstVisit ? 700 : 0;

    setTimeout(function () {
      initWhatsAppButton();
      initCookieBanner();
    }, delay);

    initImageZoom(); 
  });

})();
