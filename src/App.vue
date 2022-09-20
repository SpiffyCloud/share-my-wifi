<script setup>
import { ref } from 'vue';
import WifiForm from './components/WifiForm.vue';
import WifiQR from './components/WifiQR.vue';

const credentials = ref({ name: '', password: '' })
const showForm = ref(true)

function hideForm() {
  showForm.value = false
}

function editCredentials() {
  showForm.value = true
}

function deleteCredentials() {
  credentials.value.name = ''
  credentials.value.password = ''
  editCredentials()
}
</script>

<template>
  <h1>Share My Wifi</h1>
  <WifiForm v-if="showForm" :credentials="credentials"
    @add="hideForm" />
  <WifiQR v-else :credentials="credentials"
    @edit="editCredentials" @delete="deleteCredentials" />
</template>

<style>

</style>
