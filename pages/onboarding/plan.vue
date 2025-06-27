<script setup>
const isAnnualSelected = ref(true);
const isMonthlySelected = ref(false);

function togglePlan(billed) {
  if (billed === "annual") {
    isAnnualSelected.value = true;
    isMonthlySelected.value = false;
  } else {
    isAnnualSelected.value = false;
    isMonthlySelected.value = true;
  }
}
</script>

<template>
  <OnboardingSecondaryButton class="onboarding-secondary-button" variant="icon" />
  <main>
    <h1>Choose your plan</h1>
    <div>
      <section>
        <OnboardingPlanCard title="Annual" price="$ 87.99 /year" billed="Billed annually" trial="7-day free trial" :isSelected="isAnnualSelected" :hasTooltip="true" tooltip="Save 20%" @click="togglePlan('annual')" /> 
      </section>
      <section>
        <OnboardingPlanCard title="Monthly" price="$ 9.99 /month" billed="Billed monthly" trial="No free trial" :isSelected="isMonthlySelected" @click="togglePlan('monthly')" />
      </section>
    </div>
    <p class="cancel">Cancel anytime.</p>
    <OnboardingPrimaryButton class="onboarding-primary-button" text="Start my Free Trial!" />
    <p class="terms">
      <a href="https://www.gamehouse.com/privacypolicy" target="_blank">Privacy Policy</a>
       |
      <a href="https://www.gamehouse.com/terms-of-service" target="_blank">Terms of Service</a>
      |
      <a href="https://support.gamehouse.com/hc/en-us/articles/215256318-How-can-I-redownload-my-purchased-games" target="_blank">Restore Purchase</a>
    </p>
  </main>
</template>

<style scoped>
.onboarding-secondary-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 24px;
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
  gap: 24px;
  width: 100%;
}

section:first-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 79%;
}

h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 8px;
}

h2 {
  font-size: 24px;
  font-weight: 400;
}

h3 {
  margin-top: 8px;
  margin-bottom: 36px;
  font-size: 24px;
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
  padding-left: 24px;
  margin: 5px 0;
  user-select: none;
  position: relative;
  top: -24px;
  font-size: 18px;
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