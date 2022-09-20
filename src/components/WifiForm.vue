<script>
export default {
  props: ['wifiInfo'],
  emits: ['save-wifi-info'],
  data() {
    return {
      name: this.wifiInfo.name ? this.wifiInfo.name : '',
      password: this.wifiInfo.password ? this.wifiInfo.password : ''
    }
  },
  methods: {
    saveWifiInfo() {
      this.$emit('save-wifi-info', {
        name: this.name,
        password: this.password
      })
    }
  }
}
</script>

<template>
  <p>Enter your wifi credentials for easy sharing</p>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" v-model="name">
  </div>
  <div>
    <label for="password">Password</label>
    <input type="text" name="password" id="password"
      v-model="password">
  </div>
  <div>
    <button @click="saveWifiInfo">Save</button>
  </div>
</template>

<style>
input {
  background: none;
  border: none;
  border-bottom: 2px solid var(--vt-c-white-mute);
  color: inherit;
}
</style>
