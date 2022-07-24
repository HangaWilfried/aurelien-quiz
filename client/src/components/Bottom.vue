<template>
  <div class="mt-6 px-4 py-2 md:py-3 border-t border-gray-300 text-gray-800 font-medium flex justify-between items-center ">
    <div>{{ currentQuestion }} of {{ totalQuestions }} Questions</div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineEmits(["nextQuestion"]);
defineProps({
  currentQuestion: {
    type: Number
  },
  totalQuestions: {
    type: Number
  },
});
</script>
