
<template>
  <div>
    <div :class="'main-container node_type_' + types[0]">
      <scroll></scroll>
      <div class="top_header">
        <h1 v-if="node_content.hasOwnProperty('title')">{{node_content.title}}</h1>
        <div class="date_and_category" v-if="!types.includes('event')">
          <span v-if="node_content.hasOwnProperty('created')">{{node_content.created}}</span>
          <nuxt-link
            v-if="node_content.hasOwnProperty('topic') && (node_content.topic.length != 0)"
            :to="'/contents?topic='+ node_content.topic[0].tid"
            target="_blank"
            :title="node_content.topic[0].name"
          >{{node_content.topic[0].name}}</nuxt-link>
        </div>
        <eventData
          v-if="types.includes('event')"
          :date="node_content.event_time"
          :time="node_content.time_and_duration"
          :organizer="node_content.company"
          :place="node_content.event_place"
          :webinar_covered="node_content.ifwebinar"
          :registration_link="node_content.registration_link"
        />
      </div>


      <md-content class="node-body" id="node_body">
        <!--<div 
      v-if="types.includes('podcast') && node_content.hasOwnProperty('files') && (node_content.files.length != 0)" id="audio-demos-vuejs">
        <wavesurferPlayer 
          layout="modal"
          :src="node_content.files[0]"
          >
        </wavesurferPlayer>
        </div>-->
        <embedVideo
          v-if="types.includes('video') && node_content.hasOwnProperty('video_link') && (node_content.video_link != null)"
          :url="node_content.video_link"
        />
        <img id="image"
          v-if="node_content.hasOwnProperty('image') && (node_content.image != null)"
          :src="node_content.image"
          :alt="node_content.title"
        >

        <!--<affix-->
          <!--class="sidebar-menu affix-bottom"-->
          <!--relative-element-selector="#article"-->
          <!--:offset="{ top: 20, bottom: 20 }"-->
          <!--style=""-->
        <!--&gt;-->
          <!--<scrollactive-->
            <!--class="my-nav"-->
            <!--@:itemchanged="onItemChanged"-->
            <!--active-class="active"-->
            <!--:offset="20">-->


            <!--<a :key="head.id" v-for="head in articleHeadings" :href="'#'+ head.id" class="scrollactive-item" v-html="head.text"></a>-->

          <!--</scrollactive>-->
        <!--</affix>-->

        <article id="article"
          v-if="node_content.hasOwnProperty('body_value') && (node_content.body_value != null)"
          v-html="convertDomain(node_content.body_value)"
        ></article>
        <div
          v-if="node_content.hasOwnProperty('references') && (node_content.references.length != 0)"
          class="reference"
          v-for="(reference , index) in node_content.references"
          :key="index"
        >
          <h3>Reference:</h3>
          <a :href="reference" target="_blank" rel="nofollow">{{reference}}</a>
          <span v-if="index > 0">,</span>
        </div>
        <div
          class="tags"
          v-if="node_content.hasOwnProperty('tags') && (node_content.tags.length != 0)"
        >
          <tag
            v-for="(tag , index) in node_content.tags"
            :key="index"
            :name="tag.name"
            :tid="tag.tid"
          />
        </div>
      </md-content>

      <!--<author
      :uid="author.uid"
      :name="author.full_name"
      :picture="author.picture"
      :about_me="author.about_me"
      />-->
      <h2 class="section-title">
        Related Contents:
      </h2>


      <div class="md-layout node-page" style="position: relative;">
        <teaser
          v-if="relatedNodes[0]"
          :title="relatedNodes[0].title"
          :pic="relatedNodes[0].picture"
          :date="relatedNodes[0].created"
          :nid="relatedNodes[0].nid"
          :type="relatedNodes[0].types"
        />

        <teaser
          v-if="relatedNodes[1]"
          :title="relatedNodes[1].title"
          :pic="relatedNodes[1].picture"
          :date="relatedNodes[1].created"
          :nid="relatedNodes[1].nid"
          :type="relatedNodes[1].types"
        />

        <teaser
          v-if="relatedNodes[2]"
          :title="relatedNodes[2].title"
          :pic="relatedNodes[2].picture"
          :date="relatedNodes[2].created"
          :nid="relatedNodes[2].nid"
          :type="relatedNodes[2].types"
        />

      </div>
      <div id="comments">
        <comment :nid="nid" />
      </div>
      <md-snackbar class="error" :md-active.sync="showError">{{ errors }}</md-snackbar>
    </div>

    <!-- Doesnt Work Correctly ! -->
    <!-- Ancho Side Elements -->
    

  </div>
</template>

<script>
// import ScrollActive from '@/node_modules/vue-scrollactive'
import axios from "@/node_modules/axios";
import eventData from "@/components/fields/eventData";
import scroll from "@/components/elements/scrollbar";
import author from "@/components/fields/author";
import tag from "@/components/fields/tag";
import comment from "@/components/fields/comment";
import teaser from "@/components/allContents/NodeTeaser";

export default {
  name: "node",
  components: {
    teaser,
    eventData,
    author,
    tag,
    comment,
    scroll,
    // ScrollActive,
    embedVideo: () => import("@/components/fields/embedVideo")
  },
  data() {
    return {
      nid: this.$route.params.nid,
      node_content: {},
      author: {},
      loading: true,
      types: [],
      errors: "",
      showError: false,
      relatedNodes: [],
      articleHeadings: []
    };
  },
  async asyncData({ params }) {
    try {
      const { data } = await axios.get(
        "http://ed808.com:91/latin/contents/" + params.nid
      );
      if (data) {
        let contentTypes = [];
        if (
          data.content.hasOwnProperty("type") &&
          data.content.type.length != 0
        ) {
          data.content.type.forEach(element => {
            if (element.tid == 4058) contentTypes.push("event");
            if (element.tid == 3938) contentTypes.push("podcast");
            if (element.tid == 3941) contentTypes.push("video");
          });
        }
        return {
          node_content: data.content,
          types: contentTypes,
          author: data.author,
          loading: false
        };
      } else {
        throw { statusCode: 404, message: "Page not found" };
      }
    } catch (e) {
      console.log(e);
    }
  },
  mounted(){
    this.getRelatedNodes()
    this.getHeadings()
  },
  methods: {
    onItemChanged(event, currentItem, lastActiveItem) {
      // your logic
    },
    getHeadings(){
      let headings = document.getElementById('article').getElementsByTagName('h2')
      let headObject = []
      Array.from(headings).forEach(function (el,i) {
        let obj = {
          id: 'head'+i,
          text: el.innerHTML
        }
        headObject.push(obj)
        el.setAttribute('id','head'+i)
      })
      this.articleHeadings = headObject
    },
    convertDomain(value) {
      //this work but its performance is slow
      /* return value.split('="/sites').join('="http://api.ed808.com/sites') */

      String.prototype.replaceAll = function(search, replacement) {
        let target = this;
        return target.replace(new RegExp(search, "g"), replacement);
      };
      return value
        .replaceAll('href="http://api.ed808.com', 'href="http://ed808.com')
        .replaceAll('="/sites', '="http://api.ed808.com/sites')
        .replaceAll('="/node', '="http://ed808.com/node');
    },
    getRelatedNodes(){
      axios.get('http://ed808.com:91/latin/contents/'+ this.nid +'/relative?parameter[page]=1')
        .then(response => response.data)
        .then((response)=>{
          // console.log( response )
          this.relatedNodes = response
        })
    }
  },

  head() {
    return {
      links: [
        //these three line doesn't work
        {
          rel: "canonical",
          href: "http://ed808.com/node/" + this.$route.params.nid
        },
        {
          rel: "alternate",
          href: "http://ed808.com/node/" + this.$route.params.nid,
          hreflang: "en"
        },
        {
          rel: "shortlink",
          href: "http://ed808.com/node/" + this.$route.params.nid
        }
      ],
      title: this.node_content.title,
      meta: [
        {
          name: "description",
          content: this.node_content.meta_description,
          hid: "description"
        },

        // OpenGraph data (Most widely used)
        { property: "og:type", content: "article", hid: "og:type" },
        {
          property: "og:title",
          content: this.node_content.title,
          hid: "og:title"
        },
        {
          property: "og:url",
          content: "http://ed808.com/node/" + this.$route.params.nid,
          hid: "og:url"
        },
        {
          property: "og:image",
          content: this.node_content.image,
          hid: "og:image"
        },
        {
          property: "og:description",
          content: this.node_content.meta_description,
          hid: "og:description"
        },

        // Twitter card
        {
          name: "twitter:title",
          content: this.node_content.title,
          hid: "twitter:title"
        },
        {
          name: "twitter:image:src",
          content: this.node_content.image,
          hid: "twitter:image:src"
        },
        {
          name: "twitter:description",
          content: this.node_content.meta_description,
          hid: "twitter:description"
        },

        // Google / Schema.org markup:
        { itemprop: "name", content: this.node_content.title, hid: "name" },
        {
          itemprop: "image",
          content: this.node_content.image,
          hid: "image"
        },
        {
          itemprop: "description",
          content: this.node_content.meta_description,
          hid: "description"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@mixin main-center-content() {
  max-width: 800px;
  text-align: left;
  direction: ltr;
  margin: auto;
  padding: 0 15px;
}
body {
  background-color: white !important;
}
.main-container {
  margin-bottom: 50px;
  padding: 0px 0 15px 0;
  .md-layout {
    @include main-center-content();

  }
  h2.section-title {
    @include main-center-content();
    text-align: left;
    font-size: 22px;
    margin: 35px auto 11px auto;
    line-height: 40px;
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    top: 90px;
    background: #fff;
    z-index: 3;
  }
  .edit_link {
    position: absolute;
    top: 78px;
    left: 25px;
  }
  .top_header {
    min-height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, #eee, #f9f9f9);
    flex-direction: column;
    position: relative;
    h1 {
      font-family: sans-serif;
      color: black;
      margin-bottom: 30px !important;
      line-height: 43px;
      padding: 0 10px;
      @media all and (max-width: 600px) {
        font-size: 24px;
        line-height: 30px;
      }
    }
    > .date_and_category {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      position: absolute;
      bottom: 13px;
      @media all and (max-width: 768px) {
        flex-direction: column;
        margin: 10px;
        height: 49px;
        position: relative;
      }
      a {
        color: #0000008a !important;
        font-size: 17px;
        @media all and (max-width: 768px) {
          padding-top: 10px;
        }
      }
      span {
        //color: #ccc !important;
        color: #0000008a !important;
        font-size: 15px;
      }
    }
  }
  .node-body {
    > img {
      margin: 25px 0px 0px 0px;
      max-width: 100%;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      /* border: 1px solid #eee; */
    }
    article {
      @include main-center-content();
      font-size: 18px;
      line-height: 33px;
      letter-spacing: 0.3px;
      margin-top: 30px !important;
      p {
        margin: 0 0 10px 0;
      }
      h2 {
        font-size: 22px;
        margin: 35px 0 11px 0;
        line-height: 40px;
      }
      h3 {
        font-size: 20px;
        margin: 24px 0 12px 0;
        line-height: 38px;
      }
      h4 {
        font-size: 19px;
        margin: 18px 0 12px 0;
        line-height: 36px;
      }
      h5,
      h6 {
        font-size: 18px;
        margin: 18px 0 12px 0;
        line-height: 33px;
      }
      img {
        display: block;
        margin: 40px auto;
      }
      .picture_info {
        text-align: center;
        margin: -29px 0 40px 0;
        font-size: 15px;
      }
      .boldCenter_line {
        display: inline-block;
        width: 100%;
        text-align: center !important;
        padding: 20px 0;
        background: rgb(252, 252, 252);
        border: 1px solid #f0f1f2;
        margin: 15px 0 !important;
        a {
          display: inline-block;
          width: 100%;
          text-align: center;
        }
      }
    }
    &:before {
      content: "";
      display: table;
      width: 0;
      height: 0;
    }
  }
  .tags {
    @include main-center-content();
    margin: 20px auto 20px auto !important;
    a {
      display: inline-block;
    }
    button {
      border: none;
      color: rgba(0, 0, 0, 0.68) !important;
      background: rgba(0, 0, 0, 0.05) !important;
      box-shadow: none !important;
      text-transform: unset !important;
      margin: 6px 8px 6px 0px !important;
    }
  }
  .reference {
    @include main-center-content();
    overflow: hidden;
    h3 {
      display: inline;
    }
  }
}
.md-snackbar.error {
  background-color: #f44336;
}
.node_type_event {
  .top_header {
    height: 300px !important;
    justify-content: center;
    margin-bottom: 110px;
  }
}
.node_type_video {
  .node-body > img {
    display: none;
  }
}
#audio-demos-vuejs {
  margin: 45px auto 30px auto;
  padding: 0 10%;
  > div {
    /*box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);*/
    padding: 20px 15px;
    border: 1px solid #eee;
    border-radius: 20px;
  }
}
.vue-affix {
  padding-top: 20px;
  position: absolute;
  width: calc(((100% - 800px)/2) - 15px);
  margin-left: 15px;
  a.scrollactive-item {
    display: block;
  }
  a.active {
    color: #fff;
    background: #92278f;
    background: #92278f;
    background: var(--md-theme-default-primary-on-background, #92278f);
  }
}
.vue-affix.affix {
  position: fixed;
}

@media (max-width: 1440px){
  .node-page .content-teaser {
    width: 31.3%;
    flex: 0 1 31.3%;
  }
}

</style>
