<template>
  <div class="overlay layoutUI" ref="overlay">
    <slot />
    <button class="overlay_exit" @click="$emit('exit')"/>
  </div>
</template>

<script>
export default {
    mounted(){
        window.addEventListener('click',  this.clickOff, 1)
    },
    unmounted(){
        window.removeEventListener('click', this.clickOff, 1)
    },
    methods:{
        clickOff(event){
            if (!this.$refs.overlay.contains(event.target)){
                this.$emit('exit')
            }
        }
    }
};
</script>

<style>
.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  padding: 25px 50px;
}
.overlay_exit {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  color: #b8b8b8;
  outline: none;
  padding: 0;
  width: 30px;
  height: 30px;
}
.overlay_exit::after,
.overlay_exit::before {
  position: absolute;
  width: 4px;
  height: 100%;
  background: grey;
  border-radius: 15px;
  top: 5%;
  left: calc(50% - 0.5px);
  content: " ";
}
.overlay_exit:hover::after,
.overlay_exit:hover::before {
  background: rgb(167, 167, 167);
}
.overlay_exit::before {
  transform: rotate(45deg);
}
.overlay_exit::after {
  transform: rotate(-45deg);
}
</style>