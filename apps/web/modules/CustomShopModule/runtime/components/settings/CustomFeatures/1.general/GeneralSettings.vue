<template>
  <div class="general-settings p-6 bg-white rounded-lg shadow">
    <h3 class="text-xl font-semibold mb-4">General Settings</h3>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Feature Name </label>
        <input
          v-model="featureName"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Enter feature name"
        />
      </div>

      <div>
        <label class="flex items-center space-x-2">
          <input
            v-model="isEnabled"
            type="checkbox"
            class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span class="text-sm font-medium text-gray-700">Enable this feature</span>
        </label>
      </div>

      <button
        class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        @click="saveSettings"
      >
        Save Settings
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const featureName = ref('');
const isEnabled = ref(false);

const saveSettings = () => {
  // Implement save logic here
  console.log('Saving settings:', { featureName: featureName.value, isEnabled: isEnabled.value });
};
</script>
