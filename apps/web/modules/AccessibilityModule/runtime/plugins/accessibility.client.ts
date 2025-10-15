/**
 * Accessibility Plugin for PlentyONE PWA
 *
 * Features:
 * - Keyboard navigation improvements
 * - Focus management
 * - Skip to content link
 * - Accessibility announcements for screen readers
 * - High contrast mode toggle
 * - Font size adjustments
 */

export default defineNuxtPlugin((nuxtApp) => {
  const accessibility = {
    // State
    highContrastMode: ref(false),
    fontSize: ref('normal' as 'small' | 'normal' | 'large' | 'extra-large'),

    /**
     * Initialize accessibility features
     */
    init() {
      if (process.client) {
        this.loadSettings();
        this.setupKeyboardNavigation();
        this.createSkipLink();
        this.setupFocusManagement();
        this.applySettings();
      }
    },

    /**
     * Load saved accessibility settings from localStorage
     */
    loadSettings() {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          const settings = JSON.parse(saved);
          this.highContrastMode.value = settings.highContrastMode ?? false;
          this.fontSize.value = settings.fontSize ?? 'normal';
        }
      } catch (error) {
        console.warn('Failed to load accessibility settings:', error);
      }
    },

    /**
     * Save accessibility settings to localStorage
     */
    saveSettings() {
      try {
        const settings = {
          highContrastMode: this.highContrastMode.value,
          fontSize: this.fontSize.value,
        };
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));
      } catch (error) {
        console.warn('Failed to save accessibility settings:', error);
      }
    },

    /**
     * Apply current accessibility settings
     */
    applySettings() {
      if (!process.client) return;

      const html = document.documentElement;

      // Apply high contrast mode
      if (this.highContrastMode.value) {
        html.classList.add('high-contrast');
      } else {
        html.classList.remove('high-contrast');
      }

      // Apply font size
      html.classList.remove('font-small', 'font-normal', 'font-large', 'font-extra-large');
      html.classList.add(`font-${this.fontSize.value}`);

      this.saveSettings();
    },

    /**
     * Toggle high contrast mode
     */
    toggleHighContrast() {
      this.highContrastMode.value = !this.highContrastMode.value;
      this.applySettings();
      this.announce(this.highContrastMode.value ? 'High contrast mode enabled' : 'High contrast mode disabled');
    },

    /**
     * Set font size
     */
    setFontSize(size: 'small' | 'normal' | 'large' | 'extra-large') {
      this.fontSize.value = size;
      this.applySettings();
      this.announce(`Font size set to ${size}`);
    },

    /**
     * Increase font size
     */
    increaseFontSize() {
      const sizes: Array<'small' | 'normal' | 'large' | 'extra-large'> = ['small', 'normal', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(this.fontSize.value);
      if (currentIndex > 0 && sizes[currentIndex - 1] !== undefined) {
        this.setFontSize(sizes[currentIndex + 1] as 'small' | 'normal' | 'large' | 'extra-large');
      }
    },

    /**
     * Decrease font size
     */
    decreaseFontSize() {
      const sizes: Array<'small' | 'normal' | 'large' | 'extra-large'> = ['small', 'normal', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(this.fontSize.value);
      if (currentIndex > 0 && sizes[currentIndex - 1] !== undefined) {
        this.setFontSize(sizes[currentIndex - 1] as 'small' | 'normal' | 'large' | 'extra-large');
      }
    },

    /**
     * Reset all accessibility settings
     */
    reset() {
      this.highContrastMode.value = false;
      this.fontSize.value = 'normal';
      this.applySettings();
      this.announce('Accessibility settings reset to defaults');
    },

    /**
     * Create "Skip to Content" link
     */
    createSkipLink() {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-to-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1');
          mainContent.focus();
          mainContent.removeAttribute('tabindex');
        }
      });

      document.body.insertBefore(skipLink, document.body.firstChild);
    },

    /**
     * Setup keyboard navigation improvements
     */
    setupKeyboardNavigation() {
      // ESC key closes modals/menus
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const event = new CustomEvent('accessibility:escape');
          window.dispatchEvent(event);
        }
      });

      // Ctrl/Cmd + Plus/Minus for font size
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '+') {
          e.preventDefault();
          this.increaseFontSize();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === '-') {
          e.preventDefault();
          this.decreaseFontSize();
        }
      });
    },

    /**
     * Setup focus management
     */
    setupFocusManagement() {
      // Add focus-visible polyfill behavior
      let hadKeyboardEvent = true;
      let hadFocusVisibleRecently = false;
      let hadFocusVisibleRecentlyTimeout: NodeJS.Timeout | null = null;

      const rootElement = document.documentElement;

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.metaKey || e.altKey || e.ctrlKey) {
          return;
        }
        hadKeyboardEvent = true;
      };

      const onPointerDown = () => {
        hadKeyboardEvent = false;
      };

      const onFocus = (e: FocusEvent) => {
        if (e.target && (e.target as Element).classList) {
          if (hadKeyboardEvent) {
            (e.target as Element).classList.add('focus-visible');
          } else {
            (e.target as Element).classList.remove('focus-visible');
          }
        }
      };

      const onBlur = (e: FocusEvent) => {
        if (e.target && (e.target as Element).classList) {
          (e.target as Element).classList.remove('focus-visible');
        }

        if (hadFocusVisibleRecentlyTimeout) {
          clearTimeout(hadFocusVisibleRecentlyTimeout);
        }

        hadFocusVisibleRecently = true;
        hadFocusVisibleRecentlyTimeout = setTimeout(() => {
          hadFocusVisibleRecently = false;
        }, 100);
      };

      document.addEventListener('keydown', onKeyDown, true);
      document.addEventListener('mousedown', onPointerDown, true);
      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('touchstart', onPointerDown, true);
      document.addEventListener('focus', onFocus, true);
      document.addEventListener('blur', onBlur, true);
    },

    /**
     * Announce message to screen readers
     */
    announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
      if (!process.client) return;

      let announcer = document.getElementById('a11y-announcer');

      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'a11y-announcer';
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
      } else {
        announcer.setAttribute('aria-live', priority);
      }

      // Clear and set message with small delay for screen readers
      announcer.textContent = '';
      setTimeout(() => {
        if (announcer) {
          announcer.textContent = message;
        }
      }, 100);
    },

    /**
     * Trap focus within an element (useful for modals)
     */
    trapFocus(element: HTMLElement) {
      const focusableElements = element.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable?.focus();
            e.preventDefault();
          }
        }
      };

      element.addEventListener('keydown', handleTab);

      return () => {
        element.removeEventListener('keydown', handleTab);
      };
    },

    /**
     * Check if reduced motion is preferred
     */
    prefersReducedMotion(): boolean {
      if (!process.client) return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Check if user prefers dark mode
     */
    prefersDarkMode(): boolean {
      if (!process.client) return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
  };

  // Initialize on mount
  nuxtApp.hook('app:mounted', () => {
    accessibility.init();
  });

  // Provide accessibility utilities globally
  return {
    provide: {
      accessibility,
    },
  };
});
