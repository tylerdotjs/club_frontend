<template>
  <div class="signIn">
    <form method="POST" action="http://172.17.24.253:8081/login">
      <h2 class="form-signin-heading">Please sign in</h2>
      <input
        class="form-control"
        type="text"
        required
        name="username"
        placeholder="Username"
      />
      <input
        class="form-control"
        type="password"
        required
        name="password"
        placeholder="Password"
      />
      <label class="checkbox"></label>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
export default {
};
</script>

<style>
</style>