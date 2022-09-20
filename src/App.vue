<script>
import WifiForm from './components/WifiForm.vue'
import WifiQR from './components/WifiQR.vue'

export default {
  components: {
    WifiForm,
    WifiQR
  },
  data() {
    return {
      wifiInfo: null,
      editWifiInfo: false
    }
  },
  methods: {
    showQR(wifiInfo) {
      this.wifiInfo = wifiInfo
      this.editWifiInfo = false
    },
    showFilledForm() {
      this.editWifiInfo = true
    },
    deleteQR() {
      this.wifiInfo = null
    }
  }
}
</script>

<template>
  <h1>Share My Wifi</h1>
  <WifiForm v-if="!wifiInfo" @save-wifi-info="showQR" />
  <WifiForm v-else-if="editWifiInfo" :wifiInfo="wifiInfo" @save-wifi-info="showQR" />
  <WifiQR v-else :wifiInfo="wifiInfo" @edit-wifi-info="showFilledForm" @delete-wifi-info="deleteQR" />
</template>

<style>

</style>
