<script setup>

</script>

<template>
    <main>
      
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
      <section>
        <h1>Connect Your Account</h1>
        <h2>...and unlock your benefits!</h2>

        <form>
          <OnboardingEmailInput />
          <div>
            <label>
              <input type="checkbox" class="custom-checkbox__input">
              <span class="custom-checkbox__checkmark"></span>
              <span class="custom-checkbox__label">Send Me Offers, News and Fun Stuff!</span>
            </label>
            <OnboardingPrimaryButton text="Connect" />
          </div>
        </form>
        
      </section>
      </main>
</template>

<style scoped>
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
  padding: var(--size-5);
  font-size: 14px;
}

section:first-child div {
  position: relative;
  top: var(--size-9);
}

h1 {
  font-size: var(--size-9);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--size-3);
}

h2 {
  font-size: var(--size-6);
  font-weight: var(--font-weight-regular);
  margin-bottom: var(--size-8);
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
  left: 88px;
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