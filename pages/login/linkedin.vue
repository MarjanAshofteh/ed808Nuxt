<template>
  <div id="linkedin_form">

  </div>
</template>

<script>
  import axios from '@/node_modules/axios'
  import jsonpAdapter from 'axios-jsonp'

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
        axios.crossDomain = true
        axios.crossOrigin = true
        axios({
          method: 'POST',
          url: 'https://linkedin.com/oauth/v2/accessToken/',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: {
            grant_type: 'authorization_code',
            code: this.$route.query.code,
            redirect_uri: 'https://ed808.com/login/linkedin' ,
            client_id: '77gasbcb9ngw6d' ,
            client_secret : 'eLNyPD8CUAuMBf0d'
          }
        })
          .then((data)=>{
            console.log(data)
          })

        // let form = document.createElement("form");
        // document.getElementById('linkedin_form').appendChild(form)
        //
        // let grant_type = document.createElement("input");
        // let code = document.createElement("input");
        // let redirect_uri = document.createElement("input");
        // let client_id = document.createElement("input");
        // let client_secret = document.createElement("input");
        //
        // form.method = "POST";
        // form.action = "https://www.linkedin.com/oauth/v2/accessToken";
        //
        // grant_type.value= 'authorization_code';
        // grant_type.name= "grant_type";
        // form.appendChild(grant_type);
        //
        // code.value=this.$route.query.code
        // code.name="code";
        // form.appendChild(code);
        //
        // redirect_uri.value= 'https://ed808.com:2/login/linkedin'
        // redirect_uri.name="redirect_uri";
        // form.appendChild(redirect_uri);
        //
        // client_id.value= '77gasbcb9ngw6d'
        // client_id.name="client_id";
        // form.appendChild(client_id);
        //
        // client_secret.value= 'eLNyPD8CUAuMBf0d'
        // client_secret.name="client_secret";
        // form.appendChild(client_secret);



        // document.body.appendChild(form);
        //
        // form.submit();
      }
    }

  }
</script>

<style scoped>

</style>
