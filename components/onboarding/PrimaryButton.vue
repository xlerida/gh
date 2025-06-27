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
  padding: 18px;
  font-size: 24px;
  font-weight: 600;
  border-radius: 4px;
  background: var(--background-button-primary);
  color: var(--color-text-tertiary);
  cursor: pointer;
  width: 100%;
}
</style>