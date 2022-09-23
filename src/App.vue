<script setup>
import { ref } from 'vue';

import WifiForm from './components/WifiForm.vue';
import WifiQR from './components/WifiQR.vue';
import Logo from './components/Logo.vue';

const credentials = ref({ name: '', password: '', updated: null })
const showForm = ref(true)

function hideForm(updated) {
  if (updated) {
    const date = new Date()
    credentials.value.updated = date.toLocaleString('en', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }
  showForm.value = false
}

function editCredentials() {
  showForm.value = true
}

function deleteCredentials() {
  credentials.value.name = ''
  credentials.value.password = ''
  credentials.value.updated = null
  editCredentials()
}
</script>

<template>
  <Logo />
  <WifiForm v-if="showForm" :credentials="credentials"
    @update="hideForm" />
  <WifiQR v-else :credentials="credentials"
    @edit="editCredentials" @delete="deleteCredentials" />
</template>

<style>
  .instructions {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-light);
  }
</style>
