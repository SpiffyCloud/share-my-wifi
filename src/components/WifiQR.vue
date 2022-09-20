<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  props: ['wifiInfo'],
  emits: ['edit-wifi-info', 'delete-wifi-info'],
  computed: {
    getWifiQRCode() {
      const { name, password } = this.wifiInfo
      return `WIFI:S:${name};;P:${password};;`
    }
  },
  methods: {
    editWifiInfo() {
      this.$emit('edit-wifi-info')
    },
    deleteWifiInfo() {
      this.$emit('delete-wifi-info')
    }
  }
}
</script>

<template>
  <h2>{{ wifiInfo.name }}</h2>
  <div class="qr">
    <qrcode-vue :value="getWifiQRCode" :margin="1"
      :size="200" />
  </div>

  <button @click="editWifiInfo">Edit</button>
  <button>Share</button>
  <button @click="deleteWifiInfo">Delete</button>
</template>

<style>
.qr {
  background-color: white;
  color: black;
  width: 15rem;
  height: 15rem;
}
</style>