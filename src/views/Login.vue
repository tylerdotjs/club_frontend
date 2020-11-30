<template>
  <div>
      <auth :onSuccess='onSuccess'/>
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