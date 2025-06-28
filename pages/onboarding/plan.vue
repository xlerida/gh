<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '~/stores/onboarding';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const isAnnualSelected = ref(true);
const isMonthlySelected = ref(false);
const plans = ref({});

function togglePlan(billed) {
  if (billed === 'annual') {
    isAnnualSelected.value = true;
    isMonthlySelected.value = false;
  } else {
    isAnnualSelected.value = false;
    isMonthlySelected.value = true;
  }
}

function handlePreviousStep() {
  onboardingStore.previousStep();
  router.push(`/onboarding/${onboardingStore.currentStep}`);
}

function handleStartTrial() {
  onboardingStore.nextStep();
  router.push(`/onboarding/${onboardingStore.currentStep}`);
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    plans.value = response.data;
  } catch (error) {
    console.log('Error:', error);
  }
});
</script>

<template>
  <OnboardingSecondaryButton
    class="onboarding-secondary-button"
    variant="icon"
    @click="handlePreviousStep"
  />
  <main>
    <h1>Choose your plan</h1>
    <div>
      <OnboardingPlanCard
        title="Annual"
        :price="`${plans?.year?.price} /year`"
        :billed="`Billed annually`"
        :currency="plans?.year?.currency"
        :trial="`${plans?.year?.trial_days}-day free trial`"
        :isSelected="isAnnualSelected"
        :hasTooltip="true"
        tooltip="Save 20%"
        @click="togglePlan('annual')"
      />
      <OnboardingPlanCard
        title="Monthly"
        :price="`${plans?.monthly?.price} /month`"
        :billed="`Billed monthly`"
        :currency="plans?.monthly?.currency"
        :trial="`${plans?.monthly?.trial_days}-day free trial`"
        :isSelected="isMonthlySelected"
        @click="togglePlan('monthly')"
      />
    </div>
    <p class="cancel">Cancel anytime.</p>
    <OnboardingPrimaryButton
      class="onboarding-primary-button"
      text="Start my Free Trial!"
      @click="handleStartTrial"
    />
    <p class="terms">
      <a
        href="https://www.gamehouse.com/privacypolicy"
        target="_blank"
        >Privacy Policy</a
      >
      |
      <a href="https://www.gamehouse.com/terms-of-service" target="_blank"
        >Terms of Service</a
      >
      |
      <a
        href="https://support.gamehouse.com/hc/en-us/articles/215256318-How-can-I-redownload-my-purchased-games"
        target="_blank"
        >Restore Purchase</a
      >
    </p>
  </main>
</template>

<style scoped>
.onboarding-secondary-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: var(--size-6);
}

main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 60px;
  max-height: 500px;
  max-width: 1024px;
  margin-top: -98px;
}

main > div {
  display: flex;
  flex-direction: row;
  gap: var(--size-6);
  width: 100%;
}

h1 {
  font-size: var(--size-9);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--size-3);
}

h2 {
  font-size: var(--size-6);
  font-weight: var(--font-weight-regular);
}

h3 {
  margin-top: var(--size-3);
  margin-bottom: var(--size-8);
  font-size: var(--size-6);
  color: var(--color-text-secondary)
}

section:last-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

form p {
  padding-left: var(--size-6);
  margin: 5px 0;
  user-select: none;
  position: relative;
  top: -24px;
  font-size: var(--size-5);
}

form p span {
  color: var(--color-link);
  cursor: pointer;
}

button {
  margin-bottom: 10px;
}

.cancel {
  color: var(--background-button-primary);
  opacity: 0.8;
  margin: -24px 0;
}

.onboarding-primary-button {
  background: var(--background-button-secondary);
  max-width: 520px;
}

.terms {
  color: var(--background-button-primary);
  opacity: 0.8;
}

.terms a {
  color: var(--background-button-primary);
  opacity: 0.8;
  text-decoration: underline;
}
</style>