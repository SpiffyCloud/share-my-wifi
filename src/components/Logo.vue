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
}

.logo__text {
  font-size: 1.75rem;
  margin-bottom: 0;
}

.logo svg {
  position: relative;
  left: 4.35rem;
  top: 2.55rem;
  fill: currentColor;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
