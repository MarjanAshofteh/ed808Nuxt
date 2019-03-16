<template>
  <div>
    <div class="users">
      <div v-if="users.length == 0">
        Nobody is following you!
      </div>
      <UserTeaser
        v-for="user in users"
        :key="user.uid"
        teaserType="list-item"
        :uid="user.uid"
        :name="user.full_name"
        :picture="user.picture"
        :about_me="user.about"
        :following="user.user_follow"
      />
    </div>
  </div>
</template>

<script>
  import axios from '@/node_modules/axios'
  import UserTeaser from "@/components/fields/userTeaser";
  export default {
    name: "Followers",
    components: {UserTeaser},
    layout: 'userpanel',
    data() {
      return {
        users: []
      }
    },
    mounted() {
      axios.get(`https://ed808.com:92/latin/user/${this.$route.params.uid}/follower?parameter[sort]=time&parameter[sort_dir]=ASC&parameter[page]=0&parameter[limits]=10`)
        .then((data)=> {
          console.log(data.data)
          this.users = data.data.follower
        })
    }
  }
</script>

<style scoped>
  .users {
    margin: auto;
    width: 60%;
  }
</style>
