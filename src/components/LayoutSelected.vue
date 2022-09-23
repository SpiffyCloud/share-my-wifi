<script setup>
import TextInstructions from './TextInstructions.vue';
import TextTitle from './TextTitle.vue';

const props = defineProps([
  'title',
  'instructions',
  'timestamp',
  'show'
])
</script>

<template>
  <TextInstructions :text="instructions" />
  <TextTitle :text="title" />
  <slot name="card"></slot>
  <p v-if="show" class="timestamp">
    Last Updated: {{ timestamp }}
  </p>
  <slot name="button"></slot>
</template>

<style>
.timestamp {
  font-size: var(--font-size-tiny);
  margin: 0;
}
</style>
