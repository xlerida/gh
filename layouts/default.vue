<script setup>
useHead({
  style: [
    {
      innerHTML: `:root {
          --font-family-primary: 'Open Sans', sans-serif;
          --font-weight-regular: 400;
          --font-weight-semibold: 600;
          --font-weight-bold: 800;

          --color-link: #5CB1D9;
          --color-text-primary: #ffffff;
          --color-text-secondary: #AFEEA6;
          --color-text-tertiary: #2B2345;
          --color-text-quaternary: #FBCD60;
          --color-text-error: #ff9e9e;

          --background-button-primary: #C2B5F7;
          --background-button-secondary: #FDCD60;
          --background-plan-card-primary: #3F3466;
          --background-plan-card-secondary: #594A94;
          --background-plan-card-tertiary: #54C1FB;
          --background-success-circle: #4A2D80;

          --size-1: 2px;
          --size-2: 4px;
          --size-3: 8px;
          --size-4: 12px;
          --size-5: 18px;
          --size-6: 24px;
          --size-7: 32px;
          --size-8: 36px;
          --size-9: 42px;
          --size-9: 48px;
      }`
    }
  ]
})
</script>

<template>
  <slot />
</template>