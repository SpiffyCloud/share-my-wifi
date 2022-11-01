<script setup>
import { reactive } from 'vue';
import IconWifi from './icons/IconWifi.vue';

const props = defineProps(['text', 'left', 'top'])

const svgPlacement = reactive({
  left: `${props.left}rem`,
  top: `${props.top}rem`
})
</script>

<template>
  <div class="logo">
    <IconWifi :style="svgPlacement" />
    <h2 class="logo__text">{{ text }}</h2>
  </div>
</template>

<style>
.logo {
  position: static;
  margin: 0 auto;
  padding-top: 1.75rem;
}

.logo__text {
  font-size: 1.75rem;
  margin: 0;
}

.logo svg {
  position: relative;
  fill: currentColor;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
