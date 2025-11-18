<template>
  <button
    class="accessibility-button"
    :class="{ active: active }"
    :aria-pressed="active ? 'true' : 'false'"
    :aria-label="label"
    @click="$emit('click')"
  >
    <slot name="icon"/>
    <span class="label"><slot>{{ label }}</slot></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  active: { type: Boolean, default: false },
  label: { type: String, default: 'Accessibility option' }
});
const emit = defineEmits<{
  (e: 'click'): void
}>();
</script>

<style scoped>
.accessibility-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}
.accessibility-button.active {
  border-color: var(--primary-color, #062633);
  background: var(--primary-color, #062633);
  color: white;
}
.label {
  font-weight: 600;
  font-size: 14px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
</style>