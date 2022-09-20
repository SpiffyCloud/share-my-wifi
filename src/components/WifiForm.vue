<script setup>
import { ref } from 'vue';

// const name = ref('')
// const password = ref('')

const props = defineProps([
  'wifiInfo'
])

const emit = defineEmits([
  'add-wifi-info'
])

function save() {
  emit('add-wifi-info', wifiInfo.value)
}
</script>

<template>
  <p>Enter your wifi credentials for easy sharing</p>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name"
      :value="wifiInfo.name">
  </div>
  <div>
    <label for="password">Password</label>
    <input type="text" name="password" id="password"
      :value="wifiInfo.password">
  </div>
  <div>
    <button @click="save">Save</button>
  </div>
</template>

<style>
input {
  background: none;
  border: none;
  border-bottom: 2px solid var(--vt-c-white-mute);
  color: inherit;
}
</style>
