<template>
  <div
    class="w-full h-full absolute top-0 left-0 flex flex-col p-2 lg:p-0 items-center justify-center"
  >
    <CardWrapper
      class="pb-7 pt-3 px-3 md:pb-10 md:pt-5 md:px-4 lg:pb-12 lg:pt-6 lg:px-6 mx-auto shadow border border-gray-50"
    >
      <CardWrapper
        class="pt-6 pb-10 px-5 lg:p-16 relative flex flex-col items-center justify-center space-y-3 lg:space-y-2 bg-gray-200/10"
      >
        <div class="flex flex-col items-center space-y-2" v-if="getScore >= 10">
          <BaseImage name="result" class="w-12" />
          <span class="font-outfit-bold text-black text-2xl">
            Congratulation !!!
          </span>
        </div>
        <div class="flex flex-col items-center space-y-2 mb-4" v-else>
           <span class="uppercase text-2xl">you lose</span>
           <span class="font-outfit-bold text-black text-sm">
             you can retry the test whenever !!!
           </span>
        </div>
        <StatRecorded
          v-for="(record, index) in records"
          :icon="record.icon"
          :label="record.label"
          :score="record.score"
          :total="record.total"
          :key="index"
        />
        <ButtonWrapper
          class="absolute -bottom-5 bg-blue-800 text-white mx-auto w-3/5 py-3 space-x-2 text-sm"
          @click="startNewQuiz"
        >
          <IconFile stroke="stroke-white" class="w-5 h-5 inline" />
          <span>New test</span>
        </ButtonWrapper>
      </CardWrapper>
    </CardWrapper>
  </div>
</template>

<script setup lang="ts">
import CardWrapper from "../components/CardWrapper.vue";
import ButtonWrapper from "../components/ButtonWrapper.vue";
import IconFile from "../components/icons/IconFile.vue";
import StatRecorded from "../components/StatRecorded.vue";
import BaseImage from "../components/BaseImage.vue";
import { computedPlayer, updatePlayer, resetScore, getScore } from "../stores/login";

import { useRouter } from "vue-router";
const router = useRouter()

const records = [
  {
    icon: "time",
    label: "Total duration",
    score: "13 min",
    total: "20min",
  },
  {
    icon: "question",
    label: "Total questions answers",
    score: "9",
    total: "14",
  },
  {
    icon: "right",
    label: "total points",
    score: "13 pts",
    total: "20 pts",
  },
];

const startNewQuiz = () => {
  const register = JSON.parse(localStorage.getItem('player'))
  resetScore();
  updatePlayer({...register})
  router.push(`/quiz/${computedPlayer.value.username}`)
}
</script>
