# Accessibility Module

A comprehensive accessibility plugin for PlentyONE PWA Shop that provides WCAG 2.1 Level AA compliance features.

## Features

### 🎨 Visual Adjustments

- **Font Size Control**: 4 levels (small, normal, large, extra-large)
- **High Contrast Mode**: Enhanced contrast for better readability
- **Keyboard Shortcuts**: Ctrl/Cmd + Plus/Minus to adjust font size

### ⌨️ Keyboard Navigation

- **Skip to Content Link**: Jump directly to main content
- **Focus Management**: Visual indicators for keyboard navigation
- **Focus Trapping**: Trap focus within modals and dialogs
- **ESC Key Support**: Close dialogs with Escape key

### 📢 Screen Reader Support

- **ARIA Announcements**: Live region announcements for dynamic content
- **Semantic HTML**: Proper ARIA labels and roles
- **Skip Links**: Navigate past repetitive content

### 🎯 User Preferences

- **Settings Persistence**: Saves user preferences to localStorage
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Dark Mode Detection**: Detects `prefers-color-scheme: dark`

## Installation

The module is already installed and registered in your `nuxt.config.ts`:

```typescript
modules: [
  // ...
  './modules/AccessibilityModule',
];
```

## Usage

### 1. Add the Accessibility Toolbar

Add the toolbar component to your main layout:

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <!-- Your header, navigation, etc. -->

    <!-- Main content with ID for skip link -->
    <main id="main-content" tabindex="-1">
      <slot />
    </main>

    <!-- Add the accessibility toolbar -->
    <AccessibilityToolbar />
  </div>
</template>
```

### 2. Use the Composable

Access accessibility features in your components:

```vue
<script setup lang="ts">
const { announce, trapFocus, prefersReducedMotion } = useAccessibility();

// Announce to screen readers
const handleAction = () => {
  // ... your logic
  announce('Item added to cart', 'polite');
};

// Check for reduced motion preference
const shouldAnimate = !prefersReducedMotion();

// Trap focus in modal
onMounted(() => {
  const modalEl = document.getElementById('my-modal');
  if (modalEl) {
    const releaseFocus = trapFocus(modalEl as HTMLElement);

    onUnmounted(() => {
      releaseFocus();
    });
  }
});
</script>
```

### 3. Use the Plugin Directly

```vue
<script setup lang="ts">
const { $accessibility } = useNuxtApp();

// Toggle high contrast
const toggleContrast = () => {
  $accessibility.toggleHighContrast();
};

// Set font size
const makeLarger = () => {
  $accessibility.setFontSize('large');
};

// Check current settings
const isHighContrast = computed(() => $accessibility.highContrastMode.value);
const currentSize = computed(() => $accessibility.fontSize.value);
</script>
```

## API Reference

### Composable: `useAccessibility()`

Returns an object with:

#### State (Computed)

- `highContrastMode`: `ComputedRef<boolean>` - Current high contrast mode state
- `fontSize`: `ComputedRef<FontSize>` - Current font size setting

#### Methods

- `toggleHighContrast()`: Toggle high contrast mode on/off
- `setFontSize(size)`: Set font size ('small' | 'normal' | 'large' | 'extra-large')
- `increaseFontSize()`: Increase font size by one step
- `decreaseFontSize()`: Decrease font size by one step
- `reset()`: Reset all settings to defaults
- `announce(message, priority?)`: Announce message to screen readers
  - `message`: string - Message to announce
  - `priority`: 'polite' | 'assertive' (default: 'polite')
- `trapFocus(element)`: Trap focus within an element (returns cleanup function)
- `prefersReducedMotion()`: Check if user prefers reduced motion
- `prefersDarkMode()`: Check if user prefers dark mode

### Plugin: `$accessibility`

Same methods as above, plus:

- `init()`: Initialize accessibility features
- `loadSettings()`: Load saved settings from localStorage
- `saveSettings()`: Save current settings to localStorage
- `applySettings()`: Apply current settings to DOM
- `createSkipLink()`: Create skip to content link
- `setupKeyboardNavigation()`: Setup keyboard shortcuts
- `setupFocusManagement()`: Setup focus visible indicators

## Components

### `<AccessibilityToolbar />`

A floating toolbar that provides visual controls for accessibility settings.

**Props:** None

**Features:**

- Toggle high contrast mode
- Adjust font size
- View keyboard shortcuts
- Reset settings
- Responsive design
- Accessible with keyboard

## CSS Classes

### Font Size Classes (applied to `<html>`)

- `.font-small` - 14px base font size
- `.font-normal` - 16px base font size (default)
- `.font-large` - 18px base font size
- `.font-extra-large` - 20px base font size

### High Contrast Class

- `.high-contrast` - Applied to `<html>` when enabled

### Focus Visible

- `.focus-visible` - Applied to focused elements when using keyboard

### Screen Reader Only

- `.sr-only` - Visually hide element but keep accessible to screen readers

## Keyboard Shortcuts

| Shortcut       | Action               |
| -------------- | -------------------- |
| `Ctrl/Cmd + +` | Increase font size   |
| `Ctrl/Cmd + -` | Decrease font size   |
| `Esc`          | Close modals/dialogs |
| `Tab`          | Navigate forward     |
| `Shift + Tab`  | Navigate backward    |

## Best Practices

### 1. Always Use Semantic HTML

```vue
<!-- Good ✅ -->
<button @click="handleClick">Click Me</button>

<!-- Bad ❌ -->
<div @click="handleClick">Click Me</div>
```

### 2. Provide Alt Text for Images

```vue
<!-- Good ✅ -->
<img src="product.jpg" alt="Red cotton t-shirt" />

<!-- Bad ❌ -->
<img src="product.jpg" />
```

### 3. Use ARIA Labels When Needed

```vue
<!-- Good ✅ -->
<button aria-label="Close dialog" @click="close">
  <XIcon />
</button>

<!-- OK ✅ (visible text) -->
<button @click="close">
  Close
</button>
```

### 4. Announce Dynamic Changes

```vue
<script setup lang="ts">
const { announce } = useAccessibility();

const addToCart = async () => {
  await api.addToCart(product);
  announce('Product added to cart');
};
</script>
```

### 5. Ensure Sufficient Color Contrast

```css
/* Good ✅ - Contrast ratio > 4.5:1 */
.button {
  background: #062633;
  color: #ffffff;
}

/* Bad ❌ - Low contrast */
.button {
  background: #cccccc;
  color: #dddddd;
}
```

### 6. Make Interactive Elements Keyboard Accessible

```vue
<!-- Good ✅ -->
<div role="button" tabindex="0" @click="handleClick" @keydown.enter="handleClick" @keydown.space.prevent="handleClick">
  Click me
</div>

<!-- Better ✅ - Use native button -->
<button @click="handleClick">Click me</button>
```

## WCAG 2.1 Compliance

This module helps you achieve:

### Level A

- ✅ 1.1.1 Non-text Content
- ✅ 1.3.1 Info and Relationships
- ✅ 2.1.1 Keyboard
- ✅ 2.1.2 No Keyboard Trap
- ✅ 2.4.1 Bypass Blocks (Skip Link)
- ✅ 4.1.2 Name, Role, Value

### Level AA

- ✅ 1.4.3 Contrast (Minimum) - High Contrast Mode
- ✅ 1.4.4 Resize Text - Font Size Controls
- ✅ 2.4.6 Headings and Labels
- ✅ 2.4.7 Focus Visible

### Level AAA (Bonus)

- ✅ 2.5.5 Target Size - Touch targets 44x44px
- ✅ 1.4.8 Visual Presentation - Line height & spacing

## Testing

### Manual Testing Checklist

- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify skip link works
- [ ] Test high contrast mode
- [ ] Test all font size options
- [ ] Check focus indicators are visible
- [ ] Verify ARIA announcements
- [ ] Test modal focus trapping
- [ ] Check color contrast ratios
- [ ] Test with browser zoom at 200%

### Automated Testing Tools

- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools accessibility audit
- **Pa11y**: Automated accessibility testing

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Toolbar Not Appearing?

1. Check that `<AccessibilityToolbar />` is in your layout
2. Verify module is registered in `nuxt.config.ts`
3. Clear browser cache and restart dev server

### Settings Not Persisting?

- Check browser's localStorage is enabled
- Verify console for any errors
- Try in private/incognito mode

### Keyboard Shortcuts Not Working?

- Check for conflicts with browser shortcuts
- Verify JavaScript is enabled
- Test in different browser

## Contributing

To extend the module:

1. Add new features to `runtime/plugins/accessibility.client.ts`
2. Update the toolbar UI in `runtime/components/AccessibilityToolbar.vue`
3. Add CSS styles to `runtime/assets/accessibility.css`
4. Update this README

## License

Same as the main PlentyONE PWA Shop project.

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
