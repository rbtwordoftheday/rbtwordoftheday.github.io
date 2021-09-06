<template>
  <div
    style="align-items:center;display:flex;align-items:center;flex-direction:column;min-height:100vh;justify-content:center"
  >
    <h1>Do You Have What It Takes To</h1>
    <VueWriter
      style="color:white"
      :array="['Guess The Word?', 'Win The Prize?', 'Beat The Odds?']"
      :eraseSpeed="100"
      :typeSpeed="100"
    />
    <input
      v-model="searchResult"
      type="text"
      class="mx-auto w-50 mt-4 py-2 form-control"
      id="searchResult"
      placeholder="Type Here And Find Out"
    />
    <p v-if="isWrong" style="color:white;text-transform:uppercase">
      Wrong Answer, Try Again!<br />
      Attempts: {{ attempts }}
    </p>
    <button @click="guessCheck" class="btn btn-outline-light mt-4">
      TRY YOUR LUCK
    </button>
    <div style="position:absolute;bottom:20px;right:10px;color:white">
      &copy; ILIJA NESKOVIC 2021
    </div>
  </div>
</template>

<script>
import VueWriter from "vue-writer";
import axios from "axios";
export default {
  name: "Guess",
  data() {
    return {
      searchResult: null,
      wordOfTheDay: null,
      isWrong: false,
      attempts: 0,
      Report: null,
    };
  },
  components: { VueWriter },
  created() {
    axios
      .get("https://rbtwordoftheday.herokuapp.com/api/words/wordOfTheDay")
      .then((response) => (this.wordOfTheDay = response.data));
    axios
      .get("https://rbtwordoftheday.herokuapp.com/api/reports/current")
      .then((response) => (this.Report = response.data));
  },
  methods: {
    guessCheck() {
      if (
        this.searchResult.toUpperCase() !== this.wordOfTheDay.word.toUpperCase()
      ) {
        this.isWrong = true;
        this.Report.noFail++;
        this.attempts++;
      } else {
        this.Report.noCorrect++;
        this.Report.noUsers++;
        this.isWrong = false;
        this.$router.push({ name: "Info" });
      }
      console.log(this.searchResult);
      console.log(this.wordOfTheDay.word.toUpperCase());
      axios
        .put("https://rbtwordoftheday.herokuapp.com/api/reports", this.Report)
        .then((response) => console.log(response));
    },
  },
};
</script>
