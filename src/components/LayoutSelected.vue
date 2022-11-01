<script setup>
import TextInstructions from './TextInstructions.vue';
import TextTitle from './TextTitle.vue';

const props = defineProps([
  'title',
  'instructions',
])
</script>

<template>
  <Transition mode="out-in">
    <TextInstructions :text="instructions"
      :key="instructions" />
  </Transition>
  <TextTitle :text="title" />
  <slot name="card"></slot>
  <slot name="button"></slot>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition-delay: .25s;
  transition: opacity 0.25s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
