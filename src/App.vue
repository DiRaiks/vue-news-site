<template>
  <v-app id="app" toolbar footer dark>
    <v-navigation-drawer
      temporary
      v-model="drawer"
    absolute
    dark
    :mini-variant="mini"
    overflow
      disable-route-watcher
    >

    <v-list class="pa-1" v-if="user" >
      <v-list-tile v-if="mini" @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar v-if="info">
          <img :src="getImgUrl(info.avatar)"/>
        </v-list-tile-avatar>
        <v-list-tile-content v-if="info">
          <v-list-tile-title>{{this.info.surname}} {{this.info.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>


    <v-list dense>

      <v-list-tile @click="goHome">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Go to Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="!token" @click="goRegistr">
        <v-list-tile-action>
          <v-icon>
            input
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Go to Registration/Login</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-else @click="logout">
        <v-list-tile-action>
          <v-icon>clear</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="goNews">
        <v-list-tile-action>
          <v-icon>book</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Go to News</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="token" @click="goUser">
        <v-list-tile-action>
          <v-icon>account_box</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Go to User</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>News</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid >
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer dark v-if="currentPath!='user'">
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>


  <!--<a href="#" v-else v-on:click="logout">Logout</a>-->
  <!--<router-link to="/allnews">Go to News</router-link>-->
  <!--<router-link :to="{ path: '/user/' + this.user.id }" v-if="token">Go to User</router-link>-->
  <!--<router-view></router-view>-->
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'

  export default {
    name: 'app',
    data () {
      return {
        token: null,
        user: null,
        drawer: null,
        mini: false,
        right: null,
        info: null,
        currentPath: null
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
      goHome () {
        this.$router.push({path: '/'})
      },
      goRegistr () {
        this.$router.push({path: '/test'})
      },
      goNews () {
        this.$router.push({path: '/allnews'})
      },
      goUser () {
        this.$router.push({path: '/user/' + this.user.id})
      },
      logout: function () {
        localStorage.clear('token')
        this.token = null
        this.checkToken()
      },
      checkToken: function () {
        this.currentPath = this.$router.history.current.name
        this.token = localStorage.getItem('token')
        if (this.token) {
          this.user = jwt.verify(this.token, 'somesecretkeyforjsonwebtoken')
          axios.get('/login/' + this.user.id)
            .then((response) => {
              this.loading = false
              const data = response.data
              this.info = data
            })
            .catch((err) => {
              this.error = err.toString()
            })
        } else {
          this.user = null
        }
      },
      getImgUrl (imgPath) {
        if (imgPath == null) {
          return require('./assets/UserImages/' + 'no-avatar.png')
        } else if (/http/.test(imgPath)) {
          return imgPath
        } else {
          return require('./assets/UserImages/' + imgPath)
        }
      }
    }
  }
</script>

<style>
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/

  /*.router-link-exact-active {*/
  /*color: #ff0d00;*/
  /*}*/

  /*a {*/
  /*margin: 0 10px;*/
  /*color: #42b983;*/
  /*}*/

</style>
