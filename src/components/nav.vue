<template>
    <div class="nav">
        <div class="nav_logo"><router-link to="/">[Logo]</router-link></div>
        <div class="nav_menu">
            <router-link to="/">home</router-link>
            <router-link to="/about">test</router-link>
        </div>
        <div class="nav_user"><h>[User Stuff]</h></div>
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
    }
    .nav_logo {
        width: 10%;
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