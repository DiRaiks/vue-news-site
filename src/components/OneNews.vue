<template>
  <div class="news">
    <v-expansion-panel>
      <v-expansion-panel-content v-for="item in newNews" :key="item.id">
        <div slot="header">
          <div>Theme: {{item.theme}}</div>
          <div>Tag: {{item.tag}}</div>
          Author:
          <router-link :to="{ path: '/user/' + item.authorId }">{{item.author}}</router-link>
        </div>
        <v-btn
          type="button"
          v-if="admin"
          class="red"
          v-on:click="deleteNews(item.id)">DELETE</v-btn>
        <v-card>
          <v-card-text >{{item.text}}</v-card-text>
          <img :src="getImgUrl(item.newsImage)">
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <div class="text-xs-center">
      <v-pagination :length="pages" v-model="page" :total-visible="7"></v-pagination>
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
        error: null,
        page: 1,
        pages: 10,
        items: 5,
        newNews: null
      }
    },
    created () {
      this.pages = Math.ceil(this.news.length / this.items)
      this.newNews = this.news.slice((this.page - 1) * this.items, this.page * this.items)
    },
    watch: {
      page () {
        this.newNews = this.news.slice((this.page - 1) * this.items, this.page * this.items)
        this.pages = Math.ceil(this.news.length / this.items)
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
    /*margin: 0;*/
  /*}*/

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
