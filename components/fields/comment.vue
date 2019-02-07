<template>
  <div>

    <!--section title-->
    <h2 class="section-title">
      Comments:
    </h2>
    <!--end of section title-->

    <!--form and comments-->
    <div class="comment-list">

      <!--Comment form-->
      <div class="comment-card comment-form">
        <form>
          <md-card-header v-if="$store.getters.getUid">
            <md-avatar>
              <img
                :src="$store.state.user.picture"
                alt="Avatar"
              >
            </md-avatar>
            <div class="md-commentor" v-text="$store.state.user.full_name"></div>
            <div class="md-right">
              <md-button
                :disabled="commentText == ''"
                class="md-dense md-primary"
                @click="submitComment(0)"
              >
                Submit
              </md-button>
            </div>
          </md-card-header>
          <md-card-header v-else>
            <div>You need
              <nuxt-link to="/login">Login</nuxt-link>
              or
              <nuxt-link to="/register">Register</nuxt-link>
              to submit your comment.</div>
          </md-card-header>
          <md-card-content v-if="$store.getters.getUid">
            <md-field>
              <label>Write your comment</label>
              <md-textarea
                v-model="commentText"
                :class="{'active': textareaActive}"
                :disabled="onSubmit"
                @focus="textareaActive = true"
              />
              <md-snackbar
                class="error"
                :md-active.sync="commentErr"
                :md-duration="snackbarDuration"
              >
                {{ commentErr }}
              </md-snackbar>
            </md-field>
          </md-card-content>
        </form>

      </div>
      <!--end of Comment form-->

      <!--loading box-->
      <div class="comment-card" v-if="commentLoading">
        <md-card-header>
          Loading Comments ...
        </md-card-header>
      </div>
      <!--end of loading box-->

      <!--Parent Comment-->
      <div v-for="c in commentList">
          <div>
            <div class="comment-card">
              <div class="md-layout">
                <div class="md-layout-item md-size-20">
                  <div class="user-details">
                    <md-avatar>
                      <img
                        :src="c.author_pic"
                        alt="Avatar"
                      >
                    </md-avatar>
                    <div class="md-title">
                      <nuxt-link :to="'/user/'+c.uid">
                        {{ c.author_name ? c.author_name : c.author_username }}
                      </nuxt-link>
                    </div>
                    <div class="md-date">
                      {{ c.created }}
                    </div>
                  </div>
                </div>
                <div class="md-layout-item">
                  <!-- comment body -->
                  <div class="md-comment-body">
                    <p v-html="c.body" v-if="onEditing != c.cid"/>
                    <md-field
                      v-if="onEditing == c.cid"
                      class="reply-box"
                      style="margin-bottom: 5px"
                    >
                      <label>Edit your comment</label>

                      <md-textarea
                        ref="reply"
                        v-model="editingCommentBody"
                        :disabled="onSubmit"
                      />
                    </md-field>
                    <!-- reply box -->
                    <transition name="fade">
                      <md-field
                        v-if="onReply == c.cid"
                        class="reply-box"
                      >
                        <label>Write your reply</label>

                        <md-textarea
                          ref="reply"
                          v-model="replyText"
                          :disabled="onSubmit"
                        />
                      </md-field>
                    </transition>
                    <!-- end of reply box -->
                    <!-- comment actions -->
                    <div class="comment-action" v-if="$store.getters.getUid">

                      <!--Submit Edit-->
                      <md-button
                        v-if="onEditing == c.cid"
                        class="md-icon-button md-primary md-dense"
                        @click="editComment(c.cid)"
                      >
                        <md-icon style="font-size: 20px!important;">
                          done
                        </md-icon>
                        <md-tooltip md-direction="bottom">
                          Submit your changes
                        </md-tooltip>
                      </md-button>

                      <!--Cancel Edit-->
                      <md-button
                        v-if="onEditing == c.cid"
                        class="md-icon-button md-primary md-dense"
                        @click="onEditing = false"
                      >
                        <md-icon style="font-size: 20px!important;">
                          close
                        </md-icon>
                        <md-tooltip md-direction="bottom">
                          Discard your comment
                        </md-tooltip>
                      </md-button>

                      <!--Send Reply-->
                      <md-button
                        v-if="onReply == c.cid && replyText != '' "
                        class="md-icon-button md-primary md-dense"
                        @click="submitComment(c.cid)"
                      >
                        <md-icon style="font-size: 20px!important;">
                          send
                        </md-icon>
                        <md-tooltip md-direction="bottom">
                          Send your reply
                        </md-tooltip>
                      </md-button>

                      <!--Cancel Reply-->
                      <md-button
                        v-if="onReply == c.cid "
                        class="md-icon-button md-primary md-dense"
                        @click="onReply = false"
                      >
                        <md-icon style="font-size: 20px!important;">
                          close
                        </md-icon>
                        <md-tooltip md-direction="bottom">
                          Discard your message
                        </md-tooltip>
                      </md-button>

                      <!--More Functions Menu-->
                      <md-button
                        class="md-icon-button md-primary md-dense"
                        @click="showReplyBox(c.cid); onEditing = false"
                      >
                        <md-icon>reply</md-icon>
                        <md-tooltip md-direction="bottom">
                          Reply to this Comment
                        </md-tooltip>
                      </md-button>
                      <md-menu
                        md-size="small"
                        :md-offset-x="127"
                        :md-offset-y="-36"
                        v-if="$store.getters.getUid == c.uid"
                      >
                        <md-button
                          class="md-icon-button md-primary md-dense"
                          md-menu-trigger
                        >
                          <md-icon>more_vert</md-icon>
                          <md-tooltip md-direction="bottom"  v-if="$store.getters.getUid == c.uid">
                            More Functions
                          </md-tooltip>
                        </md-button>

                        <md-menu-content v-if="$store.getters.getUid == c.uid">
                          <md-menu-item @click="onEditing = c.cid; editingCommentBody = c.body; onReply = false">
                            <md-icon>edit</md-icon>Edit
                          </md-menu-item>
                          <md-menu-item @click="deleteComment(c.cid)">
                            <md-icon>clear</md-icon>Delete
                          </md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </div>
                    <!-- end of comment actions -->

                  </div>
                  <!-- end of comment body -->
                </div>
              </div>
            </div>
          </div>

          <!--Replies of parent-->
          <div
            v-for="r in c.replies"
            class="reply-comment"
          >
            <div class="comment-card">
              <div class="md-layout">
                <div class="md-layout-item md-size-20">
                  <div class="user-details">
                    <!--<md-avatar>-->
                      <!--<img-->
                        <!--:src="r.author_pic"-->
                        <!--alt="Avatar"-->
                      <!--&gt;-->
                    <!--</md-avatar>-->
                    <div class="md-title">
                      <nuxt-link :to="'/user/'+r.uid">
                        {{ r.author_name ? r.author_name : r.author_username }}
                      </nuxt-link>
                    </div>
                    <div class="md-date">
                      {{ r.created }}
                    </div>
                  </div>
                </div>
                <div class="md-layout-item">
                  <!-- comment body reply-->
                  <div class="md-comment-body">
                    <p v-html="r.body" v-if="onEditing != r.cid"/>
                    <md-field
                      v-if="onEditing == r.cid"
                      class="reply-box"
                      style="margin-bottom: 5px"
                    >
                      <label>Edit your comment</label>

                      <md-textarea
                        ref="reply"
                        v-model="editingCommentBody"
                        :disabled="onSubmit"
                      />
                    </md-field>

                    <!-- comment actions reply -->
                    <div class="comment-action">

                      <!--Submit Edit for reply-->
                      <md-button
                        v-if="onEditing == r.cid"
                        class="md-icon-button md-primary md-dense"
                        @click="editComment(r.cid)"
                      >
                        <md-icon style="font-size: 20px!important;">
                          done
                        </md-icon>
                        <md-tooltip md-direction="bottom">
                          Submit your changes
                        </md-tooltip>
                      </md-button>

                      <!--Cancel Edit for reply-->
                      <md-button
                        v-if="onEditing == r.cid"
                        class="md-icon-button md-primary md-dense"
                        @click="onEditing = false"
                      >
                        <md-icon style="font-size: 20px!important;">
                          close
                        </md-icon>
                        <md-tooltip md-direction="bottom">
                          Discard changes
                        </md-tooltip>
                      </md-button>

                      <!--More Functions Menu for reply-->
                      <md-menu
                        md-size="small"
                        :md-offset-x="127"
                        :md-offset-y="-36"
                        v-if="$store.getters.getUid == r.uid"
                      >

                        <md-button
                          class="md-icon-button md-primary md-dense"
                          md-menu-trigger
                        >
                          <md-icon>more_vert</md-icon>
                          <md-tooltip md-direction="bottom">
                            More Functions
                          </md-tooltip>
                        </md-button>
                        <md-menu-content v-if="$store.getters.getUid == r.uid">
                          <md-menu-item @click="onEditing = r.cid; editingCommentBody = r.body">
                            <md-icon>edit</md-icon>Edit
                          </md-menu-item>
                          <md-menu-item @click="deleteComment(r.cid)">
                            <md-icon>clear</md-icon>Delete
                          </md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </div>
                    <!-- end of comment actions reply -->
                  </div>
                  <!-- end of comment body reply -->
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
    <!--end of form and comments-->

  </div>

</template>

<script>
import axios from "@/node_modules/axios"
import { cookie } from '@/components/mixins/cookie.js'

export default {
  name: "Comment",
  mixins: [cookie],
  props: {
    nid: String
  },
  data() {
    return {
      commentText:'',
      replyText:'',
      commentList: [],
      onReply: {},
      textareaActive: false,
      onSubmit: false,
      commentErr: false,
      snackbarDuration: 5000,
      commentLoading: true,
      onEditing: false,
      editingCommentBody: ''
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    submitComment(pid){
      this.onSubmit = true;
      console.log('Submit');
      axios.defaults.withCredentials = true;
      axios
        .post("http://ed808.com:91/latin/comments" ,{
          "nid" : this.nid,
          "pid" : pid,
          "body" : pid != 0 ? this.replyText : this.commentText
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token' : this.getCookie('token')
          }
        })
        .then(response => {
          this.replyText = '';
          this.commentText = '';
          this.textareaActive = false;
          this.commentErr = false;
          this.getComments();
          this.onReply = null;
          this.onSubmit = false;
        })
        .catch(err => {
          console.log(err.response);
          if(err.response.statusText){
            this.commentErr = err.response.statusText;
          }else {
            this.commentErr = 'Error While Sending Request';
          }
          this.onSubmit = false;
        });
    },
    editComment(cid){
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      axios
        .put("http://ed808.com:91/latin/comments/"+cid ,{
          "body": this.editingCommentBody
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token' : this.getCookie('token')
          }
        })
        .then(response => {
          this.commentErr = false;
          this.onEditing = false;
          this.editingCommentBody = false
          this.getComments();
        })
        .catch(err => {
          console.log(err);
          if(err.response.statusText){
            this.commentErr = err.response.statusText;
          }else {
            this.commentErr = 'Error While Sending Request';
          }
          this.onSubmit = false;
        });
    },
    deleteComment(cid){
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      axios
        .delete("http://ed808.com:91/latin/comments/"+cid , {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token' : this.getCookie('token')
          }
        })
        .then(response => {
          this.commentErr = false;
          this.getComments();
        })
        .catch(err => {
          console.log(err);
          if(err.response.statusText){
            this.commentErr = err.response.statusText;
          }else {
            this.commentErr = 'Error While Sending Request';
          }
          this.onSubmit = false;
        });
    },
    showReplyBox(commentID) {
      this.commentText = '';
      this.replyText = '';
      this.onReply = commentID;
      // this.$nextTick(() => {
      //   this.$refs.reply.focus()
      // })
    },
    getComments() {
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      axios
        .get("http://ed808.com:91/latin/contents/"+ this.nid +"/comments")
        .then(response => {
          this.commentErr = false;
          this.commentLoading = false;
          this.commentList = response.data;
        })
        .catch(err => {
          console.log(err);
          if(err.response.statusText){
            this.commentErr = err.response.statusText;
          }else {
            this.commentErr = 'Error While Sending Request';
          }

        });
    }
  }
};
</script>

<style lang='scss' scoped>
@mixin main-center-content() {
  max-width: 800px;
  text-align: left;
  direction: ltr;
  margin: auto;
  padding: 0 15px;
}

.comment-list {
  @include main-center-content();
  .comment-card {
    padding: 10px 0;
    padding-bottom: 5px;
    margin-top: 20px;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.09);
  }
  .comment-form {
    padding: 0;
    .md-card-header {
      position: relative;
      margin-bottom: 0;
      border-bottom: 1px solid #d9d9d9;
      .md-commentor {
        line-height: 40px;
        display: inline-flex;
      }
      .md-right {
        position: absolute;
        right: 16px;
        top: 16px;
        padding: 4px;
        display: inline-block;
      }
    }
    .md-card-content {
      padding: 16px;
      .md-field.md-theme-default.md-has-textarea:not(.md-autogrow):after {
        border-color: #d9d9d9;
      }
      .md-field {
        margin-bottom: 5px;
        .md-textarea {
          min-height: 50px;
          transition: 1s;
          -webkit-transition: 1s;
        }
        .md-textarea.active {
          height: auto;
          min-height: 100px;
          transition: 1s;
          -webkit-transition: 1s;
        }
      }
    }
  }
  .user-details {
    text-align: center;
    align-content: center;
    padding: 5px 5px;
    .md-title {
      font-size: 12px;
    }

    .md-avatar {
      display: block;
      width: 48px;
      height: 48px;

      margin: 5px auto;
    }
    .md-date {
      font-size: 10px;
    }
  }
  .md-comment-body {
    padding: 10px 10px;
    p {
    }
    .comment-action {
      text-align: right;
    }
  }
  .reply-comment {
    margin-left: 30px;
    .comment-card {
      background: #f9f9f9;
      margin-top: 2px;
      p{
        margin: 0;
      }
    }
  }
  .md-red {
    color: #ff5252;
  }
}
.md-list-item-content > .md-icon:first-child {
  margin-right: 0px;
}
.md-list-item-content > .md-icon:last-child {
  margin-left: 0px;
}
.md-button.md-theme-default.md-primary {
  .md-icon-font {
    color: rgba(0, 0, 0, 0.54);
    color: rgba(0, 0, 0, 0.54);
    color: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.54));
  }
}

.md-button.md-theme-default.md-primary:hover {
  .md-icon-font {
    color: #92278f;
    color: #92278f;
    color: var(--md-theme-default-primary-on-background, #92278f);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.md-field.reply-box {
  margin-bottom: 0;
}
.md-field.md-theme-default.md-has-textarea:not(.md-autogrow):after {
  border-color: #d9d9d9;
}
.md-field.reply-box.md-has-textarea:not(.md-autogrow) .md-textarea {
  min-height: 50px;
}
</style>
