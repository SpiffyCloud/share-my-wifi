<script setup>
import { ref } from 'vue'
const props = defineProps(['group', 'type', 'placeholder', 'model'])
const emit = defineEmits(['input'])
</script>

<template>
  <div class="input">
    <label class="input__label" :for="group">
      {{ group }}
    </label>
    <input :type="type" :name="group" :id="group"
      :placeholder="placeholder" :value="model"
      @input="e => emit('input', e)">
  </div>
</template>

<style>
.input input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem .5rem;
  border: none;
  border-radius: 1rem;
  text-align: center;
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-regular);
  color: inherit;
  background-color: var(--color-input-background);
}

.input input:hover,
.input input:active {
  background-color: var(--color-input-background-pressed);
}

.input input:focus {
  outline: .15rem solid var(--color-text);
}

.input__label {
  display: block;
  margin: .5rem;
  text-align: left;
  text-transform: capitalize;
  font-size: var(--font-size-small);
}

.input__error {
  color: var(--color-button-delete-text);
  text-align: left;
  margin: .5rem;
  font-size: var(--font-size-tiny);
}
</style>