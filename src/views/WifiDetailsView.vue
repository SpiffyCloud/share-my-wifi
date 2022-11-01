<script setup>
import { computed } from 'vue'
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

const credentialsStore = useCredentialsStore()
const { credentials, noCredentials, showForm, invalidCredentials, qr, title, instructions } = storeToRefs(credentialsStore)
const { hideForm, resetStatus } = credentialsStore


</script>

<template>
  <SwipeArea placement="right" />
  <Logo text="Share My WiFi" left="4.36" top="1.14" />
  <LayoutSelected v-if="credentials" :title="title"
    :instructions="instructions">
    <template v-slot:card>
      <Card :back="!showForm" @click="showForm = true">
        <template v-slot:front>
          <InputField :group="'name'" :type="'text'"
            :placeholder="'My WiFi'"
            v-model="credentials.name" />
          <InputField :group="'password'" :type="'text'"
            :placeholder="'password123'"
            v-model="credentials.password" />
        </template>
        <template v-slot:back>
          <qrCode v-if="!noCredentials" :value="qr"
            :render-as="'svg'" :margin="0"
            :background="'none'"
            :foreground="'var(--color-text)'" :size="200" />
          <IconWifiNotFound v-else />
        </template>
      </Card>
    </template>
    <template v-slot:button>
      <ActionButton v-if="showForm" :type="'submit'"
        :disabled="invalidCredentials" @click="hideForm">
        <IconPlus v-if="noCredentials" />
        <IconCheck v-else />
        <span>{{ noCredentials ? 'Add' : 'Done' }}</span>
      </ActionButton>
      <ActionButton v-else :type="'delete'"
        @click="resetStatus">
        <IconTrash />
        <span>Delete</span>
      </ActionButton>
    </template>
  </LayoutSelected>
</template>