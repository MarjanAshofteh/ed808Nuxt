<template>
  <div class="with-background">
    <transition name="fade">
      <div class="login-card-page topic-selection"  v-if="registered">
        <div class="card card-signup card-topics">
          <p>Tell us what you're interested in:</p>
          <div class="card-content">
            <div class="interested-topics" v-if="topics.length > 0">
              <div
                v-for="(t, index) in topics"
                :key="index"
                class="topic"
                :class="t.selected ? 'topic-active' : ''"
                :style="`background-image: url(${t.picture})`"
                @click="addToInterests(t.tid, index, $event)"
              >
                <span class="inside-text">
                  {{ t.name }}
                </span>
                <span class="check-text" v-if="t.selected" style="bottom: calc(50% - 13px);">
                  <i class="mdi mdi-check"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="footer text-center" style="float: left; width: 100%">
            <md-button
              form="registerForm"
              class="md-primary"
              @click="submitInterests()"
              :disabled="sending"
            >
              Done
            </md-button>
          </div>




        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="login-card-page"  v-if="!registered">
        <div class="card card-signup">
            <div class="header header-primary text-center">

              <h4 class="card-title">Register in with</h4>
              <div class="social-line">
                <a href="#pablo" class="btn btn-just-icon btn-simple">
                  <md-button class="md-icon-button">
                    <i class="mdi mdi-linkedin-box"></i>
                  </md-button>
                  <md-tooltip>Linkedin</md-tooltip>
                </a>
                <md-progress-bar
                  v-if="sending"
                  md-mode="indeterminate"
                />
              </div>

            </div>
            <p>Or register with your personal data</p>
            <div class="card-content">
              <form
                novalidate
                @submit.prevent="formSubmit"
                id="registerForm"
              >
                <md-field :class="getValidationClass('fullName')" class="input-with-icon">
                  <label for="fullName">Full Name</label>
                  <span class="icon-prefix mdi mdi-account-card-details"></span>
                  <md-input name="fullName" id="fullName" autocomplete="given-name" v-model="form.fullName" :disabled="sending" required/>
                  <span class="md-error" v-if="!$v.form.fullName.required">The full name is required</span>
                  <span class="md-error" v-else-if="!$v.form.fullName.minLength">Should be at least 3 character</span>
                </md-field>

                <md-field :class="getValidationClass('email')"  class="input-with-icon">
                  <label for="email">Email</label>
                  <span class="icon-prefix mdi mdi-email"></span>

                  <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" required/>
                  <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                  <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                </md-field>

                <md-field :class="getValidationClass('username')" class="input-with-icon">
                  <label for="username">Username</label>
                  <span class="icon-prefix mdi mdi-account-circle"></span>
                  <md-input id="username" name="username" v-model="form.username" autocomplete="given-name" :disabled="sending" required/>
                  <span class="md-error" v-if="!$v.form.username.required">The Username is required</span>
                  <!--<span class="md-error" v-else-if="!$v.form.mobile.taken">The User is already taken</span>-->
                </md-field>

                <md-field :class="getValidationClass('password')" class="input-with-icon">
                  <span class="icon-prefix mdi mdi-lock"></span>
                  <label for="password">Password</label>
                  <md-input type="password" id="password" name="password" v-model="form.password" autocomplete="new-password" :disabled="sending" required/>
                  <span class="md-error" v-if="!$v.form.password.required">The Password is required</span>
                  <span class="md-error" v-else-if="!$v.form.password.minLength">Should be at least 6 character</span>
                </md-field>

                <md-field :class="getValidationClass('rePassword')" class="input-with-icon">
                  <span class="icon-prefix mdi mdi-lock"></span>
                  <label for="rePassword">Password Confirmation</label>
                  <md-input type="password" id="rePassword" name="rePassword" v-model="form.rePassword" autocomplete="new-password" :disabled="sending" required/>
                  <span class="md-error" v-if="!$v.form.rePassword.required">The Password Confirmation is required</span>
                  <span class="md-error" v-else-if="!$v.form.rePassword.sameAsPassword">Password is not the same</span>
                </md-field>

                <vue-recaptcha
                  ref="recaptcha"
                  @verify="saveUser"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  sitekey="6Ldp3XMUAAAAACZav47_l9to_2uESNGLa1RvQOU6">
                </vue-recaptcha>

                <md-snackbar :md-active.sync="userSaved">
                  {{ lastUser }} you are registered successfully!
                </md-snackbar>
                <md-snackbar
                  class="error"
                  :md-active.sync="showError"
                >
                  {{ errors }}
                </md-snackbar>
              </form>
            </div>
            <div class="footer text-center">
              <md-button
                form="registerForm"
                type="submit"
                class="md-primary"
                :disabled="sending"
              >
                Join
              </md-button>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>



import axios from '@/node_modules/axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  sameAs
} from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'
import { cookie } from '@/components/mixins/cookie.js'

export default {
  name: 'Register',
  scrollToTop: true,
  layout: 'static',
  middleware: ['isauth'],
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  mixins: [validationMixin,cookie],
  data: () => ({
    errors:'',
    showError:false,
    registered: false,
    topics: [],
    selectedTopics: [],
    form: {
      fullName: null,
      email: null,
      username: null,
      password: null,
      rePassword: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      fullName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      username: {
        required,
        //taken
      },
      password: {
        required,
        minLength: minLength(6)
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  mounted(){
    this.$store.state.backGround = '/images/login-bg.jpg'
    this.getTopics()

  },
  methods: {
    submitInterests(){
      this.sending = true
      let topics = []

      this.topics.forEach((el)=>{
        if(el.selected)
          topics.push(el.tid)
      })
      console.log(topics)
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      axios.post('https://ed808.com:92/latin/user/interests',
        {
          topics : topics
        },
        {
          headers: {
            'Content-type': 'application/json',
            'X-CSRF-Token': this.getCookie("token")
          }
        }
      )
        .then(()=>{
          this.sending = false
          window.location.reload()
        })
    },
    getTopics(){

      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      axios.get('https://ed808.com:92/latin/contents/list/topics',{},{
        headers: {
          'Content-type': 'application/json',
        }
      })
        .then((data)=>{
          data.data.forEach((el)=> {
            let obj = {
              tid: el.tid,
              name: el.name,
              picture: el.picture,
              selected: false,
              height: false
            }
            this.topics.push(obj)
          })
        })
    },
    addToInterests(topic, index, event){
      this.topics[index].selected = !this.topics[index].selected
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.fullName = null
      this.form.email = null
      this.form.username = null
      this.form.password = null
      this.form.rePassword = null
      this.showError = false
      this.errors = ''
    },
    async saveUser(recaptchaToken) {
      this.sending = true
      this.$refs.recaptcha.reset();

      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      await axios.post('https://ed808.com:92/latin/user/register',
        {
          hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          username : this.form.username,
          password : this.form.password,
          email : this.form.email,
          full_name : this.form.fullName,
          reCaptchaToken : recaptchaToken
        },
        {
          headers: {
            'Content-type': 'application/json',
          }
        })
        .then((data) => {
          //set uid in store
          this.$store.commit('SET_USER',data.data.uid)
          //set token in cookie
          this.setCookie('token', data.data.token , 23)
          this.lastUser = `${this.form.fullName}`
          this.userSaved = true
          this.sending = false
          // redirect after successfull login
          this.registered = true
          // window.location.reload()
        })
        .catch(e => {
          if(e.hasOwnProperty('response')){
            if(e.response.hasOwnProperty('data'))
              this.errors = e.response.data
            else{
              this.errors = e.response
            }
          }
          else{
            this.errors = e
          }
          this.showError = true
        })
      this.clearForm()
    },
    formSubmit() {
      //validating form
      this.$v.$touch()
      //run recaptcha and let it to fire up 'saveUser' function with google token
      if (!this.$v.$invalid) {
        this.$refs.recaptcha.execute();
      }
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    },
  }
}

</script>

<style lang="scss" scoped>

  .login-card-page {
    width: 30%;
    margin: auto;
    margin-top: 80px;
    &.topic-selection {
      width: 60%;
      margin-top: 0px;
      @media screen and (max-width: 992px) {
        width: 75%;
      }
      @media screen and (max-width: 600px) {
        width: 90%;
      }
    }
    @media screen and (max-width: 992px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }

  .card.card-signup {
    display: inline-block;
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 6px;
    color: rgba(0,0,0, 0.87);
    background: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    .footer {
      margin-top: 15px;
      padding-bottom: 15px;
      a {
        background-color: transparent;
        color: #9c27b0;
        padding: 18px 5px;
        display: inline-block;
      }
    }


    .card-content {
      padding: 0px 25px 0px 60px;
      .input-with-icon {
        position: relative;
        .icon-prefix {
          position: absolute;
          left: -35px;
          top: 21px;
          font-size: 24px;
          color: #757575;
        }
        .md-input {

        }
      }
      .interested-topics {
        position: relative;
        text-align: justify;
        height: auto;
        .topic {
          width: calc( 25% - 10px);
          margin: 0 5px;
          margin-bottom: 10px;
          border-radius: 5px;
          float: left;
          background-position: center;
          background-size: cover;
          position: relative;
          @media screen and (max-width: 720px) {
            width: calc( 50% - 10px);
          }
          &:after {
            content: '';
            padding-bottom: 100%;
            border-radius: 5px;
            background-color: rgba(0,0,0,0.4);
            display: block;
            transition-duration: 0.5s;
          }
          &.topic-active {
            &:after {
              background-color: rgba(0,0,0,0.7);
            }
          }
          span.inside-text {
            position: absolute;
            text-align: left;
            font-weight: 500;
            bottom: 10px;
            left: 10px;
            right: 10px;
            vertical-align: middle;
            color: #dbdbdb;
            transition-duration: 0.5s;
            .mdi {
              font-size: 30px;
            }
          }
          span.check-text {
            position: absolute;
            /*top: calc( 50% - 13px );*/
            color: #fff;
            top: 10px;
            left: 10px;
            right: 10px;
            text-align: right;
            transition-duration: 0.5s;
            .mdi {
              font-size: 30px;
            }
          }
          &:hover {
            cursor: pointer;
            &:after {
              background-color: rgba(0,0,0,0.7);
            }
            span.inside-text {
              color: #fff;
            }
          }
        }
      }
    }
    &.card-topics{
      .card-content {
        padding: 0 10px;

      }
    }
    .header {
      box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
      margin-left: 20px;
      margin-right: 20px;
      margin-top: -40px;
      padding: 20px 0;
      border-radius: 3px;
      position: relative;
      .md-progress-bar{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom-right-radius:3px ;
        border-bottom-left-radius:3px ;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.50);

      }
      .md-progress-bar.md-theme-default.md-indeterminate .md-progress-bar-track:after, .md-progress-bar.md-theme-default.md-indeterminate .md-progress-bar-fill:after, .md-progress-bar.md-theme-default.md-query .md-progress-bar-track:after, .md-progress-bar.md-theme-default.md-query .md-progress-bar-fill:after {
        background-color: #92278f66 !important;
      }
    }
    .header-primary, .content-primary {
      background: linear-gradient(60deg, #AB47BC, #7b1fa2);
      .card-title {
        color: #fff;
        font-weight: 700;
        font-family: "Roboto Slab";
      }
    }
    .social-line {
      margin-top: 15px;
      text-align: center;
      padding: 0;
    }
    .btn-just-icon {
      .mdi {
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
