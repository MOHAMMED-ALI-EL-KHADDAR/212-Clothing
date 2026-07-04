/**
 * 212 CLOTHING â€” Internationalisation (i18n)
 * Supports: English (en) | FranÃ§ais (fr) | Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (ar)
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

  /* â”€â”€ ENGLISH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
    'footer.rights':   'Â© 2026 212 Clothing. All rights reserved.',

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
    'product.sizeout':   'Some sizes are sold out. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.',
    'product.colorout':  'Some colors are sold out. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Message us on WhatsApp</a> to check availability or restock.',

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
    'status.not_found': 'No orders found for this number.<br>Make sure you enter the same number used when ordering.<br><br><a href="https://wa.me/212651866578" target="_blank">Contact us on WhatsApp</a> if you need help.',
    'status.conn_error': 'Connection error. Please try again or <a href="https://wa.me/212651866578" style="color:#ff4500">contact us on WhatsApp</a>.',
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
    'faq.a1': 'Choose your product, select your size and color, then click <strong>Add to Cart</strong>. Go to your cart, click <strong>Proceed to Checkout</strong>, fill in your details and hit Send â€” your order goes directly to us via WhatsApp and we confirm it immediately.',
    'faq.q2': 'How do I know my order was received?',
    'faq.a2': 'As soon as you send the WhatsApp message, we reply to confirm your order and give you an estimated delivery date. If you don\'t hear from us within 2 hours, message us directly at <a href="https://wa.me/212651866578" target="_blank">+212 651 866578</a>.',
    'faq.q3': 'Can I modify or cancel my order after sending it?',
    'faq.a3': 'Yes â€” but only before we start printing. Contact us on WhatsApp as soon as possible. Once printing has started, the order cannot be changed or cancelled.',
    'faq.shipping': 'Shipping &amp; Delivery',
    'faq.q4': 'Which cities do you deliver to?',
    'faq.a4': 'We deliver across all of Morocco â€” major cities (Casablanca, Rabat, Marrakech, Tangier, Fes) in 24-48 hours, and secondary cities within 3-5 days.',
    'faq.q5': 'How long does delivery take?',
    'faq.a5': 'After your order is confirmed, we print and prepare your item within 1-2 days. Delivery then takes 1-2 days for major cities and 3-5 days for other areas. Total estimated time: <strong>2-7 days</strong> from order confirmation.',
    'faq.q6': 'How do I pay?',
    'faq.a6': 'We accept Cash on Delivery across Morocco. You pay in full when you receive your package â€” no deposit required.',
    'faq.q7': 'How much does shipping cost?',
    'faq.a7': 'Shipping cost is calculated based on your city and is communicated to you when we confirm your order on WhatsApp.',
    'faq.products': 'Products',
    'faq.q8': 'How do I know which size to pick?',
    'faq.a8': 'A size guide image pops up automatically when you open any product page. It shows exact measurements in cm for each size. When in doubt between two sizes, we recommend going up one size.',
    'faq.q9': 'How should I wash my 212 Clothing items?',
    'faq.a9': 'Machine wash cold (30Â°C max), inside out, gentle cycle. Do not bleach. Tumble dry low or hang dry. Do not iron directly on the print. Following these instructions keeps your print looking sharp for longer.',
    'faq.q10': 'What material are your products made from?',
    'faq.a10': 'Our T-shirts and hoodies are made from high-quality 100% cotton or cotton-polyester blends, chosen for comfort, durability, and print quality.',
    'faq.returns': 'Returns &amp; Issues',
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
    'bis.sent':  'âœ“ Message sent! We\'ll notify you when it\'s back.',

    /* Order Confirmed */
    'confirm.title':    'Order Received!',
    'confirm.text':     'Thanks for your order. We\'ve opened WhatsApp so you can confirm it with us directly â€” just hit send on the pre-filled message. We\'ll get back to you shortly to confirm your delivery details.',
    'confirm.track':    'Track My Order',
    'confirm.continue': 'Continue Shopping',
    'related.title':    'You Might Also Like',

    /* Index homepage */
    'index.hero':       'Gear Up with Style â€” For Bikers, Drivers and Enthusiasts!',
    'index.see_tshirts':'See More T-Shirts',
    'index.see_hoodies':'See More Hoodies',
  },

  /* â”€â”€ FRANÃ‡AIS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  fr: {
    'nav.home':       'Accueil',
    'nav.products':   'Produits',
    'nav.contact':    'Contact',
    'nav.faq':        'FAQ',
    'nav.track':      'Suivre ma commande',

    'footer.tagline':  'Streetwear inspirÃ© par ce qui vous fait vibrer.',
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
    'footer.rights':   'Â© 2026 212 Clothing. Tous droits rÃ©servÃ©s.',

    'cart.title':    'Votre panier',
    'cart.total':    'Total :',
    'cart.checkout': 'Passer Ã  la caisse',
    'cart.clear':    'Vider le panier',
    'cart.empty':    'Votre panier est vide.',
    'cart.color':    'Couleur',
    'cart.size':     'Taille',

    'product.sizes':     'Tailles :',
    'product.colors':    'Couleurs :',
    'product.addtocart': 'Ajouter au panier',
    'product.outofstock':'Rupture de stock',
    'product.sizeout':   'Certaines tailles sont Ã©puisÃ©es. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Ã‰crivez-nous sur WhatsApp</a> pour vÃ©rifier la disponibilitÃ©.',
    'product.colorout':  'Certaines couleurs sont Ã©puisÃ©es. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Ã‰crivez-nous sur WhatsApp</a> pour vÃ©rifier la disponibilitÃ©.',

    'checkout.summary':    'RÃ©capitulatif',
    'checkout.info':       'Vos informations',
    'checkout.name_lbl':   'Nom complet',
    'checkout.phone_lbl':  'NumÃ©ro de tÃ©lÃ©phone (WhatsApp)',
    'checkout.city_lbl':   'Ville',
    'checkout.address_lbl':'Adresse de livraison',
    'checkout.notes_lbl':  'Notes supplÃ©mentaires (Optionnel)',
    'checkout.place':      'Confirmer la commande',
    'checkout.name_ph':    'Entrez votre nom complet',
    'checkout.phone_ph':   'ex. +212 600 000 000',
    'checkout.city_ph':    'Entrez votre ville',
    'checkout.address_ph': 'Entrez votre adresse complÃ¨te',
    'checkout.notes_ph':   'Des demandes particuliÃ¨res ?',

    'status.title':    'Statut de commande',
    'status.subtitle': 'Suivre votre commande',
    'status.label':    'Entrez votre numÃ©ro WhatsApp',
    'status.ph':       'ex. 0612345678',
    'status.btn':      'Suivre',
    'status.loading':  'Recherche de votre commande...',
    'status.field.name':    'Nom',
    'status.field.city':    'Ville',
    'status.field.address': 'Adresse',
    'status.field.product': 'Produit',
    'status.field.total':   'Total',
    'status.not_found': 'Aucune commande trouvÃ©e pour ce numÃ©ro.<br>VÃ©rifiez que vous utilisez le mÃªme numÃ©ro qu\'Ã  la commande.<br><br><a href="https://wa.me/212651866578" target="_blank">Contactez-nous sur WhatsApp</a> si vous avez besoin d\'aide.',
    'status.conn_error': 'Erreur de connexion. Veuillez rÃ©essayer ou <a href="https://wa.me/212651866578" style="color:#ff4500">nous contacter sur WhatsApp</a>.',
    'status.question': 'Des questions sur votre commande ?',
    'status.wa':       'WhatsApp',
    'status.step.pending':   'En attente',
    'status.step.confirmed': 'ConfirmÃ©e',
    'status.step.printing':  'Impression',
    'status.step.shipped':   'ExpÃ©diÃ©e',
    'status.step.delivered': 'LivrÃ©e',

    'contact.h2':       'Nous contacter',
    'contact.name':     'Nom :',
    'contact.email':    'Email :',
    'contact.subject':  'Sujet :',
    'contact.message':  'Message :',
    'contact.send':     'Envoyer',
    'contact.or':       'Vous pouvez aussi nous contacter via :',
    'contact.wa':       'Ã‰crivez-nous sur WhatsApp',
    'contact.location': 'Localisation : Tanger, Maroc',

    'faq.title':    'FAQ',
    'faq.subtitle': 'Questions frÃ©quemment posÃ©es',
    'faq.orders':   'Commandes',
    'faq.q1': 'Comment passer une commande ?',
    'faq.a1': 'Choisissez votre produit, sÃ©lectionnez votre taille et couleur, puis cliquez sur <strong>Ajouter au panier</strong>. Allez dans votre panier, cliquez sur <strong>Passer Ã  la caisse</strong>, remplissez vos informations et envoyez â€” votre commande nous parvient directement via WhatsApp et nous la confirmons immÃ©diatement.',
    'faq.q2': 'Comment savoir si ma commande a bien Ã©tÃ© reÃ§ue ?',
    'faq.a2': 'DÃ¨s que vous envoyez le message WhatsApp, nous confirmons votre commande et vous donnons une date de livraison estimÃ©e. Si vous n\'avez pas de rÃ©ponse dans les 2 heures, contactez-nous directement au <a href="https://wa.me/212651866578" target="_blank">+212 651 866578</a>.',
    'faq.q3': 'Puis-je modifier ou annuler ma commande aprÃ¨s l\'envoi ?',
    'faq.a3': 'Oui â€” mais uniquement avant le dÃ©but de l\'impression. Contactez-nous sur WhatsApp dÃ¨s que possible. Une fois l\'impression lancÃ©e, la commande ne peut plus Ãªtre modifiÃ©e ni annulÃ©e.',
    'faq.shipping': 'Livraison',
    'faq.q4': 'Dans quelles villes livrez-vous ?',
    'faq.a4': 'Nous livrons dans tout le Maroc â€” grandes villes (Casablanca, Rabat, Marrakech, Tanger, FÃ¨s) en 24-48 h, et villes secondaires en 3-5 jours.',
    'faq.q5': 'Quel est le dÃ©lai de livraison ?',
    'faq.a5': 'AprÃ¨s confirmation de votre commande, nous imprimons et prÃ©parons votre article en 1-2 jours. La livraison prend ensuite 1-2 jours pour les grandes villes et 3-5 jours pour les autres zones. DÃ©lai total estimÃ© : <strong>2-7 jours</strong> aprÃ¨s confirmation.',
    'faq.q6': 'Comment payer ?',
    'faq.a6': 'Nous acceptons le paiement Ã  la livraison dans tout le Maroc. Vous payez en totalitÃ© Ã  la rÃ©ception de votre colis â€” aucun acompte requis.',
    'faq.q7': 'Quel est le coÃ»t de livraison ?',
    'faq.a7': 'Les frais de livraison sont calculÃ©s selon votre ville et vous sont communiquÃ©s lors de la confirmation de votre commande sur WhatsApp.',
    'faq.products': 'Produits',
    'faq.q8': 'Comment choisir ma taille ?',
    'faq.a8': 'Un guide des tailles s\'affiche automatiquement sur chaque page produit. Il indique les mesures exactes en cm pour chaque taille. En cas de doute entre deux tailles, nous recommandons de prendre la taille supÃ©rieure.',
    'faq.q9': 'Comment entretenir mes articles 212 Clothing ?',
    'faq.a9': 'Lavage machine Ã  froid (30 Â°C max), Ã  l\'envers, cycle dÃ©licat. Ne pas blanchir. SÃ©chage Ã  basse tempÃ©rature ou Ã  l\'air libre. Ne pas repasser directement sur l\'impression. Suivre ces instructions pour conserver votre impression impeccable.',
    'faq.q10': 'Quels matÃ©riaux utilisez-vous ?',
    'faq.a10': 'Nos T-shirts et sweats sont fabriquÃ©s en coton 100 % de haute qualitÃ© ou en mÃ©lange coton-polyester, choisis pour le confort, la durabilitÃ© et la qualitÃ© d\'impression.',
    'faq.returns': 'Retours &amp; RÃ©clamations',
    'faq.q11': 'Que faire si je reÃ§ois le mauvais article ou la mauvaise taille ?',
    'faq.a11': 'Contactez-nous immÃ©diatement sur WhatsApp avec une photo de l\'article reÃ§u. Si l\'erreur vient de notre part, nous rÃ©imprimons et rÃ©expÃ©dions sans frais.',
    'faq.q12': 'Puis-je retourner ou Ã©changer un article ?',
    'faq.a12': 'Chaque article Ã©tant imprimÃ© Ã  la demande spÃ©cifiquement pour vous, nous n\'acceptons pas les retours pour un mauvais choix de taille. En revanche, en cas de dÃ©faut ou de problÃ¨me de qualitÃ© d\'impression, contactez-nous dans les 48 heures suivant la livraison.',
    'faq.still': 'Une autre question ?',
    'faq.reply': 'Nous rÃ©pondons gÃ©nÃ©ralement en quelques minutes',
    'faq.wa':    'Ã‰crivez-nous sur WhatsApp',

    /* Cookie consent */
    'cookie.text':    'Nous utilisons des cookies pour analyser le trafic et amÃ©liorer votre expÃ©rience. En continuant Ã  naviguer, vous acceptez l\'utilisation de cookies analytiques et publicitaires.',
    'cookie.accept':  'Accepter',
    'cookie.decline': 'Refuser',

    /* Back in stock */
    'bis.title': 'Recevez une notification WhatsApp quand cette taille est disponible :',
    'bis.ph':    '0612345678',
    'bis.btn':   'Me notifier',
    'bis.err':   'Veuillez entrer un numÃ©ro valide.',
    'bis.sent':  'âœ“ Message envoyÃ© ! Nous vous contacterons dÃ¨s que c\'est disponible.',

    /* Order Confirmed */
    'confirm.title':    'Commande reÃ§ue !',
    'confirm.text':     'Merci pour votre commande. Nous avons ouvert WhatsApp pour que vous puissiez la confirmer directement avec nous â€” il vous suffit d\'appuyer sur envoyer pour le message prÃ©-rempli. Nous reviendrons vers vous sous peu pour confirmer les dÃ©tails de livraison.',
    'confirm.track':    'Suivre ma commande',
    'confirm.continue': 'Continuer mes achats',
    'related.title':    'Vous Aimerez Aussi',

    'index.hero':       'Ã‰quipez-vous avec Style â€” Pour les motards, conducteurs et passionnÃ©s !',
    'index.see_tshirts':'Voir plus de T-Shirts',
    'index.see_hoodies':'Voir plus de Sweats',
  },

  /* â”€â”€ Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  ar: {
    'nav.home':       'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
    'nav.products':   'Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª',
    'nav.contact':    'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
    'nav.faq':        'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©',
    'nav.track':      'ØªØªØ¨Ø¹ Ø§Ù„Ø·Ù„Ø¨',

    'footer.tagline':  'Ù…Ù„Ø§Ø¨Ø³ Ø§Ù„Ø´Ø§Ø±Ø¹ Ù…Ø³ØªÙˆØ­Ø§Ø© Ù…Ù…Ø§ ÙŠÙ„Ù‡Ù…Ùƒ.',
    'footer.shop':     'Ø§Ù„Ù…ØªØ¬Ø±',
    'footer.tshirts':  'ØªÙŠØ´ÙŠØ±ØªØ§Øª',
    'footer.hoodies':  'Ù‡ÙˆØ¯ÙŠØ²',
    'footer.company':  'Ø§Ù„Ø´Ø±ÙƒØ©',
    'footer.home':     'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
    'footer.track':    'ØªØªØ¨Ø¹ Ø§Ù„Ø·Ù„Ø¨',
    'footer.contact':  'Ø§ØªØµÙ„ Ø¨Ù†Ø§',
    'footer.faq':      'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©',
    'footer.touch':    'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§',
    'footer.whatsapp': 'ÙˆØ§ØªØ³Ø§Ø¨',
    'footer.location': 'Ø·Ù†Ø¬Ø©ØŒ Ø§Ù„Ù…ØºØ±Ø¨',
    'footer.rights':   'Â© 2026 212 Clothing. Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.',

    'cart.title':    'Ø³Ù„Ø© Ø§Ù„ØªØ³ÙˆÙ‚',
    'cart.total':    'Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹:',
    'cart.checkout': 'Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø´Ø±Ø§Ø¡',
    'cart.clear':    'Ø¥ÙØ±Ø§Øº Ø§Ù„Ø³Ù„Ø©',
    'cart.empty':    'Ø³Ù„Ø© Ø§Ù„ØªØ³ÙˆÙ‚ ÙØ§Ø±ØºØ©.',
    'cart.color':    'Ø§Ù„Ù„ÙˆÙ†',
    'cart.size':     'Ø§Ù„Ù…Ù‚Ø§Ø³',

    'product.sizes':     'Ø§Ù„Ù…Ù‚Ø§Ø³Ø§Øª:',
    'product.colors':    'Ø§Ù„Ø£Ù„ÙˆØ§Ù†:',
    'product.addtocart': 'Ø£Ø¶Ù Ù„Ù„Ø³Ù„Ø©',
    'product.outofstock':'Ù†ÙØ¯ Ø§Ù„Ù…Ø®Ø²ÙˆÙ†',
    'product.sizeout':   'Ø¨Ø¹Ø¶ Ø§Ù„Ù…Ù‚Ø§Ø³Ø§Øª ØºÙŠØ± Ù…ØªÙˆÙØ±Ø©. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Ø±Ø§Ø³Ù„Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨</a> Ù„Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ø§Ù„ØªÙˆÙØ±.',
    'product.colorout':  'Ø¨Ø¹Ø¶ Ø§Ù„Ø£Ù„ÙˆØ§Ù† ØºÙŠØ± Ù…ØªÙˆÙØ±Ø©. <a href="https://wa.me/212651866578" target="_blank" style="color:#ff4500;text-decoration:underline;">Ø±Ø§Ø³Ù„Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨</a> Ù„Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ø§Ù„ØªÙˆÙØ±.',

    'checkout.summary':    'Ù…Ù„Ø®Øµ Ø§Ù„Ø·Ù„Ø¨',
    'checkout.info':       'Ù…Ø¹Ù„ÙˆÙ…Ø§ØªÙƒ',
    'checkout.name_lbl':   'Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„',
    'checkout.phone_lbl':  'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ (ÙˆØ§ØªØ³Ø§Ø¨)',
    'checkout.city_lbl':   'Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©',
    'checkout.address_lbl':'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„ØªÙˆØµÙŠÙ„',
    'checkout.notes_lbl':  'Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ© (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)',
    'checkout.place':      'ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨',
    'checkout.name_ph':    'Ø£Ø¯Ø®Ù„ Ø§Ø³Ù…Ùƒ Ø§Ù„ÙƒØ§Ù…Ù„',
    'checkout.phone_ph':   'Ù…Ø«Ø§Ù„: +212 600 000 000',
    'checkout.city_ph':    'Ø£Ø¯Ø®Ù„ Ù…Ø¯ÙŠÙ†ØªÙƒ',
    'checkout.address_ph': 'Ø£Ø¯Ø®Ù„ Ø¹Ù†ÙˆØ§Ù†Ùƒ Ø§Ù„ÙƒØ§Ù…Ù„',
    'checkout.notes_ph':   'Ø£ÙŠ Ø·Ù„Ø¨Ø§Øª Ø®Ø§ØµØ©ØŸ',

    'status.title':    'Ø­Ø§Ù„Ø© Ø§Ù„Ø·Ù„Ø¨',
    'status.subtitle': 'ØªØªØ¨Ø¹ Ø·Ù„Ø¨Ùƒ',
    'status.label':    'Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… ÙˆØ§ØªØ³Ø§Ø¨ Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ',
    'status.ph':       'Ù…Ø«Ø§Ù„: 0612345678',
    'status.btn':      'ØªØªØ¨Ø¹',
    'status.loading':  'Ø¬Ø§Ø±Ù Ø§Ù„Ø¨Ø­Ø« Ø¹Ù† Ø·Ù„Ø¨Ùƒ...',
    'status.field.name':    'Ø§Ù„Ø§Ø³Ù…',
    'status.field.city':    'Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©',
    'status.field.address': 'Ø§Ù„Ø¹Ù†ÙˆØ§Ù†',
    'status.field.product': 'Ø§Ù„Ù…Ù†ØªØ¬',
    'status.field.total':   'Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹',
    'status.not_found': 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø·Ù„Ø¨Ø§Øª Ù„Ù‡Ø°Ø§ Ø§Ù„Ø±Ù‚Ù….<br>ØªØ£ÙƒØ¯ Ù…Ù† Ø¥Ø¯Ø®Ø§Ù„ Ù†ÙØ³ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø¹Ù†Ø¯ Ø§Ù„Ø·Ù„Ø¨.<br><br><a href="https://wa.me/212651866578" target="_blank">ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨</a> Ø¥Ø°Ø§ Ø§Ø­ØªØ¬Øª Ù…Ø³Ø§Ø¹Ø¯Ø©.',
    'status.conn_error': 'Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø§ØªØµØ§Ù„. Ø­Ø§ÙˆÙ„ Ù…Ø¬Ø¯Ø¯Ù‹Ø§ Ø£Ùˆ <a href="https://wa.me/212651866578" style="color:#ff4500">ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨</a>.',
    'status.question': 'Ø£Ø³Ø¦Ù„Ø© Ø­ÙˆÙ„ Ø·Ù„Ø¨ÙƒØŸ',
    'status.wa':       'ÙˆØ§ØªØ³Ø§Ø¨',
    'status.step.pending':   'Ù‚ÙŠØ¯ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±',
    'status.step.confirmed': 'Ù…Ø¤ÙƒØ¯',
    'status.step.printing':  'Ù‚ÙŠØ¯ Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©',
    'status.step.shipped':   'ØªÙ… Ø§Ù„Ø´Ø­Ù†',
    'status.step.delivered': 'ØªÙ… Ø§Ù„ØªØ³Ù„ÙŠÙ…',

    'contact.h2':       'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§',
    'contact.name':     'Ø§Ù„Ø§Ø³Ù…:',
    'contact.email':    'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ:',
    'contact.subject':  'Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹:',
    'contact.message':  'Ø§Ù„Ø±Ø³Ø§Ù„Ø©:',
    'contact.send':     'Ø¥Ø±Ø³Ø§Ù„',
    'contact.or':       'ÙŠÙ…ÙƒÙ†Ùƒ Ø£ÙŠØ¶Ø§Ù‹ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ø¨Ø±:',
    'contact.wa':       'Ø±Ø§Ø³Ù„Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨',
    'contact.location': 'Ø§Ù„Ù…ÙˆÙ‚Ø¹: Ø·Ù†Ø¬Ø©ØŒ Ø§Ù„Ù…ØºØ±Ø¨',

    'faq.title':    'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©',
    'faq.subtitle': 'Ø£Ø³Ø¦Ù„Ø© ÙŠÙØ³Ø£Ù„Ù‡Ø§ ÙƒØ«ÙŠØ±Ø§Ù‹',
    'faq.orders':   'Ø§Ù„Ø·Ù„Ø¨Ø§Øª',
    'faq.q1': 'ÙƒÙŠÙ Ø£Ø¶Ø¹ Ø·Ù„Ø¨Ù‹Ø§ØŸ',
    'faq.a1': 'Ø§Ø®ØªØ± Ù…Ù†ØªØ¬ÙƒØŒ Ø­Ø¯Ø¯ Ù…Ù‚Ø§Ø³Ùƒ ÙˆÙ„ÙˆÙ†ÙƒØŒ Ø«Ù… Ø§Ù†Ù‚Ø± Ø¹Ù„Ù‰ <strong>Ø£Ø¶Ù Ù„Ù„Ø³Ù„Ø©</strong>. Ø§Ø°Ù‡Ø¨ Ø¥Ù„Ù‰ Ø³Ù„Ø© Ø§Ù„ØªØ³ÙˆÙ‚ØŒ Ø§Ù†Ù‚Ø± Ø¹Ù„Ù‰ <strong>Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø´Ø±Ø§Ø¡</strong>ØŒ Ø£Ø¯Ø®Ù„ Ø¨ÙŠØ§Ù†Ø§ØªÙƒ ÙˆØ£Ø±Ø³Ù„ â€” ÙŠØµÙ„Ù†Ø§ Ø·Ù„Ø¨Ùƒ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ ÙˆÙ†Ø¤ÙƒØ¯Ù‡ ÙÙˆØ±Ù‹Ø§.',
    'faq.q2': 'ÙƒÙŠÙ Ø£Ø¹Ø±Ù Ø£Ù† Ø·Ù„Ø¨ÙŠ ÙˆØµÙ„ØŸ',
    'faq.a2': 'Ø¨Ù…Ø¬Ø±Ø¯ Ø¥Ø±Ø³Ø§Ù„Ùƒ Ø±Ø³Ø§Ù„Ø© ÙˆØ§ØªØ³Ø§Ø¨ØŒ Ù†Ø±Ø¯ Ø¨ØªØ£ÙƒÙŠØ¯ Ø·Ù„Ø¨Ùƒ ÙˆØªØ§Ø±ÙŠØ® Ø§Ù„ØªØ³Ù„ÙŠÙ… Ø§Ù„Ù…ØªÙˆÙ‚Ø¹. Ø¥Ù† Ù„Ù… ØªØ³Ù…Ø¹ Ù…Ù†Ø§ Ø®Ù„Ø§Ù„ Ø³Ø§Ø¹ØªÙŠÙ†ØŒ Ø±Ø§Ø³Ù„Ù†Ø§ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¹Ù„Ù‰ <a href="https://wa.me/212651866578" target="_blank">+212 651 866578</a>.',
    'faq.q3': 'Ù‡Ù„ ÙŠÙ…ÙƒÙ†Ù†ÙŠ ØªØ¹Ø¯ÙŠÙ„ Ø£Ùˆ Ø¥Ù„ØºØ§Ø¡ Ø·Ù„Ø¨ÙŠ Ø¨Ø¹Ø¯ Ø¥Ø±Ø³Ø§Ù„Ù‡ØŸ',
    'faq.a3': 'Ù†Ø¹Ù… â€” Ù„ÙƒÙ† ÙÙ‚Ø· Ù‚Ø¨Ù„ Ø¨Ø¯Ø¡ Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©. ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨ ÙÙŠ Ø£Ù‚Ø±Ø¨ ÙˆÙ‚Øª. Ø¨Ø¹Ø¯ Ø¨Ø¯Ø¡ Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©ØŒ Ù„Ø§ ÙŠÙ…ÙƒÙ† ØªØºÙŠÙŠØ± Ø§Ù„Ø·Ù„Ø¨ Ø£Ùˆ Ø¥Ù„ØºØ§Ø¤Ù‡.',
    'faq.shipping': 'Ø§Ù„Ø´Ø­Ù† ÙˆØ§Ù„ØªÙˆØµÙŠÙ„',
    'faq.q4': 'Ø¥Ù„Ù‰ Ø£ÙŠ Ù…Ø¯Ù† ØªØ´Ø­Ù†ÙˆÙ†ØŸ',
    'faq.a4': 'Ù†ÙˆØµÙ„ Ø¥Ù„Ù‰ Ø¬Ù…ÙŠØ¹ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨ â€” Ø§Ù„Ù…Ø¯Ù† Ø§Ù„ÙƒØ¨Ø±Ù‰ (Ø§Ù„Ø¯Ø§Ø± Ø§Ù„Ø¨ÙŠØ¶Ø§Ø¡ØŒ Ø§Ù„Ø±Ø¨Ø§Ø·ØŒ Ù…Ø±Ø§ÙƒØ´ØŒ Ø·Ù†Ø¬Ø©ØŒ ÙØ§Ø³) ÙÙŠ 24-48 Ø³Ø§Ø¹Ø©ØŒ ÙˆØ§Ù„Ù…Ø¯Ù† Ø§Ù„ØµØºØ±Ù‰ ÙÙŠ 3-5 Ø£ÙŠØ§Ù….',
    'faq.q5': 'ÙƒÙ… ÙŠØ³ØªØºØ±Ù‚ Ø§Ù„ØªÙˆØµÙŠÙ„ØŸ',
    'faq.a5': 'Ø¨Ø¹Ø¯ ØªØ£ÙƒÙŠØ¯ Ø·Ù„Ø¨ÙƒØŒ Ù†Ø·Ø¨Ø¹ ÙˆÙ†Ø¬Ù‡Ø² Ù‚Ø·Ø¹ØªÙƒ Ø®Ù„Ø§Ù„ 1-2 Ø£ÙŠØ§Ù…. Ø«Ù… ÙŠØ³ØªØºØ±Ù‚ Ø§Ù„ØªÙˆØµÙŠÙ„ 1-2 Ø£ÙŠØ§Ù… Ù„Ù„Ù…Ø¯Ù† Ø§Ù„ÙƒØ¨Ø±Ù‰ Ùˆ3-5 Ø£ÙŠØ§Ù… Ù„Ù„Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„Ø£Ø®Ø±Ù‰. Ø§Ù„Ù…Ø¯Ø© Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ© Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©: <strong>2-7 Ø£ÙŠØ§Ù…</strong> Ù…Ù† Ø§Ù„ØªØ£ÙƒÙŠØ¯.',
    'faq.q6': 'ÙƒÙŠÙ ÙŠØªÙ… Ø§Ù„Ø¯ÙØ¹ØŸ',
    'faq.a6': 'Ù†Ù‚Ø¨Ù„ Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„ØªØ³Ù„ÙŠÙ… ÙÙŠ Ø¬Ù…ÙŠØ¹ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ù…ØºØ±Ø¨. ØªØ¯ÙØ¹ Ø§Ù„Ù…Ø¨Ù„Øº ÙƒØ§Ù…Ù„Ø§Ù‹ Ø¹Ù†Ø¯ Ø§Ø³ØªÙ„Ø§Ù… Ø·Ø±Ø¯Ùƒ â€” Ù„Ø§ Ø­Ø§Ø¬Ø© Ù„Ø£ÙŠ Ø¯ÙØ¹Ø© Ù…Ø³Ø¨Ù‚Ø©.',
    'faq.q7': 'ÙƒÙ… ØªÙƒÙ„Ù Ø§Ù„Ø´Ø­Ù†Ø©ØŸ',
    'faq.a7': 'ØªÙØ­Ø³Ø¨ ØªÙƒÙ„ÙØ© Ø§Ù„Ø´Ø­Ù† Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ù…Ø¯ÙŠÙ†ØªÙƒ ÙˆØªÙØ¨Ù„ÙŽÙ‘Øº Ø¨Ù‡Ø§ Ø¹Ù†Ø¯ ØªØ£ÙƒÙŠØ¯ Ø·Ù„Ø¨Ùƒ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨.',
    'faq.products': 'Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª',
    'faq.q8': 'ÙƒÙŠÙ Ø£Ø®ØªØ§Ø± Ø§Ù„Ù…Ù‚Ø§Ø³ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ØŸ',
    'faq.a8': 'ÙŠØ¸Ù‡Ø± Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…Ù‚Ø§Ø³Ø§Øª ØªÙ„Ù‚Ø§Ø¦ÙŠÙ‹Ø§ Ø¹Ù†Ø¯ ÙØªØ­ Ø£ÙŠ ØµÙØ­Ø© Ù…Ù†ØªØ¬ØŒ ÙˆÙŠÙØ¸Ù‡Ø± Ø§Ù„Ù‚ÙŠØ§Ø³Ø§Øª Ø§Ù„Ø¯Ù‚ÙŠÙ‚Ø© Ø¨Ø§Ù„Ø³Ù†ØªÙŠÙ…ØªØ± Ù„ÙƒÙ„ Ù…Ù‚Ø§Ø³. ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ù„ØªØ±Ø¯Ø¯ Ø¨ÙŠÙ† Ù…Ù‚Ø§Ø³ÙŠÙ†ØŒ Ù†ÙˆØµÙŠ Ø¨Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ù‚Ø§Ø³ Ø§Ù„Ø£ÙƒØ¨Ø±.',
    'faq.q9': 'ÙƒÙŠÙ Ø£ØºØ³Ù„ Ù…Ù„Ø§Ø¨Ø³ 212 ClothingØŸ',
    'faq.a9': 'Ø§ØºØ³Ù„Ù‡Ø§ Ø¨Ø§Ù„Ù…Ø§Ø¡ Ø§Ù„Ø¨Ø§Ø±Ø¯ (30 Ø¯Ø±Ø¬Ø© ÙƒØ­Ø¯ Ø£Ù‚ØµÙ‰)ØŒ Ù…Ù‚Ù„ÙˆØ¨Ø©ØŒ Ø¯ÙˆØ±Ø© Ù„Ø·ÙŠÙØ©. Ù„Ø§ ØªØ¨ÙŠÙ‘Ø¶. Ø¬ÙÙÙ‡Ø§ Ø¹Ù„Ù‰ Ø­Ø±Ø§Ø±Ø© Ù…Ù†Ø®ÙØ¶Ø© Ø£Ùˆ ÙÙŠ Ø§Ù„Ù‡ÙˆØ§Ø¡. Ù„Ø§ ØªÙƒÙˆÙŠ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©. Ø§ØªØ¨Ø§Ø¹ Ù‡Ø°Ù‡ Ø§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª ÙŠØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø·Ø¨Ø§Ø¹Ø© Ù„ÙØªØ±Ø© Ø£Ø·ÙˆÙ„.',
    'faq.q10': 'Ù…Ø§ Ù…ÙˆØ§Ø¯ Ù…Ù†ØªØ¬Ø§ØªÙƒÙ…ØŸ',
    'faq.a10': 'ØªÙØµÙ†Ø¹ ØªÙŠØ´ÙŠØ±ØªØ§ØªÙ†Ø§ ÙˆÙ‡ÙˆØ¯ÙŠØ²Ù†Ø§ Ù…Ù† Ù‚Ø·Ù† 100% Ø¹Ø§Ù„ÙŠ Ø§Ù„Ø¬ÙˆØ¯Ø© Ø£Ùˆ Ø®Ù„ÙŠØ· Ù‚Ø·Ù†-Ø¨ÙˆÙ„ÙŠØ³ØªØ±ØŒ Ù…Ø®ØªØ§Ø± Ù„Ù„Ø±Ø§Ø­Ø© ÙˆØ§Ù„Ù…ØªØ§Ù†Ø© ÙˆØ¬ÙˆØ¯Ø© Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©.',
    'faq.returns': 'Ø§Ù„Ø¥Ø±Ø¬Ø§Ø¹ ÙˆØ§Ù„Ù…Ø´Ø§ÙƒÙ„',
    'faq.q11': 'Ù…Ø§Ø°Ø§ Ø£ÙØ¹Ù„ Ø¥Ø°Ø§ ÙˆØµÙ„Ù†ÙŠ Ø§Ù„Ù…Ù†ØªØ¬ Ø§Ù„Ø®Ø·Ø£ Ø£Ùˆ Ø§Ù„Ù…Ù‚Ø§Ø³ Ø§Ù„Ø®Ø·Ø£ØŸ',
    'faq.a11': 'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ ÙÙˆØ±Ù‹Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨ Ù…Ø¹ ØµÙˆØ±Ø© Ù„Ù„Ù…Ù†ØªØ¬ Ø§Ù„Ù…Ø³ØªÙ„Ù…. Ø¥Ù† ÙƒØ§Ù† Ø§Ù„Ø®Ø·Ø£ Ù…Ù† Ø¬Ù‡ØªÙ†Ø§ØŒ Ø³Ù†Ø¹ÙŠØ¯ Ø§Ù„Ø·Ø¨Ø§Ø¹Ø© ÙˆØ§Ù„Ø´Ø­Ù† Ù…Ø¬Ø§Ù†Ù‹Ø§.',
    'faq.q12': 'Ù‡Ù„ ÙŠÙ…ÙƒÙ†Ù†ÙŠ Ø¥Ø±Ø¬Ø§Ø¹ Ø£Ùˆ Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Ù…Ù†ØªØ¬ØŸ',
    'faq.a12': 'Ù„Ø£Ù† ÙƒÙ„ Ù‚Ø·Ø¹Ø© ØªÙØ·Ø¨Ø¹ Ø®ØµÙŠØµÙ‹Ø§ Ù„ÙƒØŒ Ù„Ø§ Ù†Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø±Ø¬Ø§Ø¹ ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ø®ØªÙŠØ§Ø± Ù…Ù‚Ø§Ø³ Ø®Ø§Ø·Ø¦. Ù„ÙƒÙ† ÙÙŠ Ø­Ø§Ù„Ø© ÙˆØ¬ÙˆØ¯ Ø¹ÙŠØ¨ Ø£Ùˆ Ù…Ø´ÙƒÙ„Ø© ÙÙŠ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø·Ø¨Ø§Ø¹Ø©ØŒ ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø®Ù„Ø§Ù„ 48 Ø³Ø§Ø¹Ø© Ù…Ù† Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… ÙˆØ³Ù†Ø¹Ø§Ù„Ø¬ Ø§Ù„Ø£Ù…Ø±.',
    'faq.still': 'Ù„Ø§ ØªØ²Ø§Ù„ Ù„Ø¯ÙŠÙƒ Ø³Ø¤Ø§Ù„ØŸ',
    'faq.reply': 'Ù†Ø±Ø¯ Ø¹Ø§Ø¯Ø©Ù‹ ÙÙŠ ØºØ¶ÙˆÙ† Ø¯Ù‚Ø§Ø¦Ù‚',
    'faq.wa':    'Ø±Ø§Ø³Ù„Ù†Ø§ Ø¹Ù„Ù‰ ÙˆØ§ØªØ³Ø§Ø¨',

    /* Cookie consent */
    'cookie.text':    'Ù†Ø³ØªØ®Ø¯Ù… Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ù„ØªØ­Ù„ÙŠÙ„ Ø­Ø±ÙƒØ© Ø§Ù„Ù…Ø±ÙˆØ± ÙˆØªØ­Ø³ÙŠÙ† ØªØ¬Ø±Ø¨ØªÙƒ. Ø¨Ù…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØµÙØ­ØŒ ÙØ¥Ù†Ùƒ ØªÙˆØ§ÙÙ‚ Ø¹Ù„Ù‰ Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù†Ø§ Ù„Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· Ø§Ù„ØªØ­Ù„ÙŠÙ„ÙŠØ© ÙˆØ§Ù„Ø¥Ø¹Ù„Ø§Ù†ÙŠØ©.',
    'cookie.accept':  'Ù‚Ø¨ÙˆÙ„',
    'cookie.decline': 'Ø±ÙØ¶',

    /* Back in stock */
    'bis.title': 'Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¥Ø´Ø¹Ø§Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ø¹Ù†Ø¯Ù…Ø§ ÙŠØªÙˆÙØ± Ù‡Ø°Ø§ Ø§Ù„Ù…Ù‚Ø§Ø³:',
    'bis.ph':    '0612345678',
    'bis.btn':   'Ø£Ø¹Ù„Ù…Ù†ÙŠ',
    'bis.err':   'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø±Ù‚Ù… Ù‡Ø§ØªÙ ØµØ­ÙŠØ­.',
    'bis.sent':  'âœ“ ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©! Ø³Ù†Ø¹Ù„Ù…Ùƒ Ø¹Ù†Ø¯ ØªÙˆÙØ±Ù‡.',

    /* Order Confirmed */
    'confirm.title':    'ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø·Ù„Ø¨Ùƒ!',
    'confirm.text':     'Ø´ÙƒØ±Ù‹Ø§ Ù„Ø·Ù„Ø¨Ùƒ. Ù„Ù‚Ø¯ ÙØªØ­Ù†Ø§ ÙˆØ§ØªØ³Ø§Ø¨ Ø­ØªÙ‰ ØªØªÙ…ÙƒÙ† Ù…Ù† ØªØ£ÙƒÙŠØ¯Ù‡ Ù…Ø¹Ù†Ø§ Ù…Ø¨Ø§Ø´Ø±Ø© â€” ÙÙ‚Ø· Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ø¥Ø±Ø³Ø§Ù„ Ù„Ù„Ø±Ø³Ø§Ù„Ø© Ø§Ù„Ù…ÙØ¹Ø¯Ø© Ù…Ø³Ø¨Ù‚Ù‹Ø§. Ø³Ù†Ø¹ÙˆØ¯ Ø¥Ù„ÙŠÙƒ Ù‚Ø±ÙŠØ¨Ù‹Ø§ Ù„ØªØ£ÙƒÙŠØ¯ ØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªÙˆØµÙŠÙ„.',
    'confirm.track':    'ØªØªØ¨Ø¹ Ø·Ù„Ø¨ÙŠ',
    'confirm.continue': 'Ù…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ³ÙˆÙ‚',
    'related.title':    'Ù‚Ø¯ ÙŠØ¹Ø¬Ø¨Ùƒ Ø£ÙŠØ¶Ù‹Ø§',

    'index.hero':       'ØªØ¬Ù‡Ù‘Ø² Ø¨Ø£Ù†Ø§Ù‚Ø© â€” Ù„Ù„Ø¯Ø±Ù‘Ø§Ø¬ÙŠÙ† ÙˆØ§Ù„Ø³Ø§Ø¦Ù‚ÙŠÙ† ÙˆØ¹Ø´Ø§Ù‚ Ø§Ù„Ø³Ø±Ø¹Ø©!',
    'index.see_tshirts':'Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„ØªÙŠØ´ÙŠØ±ØªØ§Øª',
    'index.see_hoodies':'Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù‡ÙˆØ¯ÙŠØ²',
  }
};

/* â”€â”€ Core functions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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

  /* data-i18n â†’ textContent */
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  /* data-i18n-html â†’ innerHTML (for FAQ answers with <strong>/<a>) */
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  /* data-i18n-ph â†’ placeholder */
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

