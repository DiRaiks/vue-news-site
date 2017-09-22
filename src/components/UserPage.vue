<template>
  <div>

    <v-card>

      <div v-if="info && active===1" class="content">
        <img :src="getImgUrl(info.avatar)">

        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon class="indigo--text">L</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{info.login}}</v-list-tile-title>
              <v-list-tile-sub-title>Login</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon dark>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon class="indigo--text">N</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{info.name}}</v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon dark>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon class="indigo--text">S</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{info.surname}}</v-list-tile-title>
              <v-list-tile-sub-title>Surname</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon class="indigo--text">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{info.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Mail</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </div>

      <add-news v-if="admin && active===2" :info="getAuthor"></add-news>

      <view-user-news :admin="admin" v-if="token && active ===3" :id="id"></view-user-news>

      <change-pass v-if="admin && active ===4" :id="id"></change-pass>

      <v-bottom-nav
        shift
        :value="true"
        :active.sync="e2"
        :class="{
        'blue-grey': e2 === 1,
        'teal': e2 === 2,
        'brown': e2 === 3,
        'brown lighten-1': e2 === 4
      }"
      >
        <v-btn dark @click="changeMenu(1)">
          <span>Info</span>
          <v-icon>account_box</v-icon>
        </v-btn>
        <v-btn dark @click="changeMenu(2)" v-if="admin">
          <span>Add News</span>
          <v-icon>note_add</v-icon>
        </v-btn>
        <v-btn dark @click="changeMenu(3)">
          <span>News</span>
          <v-icon>book</v-icon>
        </v-btn>
        <v-btn dark @click="changeMenu(4)" v-if="admin">
          <span>Change Password</span>
          <v-icon>loop</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>

    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>


  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'
  import AddNews from './AddNews.vue'
  import ViewUserNews from './ViewUserNews.vue'
  import ChangePass from './ChangePass.vue'

  export default {
    components: {
      ChangePass,
      ViewUserNews,
      AddNews
    },
    name: 'user-page',
    props: ['id'],
    data () {
      return {
        e2: 0,
        active: null,
        info: null,
        error: null,
        loading: null,
        token: null,
        userId: null,
        admin: null
      }
    },
    watch: {
      'id': 'checkToken'
    },
    computed: {
      getAuthor: function () {
        if (this.info == null) return null
        return {
          author: this.info.name + ' ' + this.info.surname,
          id: this.info.id
        }
      }
    },
    created () {
      this.active = 1
      const token = localStorage.getItem('token')
      if (token) {
        const user = jwt.verify(token, 'somesecretkeyforjsonwebtoken')
        if (user.id === +this.id || user.id === 0) {
          this.admin = true
        } else {
          this.admin = false
        }
      }
      this.checkToken()
    },
    methods: {
      changeMenu (el) {
        this.active = el
      },
      getImgUrl (imgPath) {
        if (imgPath == null) {
          return require('../assets/UserImages/' + 'no-avatar.png')
        } else if (/http/.test(imgPath)) {
          return imgPath
        } else {
          return require('../assets/UserImages/' + imgPath)
        }
      },
      getUserFromToken: function () {
        this.error = this.info = null
        this.loading = true
        axios.get('/login/' + this.id)
          .then((response) => {
            this.loading = false
            const data = response.data
            this.info = data
          })
          .catch((err) => {
            this.loading = false
            this.error = err.toString()
          })
      },
      checkToken: function () {
        this.token = localStorage.getItem('token')
        if (!this.token) {
          this.$router.push({path: '/test'})
        } else {
          this.getUserFromToken()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom-nav {
    width: 98%
  }
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
