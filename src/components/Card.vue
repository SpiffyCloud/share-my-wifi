<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <div class="container__card">
    <div class="card" @click="emit('click')">
      <div class="card__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.container__card {
  width: 100%;
  max-width: 18rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.card {
  /* 1:1 aspect ratio */
  padding-top: 100%;
  position: relative;
  width: 100%;

  /* styling */
  border-radius: 1.5rem;
  background-color: var(--color-card-background);
  box-shadow:
    -3px -3px 0px 4px var(--color-card-shadow-light),
     8px 8px 0px var(--color-card-shadow-dark);
}

.card__content {
  /* 1:1 aspect ratio positioning */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  /* content positioning */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.card__content svg {
  /* grow with parent container */
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
