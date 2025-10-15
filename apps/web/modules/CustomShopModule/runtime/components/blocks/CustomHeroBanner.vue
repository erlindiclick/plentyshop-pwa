<template>
  <div class="custom-hero-banner bg-gradient-to-r from-primary-700 to-secondary-700 text-white py-16 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">
        {{ title }}
      </h1>
      <p class="text-xl md:text-2xl mb-8">
        {{ subtitle }}
      </p>
      <button
        v-if="buttonText"
        class="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        @click="handleClick"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomHeroBannerProps } from './types';

const props = withDefaults(defineProps<CustomHeroBannerProps>(), {
  title: 'Welcome to Our Custom Shop',
  subtitle: 'Discover amazing products',
  buttonText: '',
  buttonLink: '/',
});

const handleClick = () => {
  if (props.buttonLink) {
    navigateTo(props.buttonLink);
  }
};
</script>

<style scoped>
.custom-hero-banner {
  /* Add custom styles here */
}
</style>
