// ~/middleware/urlBlocker.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side
  if (process.server) return;
  
  // Allow if coming from another route in the app
  if (from.name) return;
  
  // Allow access to home page
  if (to.path === '/') return;
  
  // Redirect to home for direct access to other pages
  return navigateTo('/');
});