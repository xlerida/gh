<script setup></script>

<template>
  <main>
    <div>
      <h1>Congrats! You're now a <span>subscriber</span>!</h1>
      <h2>Explore your membership now.</h2>
    </div>
    <div class="congrats-circle">
      <img src="~/assets/images/stars.svg" />
    </div>
    <img class="congrats-confetti" src="~/assets/images/confetti.svg" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 72px;
}
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

h1 {
  font-size: 48px;
}

h2 {
  font-weight: 400;
}

span {
  color: var(--background-button-secondary);
}

.congrats-circle {
  width: 300px;
  height: 300px;
  border-radius: 300px;
  background-color: var(--background-congrats-circle);
}

.congrats-confetti {
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>