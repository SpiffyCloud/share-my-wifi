<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
const props = defineProps(['placement'])

const target = computed(() => {
  let target
  if (props.placement === 'left') {
    target = {
      name: 'WiFiDetails',
      params: { index: 0 }
    }
  } else {
    target = {
      name: 'WiFiList'
    }
  }
  return target
})

</script>

<template>
  <RouterLink :to="target">
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
  opacity: 1%; /* will remove */
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>