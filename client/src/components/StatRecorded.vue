<template>
  <div class="flex space-x-2 items-center">
    <component :is="icons[icon]" class="w-5 h-5" />
    <span class="text-gray-500 font-outfit-regular">{{ label }}</span>
    <div class="font-outfit-medium">
      <span class="text-orange-800">{{ score }}</span>
      /
      <span class="text-blue-800">{{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconTime from "../components/icons/IconTime.vue";
import IconQuestion from "../components/icons/IconQuestion.vue";
import IconRight from "../components/icons/IconRight.vue";
import { defineProps } from "vue";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

const icons = {
  time: IconTime,
  question: IconQuestion,
  right: IconRight,
};
</script>