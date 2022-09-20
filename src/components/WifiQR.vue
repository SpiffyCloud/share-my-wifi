<script setup>
const props = defineProps(['credentials'])
const emits = defineEmits(['edit', 'delete'])
</script>

<template>
  <h2>{{ credentials.name }}</h2>
  <div class="qr">
    {{ credentials.password }}
  </div>

  <button @click="emits('edit')">Edit</button>
  <button @click="emits('delete')">Delete</button>
</template>

<style>
.qr {
  background-color: #eee;
  color: black;
  width: 10rem;
  height: 10rem;
}
</style>