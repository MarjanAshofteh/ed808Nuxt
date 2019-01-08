
<template>
<transition name="fade">
  <div class="aboutus">
    <div class="top-pic">
      <img :src="createlink(pic)" width="100%" height="241">
      <h1>{{title}}</h1>
    </div>
    <div class="inner">
      <div class="atext" v-html="text">
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'aboutus',
    data(){
      return{
        text:'',
        pic:'',
        title:'about us'
      }
    },
    asyncData({app,params}) {
      return axios.get('http://api.ed808.com/latin/page?args=about_us',
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((data) => {
        return{
          text : data.data.body,
          pic : data.data.image
        }
      })
      .catch(e => {
        console.log(e.message)
      })
    },
    mounted(){
      /*axios.get('http://api.ed808.com/latin/page?args=about_us',
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((data) => {
        this.text = data.data.body
        this.pic = data.data.image
      })
      .catch(e => {

      });*/
    },
    methods:{
      createlink: function (value) {
        if (!value) return ''
        return "http://ed808.com/api/sites/default/files/" + value.substring(9)
      }
    },
    head(){
      return{
        title: 'about us',
        meta: [
          // OpenGraph data (Most widely used)
          {
            'property': 'og:title',
            'content': this.title,
            'template': '%s - ed808',
            'vmid': 'og:title'
          },
          {property: 'og:url', content: 'http://ed808.com/about-us', vmid: 'og:url'},
          {property: 'og:image', content: this.createlink(this.pic), vmid: 'og:image'},
          {
            'name': 'twitter:title',
            'content': this.title,
            'template': '%s - ed808',
            'vmid': 'twitter:title'
          },
          {name: 'twitter:image:src', content: this.createlink(this.pic), vmid: 'twitter:image:src'},

          // Google / Schema.org markup:
          {
            'name': 'itemprop',
            'content': this.title,
            'template': '%s - ed808',
            'vmid': 'itemprop'
          },
          {itemprop: 'image', content: this.createlink(this.pic), vmid: 'image'}
        ],
        links: [
          {rel: 'canonical', href: 'http://ed808.com/about-us'}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .atext{
    margin: 50px 0;
    text-align:left;
  }
  
  .inner{
    padding: 0 36px;
  }
  .top-pic{
    height: 241px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: '';
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background-color: #0000005e;
      z-index: 1;
    }
    img{
      min-width: 100%;
      min-height: 100%;
      max-width: none;
      width: auto;
      position: absolute;
      z-index: 0;
    }
    h1{
      text-shadow: 0px -1px 5px #000000, 0 -1px 0px #000000;
      color: white;
      position: relative;
      font-size: 35px;
      z-index: 2;
    }
  }
  .page-enter-active,
.page-leave-active {
  opacity: 1;
  transition: opacity .25s;
  animation-duration: .3s;
  animation-fill-mode: both;
}

.page-enter-active {
  animation-name: pageFadeInUp;
}

.page-leave-active {
  animation-name: pageFadeOutDown;
}

.page-enter, .page-leave-to {
  opacity: 0;
}


@-webkit-keyframes pageFadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 1.25%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@-webkit-keyframes pageFadeOutDown {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 1.25%, 0);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .9s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
