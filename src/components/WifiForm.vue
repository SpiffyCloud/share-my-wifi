<script setup>
const props = defineProps(['credentials'])
const emit = defineEmits(['add'])
</script>

<template>
  <p>Enter your wifi credentials for easy sharing</p>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name"
      v-model="credentials.name">
  </div>
  <div>
    <label for="password">Password</label>
    <input type="text" name="password" id="password"
      v-model="credentials.password">
  </div>
  <div>
    <button @click="emit('add')">Save</button>
  </div>
</template>

<style>

</style>
