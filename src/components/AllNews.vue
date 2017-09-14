<template>
  <div>
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <one-news v-bind:news="post"></one-news>
    </div>

  </div>
</template>

<script>
  import OneNews from './OneNews.vue'
  import axios from 'axios'

  export default {
    components: {
      OneNews
    },
    name: 'all-news',
    data () {
      return {
        loading: false,
        post: null,
        error: null
      }
    },
    created () {
      // запрашиваем данные когда реактивное представление уже создано
      this.loadNews()
    },
    watch: {
      // в случае изменения маршрута запрашиваем данные вновь
      '$route': 'loadNews'
    },
    methods: {
      loadNews () {
        this.error = this.post = null
        this.loading = true
        axios.get('/news')
          .then((response) => {
            this.loading = false
            const data = response.data
            this.post = data
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

