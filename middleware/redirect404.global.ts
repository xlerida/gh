// middleware/redirectOn404.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (!to.matched.length) {
    // Redirect to `/onboarding/connect` if the route doesn't exist
    return navigateTo('/onboarding/connect');
  }
});
