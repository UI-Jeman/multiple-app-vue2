import Vue from 'vue'
import Vuex from 'vuex'
import { getUserDetail } from '@app/api';
import { storage } from '@app/utils'

Vue.use(Vuex)



/**
 * 角色 code
 * ADMIN("管理员",0),
 * USER("用户", 1);
 * 
 * userType - 当前账号类型
 */
export default new Vuex.Store({
  state: {
    userDetail: {}
  },
  getters: {
    isAdmin({ userDetail: { currentRole: { code } } }) {
      return code === 0
    },
    isUser({ userDetail: { currentRole: { code } } }) {
      return code === 1
    }
  },
  mutations: {
    SET_USER_DETAIL(state, detail) {
      state.userDetail = detail
    }
  },
  actions: {
    async getUserDetail({ commit }) {
      let _userDetail = storage.get('user-detail')
      if (_userDetail) {
        commit('SET_USER_DETAIL', _userDetail)
        return _userDetail
      } else {
        const { data } = await getUserDetail()
        commit('SET_USER_DETAIL', data)
        if (!data) {
          return new Error('数据异常')
        } else {
          storage.set('user-detail', data)
          return data
        }
      }
    }
  }
})


