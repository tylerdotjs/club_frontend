<template>
  <div class="user">
    <div v-if="loggedIn">
      <p>Welcome, {{userData.username}}</p>
    </div>
    <div v-if="!loggedIn">
      <button @click="openAuth()" class="loginButton">Login</button>
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
    api.retrieveUserData()
      .then((res) => {
        this.userData = res
        this.loggedIn = true
        return
      })
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
      });
  },
  methods: {
    openAuth() {
      api.authOverlayCallback(true);
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