<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "outlined", // outlined, icon
  },
});
</script>
<template>
  <button v-if="variant === 'outlined'" class="button-outlined">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
    {{ text }}
  </button>
  <button v-else class="button-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
  </button>
</template>

<style scoped>
.button-outlined {
  display: flex;
  align-items: center;
  gap: var(--size-4);
  height: var(--size-6);
  font-size: 16px;
  border-radius: var(--size-2);
  border: var(--size-1) solid var(--background-button-primary);
  background: transparent;
  color: var(--background-button-primary);
  cursor: pointer;
}

.button-outlined svg {
  width: 14px;
}

.button-outlined svg path {
  fill: var(--background-button-primary);
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-button-primary);
  border-radius: 100px;
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.button-icon svg {
  width: var(--size-5);
  flex-shrink: 0;
  fill: var(--color-text-tertiary);
}
</style>