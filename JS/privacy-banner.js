/**
 * 212 CLOTHING — Privacy & Cookie Consent Banner
 *
 * This banner appears once per user (stored in localStorage).
 * Users can dismiss it, and their preference is remembered.
 *
 * What it covers:
 * - Google Analytics 4 (GA4) for visitor analytics
 * - Meta Pixel for conversion tracking
 * - No third-party cookies, just tracking pixels
 */

function initPrivacyBanner() {
  // Check if user has already dismissed the banner
  const bannerDismissed = localStorage.getItem('212_privacy_banner_dismissed');
  
  if (bannerDismissed === 'true') {
    // Banner already dismissed, hide it
    const banner = document.getElementById('privacyBanner');
    if (banner) banner.style.display = 'none';
    return;
  }

  // Show the banner
  const banner = document.getElementById('privacyBanner');
  if (banner) {
    banner.style.display = 'block';
  }

  // Handle dismiss button
  const dismissBtn = document.getElementById('privacyBannerDismiss');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', function() {
      // Remember this choice
      localStorage.setItem('212_privacy_banner_dismissed', 'true');
      
      // Hide the banner
      if (banner) {
        banner.style.display = 'none';
      }
    });
  }

  // Handle "Learn More" link (optional: scroll to privacy policy or external link)
  const learnMoreLink = document.getElementById('privacyBannerLearnMore');
  if (learnMoreLink) {
    learnMoreLink.addEventListener('click', function(e) {
      // If you have a /privacy.html page, this will navigate there
      // Otherwise, you can remove this or point to a full privacy policy
      // e.preventDefault();
      // window.location.href = '/privacy.html';
    });
  }
}

// Initialize banner when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrivacyBanner);
} else {
  initPrivacyBanner();
}
