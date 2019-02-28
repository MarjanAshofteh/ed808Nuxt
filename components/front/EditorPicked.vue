<template>
    <div class="editor-picked">
      <div class="md-headline">
        <h5>Top Picked Contents</h5>
        <div class="more-link">
          <!--<router-link tag="md-button" to="/contents?type=4058">See All</router-link>-->
          <!-- this link is temporary. it will change after events page create -->
          <router-link tag="md-button" to="/contents">See All</router-link>
        </div>
      </div>

      <div class="events-pane loading" v-if="loading">
        <md-progress-spinner
          :md-diameter="100"
          :md-stroke="5"
          md-mode="indeterminate">
        </md-progress-spinner>
      </div>

      <div class="md-layout">
        <NodeTeaser
          v-for="node in contents"
          :key="node.nid"
          :DisplayMode="'medium'"
          :body="node.body"
          :title="node.title"
          :pic="node.picture"
          :nid="node.nid"
          :date="node.created"
          :type="node.categories"
        />
      </div>
    </div>
</template>

<script>
import NodeTeaser from '@/components/allContents/NodeTeaser'

export default {
  name: 'EditorPicked',
  data () {
    return {
      contents:[],
      loading: true,
    }
  },
  mounted() {
    fetch('https://ed808.com:92/latin/contents?parameter[page]=0&parameter[limits]=5&parameter[sort]=updated&parameter[stick]=1')
      .then(response => response.json())
      .then((data) => {
          this.contents = data.contents
          this.loading = false
    })
  },
  methods:{
  },
  components: {
    NodeTeaser
  },
  filters: {
    erasetime: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.split(' ')[0]
    }
  }
}
</script>

<style lang="scss">
.md-headline{
	padding: 35px 0;
	margin: 0 !important;
	position: relative;
  text-align: left;
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    background: #ddd;
    position: absolute;
    top: 53px;
  }
  h5{
    margin: 0;
    font-weight: normal;
    display: inline-block;
    background: #fafafa;
    z-index: 1;
    position: relative;
    padding-right: 15px;
  }
}

.more-link {
	background: #fafafa;
	z-index: 1;
	position: relative;
  float: right;
  button {
    margin: 0px 10px 0 10px;
    border: 1px solid #ddd;
    border-radius: 30px;
  }
}
</style>


