<template>
  <div>

    <v-btn
      class="btn--dark-flat-focused jbtn-file blue-grey"
      :loading="loading"
      :disabled="loading"
      :change="chooseImg"
    >
      Choose img
      <input id="selectFile" type="file" v-on:change="chooseImg">
      <v-icon dark right>cloud_upload</v-icon>
    </v-btn>
    <div v-if="avatar">
      <v-btn
        :disabled="valid"
        @click="uploadImg"
        class="cyan"
      >
        Upload
      </v-btn>
      <v-avatar
        :tile="true"
        size="200px"
        v-if="src"
      >
        <img :src="src">
      </v-avatar>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'upload-img',
    props: ['id', 'avatar'],
    data () {
      return {
        error: null,
        loading: false,
        loader: null,
        data: null,
        valid: true,
        src: ''
      }
    },
    methods: {
      chooseImg (file) {
        this.data = new FormData()
        this.data.append('file', file.target.files[0])
        this.data.append('user', this.id)
        this.valid = false
        this.src = URL.createObjectURL(file.target.files[0])
      },
      uploadImg (file) {
        /* loader */
        this.loader = 'loading'
        const l = this.loader
        this[l] = !this[l]
        /**/

        axios.post('/avatar', this.data)
          .then((res) => {
            this.success = true
            this[l] = false
            this.error = null
            this.valid = true
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
