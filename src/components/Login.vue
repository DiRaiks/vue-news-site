<template>
  <v-form v-model="valid" ref="form">

    <v-text-field
      label="Login"
      v-model="login"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <!--<label for="login_login"></label>-->
    <!--<input ref="login_input" type="text" id="login_login" placeholder="login">-->

    <v-text-field
      label="Password"
      v-model="password"
      :rules="passwordRules"
      :counter="10"
      required
      type="password"
    ></v-text-field>
    <!--<label for="password_login"></label>-->
    <!--<input ref="password_input" type="password" id="password_login" placeholder="password">-->

    <v-btn
      secondary
      :loading="loading"
      :disabled="loading || !valid"
      @click="submitLogin"
    >
      Логин
      <v-icon dark right>check_circle</v-icon>
    </v-btn>
    <v-alert error value="error" v-if="error">
      {{error}}
    </v-alert>
    <v-alert success v-if="success" value="true">
      Registration Success, Go Login
    </v-alert>
  </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'login',
    data () {
      return {
        loader: null,
        loading: false,
        valid: false,
        login: '',
        password: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v && v.length >= 6 || 'Password must be longer than 6 characters'
        ],
        error: null,
        token: null,
        success: null
      }
    },
    methods: {
      submitLogin: function () {
        /* loader */
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        /**/

        const body = {
          login: this.login,
          password: this.password
        }
        axios.post('/login', body)
          .then((response) => {
            this.token = response.data.token
            localStorage.setItem('token', this.token)
            this.$router.push({path: '/allnews'})
            this.success = true
            this[l] = false
          })
          .catch((err) => {
            this.error = err.toString()
            this[l] = false
          })
        this.loader = null
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
