<template>
  <div>
      <auth Register :onSuccess='onSuccess' />
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