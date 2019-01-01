<template>
  <div>
    <header id="header">
      <div class="inner md-layout">

        <img src="http://ed808.com/staticfile/logo.png" class="logo">

        <div class="md-layout md-gutter large-screen">
          <div class="header-menu-text md-layout-item md-size-100" style="text-align: right;">

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/"><md-button>Home</md-button></nuxt-link>
            </md-menu>

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/about-us"><md-button>about us</md-button></nuxt-link>
            </md-menu>

            <md-menu md-direction="bottom-start">
              <nuxt-link to="/contents"><md-button>all contents</md-button></nuxt-link>
            </md-menu>

            <div v-if="!IsLogin" class="md-menu user-links">
              <md-menu md-direction="bottom-start">
                <nuxt-link to="/login"><md-button>login</md-button></nuxt-link>
              </md-menu>

              <md-menu md-direction="bottom-start">
                <nuxt-link to="/register">
                  <md-button class="md-raised" style="background: #2196F3;color: #fff;">register</md-button>
                </nuxt-link>
              </md-menu>
            </div>

            <div v-else class="md-menu user-links">
              <md-menu md-size="big"  md-direction="bottom-end" md-align-trigger :md-active.sync="menu_flag">
                <div @click="opening_menu" style="cursor: pointer;">
                  <span v-if="user.username" style="display: inline-block;vertical-align: middle;margin: 0 10px -20px 15px;">{{user.username}}</span>
                  <md-button class="md-icon-button">
                    <md-avatar>
                      <img v-if="user.picture" v-bind:src="user.picture" alt="user_image">
                      <img v-else src="http://civil808.com/en/staticfile/avatar.png" alt="user_image">
                    </md-avatar>
                  </md-button>
                </div>

                <md-menu-content>
                  <md-menu-item>
                    <nuxt-link :to="'/user/'+ user.uid" target="_blank">My Profile</nuxt-link>
                  </md-menu-item>
                  <md-menu-item @click="logUserOut">log out</md-menu-item>
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
                      <nuxt-link to="/about-us"><md-button>about us</md-button></nuxt-link>
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

    <!--Content Goes Here-->
    <nuxt/>
    <!-- end of content-->

  </div>
</template>

<style>

</style>
