<script setup>
import { computed } from 'vue';
const props = defineProps(['credentials'])
const emit = defineEmits(['add', 'cancel'])

const { name, password } = props.credentials


const hasCredentials = computed(() => {
  return props.credentials.updated !== null
})

const credentialsUpdated = computed(() => {
  if (name !== props.credentials.name ||
    password !== props.credentials.password) {
    return true
  } else return false
})
</script>

<template>
  <p>Add your wifi credentials for easy sharing</p>
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
    <button @click="emit('add', credentialsUpdated)">{{
    hasCredentials ?
    'Done' : 'Add'}}</button>
  </div>
</template>

<style>

</style>
