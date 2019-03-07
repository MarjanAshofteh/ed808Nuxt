<template>
  <!-- liked comment + author comment + bookmarked node + clap node -->
  <div>
    <div class="spinner-loading" v-if="spinner_loading">
      <md-progress-spinner :md-diameter="100" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="bookmarked_node md-layout" style="position: relative;margin: 0 -1%;">
        <NodeTeaser v-for="post in bookmarked_node.contents" :title="post.title" :pic="post.picture" :date="post.created" :nid="post.nid" />
    </div>
    <div class="clap_node md-layout" style="position: relative;margin: 0 -1%;">
      <NodeTeaser v-for="post in clap_node.contents" :title="post.title" :pic="post.picture" :date="post.created" :nid="post.nid" />
    </div>
  </div>
</template>

<script>
  import axios from "@/node_modules/axios"
  import NodeTeaser from "@/components/allContents/NodeTeaser";

  export default {
    name: "activity",
    components: {NodeTeaser},
    layout: 'userpanel',
    scrollToTop: true,
    data(){
      return {
        uid: this.$route.params.uid,
        bookmarked_node:[],
        clap_node:[],
        spinner_loading:true,
        page:''
      }
    },
    mounted(){
      this.bookmarkedNode()
    },
    methods:{
      bookmarkedNode(){
        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.get('https://ed808.com:92/latin/user/'+ this.uid + '/bookmark?parameter[page]='+ this.page +'&parameter[limits]=' + 10 ,
          {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then((data) => {
            this.bookmarked_node = data.data
            this.spinner_loading = false
          })
          .catch(e => {
            this.errors = e.response.data
          })
      },
      bookmarkedNode(){
        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.get('https://ed808.com:92/latin/user/'+ this.uid + '/favorite_content?parameter[page]='+ this.page +'&parameter[limits]=' + 10 ,
          {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then((data) => {
            this.clap_node = data.data
            this.spinner_loading = false
          })
          .catch(e => {
            this.errors = e.response.data
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bookmarked_node{
  }
</style>
