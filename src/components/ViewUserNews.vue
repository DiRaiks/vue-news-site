<template>
  <div>

    <div v-if="error">
      {{error}}
    </div>

    <one-news v-bind:news="post" :admin="admin"></one-news>

  </div>
</template>

<script>
  import axios from 'axios'
  import OneNews from './OneNews.vue'

  export default {
    components: {OneNews},
    name: 'view-user-news',
    props: ['id', 'admin'],
    data () {
      return {
        loading: null,
        post: null,
        error: null
      }
    },
    created () {
      // запрашиваем данные когда реактивное представление уже создано
      this.loadNews()
    },
    methods: {
      loadNews () {
        this.error = this.post = null
        this.loading = true
        axios.get('/news/' + this.id)
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
