<template>
  <div>
    <div class="loading" v-if="loading">
      <v-progress-circular indeterminate v-bind:size="100" class="primary--text"></v-progress-circular>
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
  .loading {
    text-align: center
  }
  .progress-circular {
    margin: 1rem
  }
</style>

