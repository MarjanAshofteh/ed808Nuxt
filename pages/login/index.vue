<template>
  <div class="with-background">
    <div class="login-card-page">
      <login :pageComponent="true"></login>
    </div>
  </div>
</template>
<script>

import login from '@/components/fields/login'

export default {
  name: 'Login',
  layout: 'static',
  scrollToTop: true,
  components: {
    login
  },
  middleware: ['isauth'],
  mounted() {
    this.$store.state.backGround = '/images/login-bg.jpg'
  }
}
</script>

<style lang="scss" scoped>
  /*.with-background {*/
    /*!*position: relative;*!*/
    /*background: url(/images/login-bg.jpg) fixed center;*/
    /*background-size: cover;*/
    /*&:before {*/
      /*content: '';*/
      /*position: absolute;*/
      /*left: 0;*/
      /*top: 0;*/
      /*bottom: 0;*/
      /*right: 0;*/
      /*background: rgba(0,0,0,0.3);*/
    /*}*/
  /*}*/
  .login-card-page {
    width: 30%;
    margin: auto;
    margin-top: 80px;
    @media screen and (max-width: 992px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }
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

