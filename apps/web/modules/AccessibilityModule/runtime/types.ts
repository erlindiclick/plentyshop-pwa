/**
 * Type definitions for Accessibility Module
 */

export type FontSize = 'small' | 'normal' | 'large' | 'extra-large';
export type AnnouncePriority = 'polite' | 'assertive';

export interface AccessibilitySettings {
  highContrastMode: boolean;
  fontSize: FontSize;
}

export interface AccessibilityPlugin {
  highContrastMode: Ref<boolean>;
  fontSize: Ref<FontSize>;
  init: () => void;
  loadSettings: () => void;
  saveSettings: () => void;
  applySettings: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: FontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  reset: () => void;
  createSkipLink: () => void;
  setupKeyboardNavigation: () => void;
  setupFocusManagement: () => void;
  announce: (message: string, priority?: AnnouncePriority) => void;
  trapFocus: (element: HTMLElement) => () => void;
  prefersReducedMotion: () => boolean;
  prefersDarkMode: () => boolean;
}

declare module '#app' {
  interface NuxtApp {
    $accessibility: AccessibilityPlugin;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $accessibility: AccessibilityPlugin;
  }
}

export {};
