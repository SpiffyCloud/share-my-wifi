<script setup>
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = defineProps(['credentials'])
const emits = defineEmits(['edit', 'delete'])

const qrCode = computed(() => {
  const { name, password } = props.credentials
  return `WIFI:S:${name};T:WPA;P:${password};;`
})
</script>

<template>
  <p>Share your wifi with others by having them scan this QR
    code.</p>
  <h2>{{ credentials.name }}</h2>
  <div>
    <QrcodeVue :value="qrCode" :margin="1" />
  </div>
  <p>Last Updated: {{ credentials.updated }}</p>

  <button @click="emits('edit')">Edit</button>
  <button @click="emits('delete')">Delete</button>
</template>

<style>

</style>