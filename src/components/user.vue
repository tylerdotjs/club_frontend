<template>
  <div class="user">
    <div v-if="loggedIn">
      <p>Welcome, {{ userData.username }}</p>
    </div>
    <div v-if="!loggedIn">
      <button @click="loggingIn = true" class="loginButton">Login</button>
    </div>
    <auth v-if="loggingIn" isLogin="true" :onSuccess="loginSuccess" />
  </div>
</template>

<script>
const axios = require("axios");
import auth from "./auth.vue";
export default {
  name: "user",
  data() {
    return {
      userData: {},
      loggedIn: false,
      loggingIn: false,
    };
  },
  components: {
    auth,
  },
  created() {this.getUserData()},
  methods: {
    loginSuccess() {
      this.loggingIn = false;
      this.getUserData()
    },
    getUserData() {
      axios({
        url: `https://api.snec.club/user`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          this.userData = res.data;
          this.loggedIn = true;
        })
        .catch((err) => {
          if (!err.response) {
            throw err;
          }
        });
    },
  },
};
</script>

<style>
.loginButton {
  width: 100px;
  background-color: #add8e6;
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: black;
  text-decoration: none;
  font-weight: bold;
}
.loginButton:hover {
  background: #b4d9e6;
}
</style>