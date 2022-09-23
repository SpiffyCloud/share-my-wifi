<script setup>
import IconWifi from './icons/IconWifi.vue';
</script>

<template>
  <div class="logo">
    <IconWifi />
    <h2 class="logo__text">Share My WiFi</h2>
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
  left: 4.36rem;
  top: 1.14rem;
  fill: currentColor;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
