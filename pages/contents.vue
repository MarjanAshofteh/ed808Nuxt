<template>
  <div style="padding-top: 15px;">
    <div class="md-layout" style="align-items: flex-start; padding: 0 0 30px 15px;">
        <filters class="md-layout-item md-size-20" style="padding: 0px 15px 0 0;"/>
        <NodeList 
          :filterEnabled="true"
          :router="'contents'"
          class="md-card md-theme-default md-layout-item md-size-80"
          />
    </div>

  </div>
</template>

<script>

import NodeList from '@/components/allContents/NodeList'
import filters from '@/components/allContents/filters'

export default {
  name: 'contents',
  scrollToTop: true,
  components: {
    NodeList,
    filters
  },
  head(){
    return{
      title: 'All content',
      meta: [
        // OpenGraph data (Most widely used)
        {
          'property': 'og:title',
          'content': this.title,
          'template': '%s - ed808',
          'vmid': 'og:title'
        },
        {property: 'og:url', content: 'https://ed808.com/contents', vmid: 'og:url'},
        {
          'name': 'twitter:title',
          'content': this.title,
          'template': '%s - ed808',
          'vmid': 'twitter:title'
        },
        // Google / Schema.org markup:
        {
          'itemprop': 'name',
          'content': this.title,
          'template': '%s - ed808',
          'vmid': 'name'
        },
      ],
      links: [
        {rel: 'canonical', href: 'https://ed808.com/contents'}
      ]
    }
  }
}
</script>

<style lang="scss">

</style>

