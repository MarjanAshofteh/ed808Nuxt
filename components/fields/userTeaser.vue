<template>
  <div>
    <!--author profile card-->
    <div class="author" v-if="teaserType == 'author'">
      <md-content class="md-elevation-2">
        <div class="author-details">
          <div class="userimage">
            <nuxt-link :to="'/user/'+uid" target="_blank">
              <md-avatar class="md-large">
                <img v-if="picture" :src="picture" alt="user_image" />
                <img v-else src="/images/avatar.png" alt="user_image" />
              </md-avatar>
            </nuxt-link>
          </div>
          <md-content class="userdetails">
            <p>Written By:</p>
            <nuxt-link :to="'/user/'+uid">
              {{ name }}
            </nuxt-link>
            <span v-if="$store.getters.getUid != uid">
              <button
                class="md-follow"
                :class="following ? 'active' : ''"
                @click="follow(following, uid)"
              >
                {{ following ? 'Following' : 'Follow' }}
              </button>
            </span>

          </md-content>
        </div>
        <div class="about-author">
          <p>{{ about_me }}</p>
        </div>
      </md-content>
    </div>

    <!--list item type-->
    <div class="user-teaser" v-if="teaserType == 'list-item'">
      <div class="user-card">
        <nuxt-link :to="`/user/${uid}`">
          <img :src="picture != null ? picture : '/images/avatar.png'" alt="" width="64px">
          <p>
            <span class="name">{{name}}</span>
            <br>
            <span class="desc"> {{ about_me != null ? about_me.substring(0,30) : ' ' }} </span>
          </p>
        </nuxt-link>
        <span v-if="$store.getters.getUid != uid">
            <button
              class="md-follow"
              :class="following ? 'active' : ''"
              @click="follow(following, uid)"
            >
              {{ following ? 'Following' : 'Follow' }}
            </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "@/node_modules/axios";
  import { cookie } from "@/components/mixins/cookie.js";

  export default {
    name: "UserTeaser",
    mixins: [cookie],
    props: [
      'teaserType',
      'uid',
      'name',
      'picture',
      'about_me',
      'following'
    ],
    data() {
      return {

      }
    },
    methods: {
      follow(following, uid) {
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
            this.following = !this.following;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin main-center-content(){
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
    padding: 0 15px;
    @media screen and (max-width: 992px){
      width: 80%;
      margin: auto;
    }
    @media screen and (max-width: 60px){
      width: 90%;
      margin: auto;
    }
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
      position: absolute;
      min-width: 80px;
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
  .author {
    @include main-center-content();
    .author-details {
      align-items: center;
      padding: 20px !important;
      display: flex;
      border-bottom: 1px solid #f5f5f5;
    }
    .userimage {
      text-align: center;
      width: 64px;
    }
    .userdetails {
      width: calc(100% - 64px);
      padding-left: 20px;
      position: relative;
      a {
        font-size: 18px;
        font-weight: bold;
      }
      p {
        margin: 0;
      }
    }
    .about-author {
      padding: 20px;
      img {

      }
      p {
        margin: 0;
      }
    }
    button {
      right: 0;
      top: 9px;
    }
  }
  .user-teaser {
    position: relative;
    padding: 5px;
    .user-card {
      p {
        text-align: left;
        margin-left: 70px;
        margin-right: 70px;
        margin-top: 12px;
        line-height: 18px;
        color: #212121;
        .name {
          font-weight: 500;
        }
        .desc {
          color: #626262;
          font-weight: 300;
          font-size: 12px;
        }
      }
      img {
        position: absolute;
        left: 0;
        top: 3.5px;
        border-radius: 50%;
      }
      button {
        right: 0;
        top: 21px;
      }

    }
  }
</style>
