<template>
  <Header
    :showBasket="showBasket"
    @open-basket="showBasket = true"
  />
  <div class="sort">
    <span class="sort__title">
      Сортировать по:
    </span>
    <span
      v-on:click="showSort = !showSort"
      class="sort__active"
    >
      {{ sort }} -
    </span>
    <ul class="sort__item" v-if="showSort">
      <li class="sort__list" v-on:click="changeSort('цене')">По цене</li>
      <li class="sort__list" v-on:click="changeSort('популярности')">По популярности</li>
    </ul>
  </div>
  <div class="content">
    <nav class="content__navbar">
      <h1 class="content__title">Каталог</h1>
      <ul class="content__item">
        <li class="content__link" v-on:click="getBackpacks('1')">
          <router-link to="/backpacks">Рюкзаки</router-link>
        </li>
        <li class="content__link second-link" v-on:click="getMessengerBags('2')">
          <router-link to="/messengerBags">Сумки-мессенджеры</router-link>
        </li>
        <li class="content__link" v-on:click="getBusinessBags('3')">
          <router-link to="/businessBags">Деловые сумки</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
  <Basket v-if="showBasket" @close-basket="showBasket = false" />
</template>

<script>
import Header from '@/components/Header'
import { ref } from 'vue'
import Basket from '@/components/Basket'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    Header,
    Basket
  },
  setup () {
    const showBasket = ref(false)
    const showSort = ref(false)
    const sort = ref('цене')
    const store = useStore()
    const route = useRoute()

    if (route.path === '/') {
      store.dispatch('getBackpacks', '1')
    } else if (route.path === '/messengerBags') {
      store.dispatch('getMessengerBags', '2')
    } else {
      store.dispatch('getBusinessBags', '3')
    }

    const changeSort = (text) => {
      sort.value = text
      showSort.value = false
      if (text === 'цене') {
        if (route.path === '/' || route.path === '/backpacks') {
          store.commit('sortByPrice', 'Рюдзаки')
        } else if (route.path === '/messengerBags') {
          store.commit('sortByPrice', 'Сумки-мессенджеры')
        } else {
          store.commit('sortByPrice', 'Деловые сумки')
        }
      } else {
        if (route.path === '/' || route.path === '/backpacks') {
          store.commit('sortByPopular', 'Рюдзаки')
        } else if (route.path === '/messengerBags') {
          store.commit('sortByPopular', 'Сумки-мессенджеры')
        } else {
          store.commit('sortByPopular', 'Деловые сумки')
        }
      }
    }

    return {
      showBasket,
      showSort,
      sort,
      changeSort,
      getBackpacks: (num) => store.dispatch('getBackpacks', num),
      getMessengerBags: (num) => store.dispatch('getMessengerBags', num),
      getBusinessBags: (num) => store.dispatch('getBusinessBags', num)
    }
  }
}
</script>

<style media="all" lang="scss">
.sort {
  position: relative;
  float: right;
  margin: 42px 88px 0 0;
  &__title {
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    color: #1F1F1F;
  }
  &__active {
    margin-left: 6px;
    color: #59606D;
  }
  &__active:hover {
    cursor: pointer;
  }
  &__item {
    width: 160px;
    height: 68px;
    background: #FFFFFF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 8px 0;
    margin: 6px 0 0 0;
    font-family: PT Sans;
    line-height: 18px;
    color: #959DAD;
  }
  &__list {
    list-style-type: none;
    //padding: 4px 0 4px 12px;
    &:first-child {
      padding: 12px 0 4px 12px;
    }
    &:last-child {
      padding: 4px 0 12px 12px;
    }
    &:hover {
      background: #F8F8F8;
      cursor: pointer;
      color: #1F1F1F;
    }
  }
}

.content {
  margin-top: 52px;
  margin: 32px 88px 0 88px;
  display: grid;
  grid-template-columns: 15% 85%;
  &__navbar {

  }
  &__title {
    font-family: PT Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 41px;
    color: #1F1F1F;
  }
  &__item {
    margin-top: 24px;
    list-style-type: none;
  }
  &__link {
    width: 60px;
    color: #959DAD;
    margin-top: 16px;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    a {
      text-decoration: none;
      color: #959DAD;
      &:first-child {
        margin-top: 0;
      }
      &:hover {
        text-decoration-line: underline;
        cursor: pointer;
        color: #1F1F1F;
      }
      &:active {
        text-decoration-line: none;
        color: #59606D;
      }
    }
  }
}

.second-link {
  width: 70px;
}

.active-link {
  color: black;
  text-decoration: underline;
  background-color: blueviolet;
}

@media (min-width: 1280px) {
  .content {
    margin: 32px 0 0 0;
  }
}

@media (min-width: 1920px) {
  .content {
    margin: 32px 0 0 180px;
  }
}

@media (min-width: 1536px) {
  .content {
    margin: 32px 0 0 88px;
  }
}

@media (min-width: 2560px) {
  .content {
    margin: 32px 0 0 340px;
  }
}

@media only screen and (max-height: 768px) and (max-width: 1024px){
  .content {
    margin: 32px 0 0 88px;
  }
}

// tabled
@media only screen and (max-width: 768px) {
  .content {
    margin: 32px 0 0 0;
    grid-template-columns: 32% 68%;
  }
}

@media only screen and (max-width: 820px) {
  .content {
    margin: 32px 0 0 0;
    grid-template-columns: 32% 68%;
  }
}
</style>
