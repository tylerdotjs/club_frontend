<template>
  <div>
      <auth Register @success='onSuccess' @exit="$router.go(-1)" />
  </div>
</template>

<script>
import auth from '@/components/auth.vue'
export default {
    name: 'Register',
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