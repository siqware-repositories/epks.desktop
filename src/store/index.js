import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import grade from './grade'
import grade_detail from './grade_detail'
import subject from './subject'
import user from './user'
import course from './course'
Vue.use(Vuex);
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      grade,
      grade_detail,
      subject,
      user,
      course
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  return Store
}
