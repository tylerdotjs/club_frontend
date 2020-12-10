<template>
  <div class="memberId">
    <div class="memberId_username"><slot /></div>
    <button v-if="!locked" class="memberId_remove" @click="onRemove()">X</button>
  </div>
</template>

<script>
export default {
  props: {
    locked: {
      type: Boolean
    },
    onRemove: {
      type: Function
    }
  }
}
</script>

<style>
  .memberId {
    background: #3cc3f0c7;
    display: flex;
    max-width: 100px;
    width: min-content;
    height: 20px;
    border-radius: 10px;
    color: #313535;
    font-size: 11px;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 10px;
  }
  .memberId_remove {
    width: 10px;
    height: 10px;
    border: none;
    padding: 0px;
    line-height: 1px;
    border-radius: 5px;
    background: none;
    font-size: 10px;
  }
  .memberId_remove:hover {
    background-color: rgba(211, 211, 211, 0.336);
  }
  .memberId_username {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>