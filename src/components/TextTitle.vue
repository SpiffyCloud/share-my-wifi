<script setup>
const props = defineProps(['text'])
</script>

<template>
  <div class="container__title">
    <p class="title">{{ text }}</p>
  </div>
</template>

<style>
.container__title {
  min-height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}

.title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-medium);
  margin: 0;
}
</style>
