<template>
  <div v-if="answer">
    {{ answer }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  answer: {
    type: String,
  },
});
</script>
