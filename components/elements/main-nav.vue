<template>
  <header :class="transparent ? 'transparent' : ''" id="header">
    <div class="inner md-layout">
      <nuxt-link to="/">
        <img
          v-if="transparent"
          src="/images/logo-white.png"
          class="logo"
        >
        <img
          v-else
          src="/images/logo.png"
          class="logo"
        >
      </nuxt-link>
      <div class="md-layout md-gutter" :class="menu_classes()">
        <div
          class="header-menu-text md-layout-item md-size-100"
          style="text-align: right;"
        >
          <md-menu md-direction="bottom-start" class="large-screen">
            <nuxt-link to="/">
              <md-button>Home</md-button>
            </nuxt-link>
          </md-menu>

          <md-menu md-direction="bottom-start">
            <nuxt-link to="/contents">
              <md-button>All Contents</md-button>
            </nuxt-link>
          </md-menu>

          <md-menu md-direction="bottom-start" class="large-screen">
            <nuxt-link to="/aboutus">
              <md-button>About Us</md-button>
            </nuxt-link>
          </md-menu>

          <md-menu md-direction="bottom-start" class="large-screen">
            <nuxt-link to="/contactus">
              <md-button>Contact us</md-button>
            </nuxt-link>
          </md-menu>

          <div
            v-if="!$store.getters.getUid"
            class="md-menu user-links"
          >
            <md-menu md-direction="bottom-start">
              <nuxt-link to="/login">
                <md-button>Login</md-button>
              </nuxt-link>
            </md-menu>

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/register">
                <md-button
                  class="md-raised"
                  style="background: #2196F3;color: #fff;"
                >
                  Register
                </md-button>
              </nuxt-link>
            </md-menu>
          </div>

          <div
            v-else
            class="md-menu user-links loggedin">
            <md-menu
              md-size="big"
              md-direction="bottom-end"
              md-align-trigger
              :md-active.sync="menu_flag">
              <div @click="opening_menu">
                <md-button>
                    <span
                      v-if="$store.state.user.full_name"
                      class="md-xsmall-hide">
                      {{$store.state.user.full_name}}
                    </span>
                  <md-avatar>
                    <img
                      v-if="$store.state.user.picture"
                      :src="$store.state.user.picture"
                      alt="user_image"
                    >
                    <img
                      v-else
                      src="/images/avatar.png"
                      alt="user_image"
                    >
                  </md-avatar>
                </md-button>
              </div>

              <md-menu-content class="user-menu">
                <md-menu-item>
                  <nuxt-link
                    :to="'/user/'+ $store.state.user.uid"
                  >
                    My Profile
                  </nuxt-link>
                </md-menu-item>
                <md-menu-item>
                  <nuxt-link
                    :to="'/user/'+ $store.state.user.uid + '/settings'"
                  >
                    Settings
                  </nuxt-link>
                </md-menu-item>
                <md-menu-item >
                  <a @click="logUserOut" style="cursor: pointer;">Logout</a>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </div>

      <div class="small-screen" v-if="!$store.getters.getUid">
        <!-- در حالت صفحه نمایش کوچیک هم منوی کاربری رو نمایش بده - هر دو حالتش رو -->
        <md-menu
          md-size="big"
          :md-active.sync="toggleCard"
          @click="toggle"
        >
          <md-button>
            <md-icon
              v-if="!toggleCard"
              class="md-primary"
            >
              menu
            </md-icon>
            <md-icon
              v-else
              class="md-primary"
            >
              close
            </md-icon>
          </md-button>

          <md-menu-content class="mobile-menu">
            <div>
              <ul class="md-list md-theme-default">
                <md-menu md-direction="bottom-start">
                  <nuxt-link to="/">
                    <md-button>Home</md-button>
                  </nuxt-link>
                </md-menu>
                <md-menu md-direction="bottom-start">
                  <nuxt-link to="/aboutus">
                    <md-button>About Us</md-button>
                  </nuxt-link>
                </md-menu>
                <md-menu md-direction="bottom-start">
                  <nuxt-link to="/contents">
                    <md-button>All contents</md-button>
                  </nuxt-link>
                </md-menu>
                <md-menu md-direction="bottom-start">
                  <nuxt-link to="/contactus">
                    <md-button>Contact us</md-button>
                  </nuxt-link>
                </md-menu>
                <hr>

                <md-menu
                  v-if="!$store.getters.getUid"
                  md-direction="bottom-start"
                  class="login-in-menu"
                >
                  <nuxt-link to="/login">
                    <md-button>Login</md-button>
                  </nuxt-link>
                  <nuxt-link to="/register">
                    <md-button class="md-raised md-primary" style="background: #2196F3;">Register</md-button>
                  </nuxt-link>
                </md-menu>

                <!--we dont show this menu if user is logged in-->
                <!--<li-
                  v-if="$store.getters.getUid"
                  class="md-list-item md-menu-item md-theme-default"
                >
                  <md-menu md-direction="bottom-start">
                    <nuxt-link :to="'/user/'+ $store.state.user.uid">
                      <md-button class="md-raised">
                        My Profile
                      </md-button>
                    </nuxt-link>
                  </md-menu>
                </li>
                <li
                  v-if="$store.getters.getUid"
                  class="md-list-item md-menu-item md-theme-default"
                >
                  <md-menu
                    md-direction="bottom-start"
                    @click="logUserOut"
                  >
                    <md-button class="md-raised">
                      Log out
                    </md-button>
                  </md-menu>
                </li>-->
              </ul>
            </div>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </header>

</template>

<script>
import axios from '@/node_modules/axios'
import { cookie } from '@/components/mixins/cookie.js'

export default {
  name: "MainNav",
  mixins: [cookie],
  props:['transparent'],
  data() {
    return {
      toggleCard: false,
      loginActive: false,
      IsLogin:false,
      IsLogOut:false,
      menu_flag:false,
    }
  },
  methods: {
    opening_menu(){
      this.menu_flag = !this.menu_flag
    },
    toggle () {
      this.toggleCard = !this.toggleCard
    },
    menu_classes() {
      return {'large-screen': !this.$store.getters.getUid };
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
          window.location.reload()
        })
        .catch(e => {
          console.log('errors for logout : ' + e)
        });
    },
  }
}
</script>

<style scoped>


</style>
