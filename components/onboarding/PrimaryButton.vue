<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <button>{{ text }}</button>
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
}
</style>