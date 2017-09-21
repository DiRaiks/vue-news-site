<template>
  <div>
    <registration v-if="!login"></registration>
    <login v-else></login>
    <v-btn @click="changeButton" :class="{cyan: true}">{{valueButton}}</v-btn>
  </div>
</template>

<script>
  import Login from './Login.vue'
  import Registration from './Registration.vue'

  export default {
    components: {
      Registration,
      Login
    },
    name: 'reg-log-page',
    data () {
      return {
        login: false,
        valueButton: 'Go Логин'
      }
    },
//    watch: {
//      // в случае изменения маршрута запрашиваем данные вновь
//      '$route': 'checkToken'
//    },
    created () {
      this.checkToken()
    },
    methods: {
      changeButton: function () {
        this.login = !this.login
        if (this.login) {
          this.valueButton = 'Go Регистрация'
        } else {
          this.valueButton = 'Go Логин'
        }
      },
      checkToken: function () {
        this.token = localStorage.getItem('token')
        if (this.token) {
          this.$router.push({path: '/allnews'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*h1, h2 {*/
    /*font-weight: normal;*/
  /*}*/

  /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
  /*}*/

  /*li {*/
    /*display: inline-block;*/
    /*margin: 0 10px;*/
  /*}*/

  /*a {*/
    /*color: #42b983;*/
  /*}*/
</style>
