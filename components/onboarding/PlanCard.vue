<script setup>
defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
  hasTooltip: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    default: "",
  },
  billed: {
    type: String,
    default: "",
  },
  trial: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="{ 'plan-card': true, 'plan-card-selected': isSelected }">
    <div v-if="hasTooltip && isSelected" class="plan-card-tooltip">{{ tooltip }}</div>
    <div class="plan-card-checkmark" :class="{ 'plan-card-checkmark-selected': isSelected }">
      <svg v-if="isSelected" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
    </div>
    <div class="plan-card-inner">
      <h2>{{ title }}</h2>
      <div class="plan-card-price-billed">
        <p>{{ price }}</p>
        <p>{{ billed }}</p>
      </div>
      <p class="plan-card-trial">{{ trial }}</p>
    </div>
  </div>
</template>

<style scoped>
.plan-card {
  background: transparent;
  border-radius: 16px;
  padding: 4px;
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.plan-card-selected {
  background: linear-gradient(to right, #ff7eb3, #8a4eff, #4fcdfc); /* Gradient border when selected */
}

.plan-card-inner {
  background: var(--background-plan-card-primary);
  border-radius: 14px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.plan-card-inner.selected {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Optional highlight effect */
}

h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
  background: var(--background-plan-card-secondary);
  padding: 12px 0;
  border-radius: 12px 12px 0 0;
}

.plan-card-price-billed {
  margin: 24px 0 32px;
}

.plan-card-price-billed p:first-of-type {
  font-size: 36px;
  font-weight: 800;
}

.plan-card-price-billed p:last-child {
  opacity: 0.8;
  font-size: 18px;
  font-weight: 400;
}

.plan-card-trial {
  color: var(--color-text-quaternary);
  background: var(--color-text-tertiary);
  padding: 12px 0;
  border-radius: 0 0 12px 12px;
  text-align: center;
  font-weight: 600;
}

.plan-card-tooltip {
  position: absolute;
  top: -34px;
  right: 20px;
  padding: 8px 12px;
  background: var(--background-plan-card-tertiary);
  color: var(--color-text-tertiary);
  font-weight: 600;
  border-radius: 12px 12px 0 0;
}

.plan-card-checkmark {
  position: absolute;
  z-index: 10;
  top: 20px;
  left: 20px;
  width: 36px;
  height: 36px;
  border-radius: 100px;
  border: 2px solid white;
}

.plan-card-checkmark-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-text-secondary);
  border: 0;
  width: 38px;
  height: 38px;
}

.plan-card-checkmark-selected svg {
  width: 24px;
}

.plan-card-checkmark-selected svg path {
  fill: var(--background-plan-card-secondary);
}
</style>
