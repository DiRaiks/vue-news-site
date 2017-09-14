<template>
  <div>

    <div v-for="item in news">
      <div>Theme: {{item.theme}}</div>
      <div>Tag: {{item.tag}}</div>
      <a href="#">Author: {{item.author}}</a>
      <div>Text: {{item.text}}</div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'one-news',
    props: ['news']
//    data () {
//      return {
//      }
//    },
//    methods: {
//
//    }
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
