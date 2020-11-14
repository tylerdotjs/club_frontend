<template>
    <div class="nav">
        <div class="nav_logo"><router-link to="/">{SNEC}</router-link></div>
        <div class="nav_menu">
            <router-link to="/events">Events</router-link>
            <router-link to="/about">About</router-link>
        </div>
        <div class="nav_user"><p>[User Stuff]</p></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="css">
    .nav {
        display: flex;
        width: 100%;
        height: 50px;
        background: lightgrey;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 1px 10px grey;
    }
    .nav_logo {
        width: 10%;
    }
    .nav_logo * {
        color: black;
        text-decoration: none;
    }
    .nav_menu {
        display: flex;
    }
    .nav_menu > a {
        color: black;
        text-decoration: none;
        margin: 10px;
    }
    .nav_menu > a:hover {
        color: grey;
    }
    .nav_menu > .router-link-exact-active {
        text-decoration: underline;
    }
    .nav_user {
        width: 10%;
    }
</style>