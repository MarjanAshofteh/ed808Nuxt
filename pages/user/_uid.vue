<template>
  <div>
    <md-content class="top">

      <div class="background-image">

        <div class="dim" v-if="updateFile.background_image"></div>

        <img v-if="user.hasOwnProperty('background_image') && !loading" v-bind:src="user.background_image" alt="background image">

        <div v-if="sameUser" class="edit-background-image">
          <input type="file" id="file" ref="file1" v-on:change="handleFileUpload('background_image')"/>
          <md-icon class="md-size-2x">edit</md-icon>
        </div>
        <div class="spinner-loading" v-if="updateFile.background_image">
          <md-progress-spinner :md-diameter="100" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
        </div>
      </div>

      <div class="user-image">

        <div class="dim" v-if="updateFile.picture"></div>

        <img v-if="user.hasOwnProperty('picture') && !loading && (user.picture!=0)" v-bind:src="user.picture" v-bind:alt="'image of ' + user.name" v-bind:title="'image of ' + user.name">

        <img v-else src="/images/avatar.png" v-bind:alt="'image of ' + user.name" style="min-width:132px;">
        
        <div v-if="sameUser" class="edit-picture">
          <input type="file" id="file" ref="file2" v-on:change="handleFileUpload('picture')"/>
          <md-icon>photo_camera</md-icon>
        </div>
        <div class="spinner-loading" v-if="updateFile.picture">
          <md-progress-spinner :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
      </div>

      <div class="user-tabs">

        <md-tabs md-active-tab="tab-posts">

          <md-tab id="tab-posts" md-label="posts" to="">
            <Posts :uid="$route.params.uid"></Posts>
          </md-tab>

          <md-tab id="tab-personal" md-label="Personal info" to="">
            <Setting :uid="$route.params.uid"></Setting>
          </md-tab>

          <md-tab id="tab-bookmark" md-label="bookmark" to="">
            <Bookmark></Bookmark>
          </md-tab>

          <md-tab id="tab-tags" md-label="following tags" to="">
            <Following_tag></Following_tag>
          </md-tab>

        </md-tabs>
      </div>
      <!--<div class="loading" v-if="loading">
        <md-progress-bar md-mode="indeterminate" md-theme-default></md-progress-bar>
      </div>-->
    </md-content>
    <!--<div class="bottom">
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
                <span class="label">job Experince: </span>
                I've worked at ...
              </div>
              <div class="box-row" v-else>
                <span class="label">job Experince: </span>
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
    </div>-->
    <!--<span v-for="(role,index) in roles" :key="index">
      {{role}}
      <span v-if="(roles.length-1 != index)">,</span>
    </span>-->
  </div>
</template>

<script>

  import axios from "@/node_modules/axios"
  import { cookie } from '@/components/mixins/cookie.js'
  import Setting from "@/components/user/setting"
  import Posts from "@/components/user/posts"
  import Bookmark from "@/components/user/bookmark"
  import Following_tag from "../../components/user/following_tag"

export default {
  name:'profile',
  components: {Following_tag, Bookmark, Posts, Setting},
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
        if(this.$store.getters.getUid == this.$route.params.uid)
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
      axios.put('https://ed808.com:92/latin/user/'+ this.$route.params.uid,
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

<style lang="scss" scoped>
  .loading {
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    bottom: 0;
    background: #fff;
  }
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
  .top{
    .dim{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      right: 0;
      left: 0;
      background-color: #868686c4;
    }
    position: relative;
    .spinner-loading{
      position: absolute;
      top: calc(50% - 30px);
      right: calc(50% - 30px);
    }
    .background-image{
      width: 100%;
      height: 230px;
      overflow: hidden;
      background-color: #c4b6c2;
      position: relative;
      &:hover{
        .edit-background-image{
          opacity: 1;
        }
      }
      .spinner-loading{
        top: calc(50% - 50px);
      }
      .edit-background-image{
        position: absolute;
        transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
        width: 60px;
        right: 33px;
        top: 30px;
        background-color: #00000059;
        opacity: 0;
        height: 60px;
        border-radius: 50%;
        [type="file"] {
          height: 100%;
          overflow: hidden;
          width: 100%;
          opacity: 0;
          z-index: 3;
          position: relative;
          cursor: pointer;
        }
        [type="file"] + i {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 0;
          width: 30px;
          height: 30px;
          max-width: 30px;
          font-size: 30px !important;
          color: #ffffff;
        }
      }
    }
    .user-image{
      position: absolute;
      top: 138px;
      left: 14%;
      z-index: 2;
      overflow: hidden;
      min-width: 132px;

      @media screen and (max-width: 600px) {
        top: 90px;
        left: calc(50% - 66px);
      }
      img {
        border-radius: 50%;
        border: 3px solid white;

      }
      &:hover{
        .edit-picture{
          opacity: 1;
          bottom: 0;
          top: 50%;
        }
      }
      .edit-picture{
        position: absolute;
        transition: .5s cubic-bezier(.25,.8,.5,1);
        width: 100%;
        height: 50%;
        right: 0;
        left: 0;
        background-color: #ffffff82;
        opacity: 0;
        top: 100%;
        [type="file"] {
          height: 100%;
          overflow: hidden;
          width: 100%;
          opacity: 0;
          z-index: 3;
          position: relative;
          cursor: pointer;
        }
        [type="file"] + i {
          font-weight: bold;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 0;
        }
      }
      img{
        width: 132px;
        height: auto;
        min-width: 132px;
      } 
    }
    .user-tabs{
      background: white;
    }
  }
</style>
<style>
  .md-tabs.md-theme-default .md-tabs-navigation{
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    display: flex;
    justify-content: center;
    padding-right: 21%;
  }
  .md-tabs.md-theme-default .md-tabs-content{
    height:initial !important;
  }
</style>
