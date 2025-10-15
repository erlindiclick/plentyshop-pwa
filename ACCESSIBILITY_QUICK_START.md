# Quick Start: Accessibility Plugin Integration

## ✅ What's Already Done

Your AccessibilityModule is now fully configured with:

- ✅ Accessibility plugin registered
- ✅ CSS styles loaded
- ✅ AccessibilityToolbar component available globally
- ✅ Composable for easy access
- ✅ TypeScript types defined

## 🚀 How to Use It

### Step 1: Add the Toolbar to Your Layout

Add the `<AccessibilityToolbar />` component to any layout where you want the accessibility features:

**Option A: Add to default layout (recommended)**

```vue
<!-- apps/web/app/layouts/default.vue -->
<template>
  <div>
    <UiHeader />
    <NarrowContainer v-if="breadcrumbs?.length" class="p-4 md:px-0">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </NarrowContainer>
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <UiNavbarBottom v-if="viewport.isLessThan('lg')" />
    <Cookiebar />
    <PreviewMode />
    <ClientOnly>
      <FooterBlock v-if="!route.meta.isBlockified" />
      <!-- Add the Accessibility Toolbar -->
      <AccessibilityToolbar />
    </ClientOnly>
    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>
```

**Option B: Add to app.vue (available everywhere)**

```vue
<!-- apps/web/app/app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- Accessibility Toolbar -->
    <ClientOnly>
      <AccessibilityToolbar />
    </ClientOnly>
  </NuxtLayout>
</template>
```

### Step 2: Test It!

Start your development server:

```bash
npm run dev
```

You should see:

1. Console message: `✨ Accessibility Module loaded successfully!`
2. A floating accessibility button in the bottom-right corner
3. Click it to open the toolbar with font size and contrast controls

### Step 3: Use in Your Components (Optional)

Use the accessibility features in your components:

```vue
<script setup lang="ts">
const { announce } = useAccessibility();

const addToCart = () => {
  // Your add to cart logic
  announce('Product added to cart');
};
</script>
```

## Features You Get

### 🎨 Visual Features

- **Font Size Control**: 4 sizes (small, normal, large, extra-large)
- **High Contrast Mode**: Better readability
- **Floating Toolbar**: Easy access to settings

### ⌨️ Keyboard Features

- **Skip to Content**: Press Tab on page load
- **Font Size Shortcuts**:
  - `Ctrl + +` (or `Cmd + +` on Mac) - Increase font size
  - `Ctrl + -` (or `Cmd + -` on Mac) - Decrease font size
- **ESC to Close**: Close modals/dialogs
- **Focus Indicators**: Visible focus outlines

### 📢 Screen Reader Features

- **Live Announcements**: Automatic announcements for dynamic content
- **ARIA Labels**: Proper accessibility labels
- **Semantic HTML Support**: Works with native HTML elements

### 💾 Persistence

- Settings are saved to `localStorage`
- User preferences persist across sessions

## Advanced Usage

### Announce to Screen Readers

```vue
<script setup lang="ts">
const { announce } = useAccessibility();

// Polite announcement (doesn't interrupt)
announce('Item added to wishlist');

// Assertive announcement (interrupts current reading)
announce('Error: Please fill required fields', 'assertive');
</script>
```

### Trap Focus in Modal

```vue
<script setup lang="ts">
const { trapFocus } = useAccessibility();
const modalRef = ref<HTMLElement>();

onMounted(() => {
  if (modalRef.value) {
    const release = trapFocus(modalRef.value);

    onUnmounted(() => {
      release(); // Cleanup
    });
  }
});
</script>

<template>
  <div ref="modalRef" role="dialog">
    <!-- Modal content -->
  </div>
</template>
```

### Check User Preferences

```vue
<script setup lang="ts">
const { prefersReducedMotion, prefersDarkMode } = useAccessibility();

// Disable animations if user prefers reduced motion
const shouldAnimate = computed(() => !prefersReducedMotion());

// Apply dark theme if preferred
const theme = computed(() => (prefersDarkMode() ? 'dark' : 'light'));
</script>
```

### Access Plugin Directly

```vue
<script setup lang="ts">
const { $accessibility } = useNuxtApp();

// Get current settings
const isHighContrast = computed(() => $accessibility.highContrastMode.value);
const currentSize = computed(() => $accessibility.fontSize.value);

// Programmatically change settings
const makeAccessible = () => {
  $accessibility.setFontSize('large');
  $accessibility.toggleHighContrast();
};
</script>
```

## Customization

### Change Toolbar Position

Edit `apps/web/modules/AccessibilityModule/runtime/components/AccessibilityToolbar.vue`:

```css
.accessibility-toolbar {
  position: fixed;
  bottom: 20px;
  left: 20px; /* Changed from right to left */
  z-index: 9999;
}
```

### Customize Colors

The toolbar uses CSS variables. Add to your main CSS:

```css
:root {
  --primary-color: #your-color;
}
```

### Add More Font Sizes

Edit the plugin in `runtime/plugins/accessibility.client.ts` and add your sizes.

## Keyboard Shortcuts Reference

| Shortcut           | Action                       |
| ------------------ | ---------------------------- |
| `Tab`              | Navigate to next element     |
| `Shift + Tab`      | Navigate to previous element |
| `Ctrl/Cmd + +`     | Increase font size           |
| `Ctrl/Cmd + -`     | Decrease font size           |
| `Esc`              | Close modals/dialogs         |
| `Enter` or `Space` | Activate buttons/links       |

## Testing Checklist

- [ ] Open the page and look for the floating button
- [ ] Click the button to open the toolbar
- [ ] Try changing font sizes (should see text size change)
- [ ] Toggle high contrast mode
- [ ] Press `Tab` key - you should see focus indicators
- [ ] Try keyboard shortcuts (Ctrl + Plus/Minus)
- [ ] Check settings persist after page reload
- [ ] Test on mobile devices

## Troubleshooting

### Toolbar Not Showing?

1. **Check console** - Do you see "✨ Accessibility Module loaded successfully!"?
2. **Clear cache** - `rm -rf apps/web/.nuxt` and restart
3. **Verify component** - Is `<AccessibilityToolbar />` in your layout?
4. **Check z-index** - Other elements might be covering it

### Settings Not Saving?

- Check browser's localStorage is enabled
- Look for errors in browser console
- Try in incognito mode to rule out extensions

### TypeScript Errors?

Restart your TypeScript server in VS Code:

- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "TypeScript: Restart TS Server"

## Next Steps

1. **Add to Layout**: Follow Step 1 above
2. **Test Features**: Click through the toolbar
3. **Customize**: Adjust colors/position to match your brand
4. **Use in Components**: Add announcements where needed
5. **Test Accessibility**: Use keyboard-only navigation

## Example: Complete Integration

Here's a complete example for `apps/web/app/layouts/default.vue`:

```vue
<template>
  <div>
    <UiHeader />
    <NarrowContainer v-if="breadcrumbs?.length" class="p-4 md:px-0">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </NarrowContainer>

    <!-- Add id="main-content" for skip link -->
    <main id="main-content" tabindex="-1">
      <slot />
    </main>

    <UiNavbarBottom v-if="viewport.isLessThan('lg')" />
    <Cookiebar />
    <PreviewMode />

    <ClientOnly>
      <FooterBlock v-if="!route.meta.isBlockified" />
      <!-- Accessibility Toolbar -->
      <AccessibilityToolbar />
    </ClientOnly>

    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultLayoutProps } from '~/layouts/types';
import FooterBlock from '~/components/blocks/Footer/Footer.vue';

defineProps<DefaultLayoutProps>();

const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
const viewport = useViewport();
const route = useRoute();

setLogoMeta();
</script>
```

## Need Help?

- 📖 Full docs: `apps/web/modules/AccessibilityModule/README.md`
- 🐛 Issues: Check browser console for errors
- 💬 Questions: Review the examples in this guide

---

**Remember**: Accessibility is not just about compliance - it's about making your shop usable by everyone! 🌟
