<template>
  <div
    class="absolute top-0 left-0 bg-blue-600 w-full h-full flex justify-center items-center text-xs md:text-base"
  >
    <CardWrapper
      class="pb-14 pt-7 px-3 md:pb-10 md:pt-5 md:px-4 lg:pb-12 lg:pt-6 lg:px-6 mx-auto shadow bg-white"
    >
      <CardWrapper
        class="pt-6 pb-10 px-5 lg:p-16 relative flex flex-col items-center justify-center space-y-3 lg:space-y-2 bg-gray-200/10 shadow-md"
      >
        <div class="flex flex-col items-center space-y-2" v-if="store.backPlayer.score >= 10">
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
          icon="question"
          label="Total of correctly answered questions"
          :score="`${store.backPlayer.score}`"
          :total="`${totalStore.backTotal}`"
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
import { useUserStore } from "../stores/login"
import { useQuestionStore } from "../stores/totalQuestion";

import { useRouter } from "vue-router";
const router = useRouter()

const store = useUserStore();
const totalStore = useQuestionStore()

const startNewQuiz = () => {
  store.resetScore();
  totalStore.resetTotalScore();
  router.push(`/quiz/${store.backPlayer.username}`)
}
</script>
