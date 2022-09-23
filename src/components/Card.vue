<script setup>
const emit = defineEmits(['click'])
const props = defineProps(['back'])
</script>

<template>
  <div class="container__card">
    <div class="card" v-bind:class="{ flip: back }">
      <div class="card__content card__content--front">
        <slot name="front">
          front
        </slot>
      </div>
      <div class="card__content card__content--back"
        @click="emit('click')">
        <slot name="back">
          back
        </slot>
      </div>
    </div>
  </div>
</template>

<style>
.container__card {
  width: 100%;
  max-width: 16.5rem;
  perspective: 37.5rem;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.card {
  /* 1:1 aspect ratio */
  padding-top: 100%;
  position: relative;
  width: 100%;

  /* animation */
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;

  /* styling */
  border-radius: 1.5rem;
  box-shadow:
    -3px -3px 0px 4px var(--color-card-shadow-light),
     8px 8px 0px var(--color-card-shadow-dark);
}

.card__content {
  /* 1:1 aspect ratio positioning */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  /* styling */
  border-radius: 1.5rem;
  background-color: var(--color-card-background);
  backface-visibility: hidden;

  /* content positioning */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1.25rem;
  padding: .75rem 1.25rem;
}

.card__content svg {
  /* grow with parent container */
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* animations */
.card__content--font {
  transform:rotateY(0deg);
}

.card__content--back {
  transform: rotateY(180deg);
}

.flip {
  transform: rotateY(180deg);
}
</style>
