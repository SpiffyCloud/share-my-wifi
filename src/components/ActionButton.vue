<script setup>
const props = defineProps(['type', 'disabled'])
const emit = defineEmits(['click'])
const buttonTheme = 'button__' + props.type
</script>

<template>
  <button class="button" :class="buttonTheme" @click="emit('click')" :disabled="disabled">
    <slot>&#9786; action</slot>
  </button>
</template>

<style>
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
  padding: .75rem 1.5rem;
  margin: 0 auto;
  margin-top: 1.75rem;
  border-radius: 2rem;
  border: none;
  font-size: var(--font-size-buttons);
  font-weight: var(--font-weight-medium);
}

.button:disabled {
  opacity: 56%;
  pointer-events: none;
}

.button__submit {
  color: var(--color-button-submit-text);
  background-color: var(--color-button-submit-background);
  /* overrides default gray overlay on touchstart */
  -webkit-tap-highlight-color: var(--color-button-submit-background-pressed);
}

.button__submit:hover,
.button__submit:active {
  background-color: var(--color-button-submit-background-pressed);
}

.button__submit:focus {
  outline: none;
  box-shadow: 0 0 0 .15rem var(--color-button-submit-text);
}

.button__delete {
  color: var(--color-button-delete-text);
  background: none;
  /* overrides default gray overlay on touchstart */
  -webkit-tap-highlight-color: var(--color-button-delete-background-pressed);
}

/* solves sticky problem on touch devices */
@media (hover: hover) {
  .button__delete:hover {
    background-color: var(--color-button-delete-background-pressed);
  }
}

.button__delete:focus {
  outline: none;
  box-shadow: 0 0 0 .15rem var(--color-button-delete-text);
}

.button svg {
  fill: currentColor;
  width: var(--font-size-buttons);
  height: var(--font-size-buttons);
}
</style>
