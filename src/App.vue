<script setup>
import { ref, onMounted, computed } from 'vue'
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
const credentials = ref(null)
const showForm = ref(null)

onMounted(() => {
  loadCredentials()
})

async function loadCredentials() {
  const { value } = await Preferences.get({ key: 'credentials' })
  if (value) {
    credentials.value = JSON.parse(value)
  } else {
    credentials.value = { name: '', password: '', saved: 'no' }
    showForm.value = true
  }
  dataLoaded.value = true
}

async function saveCredentials() {
  await Preferences.set({ key: 'credentials', value: JSON.stringify(credentials.value) })
}

async function deleteCredentials() {
  await Preferences.remove({ key: 'credentials' })
}

function hideForm() {
  saveCredentials()
  credentials.value.saved = 'yes'
  showForm.value = false
}

function resetStatus() {
  deleteCredentials()
  credentials.value = { name: '', password: '', saved: 'no' }
  showForm.value = true
}

function isValidSSID(input) {
  return /^[^!#;+\]/"\t][^+\]/"\t]{1,31}$/.test(input)
}

function isValidPassword(input) {
  return input >= 4
}

const noCredentials = computed(() => {
  return credentials.value.saved === 'no'
})

const title = computed(() => {
  return noCredentials.value ? '' : credentials.value.name
})

const instructions = computed(() => {
  if (showForm.value) {
    return `${noCredentials.value ? 'Add' : 'Update'} your wifi credentials ${noCredentials.value ? 'for easy sharing' : ''}`
  } else {
    return 'Share your wifi with others by having them scan this QR code'
  }
})

const invalidCredentials = computed(() => {
  // TODO: error messages
  return !(isValidSSID(credentials.value.name) && isValidPassword(credentials.value.password.length))
})

const qr = computed(() => {
  const { name, password } = credentials.value
  return `WIFI:T:WPA;S:${name};P:${password};;`
})
</script>

<template>
  <Logo />
  <LayoutSelected v-if="dataLoaded" :title="title"
    :instructions="instructions">
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
          <qrCode :value="qr" :render-as="'svg'" :margin="0"
            :background="'none'" class="foreground" />
        </template>
      </Card>
    </template>
    <template v-slot:button>
      <ActionButton v-if="showForm" :type="'submit'"
        :disabled="invalidCredentials" @click="hideForm">
        <IconPlus v-if="noCredentials" />
        <IconCheck v-else />
        <span>{{ noCredentials ? 'Add' : 'Done' }}</span>
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
