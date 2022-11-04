<script setup>
import { storeToRefs } from 'pinia'
import Logo from '@/components/Logo.vue';
import Card from '@/components/Card.vue';
import qrCode from 'qrcode.vue';
import InputField from '@/components/InputField.vue';
import ActionButton from '@/components/ActionButton.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import LayoutSelected from '@/components/LayoutSelected.vue';
import IconWifiNotFound from '@/components/icons/IconWifiNotFound.vue';
import SwipeArea from '@/components/SwipeArea.vue';
import { useCredentialsStore } from '@/stores/credentials'
import { useRouter } from 'vue-router';
import { computed } from 'vue'

const router = useRouter()
const credentialsStore = useCredentialsStore()
const { credentialsList, currentCredentials, qr, state } = storeToRefs(credentialsStore)
const { saveCurrentCredentials, updateCurrentCredentials, deleteCurrentCredentials } = credentialsStore

const props = defineProps(['index'])

function removeCurrentCredentials() {
  deleteCurrentCredentials()
  if (credentialsList.value.length === 0) {
    state.value = 'add'
  } else {
    router.push({ name: 'WiFiList' })
  }
}

function save() {
  if (state.value === 'add') {
    saveCurrentCredentials()
  } else {
    updateCurrentCredentials([props.index])
  }
  state.value = 'share'
}

const title = computed(() => {
  return state.value !== 'add' ? currentCredentials.value.title : ''
})

const instructions = computed(() => {
  const add = state.value === 'add'
  if (state.value !== 'share') {
    return `${add ? 'Add' : 'Update'} your wifi credentials ${add ? 'for easy sharing' : ''}`
  } else {
    return 'Share your wifi with others by having them scan this QR code'
  }
})

</script>

<template>
  <SwipeArea placement="right" />
  <Logo text="Share My WiFi" left="4.36" top="1.14" />
  <LayoutSelected v-if="currentCredentials" :title="title" :instructions="instructions">
    <template v-slot:card>
      <Card :back="state === 'share'" @click="state = 'edit'">
        <template v-slot:front>
          <InputField :group="'name'" :type="'text'" :placeholder="'My WiFi'" v-model="currentCredentials.title" />
          <InputField :group="'password'" :type="'text'" :placeholder="'password123'" v-model="currentCredentials.password" />
        </template>
        <template v-slot:back>
          <qrCode v-if="currentCredentials.title !== ''" :value="qr" :render-as="'svg'" :margin="0" :background="'none'" :foreground="'var(--color-text)'"
            :size="200" />
          <IconWifiNotFound v-else />
        </template>
      </Card>
    </template>
    <template v-slot:button>
      <ActionButton v-if="state !== 'share'" :type="'submit'" :disabled="false" @click="save">
        <IconPlus v-if="state === 'add'" />
        <IconCheck v-else />
        <span>{{ state === 'add' ? 'Add' : 'Done'
        }}</span>
      </ActionButton>
      <ActionButton v-else :type="'delete'" @click="removeCurrentCredentials">
        <IconTrash />
        <span>Delete</span>
      </ActionButton>
    </template>
  </LayoutSelected>
</template>