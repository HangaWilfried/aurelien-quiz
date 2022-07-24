<template>
  <main class="absolute top-0 left-0 bg-blue-600 w-full h-full flex justify-center items-center text-xs md:text-base">
    <section class="bg-white rounded shadow-xl w-[80%] md:max-w-[530px] divide-y-2 divide-zinc-200">
      <div class="w-full shadow p-6">
        <div class="text-gray-900 font-bold text-xl">Some Rules of this Quiz</div>
      </div>
      <div class="font-sans text-gray-800 text-base px-6 py-4 leading-7 font-medium">
        <div>1. You will have only <span class="text-blue-700 font-bold">15 seconds</span> per each question.</div>
        <div>2. Once you select your answer, it can't be undone.</div>
        <div>3. You can't select any option once time goes off.</div>
        <div>4. You can't exit from the Quiz while you're playing.</div>
        <div>5. You'll get points on the basis of your correct answers.</div>
      </div>
      <div class="w-full flex justify-end py-2 px-4 space-x-3">
        <button class="border border-blue-600 px-4 py-2 rounded-md text-blue-600" @click="exitQuiz">
         Exit Quiz
        </button>
        <button class="border border-blue-600 px-4 py-2 rounded-md bg-blue-600 text-white" @click="startQuiz">
         Continue
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computedPlayer } from "../stores/login";
import { useRouter } from "vue-router";

const router = useRouter()
const startQuiz = () => {
  router.push(`/quiz/${computedPlayer.value.username}`)
}

const exitQuiz = () => {
  router.push("/")
}
</script>
