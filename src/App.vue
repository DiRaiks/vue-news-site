<template>
  <div id="app">
    <router-link to="/">Go to Home</router-link>
    <router-link to="/test">Go to Registration</router-link>
    <router-link to="/allnews">Go to News</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .router-link-exact-active {
    color: #ff0d00;
  }

  a {
    margin: 0 10px;
    color: #42b983;
  }

</style>
