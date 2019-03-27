<template>
  <div>

  </div>
</template>

<script>
  import axios from '@/node_modules/axios'
  export default {
    name: "Linkedin",
    data() {
      return {
        code: '',
      }
    },
    async asyncData({app}) {

    },
    mounted() {
      if(this.$route.query.hasOwnProperty('code')) {
        this.$axios({
          method: 'post',
          url: 'https://linkedin.com/oauth/v2/accessToken/',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: {
            access_token: "77gasbcb9ngw6d",
            expires_in: "eLNyPD8CUAuMBf0d",
            grant_type: 'authorization_code',
            code: this.$route.query.code,
            redirect_uri: 'https://ed808.com:2/login/linkedin' ,
            client_id: '77gasbcb9ngw6d' ,
            client_secret : 'eLNyPD8CUAuMBf0d'
          }
        })
        .then((data)=>{
          console.log(data)
        })
      }
    }

  }
</script>

<style scoped>

</style>
