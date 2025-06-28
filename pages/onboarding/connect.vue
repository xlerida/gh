<script setup>
import axios from 'axios';

const RETRY_ERROR = 'Please wait 30 seconds before resending.';

const email = ref('');
const errorMessage = ref('');
const errorCountdown = ref(0);
const offers = ref(true);
const isLoading = ref(false);
const isPrimaryButtonDisabled = ref(false);

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
      console.log('Email sent successfully, please verify on next step');
    }
    
  } catch (error) {
    isLoading.value = false;

    if (error.response?.data?.error === RETRY_ERROR) {
      errorMessage.value = RETRY_ERROR;
    }

    errorMessage.value =
      error.response?.data?.error || 'Something went wrong. Please try again.';
  }
};
</script>

<template>
    <main>
      <section>
        <h1>Connect Your Account</h1>
        <h2>...and unlock your benefits!</h2>

        <form @submit.prevent="handleFormSubmit">
          <OnboardingEmailInput v-model="email" :errorMessage="errorMessage" />
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
          <OnboardingBenefitsList />
        </div>
        <p>
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
  width: 79%;
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
  top: 0;
  left: 80px;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: var(--size-1) solid #ccc;
  border-radius: 4px;
  transition: all 0.3s;
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
  left: 6px;
  top: var(--size-1);
  width: 6px;
  height: 10px;
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
</style>