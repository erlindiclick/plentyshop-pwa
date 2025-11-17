/**
 * Accessibility Composable
 * Provides easy access to accessibility utilities
 */

export const useAccessibility = () => {
  const { $accessibility } = useNuxtApp();

  return {
    // State
    highContrastMode: computed(() => $accessibility.highContrastMode.value),
    fontSize: computed(() => $accessibility.fontSize.value),

    // Methods
    toggleHighContrast: () => $accessibility.toggleHighContrast(),
    setFontSize: (size: 'small' | 'normal' | 'large' | 'extra-large') => $accessibility.setFontSize(size),
    increaseFontSize: () => $accessibility.increaseFontSize(),
    decreaseFontSize: () => $accessibility.decreaseFontSize(),
    reset: () => $accessibility.reset(),
    announce: (message: string, priority: 'polite' | 'assertive' = 'polite') =>
      $accessibility.announce(message, priority),
    trapFocus: (element: HTMLElement) => $accessibility.trapFocus(element),
    prefersReducedMotion: () => $accessibility.prefersReducedMotion(),
    prefersDarkMode: () => $accessibility.prefersDarkMode(),
  };
};
