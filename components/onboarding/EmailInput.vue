<script setup>
const props = defineProps({
  modelValue: String || Number,
  errorMessage: {
    type: String,
    required: false,
  }
});

const emit = defineEmits(['update:modelValue']);

const email = ref(props.modelValue);

watch(email, (value) => {
  emit('update:modelValue', value.trim());
});

function resetPlaceholder({ target }) {
  if (target.value.trim() === '') {
    email.value = '';
  }
}
</script>

<template>
  <div>
    <input autofocus type="text" placeholder="Email Address" v-model="email" @focusout="resetPlaceholder" />
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
  color: var(--color-text-tertiary);
  width: 100%;
}

p {
  color: var(--color-text-error);
  font-size: 16px;
}
</style>