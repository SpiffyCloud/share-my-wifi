<script setup>
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import ActionButton from './ActionButton.vue';
import IconTrash from './icons/IconTrash.vue';

const props = defineProps(['credentials'])
const emit = defineEmits(['edit', 'delete'])

const qrCode = computed(() => {
  const { name, password } = props.credentials
  return `WIFI:S:${name};;P:${password};;`
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

  <button @click="emit('edit')">Edit</button>
  <ActionButton :type="'delete'" @click="emit('delete')">
    <IconTrash />
    <span>Delete</span>
  </ActionButton>
</template>

<style>

</style>