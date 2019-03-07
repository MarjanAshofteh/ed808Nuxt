<template>
  <div>
    <section id="banner">
      <div>
        <h1>808 Educational and Engineering institute</h1>
        <span>specialized training in Civil and Architecture
          <span>Ed808.com</span>
        </span>
      </div>
    </section>

    <newspane/>

    <EditorPicked/>

    <NodeList :filterEnabled="false" class="md-card md-theme-default md-layout-item md-size-80"/>

    <div class="w-35 content-centered-y right-0 z-index-n1 mt-n9" style="position: absolute;top: 24%;transform: translate(0, -50%);width: 35% !important;right: 0;">
      <figure class="ie-bg-elements-4" style="margin: 0;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 130.5 208.9" style="enable-background:new 0 0 130.5 208.9;" xml:space="preserve" class="injected-svg js-svg-injector" data-parent="#content">
          <path class="bg-elements-4-0 fill-gray-200" d="M130.5,27.4L107.7,7.7C94.4-3.7,74.4-2.3,63,11L7.7,75.1c-11.4,13.2-10,33.2,3.3,44.7l94.4,81.4c7.2,6.2,16.4,8.6,25.2,7.4V27.4z"></path>
        </svg>
      </figure>
    </div>
    <div class="" style="display:none;top: 480px;z-index: 0;left: 0;right: 0;position: absolute !important;">
      <figure class="ie-bg-elements-3">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1506.3 578.7" style="enable-background:new 0 0 1506.3 578.7;" xml:space="preserve" class="injected-svg js-svg-injector" data-parent="#content">
          <g><path class="bg-elements-3-0 fill-warning" d="M45,91.6L45,91.6c-1.2-1.2-1.2-3.1,0-4.3l9.1-9.1c1.2-1.2,3.1-1.2,4.3,0h0c1.2,1.2,1.2,3.1,0,4.3l-9.1,9.1   C48.2,92.8,46.2,92.8,45,91.6z"></path></g>
          <g><path class="bg-elements-3-0 fill-warning" d="M58.4,91.6L58.4,91.6c-1.2,1.2-3.1,1.2-4.3,0L45,82.5c-1.2-1.2-1.2-3.1,0-4.3h0c1.2-1.2,3.1-1.2,4.3,0l9.1,9.1   C59.6,88.5,59.6,90.4,58.4,91.6z"></path></g>
          <path class="bg-elements-3-1 fill-info" d="M1041.3,403.1l5.1,19.1c0.7,2.6,4,3.5,5.9,1.6l14-14c1.9-1.9,1-5.2-1.6-5.9l-19.1-5.1  C1043,398,1040.5,400.4,1041.3,403.1z"></path>
          <path class="bg-elements-3-2 fill-success" d="M380.6,577.8l-12.2-12.2c-1.2-1.2-1.2-3.1,0-4.3l12.2-12.2c1.2-1.2,3.1-1.2,4.3,0l12.2,12.2  c1.2,1.2,1.2,3.1,0,4.3l-12.2,12.2C383.8,579,381.8,579,380.6,577.8z"></path>
          <circle class="bg-elements-3-2 fill-success" cx="1494.3" cy="353.5" r="12"></circle>
          <path class="bg-elements-3-3 fill-danger" d="M992,21.5h-15.9c-1.5,0-2.8-1.3-2.8-2.8V2.8c0-1.5,1.3-2.8,2.8-2.8H992c1.5,0,2.8,1.3,2.8,2.8v15.9  C994.8,20.2,993.5,21.5,992,21.5z"></path>
          <path class="bg-elements-3-4 fill-primary" d="M19.3,310.2l-17,4.6c-2.3,0.6-3.1,3.6-1.4,5.3l12.4,12.4c1.7,1.7,4.7,0.9,5.3-1.4l4.6-17  C23.8,311.7,21.7,309.6,19.3,310.2z"></path>
        </svg>
      </figure>
    </div>
  </div>
</template>

<script>
import EditorPicked from '@/components/front/EditorPicked'
import newspane from '@/components/front/newspane'
import NodeList from '@/components/allContents/NodeList'

export default {
  name: 'home',
  scrollToTop: true,
  data(){
    return{
      title:'Home',
      pic:'https://ed808.com/images/front-page.jpg'
    }
  },
  components: {
    newspane,
    NodeList,
    EditorPicked
  },
  head(){
    return{
      links: [
        { rel: 'canonical', href: 'https://ed808.com'},
        { rel: 'alternate', href: 'https://ed808.com', hreflang:'en'},
        { rel: 'shortlink', href: 'https://ed808.com'}
      ],
      title: this.title,
      meta: [

        // OpenGraph data (Most widely used)
        {property: 'og:title', content: this.title, hid: 'og:title'},
        {property: 'og:url', content: 'https://ed808.com', hid: 'og:url'},
        {property: 'og:image', content: this.pic, hid: 'og:image'},

        // Twitter card
        {name: 'twitter:title', content: this.title, hid: 'twitter:title'},
        {name: 'twitter:image:src', content: this.pic, hid: 'twitter:image:src'},

        // Google / Schema.org markup:
        {itemprop: 'name', content: this.title, hid: 'name'},
        {itemprop: 'image', content: this.pic, hid: 'image'},
      ]
    }
  }
}
</script>

<style lang="scss">
  section#banner{
    background-image: url(/images/top-banner.jpg);
    background-size: cover;
    height: 400px;
    display: flex;
    align-items: center;
    background-position: bottom;
    justify-content: flex-end;
    @media all and (max-width: 700px){
      justify-content: center; 
    }
    > div{
      margin: 0 11% 0 0;
      @media all and (max-width: 700px){
        margin:0px;
      }
      h1{
        font-size: 24px;
        padding: 26px 26px;
        font-weight: bold;
        background-color: #ffffff;
        margin-bottom: 7px;
        @media all and (max-width: 600px){
          font-size: 17px;
          padding: 26px 10px;
        }
      }
      > span{
        color: white;
        font-size: 17px;
        border: 1px solid white;
        padding: 24px 20px 30px 20px;
        display: inline-block;
        text-shadow: 2px 2px 6px #000;
        border-width: 1px 1px 0px 1px;
        position: relative;
        @media all and (max-width: 600px){
          font-size: 16px;
          padding: 24px 10px 30px 10px;
        }
        > span{
          font-size: 10px;
          position: absolute;
          bottom: -7px;
          right: calc(50% - 28px);
        }
        &:before,
        &:after{
          content: '';
          position: absolute;
          background-color: white;
          width: 100px;
          height: 1px;
          bottom: 0;
        }
        &:before{
          left: 0;
        }
        &:after{
          right: 0;
        }
      }
    }
  }
  .page-iframe .mejs-container{
      padding-bottom: 53% !important;
  }
  .admin-error{
      display: none;
  }
  .bg-elements-3-0{fill:#FFC107;}
  .bg-elements-3-1{fill:#00DFFC;}
  .bg-elements-3-2{fill:#00C9A7;}
  .bg-elements-3-3{fill:#DE4437;}
  .bg-elements-3-4{fill:#377DFF;}
  .bg-elements-4-0{fill:#f3f3f3;}
</style>
