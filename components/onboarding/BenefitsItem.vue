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
  gap: var(--size-4);
  margin: var(--size-3) 0;
  padding: var(--size-4) var(--size-5);
  font-size: var(--size-5);
  border-radius: var(--size-1);
}

img {
  width: var(--size-6);
  height: var(--size-6);
}

li:nth-child(2) {
  padding: var(--size-3) var(--size-5);
}

@media (max-width: 1024px) {
  li {
    font-size: 4vw;
    gap: 2vw;
  }
  img {
    width: 4.5vw;
    height: 4.5vw;
  }
}
</style>