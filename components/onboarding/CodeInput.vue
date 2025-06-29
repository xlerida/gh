<script setup>
defineProps({
  errorMessage: {
    type: String,
    required: false,
  }
});

const emit = defineEmits(['update:modelValue']);

const codeValues = reactive(Array(6).fill(''));

onMounted(() => {
  const inputs = document.querySelectorAll('.code-input');

  inputs.forEach((input, index) => {
    if (index === 0) input.focus();

    input.addEventListener('input', ({ target }) => {
      if (target.value) {
        target.nextElementSibling?.focus();
      }
    });

    input.addEventListener('keydown', ({ key }) => {
      if (key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener('keyup', () => {
      const codeComplete = codeValues.every(value => value);
      if (codeComplete) {
        emit('update:modelValue', codeValues.join(''));
      }
    });
  });
});
</script>

<template>
  <div class="code-inputs-container">
    <div>
      <input
        v-for="(value, index) in codeValues"
        :key="index"
        class="code-input"
        v-model="codeValues[index]"
        maxlength="1"
        @keydown.enter.prevent
      />
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.code-inputs-container {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  text-align: left;
}

div {
  display: flex;
  justify-content: space-between;
  gap: var(--size-3);
}

input {
  width: 70px;
  height: 70px;
  text-align: center;
  font-size: var(--size-6);
  color: var(--color-text-tertiary);
  border-radius: var(--size-3);
}

p {
  color: var(--color-text-error);
  font-size: 16px;
}

@media (max-width: 1024px) {
  input {
    width: 100%;
    height: 12vw;
    border-radius: 0.5vw;
  }
}
</style>