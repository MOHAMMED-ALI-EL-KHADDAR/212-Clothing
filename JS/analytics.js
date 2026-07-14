var GA4_MEASUREMENT_ID = 'G-43C8CHJG5L';
var META_PIXEL_ID       = '1029200779654145';

(function () {
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
