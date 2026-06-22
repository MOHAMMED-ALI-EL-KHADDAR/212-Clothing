/**
 * 212 CLOTHING — Analytics (Google Analytics 4 + Meta Pixel)
 *
 * SETUP — this is the ONLY place you need to paste your real IDs:
 *   1. GA4_MEASUREMENT_ID: from Google Analytics → Admin → Data Streams →
 *      your web stream → starts with "G-..."
 *   2. META_PIXEL_ID: from Meta Events Manager → your Pixel → a long
 *      number, e.g. "1234567890123456"
 *
 * Leave either one as 'PASTE-...' to skip it — this file checks before
 * loading anything, so it's safe to fill in just one if you don't want both.
 *
 * This file is loaded on EVERY page, so both tools automatically log a
 * page view on every page load with no extra setup. On the Order
 * Confirmed page specifically, it also reports the order as a real
 * "Purchase" conversion — this is the main thing that makes ad
 * optimization actually work, since it tells Meta/Google which visitors
 * turned into paying customers.
 */
var GA4_MEASUREMENT_ID = 'PASTE-YOUR-G-XXXXXXXXXX-HERE';
var META_PIXEL_ID       = 'PASTE-YOUR-PIXEL-ID-HERE';

(function () {
  // ── Google Analytics 4 ────────────────────────────────────────────
  if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID.indexOf('PASTE-') !== 0) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  }

  // ── Meta Pixel ───────────────────────────────────────────────────
  if (META_PIXEL_ID && META_PIXEL_ID.indexOf('PASTE-') !== 0) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
})();

/**
 * Call this from the Order Confirmed page (and ONLY there) once you have
 * the real order total and currency. Safe to call even if one or both
 * IDs above aren't set yet — it just no-ops for whichever isn't ready.
 */
window.trackPurchase = function (value, currency, orderId) {
  if (typeof value !== 'number' || isNaN(value)) return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: orderId || undefined,
      value: value,
      currency: currency || 'MAD'
    });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency || 'MAD'
    });
  }
};
