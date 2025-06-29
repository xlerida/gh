<script setup>
const props = defineProps({
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
  currency: {
    type: String,
    default: "",
  },
  trial: {
    type: String,
    default: "",
  },
  isBestValue: {
    type: Boolean,
    default: false,
  },
});

const currencySymbol = computed(() => {
  return props.currency === 'USD' ? '$' : '€';
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
      <div>
        <div class="plan-card-price-billed">
          <p><span>{{ currencySymbol }}</span>{{ price }}</p>
          <p>{{ billed }}</p>
        </div>
        <p class="plan-card-trial">{{ trial }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-card {
  background: transparent;
  border-radius: var(--size-4);
  padding: var(--size-2);
  width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.plan-card-selected {
  background: linear-gradient(to right, #ff7eb3, #8a4eff, #4fcdfc);
}

.plan-card-inner {
  background: var(--background-plan-card-primary);
  border-radius: var(--size-4);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.plan-card-inner.selected {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: var(--size-8);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--size-3);
  background: var(--background-plan-card-secondary);
  padding: var(--size-4) 0;
  border-radius: var(--size-4) var(--size-4) 0 0;
}

.plan-card-price-billed {
  margin: var(--size-6) 0 var(--size-7);
}

.plan-card-price-billed p:first-of-type {
  font-size: var(--size-8);
  font-weight: var(--font-weight-bold);
}

.plan-card-price-billed p:last-child {
  opacity: 0.8;
  font-size: var(--size-5);
  font-weight: var(--font-weight-regular);
}

.plan-card-trial {
  color: var(--color-text-quaternary);
  background: var(--color-text-tertiary);
  padding: var(--size-4) 0;
  border-radius: 0 0 var(--size-4) var(--size-4);
  text-align: center;
  font-weight: var(--font-weight-semibold);
}

.plan-card-tooltip {
  position: absolute;
  top: -34px;
  right: 20px;
  padding: var(--size-3) var(--size-4);
  background: var(--background-plan-card-tertiary);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--size-4) var(--size-4) 0 0;
}

.plan-card-checkmark {
  position: absolute;
  z-index: 10;
  top: 20px;
  left: 20px;
  width: var(--size-7);
  height: var(--size-7);
  border-radius: 100px;
  border: var(--size-1) solid white;
}

.plan-card-checkmark-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-text-secondary);
  border: 0;
  width: var(--size-8);
  height: var(--size-8);
}

.plan-card-checkmark-selected svg {
  width: var(--size-6);
}

.plan-card-checkmark-selected svg path {
  fill: var(--background-plan-card-secondary);
}

@media (max-width: 1024px) {
  .plan-card {
    width: 80vw;
    height: 40vw;
  }

  .plan-card-inner {
    flex-direction: row;
    justify-content: flex-start;
  }

  .plan-card-inner > div {
    width: 100%;
    max-width: 40vw;
    display: flex;
    flex-direction: column;
  }

  h2 {
    height: 100%;
    box-sizing: border-box;
    border-radius: 1vw 0 0 1vw;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 5vw;
    padding: 0 0 0 12vw;
    width: 38vw;
  }

  .plan-card-checkmark {
    top: 50%;
    transform: translateY(-50%);
    left: 3.5vw;
    width: 6vw;
    height: 6vw;
  }

  .plan-card-checkmark-selected {
    width: 6.5vw;
    height: 6.5vw;
  }

  .plan-card-checkmark svg {
    left: 3vw;
    width: 4vw;
    height: 4vw;
  }

  .plan-card-price-billed {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }

  .plan-card-price-billed p:first-of-type {
    font-size: 4.25vw;
  }

  .plan-card-price-billed p:last-child {
    font-size: 3vw;
  }

  .plan-card-trial {
    border-radius: 0 0 1vw 0;
    font-size: 2.5vw;
  }
}

@media (max-width: 720px) {
  h2 {
      border-radius: 2vw 0 0 2vw;
  } 
  .plan-card-trial {
    border-radius: 0 0 2vw 0;
  }
}
</style>
