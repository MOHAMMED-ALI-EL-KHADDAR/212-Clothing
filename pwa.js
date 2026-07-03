/**
 * 212 Clothing PWA - Installation & Service Worker Management
 * Handles:
 * - Service Worker registration
 * - Install prompt detection & display
 * - Install tracking for analytics
 */

(function() {
  'use strict';

  // ============================================
  // 1. SERVICE WORKER REGISTRATION
  // ============================================

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('[PWA] Service Worker registered:', registration.scope);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Every minute

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                notifyUserOfUpdate();
              }
            });
          });
        })
        .catch(error => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    });
  }

  // ============================================
  // 2. INSTALL PROMPT HANDLING
  // ============================================

  let deferredPrompt = null;
  const installPromptContainer = document.getElementById('pwaInstallPrompt');
  const installButton = document.getElementById('pwaInstallButton');
  const dismissButton = document.getElementById('pwaDismissButton');

  // Capture the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    
    // Store the event for later use
    deferredPrompt = e;
    
    // Show custom install prompt if container exists
    if (installPromptContainer) {
      showInstallPrompt();
    } else {
      console.warn('[PWA] No install prompt container found (id: pwaInstallPrompt)');
    }
  });

  // Show install prompt
  function showInstallPrompt() {
    if (installPromptContainer) {
      installPromptContainer.style.display = 'flex';
      installPromptContainer.classList.add('show');
    }
  }

  // Hide install prompt
  function hideInstallPrompt() {
    if (installPromptContainer) {
      installPromptContainer.classList.remove('show');
      setTimeout(() => {
        installPromptContainer.style.display = 'none';
      }, 300);
    }
  }

  // Install button click handler
  if (installButton) {
    installButton.addEventListener('click', async () => {
      if (!deferredPrompt) {
        console.warn('[PWA] Install prompt not available');
        return;
      }

      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      
      // Log install decision for analytics
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted install');
        logPWAEvent('pwa_install_accepted');
      } else {
        console.log('[PWA] User dismissed install');
        logPWAEvent('pwa_install_dismissed');
      }

      // Clear the prompt
      deferredPrompt = null;
      hideInstallPrompt();
    });
  }

  // Dismiss button click handler
  if (dismissButton) {
    dismissButton.addEventListener('click', () => {
      hideInstallPrompt();
      deferredPrompt = null;
      // Don't log dismissal to avoid pestering in analytics
    });
  }

  // ============================================
  // 3. INSTALLATION SUCCESS DETECTION
  // ============================================

  // Detect when app is installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App successfully installed');
    hideInstallPrompt();
    deferredPrompt = null;
    logPWAEvent('pwa_installed');
    
    // Optional: show success message
    showInstallSuccess();
  });

  function showInstallSuccess() {
    // Create and show brief success toast
    const toast = document.createElement('div');
    toast.className = 'pwa-install-success';
    toast.textContent = '✓ 212 Clothing installed! Open from your home screen.';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 9999;
      animation: slideUp 0.4s ease;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      text-align: center;
    `;
    
    // Add slide animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from { transform: translateY(120px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'slideUp 0.4s ease reverse forwards';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ============================================
  // 4. DISPLAY MODE DETECTION
  // ============================================

  function checkDisplayMode() {
    const displayMode = window.matchMedia('(display-mode: standalone)').matches 
      ? 'standalone' 
      : 'browser';
    
    console.log('[PWA] Display mode:', displayMode);
    logPWAEvent(`pwa_mode_${displayMode}`);
    
    return displayMode;
  }

  // Check on load and listen for changes
  window.addEventListener('load', () => {
    checkDisplayMode();
  });

  window.matchMedia('(display-mode: standalone)').addEventListener('change', () => {
    checkDisplayMode();
  });

  // ============================================
  // 5. ANALYTICS LOGGING
  // ============================================

  function logPWAEvent(eventName) {
    // GA4 if available
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        'event_category': 'pwa',
        'engagement_time_msec': 100
      });
    }

    // Meta Pixel if available
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', eventName);
    }

    console.log('[PWA Analytics]', eventName);
  }

  // ============================================
  // 6. OFFLINE STATE TRACKING
  // ============================================

  window.addEventListener('online', () => {
    console.log('[PWA] Back online');
    logPWAEvent('pwa_online');
  });

  window.addEventListener('offline', () => {
    console.log('[PWA] Went offline');
    logPWAEvent('pwa_offline');
  });

  // ============================================
  // 7. STANDALONE MODE ENHANCEMENTS
  // ============================================

  const isStandalone = window.navigator.standalone === true || 
                       window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone) {
    // Hide browser UI hints when running as installed app
    document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
  }

  // ============================================
  // PUBLIC API FOR MANUAL INSTALL TRIGGER
  // ============================================

  window.PWA = {
    // Manually trigger install prompt
    showInstallPrompt: () => {
      if (deferredPrompt) {
        showInstallPrompt();
      } else {
        console.warn('[PWA] Install prompt not ready. User may have already installed or browser doesn\'t support.');
      }
    },

    // Get current display mode
    getDisplayMode: checkDisplayMode,

    // Check if app is installed
    isInstalled: () => isStandalone,

    // Force update check
    checkForUpdates: () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
          reg.update();
        });
      }
    },

    // Log custom PWA event
    logEvent: logPWAEvent
  };

  console.log('[PWA] Ready. Access via window.PWA');
})();
