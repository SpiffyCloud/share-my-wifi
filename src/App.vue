<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { Preferences } from '@capacitor/preferences';

import WifiForm from './components/WifiForm.vue'
import WifiQR from './components/WifiQR.vue'

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
  <h1>Share My Wifi</h1>
  <WifiForm v-if="showForm" :credentials="credentials" @update="hideForm" />
  <WifiQR v-else :credentials="credentials" @edit="editCredentials" @delete="removeCredentials" />
</template>

<style>
label {
  font-size: var(--font-size-small);
  display: block;
  text-align: left;
}

input {
  font-size: var(--font-size-medium);
  width: 100%;
  border: none;
  border-radius: 1rem;
  padding: .5rem;
  display: block;
  box-sizing: border-box;
  text-align: center;
}

button {
  font-size: var(--font-size-buttons);
  padding: .5rem 2rem;
  border-radius: 2rem;
  border: none;
  display: block;
  margin: 0 auto;
}
</style>
