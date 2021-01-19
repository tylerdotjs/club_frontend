<template>
  <div class="menuListEl exit">
    <button v-if="!edit" class="menuListEl_remove" @click="$emit('remove')"/>
    <div class="menuListEl_username"><slot /></div>
  </div>
</template>

<script>
export default {
  props: {
    edit: Boolean
  }
}
</script>

<style>
  .menuListEl {
    border: 1px solid #3cc3f0c7;
    display: flex;
    max-width: 100px;
    width: min-content;
    height: 20px;
    border-radius: 10px;
    font-size: 11px;
    align-items: center;
    padding: 0 5px;
    margin: 0 5px;
  }
  .menuListEl_remove {
    position: relative;
    width: 10px;
    height: 10px;
    color: transparent;
    border: none;
    padding: 0px;
    line-height: 50%;
    border-radius: 5px;
    background: #3cc3f0c7;
    font-size: 10px;
    margin-right: 5px;
    
  }
  .menuListEl_remove::after, .menuListEl_remove::before {
    position: absolute;
    width: 1px;
    height: 90%;
    background: transparent;
    border-radius: .5px;
    top: 5%;
    left: calc(50% - .5px);
    content: ' ';
  }
  .menuListEl_remove:hover::after, .menuListEl_remove:hover::before {
    background: white;
  }
  .menuListEl_remove::before {
    transform: rotate(45deg);
  }
  .menuListEl_remove::after {
    transform: rotate(-45deg);
  }
  .menuListEl_username {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>