<template>
  <main class="absolute top-0 left-0 bg-blue-600 w-full h-full flex justify-center items-center text-xs md:text-base">
    <section class="bg-white rounded shadow-xl w-[80%] md:max-w-[530px]">
      <Header />
      <div class="w-full h-0.5 bg-blue-400"></div>
      <QuestionBox
        :number="currentQuestion"
        :question="question.label"
      />
      <div class="relative w-full h-full">
        <div class="absolute w-full bg-transparent h-full inset-0" v-if="hasSelected">
        </div>
        <div class="pb-4">
            <Answer
            v-for="(answer, index) in question.answers"
            :key="index"
            :answer="answer"
            @click="selectAnswer(index)"
            class="mx-4 my-2.5 cursor-pointer p-1.5 rounded-md transition ease-in-out duration-75"
            :class="setClass(index)"
            />
        </div>
      </div>
      <Bottom v-if="hasSelected"
          :currentQuestion="currentQuestion"
          :totalQuestions="totalQuestions">
        <button v-if="currentQuestion < totalQuestions"
          class="rounded bg-blue-600 p-1.5 text-white text-[13px]"
          @click="showNextQuestion"
        >next question</button>

        <button v-else
          class="rounded bg-blue-600 py-1.5 px-4 text-white text-sm"
          @click="goToDetails"
        >finish</button>
      </Bottom>
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref, watchEffect } from "vue";
import axios from "axios";
import _ from "lodash";
import Header from "../components/Header.vue";
import QuestionBox from "../components/QuestionBox.vue";
import Answer from "../components/Answer.vue";
import Bottom from "../components/Bottom.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/login";

const keys = [
 "JavaScript","HTML","Kubernetes",
 "DevOps","Linux","Laravel",
 "MySQL","PHP","Docker",
 "BASH","WordPress"
]

const quiz = reactive([]);
const questionIndex = ref(0);
const totalQuestions = computed(() => quiz.length) ;
const currentQuestion = computed(() => questionIndex.value + 1);
const store = useUserStore()

const fetchData = async () => {
  const tag = keys[Math.floor(Math.random() * keys.length)];
  const url = `https://quizapi.io/api/v1/questions?apiKey=Gn8k1ABUNVdqrf54oPPX5FRsEmzgbkzDCIZKv6dH&limit=20&tags=${tag}`
  try {
    const { data } = await axios.get(url)
    return _.shuffle(data);
  }
  catch (error) {
    return `error ${error}`;
  }
};

onBeforeMount(async () => {
  const data = await fetchData();
  quiz.push(...data);
});

const question = reactive({
    label: "",
    answers: [],
    correctAnswer: "",
})

const selectedIndex = ref(null);

watchEffect( async () => {
  selectedIndex.value = null;
  try {
    question.answers = await _.shuffle(Object.values(quiz[questionIndex.value].answers).filter(answer => answer !== null));
    question.label = await quiz[questionIndex.value].question;
    question.correctAnswer = await quiz[questionIndex.value].answers[quiz[questionIndex.value].correct_answer];
  }catch(e) {
    console.log(e.message);
  }
});

const showNextQuestion = () => {
 if (questionIndex.value === quiz.length-1) {
    return ;
  }

  questionIndex.value += 1;
  hasSelected.value = false;
};
const router = useRouter();
const goToDetails = async () => {
  await store.addUserToDatabase();
  await router.push(`/quiz/${store.backPlayer.username}/score`)
}

const hasSelected = ref(false);
const setClass = (index) => {
  if (hasSelected.value && selectedIndex.value !== null) {
    if (selectedIndex.value === index && question.answers[index] === question.correctAnswer) {
      store.incrementScore();
      return "correct"
    }
    else if (selectedIndex.value === index && question.answers[index] !== question.correctAnswer) {
      return "incorrect"
    }
  }
  return "default"
};
const selectAnswer = (index) => {
  selectedIndex.value = index;
  hasSelected.value = true;
}
</script>

<style>
.default {
  @apply border-2 border-sky-200 bg-sky-50 hover:bg-sky-200
  hover:text-sky-700
}
.correct {
  @apply  bg-green-200 text-green-900  border border-green-200
}
.incorrect {
  @apply bg-red-100 text-red-900  border border-red-200
}
</style>





















