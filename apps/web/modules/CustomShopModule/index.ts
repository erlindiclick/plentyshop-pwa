// apps/web/modules/CustomShopModule/index.ts
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'CustomShopModule',
    configKey: 'customShop',
  },
  setup(options, nuxt) {
    // Module setup logic
    console.log('✨ Custom Shop Module loaded successfully!');

    // You can add custom configuration here
    // For example, register composables, plugins, etc.
  },
});
