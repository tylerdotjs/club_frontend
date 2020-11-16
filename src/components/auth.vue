<template>
  <div class="auth">
    <form @submit.prevent="submit()">
      <h2 class="form-signin-heading" v-if="!isLogin">Register</h2>
      <h2 class="form-signin-heading" v-if="isLogin">Login</h2>
      <input
        class="form-control"
        type="text"
        required
        name="username"
        placeholder="Username"
        v-model="username"
      />
      <input
        class="form-control"
        type="text"
        required
        name="email"
        placeholder="Email"
        v-model="email"
        v-if="!isLogin"
      />
      <input
        class="form-control"
        type="password"
        required
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <p v-if="error != ''" class="error">{{ error }}</p>
      <label class="checkbox"></label>
      <button class="submit" type="submit" v-if="!isLogin">Register</button>
      <button class="submit" type="submit" v-if="isLogin">Login</button>
    </form>
    <div v-if="loading" class="loading"><loading-animation /></div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import LoadingAnimation from "./loadingAnimation.vue";

export default {
  name: "auth",
  components: {
    LoadingAnimation,
  },
  data() {
    return {
      url: `https://api.snec`,
      username: "",
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  props: ["isLogin", "onSuccess"],
  methods: {
    submit() {
      this.loading = true;
      if (this.isLogin) {
        this.login();
      } else {
        this.register();
      }
    },
    register() {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(this.email).toLowerCase())) {
        this.loading = false;
        return (this.error = "Email is invalid");
      }

      axios({
        url: this.url + "/register",
        method: "POST",
        data: qs.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then(() => {
          this.onSuccess();
        })
        .catch((err) => {
          this.error = err.response.data;
          this.loading = false;
        });
    },
    login() {
      axios({
        url: this.url + "/login",
        method: "POST",
        withCredentials: true,
        data: qs.stringify({
          username: this.username,
          password: this.password,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then((res) => {
          this.onSuccess(res);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.error = "Username or password is incorrect";
          } else {
            this.error = err;
          }
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.auth {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: rgba(128, 128, 128, 0.5);
}
.auth form {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 260px;
  margin: auto;
  background: lightgray;
  padding: 30px;
  border-radius: 20px;
}
.auth form > * {
  margin: 8px 0;
}
.form-control {
  padding: 12px 20px;
  width: 200px;
  border: 1px solid black;
  border-radius: 3px;
}
.submit {
  padding: 5px 20px;
  width: 100px;
  background: #add8e6;
  border: none;
  border-radius: 5px;
}
.submit:hover {
  background: #b4d9e6;
}

.error {
  padding: 12px 20px;
  width: 200px;
  background: rgba(255, 0, 0, 0.61);
  border-left: 5px solid red;
  color: white;
  font-size: 0.9em;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: rgba(128, 128, 128, 0.5);
  align-items: center;
  justify-content: center;
}
</style>