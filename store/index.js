import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const cookieparser = process.server ? require('cookieparser') : undefined
import Cookies from 'js-cookie';

Vue.use(Vuex)

export const state = () => ({
  user: {},
  roles: ['administrator'],
  //allContents page
  filtersLoading: true,
  selected: {
    type: [],
    category: [],
    topic: [],
  },
  queryNames: {
    t2258: 'product_kind',
    t2259: 'field',
    t2260: 'publication_name',
    t2261: 'exam',
    t2262: 'education_kind',
    t2264: 'academic_orientation',
    t2265: 'special',
    t2458: 'producer',
  },
  filters: {}
})

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  // $dispatch triggers an action
  // $dispatch sends a message to your vuex store to do some action. The action may be done anytime after the current tick, so that your frontend performance is not affected.
  async nuxtServerInit({ commit } , { req }) {
    if (req.headers && req.headers.cookie) {
      let parsedCookie = cookieparser.parse(req.headers.cookie)
      console.log(parsedCookie)
      if (parsedCookie.token) {
        try {
          axios.defaults.withCredentials = true
          let {data} = await axios.get('https://ed808.com:92/latin/user/login/nav_bar_info', {
            headers: {
              'Content-type': 'application/json',
                'Access-Control-Allow-Credentials' : true,
                Cookie : req.headers.cookie
            }
          })
          if(data){
              console.log(data)
              commit('SET_USER_DATA', data)
          }
        }catch (e) {
          console.log(e)
        }
      }
    }
  }
}

export const mutations = {
  //commit triggers a mutation
  //You never commit from any of your components / routes. It is done only from within an action, and only when you have some data to commit
  //commit is synchronous and may freeze your frontend till it is done.
  SET_USER(state, uid) {
    state.user.uid = uid
  },
  SET_USER_DATA(state, user){
    state.user = user;
  },
  LOGOUT(state) {
    state.user.uid = 0
  },
  SET_FILTERS(state, filters) {
    state.filters = filters
  },
  CHANGE_USER_DATA(state, uri, full_name){
    if(uri){
      state.user.picture = uri
    }
    if(full_name){
      state.user.full_name = full_name
    }
  }
}

export const getters = {
  getUid: state => (state.user.uid > 0) ? state.user.uid : false
}

export const strict = false
