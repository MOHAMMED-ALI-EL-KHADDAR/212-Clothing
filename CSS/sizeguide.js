/* ============================================================
   212 CLOTHING - SIZE GUIDE (Image Popup)
   Folder structure required:
     /SizeGuides/sizeguide-tshirt.jpg
     /SizeGuides/sizeguide-hoodie.jpg
     /SizeGuides/sizeguide-cap.jpg      (when you have it)

   Usage: add to each product page before </body>:
     T-shirt:  <script src="/CSS/sizeguide.js" data-type="tshirt"></script>
     Hoodie:   <script src="/CSS/sizeguide.js" data-type="hoodie"></script>
     Cap:      <script src="/CSS/sizeguide.js" data-type="cap"></script>
   ============================================================ */

(function () {
  // Get which type this page is
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var type = currentScript.getAttribute('data-type') || 'tshirt';

  var imageMap = {
    tshirt: '/SizeGuides/sizeguide-tshirt.jpg',
    hoodie: '/SizeGuides/sizeguide-hoodie.jpg',
    cap:    '/SizeGuides/sizeguide-cap.jpg'
  };

  var imgSrc = imageMap[type] || imageMap['tshirt'];

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = [
    '#sg-overlay{display:none;position:fixed;inset:0;z-index:3000;',
      'background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);',
      'animation:sg-fade 0.25s ease-out;',
      'display:flex;align-items:center;justify-content:center;}',
    '@keyframes sg-fade{from{opacity:0}to{opacity:1}}',

    '#sg-box{position:relative;animation:sg-pop 0.3s cubic-bezier(.22,.68,0,1.2);',
      'max-width:92vw;max-height:90vh;}',
    '@keyframes sg-pop{from{transform:scale(0.88);opacity:0}to{transform:scale(1);opacity:1}}',

    '#sg-img{display:block;max-width:100%;max-height:85vh;',
      'border-radius:16px;box-shadow:0 0 60px rgba(255,69,0,0.2),0 20px 60px rgba(0,0,0,0.9);}',

    '#sg-close-btn{position:absolute;top:-14px;right:-14px;',
      'width:36px;height:36px;border-radius:50%;',
      'background:#ff4500;border:none;color:#fff;',
      'font-size:20px;line-height:0;cursor:pointer;',
      'display:flex;align-items:center;justify-content:center;',
      'box-shadow:0 4px 12px rgba(255,69,0,0.4);',
      'transition:transform 0.2s,background 0.2s;}',
    '#sg-close-btn:hover{transform:scale(1.1);background:#e03d00;}',
    '#sg-close-btn::before{display:none!important;}',

    '#sg-hint{text-align:center;margin-top:10px;color:#555;',
      'font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;}'
  ].join('');
  document.head.appendChild(style);

  // Build HTML
  var overlay = document.createElement('div');
  overlay.id = 'sg-overlay';
  overlay.style.display = 'none';

  var box = document.createElement('div');
  box.id = 'sg-box';

  var closeBtn = document.createElement('button');
  closeBtn.id = 'sg-close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = function () { close(); };

  var img = document.createElement('img');
  img.id = 'sg-img';
  img.src = imgSrc;
  img.alt = 'Size Guide';

  var hint = document.createElement('p');
  hint.id = 'sg-hint';
  hint.textContent = 'Click anywhere to close';

  box.appendChild(closeBtn);
  box.appendChild(img);
  box.appendChild(hint);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  function open() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Close on click outside the image
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Show after short delay so page loads first
  window.addEventListener('load', function () {
    setTimeout(open, 600);
  });

})();