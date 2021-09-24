export const state = () => ({
  isLoggedIn: false,
  userData: null,
  error: null,
})

export const getters = {
  userData(state) {
    return state.userData
  },
  isAdmin(state) {
    if (state.userData && state.userData.isAdmin) {
      return true
    }
    return false
  },
  error(state) {
    return state.error
  },
  isLoggedIn(state) {
    return state.isLoggedIn
  },
}
export const actions = {
  async login({ commit }, credentials) {
    console.log(credentials)
    commit('setLoading', true, { root: true })
    try {
      const resp = await this.$axios.$post('/users/signIn', credentials)

      // call login method
      if (resp.data.admin) {
        commit('setAdmin')
      }
      // setBearerToken(resp.data.accessToken)
      commit('setCartItems', resp.data.shoppingCart.cartProducts)
      commit('setUser', resp.data)
      // router.push('/')
    } catch (e) {
      commit('setError', e.response.data.message)
    }

    commit('setLoading', false, { root: true })
  },
  logout({ commit }) {
    commit('setLoading', true, { root: true })
    commit('logout')
    commit('setLoading', false, { root: true })
  },
}

export const mutations = {
  setUser(state, data) {
    state.userData = data
    state.isLoggedIn = true
  },
  logout(state) {
    state.userData = null
    state.isLoggedIn = false
    state.isAdmin = false
  },
  setError(state, message) {
    state.error = message
  },
  setAdmin(state) {
    state.isAdmin = true
  },
}
