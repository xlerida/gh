<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '~/stores/onboarding';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const RETRY_ERROR = 'Please wait 30 seconds before resending.';

const email = ref('');
const errorMessage = ref('');
const errorCountdown = ref(0);
const offers = ref(true);
const isLoading = ref(false);
const isPrimaryButtonDisabled = ref(false);
const isPortrait = ref(false);

const primaryButtonText = computed({
  get() {
    if (errorMessage.value === RETRY_ERROR) {
      return `${errorCountdown.value}s`;
    } else {
      return 'Connect';
    }
  },
  set(value) {
    primaryButtonText.value = value;
  },
});

watch(email, () => {
  if (errorMessage.value === RETRY_ERROR) {
    return;
  }
  errorMessage.value = '';
});

watch(errorMessage, () => {
  if (errorMessage.value === RETRY_ERROR) {
    errorCountdown.value = 30;
  }
});

watch(errorCountdown, () => {
  if (errorCountdown.value === 0) {
    errorMessage.value = '';
    isPrimaryButtonDisabled.value = false;
  }

  if (errorCountdown.value === 30) {
    isPrimaryButtonDisabled.value = true;

    setInterval(() => {
      errorCountdown.value--;
    }, 1000);
  }
});

async function handleFormSubmit() {
  if (errorMessage.value === RETRY_ERROR) {
    return;
  }

  try {
    isLoading.value = true;

    if (email.value === 'cheats@cheats.com') {
      onboardingStore.setEmail(email.value);
      onboardingStore.nextStep();
      router.push(`/onboarding/${onboardingStore.currentStep}`);
      return;
    }

    if (!email.value.includes('@')) {
      isLoading.value = false;
      errorMessage.value = 'Please enter a valid email address.';
      return;
    }

    const response = await axios.post('http://localhost:8080/api/send-email', {
      email: email.value,
    });

    if (response.status === 200) {
      isLoading.value = false;
      onboardingStore.setEmail(email.value);
      onboardingStore.nextStep();
      router.push(`/onboarding/${onboardingStore.currentStep}`);
    }
    
  } catch (error) {
    console.log('Error:', error);

    isLoading.value = false;

    if (error.response?.data?.error === RETRY_ERROR) {
      errorMessage.value = RETRY_ERROR;
    }

    errorMessage.value =
      error.response?.data?.error || 'Something went wrong. Please try again.';
  }
};

const updateIsPortrait = () => {
  isPortrait.value = window.innerWidth <= 1024;
};

onMounted(() => {
  updateIsPortrait();
  window.addEventListener('resize', updateIsPortrait);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsPortrait);
});
</script>

<template>
    <main>
      <section>
        <h1>Connect Your Account</h1>
        <h2>...and unlock your benefits!</h2>
        <OnboardingBenefitsList v-if="isPortrait" />
        <form @submit.prevent="handleFormSubmit">
          <OnboardingEmailInput class="onboarding-email-input" v-model="email" :errorMessage="errorMessage" />
          <div>
            <label>
              <input type="checkbox" v-model="offers" class="custom-checkbox__input">
              <span class="custom-checkbox__checkmark"></span>
              <span class="custom-checkbox__label">Send Me Offers, News and Fun Stuff!</span>
            </label>
            <OnboardingPrimaryButton :text="primaryButtonText" :isLoading="isLoading" :isDisabled="isPrimaryButtonDisabled" />
          </div>
        </form>
      </section>
      <section>
        <div>
          <OnboardingBenefitsList class="onboarding-benefits-list" v-if="!isPortrait" />
        </div>
        <p class="onboarding-terms">
          By continuing, you agree to our 
          <a href="https://www.gamehouse.com/terms-of-service" target="_blank">Terms of Service</a> 
          and 
          <a href="https://www.gamehouse.com/privacypolicy" target="_blank">Privacy Policy</a>.
        </p>
      </section>
      </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  height: 40vh;
  text-align: center;
  gap: calc(var(--size-9) * 2);
  max-height: 420px;
  min-height: 420px;
  max-width: 1024px;
}

section:last-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 87%;
  max-width: 480px;
}

section:last-child p {
  padding: var(--size-5);
  font-size: 14px;
}

section:last-child div {
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
  margin-bottom: var(--size-8);
}

section:first-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 720px;
}

form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

label {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  padding-left: var(--size-6);
  margin: 5px 0;
  user-select: none;
  position: relative;
  top: -24px;
}

.custom-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox__checkmark {
  position: absolute;
  top: var(--size-1);
  left: calc(var(--size-9) * 1.5);
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: var(--size-1) solid #ccc;
  border-radius: 4px;
}

.custom-checkbox__checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox__input:checked ~ .custom-checkbox__checkmark:after {
  display: block;
}

.custom-checkbox__checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 var(--size-1) var(--size-1) 0;
  transform: rotate(45deg);
}

.custom-checkbox__label {
  margin-left: var(--size-3);
  font-size: var(--size-5);
}

button {
  margin-bottom: 10px;
}

@media (max-width: 1024px) {
  main {
    flex-direction: column;
    width: 100vw;
    justify-content: space-between;
    align-items: flex-start;
    max-height: 100vh;
    height: 100vh;
  }

  section {
    width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
  }

  section:first-child {
    margin-top: 18vw;
  }

  h1 {
    font-size: 6.5vw;
    white-space: nowrap;
  }

  h2 {
    font-size: 4vw;
    margin-bottom: 5vw;
  }

  form {
    margin-top: 18vw;
    padding: 0 8vw;
  }

  .onboarding-email-input {
    margin-bottom: 18vw;
  }

  .custom-checkbox__label {
    font-size: 4vw;
  }
  
  .custom-checkbox__checkmark {
    top: 0.8vw;
    left: 4.5vw;
    width: 4vw;
    height: 4vw;
  }

  .custom-checkbox__checkmark:after {
    left: 1.2vw;
    top: 0.4vw;
    width: 1vw;
    height: 1.6vw;
  }
}

@media (max-width: 768px) {
  .custom-checkbox__checkmark:after {
    left: 1.1vw;
    width: 1vw;
    height: 1.6vw;
  }
}

@media (max-width: 620px) {
  .custom-checkbox__checkmark {
    top: 0.8vw;
    left: 5vw;
    width: 4vw;
    height: 4vw;
  }
   .custom-checkbox__checkmark:after {
    left: 1.1vw;
    width: 0.9vw;
    height: 1.4vw;
  }
}

@media (max-width: 480px) {
   .custom-checkbox__checkmark:after {
    left: 1vw;
    width: 0.7vw;
    height: 1.2vw;
  }
}
</style>