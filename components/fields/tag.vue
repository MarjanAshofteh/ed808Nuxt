<template>
  <nuxt-link 
    :to="'/tag/'+ tid +'/'+ name | replaceUrlSpace" 
    
    :title="name">
    <md-button class="md-raised">{{name}}</md-button>
  </nuxt-link>
</template>

<script>
export default {
  name: 'tag',
  props: ['name', 'tid'],
  filters: {
    replaceUrlSpace: function(value, reverse){
      if(reverse == undefined) reverse = false
      String.prototype.replaceAll = function(search, replacement) {
        return this.replace(new RegExp(search, 'g'), replacement)
      };
      return value != null ? (reverse==false ? value.replaceAll(' ', '-'): value.replaceAll('-', ' ')) : ''
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
