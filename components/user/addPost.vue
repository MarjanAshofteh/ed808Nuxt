<template>
  <div>
    <md-content class="md-elevation-3 box" v-if="sameUser">
      <div class="box-head">
        <i class="mdi mdi-blogger md-icon"></i>
        <span class="item-text">Add Your Post</span>
      </div>
      <div class="box-text">
        <div id="editorClick" class="default-text box-row" v-if="!openEditor" @click="openEditorfun()">
          Write Your Post to share it with the World. Just Click here ...
        </div>
        <div id="editor" style="height: 0px;overflow: hidden;">
          <md-field class="title with-label">
            <label>Title</label>
            <md-input v-model="title"></md-input>
          </md-field>
          <VueEditor v-model="body" :editorToolbar="customToolbar"></VueEditor>
          <div class="buttons md-layout md-alignment-center-space-between">
            <div class="md-layout-item" style="flex:0;">
              <md-button class="md-raised green" @click="savePost()">Save</md-button>
            </div>
            <div class="md-layout-item" style="flex:0;">
              <md-button @click="cancleEditingThis()">Cancel</md-button>
            </div>
          </div>
          <div class="loading" v-if="updatefield">
            <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
          </div>
        </div>
      </div>
    </md-content>
    <md-snackbar :md-active.sync="postSaved">
      your New Post was saved successfully!
    </md-snackbar>
  </div>
</template>

<script>
  import axios from "@/node_modules/axios"
  import { cookie } from '@/components/mixins/cookie.js'

  export default {
    name: "addPost",
    props:['uid'],
    mixins: [cookie],
    data() {
      return {
        postSaved:false,
        sameUser:true,
        title:'',
        body:'',
        image:'',
        openEditor:false,
        updatefield:false,
        content: '<h1>Some initial content</h1>',
        time:'',
        customToolbar: [
          [{ 'header': '1'},{ 'header': '2'}],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          //['image', 'code-block'],
          ['blockquote'],
          ['clean']
        ]
      }
    },
    mounted(){
      this.isSameUser()
    },
    methods:{
      savePost(){
        //start loading for fields
        this.updateField = true
        //create data with field that was changed
        var data = {
          "title": this.title,
          "body": this.body
        }
        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.post('https://ed808.com:92/latin/contents',
        data,
        {
          headers: {
            'Content-type': 'application/json',
            'X-CSRF-Token' : this.getCookie("token")
          }
        })
        .then((data) => {
          this.postSaved = true
          //start loading for fields
          this.updateField = false
          this.cancleEditingThis()
          this.$emit('updateposts')
          this.title = ''
          this.body = ''
        })
        .catch(e => {
          if(e.hasOwnProperty('response')){
            if(e.response.hasOwnProperty('data'))
              this.errors = e.response.data
            else{
              this.errors = e.response
            }
          }
          else{
            this.errors = e
          }
          this.showError = true
        })
      },
      openEditorfun(){
        var el = document.getElementById('editor')
        //convert .children object to an array
        var child_array = Array.from(el.children)
        child_array.forEach(element => {
          element.style.opacity = "1"
          element.style.height = "initial"
        })
        el.style.height = "395px"
        this.openEditor = true
        el.style.padding = "0px 20px 20px 20px"
        //document.getElementsByClassName('box-text').style.margin = "10px 0px 0px 0px"
        this.time = setTimeout(function(){
          el.style.height = "initial"
        }, 3000);
      },
      cancleEditingThis(){
        //stop loading for fields
        this.updateField = false

        clearTimeout(this.time)
        var el = document.getElementById('editor');
        document.getElementById('editor').style.height = "0px";

        //convert .children object to an array
        var child_array = Array.from(el.children)
        child_array.forEach(element => {
          //element.style.opacity = "0"
          //element.style.height = "0px"
        })
        //document.getElementsByClassName('box-text').style.margin = "10px 0px"
        el.style.padding = "0px 20px";
        this.openEditor = false
      },
      isSameUser(){
        if(this.$store.getters.getUid){
          if(this.$store.getters.getUid == this.uid)
            this.sameUser = true
          //console.log(this.sameUser)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  #editor{
    transition: all 0.9s ease-in-out;
    > * {
      opacity: 0;
      height:0px;
      transition: all 0.9s ease-in-out;
    }
    .title{
      input{
        width: 100%;
      }
    }
    .quillWrapper{
      text-align: left;
      margin: 30px auto 0px auto;
    }
    .buttons{
      margin-top: 10px;
    }
  }
  #editorClick{
    text-align: left;
  }
  .md-card{
    box-shadow: 0px -1px 5px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  button{
    margin: 6px 0 0 0;
    &.green{
      background-color: #4caf50 !important;
      color: white !important;
    }
  }
  .box{
    min-width: 760px;
    width: 60%;
    margin-top: 28px;
  }
</style>
