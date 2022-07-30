<template>
  <main class="absolute top-0 left-0 bg-blue-600 w-full h-full flex justify-center items-center text-xs md:text-base">
    <section class="bg-white rounded shadow-xl w-[80%] md:max-w-[530px]">
      <Header :theme="tag" />
      <div class="w-full h-0.5 bg-blue-400"></div>
      <QuestionBox
      v-if="question.answers.length > 0"
      class="animate-on-appear"
        :number="currentQuestion"
        :question="question.label"
      />
      <div class="relative w-full h-full">
        <div class="absolute w-full bg-transparent h-full inset-0" v-if="hasSelected">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin fill-blue-900" viewBox="0 0 20 20" fill="currentColor" v-if="question.answers.length === 0">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
        <div class="pb-4 animate-on-appear">
          <Answer
          v-for="(answer, index) in question.answers"
          :key="index"
          :answer="answer"
          @click="selectAnswer(index)"
          class="cursor-pointer transition ease-in-out duration-200 mx-4 my-2.5 p-1.5 rounded-md"
          :class="setClass(index)"
          />
        </div>
      </div>
      <Bottom
          class="relative"
          :currentQuestion="currentQuestion"
          :totalQuestions="totalStore.backTotal">
        <button v-if="hasSelected" class="rounded bg-blue-600 px-3 py-1.5 text-white text-[13px]"
          @click="showNextStep"
        >{{action}}</button>
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-6 bottom-3 h-7 w-7 animate-spin fill-blue-900" viewBox="0 0 20 20" fill="currentColor" v-if="isBusy">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
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
import { useQuestionStore } from "../stores/totalQuestion";

const keys = [
 "JavaScript","HTML","Kubernetes",
 "DevOps","Linux","Laravel",
 "MySQL","PHP","Docker",
 "BASH","WordPress"
]

const quiz = reactive([]);
const questionIndex = ref(0);
const currentQuestion = computed(() => questionIndex.value + 1);
const store = useUserStore()
const totalStore = useQuestionStore()
const tag = ref(-1);


const fetchData = async () => {
  tag.value = keys[Math.floor(Math.random() * keys.length)];
  const url = `https://quizapi.io/api/v1/questions?apiKey=Gn8k1ABUNVdqrf54oPPX5FRsEmzgbkzDCIZKv6dH&limit=2&tags=${tag.value}`
  try {
    const { data } = await axios.get(url)
    totalStore.updateTotalScore(data.length);
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
const isBusy = ref(false);
const action = ref("next question");

watchEffect( async () => {
  selectedIndex.value = null;
  if(questionIndex.value === quiz.length-1) {
    action.value = "finish";
  }
  else {
    action.value = "next question";
  }

  try {
    question.answers = await _.shuffle(Object.values(quiz[questionIndex.value].answers).filter(answer => answer !== null));
    question.label = await quiz[questionIndex.value].question;
    question.correctAnswer = await quiz[questionIndex.value].answers[quiz[questionIndex.value].correct_answer];
  }catch(e) {
    console.log(e.message);
  }
});

const router = useRouter();

const showNextStep = async () => {
  if (question.answers[selectedIndex.value] === question.correctAnswer) {
    store.incrementScore();
  }

 if (questionIndex.value === quiz.length-1) {
    isBusy.value = true;
    await store.addUserToDatabase();
    notifyMe();
    await router.push(`/quiz/${store.backPlayer.username}/score`)
    return ;
  }

  questionIndex.value += 1;
  hasSelected.value = false;
  action.value="next question"
};

const hasSelected = ref(false);

const selectAnswer = (index) => {
  selectedIndex.value = index;
  hasSelected.value = true;
}

const setClass = (index) => {
  if (hasSelected.value && selectedIndex.value !== null) {
    if (selectedIndex.value === index && question.answers[index] === question.correctAnswer) {
      return "correct"
    }
    else if (selectedIndex.value === index && question.answers[index] !== question.correctAnswer) {
      return "incorrect"
    }
  }
  return "default"
};


function notifyMe() {
  if (!('Notification' in window)) {
    alert('Ce navigateur ne prend pas en charge la notification de bureau')
  }
  else if (Notification.permission === 'granted') {
    const notification = new Notification('your data have been send!')
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('your data have been send!')
      }
    })
  }
}


</script>

<style>
.default {
  @apply border-2 text-gray-900 border-sky-200 bg-sky-100
}
.correct {
  @apply  bg-green-200 text-green-900  border border-green-200
}
.incorrect {
  @apply bg-red-100 text-red-900  border border-red-200
}


.animate-on-appear {
  animation-name: on-appear;
  animation-duration: 0.4s;
}
 
@keyframes on-appear {
  0% {
    transform: translateX(100px);
  }
  10% {
    transform: translateX(90px);
  }
  20% {
    transform: translateX(80px);
  }
  30% {
    transform: translateX(70px);
  }
  40% {
    transform: translateX(60px);
  }
  50% {
    transform: translateX(50px);
  }
  60% {
    transform: translateX(40px);
  }
  70% {
    transform: translateX(30px);
  }
  80% {
    transform: translateX(20px);
  }
  90% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  }
}  
</style>





















