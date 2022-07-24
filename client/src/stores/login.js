import { computed, reactive, ref } from "vue";
import axios from "axios";

const value = ref(0)

export const incrementScore = () => {
  value.value += 1;
  console.log(value.value)
};

export const resetScore = () => {
  value.value = 0;
};

export const getScore = computed(() => value.value)

const player = reactive({
     firstname: "",
     lastname: "",
     username: "",
     score: 0
   });

 export const updatePlayer = ({ firstname, lastname, username }) => {
     player.firstname = firstname;
     player.lastname = lastname;
     player.username = username;
     player.score = getScore.value;
     localStorage.setItem("player", JSON.stringify(player))
   }

 export const computedPlayer = computed(() => player);

 export const addUserToDatabase = () => {
    axios({
        method: "post",
        url: "/api/post",
        data: {
            firstname: computedPlayer.value.firstname,
            lastname: computedPlayer.value.lastname,
            username: computedPlayer.value.username,
            score: computedPlayer.value.score
        }
    })
    new Notification("your data have been send!");
 }
