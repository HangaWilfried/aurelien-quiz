import axios from "axios";
import { defineStore } from 'pinia';

export const useUserStore = defineStore('player', {
  state: () => ({
      firstname: "",
      lastname: "",
      username: "",
      score: 0
  }),
  getters: {
    backPlayer: (state) => ({
      firstname:  state.firstname,
      lastname:  state.lastname,
      username:  state.username,
      score: state.score
    })
  },
  actions: {
     updatePlayer(player) {
      this.firstname = player.firstname
      this.lastname = player.lastname
      this.username = player.username
    },
    incrementScore(){
      this.score += 1;
    },
    resetScore(){
      this.score = 0;
    },
    async addUserToDatabase() {
      await axios({
        method: "post",
        url: "/api/post",
        data: this.backPlayer,
      })
    },
  },
})


















