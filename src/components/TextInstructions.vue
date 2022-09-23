<script setup>
const props = defineProps(['text'])
</script>

<template>
  <div class="container__instructions">
    <p class="instructions">{{ text }}</p>
  </div>
</template>

<style>
.container__instructions {
  min-height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
}

.instructions {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-light);
  margin: 0;
}
</style>
