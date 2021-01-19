<template>
  <div class="eventItem layoutUI">
    <h1 class="eventItem_subject special">{{ subject }}</h1>
    <div>
      <div class="eventItem_desAtt">
        <div class="eventItem_description"><slot /></div>
        <div class="eventItem_peerList">
            <tag v-for="peer in peers" :key="peer._id" :edit="!admin" @remove="removeUser(peer._id)">
              {{ peer.username }}
            </tag>
        </div>
      </div>
      <ul class="eventItem_infoList">
        <li>Date: {{ date.toLocaleDateString() }}</li>
        <li>Time: {{ date.toLocaleTimeString() }}</li>
        <li>Location: {{ location }}</li>
        <li>
          <button class="eventItem_join" v-if="!joined" @click="join()">
            Join
            <div class="loading_button" v-if="loading">
              <loading-animation />
            </div>
          </button>
        </li>
        <li>
          <button class="eventItem_cancel" v-if="joined" @click="cancel()">
            Cancel
            <div class="loading_button" v-if="loading">
              <loading-animation />
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const api = require("../apiFunctions");
import loadingAnimation from "./loadingAnimation.vue";
import tag from "./tag.vue";

export default {
  props: {
    subject: String,
    date: Date,
    location: String,
    id: String,
    attendees: Array,
    admin: Boolean
  },
  name: "eventItem",
  data() {
    return {
      joined: false,
      loading: false,
      peers: []
    };
  },
  components: {
    loadingAnimation,
    tag
  },
  mounted(){
    this.joined = this.$props.attendees.some(item => item._id == api.user._id)
    this.peers = this.attendees

  },
  methods: {
    join() {
      if (this.loading || this.joined) return;
      this.loading = true;
      api.event.join(this.$props.id)
        .then((res) => {
          if (res.status == 200) {
            this.joined = true;
            this.loading = false;
            this.peers.push({_id: api.user._id, username: api.user.username})
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    cancel() {
      if (this.loading || !this.joined) return;
      this.loading = true;
      api.event.cancel(this.$props.id)
        .then((res) => {
          if (res.status == 200) {
            this.joined = false;
            this.loading = false;
            this.peers = this.peers.filter(e => e._id !== api.user._id)
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    removeUser(userId) {
      api.event.removeUser(this.$props.id, userId)
        .then(() => {
          this.peers = this.peers.filter(e => e._id !== userId)
          if(userId == api.user._id) this.joined = false;
        })
    }
  },
};
</script>
<style lang="css">
.eventItem {
  margin: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.eventItem > div {
  display: flex;
  justify-content: space-between;
}
.eventItem_infoList {
  list-style-type: none;
  text-align: left;
  white-space: nowrap;
}
.eventItem_infoList > li {
  margin: 10px 0;
}
.eventItem_subject {
  text-align: left;
  margin: 0 0 0 10px;
}
.eventItem_description {
  flex: 1;
}
.eventItem_desAtt {
  display: flex;
  flex-flow: column;
  flex: 1;
}
.eventItem_join {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  width: 140px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  position: relative;
  outline: none;
}
.eventItem p {
  text-align: left;
}
.eventItem_cancel {
  background-color: rgb(255, 86, 86);
  border: none;
  color: white;
  padding: 15px 32px;
  width: 140px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  position: relative;
  outline: none;
}
.loading_button {
  position: absolute;
  margin: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.eventItem_peerList {
  display: flex;
  flex-flow: row;
  margin: 10px;
}
</style>