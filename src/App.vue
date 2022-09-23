<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { Preferences } from '@capacitor/preferences';

import WifiForm from './components/WifiForm.vue';
import WifiQR from './components/WifiQR.vue';
import Logo from './components/Logo.vue';

const credentials = ref({ name: '', password: '', updated: null })
const showForm = ref(null)

onMounted(() => {
  loadCredentials()
})

async function loadCredentials() {
  const { value } = await Preferences.get({ key: 'credentials' })
  if (value) {
    credentials.value = JSON.parse(value)
    showForm.value = false
  } else {
    showForm.value = true
  }
}

async function saveCredentials() {
  await Preferences.set({ key: 'credentials', value: JSON.stringify(credentials.value) })
}

async function deleteCredentials() {
  await Preferences.remove({ key: 'credentials' })
}

function hideForm(updated) {
  if (updated) {
    const date = new Date()
    credentials.value.updated = date.toLocaleString('en', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
    saveCredentials()
  }
  showForm.value = false
}

function editCredentials() {
  showForm.value = true
}

function removeCredentials() {
  credentials.value = { name: '', password: '', updated: null }
  showForm.value = true
  deleteCredentials()
}
</script>

<template>
  <Logo />
  <WifiForm v-if="showForm" :credentials="credentials" @update="hideForm" />
  <WifiQR v-else :credentials="credentials" @edit="editCredentials" @delete="removeCredentials" />
</template>

<style>
.instructions {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-light);
}
</style>
