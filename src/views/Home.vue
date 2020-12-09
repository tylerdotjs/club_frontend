<template>
  <div class="home">
    <h1 class="special">Welcome to Some Nameless Engineering Club</h1>
    <p>Create an account and join in on the fun!</p>
    <router-link class="attention" to="/register">Create Account!</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
<style lang="css">
    .home > h1 {
        font-size: 200%;
    }
    .home {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        width: 100%;
        flex-direction: column;
    }
    .home > a {
        width: 200px;
        border: none;
        padding: 10px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: bold;
    }
</style>