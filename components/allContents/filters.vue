<template>
    <div class="filters" style="position: relative;">
      <div class="loading" v-if="filtersLoading">
        <md-progress-spinner 
          :md-diameter="50" 
          :md-stroke="2"
          md-mode="indeterminate" 
          style="position: fixed;top: calc(50% - 50px); z-index: 3;">
        </md-progress-spinner>
      </div>
      <div class="md-card" style="margin-bottom: 15px;" v-for="item in filters" :key="item.name" v-if="item.name">
        <md-toolbar style="min-height: 50px;" :md-elevation="0">
          <span class="md-subheading">{{item.name | formatName}}</span>
        </md-toolbar>
        <md-list class="md-scrollbar" style="max-height: 250px;overflow: overlay; overflow-x: hidden;">
          <md-checkbox 
            v-for="sub_item in item.children" :key="sub_item.tid" 
            v-model="$store.state.selected[item.name]"
            :value="sub_item.tid">
              {{sub_item.name | formatName}}
          </md-checkbox>
        </md-list>
      </div>
      <div class="md-card" v-if="!filtersLoading" style="margin-bottom: 15px;">
        <md-toolbar style="min-height: 50px;" :md-elevation="0">
          <span class="md-subheading">Tags</span>
        </md-toolbar>
        <div class="md-scrollbar md-tags" style="max-height: 250px;overflow: overlay; overflow-x: hidden;">
            <span v-for="(tag,index) in tags" :key="index" >
              <nuxt-link :to="`/tag/${tag.tid}/${tag.name}`">{{ tag.name }}</nuxt-link>
            </span>
        </div>
      </div>
    </div>
</template>

<script>


import Tag from "@/components/fields/tag";

export default {
  name: 'filters',
  components: {Tag},
  data () {
    return {
      filters:[],
      filtersLoading: true,
      tags:[]
    }
  },
  mounted() {
    fetch('https://ed808.com:92/latin/contents/all/filters')
      .then(response => response.json())
      .then((data) => {
        this.filters = data

        //making a dictionary for filters
        var filters = {}
        data.forEach(category => {
          category.children.forEach(child => {filters[child.tid] = child.name})
        })
        this.$store.commit('SET_FILTERS', filters)

        // setTimeout(() => {this.filtersLoading = false}, 300)
    })
    fetch('https://ed808.com:92/latin/tag/home/list')
      .then(response => response.json())
      .then((data) => {
        this.tags = data
        console.log(data)
        setTimeout(() => {this.filtersLoading = false}, 300)
    })

    /*@todo: we use v-model="$store.state.selected[item.name]" and this is wrong with 'store strict mode : on'
    * instead use setters and getters
    * https://vuex.vuejs.org/guide/forms.html
    */
  },
  filters: {
    formatName: function(str) {
      let words = str.split(' ').filter(str => str !== '')
      // remove accents / diacritics
      words = words.map(str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      // capitalize
      words = words.map(str => str[0].toUpperCase() + str.slice(1))
      return words.join(' ')
    }
  }
}
</script>

<style lang="scss">
div.md-checkbox {
  margin: 5px 0px 6px 16px;
  min-height: 20px;
}
label.md-checkbox-label {
	white-space: nowrap;
}
.filters.md-layout-item{

  @media (max-width: 1280px) {
    min-width: 25%;
	  max-width: 25%;
	  flex: 0 1 25%;
  }
}
.md-tags span{
  display: inline-block;
  margin: 5px;
  a{
    display: inline-block;
    line-height: 24px;
    padding: 5px;
    background-color: #EEEEEE;
    transition-duration: .5s;
    border-radius: 3px;
    color: #212121 !important;
    &:hover {
      background-color: #E0E0E0;

    }
  }
}
</style>


