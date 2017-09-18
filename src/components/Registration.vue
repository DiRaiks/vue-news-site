<template>
  <div>
    <form>
      <label for="login"></label>
      <input ref="login_input" id="login" type="text" placeholder="login">

      <label for="email"></label>
      <input ref="email_input" id="email" type="email" placeholder="email">

      <label for="name"></label>
      <input ref="name_input" id="name" type="text" placeholder="name">

      <label for="surname"></label>
      <input ref="surname_input" id="surname" type="text" placeholder="surname">

      <label for="password"></label>
      <input ref="password_input" id="password" type="password" placeholder="password">

      <input type="button" v-on:click="submitRegistration" value="Регистрация">
      <div v-if="error">
        {{error}}
      </div>
      <div v-if="success">
        Registration Success, Go Login
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'registration',
    data () {
      return {
        login: '',
        email: '',
        name: '',
        surname: '',
        password: '',
        token: null,
        error: null,
        success: null
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
        this.surname = this.$refs.surname_input.value
        this.password = this.$refs.password_input.value
        const body = {
          login: this.login,
          email: this.email,
          name: this.name,
          surname: this.surname,
          password: this.password
        }
        axios.post('/registr', body)
          .then((response) => {
//            this.token = response.data.token
//            localStorage.setItem('token', this.token)
//            this.$router.push({ path: '/allnews' })
            this.success = true
          })
          .catch((err) => {
            this.error = err.toString()
          })
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
