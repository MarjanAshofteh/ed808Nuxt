<template>

      <div class="card card-signup">
        <div class="header header-primary text-center">
          <md-progress-bar
            v-if="loading.sending"
            md-mode="indeterminate"
          />
          <h4 class="card-title">Log in with</h4>
          <div class="social-line">
            <a href="#pablo" class="btn btn-just-icon btn-simple">
              <md-button class="md-icon-button">
                <i class="mdi mdi-facebook-box"></i>
              </md-button>
            </a>
            <a href="#pablo" class="btn btn-just-icon btn-simple">
              <md-button class="md-icon-button">
                <i class="mdi mdi-twitter"></i>
              </md-button>
            </a>
            <a href="#pablo" class="btn btn-just-icon btn-simple">
              <md-button class="md-icon-button">
                <i class="mdi mdi-google-plus"></i>
              </md-button>
            </a>
          </div>

        </div>
        <p>Or login with your username</p>
        <div class="card-content">
          <form
            novalidate
            @submit.prevent="formSubmit"
            id="loginForm"
          >
            <md-field
              class="input-with-icon"
              :class="getValidationClass('emailOrUsename')"
            >
              <label>Username</label>
              <span class="icon-prefix mdi mdi-account-circle"></span>
              <span
                v-if="!$v.form.username_email.required"
                class="md-error"
              ></span>
              <md-input
                id="username_email"
                v-model="form.username_email"
                name="username_email"
                autocomplete="email"
                :disabled="loading.sending"
                required
              ></md-input>
            </md-field>
            <md-field
              class="input-with-icon"
              :class="getValidationClass('password')"
            >
              <label>Password</label>
              <span class="icon-prefix mdi mdi-lock"></span>
              <span
                v-if="!$v.form.password.required"
                class="md-error"
              ></span>
              <md-input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                :disabled="loading.sending"
                autocomplete="current-password"
                required
              ></md-input>
            </md-field>
            <vue-recaptcha
              ref="recaptcha"
              @verify="logUserIn"
              @expired="onCaptchaExpired"
              size="invisible"
              sitekey="6Ldp3XMUAAAAACZav47_l9to_2uESNGLa1RvQOU6">
            </vue-recaptcha>

            <md-snackbar :md-active.sync="userSaved">
              {{ lastUser }} you are log in successfully!
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
            v-if="!pageComponent"
            @click="hideLogin()"
            class="md-primary"
            :disabled="loading.sending"
          >
            Not Now
          </md-button>
          <md-button
            form="loginForm"
            type="submit"
            class="md-primary"
            :disabled="loading.sending"
          >
            Log In
          </md-button>
        </div>
      </div>

</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { cookie } from '@/components/mixins/cookie.js'
  import axios from "@/node_modules/axios"

  export default {
    name: 'Login',
    scrollToTop: true,
    props:[
      'pageComponent',
      'loginActive'
    ],
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    mixins: [validationMixin,cookie],
    data(){
      return{
        errors:'',
        showError:false,
        sessid:'',
        session_name:'',
        token:'',
        form:{
          username_email: null,
          password: null,
        },
        userSaved: false,
        loading: {sending: false},
        lastUser: null
      }
    },
    validations: {
      form: {
        username_email: {
          required
        },
        password: {
          required
        }
      }
    },
    mounted(){
      // middleware implemented
      // if(this.$store.getters.getUid){
      //   this.$router.push('/user/'+ this.$store.getters.getUid)
      // }
    },
    methods:{
      hideLogin(){
        this.$emit('hideLoginCard')
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm(){
        this.$v.$reset()
        this.form.username_email = null
        this.form.password = null
        this.showError = false
        this.errors = ''
      },
      async logUserIn(recaptchaToken){
        this.loading.sending = true
        this.$refs.recaptcha.reset();

        axios.defaults.crossDomain = true;
        axios.defaults.withCredentials = true;
        await axios.post('https://ed808.com:92/latin/user/login',
          {
            hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            username_email : this.form.username_email,
            password : this.form.password,
            reCaptchaToken : recaptchaToken
          },
          {
            headers: {
              'Content-type': 'application/json'
            }
          }).then((data) => {
          //set uid in store
          this.$store.commit('SET_USER',data.data.uid)
          //set token in cookie
          this.setCookie('token', data.data.token , 23)
          this.lastUser = `${this.form.username_email}`
          this.userSaved = true
          this.loading.sending = false
          //redirect after successful login
          if(this.$route.query.hasOwnProperty('callback'))
            window.location.replace(this.$route.query.callback)
          else
            window.location.reload()
        }).catch(e => {
          if(e.hasOwnProperty('response')){
            if(e.response.statusText)
              this.errors = e.response.statusText
            else{
              this.errors = "Error While Logging In!"
            }
          }
          else{
            this.errors = e
          }
          this.showError = true
        })
        this.clearForm()

      },
      formSubmit(){
        //validating form
        this.$v.$touch()
        // run recaptcha and let it to fire up 'logUserIn' function with google token
        if (!this.$v.$invalid){
          this.$refs.recaptcha.execute();
        }
      },
      onCaptchaExpired: function () {
        this.$refs.recaptcha.reset();
      }
    },
  }
</script>

<style lang="scss" scoped>
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
    }
    .header {
      box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
      margin-left: 20px;
      margin-right: 20px;
      margin-top: -40px;
      padding: 20px 0;
      border-radius: 3px;
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

</style>
