<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '~/stores/onboarding';
import { computed, ref, onUnmounted } from 'vue';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const email = computed(() => onboardingStore.email);

const isLoading = ref(false);
const isPrimaryButtonDisabled = ref(false);
const code = ref('');
const errorMessage = ref('');
const canResend = ref(true);
const countdown = ref(0);
const isPortrait = ref(false);

let countdownInterval = null;

async function handleFormSubmit() {
  isLoading.value = true;
  isPrimaryButtonDisabled.value = true;
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
      error.response?.data?.error || 'Invalid email or code.';
  } finally {
    isLoading.value = false;
    isPrimaryButtonDisabled.value = false;
  }
}

function handlePreviousStep() {
  onboardingStore.resetSteps();
  router.push(`/onboarding/connect`);
}

function handleCode(value) {
  code.value = value;
  errorMessage.value = '';
  handleFormSubmit();
}

async function handleResendCode() {
  if (!canResend.value) return;
  
  try {
    await axios.post('http://localhost:8080/api/send-email', {
      email: email.value,
      code: code.value,
    });

    canResend.value = false;
    countdown.value = 30;

    countdownInterval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(countdownInterval);
        canResend.value = true;
      }
    }, 1000);

    errorMessage.value = '';
  } catch (error) {
    if (error.response?.status === 429) {
      canResend.value = false;
      countdown.value = Math.ceil(error.response.data.retryAfter || 30);
      countdownInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(countdownInterval);
          canResend.value = true;
        }
      }, 1000);
    }
    errorMessage.value =
      error.response?.data?.error || 'Failed to resend code. Please try again.';
  }
}

const updateIsPortrait = () => {
  isPortrait.value = window.innerWidth <= 1024;
};

onMounted(() => {
  updateIsPortrait();
  window.addEventListener('resize', updateIsPortrait);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  window.removeEventListener('resize', updateIsPortrait);
});
</script>

<template>
  <OnboardingSecondaryButton class="onboarding-secondary-button" text="Modify email" variant="outlined" @click="handlePreviousStep" />
  <main>
    <section v-if="!isPortrait">
      <div>
        <OnboardingBenefitsList />
      </div>
    </section>
    <section>
      <h1>Get Verified!</h1>
      <h2>Enter the one-time code we sent to:</h2>
      <h3>{{ email }}</h3>
      <OnboardingBenefitsList v-if="isPortrait" />
      <form @submit.prevent="handleFormSubmit">
        <OnboardingCodeInput :errorMessage="errorMessage" @update:modelValue="handleCode" />
        <div>
          <p>Didn't get an email? 
            <span v-if="canResend" @click="handleResendCode">Resend Code</span>
            <span v-else class="resend-disabled">Resend again in {{ countdown }}s</span>
          </p>
          <OnboardingPrimaryButton 
            text="Verify" 
            :isLoading="isLoading" 
            :isDisabled="isPrimaryButtonDisabled" 
          />
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

form p .resend-disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

button {
  margin-bottom: 10px;
}

@media (max-width: 1024px) {
  main {
    flex-direction: column;
    width: 100vw;
    justify-content: flex-start;
    align-items: flex-start;
    max-height: 100vh;
    height: 100vh;
  }

  section {
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
  }

  section:last-child {
    height: auto;
  }

  h1 {
    margin-top: 12vw;
    font-size: 6.5vw;
    white-space: nowrap;
  }

  h2 {
    font-size: 4vw;
  }

  h3 {
    font-size: 4vw;
    margin-bottom: 4vw;
  }

  form {
    padding: 4vw;
    margin-bottom: 10vw;
  }

  form div:last-child {
    margin-top: 8vw;
  }
}

@media (max-width: 720px) {
  h1 {
    margin-top: 24vw;
  }
}

@media (max-width: 480px) {
  h1 {
    margin-top: 36vw;
  }
}
</style>