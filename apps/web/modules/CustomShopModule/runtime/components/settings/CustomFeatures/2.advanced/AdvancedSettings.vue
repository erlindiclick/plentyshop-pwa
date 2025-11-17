<template>
  <div class="advanced-settings p-6 bg-white rounded-lg shadow">
    <h3 class="text-xl font-semibold mb-4">Advanced Settings</h3>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> API Endpoint </label>
        <input
          v-model="apiEndpoint"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="https://api.example.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"> Cache Duration (seconds) </label>
        <input
          v-model.number="cacheDuration"
          type="number"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="3600"
        />
      </div>

      <button
        class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        @click="saveAdvancedSettings"
      >
        Save Advanced Settings
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const apiEndpoint = ref('');
const cacheDuration = ref(3600);

const saveAdvancedSettings = () => {
  // Implement save logic here
  console.log('Saving advanced settings:', {
    apiEndpoint: apiEndpoint.value,
    cacheDuration: cacheDuration.value,
  });
};
</script>
