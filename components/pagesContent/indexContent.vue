<template>
  <div>
    <h1>Welcome!</h1>
    <div v-if="products">{{ products }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['products']),
  },
  created() {
    this.getProducts()
  },
  methods: {
    ...mapActions({ getProducts: 'getItemsFromApi' }),
  },
}
</script>

<style lang="scss" scoped></style>
