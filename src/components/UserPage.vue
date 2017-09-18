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
      name:<input type="text" :value="info.name" readonly>
      surname:<input type="text" :value="info.surname" readonly>
      email:<input type="text" :value="info.email" readonly>
      password:<input type="password" :value="info.password" readonly>
      <img :src="getImgUrl(info.avatar)">
    </div>

  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import axios from 'axios'

  export default {
    name: 'user-page',
    data () {
      return {
        info: null,
        error: null,
        loading: null
      }
    },
//    watch: {
//      // в случае изменения маршрута запрашиваем данные вновь
//      '$route': 'checkToken'
//    },
    created () {
      this.getUserFromToken()
    },
    methods: {
      getImgUrl (imgPath) {
        if (imgPath == null) {
          return require('../assets/UserImages/' + 'no-avatar.png')
        } else {
          return require('../assets/UserImages/' + imgPath)
        }
      },
      getUserFromToken: function () {
        const token = localStorage.getItem('token')
        const userId = jwt.verify(token, 'somesecretkeyforjsonwebtoken')

        this.error = this.info = null
        this.loading = true
        axios.get('/login/' + userId.id)
          .then((response) => {
            this.loading = false
            const data = response.data
            this.info = data
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
