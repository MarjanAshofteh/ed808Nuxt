<template>
  <div class="eventspane">
    <section id="events">
    <div class="md-headline">
      <h5>Upcoming Civil Engineering Events</h5>
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


    <carousel
      :per-page="4"
      :navigationEnabled="true"
      navigationNextLabel="navigate_next"
      navigationPrevLabel="navigate_before"
      :paginationEnabled="false">

      <!--&lt;!&ndash;special BIM event&ndash;&gt;-->
      <!--<slide-->
        <!--v-if="specialEvent.nid"-->
      <!--&gt;-->
        <!--<newsteaser-->
          <!--id="special-event"-->
          <!--:newstitle="specialEvent.title"-->
          <!--:newscompany="specialEvent.company"-->
          <!--:newsdate="specialEvent.eventtime | erasetime"-->
          <!--:newsnid="specialEvent.nid"-->
          <!--@setNid="show_event(specialEvent.nid)"/>-->
      <!--</slide>-->
      <!--&lt;!&ndash;end of special BIM event&ndash;&gt;-->



      <slide
        v-for="event in events"
        :key="event.nid"
      >

        <newsteaser
          :id="event.nid == '20220' ? 'special-event' : ''"
          :newstitle="event.title"
          :newscompany="event.company"
          :newsdate="event.eventtime | erasetime"
          :newsnid="event.nid"
          @setNid="show_event(event.nid)"/>
      </slide>
      </carousel>
    </section>
    <div v-if="eventNid != 0">
      <news
        :nid="eventNid"
        @clearNid="eventNid = 0"/>
    </div>
  </div>
</template>

<script>
import newsteaser from '@/components/front/newsteaser'
import news from '@/components/front/news'
import axios from '@/node_modules/axios'

export default {
  name: 'newspane',
  components: {
    newsteaser,
    news
  },
  filters: {
    erasetime: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.split(' ')[0]
    }
  },
  data () {
    return {
      events:[],
      specialEvent: {},
      loading: true,
      eventNid: 0,
    }
  },
  mounted() {
    axios.get('https://ed808.com:92/latin/contents/list/event')
      .then((data) => {
        console.log(data)
        let events = []
        let spec = {}
        data.data.forEach((el)=>{
          if(el.nid != '20220') {
            events.push(el)
          }else {
            spec = el
          }
        })
          events = [spec, ...events]
          this.events = events
          this.specialEvent = spec
          this.loading = false
    })
  },
  methods:{
    show_event(nid){
      this.eventNid = nid
    }
  },

}
</script>

<style lang="scss">

.VueCarousel {
  width: 100%;
}
.VueCarousel-inner{
  @media screen and (max-width: 600px) {
    flex-basis: auto !important;

  }
}

.VueCarousel-slide{
  padding: 10px;
  @media screen and (max-width: 992px){
    width: 50% !important;
  }
  @media screen and (max-width: 600px) {
    width: 100% !important;
  }
}
button.VueCarousel-navigation-button{
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color:white !important;
  font-family: Material Icons!important;
  font-size: 30px;
  text-align: center;
  line-height: 30px;
  padding: 0 !important;
  color:#92278f !important;
}
.eventspane{
	padding: 0 36px 36px;
  position: relative;
  z-index: 1;
  .events-pane.loading {
    position: absolute;
    z-index: 3;
    width: 100%;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
section#events{
  width: 100%;
	margin: 0px auto 20px auto;
	padding: 0 36px;
  min-height: 300px;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
}
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
    display: inline-block;
    background: #fafafa;
    z-index: 1;
    position: relative;
    padding-right: 15px;
    font-family: roboto slab;
    color: #3c4858;
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


