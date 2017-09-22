<template>

  <v-form v-model="valid" ref="form">

    <v-card-text>
      <span class="title">Change Password</span>

      <v-text-field
        label="Old Password"
        v-model="oldPass"
        :rules="passRules"
        :counter="6"
        required
        type="password"
      ></v-text-field>
      <v-text-field
        label="New Password"
        v-model="newPass"
        :rules="passRules"
        :counter="6"
        required
        type="password"
      ></v-text-field>
      <v-text-field
        label="Confirm Password"
        v-model="confPass"
        :rules="passConfRules"
        :counter="6"
        required
        type="password"
      ></v-text-field>
    </v-card-text>

    <v-btn
      secondary
      :loading="loading"
      :disabled="loading || !valid"
      @click="changePass"
      :class="{ green: valid }"
    >
      Change
      <v-icon dark right>check_circle</v-icon>
    </v-btn>

    <v-alert error value="error" v-if="error">
      {{error}}
    </v-alert>
    <v-alert success v-if="success" value="true">
      Change Success
    </v-alert>


  </v-form>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'change-pass',
    props: ['id'],
    data () {
      return {
        error: null,
        newPass: null,
        oldPass: null,
        confPass: null,
        passRules: [
          (v) => !!v || 'Password is required',
          (v) => v && v.length >= 6 || 'Password must be longer than 6 characters'
        ],
        passConfRules: [
          (v) => !!v || 'Password is required',
          (v) => v && v.length >= 6 || 'Password must be longer than 6 characters',
          (v) => v === this.newPass || 'Not Confirm!'
        ],
        success: null,
        valid: false,
        loading: false,
        loader: null
      }
    },
    methods: {
      changePass () {
        /* loader */
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        /**/

        const body = {
          password: this.oldPass,
          newPassword: this.newPass
        }
        axios.put('/login/' + this.id, body)
          .then((res) => {
            this.success = true
            this[l] = false
            this.error = null
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

</style>
