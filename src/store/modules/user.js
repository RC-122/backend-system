import { loginApi, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    name: '个人空间管理系统',
    // avatar: '',
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USER: (state, payload) => {
    state.user = payload;
  },

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      //通过封装的loginApi发送请求
      loginApi(userInfo).then(res => {
        //对响应的数据结构
        const { data } = res;
        if (data) {
          //如果有数据就把数据存进仓库同时执行resolve状态
          commit("SET_USER", data)
          resolve();
        } else {
          //如果没有数据就直接执行reject状态同时把数据传回去
          reject(res)
        }//请求失败就reject失败原因
      }).catch((error) => {
        reject(error)
      })
    })
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   loginApi({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {

    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (typeof res === "string") {
          res = JSON.parse(res);
          if (res.code === 401) {
            reject(res.msg);
          }
        } else {
          commit("SET_USER", res.data);
          resolve();
        }
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()

      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

