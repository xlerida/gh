<script setup>
defineProps({
  errorMessage: {
    type: String,
    required: false,
  }
});

const emit = defineEmits(['update:modelValue']);

const code01 = ref('');
const code02 = ref('');
const code03 = ref('');
const code04 = ref('');
const code05 = ref('');
const code06 = ref('');

onMounted(() => {
  const inputs = document.querySelectorAll('.code-input');

  inputs.forEach((input, index) => {
    if (index === 0) {
      input.focus();
    }

    input.addEventListener('input', (event) => {
      if (event.target.value) {
        event.target.nextElementSibling?.focus();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !event.target.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener('keyup', (event) => {
      if (code01.value && code02.value && code03.value && code04.value && code05.value && code06.value) {
        emit('update:modelValue', `${code01.value}${code02.value}${code03.value}${code04.value}${code05.value}${code06.value}`);
      }
    });
  });
});
</script>

<template>
  <div class="code-inputs-container">
    <div>
      <input class="code-input" v-model="code01" maxlength="1" />
      <input class="code-input" v-model="code02" maxlength="1" />
      <input class="code-input" v-model="code03" maxlength="1" />
      <input class="code-input" v-model="code04" maxlength="1" />
      <input class="code-input" v-model="code05" maxlength="1" />
      <input class="code-input" v-model="code06" maxlength="1" />
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
</style>