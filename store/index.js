import VuexPersistence from 'vuex-persist'

// eslint-disable-next-line import/no-cycle

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   modules: ['user'],
// })

// export const plugins = [vuexLocal]

export const state = () => ({
  products: [],
  loading: false,
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}
export const getters = {
  products(state) {
    return state.products
  },
  productById: (state) => (id) => {
    console.log(id)
    const selectedItem = state.products.filter((i) => i.id === id)

    return selectedItem[0]
  },
}
export const actions = {
  async getItemsFromApi({ commit, state }) {
    commit('setLoading', true)
    const data = await this.$axios.$get(`/products`)
    commit('setProducts', data)
    commit('setLoading', false)
  },
}
