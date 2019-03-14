<template>
  <div>
    <md-content :class="'md-elevation-3 box ' + viewMode ">
      <div class="box-head" v-if="viewMode == 'minimal'" >
        <i class="mdi mdi-blogger md-icon"></i>
        <span class="item-text">Add Your Post</span>
      </div>
      <div class="box-text">
        <div id="editorClick" class="default-text box-row" v-if="!openEditor && (viewMode == 'minimal')" @click="openEditorfun()">
          Write Your Post to share it with the World. Just Click here ...
        </div>
        <div id="editor">
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
    mixins: [cookie],
    //Options are either 'wild' or 'minimal'
    props:['viewMode'],
    data() {
      return {
        postSaved:false,
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
      if(this.viewMode == 'minimal'){
        var el = document.getElementById('editor')
        el.style.height = "0px"
      }
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
        el.style.height = "395px"
        this.openEditor = true
        el.style.padding = "0px 20px 20px 20px"
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
        el.style.padding = "0px 20px";
        this.openEditor = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 27px 27px 0;
    transition: .3s cubic-bezier(.25, .8, .5, 1);

    &:hover .box-head .edit {
      opacity: 1;
    }

    .box-head {
      border-bottom: 1px solid #eee;
      min-height: 48px;
      padding: 4px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: padding .4s cubic-bezier(.25, .8, .25, 1);

      .md-icon:first-child {
        margin-right: 14px;
        margin-top: 7px;
      }

      .item-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        line-height: 1.25em;
        white-space: nowrap;
      }

      .edit {
        opacity: 0;
        transition: .3s cubic-bezier(.25, .8, .5, 1);
        margin: 0 -12px 0 0;

        .md-icon {
          margin: 0px !important;
        }
      }
    }

    .box-text {
      margin: 10px 0;
      font-size: 15px;

      .box-row {
        padding: 5px 25px;
      }

      .default-text {
        color: #BDBDBD;
      }

      .label {
        color: #888;
        font-size: 13px;
      }

      .box-edit {
        padding: 5px 25px;

        .md-field {
          margin-bottom: 9px;
        }

        .md-field.md-has-textarea {
          textarea {
            font-size: 16px !important;
          }

          &:not(.with-label) {
            padding: 7px 1px;
          }

          margin: 0;
        }
      }
    }
  }
  #editor{
    transition: all 0.9s ease-in-out;
    overflow: hidden;
    > * {
      //opacity: 0;
      //:0px;
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
  .box.minimal{
    min-width: 799px;
    width: 60%;
    margin-top: 28px;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    margin-right: 8px;
  }
</style>
