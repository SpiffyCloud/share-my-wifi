<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import Logo from './components/Logo.vue';
import Card from './components/Card.vue';
import qrCode from 'qrcode.vue';
import InputField from './components/InputField.vue';
import ActionButton from './components/ActionButton.vue';
import IconPlus from './components/icons/IconPlus.vue';
import IconCheck from './components/icons/IconCheck.vue';
import IconTrash from './components/icons/IconTrash.vue';
import LayoutSelected from './components/LayoutSelected.vue';

// data related
const credentials = ref({ name: '', password: '', updated: null })
const currentCredentials = { name: '', password: '' }

const deleteCredentials = () => {
  credentials.value.name = ''
  credentials.value.password = ''
  credentials.value.updated = null
  currentCredentials.name = ''
  currentCredentials.password = ''
  editCredentials()
}

const qr = computed(() => {
  const { name, password } = credentials.value
  return `WIFI:S:${name};;P:${password};;`
})

const credentialsUpdated = computed(() => {
  if (currentCredentials.name !== credentials.value.name ||
    currentCredentials.password !== credentials.value.password) {
    return true
  } else return false
})

// card flipping
const showForm = ref(true)

const editCredentials = () => {
  showForm.value = true
}

const hideForm = () => {
  // determine if timestamp should be updated
  if (credentialsUpdated) {
    const date = new Date()
    credentials.value.updated = date.toLocaleString('en', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }
  showForm.value = false
  // store new credential values
  currentCredentials.name = credentials.value.name
  currentCredentials.password = credentials.value.password
}

// form validation TODO: error messages
const isValidSSID = (str) => {
  return /^[^!#;+\]/"\t][^+\]/"\t]{1,31}$/.test(str)
}

const valid = computed(() => {
  const { name, password } = credentials.value
  if (isValidSSID(name) && password.length > 4) {
    return true
  } else return false
})

// layout and styling data
const hasCredentials = computed(() => {
  return credentials.value.updated !== null
})

const instructions = computed(() => {
  if (showForm.value) {
    return `${hasCredentials.value ? 'Update' : 'Add'} your wifi credentials ${hasCredentials.value ? '' : 'for easy sharing'}`
  } else {
    return 'Share your wifi with others by having them scan this QR code'
  }
})

const title = computed(() => {
  return hasCredentials.value ? credentials.value.name : ''
})

const timestamp = computed(() => {
  return hasCredentials.value ? credentials.value.updated : ''
})
</script>

<template>
  <Logo />
  <LayoutSelected :title="title"
    :instructions="instructions" :timestamp="timestamp"
    :showTimestamp="!showForm">
    <template v-slot:card>
      <Card :back="!showForm" @click="editCredentials">
        <template v-slot:front>
          <InputField :group="'name'" :type="'text'"
            :placeholder="'My WiFi'"
            v-model="credentials.name" />
          <InputField :group="'password'" :type="'text'"
            :placeholder="'password123'"
            v-model="credentials.password" />
        </template>
        <template v-slot:back>
          <qrCode :value="qr" :render-as="'svg'" :margin="0"
            :background="'none'" class="foreground" />
        </template>
      </Card>
    </template>
    <template v-slot:button>
      <ActionButton v-if="showForm" :type="'submit'"
        :disabled="!valid" @click="hideForm">
        <IconCheck v-if="hasCredentials" />
        <IconPlus v-else />
        <span>{{ hasCredentials ? 'Done' : 'Add' }}</span>
      </ActionButton>
      <ActionButton v-else :type="'delete'"
        @click="deleteCredentials">
        <IconTrash />
        <span>Delete</span>
      </ActionButton>
    </template>
  </LayoutSelected>
</template>

<style>
.foreground path:last-child {
  fill: var(--color-text)
}
</style>
