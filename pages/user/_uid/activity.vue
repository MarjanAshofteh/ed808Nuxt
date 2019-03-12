<template>
  <!-- bookmarked node + clap node + liked comment + author comment +  -->
  <div id="activity">

    <md-tabs>
      <md-tab id="tab-home" md-label="Bookmark" md-icon="turned_in">
        <div class="bookmarked_node md-layout" style="position: relative;margin: 0 -1%;">
          <NodeTeaser v-for="post in bookmarked_node.contents" :title="post.title" :pic="post.picture" :date="post.created" :nid="post.nid" />
        </div>
      </md-tab>
      <md-tab id="tab-pages" md-label="clap" md-icon="stars">
        <div class="clap_node md-layout" style="position: relative;margin: 0 -1%;">
          <NodeTeaser v-for="post in clap_node.contents" :title="post.title" :pic="post.picture" :date="post.created" :nid="post.nid" />
        </div>
      </md-tab>
      <md-tab id="tab-favorites" md-label="comment" md-icon="mode_comment"></md-tab>
      <md-tab id="tab-posts" md-label="Favorite" md-icon="favorite"></md-tab>
    </md-tabs>

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
      this.clappedNode()
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
      clappedNode(){
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

<style lang="scss">
  #activity{
    .md-tabs.md-theme-default .md-tabs-navigation .md-button {
      width: 100px;
      height: 104px;
      border-radius: 5px;
      margin: 5px;
      &.md-active {
        background-color: #4caf50 !important;
        -webkit-box-shadow: 0 12px 20px -10px rgba(76, 175, 80, .28), 0 4px 20px 0 rgba(0, 0, 0, .12), 0 7px 8px -5px rgba(76, 175, 80, .2);
        box-shadow: 0 12px 20px -10px rgba(76, 175, 80, .28), 0 4px 20px 0 rgba(0, 0, 0, .12), 0 7px 8px -5px rgba(76, 175, 80, .2);

        * {
          color: white !important;
        }
      }
    }
    .md-tabs.md-theme-default .md-tabs-navigation .md-button:not(.md-active):hover {
      background-color: hsla(0, 0%, 78%, .2) !important;
    }
    .md-tabs-navigation .md-icon-label .md-tab-icon+.md-tab-label {
      margin-top: 15px;
    }
    .md-tabs-indicator{
      display: none;
    }
  }

</style>
