<template>
  <!-- following tag + following user -->
  <div>
    <div class="users">

      <div v-if="loading">
        Please wait...
      </div>
      <div v-if="users.length == 0 && !loading">
        You are not following any user!
      </div>
      <div
        v-if="users.length != 0 && !loading"
      >
        <UserTeaser
          v-for="user in users"
          :key="user.uid"
          teaserType="list-item"
          :uid="user.uid"
          :name="user.full_name"
          :picture="user.picture"
          :about_me="user.about"
          :following="true"
        />
      </div>

    </div>
  </div>
</template>

<script>
  import axios from '@/node_modules/axios'
  import UserTeaser from "@/components/fields/userTeaser";
  export default {
    name: "Following",
    components: {UserTeaser},
    layout: 'userpanel',
    data() {
      return {
        users: [],
        loading: true
      }
    },
    asyncData({params, app}){

    },
    mounted() {
      console.log(this.$route.params.uid)
      axios.get(`https://ed808.com:92/latin/user/${this.$route.params.uid}/following?parameter[sort]=time&parameter[sort_dir]=ASC&parameter[page]=0&parameter[limits]=10`,
        {},
        {
          headers: {
            'Cache-Control': 'no-cache',
            'cache-control': 'no-cache',

          }
        })
        .then((data)=> {
          console.log(data.data)
          this.users = data.data.following
          setTimeout(()=>{this.loading = false},500)
        })
    }
  }
</script>

<style lang="scss" scoped>
  .users {
    margin: auto;
    width: 60%;
  }
</style>
