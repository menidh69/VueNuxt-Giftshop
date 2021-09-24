export const state = () => ({
  items: [],
})

export const actions = {
  async addItem({ commit, rootState }, item) {
    if (rootState.user.isLoggedIn) {
      try {
        await this.$axios.$post(`/shoppingCart`, item)
        commit('addItem', item)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async removeItem({ commit, rootState }, itemId) {
    if (rootState.user.isLoggedIn) {
      await this.$axios.$post(`/shoppingCart/${itemId}`, itemId)
      console.log('Im logged in')
    }
    commit('removeItem', itemId)
  },
}

export const getters = {
  cartItems(state) {
    return state.items
  },
  cartItemsQuantity(state) {
    const amount = state.items.reduce((a, b) => a + b.quantity, 0)
    return amount
  },
  getTotal(state) {
    const total = state.items.reduce((a, b) => a + b.quantity * b.price, 0)
    return total
  },
}

export const mutations = {
  addItem(state, item) {
    const existingItem = state.items.filter((i) => i.name === item.name)
    if (existingItem.length > 0) {
      existingItem[0].quantity += 1
    } else {
      state.items = [...state.items, { ...item, quantity: 1 }]
    }
  },
  removeItem(state, itemName) {
    const itemRef = state.items.filter((item) => item.name === itemName)
    if (itemRef[0].quantity === 1) {
      state.items = state.items.filter((item) => item.name !== itemName)
    } else {
      itemRef[0].quantity -= 1
    }
  },
  setCartItems(state, items) {
    state.items = items
  },
}
