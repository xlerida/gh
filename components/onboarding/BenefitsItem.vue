<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  hasGradient: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <li :style="hasGradient ? { background: 'linear-gradient(to right, rgba(92, 63, 102, 0.5) 20%, rgba(55, 43, 83, 0.4) 80%)' } : {}">
    <img
      class="benefits-item__icon"
      src="~/assets/images/checkmark.svg" 
      alt="Checkmark"
    />
    <p>{{ text }}</p>
  </li>
</template>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 12px;
  margin: 8px 0;
  padding: 12px 16px;
  font-size: 18px;
  border-radius: 2px;
}
img {
  width: 24px;
  height: 24px;
}
</style>