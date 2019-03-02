<template>
  <div id="editor">
    <div class="md-card md-card-blog md-theme-default">
      <md-field class="with-label">
        <label>Title</label>
        <md-input v-model="title"></md-input>
      </md-field>
      <!--<md-field class="with-label" style="margin-bottom:24px;">
        <label>Body</label>
        <md-textarea v-model="body"></md-textarea>
      </md-field>-->
      <VueEditor v-model="body" :editorToolbar="customToolbar"></VueEditor>
      <div class="md-layout md-alignment-center-space-between">
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
      <div v-html="body"></div>
      <div>{{body}}</div>
  </div>
</template>

<script>
  //import { VueEditor } from 'vue2-editor'

  export default {
    name: "addPost",
    data() {
      return {
        title:'',
        body:'',
        image:'',
        updatefield:false,
        content: '<h1>Some initial content</h1>',
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['image', 'code-block'],
          ['blockquote']
        ]
      }
    },
    methods:{
      savePost(){},
      cancleEditingThis(){}
    },
    components:{
      //VueEditor
    }
  }
</script>

<style lang="scss" scoped>
  #editor{

    > div{
      padding: 15px;
      margin: 20px auto;
    }
  }
  button{
    margin: 6px 0 0 0;
    &.green{
      background-color: #4caf50 !important;
      color: white !important;
    }
  }
</style>
