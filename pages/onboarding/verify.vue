<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '~/stores/onboarding';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const email = computed(() => onboardingStore.email);

const isLoading = ref(false);
const isPrimaryButtonDisabled = ref(false);
const code = ref('');
const errorMessage = ref('');

async function handleFormSubmit() {
  try {
    const response = await axios.post('http://localhost:8080/api/validate-email', {
      email: email.value,
      code: code.value,
    });

    if (response.status === 200) {
      onboardingStore.nextStep();
      router.push(`/onboarding/${onboardingStore.currentStep}`);
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.error || 'Invalid code. Please try again.';
  }
}

function handlePreviousStep() {
  onboardingStore.previousStep();
  router.push(`/onboarding/${onboardingStore.currentStep}`);
}

function handleCode(value) {
  code.value = value;
}
</script>

<template>
  <OnboardingSecondaryButton class="onboarding-secondary-button" text="Modify email" variant="outlined" @click="handlePreviousStep" />
  <main>
    <section>
      <div>
        <OnboardingBenefitsList />
      </div>
    </section>
    <section>
      <h1>Get Verified!</h1>
      <h2>Enter the one-time code we sent to:</h2>
      <h3>{{ email }}</h3>
      <form @submit.prevent="handleFormSubmit">
        <OnboardingCodeInput :errorMessage="errorMessage" @update:modelValue="handleCode" />
        <div>
          <p>Didn't get an email? <span>Resend Code</span></p>
          <OnboardingPrimaryButton text="Verify" :isLoading="isLoading" :isDisabled="isPrimaryButtonDisabled"  />
        </div>
      </form>
    </section>
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
  justify-content: flex-start;
  align-items: flex-start;
  height: 50vh;
  text-align: center;
  gap: calc(var(--size-9) * 2);
  max-height: 420px;
  min-height: 420px;
  max-width: 1024px;
}

section:first-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 415px;
}

section:first-child div {
  position: relative;
  top: var(--size-8);
}

h1 {
  font-size: var(--size-8);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--size-3);
}

h2 {
  font-size: var(--size-5);
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
  height: 100%;
  max-width: 720px;
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
</style>