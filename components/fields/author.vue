<template>
  <div class="author">
    <md-content class="md-elevation-2">
      <div class="author-details">
        <div class="userimage">
          <a :href="'/user/'+uid" target="_blank">
            <md-avatar class="md-large">
              <img v-if="picture" :src="picture" alt="user_image" />
              <img v-else src="/images/avatar.png" alt="user_image" />
            </md-avatar>
          </a>
        </div>
        <md-content class="userdetails">
          <p>Written By:</p>
          <a :href="'/user/'+uid" target="_blank">
            {{name}}
          </a>
          <md-button class="md-primary">Follow</md-button>
        </md-content>
      </div>
      <div class="about-author">
        <p>{{about_me}}</p>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'author',
  props: ['uid','name','picture','about_me'],
}
</script>

<style lang="scss" scoped>
  @mixin main-center-content(){
    max-width: 800px;
    text-align: left;
    direction: ltr;
    margin: auto;
    padding: 0 15px;
  }
  .author{
    @include main-center-content();
  }
  .author-details{
    align-items: center;
    padding: 20px!important;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
  }
  .userimage{
    text-align: center;
    width: 64px;
  }
  .userdetails {
    width: calc(100% - 64px);
    padding-left: 20px;
    position: relative;
    a {
      font-size: 18px;
      font-weight: bold;
    }
    p {
      margin: 0;
    }
    .md-button {
      margin: 0;
      position: absolute;
      right: 0;
      top: 2.5px;
    }
  }
  .about-author {
    padding: 20px;
    p {
      margin: 0;
    }
  }

</style>
