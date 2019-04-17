<template>
  <div
    id="app"
    :class="[ queryClasses ] + bgImage != '' ? 'static-bg' : '' "
    :style="{ backgroundImage : `url(${bgImage})` }"
  >


    <MainNav :transparent="true" />


    <nuxt />

    <md-snackbar :md-active.sync="IsLogOut">
      You've logged out successfully!
    </md-snackbar>

    <footer class="footer footer-transparent footer-big">
      <div class="container">
        <div class="content">
          <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-large-size-50 md-small-size-100">
              <ul class="links-horizontal">
                <li>
                  <nuxt-link to="/aboutus">
                    About Us
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/contactus">
                    Contact Us
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/faq">
                    FAQ
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/privacy">
                    Privacy Policy
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="copyright md-layout-item md-medium-size-50 md-large-size-50 md-small-size-100">
              Copyright © 2019 ED 808 .ltd All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

  import Login from '@/components/fields/login'
  import axios from '@/node_modules/axios'
  import { cookie } from '@/components/mixins/cookie.js'
  import MainNav from "../components/elements/main-nav";

  export default {
    name: 'Static',
    components: {MainNav, Login},
    mixins:[cookie],
    data(){
      return{
        IsLogin:false,
        IsLogOut:false,
        menu_flag:false,
        queryClasses: '',
        inputBox:'',
        aftersubmit:false,
        toggleCard: false,
        loginActive: false
      }
    },
    computed: {
      bgImage() {
        return this.$store.state.backGround
      }
    },
    created(){
      var query = this.$router.currentRoute.path.split('/')
      query.forEach(element => {
        if(element != '')
          this.queryClasses += ' page-' + element
      });
    },
    mounted(){
      if(this.$store.getters.getUid)
        this.IsLogin = true
    },
    methods:{
      hideLoginCard(){
        this.loginActive = false
      },
      opening_menu(){
        this.menu_flag = !this.menu_flag
      },
      toggle () {
        this.toggleCard = !this.toggleCard
      },
      logUserOut(){
        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.post('https://ed808.com:92/latin/user/logout',
          true,{
            headers:{
              'Content-type': 'application/json',
              'X-CSRF-Token': this.getCookie("token")
            }
          })
          .then((data) => {
            this.eraseCookie('token')
            this.$store.commit('LOGOUT')
            this.IsLogin = false
            //This line show the log out snackbar
            this.IsLogOut = true
            window.location.replace('/')
          })
          .catch(e => {
            console.log('errors for logout : ' + e)
          });
      },
      addEmail() {
        axios.post('https://ed808.com:92/latin/web_form',
          {
            "nid" : 20162,
            "reCaptchaToken" : "admin@ed808",
            "name" : "this field is not connect yet",
            "email" : this.inputBox
          },
          {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then((data) => {
            this.aftersubmit = true
            this.inputBox = ''
          })
          .catch(e => {
          });
      },
      get_gravatar(email, size){
        // MD5 (Message-Digest Algorithm) by WebToolkit
        var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
        var size = size || 80;
        return 'http://www.gravatar.com/avatar/' + MD5(email) + '.jpg?s=' + size;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/vars.scss";
  #app.static-bg {
    background: fixed center;
    background-size: cover;
    /*padding-bottom: 117px;*/
    &:before {
      content: '';
      position: fixed;
      left: 0;
      top: 0;
      height: calc(100% + 62px);
      /*bottom: 0;*/
      right: 0;
      background: rgba(0,0,0,0.3);
    }
  }
  .login-card-with-overlay{
    z-index: 10;
    padding-top: calc(90px + 10vh);
    opacity: 0;
    transition: ease opacity .5s;
    width: 100vw;
    height: 100vh;
    position: fixed;
    pointer-events: none;
    top: 0;
    background-color: rgba(0,0,0,0.3);
    &.active {
      z-index: 10;
      display: block;
      opacity: 1;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      transition: ease opacity .5s;
      pointer-events: all;

    }
    .login-card {
      width: 30%;
      margin: auto;
      margin-top: -100px;
      opacity: 0;
      transition-duration: 0.5s;
      &.active {
        opacity: 1;
        margin-top: 0;
        transition-duration: 0.5s;
      }
      @media screen and (max-width: 992px) {
        width: 60%;
      }
      @media screen and (max-width: 600px) {
        width: 90%;
      }

    }

  }


  .md-menu-content-bottom-start.md-menu-content-big.md-menu-content.md-theme-default {
    width: 100%;
    max-width: 100%;
    top:90px !important;
    right:0px !important;
    left:0px !important;
    .md-menu{
      width: 100%;
      display: block;
      a{
        display: block;
      }
    }
    .md-button{
      width:100%;
    }
  }
  @mixin icon-size($size) {
    width: $size;
    height: $size;
    min-width: $size;
    font-size: $size !important;
  }
  @media all and (max-width:960px) {
    .large-screen{
      display:none !important;
    }
    .small-screen{
      display: block !important;
      .md-icon{
        @include icon-size(30px);
      }
    }
    header#header .inner{
      justify-content: space-between;
    }
  }
  .small-screen{
    display: none;
  }

  .md-menu{
    button {
      margin: 0;
      vertical-align: middle;
    }
    &.user-links {
      padding-left: 10px;
      margin-left: 15px;
      position: relative;
      &:before {
        content: "";
        height: 20px;
        left: 0;
        width: 1px;
        background: #ccc;
        position: absolute;
        top: 10px;
      }
      &.loggedin{
        padding-left: 15px;
        button{
          height: 40px;
          border-radius: 2px 30px 30px 2px;
          @media #{$x600}{
            width: 40px;
            min-width: 40px;
            margin: 0 6px;
            border-radius: 50%;
          }
          span{
            margin: 0 10px;
            font-weight: 300 !important;
          }
          @media #{$m600}{.md-ripple{padding-right: 0;}}
        }
      }
    }
  }
  .user-menu ul.md-list {
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    border-radius: 3px!important;
    li {
      position: relative;
      .md-list-item-content {
        padding: 0;
        height: 39px;
      }
      a {
        font-size: 14px;
        padding: 10px 1.5rem;
        margin: 0 5px;
        text-transform: none;
        color: #333!important;
        border-radius: 2px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-weight: 400;
        line-height: 1.428571;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        white-space: nowrap;
        -webkit-transition: all .15s linear;
        transition: all .15s linear;
        width: 100%;
        &:hover {
          background: #eee;
        }
      }
    }
  }

  footer {
    padding: .9375rem 0;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: static;
    bottom: 0;
    left: 0;
    width: 100%;
    &.footer-transparent {
      .links-horizontal {
        @media screen and (max-width: 992px ){
          text-align: center;
        }
        li {
          margin-right: .9375rem;
          color: #fff;
        }
        &:first-child a {padding-left: 0}
        &:last-child a {padding-right: 0}
      }
      .copyright {
        color: #fff;
        font-size: 12px;
        text-align: right;
        @media screen and (max-width: 992px ){
          text-align: center;
        }
      }
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: inline-block;

        a {
          color: inherit !important;
          padding: .9375rem;
          font-weight: 500;
          font-size: 12px;
          text-transform: uppercase;
          border-radius: 3px;
          position: relative;
          display: block;
          text-decoration: none;

          &:hover {
            text-decoration: none;
          }
        }

        .btn {
          margin: 0
        }
      }

      &.links-horizontal {
        li a {
          padding: .9375rem;
        }
        &:first-child a {padding-left: 0}
        &:last-child a {padding-right: 0}
      }
      &.links-vertical{
        li {
          display: block;
          margin-left: -5px;
          margin-right: -5px;
          a { padding: 5px}
        }
      }
    }
    a:not(.md-button):hover {
      text-decoration: none !important;
      color: #9C27B0 !important;
    }
    .social-buttons{
      .btn, a{
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 0
      }
    }
    .footer-brand {
      padding: 15px;
      font-size: 18px;
      margin-left: -15px;
      color: #3c4858 !important;
      font-weight: bold;
      &:focus,
      &:hover {
        color: #3c4858!important;
      }
    }
    .copyright {
      padding: 15px 0;
      .md-icon {
        font-size: 18px!important;
        color: inherit!important
      }
    }
    nav ul li a {
      margin-left: -15px
    }
    .container, .container-fluid {
      padding-right: 15px;
      padding-left: 15px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
    }
    .md-layout {
      margin-right: -15px;
      margin-left: -15px;
    }
    .md-layout-item {
      padding-right: 15px;
      padding-left: 15px;
    }
    .md-field {
      padding-top: 13px;
      margin: -5px 0 10px;
      min-height: auto;
      .md-input{
        height: 36px;
        padding: 7px 0;
        font-size: 14px!important;
        -webkit-text-fill-color: #3c4858!important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    }
  }

  .footer-transparent {
    background-color: transparent;
  }

  .footer-black {
    background-color: #232323;
    background: radial-gradient(ellipse at center,#585858 0,#232323 100%);
    background-size: 550% 450%;
    hr {border-color: hsla(0,0%,100%,.2)}
    a {
      opacity: .86;
      &:focus,&:hover {opacity: 1;}
    }
    .copyright,
    .footer-brand,
    .footer-brand:focus,
    .footer-brand:hover,
    a,h4,h5,i {color: #fff!important;}
  }

  .footer-big {
    padding: 1.875rem 0;
    .gallery-feed img {
      width: 20%;
      margin-right: 5%;
      margin-bottom: 5%;
      float: left
    }
    .content {
      text-align: left
    }
    .social-feed i {
      font-size: 20px;
      padding-right: 10px
    }
    .feed-line {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      p {
        padding: 0 20px 0 5px
      }
    }
    h4 {
      font-weight: bold;
    }
    h5, .h5{
      color: #3c4858!important;
      text-decoration: none;
      font-size: 1.0625rem;
      line-height: 1.55em;
      margin-bottom: 15px;
      font-weight: bold;
      font-family: roboto slab;
    }
    p {
      color: #999;
    }
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    width: 100%;
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .footer-big, .page-header, .section{
    .container, .container-fluid {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }
  }

  .social-buttons a{
    &.md-telegram .md-button-content{
      @include before(F501, '', 24px, #0188cc);
    }
    &.md-facebook .md-button-content{
      @include before(f20c, '', 24px, #4a66a0);
    }
    &.md-instagram .md-button-content{
      @include before(f2fe, '', 24px, #E91E63);
    }
    &.md-linkedin .md-button-content{
      @include before(f33b, '', 24px, #0976b4);
    }
    &.md-youtube .md-button-content{
      @include before(f5c3, '', 24px, #e52d27);
    }

  }
</style>
