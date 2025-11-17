// apps/web/modules/AccessibilityModule/index.ts
import { defineNuxtModule, createResolver, addPlugin, addComponent } from '@nuxt/kit';


export default defineNuxtModule({
  meta: {
    name: 'AccessibilityModule',
    configKey: 'accessibility',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    

    // Add CSS
    nuxt.options.css.push(resolve('./runtime/assets/accessibility.css'));

    // Add accessibility plugin
    addPlugin(resolve('./runtime/plugins/accessibility.client'));

    // Register AccessibilityToolbar component globally
    addComponent({
      name: 'AccessibilityToolbar',
      filePath: resolve('./runtime/components/AccessibilityToolbar.vue'),
    });

    console.log('✨ Accessibility Module loaded successfully!');
  },
});
