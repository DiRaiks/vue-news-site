<template>
  <div>

    <v-card dark>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="body-2 white--text">Add News</div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box dark label="Theme" v-model="theme"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box dark label="Tags" v-model="tag"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field box dark multi-line label="Text" v-model="text"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn
          :disabled="valid"
          @click="addNews"
        class="cyan"
        >
          Add
        </v-btn>
        <v-alert error value="error" v-if="error">
          {{error}}
        </v-alert>
        <v-alert success v-if="success" value="true">
          Success add
        </v-alert>
      </v-container>
    </v-card>

  </div>
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
        success: null,
        valid: false
      }
    },
    methods: {
      addNews: function () {
        const body = {
          tag: this.tag,
          theme: this.theme,
          text: this.text,
          author: this.info.author
        }
        axios.post('/news/' + this.info.id, body)
          .then((response) => {
            this.success = true
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
  /*}*/
</style>
