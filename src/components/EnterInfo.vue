<template>
  <div class="container">
    <div class="row" v-if="pickreward">
      <h1 class="my-4">Choose your reward:</h1>
      <div
        class="col-4 mt-3 mx-auto "
        v-for="prize in prizes"
        v-bind:key="prize"
      >
        <div
          class="w-75 py-5 mx-auto my-3 reward"
          style="border:1px solid white;border-radius:10px"
          @click="collectPrize"
        >
          ?
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <h1 class="my-3">Congratulations, you won: {{ pickedreward.prize }}</h1>
        <h1 class="my-3">Enter your info:</h1>
        <h3 class="my-3">Email</h3>
        <input
          v-model="email"
          type="text"
          class="w-50 form-control py-2 mx-auto"
        />
        <h3 class="my-3">Birth Date:</h3>
        <input
          v-model="birthdate"
          type="date"
          class="w-50 form-control py-2 mx-auto"
        />
        <button
          @click="enterInfo"
          class="btn btn-outline-light mt-5 mx-auto d-block w-25 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EnterInfo",
  data() {
    return {
      prizes: [],
      pickreward: true,
      pickedreward: null,
      email: null,
      birthdate: null,
    };
  },
  methods: {
    collectPrize() {
      this.pickedreward = this.prizes[
        Math.floor(Math.random() * this.prizes.length)
      ];
      this.pickreward = false;
    },
    enterInfo() {
      var user = {
        id: 1,
        username: "User",
        email: this.email,
        birthDate: String(this.birthdate),
      };
      axios
        .post("https://rbtwordoftheday.herokuapp.com/api/users/", user)
        .then((response) => console.log(response));

      axios
        .get(
          "https://rbtwordoftheday.herokuapp.com/api/users/email/?email=" +
            this.email +
            "&prize=" +
            this.pickedreward.prize
        )
        .then((response) => console.log(response));
      axios
        .put(
          "https://rbtwordoftheday.herokuapp.com/api/prizes/timesSelected/",
          this.pickedreward
        )
        .then((response) => console.log(response));
    },
  },

  created() {
    axios
      .get("https://rbtwordoftheday.herokuapp.com/api/prizes/")
      .then((response) => (this.prizes = response.data));
  },
};
</script>
