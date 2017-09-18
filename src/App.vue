<template>
  <div id="app">
    <router-link to="/">Go to Home</router-link>
    <router-link v-if="!token" to="/test" >Go to Registration/Login</router-link>
    <a href="#" v-else v-on:click="logout" >Logout</a>
    <router-link to="/allnews">Go to News</router-link>
    <router-link to="/user" v-if="token">Go to User</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        token: null
      }
    },
    watch: {
      // в случае изменения маршрута запрашиваем данные вновь
      '$route': 'checkToken'
    },
    created () {
      // запрашиваем данные когда реактивное представление уже создано
      this.checkToken()
    },
    methods: {
      logout: function () {
        localStorage.clear('token')
        this.token = null
      },
      checkToken: function () {
        this.token = localStorage.getItem('token')
      }
    }
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
