<template>
  <div id="app">
    <router-view>
    </router-view>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue';
  export default {
    name: 'App',
    components:{
      Tab
    },
  }
</script>

<style>
  #app{
    height: 100%;
    background-color: rgb(238, 238, 238);
  }
</style>
