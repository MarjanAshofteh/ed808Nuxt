<template>
  <div id="app" :class="[queryClasses]">
    <header id="header">
      <div class="inner md-layout">

        <img src="/images/logo.png" class="logo">

        <div class="md-layout md-gutter large-screen">
          <div class="header-menu-text md-layout-item md-size-100" style="text-align: right;">

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/"><md-button>Home</md-button></nuxt-link>
            </md-menu>

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/contents"><md-button>All Contents</md-button></nuxt-link>
            </md-menu>

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/aboutus"><md-button>About Us</md-button></nuxt-link>
            </md-menu>

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/contactus"><md-button>Contact us</md-button></nuxt-link>
            </md-menu>


            <div v-if="!$store.getters.getUid" class="md-menu user-links">
              <md-menu md-direction="bottom-start">
                <nuxt-link to="/login"><md-button>Login</md-button></nuxt-link>
              </md-menu>

              <md-menu md-direction="bottom-start">
                <nuxt-link to="/register">
                  <md-button class="md-raised" style="background: #2196F3;color: #fff;">Register</md-button>
                </nuxt-link>
              </md-menu>
            </div>

            <div v-else class="md-menu user-links">
              <md-menu md-size="big" md-direction="bottom-end" md-align-trigger :md-active.sync="menu_flag">
                <div @click="opening_menu" style="cursor: pointer;">
                  <span v-if="$store.state.user.full_name" style="display: inline-block;vertical-align: middle;margin: 0 10px -20px 15px;">{{$store.state.user.full_name}}</span>
                  <md-button class="md-icon-button">
                    <md-avatar>
                      <img v-if="$store.state.user.picture" v-bind:src="$store.state.user.picture" alt="user_image">
                      <img v-else src="/images/avatar.png" alt="user_image">
                    </md-avatar>
                  </md-button>
                </div>

                <md-menu-content>
                  <md-menu-item>
                    <nuxt-link :to="'/user/'+ $store.state.user.uid" target="_blank">My Profile</nuxt-link>
                  </md-menu-item>
                  <md-menu-item @click="logUserOut">Logout</md-menu-item>
                </md-menu-content>
              </md-menu>

            </div>
          </div>
        </div>

        <div class="small-screen">
          <!-- در حالت صفحه نمایش کوچیک هم منوی کاربری رو نمایش بده - هر دو حالتش رو -->
          <md-menu md-size="big" :md-active.sync="toggleCard" @click="toggle">

            <md-button>
              <md-icon v-if="!toggleCard" class="md-primary">menu</md-icon>
              <md-icon v-else class="md-primary">close</md-icon>
            </md-button>

            <md-menu-content>

              <div class="md-menu-content-container md-scrollbar md-theme-default">
                <ul class="md-list md-theme-default">
                  <md-menu md-direction="bottom-start">
                    <nuxt-link to="/"><md-button>Home</md-button></nuxt-link>
                  </md-menu>
                  <li class="md-list-item md-menu-item md-theme-default">
                    <md-menu md-direction="bottom-start">
                      <nuxt-link to="/aboutus"><md-button>about us</md-button></nuxt-link>
                    </md-menu>
                  </li>
                  <li class="md-list-item md-menu-item md-theme-default">
                    <md-menu md-direction="bottom-start">
                      <nuxt-link to="/contents"><md-button>all contents</md-button></nuxt-link>
                    </md-menu>
                  </li>
                </ul>
              </div>
            </md-menu-content>
          </md-menu>
        </div>

      </div>
    </header>
    
    <nuxt/>

    <md-snackbar :md-active.sync="IsLogOut">You log out successfully!</md-snackbar>

    <section id="subscribe">
      <div class="inner">
        <h2>Subscribe Your Email</h2>
        <div class="input-wrapper">
          <input @keyup.enter="addEmail" v-model="inputBox" placeholder="Submit Your Email..."  autocomplete="off"/>
          <button v-on:click="addEmail"></button>
          <div style="margin-top: 20px;" v-if="aftersubmit" >Thank You :)</div>
        </div>
        <p> Join our mailing list to receive the latest updates and personalized content right in your inbox </p>
      </div>
    </section>

    <footer class="footer footer-white footer-big">
      <div class="container">
        <!--<div class="content">-->
          <!--<div class="md-layout">-->
            <!--<div class="md-layout-item md-medium-size-25 md-large-size-25 md-small-size-100">-->
              <!--<a href=""><h5>Material Kit PRO</h5></a>-->
              <!--<p>-->
                <!--Probably the best UI Kit in the world! We know you've been waiting for it, so don't be shy!-->
              <!--</p>-->
            <!--</div>-->
            <!--<div class="md-layout-item md-medium-size-15 md-large-size-15 md-small-size-100">-->
              <!--<h5>About</h5>-->
              <!--<ul class="links-vertical">-->
                <!--<li><a href="">-->
                  <!--Blog-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--About Us-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--Presentation-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--Contact Us-->
                <!--</a></li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="md-layout-item md-medium-size-15 md-large-size-15 md-small-size-100">-->
              <!--<h5>Market</h5>-->
              <!--<ul class="links-vertical">-->
                <!--<li><a href="">-->
                  <!--Sales FAQ-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--How to Register-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--Sell Goods-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--Receive Payment-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--Transactions Issues-->
                <!--</a></li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="md-layout-item md-medium-size-15 md-large-size-15 md-small-size-100">-->
              <!--<h5>Legal</h5>-->
              <!--<ul class="links-vertical">-->
                <!--<li><a href="">-->
                  <!--Transactions FAQ-->
                <!--</a></li>-->
                <!--<li><a href="#pablo">-->
                  <!--Terms &amp; Conditions-->
                <!--</a></li>-->
                <!--<li><a href="">-->
                  <!--Licenses-->
                <!--</a></li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="md-layout-item md-medium-size-25 md-large-size-25 md-small-size-100">-->
              <!--<h5>Subscribe to Newsletter</h5>-->
              <!--<p>-->
                <!--Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.-->
              <!--</p>-->
              <!--<form action="" method="" class="form-newsletter">-->
                <!--<div class="md-layout">-->
                  <!--<div class="md-layout-item md-large-size-66 medium-size-50">-->
                    <!--<div class="md-field md-theme-default md-has-placeholder">-->
                      <!--<input type="text" id="md-input-zyl6y53yh" placeholder="Your Email.." class="md-input">-->
                      <!--&lt;!&ndash;&ndash;&gt;-->
                      <!--&lt;!&ndash;&ndash;&gt;-->
                      <!--&lt;!&ndash;&ndash;&gt;-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="md-layout-item md-large-size-33 medium-size-50">-->
                    <!--<button type="button" class="md-button md-primary md-just-icon md-block md-theme-default">-->
                      <!--<div class="md-ripple">-->
                        <!--<div class="md-button-content"><i class="md-icon md-icon-font md-theme-default">mail</i></div>-->
                      <!--</div>-->
                    <!--</button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</form>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<hr>-->
        <ul class="social-buttons">
          <li>

            <a href="http://telegram.me/ed808" class="md-telegram" target="_blank">
              <md-button class="md-icon-button">
                <img src="/images/telegram.svg" height="18" alt="">
              </md-button>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/ED808.ltd" class="md-facebook" target="_blank">
              <md-button class="md-icon-button">
                <i class="zmdi zmdi-facebook"></i>
              </md-button>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/ed808.ltd/" class="md-instagram" target="_blank">
              <md-button class="md-icon-button">
                <i class="zmdi zmdi-instagram"></i>
              </md-button>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/ed808" class="md-linkedin" target="_blank">
              <md-button class="md-icon-button">
                <i class="zmdi zmdi-linkedin"></i>
              </md-button>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCa-R4IdZ-bCbsVTpKzt4r4A" class="md-youtube" target="_blank">
              <md-button class="md-icon-button">
                <i class="zmdi zmdi-youtube"></i>
              </md-button>
            </a>
          </li>
        </ul>
        <div class="copyright">
          Copyright © 2019 808 Educational and Engineering Institute All Rights Reserved.
        </div>
      </div>
    </footer>

  </div>
</template>

<script>

  import axios from '@/node_modules/axios'
  import { cookie } from '@/components/mixins/cookie.js'
  export default {
    name: 'default',
    mixins:[cookie],
    data(){
      return{
        IsLogin:false,
        IsLogOut:false,
        menu_flag:false,
        queryClasses: '',
        inputBox:'',
        aftersubmit:false,
        toggleCard: false
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

<style lang="scss">
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
  .md-menu button {
    margin: 0;
  }
  section#subscribe{
    background: #5a5f64;
    padding: 10px 0 30px 0;
    color: #fff;
    margin-top: auto;
    .input-wrapper{
      position: relative;
      width: 400px;
      margin: auto;
      @media all and (max-width: 700px){
        width: 300px;
      }
    }
    input{
      width: 400px;
      box-sizing: border-box;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
      border-radius: 30px;
      height: 50px;
      -webkit-appearance: button-bevel;
      padding: 0 7%;
      font-size: 15px;
      background: rgba(0, 0, 0, 0.3);
      outline: none;
      color: white;
      @media all and (max-width: 700px){
        width: 300px;
      }
    }
    button{
      position: absolute;
      height: 44px;
      right: -1px;
      top: -2px;
      width: 45px;
      border-radius: 50%;
      -webkit-appearance: button-bevel;
      margin: 5px;
      cursor: pointer;
      background-color: #BA68C8;
      &:before {
        content: '+';
        font-size: 28px;
        color: #ffffff;
      }
    }
  }
  .md-menu.user-links {
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
      top: 8px;
    }
  }


  footer {
    padding: .9375rem 0;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
  }

  footer ul {
    margin: 0;
    padding: 0;
    list-style: none
  }

  footer ul li {
    display: inline-block
  }

  footer ul li a {
    color: inherit!important;
    padding: .9375rem;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 3px;
    position: relative;
    display: block;
  }

  footer ul li a,footer ul li a:hover {
    text-decoration: none
  }

  footer ul li .btn {
    margin: 0
  }

  footer ul.links-horizontal:first-child a {
    padding-left: 0
  }

  footer ul.links-horizontal:last-child a {
    padding-right: 0
  }

  footer ul.links-vertical li {
    display: block;
    margin-left: -5px;
    margin-right: -5px
  }

  footer ul.links-vertical li a {
    padding: 5px
  }

  footer .social-buttons .btn,footer .social-buttons a {
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 0
  }

  footer .footer-brand {
    padding: 15px;
    font-size: 18px;
    margin-left: -15px
  }

  footer .footer-brand,footer .footer-brand:focus,footer .footer-brand:hover {
    color: #3c4858!important
  }

  footer .copyright {
    padding: 15px 0
  }

  footer .copyright .md-icon {
    font-size: 18px!important;
    color: inherit!important
  }

  footer nav ul li a {
    margin-left: -15px
  }

  .footer-white {
    background-color: #fff
  }

  .footer-black {
    background-color: #232323;
    background: radial-gradient(ellipse at center,#585858 0,#232323 100%);
    background-size: 550% 450%
  }

  .footer-black hr {
    border-color: hsla(0,0%,100%,.2)
  }

  .footer-black a {
    opacity: .86
  }

  .footer-black a:focus,.footer-black a:hover {
    opacity: 1
  }

  .footer-black .copyright,.footer-black .footer-brand,.footer-black .footer-brand:focus,.footer-black .footer-brand:hover,.footer-black a,.footer-black h4,.footer-black h5,.footer-black i {
    color: #fff!important
  }

  .footer-big {
    padding: 1.875rem 0
  }

  .footer-big .gallery-feed img {
    width: 20%;
    margin-right: 5%;
    margin-bottom: 5%;
    float: left
  }

  .footer-big .content {
    text-align: left
  }

  .footer-big .social-feed i {
    font-size: 20px;
    padding-right: 10px
  }

  .footer-big .feed-line {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
  }

  .footer-big .feed-line p {
    padding: 0 20px 0 5px
  }



  footer .container,footer .container-fluid {
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
  .footer-big .container, .footer-big .container-fluid, .page-header .container, .page-header .container-fluid, .section .container, .section .container-fluid {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  @media (min-width: 576px){
    .footer .container, .md-toolbar-row, .page-header .container, .section .container {
      max-width: 540px;
    }}
  @media (min-width: 768px){
    .footer .container, .md-toolbar-row, .page-header .container, .section .container {
      max-width: 720px;
    }}

  @media (min-width: 992px){
    .footer .container, .md-toolbar-row, .page-header .container, .section .container {
      max-width: 960px;
    }
  }

  @media (min-width: 1200px){
    .footer .container, .md-toolbar-row, .page-header .container, .section .container {
      max-width: 1140px;
    }
  }
  footer .md-layout {
    margin-right: -15px;
    margin-left: -15px;
  }
  footer .md-layout-item {
    padding-right: 15px;
    padding-left: 15px;
  }
  .footer-big h5{
    color: #3c4858!important;
    text-decoration: none;
  }
  .card-title, .comment .comment-heading, .footer-big h4, .footer-big h5, .footer-brand, .info-title, .title {
    font-weight: bold;
  }
  footer .h5, h5 {
    font-size: 1.0625rem;
    line-height: 1.55em;
    margin-bottom: 15px;
  }
  .card-description, .description, .footer-big p {
    color: #999;
  }
  footer a:not(.md-button):hover {
    text-decoration: none !important;
    color: #9C27B0 !important;
  }
  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    width: 100%;
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .md-facebook .zmdi {
    color: #3b5998;
  }


  .md-twitter .zmdi {
    color: #55acee;
  }


  .md-google .zmdi {
    color: #dd4b39;
  }


  .md-linkedin .zmdi {
    color: #0976b4;
  }


  .md-youtube .zmdi{
    color: #e52d27;
  }


  .md-instagram .zmdi {
    color: #000
  }

  .md-telegram img {
    height: 16px !important;
  }

  footer {
    .md-icon-button {
      .zmdi {
        font-size: 18px !important;
      }
    }
  }

</style>
