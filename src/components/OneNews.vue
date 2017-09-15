<template>
  <div class="news">

    <div v-for="item in news" class="one-news">
      <div>Theme: {{item.theme}}</div>
      <div>Tag: {{item.tag}}</div>
      <a href="#">Author: {{item.author}}</a>
      <div>Text: {{item.text}}</div>
      <img :src="getImgUrl(item.newsImage)">
    </div>

  </div>

</template>

<script>
  export default {
    name: 'one-news',
    props: ['news'],
//    data () {
//      return {
//      }
//    },
    methods: {
      getImgUrl (imgPath) {
        return require('../assets/NewsImages/' + imgPath)
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
