<template>
    <div class="events">
        <event subject="[Some subject]" time="[A time]" date="[A date]" location="[A place]"><p>This is some place holder text because place holder text is cool. This text is so cool that it will just keep on going and going and going. It is soooo cool. I hope this text never ends. It is defently not here to test wrapping or any thing.</p></event>
    </div>
</template>
<script>
import event from '@/components/event.vue'
export default {
    components: {
        event
    },
    name: "events",
}
</script>
<style lang="css">
    
</style>