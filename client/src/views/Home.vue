<template>
  <div class="w-full h-full absolute top-0 left-0 bg-blue-600 flex justify-center items-center">
    <button @click="goToRulePage"
      class="bg-white text-blue-500 text-2xl rounded-md shadow-lg py-3 px-5 font-bold font-sans">
      Start Quiz
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()
const goToRulePage = async () => {
  await router.push("/rules");
}
</script>
