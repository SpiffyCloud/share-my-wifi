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

const { credentials, showForm } = storeToRefs(credentialsStore)

const wifis = [credentials]

function edit() {
  showForm.value = true
  router.push({ name: 'WiFiDetails' })

}
</script>

<template>
  <div class="container">
    <Logo text="My WiFis" left="2.67" top="1.14" />
    <TextInstructions
      text="Manage and prioritize your credentials" />
    <ul>
      <li v-for="(wifi, index) in wifis" :key="index">
        <RouterLink :to="{ name: 'WiFiDetails' }">
          <h2>{{ wifi.value.name }}</h2>
        </RouterLink>
        <ActionButton type="share"
          @click="router.push({ name: 'WiFiDetails' })">
          Share
        </ActionButton>
        <ActionButton type="edit" @click="edit">
          Edit
        </ActionButton>
      </li>
    </ul>
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