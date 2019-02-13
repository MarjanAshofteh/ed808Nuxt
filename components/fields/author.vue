<template>
  <md-content class="author md-elevation-2">
    <div class="md-layout">
      <div class="md-layout-item md-size-15 userimage">
        <a :href="'/user/'+uid" target="_blank">
          <md-avatar class="md-large">
            <img v-if="picture" :src="picture" alt="user_image" />
            <img v-else src="/images/avatar.png" alt="user_image" />
          </md-avatar>
        </a>
      </div>
      <md-content class="md-layout-item md-size-85">
        <a :href="'/user/'+uid" target="_blank">
          <h4>{{name}}</h4>
        </a>
        <p>{{about_me}}</p>
      </md-content>
  </div>
  </md-content>
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
  }
  .author{
    @include main-center-content();
  }
  .md-layout{
    align-items: center;
  }
  .userimage{
    text-align: center;
  }
</style>
