/**
 * Type definitions for Accessibility Module
 */

export type FontSize = 'small' | 'normal' | 'large' | 'extra-large';
export type AnnouncePriority = 'polite' | 'assertive';
export type TextSpacingLevel = 'normal' | 'medium' | 'heavy';

export interface AccessibilitySettings {
  highContrastMode: boolean;
  fontSize: FontSize;
  lineHeight: boolean;
  cursorStyle: boolean;
  newTextSpacing: TextSpacingLevel;
  YellowBlackContrastMode: boolean;
}

export interface AccessibilityPlugin {
  YellowBlackContrastMode: Ref<boolean>;
  toggleYellowBlackContrast(): void;
  cursorStyle: Ref<boolean>;
  textSpacing: Ref<boolean>
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
  toggleCursorStyle: () => void;

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
