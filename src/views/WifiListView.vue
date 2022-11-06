<script setup>
import { useRouter, RouterLink } from 'vue-router'
import SwipeArea from '@/components/SwipeArea.vue'
import TextInstructions from '@/components/TextInstructions.vue';
import Logo from '@/components/Logo.vue';
import { useCredentialsStore } from '@/stores/credentials';
import { storeToRefs } from 'pinia';
import ActionButton from '@/components/ActionButton.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconPen from '@/components/icons/IconPen.vue';

const router = useRouter()
const credentialsStore = useCredentialsStore()

const { credentialsList, state, currentCredentials } = storeToRefs(credentialsStore)

const { setEmptyCurrentCredentials, setCurrentCredentials } = credentialsStore

// set default credentials and state
// setCurrentCredentials(0)
// state.value = 'share'

function showCurrentCredentials(intent, index) {
  state.value = intent
  setCurrentCredentials(index)
  router.push({ name: 'WiFiDetails', params: { index } })
}

function create() {
  state.value = 'add'
  setEmptyCurrentCredentials()
  router.push({ name: 'WiFiDetails', params: { index: credentialsList.value.length } })
}
</script>

<template>
  <div class="container">
    <ActionButton @click="create" type="create">
      <IconPlus />
    </ActionButton>
    <Logo text="My WiFis" left="2.67" top="1.14" />
    <TextInstructions text="Manage and prioritize your credentials" />
    <ul v-if="credentialsList.length !== 0">
      <li v-for="(credentials, index) in credentialsList" :key="index">
        <h3>{{ credentials.title }}</h3>
        <ActionButton type="edit" @click="showCurrentCredentials('edit', index)">
          <IconPen />
        </ActionButton>
      </li>
    </ul>
    <div v-else>
      <p>Add some wifi credentials </p>
    </div>
  </div>
  <SwipeArea placement="left" />
</template>

<style>
.container {
  /* min-height: 100vh; */
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
}
</style>