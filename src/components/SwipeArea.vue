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
  background-color: aliceblue;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 5.5rem;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>