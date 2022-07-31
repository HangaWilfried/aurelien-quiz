import { defineStore } from 'pinia';
import axios from "axios";

export const useSessionStore = defineStore('question', {
    state: () => ({
        sessionId: "",
        hasError: false,
    }),
    getters: {
        session: (state) => state.sessionId,
        error: (state) => state.hasError,
    },
    actions: {
        async CreateAccount(user) {
            const data_to_send = await axios({
                method: "post",
                url: "/api/post",
                data: user,
            })
            if(data_to_send.data.message) {
                this.hasError = true;
            }
            this.sessionId = data_to_send.data.id
        },
        async Login(user) {
            const findUser = await axios({
                method: "get",
                url: `/api/post/${user.username}`,
            })
            if(findUser.data === null) {
                this.hasError = true;
                return;
            }
            this.sessionId = findUser.data._id
        },
        async restError() {
            this.hasError = false;
        }
    },
})
