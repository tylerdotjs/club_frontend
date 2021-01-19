<template>
  <overlay v-if="loading" class="profile"
    ><h1>Getting User Info</h1>
    <loading-animation style="width: 50px; height: 50px; margin: 100px"
  /></overlay>
  <overlay v-else class="profile">
    <img :src="user.profilePicture" alt="Profile Picture" />
    <h1 class="special" style="margin: 0; margin-top: 10px;">{{ user.username }}</h1>
    <h3>NAME<br />&emsp;{{ user.name }}</h3>
    <h3 style="margin: 0px; margin-bottom: 10px;">ROLES</h3>
    <div class="profile_roles" style="display: flex; flex-direction: row">
      &emsp;
      <tag
        v-for="role in user.roles"
        :key="role"
        :edit="user.roles.includes('admin')"
        >{{ role }}</tag
      >
    </div>
    <button class="profile_logout attention" @click="logout">Logout</button>
  </overlay>
</template>

<script>
import LoadingAnimation from "./loadingAnimation.vue";
import tag from "./tag.vue";
import Overlay from "./overlay.vue";
const api = require("../apiFunctions");

export default {
  components: { tag, LoadingAnimation, Overlay },
  data() {
    return {
      user: {},
      edit: false,
      loading: true,
    };
  },
  props: {
    id: String,
  },
  mounted() {
    api.profile.get(this.id).then((data) => {
      this.user = data.data;
      this.loading = false;
    });
  },
  methods: {
      logout(){
          api.logout()
            .then(location.reload())
      }
  }
};
</script>

<style>
.profile {
  display: flex;
  flex-direction: column;
}
.profile h3 {
  text-align: start;
}
.profile img {
  height: 30vh;
  width: 30vh;
  border-radius: 30vh;
  position: relative;
}
.profile img:hover:after {
  position: absolute;
  content: "<img src='../assets/iconfinder_icon-camera_211634.png'>";
  width: 100%;
}
.profile_logout {
  margin: 10px 0px;
  height: 30px;
  border: none;
  border-radius: 15px;

}
</style>