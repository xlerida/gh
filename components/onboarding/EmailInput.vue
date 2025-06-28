<script setup>
defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
})

const email = ref('');
</script>

<template>
  <div>
    <input type="text" placeholder="Email Address" v-model="email" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  text-align: left;
}

input {
  padding: var(--size-5);
  font-size: var(--size-5);
  border-radius: var(--size-2);
  width: 100%;
}

p {
  color: var(--color-text-error);
  font-size: var(--size-5);
}
</style>