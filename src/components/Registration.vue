<template>
    <v-form v-model="valid" ref="form">
      <!--<label for="login"></label>-->
      <!--<input ref="login_input" id="login" type="text" placeholder="login">-->
      <v-text-field
        label="Login"
        v-model="login"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>

      <!--<label for="email"></label>-->
      <!--<input ref="email_input" id="email" type="email" placeholder="email">-->
      <v-text-field
        label="Email"
        v-model="email"
        :rules="emailRules"
        :counter="10"
        required
      ></v-text-field>

      <!--<label for="name"></label>-->
      <!--<input ref="name_input" id="name" type="text" placeholder="name">-->
      <v-text-field
        label="Name"
        v-model="name"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>

      <!--<label for="surname"></label>-->
      <!--<input ref="surname_input" id="surname" type="text" placeholder="surname">-->
      <v-text-field
        label="Surname"
        v-model="surname"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>

      <!--<label for="password"></label>-->
      <!--<input ref="password_input" id="password" type="password" placeholder="password">-->
      <v-text-field
        label="Password"
        v-model="password"
        :rules="nameRules"
        :counter="10"
        required
      ></v-text-field>

      <!--<input type="button" v-on:click="submitRegistration" value="Регистрация">-->
      <v-btn @click="submitRegistration" :class="{ green: valid, red: !valid }">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
      <div v-if="error">
        {{error}}
      </div>
      <div v-if="success">
        Registration Success, Go Login
      </div>
    </v-form>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'registration',
    data () {
      return {
        valid: false,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ],
        login: '',
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
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
      clear () {
        this.$refs.form.reset()
      },
      submitRegistration: function () {
//        this.login = this.$refs.form.login.value
//        this.email = this.$refs.email_input.value
//        this.name = this.$refs.name_input.value
//        this.surname = this.$refs.surname_input.value
//        this.password = this.$refs.password_input.value
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
