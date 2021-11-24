import {
  getUserDetail
} from '@pc/api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 角色 code
 * ADMIN("管理员",0),
 * USER("用户", 1);
 *
 * userType - 当前账号类型
 */

export default new Vuex.Store({
  getters: {
    isAdmin({ userInfo: { currentRole: { code } } }) {
      return code === 0
    },
    isUser({ userInfo: { currentRole: { code } } }) {
      return code === 1
    }
  },
  state: {
    token: '',

    userInfo: {},

    userMenus: [],

    asideToggle: false,

    /**
     * 全局 loading
     * - 每次调用接口时会设置该值，
     * - 发出请求时设置为 true，请求结束时设置为 false，
     * - 可用于表格请求数据时作为表格的 v-loading
     */
    loading: false,
    genderMap: {
      '1': '男',
      '2': '女',
      '0': '未知'
    },
    accountStatusMap: {}, // 账号状态
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info
    },
    SET_USER_MENUS(state, menus) {
      state.userMenus = menus
    },
    SET_ASIDE_TOGGLE(state, bool) {
      state.asideToggle = bool
    },
    SET_LOADING(state, bool) {
      state.loading = bool
    }
  },
  actions: {
    async getUserDetail({ commit }) {
      const { data } = await getUserDetail()
      commit('SET_USER_INFO', data)
    }
  }
})
