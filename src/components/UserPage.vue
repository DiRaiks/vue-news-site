<template>
  <div>

    <v-card>

      <div v-if="info && active===1" class="content">
        <v-avatar
          :tile="true"
          size="200px"
        >
          <img :src="getImgUrl(info.avatar)">
        </v-avatar>

        <upload-img :id="id" :avatar="true"></upload-img>

        <v-form v-model="valid" ref="form">
          <v-list two-line>
            <v-list-tile @click="editInfo(1)">
              <v-list-tile-action>
                <v-icon class="indigo--text">L</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-show="editLogin">
                <v-text-field
                  label="Login"
                  v-model="info.login"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
              </v-list-tile-content>
              <v-list-tile-content v-if="!editLogin">
                <v-list-tile-title>{{info.login}}</v-list-tile-title>
                <v-list-tile-sub-title>Login</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click="editInfo(2)">
              <v-list-tile-action>
                <v-icon class="indigo--text">N</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-show="editName">
                <v-text-field
                  label="Name"
                  v-model="info.name"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
              </v-list-tile-content>
              <v-list-tile-content v-if="!editName">
                <v-list-tile-title>{{info.name}}</v-list-tile-title>
                <v-list-tile-sub-title>Name</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click="editInfo(3)">
              <v-list-tile-action>
                <v-icon class="indigo--text">S</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-show="editSurname">
                <v-text-field
                  label="Surname"
                  v-model="info.surname"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
              </v-list-tile-content>
              <v-list-tile-content v-if="!editSurname">
                <v-list-tile-title>{{info.surname}}</v-list-tile-title>
                <v-list-tile-sub-title>Surname</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider inset></v-divider>

            <v-list-tile @click="editInfo(4)">
              <v-list-tile-action>
                <v-icon class="indigo--text">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-show="editEmail">
                <v-text-field
                  label="Login"
                  v-model="info.email"
                  :rules="emailRules"
                  :counter="10"
                  required
                ></v-text-field>
              </v-list-tile-content>
              <v-list-tile-content v-if="!editEmail">
                <v-list-tile-title>{{info.email}}</v-list-tile-title>
                <v-list-tile-sub-title>Mail</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>edit</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-btn
              secondary
              :loading="loading"
              :disabled="loading || !valid || !change"
              @click="saveChange"
              :class="{ green: valid }"
            >
              Save
              <v-icon dark right>check_circle</v-icon>
            </v-btn>
            <v-btn
              secondary
              @click="cancelInfo"
              class="red"
            >
              Cancel
              <v-icon dark right>cancel</v-icon>
            </v-btn>

          </v-list>
          <v-alert error value="error" v-if="error">
            {{error}}
          </v-alert>
          <v-alert success v-if="success" value="true">
            Change Success
          </v-alert>
        </v-form>
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
  import UploadImg from './UploadImg.vue'

  export default {
    components: {
      UploadImg,
      ChangePass,
      ViewUserNews,
      AddNews
    },
    name: 'user-page',
    props: ['id'],
    data () {
      return {
        change: false,
        success: null,
        e2: 0,
        active: null,
        info: null,
        error: null,
        loading: false,
        loader: null,
        token: null,
        userId: null,
        admin: null,
        editLogin: null,
        editName: null,
        editSurname: null,
        editEmail: null,
        valid: false,
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
        ]
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
      saveChange () {
        /* loader */
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        /**/

        const body = {
          login: this.info.login,
          name: this.info.name,
          surname: this.info.surname,
          email: this.info.email,
          newPassword: 0
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
      },
      cancelInfo () {
        this.change = false
        this.editLogin = false
        this.editName = false
        this.editSurname = false
        this.editEmail = false
      },
      editInfo (num) {
        this.change = true
        this.editLogin = false
        this.editName = false
        this.editSurname = false
        this.editEmail = false
        num === 1 ? this.editLogin = true : num === 2 ? this.editName = true
          : num === 3 ? this.editSurname = true : num === 4 ? this.editEmail = true
            : this.editEmail = false
      },
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
    width: 98%;
  }

  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
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
