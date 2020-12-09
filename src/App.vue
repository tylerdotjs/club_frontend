<template>
  <navigation />
  <div id="content">
    <router-view />
  </div>
  <div id="footer" class="layoutUI">
    <h1>Phone: +1 (920) 343-6053‬</h1>
    <h1>Email: sneclubinfo@gmail.com</h1>
  </div>
  <auth v-if="displayAuthOverlay" />
</template>
<script>
import navigation from "@/components/nav.vue";
import auth from "./components/auth.vue";
const api = require("./apiFunctions");
export default {
  components: {
    navigation,
    auth,
  },
  data() {
    return {
      displayAuthOverlay: false,
    };
  },
  created() {
    api.authOverlayCallback = this.authOverlay;
  },
  methods: {
    authOverlay(open) {
      this.displayAuthOverlay = open;
    },
  },
};
</script>
<style>
body {
  background: #093948;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b8b8b8;
  display: flex;
  height: 100vh;
  flex-direction: column;
}
body {
  margin: 0px;
}
#content {
  display: flex;
  flex: 1;
}
#footer {
  display: flex;
  justify-content: space-around;
}
#footer * {
  font-size: 16px;
}
.attention {
  background: #fa7e55;
  color: #093948;
}
.attention:hover {
  background: #ff8860;
}
.attentionText {
  color: #fa7e55;
}
.special * {
  color: #3cc3f0;
}
.special {
  color: #3cc3f0;
}
.layoutUI {
  background: #313535;
}
</style>
