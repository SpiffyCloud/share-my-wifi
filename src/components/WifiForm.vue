<script setup>
import { computed } from 'vue'
import ActionButton from './ActionButton.vue'
import IconPlus from './icons/IconPlus.vue'
import IconCheck from './icons/IconCheck.vue'
import Card from './Card.vue';

const props = defineProps(['credentials'])
const emit = defineEmits(['update'])

const { name, password } = props.credentials

const isInvalid = computed(() => {
  // temp need to have input validation
  return false
})

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
  <p class="instructions">Add your wifi credentials for easy
    sharing</p>

  <Card>
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
  </Card>
  <div>
    <ActionButton :type="'submit'" :disabled="isInvalid"
      @click="emit('update', credentialsUpdated)">
      <IconPlus v-if="!hasCredentials" />
      <IconCheck v-else />
      <span>{{ hasCredentials ? 'Done' : 'Add' }}</span>
    </ActionButton>
  </div>
</template>

<style>

</style>
