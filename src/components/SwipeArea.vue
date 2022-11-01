<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
const props = defineProps(['placement'])

const target = computed(() => {
  return props.placement === 'left' ? 'WiFiDetails' : 'WiFiList'
})

</script>

<template>
  <RouterLink :to="{ name: target }">
    <div class="swipe-area" :class="placement"></div>
  </RouterLink>
</template>

<style>
.swipe-area {
  background-color: var(--color-text); /* will remove */
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 25%;
  opacity: 5%; /* will remove */
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>