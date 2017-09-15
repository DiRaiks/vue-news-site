<template>
  <div>
    <login></login>
    <form>
      <label for="login"></label>
      <input ref="login_input" id="login" type="text" placeholder="login">

      <label for="email"></label>
      <input ref="email_input" id="email" type="email" placeholder="email">

      <label for="name"></label>
      <input ref="name_input" id="name" type="text" placeholder="name">

      <label for="password"></label>
      <input ref="password_input" id="password" type="password" placeholder="password">

      <input type="button" v-on:click="submitRegistration" value="Регистрация">
      <p>Form: {{login}} {{email}} {{name}} {{password}}</p>
    </form>
  </div>
</template>

<script>
  import Login from './Login.vue'

  export default {
    components: {Login},
    name: 'registration',
    data () {
      return {
        login: '',
        email: '',
        name: '',
        password: '',
        token: null
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
      submitRegistration: function () {
        this.login = this.$refs.login_input.value
        this.email = this.$refs.email_input.value
        this.name = this.$refs.name_input.value
        this.password = this.$refs.password_input.value
      },
      checkToken: function () {
        this.token = localStorage.getItem('token')
        if (this.token) {
          this.$router.push({ path: '/allnews' })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
