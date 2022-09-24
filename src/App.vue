<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import { Preferences } from '@capacitor/preferences';
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
const dataLoaded = ref(false)
const credentials = ref({ name: '', password: '', updated: null })
const showForm = ref(null)

onMounted(() => {
  loadCredentials()
})

async function loadCredentials() {
  const { value } = await Preferences.get({ key: 'credentials' })
  if (value) {
    credentials.value = JSON.parse(value)
  }
  showForm.value = !hasCredentials()
  dataLoaded.value = true
}

async function saveCredentials() {
  await Preferences.set({ key: 'credentials', value: JSON.stringify(credentials.value) })
}

async function deleteCredentials() {
  await Preferences.remove({ key: 'credentials' })
}

function hasCredentials() {
  return credentials.value.name !== ''
}

function hideForm() {
  // determine if timestamp should be updated
  if (true) {
    const date = new Date()
    credentials.value.updated = date.toLocaleString('en', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
    saveCredentials()
  }
  showForm.value = false
  // store new credential values
  // currentCredentials.name = credentials.value.name
  // currentCredentials.password = credentials.value.password
}

function isValidSSID(str) {
  return /^[^!#;+\]/"\t][^+\]/"\t]{1,31}$/.test(str)
}

function resetStatus() {
  deleteCredentials()
  credentials.value = { name: '', password: '', updated: null }
  showForm.value = true
}

const instructions = computed(() => {
  if (showForm.value) {
    return `${hasCredentials() ? 'Update' : 'Add'} your wifi credentials ${hasCredentials() ? '' : 'for easy sharing'}`
  } else {
    return 'Share your wifi with others by having them scan this QR code'
  }
})

const qr = computed(() => {
  if (hasCredentials) {
    const { name, password } = credentials.value
    return `WIFI:S:${name};;P:${password};;`
  } else return ''
})

// const credentialsUpdated = computed(() => {
//   if (currentCredentials.name !== credentials.value.name ||
//     currentCredentials.password !== credentials.value.password) {
//     return true
//   } else return false
// })

// TODO: error messages
const areCredentialsValid = computed(() => {
  const { name, password } = credentials.value
  return (isValidSSID(name) && password.length > 4)
})
</script>

<template>
  <Logo />
  <LayoutSelected v-if="dataLoaded"
    :title="credentials.name" :instructions="instructions"
    :showTimestamp="!showForm"
    :timestamp="credentials.updated">
    <template v-slot:card>
      <Card :back="!showForm" @click="showForm = true">
        <template v-slot:front>
          <InputField :group="'name'" :type="'text'"
            :placeholder="'My WiFi'"
            v-model="credentials.name" />
          <InputField :group="'password'" :type="'text'"
            :placeholder="'password123'"
            v-model="credentials.password" />
        </template>
        <template v-slot:back>
          <qrCode v-if="hasCredentials" :value="qr"
            :render-as="'svg'" :margin="0"
            :background="'none'"
            :class="{ foreground: !showForm, none: showForm }" />
        </template>
      </Card>
    </template>
    <template v-slot:button>
      <ActionButton v-if="showForm" :type="'submit'"
        :disabled="!areCredentialsValid" @click="hideForm">
        <IconCheck v-if="hasCredentials" />
        <IconPlus v-else />
        <span>{{ hasCredentials ? 'Done' : 'Add' }}</span>
      </ActionButton>
      <ActionButton v-else :type="'delete'"
        @click="resetStatus">
        <IconTrash />
        <span>Delete</span>
      </ActionButton>
    </template>
  </LayoutSelected>
</template>

<style>
.foreground path:last-child {
  fill: var(--color-text);
}

.none path:last-child {
  fill: var(--color-card-background);
}
</style>
