<template>
    <div class="nav">
        <div class="nav_logo"><router-link to="/">{SNEC}</router-link></div>
        <div class="nav_menu">
            <router-link to="/events">Events</router-link>
            <router-link to="/about">About</router-link>
        </div>
        <div class="nav_user"><user /></div>
    </div>
</template>
<script>
import user from './user.vue'
export default {
    components: {
        user
    }
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
        width: 20%;
        display: flex;
        justify-content: flex-start;
        padding-left: 10px
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
        width: 20%;
        display: flex;
        justify-content: flex-end;
        padding-right: 10px
    }
</style>