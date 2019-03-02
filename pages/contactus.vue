<template>
  <div class="main-container">
    <section>
      <div>
        <h1>Contact Us</h1>
        <div class="text">
          <p>
            We are ready to lead you into the future of Civil Engineering and Construction Industry. Get in touch with experts and share your experience.
            Use the form below to drop us an email.
          </p>
          <div class="row">
            <md-icon>place</md-icon>
            <span>
              <b>Address: </b>
              4, Stapleford Close, Kingston Upon Thames, United Kingdom, KT1 3HL
            </span>
          </div>
          <div class="row">
            <md-icon>email</md-icon>
            <span>
              <b>Email: </b>
              Info[at]ed808.com
            </span>
          </div>
        </div>
      </div>
    </section>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Get in touch</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('fullName')">
                <label for="first-name">Full Name</label>
                <md-input name="full-name" id="first-name" autocomplete="given-name" v-model="form.fullName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.fullName.required">The full name is required</span>
                <span class="md-error" v-else-if="!$v.form.fullName.minlength">Invalid full name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('phone')">
                <label for="phone">Phone</label>
                <md-input name="phone" id="phone" v-model="form.phone" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.phone.numeric">The phone number must be numeric</span>
                <span class="md-error" v-else-if="!$v.form.phone.minlength">Invalid phone number</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('company')">
                <label for="company">Company</label>
                <md-input name="company" id="company" autocomplete="given-name" v-model="form.company" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.company.minlength">Invalid company name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label for="description">Description</label>
                <md-textarea name="description" id="description" v-model="form.description" :disabled="sending" ></md-textarea>
                <span class="md-error" v-if="!$v.form.description.required">is required</span>
                <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid description</span>
              </md-field>
            </div>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Send</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">Dear {{ lastUser }} your form was send with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import axios from "@/node_modules/axios"
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    numeric
  } from 'vuelidate/lib/validators'

  export default {
    name: 'contactus',
    layout: 'static',
    scrollToTop: true,
    mixins: [validationMixin],
    data: () => ({
      form: {
        fullName: null,
        email: null,
        phone: null,
        company: null,
        description: null
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
        phone: {
          numeric,
          minLength: minLength(3)
        },
        company: {
          minLength: minLength(2)
        },
        email: {
          required,
          email
        },
        description: {
          required,
          minLength: minLength(3)
        }
      }
    },
    mounted() {
      this.$store.state.backGround = '/images/295.jpg'
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
      },
      saveUser () {
        this.sending = true
        this.sendForm()
      },
      sendForm(){
        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.post('https://ed808.com:92/latin/web_form',
        {
          "nid" : 19768,
          "reCaptchaToken" : "admin@ed808",
          "name" : this.form.fullName,
          "email" : this.form.email,
          "phone" : this.form.phone,
          "company": this.form.company,
          "description":this.form.description
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        ).then((data) =>{
          this.lastUser = `${this.form.fullName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        })
        .catch((e) =>{
          console.log('FAILURE!!' + e)
        });
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/vars.scss";
  .md-progress-bar {
    @include absolute('','',0,0,'',0);
  }
  .main-container{
    min-height: 100vh;
    /*background-image: url(/images/295.jpg);*/
    /*background-position: center;*/
    /*background-size: cover;*/
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 4vw;
    @media #{$x840}{
      flex-direction: column;
      padding-top: 50px;
      padding-bottom: 50px;
    }
    @media #{$x600}{
      padding: 0 0 50px 0;
    }
    form {
      width: 38%;
      margin-right: -32%;
      max-width: 450px;
      min-width: 350px;
      @media #{$x840}{
        margin: -44px 0 0 0;
        width: 450px;
      }
      @media #{$x600}{
        width: 90%;
        min-width: 300px;
      }
      > div{
        margin: auto;
      }
      .md-card-content{
        padding: 0 3vw;
      }
      .md-card-actions{
        padding-top: 0;
        margin: -8px 0 6px 0;
        button{
          @include blue-btn();
          margin: 0 auto !important;
          width: 137px;
          border-radius: 7px;
        }
      }
    }
    section{
      background-color: rgba(0, 0, 0, 0.8);
      width: 75%;
      height: 505px;
      position: absolute;
      text-align: left;
      padding: 4vw 5vw;
      color: white;
      max-width: 1000px;
      @media #{$x840}{
        position: relative;
        width: 100%;
        height: auto;
        padding-bottom: 70px;
      }
      @media #{$x600}{
        padding-top: 30px;
      }
      h1{
        font-size: 25px;
      }
      .text{
        width: 36%;
        @media #{$x840}{
          width: 100%;
        }
        .row {
          padding: 7px 3px;
          span{
            vertical-align: middle;
            padding-left: 5px;
          }
          i{
            color:white;
          }
        }
      }
    }
  }
</style>
