<template>
    <div class="nav layoutUI">
        <div class="nav_logo special"><router-link to="/"><img src="@/assets/logo.svg" alt="LOGO"></router-link></div>
        <div class="nav_menu special">
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
        min-height: 50px;
        padding: 5px 0;
        align-items: center;
        justify-content: space-between;
    }
    .nav_logo {
        width: 20%;
        display: flex;
        justify-content: flex-start;
        padding-left: 10px
    }
    .nav_logo * {
        text-decoration: none;
        width: 50px;
        height: 50px;
    }
    .nav_menu {
        display: flex;
    }
    .nav_menu > a {
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