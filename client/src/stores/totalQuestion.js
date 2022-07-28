import { defineStore } from 'pinia';

export const useQuestionStore = defineStore('question', {
  state: () => ({
      totalScore: 0
  }),
  getters: {
    backTotal: (state) => state.totalScore
  },
  actions: {
     updateTotalScore(total) {
      this.totalScore = total
    },
    resetTotalScore(){
      this.stotalScorecore = 0;
    }
  },
})
