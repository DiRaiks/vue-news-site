<template>
  <form>
    <label for="login_login"></label>
    <input ref="login_input" type="text" id="login_login" placeholder="login">

    <label for="password_login"></label>
    <input ref="password_input" type="password" id="password_login" placeholder="password">

    <input type="submit" v-on:click="submitLogin" value="Логин">
    <p>Form: {{login}} {{password}} token: {{token}}</p>
    <div v-if="error">
      {{error}}
    </div>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'login',
    data () {
      return {
        login: '',
        password: '',
        error: null,
        token: null
      }
    },
    methods: {
      submitLogin: function () {
        this.login = this.$refs.login_input.value
        this.password = this.$refs.password_input.value
        const body = {
          login: this.login,
          password: this.password
        }
        axios.post('/login', body)
          .then((response) => {
            this.token = response.data.token
            localStorage.setItem('token', this.token)
            this.$router.push({ path: '/allnews' })
          })
          .catch((err) => {
            this.loading = false
            this.error = err.toString()
          })
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
