import { defineStore } from 'pinia';

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    steps: ['connect', 'verify', 'plan', 'success'],
    currentStep: 'connect',
    email: '',
  }),
  actions: {
    setEmail(email) {
      this.email = email;
    },
    nextStep() {
      const currentIndex = this.steps.indexOf(this.currentStep);
      if (currentIndex < this.steps.length - 1) {
        this.currentStep = this.steps[currentIndex + 1];
      }
    },
    previousStep() {
      const currentIndex = this.steps.indexOf(this.currentStep);
      if (currentIndex > 0) {
        this.currentStep = this.steps[currentIndex - 1];
      }
    },
    resetSteps() {
      this.currentStep = 'connect';
    },
  },
});
