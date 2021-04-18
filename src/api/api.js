import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://frontend-test.idaproject.com/api/'
})

export const productsAPI = {
  backpacks ({ category }) {
    return instance.get(`product?category=${category}`)
  },
  messengerBags ({ category }) {
    return instance.get(`product?category=${category}`)
  },
  businessBags ({ category }) {
    return instance.get(`product?category=${category}`)
  }
}
