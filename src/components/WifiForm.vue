<script setup>
import { computed, ref } from 'vue'
import ActionButton from './ActionButton.vue'
import IconPlus from './icons/IconPlus.vue'
import IconCheck from './icons/IconCheck.vue'
import Card from './Card.vue';
import InputField from './InputField.vue';

const props = defineProps(['credentials'])
const emit = defineEmits(['update'])

const { name, password } = props.credentials

const isValidSSID = (str) => {
  return /^[^!#;+\]/"\t][^+\]/"\t]{1,31}$/.test(str)
}

const isInvalid = computed(() => {
  const name = props.credentials.name
  const password = props.credentials.password
  if (isValidSSID(name) && password.length > 4) {
    return false
  } else {
    return true
  }
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
  <p class="instructions">{{ hasCredentials ? 'Update' :
  'Add' }} your wifi credentials
    <span v-if="!hasCredentials">
      for easy sharing
    </span>
  </p>
  <Card>
    <InputField :group="'name'" :type="'text'"
      :model="credentials.name" :placeholder="'My WiFi'"
      @input="e => credentials.name = e.target.value" />
    <InputField :group="'password'" :type="'text'"
      :placeholder="'password123'"
      :model="credentials.password"
      @input="e => credentials.password = e.target.value" />
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
