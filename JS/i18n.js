/**
 * 212 CLOTHING — Internationalisation (i18n)
 * Supports: English (en) | Français (fr) | العربية (ar)
 *
 * HOW TO USE:
 *  - Text elements:        data-i18n="key"
 *  - innerHTML (w/ HTML):  data-i18n-html="key"
 *  - Input placeholder:    data-i18n-ph="key"
 *
 *  - From JS:              window.t('key')
 *  - Switch language:      window.setLang('fr')
 */

const TRANSLATIONS = {

  /* ── ENGLISH ───────────────────────────────────────────── */
  en: {
    /* Nav */
    'nav.home':       'Home',
    'nav.products':   'Products',
    'nav.contact':    'Contact',
    'nav.faq':        'FAQ',
    'nav.track':      'Track Order',

    /* Footer */
    'footer.tagline':  'Streetwear inspired by what moves you.',
    'footer.shop':     'Shop',
    'footer.tshirts':  'T-Shirts',
    'footer.hoodies':  'Hoodies',
    'footer.company':  'Company',
    'footer.home':     'Home',
    'footer.track':    'Track Order',
    'footer.contact':  'Contact',
    'footer.faq':      'FAQ',
    'footer.touch':    'Get in Touch',
    'footer.whatsapp': 'WhatsApp Us',
    'footer.location': 'Tangier, Morocco',
    'footer.rights':   '© 2026 212 Clothing. All rights reserved.',

    /* Cart modal */
    'cart.title':    'Your Shopping Cart',
    'cart.total':    'Total:',
    'cart.checkout': 'Proceed to Checkout',
    'cart.clear':    'Clear Cart',
    'cart.empty':    'Your cart is empty.',
    'cart.color':    'Color',
    'cart.size':     'Size',

    /* Product pages */
    'product.sizes':     'Sizes:',
    'product.colors':    'Colors:',
    'product.addtocart': 'Add to Cart',
    'product.outofstock':'Out of Stock',
    'product.sizeout':   'Some sizes are sold out. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.',
    'product.colorout':  'Some colors are sold out. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.',

    /* Checkout */
    'checkout.summary':    'Order Summary',
    'checkout.info':       'Your Information',
    'checkout.name_lbl':   'Full Name',
    'checkout.phone_lbl':  'Phone Number (WhatsApp)',
    'checkout.city_lbl':   'City',
    'checkout.address_lbl':'Shipping Address',
    'checkout.notes_lbl':  'Additional Notes (Optional)',
    'checkout.place':      'Place Order',
    'checkout.name_ph':    'Enter your full name',
    'checkout.phone_ph':   'e.g. +212 600 000 000',
    'checkout.city_ph':    'Enter your city',
    'checkout.address_ph': 'Enter your full address',
    'checkout.notes_ph':   'Any special requests?',

    /* Order Status */
    'status.title':    'Order Status',
    'status.subtitle': 'Track your order',
    'status.label':    'Enter your WhatsApp phone number',
    'status.ph':       'e.g. 0612345678',
    'status.btn':      'Track',
    'status.loading':  'Looking up your order...',
    'status.field.name':    'Name',
    'status.field.city':    'City',
    'status.field.address': 'Address',
    'status.field.product': 'Product',
    'status.field.total':   'Total',
    'status.not_found': 'No orders found for this number.<br>Make sure you enter the same number used when ordering.<br><br><a href="https://wa.me/212664890937" target="_blank">Contact us on WhatsApp</a> if you need help.',
    'status.conn_error': 'Connection error. Please try again or <a href="https://wa.me/212664890937" style="color:#ff4500">contact us on WhatsApp</a>.',
    'status.question': 'Questions about your order?',
    'status.wa':       'WhatsApp Us',
    'status.step.pending':   'Pending',
    'status.step.confirmed': 'Confirmed',
    'status.step.printing':  'Printing',
    'status.step.shipped':   'Shipped',
    'status.step.delivered': 'Delivered',

    /* Contact */
    'contact.h2':       'Get in Touch',
    'contact.name':     'Name:',
    'contact.email':    'Email:',
    'contact.subject':  'Subject:',
    'contact.message':  'Message:',
    'contact.send':     'Send Message',
    'contact.or':       'Alternatively, you can reach us via:',
    'contact.wa':       'Message us on WhatsApp',
    'contact.location': 'Location: Tangier, Morocco',

    /* FAQ */
    'faq.title':    'FAQ',
    'faq.subtitle': 'Frequently Asked Questions',
    'faq.orders':   'Orders',
    'faq.q1': 'How do I place an order?',
    'faq.a1': 'Choose your product, select your size and color, then click <strong>Add to Cart</strong>. Go to your cart, click <strong>Proceed to Checkout</strong>, fill in your details and hit Send — your order goes directly to us via WhatsApp and we confirm it immediately.',
    'faq.q2': 'How do I know my order was received?',
    'faq.a2': 'As soon as you send the WhatsApp message, we reply to confirm your order and give you an estimated delivery date. If you don\'t hear from us within 2 hours, message us directly at <a href="https://wa.me/212664890937" target="_blank">+212 651 866578</a>.',
    'faq.q3': 'Can I modify or cancel my order after sending it?',
    'faq.a3': 'Yes — but only before we start printing. Contact us on WhatsApp as soon as possible. Once printing has started, the order cannot be changed or cancelled.',
    'faq.shipping': 'Shipping & Delivery',
    'faq.q4': 'Which cities do you deliver to?',
    'faq.a4': 'We deliver across all of Morocco — major cities (Casablanca, Rabat, Marrakech, Tangier, Fes) in 24-48 hours, and secondary cities within 3-5 days.',
    'faq.q5': 'How long does delivery take?',
    'faq.a5': 'After your order is confirmed, we print and prepare your item within 1-2 days. Delivery then takes 1-2 days for major cities and 3-5 days for other areas. Total estimated time: <strong>2-7 days</strong> from order confirmation.',
    'faq.q6': 'How do I pay?',
    'faq.a6': 'We accept Cash on Delivery across Morocco. You pay in full when you receive your package — no deposit required.',
    'faq.q7': 'How much does shipping cost?',
    'faq.a7': 'Shipping cost is totaly FREE ',
    'faq.products': 'Products',
    'faq.q8': 'How do I know which size to pick?',
    'faq.a8': 'A size guide image pops up automatically when you open any product page. It shows exact measurements in cm for each size. When in doubt between two sizes, we recommend going up one size.',
    'faq.q9': 'How should I wash my 212 Clothing items?',
    'faq.a9': 'Machine wash cold (30°C max), inside out, gentle cycle. Do not bleach. Tumble dry low or hang dry. Do not iron directly on the print. Following these instructions keeps your print looking sharp for longer.',
    'faq.q10': 'What material are your products made from?',
    'faq.a10': 'Our T-shirts and hoodies are made from high-quality 100% cotton or cotton-polyester blends, chosen for comfort, durability, and print quality.',
    'faq.returns': 'Returns & Issues',
    'faq.q11': 'What if I receive the wrong item or size?',
    'faq.a11': 'Contact us immediately on WhatsApp with a photo of the item received. If the mistake is on our side, we will reprint and reship at no cost to you.',
    'faq.q12': 'Can I return or exchange an item?',
    'faq.a12': 'Because each item is printed on demand specifically for you, we do not accept returns for wrong size choices. However, if the item has a defect or print quality issue, contact us within 48 hours of delivery and we will make it right.',
    'faq.still': 'Still have a question?',
    'faq.reply': 'We usually reply within minutes',
    'faq.wa':    'Message us on WhatsApp',

    /* Cookie consent */
    'cookie.text':    'We use cookies and similar tools to analyse traffic and improve your experience. By continuing to browse, you accept our use of analytics and advertising cookies.',
    'cookie.accept':  'Accept',
    'cookie.decline': 'Decline',

    /* Back in stock */
    'bis.title': 'Get notified on WhatsApp when this size is back in stock:',
    'bis.ph':    '0612345678',
    'bis.btn':   'Notify Me',
    'bis.err':   'Please enter a valid phone number.',
    'bis.sent':  '✓ Message sent! We\'ll notify you when it\'s back.',

    /* Order Confirmed */
    'confirm.title':    'Order Received!',
    'confirm.text':     'Thanks for your order. We\'ve opened WhatsApp so you can confirm it with us directly — just hit send on the pre-filled message. We\'ll get back to you shortly to confirm your delivery details.',
    'confirm.track':    'Track My Order',
    'confirm.continue': 'Continue Shopping',
    'related.title':    'You Might Also Like',

    /* Index homepage */
    'index.hero':       'Gear Up with Style — For Bikers, Drivers and Enthusiasts!',
    'index.see_tshirts':'See More T-Shirts',
    'index.see_hoodies':'See More Hoodies',
  },

  /* ── FRANÇAIS ──────────────────────────────────────────── */
  fr: {
    'nav.home':       'Accueil',
    'nav.products':   'Produits',
    'nav.contact':    'Contact',
    'nav.faq':        'FAQ',
    'nav.track':      'Suivre ma commande',

    'footer.tagline':  'Streetwear inspiré par ce qui vous fait vibrer.',
    'footer.shop':     'Boutique',
    'footer.tshirts':  'T-Shirts',
    'footer.hoodies':  'Sweats',
    'footer.company':  'Entreprise',
    'footer.home':     'Accueil',
    'footer.track':    'Suivi commande',
    'footer.contact':  'Contact',
    'footer.faq':      'FAQ',
    'footer.touch':    'Nous contacter',
    'footer.whatsapp': 'WhatsApp',
    'footer.location': 'Tanger, Maroc',
    'footer.rights':   '© 2026 212 Clothing. Tous droits réservés.',

    'cart.title':    'Votre panier',
    'cart.total':    'Total :',
    'cart.checkout': 'Passer à la caisse',
    'cart.clear':    'Vider le panier',
    'cart.empty':    'Votre panier est vide.',
    'cart.color':    'Couleur',
    'cart.size':     'Taille',

    'product.sizes':     'Tailles :',
    'product.colors':    'Couleurs :',
    'product.addtocart': 'Ajouter au panier',
    'product.outofstock':'Rupture de stock',
    'product.sizeout':   'Certaines tailles sont épuisées. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">Écrivez-nous sur WhatsApp</a> pour vérifier la disponibilité.',
    'product.colorout':  'Certaines couleurs sont épuisées. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">Écrivez-nous sur WhatsApp</a> pour vérifier la disponibilité.',

    'checkout.summary':    'Récapitulatif',
    'checkout.info':       'Vos informations',
    'checkout.name_lbl':   'Nom complet',
    'checkout.phone_lbl':  'Numéro de téléphone (WhatsApp)',
    'checkout.city_lbl':   'Ville',
    'checkout.address_lbl':'Adresse de livraison',
    'checkout.notes_lbl':  'Notes supplémentaires (Optionnel)',
    'checkout.place':      'Confirmer la commande',
    'checkout.name_ph':    'Entrez votre nom complet',
    'checkout.phone_ph':   'ex. +212 600 000 000',
    'checkout.city_ph':    'Entrez votre ville',
    'checkout.address_ph': 'Entrez votre adresse complète',
    'checkout.notes_ph':   'Des demandes particulières ?',

    'status.title':    'Statut de commande',
    'status.subtitle': 'Suivre votre commande',
    'status.label':    'Entrez votre numéro WhatsApp',
    'status.ph':       'ex. 0612345678',
    'status.btn':      'Suivre',
    'status.loading':  'Recherche de votre commande...',
    'status.field.name':    'Nom',
    'status.field.city':    'Ville',
    'status.field.address': 'Adresse',
    'status.field.product': 'Produit',
    'status.field.total':   'Total',
    'status.not_found': 'Aucune commande trouvée pour ce numéro.<br>Vérifiez que vous utilisez le même numéro qu\'à la commande.<br><br><a href="https://wa.me/212664890937" target="_blank">Contactez-nous sur WhatsApp</a> si vous avez besoin d\'aide.',
    'status.conn_error': 'Erreur de connexion. Veuillez réessayer ou <a href="https://wa.me/212664890937" style="color:#ff4500">nous contacter sur WhatsApp</a>.',
    'status.question': 'Des questions sur votre commande ?',
    'status.wa':       'WhatsApp',
    'status.step.pending':   'En attente',
    'status.step.confirmed': 'Confirmée',
    'status.step.printing':  'Impression',
    'status.step.shipped':   'Expédiée',
    'status.step.delivered': 'Livrée',

    'contact.h2':       'Nous contacter',
    'contact.name':     'Nom :',
    'contact.email':    'Email :',
    'contact.subject':  'Sujet :',
    'contact.message':  'Message :',
    'contact.send':     'Envoyer',
    'contact.or':       'Vous pouvez aussi nous contacter via :',
    'contact.wa':       'Écrivez-nous sur WhatsApp',
    'contact.location': 'Localisation : Tanger, Maroc',

    'faq.title':    'FAQ',
    'faq.subtitle': 'Questions fréquemment posées',
    'faq.orders':   'Commandes',
    'faq.q1': 'Comment passer une commande ?',
    'faq.a1': 'Choisissez votre produit, sélectionnez votre taille et couleur, puis cliquez sur <strong>Ajouter au panier</strong>. Allez dans votre panier, cliquez sur <strong>Passer à la caisse</strong>, remplissez vos informations et envoyez — votre commande nous parvient directement via WhatsApp et nous la confirmons immédiatement.',
    'faq.q2': 'Comment savoir si ma commande a bien été reçue ?',
    'faq.a2': 'Dès que vous envoyez le message WhatsApp, nous confirmons votre commande et vous donnons une date de livraison estimée. Si vous n\'avez pas de réponse dans les 2 heures, contactez-nous directement au <a href="https://wa.me/212664890937" target="_blank">+212 651 866578</a>.',
    'faq.q3': 'Puis-je modifier ou annuler ma commande après l\'envoi ?',
    'faq.a3': 'Oui — mais uniquement avant le début de l\'impression. Contactez-nous sur WhatsApp dès que possible. Une fois l\'impression lancée, la commande ne peut plus être modifiée ni annulée.',
    'faq.shipping': 'Expédition et livraison',
    'faq.q4': 'Dans quelles villes livrez-vous ?',
    'faq.a4': 'Nous livrons dans tout le Maroc — grandes villes (Casablanca, Rabat, Marrakech, Tanger, Fès) en 24-48 h, et villes secondaires en 3-5 jours.',
    'faq.q5': 'Quel est le délai de livraison ?',
    'faq.a5': 'Après confirmation de votre commande, nous imprimons et préparons votre article en 1-2 jours. La livraison prend ensuite 1-2 jours pour les grandes villes et 3-5 jours pour les autres zones. Délai total estimé : <strong>2-7 jours</strong> après confirmation.',
    'faq.q6': 'Comment payer ?',
    'faq.a6': 'Nous acceptons le paiement à la livraison dans tout le Maroc. Vous payez en totalité à la réception de votre colis — aucun acompte requis.',
    'faq.q7': 'Quel est le coût de livraison ?',
    'faq.a7': 'Les frais de livraison sont totalement GRATUITS.',
    'faq.products': 'Produits',
    'faq.q8': 'Comment choisir ma taille ?',
    'faq.a8': 'Un guide des tailles s\'affiche automatiquement sur chaque page produit. Il indique les mesures exactes en cm pour chaque taille. En cas de doute entre deux tailles, nous recommandons de prendre la taille supérieure.',
    'faq.q9': 'Comment entretenir mes articles 212 Clothing ?',
    'faq.a9': 'Lavage machine à froid (30 °C max), à l\'envers, cycle délicat. Ne pas blanchir. Séchage à basse température ou à l\'air libre. Ne pas repasser directement sur l\'impression. Suivre ces instructions pour conserver votre impression impeccable.',
    'faq.q10': 'Quels matériaux utilisez-vous ?',
    'faq.a10': 'Nos T-shirts et sweats sont fabriqués en coton 100 % de haute qualité ou en mélange coton-polyester, choisis pour le confort, la durabilité et la qualité d\'impression.',
    'faq.returns': 'Retours & Réclamations',
    'faq.q11': 'Que faire si je reçois le mauvais article ou la mauvaise taille ?',
    'faq.a11': 'Contactez-nous immédiatement sur WhatsApp avec une photo de l\'article reçu. Si l\'erreur vient de notre part, nous réimprimons et réexpédions sans frais.',
    'faq.q12': 'Puis-je retourner ou échanger un article ?',
    'faq.a12': 'Chaque article étant imprimé à la demande spécifiquement pour vous, nous n\'acceptons pas les retours pour un mauvais choix de taille. En revanche, en cas de défaut ou de problème de qualité d\'impression, contactez-nous dans les 48 heures suivant la livraison.',
    'faq.still': 'Une autre question ?',
    'faq.reply': 'Nous répondons généralement en quelques minutes',
    'faq.wa':    'Écrivez-nous sur WhatsApp',

    /* Cookie consent */
    'cookie.text':    'Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. En continuant à naviguer, vous acceptez l\'utilisation de cookies analytiques et publicitaires.',
    'cookie.accept':  'Accepter',
    'cookie.decline': 'Refuser',

    /* Back in stock */
    'bis.title': 'Recevez une notification WhatsApp quand cette taille est disponible :',
    'bis.ph':    '0612345678',
    'bis.btn':   'Me notifier',
    'bis.err':   'Veuillez entrer un numéro valide.',
    'bis.sent':  '✓ Message envoyé ! Nous vous contacterons dès que c\'est disponible.',

    /* Order Confirmed */
    'confirm.title':    'Commande reçue !',
    'confirm.text':     'Merci pour votre commande. Nous avons ouvert WhatsApp pour que vous puissiez la confirmer directement avec nous — il vous suffit d\'appuyer sur envoyer pour le message pré-rempli. Nous reviendrons vers vous sous peu pour confirmer les détails de livraison.',
    'confirm.track':    'Suivre ma commande',
    'confirm.continue': 'Continuer mes achats',
    'related.title':    'Vous Aimerez Aussi',

    'index.hero':       'Équipez-vous avec Style — Pour les motards, conducteurs et passionnés !',
    'index.see_tshirts':'Voir plus de T-Shirts',
    'index.see_hoodies':'Voir plus de Sweats',
  },

  /* ── العربية ────────────────────────────────────────────── */
  ar: {
    'nav.home':       'الرئيسية',
    'nav.products':   'المنتجات',
    'nav.contact':    'اتصل بنا',
    'nav.faq':        'الأسئلة الشائعة',
    'nav.track':      'تتبع الطلب',

    'footer.tagline':  'ملابس الشارع مستوحاة مما يلهمك.',
    'footer.shop':     'المتجر',
    'footer.tshirts':  'تيشيرتات',
    'footer.hoodies':  'هوديز',
    'footer.company':  'الشركة',
    'footer.home':     'الرئيسية',
    'footer.track':    'تتبع الطلب',
    'footer.contact':  'اتصل بنا',
    'footer.faq':      'الأسئلة الشائعة',
    'footer.touch':    'تواصل معنا',
    'footer.whatsapp': 'واتساب',
    'footer.location': 'طنجة، المغرب',
    'footer.rights':   '© 2026 212 Clothing. جميع الحقوق محفوظة.',

    'cart.title':    'سلة التسوق',
    'cart.total':    'المجموع:',
    'cart.checkout': 'إتمام الشراء',
    'cart.clear':    'إفراغ السلة',
    'cart.empty':    'سلة التسوق فارغة.',
    'cart.color':    'اللون',
    'cart.size':     'المقاس',

    'product.sizes':     'المقاسات:',
    'product.colors':    'الألوان:',
    'product.addtocart': 'أضف للسلة',
    'product.outofstock':'نفد المخزون',
    'product.sizeout':   'بعض المقاسات غير متوفرة. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">راسلنا على واتساب</a> للاستفسار عن التوفر.',
    'product.colorout':  'بعض الألوان غير متوفرة. <a href="https://wa.me/212664890937" target="_blank" style="color:#ff4500;text-decoration:underline;">راسلنا على واتساب</a> للاستفسار عن التوفر.',

    'checkout.summary':    'ملخص الطلب',
    'checkout.info':       'معلوماتك',
    'checkout.name_lbl':   'الاسم الكامل',
    'checkout.phone_lbl':  'رقم الهاتف (واتساب)',
    'checkout.city_lbl':   'المدينة',
    'checkout.address_lbl':'عنوان التوصيل',
    'checkout.notes_lbl':  'ملاحظات إضافية (اختياري)',
    'checkout.place':      'تأكيد الطلب',
    'checkout.name_ph':    'أدخل اسمك الكامل',
    'checkout.phone_ph':   'مثال: +212 600 000 000',
    'checkout.city_ph':    'أدخل مدينتك',
    'checkout.address_ph': 'أدخل عنوانك الكامل',
    'checkout.notes_ph':   'أي طلبات خاصة؟',

    'status.title':    'حالة الطلب',
    'status.subtitle': 'تتبع طلبك',
    'status.label':    'أدخل رقم واتساب الخاص بك',
    'status.ph':       'مثال: 0612345678',
    'status.btn':      'تتبع',
    'status.loading':  'جارٍ البحث عن طلبك...',
    'status.field.name':    'الاسم',
    'status.field.city':    'المدينة',
    'status.field.address': 'العنوان',
    'status.field.product': 'المنتج',
    'status.field.total':   'المجموع',
    'status.not_found': 'لم يتم العثور على طلبات لهذا الرقم.<br>تأكد من إدخال نفس الرقم المستخدم عند الطلب.<br><br><a href="https://wa.me/212664890937" target="_blank">تواصل معنا على واتساب</a> إذا احتجت مساعدة.',
    'status.conn_error': 'خطأ في الاتصال. حاول مجددًا أو <a href="https://wa.me/212664890937" style="color:#ff4500">تواصل معنا على واتساب</a>.',
    'status.question': 'أسئلة حول طلبك؟',
    'status.wa':       'واتساب',
    'status.step.pending':   'قيد الانتظار',
    'status.step.confirmed': 'مؤكد',
    'status.step.printing':  'قيد الطباعة',
    'status.step.shipped':   'تم الشحن',
    'status.step.delivered': 'تم التسليم',

    'contact.h2':       'تواصل معنا',
    'contact.name':     'الاسم:',
    'contact.email':    'البريد الإلكتروني:',
    'contact.subject':  'الموضوع:',
    'contact.message':  'الرسالة:',
    'contact.send':     'إرسال',
    'contact.or':       'يمكنك أيضاً التواصل معنا عبر:',
    'contact.wa':       'راسلنا على واتساب',
    'contact.location': 'الموقع: طنجة، المغرب',

    'faq.title':    'الأسئلة الشائعة',
    'faq.subtitle': 'أسئلة يُسألها كثيراً',
    'faq.orders':   'الطلبات',
    'faq.q1': 'كيف أضع طلبًا؟',
    'faq.a1': 'اختر منتجك، حدد مقاسك ولونك، ثم انقر على <strong>أضف للسلة</strong>. اذهب إلى سلة التسوق، انقر على <strong>إتمام الشراء</strong>، أدخل بياناتك وأرسل — يصلنا طلبك مباشرة عبر واتساب ونؤكده فورًا.',
    'faq.q2': 'كيف أعرف أن طلبي وصل؟',
    'faq.a2': 'بمجرد إرسالك رسالة واتساب، نرد بتأكيد طلبك وتاريخ التسليم المتوقع. إن لم تسمع منا خلال ساعتين، راسلنا مباشرة على <a href="https://wa.me/212664890937" target="_blank">+212 651 866578</a>.',
    'faq.q3': 'هل يمكنني تعديل أو إلغاء طلبي بعد إرساله؟',
    'faq.a3': 'نعم — لكن فقط قبل بدء الطباعة. تواصل معنا على واتساب في أقرب وقت. بعد بدء الطباعة، لا يمكن تغيير الطلب أو إلغاؤه.',
    'faq.shipping': 'الشحن والتوصيل',
    'faq.q4': 'إلى أي مدن تشحنون؟',
    'faq.a4': 'نوصل إلى جميع أنحاء المغرب — المدن الكبرى (الدار البيضاء، الرباط، مراكش، طنجة، فاس) في 24-48 ساعة، والمدن الصغرى في 3-5 أيام.',
    'faq.q5': 'كم يستغرق التوصيل؟',
    'faq.a5': 'بعد تأكيد طلبك، نطبع ونجهز قطعتك خلال 1-2 أيام. ثم يستغرق التوصيل 1-2 أيام للمدن الكبرى و3-5 أيام للمناطق الأخرى. المدة الإجمالية المتوقعة: <strong>2-7 أيام</strong> من التأكيد.',
    'faq.q6': 'كيف يتم الدفع؟',
    'faq.a6': 'نقبل الدفع عند التسليم في جميع أنحاء المغرب. تدفع المبلغ كاملاً عند استلام طردك — لا حاجة لأي دفعة مسبقة.',
    'faq.q7': 'كم تكلف الشحنة؟',
    'faq.a7': 'تكلفة الشحن مجانية بالكامل.',
    'faq.products': 'المنتجات',
    'faq.q8': 'كيف أختار المقاس المناسب؟',
    'faq.a8': 'يظهر دليل المقاسات تلقائيًا عند فتح أي صفحة منتج، ويُظهر القياسات الدقيقة بالسنتيمتر لكل مقاس. في حالة التردد بين مقاسين، نوصي باختيار المقاس الأكبر.',
    'faq.q9': 'كيف أغسل ملابس 212 Clothing؟',
    'faq.a9': 'اغسلها بالماء البارد (30 درجة كحد أقصى)، مقلوبة، دورة لطيفة. لا تبيّض. جففها على حرارة منخفضة أو في الهواء. لا تكوي مباشرة على الطباعة. اتباع هذه التعليمات يحافظ على جودة الطباعة لفترة أطول.',
    'faq.q10': 'ما مواد منتجاتكم؟',
    'faq.a10': 'تُصنع تيشيرتاتنا وهوديزنا من قطن 100% عالي الجودة أو خليط قطن-بوليستر، مختار للراحة والمتانة وجودة الطباعة.',
    'faq.returns': 'الإرجاع والمشاكل',
    'faq.q11': 'ماذا أفعل إذا وصلني المنتج الخطأ أو المقاس الخطأ؟',
    'faq.a11': 'تواصل معنا فورًا على واتساب مع صورة للمنتج المستلم. إن كان الخطأ من جهتنا، سنعيد الطباعة والشحن مجانًا.',
    'faq.q12': 'هل يمكنني إرجاع أو استبدال منتج؟',
    'faq.a12': 'لأن كل قطعة تُطبع خصيصًا لك، لا نقبل الإرجاع في حالة اختيار مقاس خاطئ. لكن في حالة وجود عيب أو مشكلة في جودة الطباعة، تواصل معنا خلال 48 ساعة من الاستلام وسنعالج الأمر.',
    'faq.still': 'لا تزال لديك سؤال؟',
    'faq.reply': 'نرد عادةً في غضون دقائق',
    'faq.wa':    'راسلنا على واتساب',

    /* Cookie consent */
    'cookie.text':    'نستخدم ملفات تعريف الارتباط لتحليل حركة المرور وتحسين تجربتك. بمواصلة التصفح، فإنك توافق على استخدامنا لملفات تعريف الارتباط التحليلية والإعلانية.',
    'cookie.accept':  'قبول',
    'cookie.decline': 'رفض',

    /* Back in stock */
    'bis.title': 'احصل على إشعار واتساب عندما يتوفر هذا المقاس:',
    'bis.ph':    '0612345678',
    'bis.btn':   'أعلمني',
    'bis.err':   'يرجى إدخال رقم هاتف صحيح.',
    'bis.sent':  '✓ تم إرسال الرسالة! سنعلمك عند توفره.',

    /* Order Confirmed */
    'confirm.title':    'تم استلام طلبك!',
    'confirm.text':     'شكرًا لطلبك. لقد فتحنا واتساب حتى تتمكن من تأكيده معنا مباشرة — فقط اضغط على إرسال للرسالة المُعدة مسبقًا. سنعود إليك قريبًا لتأكيد تفاصيل التوصيل.',
    'confirm.track':    'تتبع طلبي',
    'confirm.continue': 'مواصلة التسوق',
    'related.title':    'قد يعجبك أيضًا',

    'index.hero':       'تجهّز بأناقة — للدرّاجين والسائقين وعشاق السرعة!',
    'index.see_tshirts':'عرض المزيد من التيشيرتات',
    'index.see_hoodies':'عرض المزيد من الهوديز',
  }
};

/* ── Core functions ───────────────────────────────────────── */

var _currentLang = localStorage.getItem('212-lang') || 'en';

window.t = function(key) {
  var lang = _currentLang;
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) ||
         (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) ||
         key;
};

window.setLang = function(lang) {
  if (!TRANSLATIONS[lang]) return;
  _currentLang = lang;
  localStorage.setItem('212-lang', lang);
  applyI18n(lang);
  if (typeof window.renderCartItems === 'function') {
    window.renderCartItems(); // re-translate Color:/Size: labels on already-open cart items
  }
};

function applyI18n(lang) {
  var dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  /* Direction & lang attribute */
  document.documentElement.lang = lang;
  document.documentElement.dir  = (lang === 'ar') ? 'rtl' : 'ltr';

  /* Arabic font: load Cairo once, then toggle */
  if (lang === 'ar') {
    if (!document.getElementById('212-arabic-font')) {
      var link = document.createElement('link');
      link.id   = '212-arabic-font';
      link.rel  = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap';
      document.head.appendChild(link);
    }
    document.body.style.fontFamily = "'Cairo', sans-serif";
  } else {
    document.body.style.fontFamily = '';
  }

  /* data-i18n → textContent */
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  /* data-i18n-html → innerHTML (for FAQ answers with <strong>/<a>) */
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  /* data-i18n-ph → placeholder */
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-ph');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  /* Mark active lang button */
  document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
    btn.classList.toggle('lang-active', btn.getAttribute('data-lang-btn') === lang);
  });

  /* Re-render any dynamic stock notes already in the DOM */
  document.querySelectorAll('.stock-note[data-stock-key]').forEach(function(el) {
    var key = el.getAttribute('data-stock-key');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
}

document.addEventListener('DOMContentLoaded', function() {
  applyI18n(_currentLang);
});

