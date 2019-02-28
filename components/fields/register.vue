<template>

  <div class="card card-signup">
    <div class="header header-primary text-center">

      <h4 class="card-title">Register in with</h4>
      <div class="social-line">
        <a href="#pablo" class="btn btn-just-icon btn-simple">
          <md-button class="md-icon-button" disabled>
            <i class="mdi mdi-facebook-box"></i>
          </md-button>
        </a>
        <a href="#pablo" class="btn btn-just-icon btn-simple">
          <md-button class="md-icon-button" disabled>
            <i class="mdi mdi-twitter"></i>
          </md-button>
        </a>
        <a href="#pablo" class="btn btn-just-icon btn-simple">
          <md-button class="md-icon-button" disabled>
            <i class="mdi mdi-google-plus"></i>
          </md-button>
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
          <span class="md-error" v-else-if="!$v.form.fullName.minlength">Should be at least 3 character</span>
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
          <span class="md-error" v-else-if="!$v.form.password.minlength">Should be at least 6 character</span>
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
        Create User
      </md-button>
    </div>
  </div>

</template>

<script>

  import axios from '@/node_modules/axios'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    //numeric,
    sameAs
  } from 'vuelidate/lib/validators'
  import VueRecaptcha from 'vue-recaptcha'
  import { cookie } from '@/components/mixins/cookie.js'

  export default {
    name: 'Register',
    scrollToTop: true,
    middleware: ['isauth'],
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    mixins: [validationMixin,cookie],
    data: () => ({
      errors:'',
      showError:false,
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

    },
    methods: {
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
            window.location.reload()
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

</style>
