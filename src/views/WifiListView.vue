<script setup>
import { useRouter, RouterLink } from 'vue-router'
import SwipeArea from '@/components/SwipeArea.vue'
import TextInstructions from '@/components/TextInstructions.vue';
import Logo from '@/components/Logo.vue';
import { useCredentialsStore } from '@/stores/credentials';
import { storeToRefs } from 'pinia';
import ActionButton from '@/components/ActionButton.vue';

const router = useRouter()
const credentialsStore = useCredentialsStore()

const { credentialsList, state, currentCredentials } = storeToRefs(credentialsStore)

const { setEmptyCurrentCredentials } = credentialsStore

function showCurrentCredentials(intent, index) {
  state.value = intent
  currentCredentials.value = credentialsList.value[index]
  console.log(currentCredentials.value);
  router.push({ name: 'WiFiDetails', params: { index } })
}

function add() {
  state.value = 'add'
  setEmptyCurrentCredentials()
  router.push({ name: 'WiFiDetails', params: { index: credentialsList.value.length } })
}
</script>

<template>
  <div class="container">
    <button @click="add">Add</button>
    <Logo text="My WiFis" left="2.67" top="1.14" />
    <TextInstructions text="Manage and prioritize your credentials" />
    <ul v-if="credentialsList.length !== 0">
      <li v-for="(credentials, index) in credentialsList" :key="index">
        {{ index }}
        <RouterLink :to="{
          name: 'WiFiDetails', params: { index }
        }">
          <h2>{{ credentials.title }}</h2>
        </RouterLink>
        <ActionButton type="share" @click="showCurrentCredentials('share', index)">
          Share
        </ActionButton>
        <ActionButton type="edit" @click="showCurrentCredentials('edit', index)">
          Edit
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
  min-height: 100vh;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
  background-color: var(--color-card-background);
  padding: .5rem 2rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow:
    -3px -3px 0px 4px var(--color-card-shadow-light),
     8px 8px 0px var(--color-card-shadow-dark);
}
</style>