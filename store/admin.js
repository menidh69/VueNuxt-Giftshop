// eslint-disable-next-line import/no-cycle

export const state = () => ({
  error: null,
  success: false,
  loading: false,
})

export const actions = {
  async createProduct({ commit }, body) {
    commit('setLoading', true)
    try {
      const resp = await this.$axios.$post('/products', body)
      commit('addProduct', resp)
    } catch (e) {
      console.log(e)
    }
  },
  async editProduct({ commit }, body) {
    const { id } = body
    try {
      const resp = await this.$axios.$post(`/products/${id}`, body)
      commit('editProduct', resp.data)
      // router.push('/admin/products')
    } catch (e) {
      commit('setAdminError', e.response.data.message)
    }
  },
  async deleteProduct({ commit }, id) {
    try {
      await this.$axios.$post(`/products/${id}`)
      commit('deleteProduct', id)
    } catch (e) {
      commit('setAdminError', e)
    }
  },
}

export const getters = {
  success(state) {
    return state.success
  },
  loading(state) {
    return state.loading
  },
}

export const mutations = {
  addProduct(state, payload) {
    this.state.products = [...this.state.products, payload]
    state.success = true
  },
  deleteProduct(_state, id) {
    console.log(this.state.products)
    const newData = [...this.state.products].filter(
      (product) => product.id !== id
    )
    console.log(newData)
    this.state.products = newData
  },
  editProduct(_state, body) {
    const { id } = body
    const newData = [...this.state.products].filter(
      (product) => product.id !== id
    )
    newData.push(body)
    this.state.products = newData
  },
  restart(state) {
    state.success = false
    state.loading = false
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setAdminError(state, payload) {
    state.error = payload
  },
}
