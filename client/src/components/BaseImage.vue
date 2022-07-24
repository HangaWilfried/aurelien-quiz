<template>
  <img :src="getImageUrl" alt="image" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const getImageUrl = computed(() => {
  return new URL(`../assets/${props.name}.png`, import.meta.url)
    .href;
});
</script>
