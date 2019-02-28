<template>
  <div class="with-background">
    <div class="login-card-page">
      <Register></Register>
    </div>
  </div>
</template>

<script>


import Register from '@/components/fields/register'

export default {
  name: 'register',
  scrollToTop: true,
  components: {
    Register
  },
}
</script>

<style lang="scss" scoped>
  .with-background {
    background: url(/images/login-bg.jpg) fixed center;
    background-size: cover;

  }
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
</style>
