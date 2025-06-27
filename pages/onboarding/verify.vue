<script setup>
defineProps({
  email: {
    type: String,
    default: "johndoe@johndoe.com",
    required: true,
  },
});
</script>

<template>
  <OnboardingSecondaryButton class="onboarding-secondary-button" text="Modify email" variant="outlined" />
  <main>
    <section>
      <div>
        <OnboardingBenefitsList />
      </div>
    </section>
    <section>
      <h1>Get Verified!</h1>
      <h2>Enter the one-time code we sent to:</h2>
      <h3>johndoe@gmail.com</h3>
      <form>
        <OnboardingCodeInput />
        <div>
          <p>Didn't get an email? <span>Resend Code</span></p>
          <OnboardingPrimaryButton text="Verify" />
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
  padding: 24px;
}

main {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 50vh;
  text-align: center;
  gap: 98px;
  max-height: 500px;
  max-width: 1024px;
}

section:first-child {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 79%;
}

section:first-child p {
  padding: 18px;
  font-size: 14px;
}

section:first-child div {
  position: relative;
  top: 48px;
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
</style>