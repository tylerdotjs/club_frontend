<template>
  <div>
      <form method="POST" action="http://localhost:8081/join">
      <h2 class="form-signin-heading">Create Your Account</h2>
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

}
</script>

<style>

</style>