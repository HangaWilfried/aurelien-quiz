<template>
  <div class="w-full max-w-xs mx-auto translate-y-1/2">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-100">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="username"
               type="text"
               placeholder="Username"
               v-model="user.username"
        >
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
      </div>
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
      </div>
      <div class="flex items-center justify-between" @click.prevent="goToHomePage">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
      </div>
    </form>
  </div>

</template>

<script>

import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/login";

export default {
  name: "Login",
  setup() {
    const user = reactive({
      firstname: "",
      lastname: "",
      username: "",
      score: 0,
    });

    const router = useRouter();
    const useStore = useUserStore();
    const goToHomePage =  () => {
      useStore.updatePlayer(user)
      router.push("/welcome");
    }

    return {
      goToHomePage,
      user
    }
  }
}
</script>
