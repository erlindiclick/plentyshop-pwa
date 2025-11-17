<template>
  <div class="accessibility-toolbar" :class="{ 'is-open': isOpen }">
    <!-- Toggle Button -->
    <button
      class="accessibility-toggle"
      :aria-label="isOpen ? 'Close accessibility toolbar' : 'Open accessibility toolbar'"
      :aria-expanded="isOpen"
      @click="toggleToolbar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
      <span class="sr-only">Accessibility Options</span>
    </button>

    <!-- Toolbar Panel -->
    <div v-show="isOpen" class="accessibility-panel" role="region" aria-label="Accessibility Settings">
      <div class="accessibility-panel-header">
        <h2 class="accessibility-panel-title">Accessibility Settings</h2>
        <button class="accessibility-close" aria-label="Close toolbar" @click="toggleToolbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="accessibility-panel-content">
        <!-- Font Size Controls -->
        <div class="accessibility-section">
          <h3 class="accessibility-section-title">Text Size</h3>
          <div class="accessibility-button-group">
            <button
              class="accessibility-button"
              :class="{ active: currentFontSize === 'small' }"
              @click="setFontSize('small')"
            >
              <span class="text-sm">A</span>
              <span class="sr-only">Small text</span>
            </button>
            <button
              class="accessibility-button"
              :class="{ active: currentFontSize === 'normal' }"
              @click="setFontSize('normal')"
            >
              <span class="text-base">A</span>
              <span class="sr-only">Normal text</span>
            </button>
            <button
              class="accessibility-button"
              :class="{ active: currentFontSize === 'large' }"
              @click="setFontSize('large')"
            >
              <span class="text-lg">A</span>
              <span class="sr-only">Large text</span>
            </button>
            <button
              class="accessibility-button"
              :class="{ active: currentFontSize === 'extra-large' }"
              @click="setFontSize('extra-large')"
            >
              <span class="text-xl">A</span>
              <span class="sr-only">Extra large text</span>
            </button>
          </div>
        </div>

        <!-- High Contrast Toggle -->
        <div class="accessibility-section">
          <h3 class="accessibility-section-title">Display</h3>
          <label class="accessibility-switch">
            <input
              type="checkbox"
              :checked="highContrastEnabled"
              @change="toggleHighContrast"
              aria-label="Toggle high contrast mode"
            />
            <span class="accessibility-switch-slider"></span>
            <span class="accessibility-switch-label">High Contrast Mode</span>
          </label>
        </div>

        <!-- Keyboard Shortcuts Info -->
        <div class="accessibility-section">
          <h3 class="accessibility-section-title">Keyboard Shortcuts</h3>
          <ul class="accessibility-shortcuts">
            <li><kbd>Ctrl</kbd> + <kbd>+</kbd> Increase text size</li>
            <li><kbd>Ctrl</kbd> + <kbd>-</kbd> Decrease text size</li>
            <li><kbd>Esc</kbd> Close dialogs/menus</li>
            <li><kbd>Tab</kbd> Navigate forward</li>
            <li><kbd>Shift</kbd> + <kbd>Tab</kbd> Navigate backward</li>
          </ul>
        </div>

        <!-- Reset Button -->
        <div class="accessibility-section">
          <button class="accessibility-reset-button" @click="resetSettings">Reset to Defaults</button>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div v-show="isOpen" class="accessibility-backdrop" @click="toggleToolbar"></div>
  </div>
</template>

<script setup lang="ts">
const { $accessibility } = useNuxtApp();
const isOpen = ref(false);

const highContrastEnabled = computed(() => $accessibility.highContrastMode.value);
const currentFontSize = computed(() => $accessibility.fontSize.value);

const toggleToolbar = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    $accessibility.announce('Accessibility toolbar opened');
  } else {
    $accessibility.announce('Accessibility toolbar closed');
  }
};

const toggleHighContrast = () => {
  $accessibility.toggleHighContrast();
};

const setFontSize = (size: 'small' | 'normal' | 'large' | 'extra-large') => {
  $accessibility.setFontSize(size);
};

const resetSettings = () => {
  $accessibility.reset();
};

// Close on escape key
onMounted(() => {
  const handleEscape = () => {
    if (isOpen.value) {
      isOpen.value = false;
    }
  };

  window.addEventListener('accessibility:escape', handleEscape);

  onUnmounted(() => {
    window.removeEventListener('accessibility:escape', handleEscape);
  });
});
</script>

<style scoped>
.accessibility-toolbar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.accessibility-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--primary-color, #062633);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.accessibility-toggle:hover {
  transform: scale(1.1);
  box-shadow:
    0 6px 8px rgba(0, 0, 0, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.1);
}

.accessibility-toggle:focus-visible {
  outline: 3px solid var(--primary-color, #062633);
  outline-offset: 2px;
}

.accessibility-panel {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 320px;
  max-height: calc(100vh - 120px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideUp 0.3s ease;
  z-index: 10000;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.accessibility-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--primary-color, #062633);
  color: white;
}

.accessibility-panel-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.accessibility-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.accessibility-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.accessibility-panel-content {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 20px;
}

.accessibility-section {
  margin-bottom: 24px;
}

.accessibility-section:last-child {
  margin-bottom: 0;
}

.accessibility-section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}

.accessibility-button-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.accessibility-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.accessibility-button:hover {
  border-color: var(--primary-color, #062633);
  background: #f9fafb;
}

.accessibility-button.active {
  border-color: var(--primary-color, #062633);
  background: var(--primary-color, #062633);
  color: white;
}

.accessibility-button:focus-visible {
  outline: 2px solid var(--primary-color, #062633);
  outline-offset: 2px;
}

.accessibility-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.accessibility-switch input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.accessibility-switch-slider {
  position: relative;
  width: 48px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  transition: background 0.3s;
}

.accessibility-switch-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

.accessibility-switch input:checked + .accessibility-switch-slider {
  background: var(--primary-color, #062633);
}

.accessibility-switch input:checked + .accessibility-switch-slider::after {
  transform: translateX(24px);
}

.accessibility-switch:focus-within .accessibility-switch-slider {
  outline: 2px solid var(--primary-color, #062633);
  outline-offset: 2px;
}

.accessibility-switch-label {
  font-size: 14px;
  color: #374151;
}

.accessibility-shortcuts {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.accessibility-shortcuts li {
  padding: 6px 0;
}

.accessibility-shortcuts kbd {
  display: inline-block;
  padding: 2px 6px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: #374151;
}

.accessibility-reset-button {
  width: 100%;
  padding: 12px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.accessibility-reset-button:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.accessibility-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9998;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* High contrast mode styles */
:global(.high-contrast) .accessibility-panel {
  border: 2px solid #000;
}

/* Responsive */
@media (max-width: 640px) {
  .accessibility-panel {
    right: 10px;
    left: 10px;
    width: auto;
  }

  .accessibility-toolbar {
    right: 10px;
    bottom: 10px;
  }
}
</style>
