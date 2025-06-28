<script setup>
import { ref } from 'vue';

defineProps({
  text: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const ripples = ref([]);

const createRipple = (event) => {
  if (ripples.value.length > 3) {
    ripples.value.shift(); // Remove oldest ripple if too many
  }

  const button = event.currentTarget;
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  const ripple = {
    id: Date.now(),
    x: event.clientX - button.getBoundingClientRect().left - radius,
    y: event.clientY - button.getBoundingClientRect().top - radius,
    size: diameter,
  };

  ripples.value.push(ripple);

  // Remove ripple after animation completes
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id);
  }, 600);
};
</script>

<template>
  <button 
    :class="{ 'disabled': isDisabled }" 
    @click="createRipple"
    :disabled="isDisabled || isLoading"
  >
    <div class="button-content">
      <svg v-if="isLoading" class="rotate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M258.6 0c-1.7 0-3.4 .1-5.1 .5C168 17 115.6 102.3 130.5 189.3c2.9 17 8.4 32.9 15.9 47.4L32 224l-2.6 0C13.2 224 0 237.2 0 253.4c0 1.7 .1 3.4 .5 5.1C17 344 102.3 396.4 189.3 381.5c17-2.9 32.9-8.4 47.4-15.9L224 480l0 2.6c0 16.2 13.2 29.4 29.4 29.4c1.7 0 3.4-.1 5.1-.5C344 495 396.4 409.7 381.5 322.7c-2.9-17-8.4-32.9-15.9-47.4L480 288l2.6 0c16.2 0 29.4-13.2 29.4-29.4c0-1.7-.1-3.4-.5-5.1C495 168 409.7 115.6 322.7 130.5c-17 2.9-32.9 8.4-47.4 15.9L288 32l0-2.6C288 13.2 274.8 0 258.6 0zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
      <span v-else>{{ text }}</span>
    </div>
    
    <span 
      v-for="ripple in ripples" 
      :key="ripple.id"
      class="ripple"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
      }"
    ></span>
  </button>
</template>

<style scoped>
button {
  padding: var(--size-5);
  font-size: var(--size-6);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--size-2);
  background: var(--background-button-primary);
  color: var(--color-text-tertiary);
  cursor: pointer;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: background 0.3s;
  min-height: calc(var(--size-6) + 2 * var(--size-5));
}

.button-content {
  position: relative;
  z-index: 1;
}

button.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

svg {
  width: var(--size-6);
  position: relative;
  top: var(--size-1);
}

.rotate {
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: var( --background-success-circle);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
  margin: 0;
  padding: 0;
  border: none;
  opacity: 0.6;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>