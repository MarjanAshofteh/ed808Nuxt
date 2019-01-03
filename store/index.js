import Vue from 'vue'
import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined
import Cookies from 'js-cookie';

Vue.use(Vuex)

export const state = () => ({
  uid:0,
  user: {
    uid: '',
    picture: '',
    username: ''
  },
  roles:['administrator'],
  //allContents page
  filtersLoading: true,
  selected : {
    type: [],
    category: [],
    topic: [],
  },
  queryNames : {
    t2258: 'product_kind',
    t2259: 'field',
    t2260: 'publication_name',
    t2261: 'exam',
    t2262: 'education_kind',
    t2264: 'academic_orientation',
    t2265: 'special',
    t2458: 'producer',
  },
  filters : {}
})

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit }, { req }) {
    if (req.headers && req.headers.cookie) {
      // ToDo: Handle Token Based Auth And NavBar Info 
      let parsedCookie = cookieparser.parse(req.headers.cookie)
      console.log(parsedCookie.token)
      if (parsedCookie.token) {
        let { data } = await this.$axios.get('/latin/user/login/nav_bar_info')
        console.log(data)
      }
    }
  },
  async login({ hash, username_email, password, reCaptchaToken }) {
    try {
      await this.$axios.post('/latin/user/login', { hash, username_email, password, reCaptchaToken })
      .then((data)=> {
        console.log(data)
        Cookies.set('token', data.data.token, 23)
      })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('نام کاربری یا کلمه عبور اشتباه می باشد!')
      }
    //   throw error
    }
  },

  // ToDo: After Switching To Token-Based Auth We Should Handle Register And Logout

/*
  async register({ commit }, { name, phone, email, password, password2 }) {
    try {
      const { data } = await axios.post('/api/users/register', { name, phone, email, password, password2 }, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      commit('SET_USER', data)
      // console.log(data)
      // console.log(this.state.authUser)
      // const {resp} = await axios.post('http://localhost:8000/api/users/login', {phone, password}, {
      //   headers: {'Access-Control-Allow-Origin': '*'}
      // })
      // console.log(resp)
      // window.location.assign('/')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('نام کاربری یا کلمه عبور اشتباه می باشد!')
      }
      throw error
    }
  },

  async logout({ commit }) {
    const { logout } = await axios.get('/api/users/logout')
    console.log(logout)
    commit('SET_USER', null)
  }
  */
}

export const mutations = {
  LOGIN(state,uid,{user}){
    state.uid = uid
    state.user = {user}
  },
  LOGOUT(state){
    state.uid = 0
  },
  SET_FILTERS(state, filters){
    state.filters = filters
  },
}

export const getters = {
  getUid: state => (state.uid > 0)? state.uid : false
}


