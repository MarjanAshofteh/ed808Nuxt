<template>
  <!-- user posts + Personal user info without edit -->
  <div>

    <div class="profile-brief">
      <h3 class="title" v-if="user.full_name">
        {{ user.full_name }}
      </h3>
      <div v-if="!sameUser && user.full_name">
        <button
          v-if="!sameUser"
          class="md-follow"
          :class="user.user_follow ? 'active' : ''"
          @click="follow(user.user_follow, uid)"
        >
          {{ user.user_follow ? 'Following' : 'Follow' }}
        </button>
      </div>
      <h6 v-if="user.job">
        {{  user.job  }}
      </h6>
      <div
        v-if="user.about"
        class="description text-center"
        v-html="user.about"
      >

      </div>
    </div>
    <div style="margin-top: 59px;">
      <md-icon class="md-size-2x">layers</md-icon>
      <h1 v-if="spinner_loading" style="margin-top: 12px;">Posts</h1>
      <addPost @updateposts="getPosts" v-if="sameUser" viewMode="minimal"></addPost>
      <div class="posts">
        <div class="spinner-loading" v-if="spinner_loading">
          <md-progress-spinner :md-diameter="100" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div class="description text-center" v-if="count == 0">
          No posts!
          <br>
          Share your experience with you colleagues by writing posts.
        </div>
        <div v-for="post in posts"  class="md-card md-card-blog md-theme-default" v-else>
          <md-badge class="md-square" md-content="Unpublished" v-if="post.status == 0" style="top: 5px;right: 5px;" />
          <div class="md-card-header md-card-header-image" v-if="post.picture">
            <a :href="'/node/'+ post.nid">
              <img :src="post.picture" class="img">
            </a>
            <div data-v-c79ac4a2="" class="colored-shadow" :style="'background-image: url('+ post.picture +');opacity: 1;'"></div>
          </div>
          <div class="md-card-content">
            <h6 class="card-category text-info">{{post.topic_name}}</h6>
            <h4 class="card-title">
              <a :href="'/node/'+ post.nid">{{post.title}}</a>
            </h4>
            <p v-html="body_minimizer(post.body)" class="card-description">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "@/node_modules/axios"
  import addPost from "@/components/user/addPost"
  import { cookie } from "@/components/mixins/cookie.js";

  export default {
    name: "posts",
    layout:'userpanel',
    mixins: [cookie],
    scrollToTop: true,
    head(){
      return {
        title: this.user.full_name
      }
    },
    data() {
      return {
        uid: this.$route.params.uid,
        user: {},
        posts:[],
        brief:{},
        sameUser:false,
        number_of_post:'',
        page:0,
        count:0,
        posts_copy:{},
        spinner_loading:true
      }
    },
    components:{
      addPost
    },
    async asyncData({params, req, query}){
      let cookie = '';
      if ( req && req.headers && req.headers.cookie) {
        cookie = req.headers.cookie
      }
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials  = true;
      try {
        let {data} = await axios.get('https://ed808.com:92/latin/user/'+ params.uid,
          {
            headers: {
              'Content-type': 'application/json',
              'Cookie' : cookie
            }
          })

        return {
          user: data
        }
      }
      catch (e) {

      }

    },
    mounted(){
      // console.log(this.user)
      // this.$store.state.userBackground = this.user.hasOwnProperty('background_image') ? this.user.background_image : '/images/city-profile.jpg'
      // this.$store.state.userImage = this.user.hasOwnProperty('picture') ? this.user.picture : '/images/avatar.png'
      this.isSameUser()
      // console.log(this.following)
      /*
      * @todo: add getProfile here and showing it aside posts
      */
      this.getPosts()
    },
    methods:{
      body_minimizer(str){
        if(str) return str.replace(/<(?:.|\n)*?>/gm, '').slice(0,300).concat('<a :href="\'/node/\'+ post.nid" style="cursor: pointer;">... Read More</a>')
        else return ''
      },
      follow(following, uid) {
        if(!this.$store.getters.getUid){
          console.log('not logged in')
          console.log(this.$store)
          this.$store.commit('TOGGLE_LOGIN')
        }else {
          axios.defaults.crossDomain = true;
          axios.defaults.withCredentials = true;
          axios
            .post(
              "https://ed808.com:92/latin/user/" + uid + "/follow",
              {
                action: following ? "unfollow" : "follow"
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-Token": this.getCookie("token"),
                  'Cache-Control': 'no-cache',
                }
              }
            )
            .then(() => {
              console.log("sent");
              this.user.user_follow = !this.user_follow;
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      getPosts(){
        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.get('https://ed808.com:92/latin/user/'+ this.uid + '/posts?parameter[page]='+ this.page +'&parameter[limits]=' + 10 + '&parameter[publish]=0',
          {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then((data) => {
            this.posts = data.data.posts
            this.count = data.data.count
            this.brief = data.data.brief
            this.spinner_loading = false
            this.posts_copy = Object.assign({}, this.posts)
          })
          .catch(e => {
            this.errors = e.response.data
          })
      },
      isSameUser(){
        if(this.$store.getters.getUid){
          if(this.$store.getters.getUid == this.uid)
            this.sameUser = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile-brief{
    margin-top: -67px ;
  }
  h3.title{
    margin-top: 30px;
    margin-bottom: 25px;
    min-height: 32px;
    font-weight: 700;
    font-family: Roboto Slab,Times New Roman,serif;
  }
  h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .description {
    margin: 15px auto 0 !important;
    max-width: 600px;
  }
  .h6, h6 {
    font-size: .75rem;
    text-transform: uppercase;
    font-weight: 500;
  }
  .h3, h3 {
    font-size: 1.5625rem;
    line-height: 1.4em;
  }
  .md-card {
    max-width: 800px;
    text-align: left;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: .875rem;
    position: relative;
    width: 100%;
    margin: 30px 0;
    overflow: unset;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 6px;
    color: rgba(0,0,0,.87);
    background: #fff
  }
  .text-info {
    color: #00bcd4!important;
  }
  .posts{
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .card-title, .card-title a, .card-title a:focus, .card-title a:hover, .comment .comment-heading, .comment .comment-heading a, .comment .comment-heading a:focus, .comment .comment-heading a:hover, .footer-big h4, .footer-big h4 a, .footer-big h4 a:focus, .footer-big h4 a:hover, .footer-big h5, .footer-big h5 a, .footer-big h5 a:focus, .footer-big h5 a:hover, .footer-brand, .footer-brand a, .footer-brand a:focus, .footer-brand a:hover, .info-title, .info-title a, .info-title a:focus, .info-title a:hover, .title, .title a, .title a:focus, .title a:hover {
    color: #3c4858!important;
    text-decoration: none;
  }
  .card-title, .comment .comment-heading, .footer-big h4, .footer-big h5, .footer-brand, .info-title, .title {
    font-family: Roboto Slab,Times New Roman,serif;
  }
  h4{
    font-size: 18px;
    margin:10px 0;
    font-weight: normal;
  }
  h6 {
    /*font-size: .75rem;*/
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    margin:10px 0;
  }
  .card-description, .description, .footer-big p {
    color: #999;
    font-size: 14px;
    margin: 0 0 10px;
  }
  .md-card.row-space .header {
    padding: 15px 20px 0
  }

  .md-card .card-title {
    margin-top: .625rem
  }

  .md-card .card-category-social .fa,.md-card .card-category-social .fab,.md-card .card-category-social .far,.md-card .card-category-social .fas,.md-card .card-category-social .md-icon {
    font-size: 24px;
    position: relative;
    margin-top: -4px;
    top: 2px;
    margin-right: 5px
  }

  .md-card .card-category-social .md-icon {
    margin-top: -7px;
    color: inherit
  }

  .md-card .card-title:last-child {
    margin-bottom: 0
  }

  .md-card[class*=bg-] .author a,.md-card[class*=bg-] .card-category:not([class*=text-]),.md-card[class*=bg-] .card-description,.md-card[class*=bg-] .card-title small,.md-card[class*=bg-] .stats,.md-card[class*=bg-] .stats .md-icon:not(.md-icon-button),.md-card [class*=md-card-header-] .author a,.md-card [class*=md-card-header-] .card-category,.md-card [class*=md-card-header-] .card-description,.md-card [class*=md-card-header-] .stats {
    color: hsla(0,0%,100%,.8)!important
  }

  .md-card[class*=bg-] .card-title,.md-card[class*=bg-] .card-title a,.md-card[class*=bg-] .icon:not([class*=icon-]) i {
    color: #fff!important
  }

  .md-card[class*=bg-] .icon:not([class*=icon-]) i,.md-card [class*=md-card-header-] .icon i {
    border-color: hsla(0,0%,100%,.25)!important
  }

  .md-card.md-card-form-horizontal .md-field {
    margin: 0;
    padding-top: 0
  }

  .md-card.md-card-form-horizontal .md-card-content {
    padding-left: 15px;
    padding-right: 15px
  }

  .md-card.md-card-form-horizontal .md-button {
    margin: 0
  }

  .md-card .title {
    margin-top: 0;
    margin-bottom: 5px
  }

  .md-card .card-image {
    height: 60%;
    position: relative;
    overflow: hidden;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -30px;
    border-radius: 6px
  }

  .md-card .card-image img {
    width: 100%;
    height: 200px;
    border-radius: 6px;
    pointer-events: none
  }

  .md-card .card-image .card-title {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff;
    font-size: 1.125rem;
    text-shadow: 0 2px 5px rgba(33,33,33,.5)
  }

  .md-card .category:not([class*=text-]) {
    color: #999
  }

  .md-card .md-card-content {
    padding: .9375rem 1.875rem;
    line-height: inherit
  }

  .md-card .md-card-content .category {
    margin: 0
  }

  .md-card .md-card-header {
    margin: -40px 20px 0;
    border-radius: 3px;
    padding: 0;
    background-color: #999
  }

  .md-card .md-card-header .card-title,.md-card .md-card-header .title {
    color: #fff!important
  }

  .md-card .md-card-header .category {
    margin: 0;
    color: hsla(0,0%,100%,.62)
  }

  .md-card .md-card-header a {
    color: #fff!important
  }

  .md-card .md-card-header.card-chart {
    padding: 0;
    min-height: 160px
  }

  .md-card .md-card-header.card-chart+.content h4 {
    margin-top: 0
  }

  .md-card .md-card-header .ct-label {
    color: hsla(0,0%,100%,.7)
  }

  .md-card .md-card-header .ct-grid {
    stroke: hsla(0,0%,100%,.2)
  }

  .md-card .md-card-header .ct-series-a .ct-bar,.md-card .md-card-header .ct-series-a .ct-line,.md-card .md-card-header .ct-series-a .ct-point,.md-card .md-card-header .ct-series-a .ct-slice-donut {
    stroke: hsla(0,0%,100%,.8)
  }

  .md-card .md-card-header .ct-series-a .ct-area,.md-card .md-card-header .ct-series-a .ct-slice-pie {
    fill: hsla(0,0%,100%,.4)
  }

  .md-card .md-card-header-image {
    position: relative;
    padding: 0;
    z-index: 1;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -30px;
    border-radius: 6px
  }

  .md-card .md-card-header-image a {
    display: block
  }

  .md-card .md-card-header-image img {
    width: 100%;
    border-radius: 6px;
    pointer-events: none
  }

  .md-card .md-card-header-image:not([shadow-off=true]) img {
    -webkit-box-shadow: 0 5px 15px -8px rgba(0,0,0,.24),0 8px 10px -5px rgba(0,0,0,.2);
    box-shadow: 0 5px 15px -8px rgba(0,0,0,.24),0 8px 10px -5px rgba(0,0,0,.2)
  }

  .md-card .md-card-header-image .card-title {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff!important;
    font-size: 1.125rem;
    text-shadow: 0 2px 5px rgba(33,33,33,.5)
  }

  .md-card .md-card-header-image .colored-shadow {
    -webkit-transform: scale(.94);
    transform: scale(.94);
    top: 12px;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: -1;
    -webkit-transition: opacity .45s;
    transition: opacity .45s;
    opacity: 0
  }

  .md-card .md-card-header-image[no-colored-shadow=true] {
    -webkit-box-shadow: none;
    box-shadow: none
  }

  .md-card .md-card-header-image[no-colored-shadow=true] .colored-shadow {
    display: none!important
  }

  .md-card .md-card-header-image:not([shadow-off=true])[shadow-normal=true] {
    -webkit-box-shadow: 0 16px 38px -12px rgba(0,0,0,.56),0 4px 25px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
    box-shadow: 0 16px 38px -12px rgba(0,0,0,.56),0 4px 25px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)
  }

  .md-card .md-card-header-image:not([shadow-off=true])[shadow-normal=true] .colored-shadow {
    display: none!important
  }

  .md-card .chart-title {
    position: absolute;
    top: 25px;
    width: 100%;
    text-align: center
  }

  .md-card .chart-title h3 {
    margin: 0;
    color: #fff
  }

  .md-card .chart-title h6 {
    margin: 0;
    color: hsla(0,0%,100%,.4)
  }

  .md-card .md-card-actions {
    padding: 0 1.875rem .9375rem
  }

  .md-card .md-card-actions .content {
    display: block
  }

  .md-card .md-card-actions .author {
    color: #999
  }

  .md-card .md-card-actions .stats {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #999;
    margin-right: 3px;
    margin-left: 3px
  }

  .md-card .md-card-actions .stats .md-icon.md-theme-default.md-icon-font {
    position: relative;
    top: -1px;
    font-size: 18px!important;
    color: #999
  }

  .md-card .md-card-actions h6 {
    color: #999
  }

  .md-card img {
    width: 100%;
    height: auto
  }

  .md-card .category .md-icon {
    position: relative;
    top: 6px;
    line-height: 0
  }

  .md-card .category-social .fa {
    font-size: 24px;
    position: relative;
    margin-top: -4px;
    top: 2px;
    margin-right: 5px
  }

  .md-card .author .avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px
  }

  .md-card .author a {
    color: #3c4858;
    text-decoration: none
  }

  .md-card .author a .ripple-container {
    display: none
  }

  .md-card .table {
    margin-bottom: 0
  }

  .md-card .table tr:first-child td {
    border-top: none
  }

  .md-card.bg-primary,.md-card .md-card-header-primary,.md-card.md-card-rotate.bg-primary .back,.md-card.md-card-rotate.bg-primary .front,.md-card .md-tabs.md-primary .md-tabs-navigation,.md-card [data-background-color=purple] {
    background: linear-gradient(60deg,#ab47bc,#7b1fa2);
    -webkit-box-shadow: 0 12px 20px -10px rgba(156,39,176,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(156,39,176,.2);
    box-shadow: 0 12px 20px -10px rgba(156,39,176,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(156,39,176,.2);
    background-repeat: no-repeat
  }

  .md-card.bg-info,.md-card .md-card-header-info,.md-card.md-card-rotate.bg-info .back,.md-card.md-card-rotate.bg-info .front,.md-card .md-tabs.md-info .md-tabs-navigation,.md-card [data-background-color=blue] {
    background: linear-gradient(60deg,#26c6da,#0097a7);
    -webkit-box-shadow: 0 12px 20px -10px rgba(0,188,212,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(0,188,212,.2);
    box-shadow: 0 12px 20px -10px rgba(0,188,212,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(0,188,212,.2);
    background-repeat: no-repeat
  }

  .md-card.bg-success,.md-card .md-card-header-green,.md-card.md-card-rotate.bg-success .back,.md-card.md-card-rotate.bg-success .front,.md-card .md-tabs.md-success .md-tabs-navigation,.md-card [data-background-color=green] {
    background: linear-gradient(60deg,#66bb6a,#388e3c);
    -webkit-box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2);
    box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2);
    background-repeat: no-repeat
  }

  .md-card.bg-warning,.md-card .md-card-header-orange,.md-card.md-card-rotate.bg-warning .back,.md-card.md-card-rotate.bg-warning .front,.md-card .md-tabs.md-warning .md-tabs-navigation,.md-card [data-background-color=orange] {
    background: linear-gradient(60deg,#ffa726,#f57c00);
    -webkit-box-shadow: 0 12px 20px -10px rgba(255,152,0,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(255,152,0,.2);
    box-shadow: 0 12px 20px -10px rgba(255,152,0,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(255,152,0,.2);
    background-repeat: no-repeat
  }

  .md-card.bg-danger,.md-card .md-card-header-red,.md-card.md-card-rotate.bg-danger .back,.md-card.md-card-rotate.bg-danger .front,.md-card .md-tabs.md-danger .md-tabs-navigation,.md-card [data-background-color=red] {
    background: linear-gradient(60deg,#ef5350,#d32f2f);
    -webkit-box-shadow: 0 12px 20px -10px rgba(244,67,54,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(244,67,54,.2);
    box-shadow: 0 12px 20px -10px rgba(244,67,54,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(244,67,54,.2);
    background-repeat: no-repeat
  }

  .md-card.bg-rose,.md-card .md-card-header-rose,.md-card.md-card-rotate.bg-rose .back,.md-card.md-card-rotate.bg-rose .front,.md-card .md-tabs.md-rose .md-tabs-navigation,.md-card [data-background-color=rose] {
    background: linear-gradient(60deg,#ec407a,#c2185b);
    -webkit-box-shadow: 0 12px 20px -10px rgba(233,30,99,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(233,30,99,.2);
    box-shadow: 0 12px 20px -10px rgba(233,30,99,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(233,30,99,.2);
    background-repeat: no-repeat
  }

  .md-card [data-background-color],.md-card [data-background-color] a {
    color: #fff
  }

  .md-card-stats .title {
    margin: 0
  }

  .md-card-stats .title small {
    color: #999;
    font-size: 65%;
    line-height: 1;
    font-weight: 400
  }

  .md-card-stats .md-card-header {
    float: left;
    text-align: center
  }

  .md-card-stats .md-card-header i {
    font-size: 36px!important;
    line-height: 56px;
    width: 56px;
    height: 56px;
    color: #fff!important
  }

  .md-card-stats .md-card-content {
    text-align: right;
    padding-top: 10px
  }

  .md-card-blog {
    margin-top: 45px;
  }

  .card-nav-tabs .header-raised {
    margin-top: -30px;
  }

  .card-nav-tabs .nav-tabs {
    background: transparent;
    padding: 0
  }

  .card-nav-tabs .nav-tabs-title {
    float: left;
    padding: 10px 10px 10px 0;
    line-height: 24px
  }

  .md-card-plain {
    background: transparent!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important
  }

  .md-card-plain .md-card-header {
    background-color: transparent!important;
    margin-left: 0;
    margin-right: 0
  }

  .md-card-plain .md-card-actions,.md-card-plain .md-card-content {
    padding-left: 5px;
    padding-right: 5px
  }

  .md-card-plain .card-image {
    margin: 0;
    border-radius: 3px
  }

  .md-card-plain .card-image img {
    border-radius: 3px
  }

  .md-card-horizontal .md-card-header-image {
    margin-top: 0
  }

  .md-card-profile,.md-card-testimonial {
    margin-top: 30px
  }

  .md-card-profile:not(.md-card-horizontal),.md-card-testimonial:not(.md-card-horizontal) {
    text-align: center
  }

  .md-card-profile .btn-just-icon.btn-raised,.md-card-testimonial .btn-just-icon.btn-raised {
    margin-left: 6px;
    margin-right: 6px
  }

  .md-card-profile .md-card-avatar,.md-card-testimonial .md-card-avatar {
    max-width: 130px;
    max-height: 130px;
    margin: -50px auto 0;
    border-radius: 50%;
    overflow: hidden;
    -webkit-box-shadow: 0 16px 38px -12px rgba(0,0,0,.56),0 4px 25px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2);
    box-shadow: 0 16px 38px -12px rgba(0,0,0,.56),0 4px 25px 0 rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)
  }

  .md-card-profile .md-card-avatar+.md-card-content,.md-card-testimonial .md-card-avatar+.md-card-content {
    margin-top: 15px
  }

  .md-card-profile.flex-direction-row .md-card-avatar,.md-card-profile.flex-direction-row .md-card-content,.md-card-profile.md-card-plain .card-avatar,.md-card-testimonial.flex-direction-row .md-card-avatar,.md-card-testimonial.flex-direction-row .md-card-content,.md-card-testimonial.md-card-plain .card-avatar {
    margin-top: 0
  }

  .md-card-profile.flex-direction-row .md-card-content,.md-card-testimonial.flex-direction-row .md-card-content {
    text-align: left;
    margin-left: 15px
  }

  .md-card-testimonial .md-card-header {
    background-color: #fff;
    margin-top: 0
  }

  .md-card-testimonial .card-description {
    font-style: italic;
    margin-bottom: 35px
  }

  .md-card-testimonial .md-card-actions {
    display: block
  }

  .md-card-testimonial .md-card-actions .md-card-avatar {
    margin-top: 10px;
    margin-bottom: -60px
  }

  .md-card-testimonial .md-card-avatar {
    max-width: 100px;
    max-height: 100px
  }

  .md-card-testimonial .icon {
    margin-top: 30px
  }

  .md-card-testimonial .icon.icon-black i {
    color: rgba(0,0,0,.87)
  }

  .md-card-testimonial .icon .md-icon {
    font-size: 40px!important
  }

  .md-card-contact .md-card-header {
    padding: 1rem 15px
  }

  .md-card-tabs {
    margin-top: 0
  }

  .md-card-tabs .md-list {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: initial;
    flex-flow: initial;
    padding: 0 15px
  }

  .md-card-tabs.page-subcategories>.md-card-header .title {
    margin-top: 30px!important;
    margin-bottom: 25px!important;
    min-height: 32px
  }

  .md-card-tabs .tab-content {
    padding: 20px 0 9px
  }

  .md-card-tabs .md-list-item+.md-list-item {
    margin-left: 5px
  }

  .md-card-tabs .md-list .md-list-item .md-list-item-button {
    line-height: 24px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    min-width: 100px;
    color: #3c4858!important;
    -webkit-transition: all .3s;
    transition: all .3s;
    border-radius: 30px;
    padding: 0
  }

  .md-card-tabs .md-list .md-list-item .md-list-item-button .md-icon {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: auto;
    height: auto;
    margin: 0;
    font-size: 30px!important;
    padding: 15px 0;
    color: #555
  }

  .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
    min-height: auto;
    padding: 10px 15px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
  }

  .md-card-tabs .md-list .md-list-item .md-list-item-button:focus,.md-card-tabs .md-list .md-list-item .md-list-item-button:hover {
    background-color: hsla(0,0%,78%,.2)!important
  }

  .md-card-tabs .md-list .md-list-item:not(.active) .md-list-item-button .md-list-item-content {
    color: #555
  }

  .md-card-tabs .active.md-list-item .md-list-item-button {
    color: #fff!important
  }

  .md-card-tabs .active.md-list-item .md-list-item-button,.md-card-tabs .active.md-list-item .md-list-item-button:focus,.md-card-tabs .active.md-list-item .md-list-item-button:hover {
    background-color: #999!important;
    -webkit-box-shadow: 0 12px 20px -10px hsla(0,0%,60%,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px hsla(0,0%,60%,.2);
    box-shadow: 0 12px 20px -10px hsla(0,0%,60%,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px hsla(0,0%,60%,.2)
  }

  .md-card-tabs .active.md-list-item .md-list-item-button,.md-card-tabs .active.md-list-item .md-list-item-button .md-list-item-content .md-icon {
    color: #fff!important
  }

  .md-card-tabs .active.md-list-item.md-rose .md-list-item-button,.md-card-tabs .active.md-list-item.md-rose .md-list-item-button:focus,.md-card-tabs .active.md-list-item.md-rose .md-list-item-button:hover {
    background-color: #e91e63!important;
    -webkit-box-shadow: 0 12px 20px -10px rgba(233,30,99,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(233,30,99,.2);
    box-shadow: 0 12px 20px -10px rgba(233,30,99,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(233,30,99,.2)
  }

  .md-card-tabs .active.md-list-item.md-primary .md-list-item-button,.md-card-tabs .active.md-list-item.md-primary .md-list-item-button:focus,.md-card-tabs .active.md-list-item.md-primary .md-list-item-button:hover {
    background-color: #9c27b0!important;
    -webkit-box-shadow: 0 12px 20px -10px rgba(156,39,176,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(156,39,176,.2);
    box-shadow: 0 12px 20px -10px rgba(156,39,176,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(156,39,176,.2)
  }

  .md-card-tabs .active.md-list-item.md-warning .md-list-item-button,.md-card-tabs .active.md-list-item.md-warning .md-list-item-button:focus,.md-card-tabs .active.md-list-item.md-warning .md-list-item-button:hover {
    background-color: #ff9800!important;
    -webkit-box-shadow: 0 12px 20px -10px rgba(255,152,0,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(255,152,0,.2);
    box-shadow: 0 12px 20px -10px rgba(255,152,0,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(255,152,0,.2)
  }

  .md-card-tabs .active.md-list-item.md-info .md-list-item-button,.md-card-tabs .active.md-list-item.md-info .md-list-item-button:focus,.md-card-tabs .active.md-list-item.md-info .md-list-item-button:hover {
    background-color: #00bcd4!important;
    -webkit-box-shadow: 0 12px 20px -10px rgba(0,188,212,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(0,188,212,.2);
    box-shadow: 0 12px 20px -10px rgba(0,188,212,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(0,188,212,.2)
  }

  .md-card-tabs .active.md-list-item.md-success .md-list-item-button,.md-card-tabs .active.md-list-item.md-success .md-list-item-button:focus,.md-card-tabs .active.md-list-item.md-success .md-list-item-button:hover {
    background-color: #4caf50!important;
    -webkit-box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2);
    box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2)
  }

  .md-card-tabs .active.md-list-item.md-danger .md-list-item-button,.md-card-tabs .active.md-list-item.md-danger .md-list-item-button:focus,.md-card-tabs .active.md-list-item.md-danger .md-list-item-button:hover {
    background-color: #f44336!important;
    -webkit-box-shadow: 0 12px 20px -10px rgba(244,67,54,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(244,67,54,.2);
    box-shadow: 0 12px 20px -10px rgba(244,67,54,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(244,67,54,.2)
  }

  .md-card-tabs.md-card-plain .md-card-header,.md-card-tabs.md-card-plain .md-list {
    background-color: transparent!important
  }

  .md-card-tabs.md-card-plain .title {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center
  }

  button {
    transition: 0.5s;
    &.md-follow {
      background-color: transparent;
      color: #2196F3;
      border: 1px solid #2196F3;
      padding: 10px;
      border-radius: 5px;
      margin: 0;
      min-width: 120px;
      position: relative;
      top: -3px;
      &.active {
        background-color: #2196F3;
        color: white;
      }
    }
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }

</style>
