<script setup>
const props = defineProps([
  'wifiInfo'
])
const emits = defineEmits([
  'edit', 'delete'
])

function editWifiInfo() {
  emits('edit')
}

function deleteWifiInfo() {
  emits('delete')
}
</script>

<template>
  <h2>{{ wifiInfo.name }}</h2>
  <div class="qr">
    {{ wifiInfo.password }}
  </div>

  <button @click="editWifiInfo">Edit</button>
  <button>Share</button>
  <button @click="deleteWifiInfo">Delete</button>


</template>

<style>
.qr {
  background-color: white;
  color: black;
  width: 10rem;
  height: 10rem;
}
</style>