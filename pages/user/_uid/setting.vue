<template>
  <div>
    <div class="bottom">
      <div class="min-col">
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>account_box</md-icon>
            <span class="item-text">Personal</span>
            <md-button v-if="sameUser" @click="editThis('personal')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div v-if="editingEl != 'personal'">
              <div class="box-row" v-if="user.full_name">{{user.full_name}}</div>
              <div class="box-row" v-if="user.mail">{{user.mail}}</div>
              <div class="box-row" v-if="user.mobile">{{user.mobile}}</div>
            </div>

            <div class="box-edit" v-else>
              <div>
                <md-field>
                  <label>full name</label>
                  <md-input v-model="user.full_name"></md-input>
                </md-field>

                <md-field>
                  <label>Email address</label>
                  <md-input v-model="user.mail"></md-input>
                </md-field>

                <md-field>
                  <label>Phone</label>
                  <md-input v-model="user.mobile"></md-input>
                </md-field>

                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>
              </div>

              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('personal')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('personal')">Cancel</md-button>
                </div>
              </div>
            </div>


          </div>
        </md-content>
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>verified_user</md-icon>
            <span class="item-text">History</span>
          </div>
          <div class="box-text">
            <div class="box-row" v-if="user.uid">
              <span class="label">User Id: </span>
              {{user.uid}}
            </div>
            <div class="box-row" v-if="user.name">
              <span class="label">Username: </span>
              {{user.name}}
            </div>
            <div class="box-row" v-if="user.created">
              <span class="label">Created at </span>
              {{user.created}}
            </div>
            <div class="box-row" v-if="user.login">
              <span class="label">Last login </span>
              {{user.login}}
            </div>
          </div>
        </md-content>
      </div>
      <div class="max-col">
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>perm_identity</md-icon>
            <span class="item-text">Bio</span>
            <md-button v-if="sameUser" @click="editThis('about')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div class="default-text box-row" v-if="!user.about && (editingEl != 'about')">
              Write Your Bio ...
            </div>
            <div class="box-row" v-if="user.about && (editingEl != 'about')" style="padding-top:0px;">
              <p style="white-space: pre-line;margin: -10px 0 0 0;">
                {{user.about}}
              </p>
            </div>
            <div class="box-edit" v-else-if="editingEl == 'about'">
              <md-field>
                <md-textarea v-model="user.about"></md-textarea>
                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>
              </md-field>
              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('about')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('about')">Cancel</md-button>
                </div>
              </div>
            </div>
          </div>
        </md-content>
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>school</md-icon>
            <span class="item-text">Education</span>
            <md-button v-if="sameUser" @click="editThis('education')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div v-if="editingEl != 'education'">
              <div class="default-text box-row" v-if="!user.university">
                University Name ...
              </div>
              <div v-else class="box-row" style="font-size:19px;">{{user.university}}</div>

              <div class="default-text box-row" v-if="!user.education_degree" style="padding: 5px 25px 0px 35px;">
                <span class="label">Degree: </span>
                Your Degree
              </div>
              <div v-else class="box-row" style="padding: 5px 25px 0px 35px;">
                <span class="label">Degree: </span>
                {{user.education_degree}}
              </div>

              <div class="default-text box-row" v-if="!user.education_field" style="padding-left: 35px;">
                <span class="label">Field of Study: </span>
                Your Field of study
              </div>
              <div v-else class="box-row" style="padding-left: 35px;">
                <span class="label">Field of Study: </span>
                {{user.education_field}}
              </div>
            </div>

            <div class="box-edit" v-else>
              <div>
                <md-field>
                  <label>University</label>
                  <md-input v-model="user.university"></md-input>
                </md-field>

                <md-field>
                  <label>Degree</label>
                  <md-input v-model="user.education_degree"></md-input>
                </md-field>

                <md-field>
                  <label>Field of study</label>
                  <md-input v-model="user.education_field"></md-input>
                </md-field>

                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>
              </div>

              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('education')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('education')">Cancel</md-button>
                </div>
              </div>
            </div>
          </div>
        </md-content>
        <md-content class="md-elevation-3 box">
          <div class="box-head">
            <md-icon>work</md-icon>
            <span class="item-text">Skills & Experince</span>
            <md-button v-if="sameUser" @click="editThis('work')" class="md-icon-button md-accent edit">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
          <div class="box-text">
            <div v-if="editingEl != 'work'">
              <div class="default-text box-row" v-if="!user.job">
                <span class="label">job: </span>
                I've worked at ...
              </div>
              <div class="box-row" v-else>
                <span class="label">job: </span>
                {{user.job}}
              </div>

              <div class="default-text box-row" v-if="!user.skills">
                <span class="label">Skills: </span>
                I have skill in ...
              </div>
              <div class="box-row" v-else>
                <span class="label">Skills: </span>
                {{user.skills}}
              </div>

              <div class="box-row" v-if="user.hasOwnProperty('cv') && user.hasOwnProperty('cvName') && (user.cv != null)">
                <span class="label" style="line-height: 48px;">CV: </span>
                <a :href="user.cv" target="_blank" download>
                  <md-button class="md-raised"><md-icon>attach_file</md-icon>
                    {{user.cvName}}
                  </md-button>
                </a>
              </div>
            </div>

            <div class="box-edit" v-else>
              <div>
                <md-field style="margin-bottom:24px;">
                  <label>Job</label>
                  <md-input v-model="user.job"></md-input>
                </md-field>

                <md-field class="with-label" style="margin-bottom:24px;">
                  <label>Skills</label>
                  <md-textarea v-model="user.skills"></md-textarea>
                </md-field>

                <!--<md-field>
                  <label>Cv</label>
                  <md-file v-if="user.cv_name" v-model="uploadCv" :placeholder="user.cv_name" :ref="file" @change="handleFileUpload()"/>
                  <md-file v-else v-model="uploadCv"/>
                </md-field>-->

                <div class="container">
                  <div class="large-12 medium-12 small-12 cell">
                    <label>Upload Your CV</label>
                    <div class="edit_cv">
                      <input type="file" id="file" ref="file3" v-on:change="handleFileUpload('cv')"/>
                      <md-icon>attach_file</md-icon>
                    </div>
                    <md-progress-spinner v-if="updateFile.cv" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                  </div>
                </div>

                <div class="loading" v-if="updateField">
                  <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
                </div>
              </div>

              <div class="md-layout md-alignment-center-space-between">
                <div class="md-layout-item">
                  <md-button class="md-raised green" @click="doneEditingThis('work')">Save</md-button>
                </div>
                <div class="md-layout-item">
                  <md-button @click="cancleEditingThis('work')">Cancel</md-button>
                </div>
              </div>
            </div>
          </div>
        </md-content>
      </div>
    </div>
    <!--<span v-for="(role,index) in roles" :key="index">
      {{role}}
      <span v-if="(roles.length-1 != index)">,</span>
    </span>-->
  </div>
</template>

<script>

  import axios from "@/node_modules/axios";
  import { cookie } from '@/components/mixins/cookie.js'

  export default {
    name:'setting',
    layout: 'userpanel',
    scrollToTop: true,
    mixins: [cookie],
    data(){
      return{
        //for keeping last field data temporary, after editing it
        user_copy:{},
        errors:'',
        roles:[],
        uid:this.$route.params.uid,
        loading: true,
        updateField: false,
        user:{},
        editingEl:'',
        sameUser:false,
        updateFile:{
          picture:false,
          background_image:false,
          cv:false
        },
        file:{
          picture:{},
          background_image:{},
          cv:{}
        },
        afterUpload:{
          picture:{},
          background_image:{},
          cv:{}
        }
      }
    },
    mounted(){
      this.isSameUser()
    },
    methods:{
      isSameUser(){
        if(this.$store.getters.getUid){
          if(this.$store.getters.getUid == this.uid)
            this.sameUser = true
          //console.log(this.sameUser)
        }
        this.getProfile()
      },
      handleFileUpload(fieldName){

        //start loading for files
        this.updateFile[fieldName] = true

        if(fieldName == 'picture'){
          this.file[fieldName] = this.$refs.file2.files[0]
        }
        else if(fieldName == 'background_image'){
          this.file[fieldName] = this.$refs.file1.files[0]
        }
        else if(fieldName == 'cv'){
          this.file[fieldName] = this.$refs.file3.files[0]
        }

        this.submitFile(fieldName)
      },
      submitFile(fieldName){
        let formData = new FormData();
        formData.append('file', this.file[fieldName]);
        //needs validation here
        axios.defaults.crossDomain = true;
        axios.defaults.withCredentials  = true;
        axios.post('https://ed808.com:92/latin/file?parameter[hash]=020042f70a981fd6806ecf5e53f2267b377da9d9f981e15297d70c3f7c2a87d0',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRF-Token' : this.getCookie("token")
            }
          }
        ).then((data) =>{
          this.afterUpload[fieldName] = data.data.file

          //@TODO: add some prettier notification here after uploading cv with success
          //stop loading for files
          this.updateFile['cv'] = false

          console.log(this.afterUpload[fieldName])
          console.log('New '+ fieldName + ' was upload SUCCESSfully')
          if((fieldName == 'picture') || (fieldName == 'background_image')){
            this.doneEditingThis(fieldName)
          }
        })
          .catch((e) =>{
            console.log('FAILURE!!' + e)
          })
      },
      editThis(fieldName){
        this.editingEl = fieldName
        //stop loading for fields because after calling doneEditingThis for save file it get true
        this.updateField = false
      },
      cancleEditingThis(fieldName){
        if(fieldName == 'education'){
          this.user['university'] = this.user_copy['university']
          this.user['education_degree'] = this.user_copy['education_degree']
          this.user['education_field'] = this.user_copy['education_field']
        }
        else if(fieldName == 'personal'){
          this.user['full_name'] = this.user_copy['full_name']
          this.user['mail'] = this.user_copy['mail']
          this.user['mobile'] = this.user_copy['mobile']
        }
        else if(fieldName == 'work'){
          this.user['job'] = this.user_copy['job']
          this.user['skills'] = this.user_copy['skills']
        }
        else{
          this.user[fieldName] = this.user_copy[fieldName]
        }
        //switch from editing section to showing data
        this.editingEl = ''
      },
      doneEditingThis(fieldName){

        //start loading for fields except files
        this.updateField = true

        //create data with field that was changed
        var data = this.createData(fieldName)

        axios.defaults.crossDomain = true
        axios.defaults.withCredentials  = true
        axios.put('https://ed808.com:92/latin/user/'+ this.uid,
          data,
          {
            headers: {
              'Content-type': 'application/json',
              'X-CSRF-Token' : this.getCookie("token")
            }
          })
          .then((data) => {
            if((fieldName == 'picture') || (fieldName == 'background_image')){
              this.afterFileSaved(fieldName,data)
            }
            else{
              this.afterfieldsaved(fieldName,data)
            }
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
      },
      afterFileSaved(fieldName,data){

        this.user[fieldName] = data.data[fieldName]

        //stop loading for files
        this.updateFile[fieldName] = false

        //update navbar with new picture
        if(fieldName == 'picture'){
          this.$store.commit('CHANGE_USER_DATA', data.data[fieldName], '')
        }

      },
      afterfieldsaved(fieldName,data){

        //for cv uploading cv because the field is not binding with like others
        if((fieldName == 'work') && (Object.keys(this.afterUpload['cv']).length > 0)){
          this.user.cv = data.data.cv
          this.user.cvName = data.data.cvName
          this.user_copy['cv'] = data.data.cv
          this.user_copy['cvName'] = data.data.cvName
        }

        //stop loading for fields
        this.updateField = false

        //switch from editing section to showing data
        this.editingEl = ''

        //making change to copy object as well
        if(fieldName == 'education'){
          this.user_copy['university'] = this.user['university']
          this.user_copy['education_degree'] = this.user['education_degree']
          this.user_copy['education_field'] = this.user['education_field']
        }
        else if(fieldName == 'personal'){
          this.user_copy['full_name'] = this.user['full_name']
          this.user_copy['mail'] = this.user['mail']
          this.user_copy['mobile'] = this.user['mobile']

          //update navbar with new full_names but it's not working
          this.$store.commit('CHANGE_USER_DATA','', this.user['full_name'])
        }
        else if(fieldName == 'work'){
          this.user_copy['job'] = this.user['job']
          this.user_copy['skills'] = this.user['skills']
        }
        else{
          this.user_copy[fieldName] = this.user[fieldName]
        }

      },
      createData(fieldName){
        var data = {}
        if(fieldName == 'education'){
          data = {
            "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            "university" : this.user['university'],
            "education_degree" : this.user['education_degree'],
            "education_field" : this.user['education_field']
          }
        }
        else if(fieldName == 'personal'){
          data = {
            "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            "full_name" : this.user['full_name'],
            "mail" : this.user['mail'],
            "mobile" : this.user['mobile']
          }
        }
        else if(fieldName == 'work'){
          data = {
            "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            "job" : this.user['job'],
            "skills" : this.user['skills'],
          }
          //check if cv was uploaded
          if(Object.keys(this.afterUpload['cv']).length > 0){
            Object.assign(data,{"cv" : this.afterUpload['cv']})
            console.log(data)
          }
        }
        else if((fieldName == 'picture') || (fieldName == 'background_image')){
          data = {
            "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            [fieldName] : this.afterUpload[fieldName]
          }
        }
        else{
          data = {
            "hash" : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            [fieldName] : this.user[fieldName]
          }
        }
        return data
      },
      getProfile(){
        axios.defaults.crossDomain = true;
        axios.defaults.withCredentials  = true;
        axios.get('https://ed808.com:92/latin/user/'+ this.uid,
          {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then((data) => {
            this.user = data.data
            this.user_copy = Object.assign({}, this.user)
            /*for(var field in this.user){
              this.user[field] = data.data[field]
            }
            /*for (var key in data.data.roles) {
              this.roles.push(data.data.roles[key])
            }*/
            this.roles = Object.values(data.data.roles)
            this.loading = false
          })
          .catch(e => {
            this.errors = e.response.data
          })
      }
    }
  }
</script>

<style scoped>
  .loading {
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    bottom: 0;
    background: #fff;
  }
</style>

<style lang="scss">
  .edit_cv{
    position: relative;
    width: 155px;
    border-bottom: 1px solid #d9d9d9;
    input{
      height: 40px;
      overflow: hidden;
      width: 100%;
      opacity: 0;
      z-index: 3;
      position: relative;
      cursor: pointer;
    }
    i{
      position: absolute;
      left: 0;
      top: 14px;
    }
  }
  .bottom {
    max-width: 1130px;
    margin: 27px auto;
    padding: 5px;
    text-align: left;
    display: flex;
    flex-wrap: wrap;

    .min-col {
      width: 28%;
      margin-right: 2%;
      @media screen and (max-width: 992px) {
        width: 38%;
        margin-right: 2%;
      }
      @media screen and (max-width: 600px) {
        width: 100%;
        margin-right: 0;
      }
    }

    .max-col {
      max-width: 70%;
      @media screen and (max-width: 992px) {
        width: 60%;
      }
      @media screen and (max-width: 600px) {
        width: 100%;
      }

      .box {
        min-width: 100%;
      }
    }
  }
  .box {
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 27px 27px 0;
    transition: .3s cubic-bezier(.25, .8, .5, 1);

    &:hover .box-head .edit {
      opacity: 1;
    }

    .box-head {
      border-bottom: 1px solid #eee;
      min-height: 48px;
      padding: 4px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: padding .4s cubic-bezier(.25, .8, .25, 1);

      .md-icon:first-child {
        margin-right: 14px;
        margin-top: 7px;
      }

      .item-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        line-height: 1.25em;
        white-space: nowrap;
      }

      .edit {
        opacity: 0;
        transition: .3s cubic-bezier(.25, .8, .5, 1);
        margin: 0 -12px 0 0;

        .md-icon {
          margin: 0px !important;
        }
      }
    }

    .box-text {
      margin: 10px 0;
      font-size: 15px;

      .box-row {
        padding: 5px 25px;
      }

      .default-text {
        color: #BDBDBD;
      }

      .label {
        color: #888;
        font-size: 13px;
      }

      .box-edit {
        padding: 5px 25px;

        .md-field {
          margin-bottom: 9px;
        }

        .md-field.md-has-textarea {
          textarea {
            font-size: 16px !important;
          }

          &:not(.with-label) {
            padding: 7px 1px;
          }

          margin: 0;
        }

        .md-layout.md-alignment-center-space-between .md-layout-item {
          flex: 0;

          button {
            margin: 6px 0 0 0;

            &.green {
              background-color: #4caf50;
              color: white !important;
            }
          }
        }
      }
    }
  }

</style>
