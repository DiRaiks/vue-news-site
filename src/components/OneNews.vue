<template>
  <div class="news">

    <div v-for="item in news" class="one-news" :key="item.id">
      <div>Theme: {{item.theme}}</div>
      <div>Tag: {{item.tag}}</div>
      Author:
      <router-link :to="{ path: '/user/' + item.authorId }">{{item.author}}</router-link>
      <div>Text: {{item.text}}</div>
      <img :src="getImgUrl(item.newsImage)">
      <input
        type="button"
        v-if="admin"
        value="DELETE"
        v-on:click="deleteNews(item.id)">
    </div>

    <div v-if="error">
      {{error}}
    </div>

  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'one-news',
    props: ['news', 'admin'],
    data () {
      return {
        error: null
      }
    },
    methods: {
      getImgUrl (imgPath) {
        return require('../assets/NewsImages/' + imgPath)
      },
      deleteNews: function (id) {
        axios.delete('/news/' + id)
          .then((res) => {
            for (let i = 0; i < this.news.length; i++) {
              if (this.news[i].id === id) {
                this.news.splice(i, 1)
              }
            }
          })
          .catch((err) => {
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
    margin: 0;
  }

  img {
    width: 100px;
  }

  .news {
    text-align: left;
  }

  .one-news {
    border: 1px solid black;
    margin: 0 0 10px 0;
  }
</style>
