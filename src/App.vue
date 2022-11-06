<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useCredentialsStore } from '@/stores/credentials.js'

const credentialsStore = useCredentialsStore()

onMounted(() => {
  credentialsStore.loadCredentialsList()
})

</script>

<template>
  <div class="touch-container">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>

  </div>
</template>

<style>
.touch-container {
  position: relative;
  min-width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
