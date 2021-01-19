<template>
  <div>
      <auth @success='onSuccess' @exit="$router.go(-1)" />
  </div>
</template>

<script>
import auth from '@/components/auth.vue'
export default {
    name: 'Login',
    components: {
        auth
    },
    methods: {
        onSuccess() {
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>