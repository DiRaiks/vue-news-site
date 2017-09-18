<template>
  <form>
    <label for="add_tag"></label>
    <input ref="tag" type="text" id="add_tag" placeholder="tag">

    <label for="add_theme"></label>
    <input ref="theme" type="text" id="add_theme" placeholder="theme">

    <label for="add_text"></label>
    <textarea ref="text" type="text" id="add_text" placeholder="text"></textarea>

    <input type="submit" v-on:click="addNews" value="Add">
    <div v-if="error">
      {{error}}
    </div>
    <div v-else-if="success">
      {{this.success}}
    </div>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'add-news',
    props: ['info'],
    data () {
      return {
        tag: null,
        author: null,
        theme: null,
        text: null,
        error: null,
        success: null
      }
    },
    methods: {
      addNews: function () {
        this.tag = this.$refs.tag.value
        this.theme = this.$refs.theme.value
        this.text = this.$refs.text.value
        const body = {
          tag: this.tag,
          theme: this.theme,
          text: this.text,
          author: this.info.author
        }
        axios.post('/news/' + this.info.id, body)
          .then((response) => {
            this.success = 'Success'
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
  }
</style>
