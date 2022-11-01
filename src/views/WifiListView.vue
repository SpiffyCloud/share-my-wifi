<script setup>
import SwipeArea from '@/components/SwipeArea.vue'
import TextInstructions from '@/components/TextInstructions.vue';
import Logo from '@/components/Logo.vue';

const wifis = [0, 1, 2, 'test', 'star wars', 5]
</script>

<template>
  <div class="container">
    <Logo text="My WiFis" left="2.67" top="1.14" />
    <TextInstructions
      text="Manage and prioritize your credentials" />
    <ul>
      <li v-for="(wifi, index) in wifis" :key="index">{{
          wifi
      }}</li>
    </ul>
  </div>
  <SwipeArea placement="left" />
</template>

<style>
.container {
  min-height: 100vh;
}
</style>