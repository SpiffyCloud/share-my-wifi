<script setup>
const props = defineProps(['type'])
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')" :class="type">
    <slot>&#9786; action</slot>
  </button>
</template>

<style>
button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
  padding: .75rem 1.5rem;
  margin: 0 auto;
  border-radius: 2rem;
  border: none;
  font-size: var(--font-size-buttons);
  font-weight: var(--font-weight-medium);
}

.submit {
  color: var(--color-button-submit-text);
  background-color: var(--color-button-submit-background);

}

.submit:hover,
.submit:active {
  background-color: var(--color-button-submit-background-pressed);
}

.delete {
  color: var(--color-button-delete-text);
  background: none;
}

.delete:hover,
.delete:active {
  background-color: var(--color-button-delete-background-pressed);
}

svg {
  fill: currentColor;
  width: var(--font-size-buttons);
  height: var(--font-size-buttons);
}
</style>
