<script setup>
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import ActionButton from './ActionButton.vue';
import IconTrash from './icons/IconTrash.vue';
import Card from './Card.vue';
import TextInstructions from './TextInstructions.vue';
import TextTitle from './TextTitle.vue';

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
  <TextInstructions
    :text="'Share your wifi with others by having them scan this QR code'" />
  <TextTitle :text="credentials.name" />
  <Transition>
    <Card @click="emit('edit')">
      <QrcodeVue :value="qrCode" :render-as="'svg'"
        class="qr" :margin="0" :background="'none'"
        :foreground="qrColor" />
    </Card>
  </Transition>
  <p class="timestamp">
    Last Updated: {{ props.credentials.updated }}
  </p>
  <ActionButton :type="'delete'" @click="emit('delete')">
    <IconTrash />
    <span>Delete</span>
  </ActionButton>
</template>

<style>
.qr {
  color: var(--color-text);
}

.timestamp {
  font-size: var(--font-size-tiny);
  margin: 0;
}
</style>