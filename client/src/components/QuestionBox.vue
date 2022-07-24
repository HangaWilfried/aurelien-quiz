<template>
  <h2 class="p-4 my-2 text-gray-800 font-extrabold font-sans"
  >{{number}}. {{question}}</h2>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  number: {
    type: Number,
  },
  question: {
    type: String,
  }
});
</script>
