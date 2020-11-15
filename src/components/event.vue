<template>
  <div class="eventItem">
    <h1 class="eventItem_subject">{{ subject }}</h1>
    <div>
      <slot class="eventItem_description"></slot>
      <ul class="eventItem_infoList">
        <li>Date: {{ date }}</li>
        <li>Time: {{ time }}</li>
        <li>Location: {{ location }}</li>
        <li><button class="eventItem_join" v-if="!joined" @click="join()">Join</button></li>
        <li><button class="eventItem_cancel" v-if="joined" @click="cancel()">Cancel</button></li>
      </ul>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
const qs = require("qs");
export default {
  props: ["subject", "date", "time", "location", "id", "attending"],
  name: "eventItem",
  data() {
    return {
      joined: this.$props.attending,
      loading: false
    };
  },
  methods: {
    join() {
      if(this.loading || this.joined) return
      this.loading = true
      axios({
        url: `http://${window.location.hostname}:8080/events/join`,
        method: "POST",
        data: qs.stringify({
          id: this.$props.id,
        }),
        withCredentials: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        if(res.status ==  200){
          this.joined = true
          this.loading = false
        }
        console.log(res);
      })
      .catch(err => {
          throw err
      })
    },
    cancel() {
      if(this.loading || !this.joined) return
      this.loading = true
      axios({
        url: `http://${window.location.hostname}:8080/events/cancel`,
        method: "POST",
        data: qs.stringify({
          id: this.$props.id,
        }),
        withCredentials: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        if(res.status ==  200){
          this.joined = false
          this.loading = false
        }
        console.log(res);
      })
      .catch(err => {
          throw err
      })
    }
  },
};
</script>
<style lang="css">
.eventItem {
  background: lightgrey;
  margin: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px grey;
}
.eventItem > div {
  display: flex;
  justify-content: space-between;
}
.eventItem_infoList {
  min-width: 10%;
  list-style-type: none;
  text-align: left;
}
.eventItem_infoList > li {
  margin: 10px 0;
}
.eventItem_subject {
  text-align: left;
  margin: 0 0 0 10px;
}
.eventItem_join {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.eventItem p {
  text-align: left;
}
.eventItem_cancel {
  background-color: rgb(255, 86, 86);
  border: none;
  color: white;
  padding: 15px 32px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>