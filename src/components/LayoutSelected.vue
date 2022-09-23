<script setup>
import TextInstructions from './TextInstructions.vue';
import TextTitle from './TextTitle.vue';

const props = defineProps([
  'title',
  'instructions',
  'timestamp',
  'showTimestamp'
])
</script>

<template>
  <Transition mode="out-in">
    <TextInstructions :text="instructions"
      :key="instructions" />
  </Transition>
  <TextTitle :text="title" />
  <slot name="card"></slot>
  <p class="timestamp">
    <Transition>
      <span v-if="showTimestamp">Last Updated: {{ timestamp
      }}</span>
    </Transition>
  </p>
  <slot name="button"></slot>
</template>

<style>
.timestamp {
  font-size: var(--font-size-tiny);
  margin: 0;
  height: 1rem;
}

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
