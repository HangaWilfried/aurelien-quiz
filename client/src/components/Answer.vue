<template>
  <div class="mx-4 my-2.5 cursor-pointer transition ease-in-out duration-200 border-2 border-sky-200 bg-sky-50 p-1.5 rounded-md hover:bg-sky-200 hover:text-sky-700" v-if="answer">
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
