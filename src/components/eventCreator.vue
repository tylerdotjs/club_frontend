<template>
  <div class="eventCreator">
    <form @submit.prevent="create()">
      <input
        type="text"
        name="subject"
        id="ec_subject"
        placeholder="Subject"
        required
        v-model="subject"
      />
      <div>
        <textarea
          name="description"
          id="ec-descripton"
          cols="160"
          rows="10"
          v-model="description"
          required
        ></textarea>
        <ul class="ec_infoList">
          <li>
            <input
              type="datetime-local"
              name="datetime"
              id="ec_datetime"
              required
              v-model="date"
            />
          </li>
          <li>
            <input
              type="text"
              name="location"
              id="ec_location"
              placeholder="Location"
              v-model="location"
            />
          </li>
          <li>
            <button type="submit" class="submit" id="ec_submit">
              Create
              <div class="loading_button" v-if="loading">
                <loading-animation />
              </div>
            </button>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import loadingAnimation from "./loadingAnimation.vue";
const api = require("../apiFunctions");
export default {
  name: "eventCreator",
  components: {
    loadingAnimation,
  },
  data() {
    return {
      subject: null,
      description: null,
      location: null,
      date: null,
      loading: false,
    };
  },
  methods: {
    create() {
      console.log(this)
      this.loading = true
      api
        .createEvent(this.subject, this.description, this.location, this.date)
        .then(() => {
          this.loading = false
          this.subject = null
          this.description = null
          this.location = null
          this.date = null
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style>
.eventCreator {
  background: lightgrey;
  margin: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px grey;
}
.eventCreator > form > div {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
}
.ec_infoList {
  min-width: 10%;
  list-style-type: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.ec_infoList > li {
  margin: 10px 0;
  width: 100%;
}
.ec_infoList > li > * {
  background: rgb(197, 197, 197);
  border: none;
  height: 30px;
  width: 100%;
}
#ec_subject {
  background: rgb(197, 197, 197);
  border: none;
  height: 30px;
  width: 100%;
}
#ec_description {
  flex: 1;
  vertical-align: top;
}
.eventCreator p {
  text-align: left;
}
#ec_submit {
  background: #add8e6;
  position: relative;
}
#ec_submit:hover {
  background: #b4d9e6;
}
.ec_loading {
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
</style>