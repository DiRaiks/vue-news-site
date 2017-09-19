<template>
  <div>
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="info" class="content">
      login:<input type="text" :value="info.login" readonly>
      name:<input type="text" :value="info.name" readonly ref="name">
      surname:<input type="text" :value="info.surname" ref="surname" readonly>
      email:<input type="text" :value="info.email" readonly>
      password:<input type="password" :value="info.password" readonly>
      <img :src="getImgUrl(info.avatar)">
    </div>

    <add-news v-if="admin" :info="getAuthor"></add-news>

    <view-user-news :admin="admin" v-if="token" :id="id"></view-user-news>

  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'
  import AddNews from './AddNews.vue'
  import ViewUserNews from './ViewUserNews.vue'

  export default {
    components: {
      ViewUserNews,
      AddNews
    },
    name: 'user-page',
    props: ['id'],
    data () {
      return {
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
      const token = localStorage.getItem('token')
      const user = jwt.verify(token, 'somesecretkeyforjsonwebtoken')
      if (user.id === +this.id || user.id === 0) {
        this.admin = true
      } else {
        this.admin = false
      }
      this.checkToken()
    },
    methods: {
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
