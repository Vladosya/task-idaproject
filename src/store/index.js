import { createStore } from 'vuex'
import { productsAPI } from '@/api/api'

export default createStore({
  state: {
    backpacks: [],
    messengerBags: [],
    businessBags: [],
    basket: []
  },
  mutations: {
    addInBasket (state, { id, product }) {
      if (product === 'Рюкзаки') {
        const product = state.backpacks.find(b => b.id === id)
        state.basket.push(product)
      } else if (product === 'Сумки-мессенджеры') {
        const product = state.messengerBags.find(b => b.id === id)
        state.basket.push(product)
      } else {
        const product = state.businessBags.find(b => b.id === id)
        state.basket.push(product)
      }
    },
    deleteFromBasket (state, id) {
      const index = state.basket.findIndex(b => b.id === id)
      state.basket.splice(index, 1)
    },
    deleteAllBasket (state) {
      state.basket.splice(0, state.basket.length)
    },
    sortByPrice (state, payload) {
      console.log('payload', payload)
      if (payload === 'Рюдзаки') {
        state.backpacks.sort(function (a, b) {
          return a.price - b.price
        })
      } else if (payload === 'Сумки-мессенджеры') {
        state.messengerBags.sort(function (a, b) {
          return a.price - b.price
        })
      } else {
        state.businessBags.sort(function (a, b) {
          return a.price - b.price
        })
      }
    },
    sortByPopular (state, payload) {
      if (payload === 'Рюдзаки') {
        state.backpacks.sort(function (a, b) {
          return a.rating - b.rating
        })
      } else if (payload === 'Сумки-мессенджеры') {
        state.messengerBags.sort(function (a, b) {
          return a.rating - b.rating
        })
      } else {
        state.businessBags.sort(function (a, b) {
          return a.rating - b.rating
        })
      }
    }
  },
  actions: {
    getBackpacks (context, category) {
      productsAPI.backpacks({ category })
        .then(({ data }) => {
          if (!context.state.backpacks.length) {
            context.state.backpacks.push(...data)
            // new
            context.state.backpacks.sort(function (a, b) {
              return a.price - b.price
            })
          }
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    },
    getMessengerBags (context, category) {
      productsAPI.messengerBags({ category })
        .then(({ data }) => {
          if (!context.state.messengerBags.length) {
            context.state.messengerBags.push(...data)
            // new
            context.state.messengerBags.sort(function (a, b) {
              return a.price - b.price
            })
          }
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    },
    getBusinessBags (context, category) {
      productsAPI.businessBags({ category })
        .then(({ data }) => {
          if (!context.state.businessBags.length) {
            context.state.businessBags.push(...data)
            // new
            context.state.businessBags.sort(function (a, b) {
              return a.price - b.price
            })
          }
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    }
  },
  modules: {
  }
})
