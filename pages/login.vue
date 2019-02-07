<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="formSubmit"
    >
      <md-card
        class="md-layout-item md-size-30 md-small-size-100"
        style="overflow: visible;"
      >
        <md-card-header>
          <div
            class="md-title"
            style="margin: 0;color: white;font-size: 25px;"
          >
            Login
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('emailOrUsename')">
              <label for="username_email">
                Email or Username
              </label>
              <md-input
                id="username_email"
                v-model="form.username_email"
                name="username_email"
                autocomplete="email"
                :disabled="loading.sending"
                required
              />
              <span
                v-if="!$v.form.username_email.required"
                class="md-error"
              >
                The email or usename is required
              </span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field :class="getValidationClass('password')">
              <label for="password">
                Password
              </label>
              <md-input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                :disabled="loading.sending"
                autocomplete="current-password"
                required
              />
              <span
                v-if="!$v.form.password.required"
                class="md-error"
              >
                The Password is required
              </span>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar
          v-if="loading.sending"
          md-mode="indeterminate"
        />

        <!-- <vue-recaptcha
          ref="recaptcha"
          @verify="logUserIn"
          @expired="onCaptchaExpired"
          size="invisible"
          sitekey="6Ldp3XMUAAAAACZav47_l9to_2uESNGLa1RvQOU6">
        </vue-recaptcha> -->

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="loading.sending"
          >
            Log In
          </md-button>
        </md-card-actions>
      </md-card>
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
</template>
<script>

import VueRecaptcha from 'vue-recaptcha'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { cookie } from '@/components/mixins/cookie.js'
import axios from "@/node_modules/axios"

export default {
  name: 'Login',
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
    if(this.$store.getters.getUid){
      this.$router.push('/user/'+ this.$store.getters.getUid)
    }
    else{
      //this is just work for admins that login in api.edu befor(has session and doesnt have token)
      //this code is gonna set token for them
      // axios.defaults.crossDomain = true;
      // axios.defaults.withCredentials  = true;
      // this.$axios.get('http://api.ed808.com/latin/user/login/nav_bar_info',
      // {
      //   headers:{
      //     'Content-type': 'application/json'
      //   }
      // })
      // .then((data) => {
      //   if(data.data.uid != 0){
      //     this.setCookie('token', data.data.token , 23)
      //     //under line is not working, I think.
      //     this.$emit('do_navbar')
      //   }
      // })
      // .catch(e => {
      //   console.log('errors for nav_bar_info : ' + e)
      // })
    }
  },
  methods:{
    getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
            return {
                'md-invalid': field.$invalid && field.$dirty
            }
        }
    },
    clearForm(){
        // this.$v.$reset()
        this.form.username_email = null
        this.form.password = null
    },
    async logUserIn(recaptchaToken){
      this.loading.sending = true
      axios.defaults.crossDomain = true;
      axios.defaults.withCredentials = true;
      await axios.post('http://ed808.com:91/latin/user/login',
        {
          hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
          username_email : this.form.username_email,
          password : this.form.password,
          reCaptchaToken : "admin@ed808"
        },
        {
          headers: {
              'Content-type': 'application/json'
          }
        }).then((data) => {
          //console.log(data)
          //this line doesn't work
          this.$store.commit('SET_USER',data.data.uid)
          this.setCookie('token', data.data.token , 23)
          this.lastUser = `${this.form.username_email}`
          this.userSaved = true
          this.loading.sending = false
          // redirect after successfull login

          // Todo: "Mohsen:" I changed this part to window.location for fixing nav update problem but we should fix it later
          // this.$router.push('/user/'+ data.data.uid)
          window.location.replace('/user/'+ data.data.uid)
          // this.clearForm()

        }).catch(e => {
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
        //this.showError = true
        })


      // this.loading.sending = true
      // this.$refs.recaptcha.reset();

      //sending to login api
      
      // this.$axios.post('/latin/user/login',
      // {
      //   hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
      //   username_email : this.form.username_email,
      //   password : this.form.password,
      //   reCaptchaToken : "admin@ed808"
      // },
      // {
      //   headers: {
      //     'Content-type': 'application/json'
      //   }
      // })
      // .then((data) => {
        
        
      // })
      // .catch(e => {
      //   if(e.hasOwnProperty('response')){
      //     if(e.response.hasOwnProperty('data'))
      //       this.errors = e.response.data
      //     else{
      //       this.errors = e.response
      //     }
      //   }
      //   else{
      //     this.errors = e
      //   }
      //   this.showError = true




        //this.clearForm()
        /*todo : showing error without [""] */
      // });
    },
    formSubmit(){
      //validating form
      this.$v.$touch()
      this.logUserIn()
      // run recaptcha and let it to fire up 'logUserIn' function with google token
      // if (!this.$v.$invalid){
      //   this.$refs.recaptcha.execute();
      // }
    },
    // onCaptchaExpired: function () {
    //   this.$refs.recaptcha.reset();
    // }
  },
}
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  form{
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 50px);
    > div{
        overflow: hidden;
    }
  }
  .md-card-content > div {
    margin: 30px 0;
  }
  .md-card-header{
    //background-color: md-theme(primary);
    background-color:#ba68c8; 
    padding: 30px 0;
    /* @todo : make it colored from variables not hard code */
  }
  .md-snackbar.error{
    background-color: #F44336;
  }
</style>

