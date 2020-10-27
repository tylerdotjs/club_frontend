<template>
  <navigation />
  <div id="content">
    <router-view/>
  </div>
  <div id="footer">
    <h1>Phone: 1+ (920) 343-6053‬</h1>
    <h1>Email: sneclubinfo@gmail.com</h1>
  </div>
</template>
<script>
import navigation from '@/components/nav.vue'
export default {
    components: {
        navigation
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
    background: lightgrey;
    display: flex;
    justify-content: space-around;
}
#footer * {
    font-size: 16px;
    color: grey;
}

</style>
