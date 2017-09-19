<template>
  <v-app id="app" toolbar footer dark>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      enable-resize-watcher
      absolute
      dark
    >
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
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Go to Registration/Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-else @click="logout">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="goNews">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Go to News</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="token" @click="goUser">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Go to User</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar  dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer dark>
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

  export default {
    name: 'app',
    data () {
      return {
        token: null,
        user: null,
        drawer: true
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
        this.$router.push({ path: '/' })
      },
      goRegistr () {
        this.$router.push({ path: '/test' })
      },
      goNews () {
        this.$router.push({ path: '/allnews' })
      },
      goUser () {
        this.$router.push({ path: '/user/' + this.user.id })
      },
      logout: function () {
        localStorage.clear('token')
        this.token = null
      },
      checkToken: function () {
        this.token = localStorage.getItem('token')
        if (this.token) {
          this.user = jwt.verify(this.token, 'somesecretkeyforjsonwebtoken')
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
