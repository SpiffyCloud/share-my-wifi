<script setup>
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import ActionButton from './ActionButton.vue';
import IconTrash from './icons/IconTrash.vue';
import Card from './Card.vue';

const props = defineProps(['credentials'])
const emit = defineEmits(['edit', 'delete'])

const qrCode = computed(() => {
  const { name, password } = props.credentials
  return `WIFI:S:${name};;P:${password};;`
})

const qrColor = computed(() => {
  return getComputedStyle(document.body).getPropertyValue('--color-text')
})
</script>

<template>
  <p class="instructions">Share your wifi with others by
    having them scan this QR code</p>
  <h1 class="title">{{ credentials.name }}</h1>
  <Card @click="emit('edit')">
    <QrcodeVue :value="qrCode" :render-as="'svg'" class="qr"
      :background="'none'" :foreground="qrColor" />
  </Card>
  <p class="timestamp">Last Updated: {{ credentials.updated
  }}</p>
  <ActionButton :type="'delete'" @click="emit('delete')">
    <IconTrash />
    <span>Delete</span>
  </ActionButton>
</template>

<style>
.qr {
  border-radius: 1.5rem;
  color: var(--color-text);

}
.title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-medium);
}

.timestamp {
  font-size: var(--font-size-tiny);
}
</style>