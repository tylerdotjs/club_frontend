<template>
  <div class="events">
    <event-creator v-if="adminView" />
    <event
      v-for="eventItem in events"
      :key="eventItem._id"
      :id="eventItem._id"
      :subject="eventItem.subject"
      :location="eventItem.location"
      :date="eventItem.date"
      :attendees="eventItem.attendees"
      :admin="adminView"
      ><p>
        {{ eventItem.description }}
      </p>
    </event>
    <div v-if="!loggedIn" class="eventItem loginMessage">
      <p>Please login to access events</p>
      <button @click="openAuth()">Login</button>
    </div>
    <div v-if="loading" class="eventItem eventItem_loading"><loading-animation /></div>
  </div>
</template>
<script>
const api = require('../apiFunctions')
import event from "@/components/event.vue";
import LoadingAnimation from "@/components/loadingAnimation.vue";
import EventCreator from '../components/eventCreator.vue';
export default {
  components: {
    event,
    LoadingAnimation,
    EventCreator
  },
  data() {
    return {
      loggedIn: true,
      adminView: false,
      loading: false,
      events: []
    };
  },
  name: "events",
  created() {
    this.getEvents();
    window.addEventListener("loggedIn", () => {
      this.getEvents()
    })
  },
  methods: {
    openAuth(){
      api.authOverlayCallback(true)
    },
    getEvents() {
      this.loading = true;
      api.events()
        .then((res) => {
          this.loading = false;
          if(api.user.roles.includes('admin')){
            this.adminView = true
          }
          this.loggedIn = true
          this.displayEvents(res.data);
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