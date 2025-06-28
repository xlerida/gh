<script setup>
const code01 = ref('');
const code02 = ref('');
const code03 = ref('');
const code04 = ref('');
const code05 = ref('');
const code06 = ref('');

onMounted(() => {
  const inputs = document.querySelectorAll('.code-input');
  inputs.forEach((input, index) => {
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
  });
  
});
</script>

<template>
  <div>
    <input class="code-input" v-model="code01" maxlength="1" />
    <input class="code-input" v-model="code02" maxlength="1" />
    <input class="code-input" v-model="code03" maxlength="1" />
    <input class="code-input" v-model="code04" maxlength="1" />
    <input class="code-input" v-model="code05" maxlength="1" />
    <input class="code-input" v-model="code06" maxlength="1" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-between;
  gap: var(--size-3);
}

input {
  width: 80px;
  height: 70px;
  text-align: center;
  font-size: var(--size-6);
  color: var(--color-text-tertiary);
  border-radius: var(--size-3);
}
</style>