<template>
  <div class="user">
    <div v-if="loggedIn" @click="profileVisable = true" class="user_loggedIn">
      <p>Welcome, {{ userData.username }}</p>
      <img :src="userData.profilePicture" alt="" class="user_profilePicture">
    </div>
    <div v-if="!loggedIn">
      <button @click="openAuth()" class="attention loginButton">Login</button>
    </div>
    <profile :id="userData._id" v-if="profileVisable" @exit="profileVisable = false" />
  </div>
</template>

<script>
const api = require("../apiFunctions");
import Profile from '../components/profile.vue'

export default {
  name: "user",
  data() {
    return {
      userData: {},
      loggedIn: false,
      profileVisable: false
    };
  },
  components: {
    Profile
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
        .userData()
        .then((res) => {
          this.userData = res;
          this.loggedIn = true;
          return;
        })
        .catch((err) => {
          if (!err.response) {
            console.error(err);
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
.user > div {
  display: flex;
}
.user_profilePicture {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 25px;
}
.user_loggedIn {
  cursor: pointer;
}
</style>