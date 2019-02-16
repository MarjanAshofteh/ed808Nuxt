<template>
  <div class="social-share">
    <facebook :url="url" scale="3"></facebook>
    <twitter :url="url" :title="title" scale="3"></twitter>
    <linkedin :url="url" scale="3"></linkedin>
    <telegram :url="url" scale="3"></telegram>
    <reddit :url="url" scale="3" :title="title"></reddit>
  </div>
</template>

<script>
//https://vuejsexamples.com/vue-component-for-social-sharing-of-links/
import {
  Facebook,
  Twitter,
  Linkedin,
  Reddit,
  Telegram,
} from "vue-socialmedia-share";

export default {
  name: "sharing",
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Reddit,
    Telegram,
  },
  props: ['url', 'title'],
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.social-share > span {
  padding: 1em;
}
</style>
