<template>
  <div class="user">
    <div v-if="loggedIn">
      <p>Welcome, {{ userData.username }}</p>
    </div>
    <div v-if="!loggedIn">
      <button @click="openAuth()" class="attention loginButton">Login</button>
    </div>
  </div>
</template>

<script>
const api = require("../apiFunctions");
export default {
  name: "user",
  data() {
    return {
      userData: {},
      loggedIn: false,
    };
  },
  created() {
    window.addEventListener("loggedIn", this.getUserData)
    this.getUserData()
  },
  methods: {
    openAuth() {
      api.authOverlayCallback(true);
    },
    getUserData() {
      api
        .retrieveUserData()
        .then((res) => {
          this.userData = res;
          this.loggedIn = true;
          return;
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
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: .9em;
}
</style>