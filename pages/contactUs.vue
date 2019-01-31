<template>
  <div class="main-container">
    <section>
      <div>
        <h1>Contact Us</h1>
        <div class="text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing vitae proin sagittis nisl. Auctor urna nunc id cursus metus aliquam eleifend. Neque sodales ut etiam sit amet nisl purus in. Suscipit tellus mauris a diam maecenas. Est sit amet facilisis magna etiam tempor. At elementum eu facilisis sed odio morbi quis commodo.
          </p>
          <div class="row">
            <md-icon class="fa fa-bars">home</md-icon>
            <span>
              <b>Label: </b>
              Lorem Ipsum
            </span>
          </div>
          <div class="row">
            <md-icon class="fa fa-bars">home</md-icon>
            <span>
              <b>Label: </b>
              Lorem Ipsum
            </span>
          </div>
          <div class="row">
            <md-icon class="fa fa-bars">home</md-icon>
            <span>
              <b>Label: </b>
              Lorem Ipsum
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
                <label for="full-name">Full Name</label>
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
                <label for="phone">phone</label>
                <md-input name="phone" id="phone" v-model="form.phone" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.phone.numeric">The phone number must be numeric</span>
                <span class="md-error" v-else-if="!$v.form.phone.minlength">Invalid phone number</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('company')">
                <label for="company">company</label>
                <md-input name="company" id="company" autocomplete="given-name" v-model="form.company" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.company.minlength">Invalid company name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label for="description">description</label>
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
  import axios from "@/node_modules/axios";
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    numeric
  } from 'vuelidate/lib/validators'

  export default {
    name: 'contactUs',
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
        axios.post('http://api.ed808.com/latin/page/contact_form',
          {
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
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .main-container{
    min-height: 100vh;
    background-image: url(/_nuxt/assets/images/contactUs.jpg);
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    width: 465px;
    margin-left: 26%;
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
        display: block;
        margin: 0 auto !important;
        width: 137px;
        background-color: #03A9F4;
        border-radius: 7px;
        color: white !important;
      }
    }
  }
  section{
    background-color: #00000087;
    width: 61%;
    height: 505px;
    position: absolute;
    text-align: left;
    padding: 60px 5vw;
    /* background-image: url(/_nuxt/assets/images/contactUs.jpg); */
    color: white;
    h1{
      font-size: 25px;
    }
    .text{
      width: 310px;
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
</style>
