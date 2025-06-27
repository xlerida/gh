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
  gap: 12px;
  text-align: left;
}

input {
  padding: 18px;
  font-size: 18px;
  border-radius: 4px;
  width: 100%;
}

p {
  color: var(--color-text-error);
  font-size: 14px;
}
</style>