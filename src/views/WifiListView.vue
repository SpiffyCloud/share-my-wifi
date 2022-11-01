<script setup>
import SwipeArea from '@/components/SwipeArea.vue'

const wifis = [0, 1, 2, 'test', 'star wars', 5]
</script>

<template>
  <h1>The List of Wifis</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Amet laboriosam vero doloribus dignissimos
    consectetur esse voluptas officiis nemo sequi ipsum.
    Dolorum molestiae unde quidem quam, incidunt ea at quo
    est!</p>
  <ul>
    <li v-for="(wifi, index) in wifis" :key="index">{{ wifi
    }}</li>
  </ul>
  <SwipeArea placement="left" />
</template>