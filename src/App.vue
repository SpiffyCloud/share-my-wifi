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
      wifiInfo: {},
      editWifiInfo: true
    }
  },
  methods: {
    showQR(wifiInfo) {
      this.wifiInfo = wifiInfo
      this.editWifiInfo = false
    },
    showForm() {
      this.editWifiInfo = true
    },
    deleteQR() {
      this.wifiInfo = {}
      this.showForm()
    }
  }
}
</script>

<template>
  <h1>Share My Wifi</h1>
  <WifiForm v-if="editWifiInfo" :wifiInfo="wifiInfo"
    @save-wifi-info="showQR" />
  <WifiQR v-else :wifiInfo="wifiInfo"
    @edit-wifi-info="showForm"
    @delete-wifi-info="deleteQR" />
</template>

<style>

</style>
