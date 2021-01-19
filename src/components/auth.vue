<template>
  <overlay class="auth" @exit="exit()">
    <form v-if="Register" @submit.prevent="register()">
      <h2 class="form-signin-heading special">Register</h2>
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
        type="email"
        required
        name="email"
        placeholder="Email"
        v-model="email"
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
      <button class="submit attention" type="submit" v-if="Register">Register</button>
      <button class="submit attention" type="submit" v-if="!Register">Login</button>
    </form>
    <form v-else @submit.prevent="login()">
      <h2 class="form-signin-heading special" v-if="Register">Register</h2>
      <h2 class="form-signin-heading special" v-if="!Register">Login</h2>
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
        type="password"
        required
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <p v-if="error != ''" class="error">{{ error }}</p>
      <label class="checkbox"></label>
      <button class="submit attention" type="submit">Login</button>
    </form>
    <div v-if="loading" class="loading"><loading-animation /></div>
  </overlay>
</template>

<script>
import LoadingAnimation from "./loadingAnimation.vue";
import Overlay from './overlay.vue';
const api = require("../apiFunctions");

export default {
  name: "auth",
  components: {
    LoadingAnimation,
    Overlay,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  props: {
    Register: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    exit() {
      api.authOverlayCallback(false)
    },
    submit() {
      this.loading = true;
      if (!this.Register) {
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
      api
        .register(this.username, this.email, this.password)
        .then(() => {
          this.$emit()
        })
        .catch((err) => {
          this.error = err.response.data;
          this.loading = false;
        });
    },
    login() {
      api
        .login(this.username, this.password)
        .then((res) => {
          console.log(res)
          this.$emit('success', res)
        })
        .catch((err) => {
          console.error(err)
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
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 260px;
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
  border: none;
  border-radius: 5px;
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
.cancel {
  background: rgb(250, 41, 41);
  color: white;
}
.cancel:hover {
  background: rgb(255, 60, 60);
}
</style>