<template>

        <v-btn
          class="btn--dark-flat-focused jbtn-file blue-grey"
          :loading="loading"
          :disabled="loading"
          :change="uploadImg"
        >
          Upload
          <input id="selectFile" type="file" v-on:change="uploadImg">
          <v-icon dark right>cloud_upload</v-icon>
        </v-btn>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'upload-img',
    props: ['id'],
    data () {
      return {
        error: null,
        loading: false,
        loader: null
      }
    },
    methods: {
      uploadImg (file) {
        /* loader */
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        /**/

        let data = new FormData()
        data.append('file', file.target.files[0])
        data.append('user', this.id)
        axios.post('/avatar', data)
          .then((res) => {
            this.success = true
            this[l] = false
            this.error = null
          })
          .catch(err => {
            this.error = err.toString()
            this[l] = false
          })
        this.loader = null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom-nav {
    width: 98%
  }

  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }

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
