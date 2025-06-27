<script setup>
const list = [
  'Access to 100+ GAMES for FREE thanks to ads',
  'Log In Across All Your Devices',
  'Skip the Line with Customer Support',
];
</script>

<template>
  <OnboardingBenefitsItem
    v-for="(item, index) in list"
    :key="index"
    :text="item"
    :hasGradient="index % 2 === 0"
  />
</template>