<template>
  <div class="events">
    <event
      subject="[Some subject]"
      time="[A time]"
      date="[A date]"
      location="[A place]"
      ><p>
        This is some place holder text because place holder text is cool. This
        text is so cool that it will just keep on going and going and going. It
        is soooo cool. I hope this text never ends. It is defently not here to
        test wrapping or any thing.
      </p></event
    >
  </div>
</template>
<script>
import event from "@/components/event.vue";
export default {
  components: {
    event,
  },
  name: "events",
  created: function () {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open("GET", "http://172.17.24.253:8081/meetings", true);
    request.withCredentials = true;

    request.onload = function () {
      // Begin accessing JSON data here
    console.log('test');
      console.log(request.response)
    };

    // Send request
    request.send();
    console.log(request.status)
  },
};
</script>
<style lang="css">
</style>