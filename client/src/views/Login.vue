<template>
  <div class="w-full max-w-xs mx-auto translate-y-1/2">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-100">
      <template v-if="notHaveAccount">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
            Firstname
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="firstname"
                 type="text"
                 placeholder="Firstname"
                 v-model="user.firstname"
          >
          <div class="error" v-for="error of v$.firstname.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
            Lastname
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="lastname"
                 type="text"
                 placeholder="Lastname"
                 v-model="user.lastname"
          >
          <div class="error" v-for="error of v$.lastname.$errors" :key="error.$uid">
            {{ error.$message }}
          </div>
        </div>
      </template>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="username"
               type="text"
               placeholder="Username may be your email"
               v-model="user.username"
        >
        <div class="error" v-for="error of v$.username.$errors" :key="error.$uid">
            {{ error.$message }}
        </div>
      </div>
      <div class="mt-4 text-xs">
        <div v-if="notHaveAccount" class="flex flex-col items-start space-y-2">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" @click.prevent="goToHomePage">
            Sign Up
          </button>
          <p>you could <span class="text-gray-900 font-extrabold underline underline-offset-4 hover:text-indigo-600 hover:cursor-pointer" @click="notHaveAccount = false">Login</span> if you have account</p>
        </div>
        <div v-else class="flex flex-col items-start space-y-2">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" @click.prevent="goToHomePage">
            Sign In
          </button>
          <p>not have account ? <span class="text-gray-900 font-extrabold underline underline-offset-4 hover:text-indigo-600 hover:cursor-pointer" @click="notHaveAccount = true">signUp here</span></p>
        </div>
      </div>
      <div v-if="shouldDisplayError" class="text-2xl text-indigo-300">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>

import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { useSessionStore } from "../stores/session"

export default {
  name: "Login",
  setup() {
    const user = reactive({
      firstname: "",
      lastname: "",
      username: "",
      score: 0,
    });

    const sessionStore = useSessionStore();

    const creationRules = {
      firstname: {
        required: helpers.withMessage("firstname is required", required),
      },
      lastname: {
        required: helpers.withMessage("lastname is required", required),
      },
      username: {
        required: helpers.withMessage("username is required", required),
      },
    };

    const loginRules = {
      username: {
        required: helpers.withMessage("username is required", required),
      }
    }
    
    const notHaveAccount = ref(true);

    const router = useRouter();

    const rules = computed(() => notHaveAccount.value ? creationRules : loginRules)

    const v$ = useVuelidate(rules, user);

    const shouldDisplayError = ref(false);
    const errorMessage = ref("");

    watch(() => notHaveAccount.value, (value) => {
      if (value) {
        sessionStore.restError()
      }
    })


    const goToHomePage =  async () => {
      const result = await v$.value.$validate();
      if(result) {
        if(notHaveAccount.value) {
          await sessionStore.CreateAccount(user)
          if(sessionStore.error) {
            shouldDisplayError.value = true;
            errorMessage.value = "another user has this username";
            return;
          }
          await router.push(`/welcome/${sessionStore.session}`);
          return;
        }
        await sessionStore.Login(user)
        if(sessionStore.session === null) {
          shouldDisplayError.value = true;
          errorMessage.value = "this username doesn't exist";
          return;
        }
        await router.push(`/welcome/${sessionStore.session}`);
      }
    }

    onMounted(() => {

    })

    return {
      goToHomePage,
      user,
      notHaveAccount,
      shouldDisplayError,
      errorMessage,
      v$
    }
  }
}
</script>

<style>
.error {
  @apply text-indigo-600 text-xs m-1;
}
</style>
