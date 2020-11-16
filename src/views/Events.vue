<template>
  <div class="events">
    <event
      v-for="eventItem in events"
      :key="eventItem._id"
      :id="eventItem._id"
      :subject="eventItem.subject"
      :location="eventItem.location"
      :date="eventItem.date.toLocaleDateString()"
      :time="eventItem.date.toLocaleTimeString()"
      :attending="eventItem.attending"
      ><p>
        {{ eventItem.description }}
      </p>
    </event>
    <div v-if="!loggedIn" class="eventItem loginMessage">
      <p>Please login to access events</p>
      <button @click="authShown = true">Login</button>
    </div>
    <auth v-if="authShown" isLogin="true" :onSuccess="loginSuccess" />
    <div v-if="loading" class="eventItem eventItem_loading"><loading-animation /></div>
  </div>
</template>
<script>
import event from "@/components/event.vue";
import auth from "@/components/auth.vue";
import LoadingAnimation from "@/components/loadingAnimation.vue";
const axios = require("axios");
export default {
  components: {
    event,
    auth,
    LoadingAnimation,
  },
  data() {
    return {
      loggedIn: true,
      authShown: false,
      loading: false,
      events: [],
    };
  },
  name: "events",
  created() {
    this.getEvents();
  },
  methods: {
    loginSuccess() {
      this.authShown = false;
      this.loggedIn = true;
      this.getEvents();
    },
    getEvents() {
      this.loading = true;
      axios
        .get(`https://api.snec/events`, {
          withCredentials: true,
        })
        .then((res) => {
          this.loading = false;
          this.displayEvents(res.data.events);
        })
        .catch((err) => {
          this.loading = false;
          if (!err.response) throw err;
          if (err.response.status == 401) {
            this.loggedIn = false;
          }
        });
    },
    displayEvents(events) {
      for (var i = 0; i < events.length; i++) {
        var e = events[i];
        e.date = new Date(e.date);
      }
      this.events = events;
    },
  },
};
</script>
<style lang="css" scoped>
.loginMessage {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: rgb(255, 69, 69);
  color: white;
}
.loginMessage > button {
  padding: 10px 40px;
  border: none;
}
.loginMessage > button:hover {
  background: rgb(255, 207, 207);
}
.events {
  width: 100%;
  flex-direction: column-reverse;
}
.eventItem_loading > *{
  margin: auto;
}
</style>