<script setup>
import { ref } from 'vue';
import WifiForm from './components/WifiForm.vue';
import WifiQR from './components/WifiQR.vue';

const wifiInfo = ref(null)
const editWifiInfo = ref(false)

function showQR(wifi) {
  wifiInfo.value = wifi
}

function showFilledForm() {
  editWifiInfo.value = true
}

function deleteQR() {
  wifiInfo.value = null
}

</script>

<template>
  <h1>Share My Wifi</h1>
  <WifiForm v-if="!wifiInfo" @add-wifi-info="showQR" />
  <WifiForm v-else-if="editWifiInfo" :wifiInfo="wifiInfo"
    @add-wifi-info="showQR" />
  <WifiQR v-else :wifiInfo="wifiInfo" @edit="showFilledForm"
    @delete="deleteQR" />
</template>

<style>

</style>
