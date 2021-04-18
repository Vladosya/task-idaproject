<template>
  <div class="cover"></div>
  <div class="basket">
    <div class="basket__header">
      <h1 class="basket__title">Корзина</h1>
      <img
        class="basket__cross"
        src="../img/cross.svg"
        alt="cross"
        v-on:click="$emit('closeBasket')"
      >
    </div>
    <div v-if="!basket.length && !submit">
      <div class="basket__text">Пока что вы ничего не добавили в корзину.</div>
      <button class="basket__btn" v-on:click="$emit('closeBasket')">Перейти к выбору</button>
    </div>
    <div v-if="basket.length && !submit">
      <h2 class="basket__title-products">Товары в корзине</h2>
      <div class="basket__items">
        <div class="basket__card" v-for="product in basket" :key="product.id">
          <div class="basket__product-img">
            <img :src="'https://frontend-test.idaproject.com' + product.photo" alt="product">
          </div>
          <div>
            <div class="basket__card-title">
              <span>{{ product.name }}</span>
            </div>
            <div class="basket__card-price">
              <span>{{ product.price }} ₽</span>
            </div>
            <div class="basket__card-rating">
              <img class="basket__card-header-star" src="../img/star.svg" alt="star">
              <img class="basket__card-header-insideStar" src="../img/star-inside.svg" alt="inside">
              <span class="basket__card-header-rating">{{ product.rating }}</span>
            </div>
          </div>
          <div class="basket__card-delete">
            <img v-on:click="deleteFromBasket(product.id)" src="../img/deleteCard.svg" alt="delete">
          </div>
        </div>
      </div>
      <h3 class="basket__order-title">Оформить заказ</h3>
      <form @submit.prevent="sentContact" class="basket__form">
        <div>
          <label class="basket__form-name">
            <input
              type="text"
              placeholder="Ваше имя"
              v-model.trim="name"
              required
            />
          </label>
        </div>
        <div>
          <label class="basket__form-phone">
            <input type="tel"
                   v-model.number.trim="phone"
                   name="phone"
                   id="phone"
                   placeholder="+7 (555) 555-5555"
                   autocomplete="tel"
                   maxlength="14"
                   minlength="11"
                   class="form-control"
                   required />
          </label>
        </div>
        <div>
          <label class="basket__form-address">
            <input
              type="text"
              placeholder="Адрес"
              v-model.trim="address"
              required
            />
          </label>
        </div>
        <button type="submit"
                class="basket__btn"
        >Отправить</button>
      </form>
    </div>
    <div class="basket__success" v-if="submit">
      <img class="basket__success-logo" src="../img/submitTrueImg.svg" alt="img">
      <h3 class="basket__success-title">Заявка успешно отправлена</h3>
      <div class="basket__success-subtitle">Вскоре наш менеджер свяжется с Вами</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Basket',
  setup () {
    const store = useStore()
    const submit = ref(false)
    const phone = ref('')
    const name = ref('')
    const address = ref('')

    const sentContact = (el) => {
      if (el.type === 'submit') {
        submit.value = true
        store.commit('deleteAllBasket')
      }
    }

    return {
      basket: store.state.basket,
      deleteFromBasket: (id) => store.commit('deleteFromBasket', id),
      name,
      phone,
      address,
      sentContact,
      submit
    }
  },
  emits: ['closeBasket']
}
</script>

<style lang="scss" scoped>
.cover{
  height: 100%;
  background: #FFFFFF;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
}
.basket {
  position: fixed;
  right: 0;
  top: 0;
  height: 1077px;
  max-width: 460px;
  background: #FFFFFF;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0 0 8px;
  &__header {
    margin-left: 48px;
    display: flex;
  }
  &__title {
    font-family: PT Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 41px;
    color: #000000;
  }
  &__cross {
    margin: 0 53px 0 227px;
    cursor: pointer;
  }
  &__text {
    margin-left: 48px;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    line-height: 28px;
    color: #000000;
    width: 364px;
  }
  &__items {
    min-height: 264px;
    max-height: 264px;
    overflow-y: auto;
  }
  &__btn {
    margin: 24px 0 0 48px;
    height: 50px;
    width: 364px;
    background: #1F1F1F;
    border-radius: 8px;
    text-align: center;
    color: #FFFFFF;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    &:hover {
      background: #59606D;
      cursor: pointer;
    }
  }
  &__title-products {
    margin-left: 48px;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;
    display: flex;
    align-items: flex-end;
    color: #59606D;

  }
  &__card {
    margin: 0 auto 12px auto;
    width: 364px;
    height: 120px;
    display: grid;
    grid-template-columns: 35% 50% 15%;
    background: #FFFFFF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
  &__product-img {
    margin-top: 15px;
    text-align: center;
    img {
      height: 90px;
      width: 81.57px;
    }
  }
  &__card-title {
    max-width: 170px;
    margin-top: 12px;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #59606D;
  }
  &__card-price {
    margin-top: 6px;
  }
  &__card-rating {
    margin-top: 19px;
    position: relative;
  }
  &__card-header-star {

  }
  &__card-header-insideStar {
    position: absolute;
    left: 1px;
    top: 6px;
  }
  &__card-header-rating {
    font-family: PT Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 13px;
    color: #F2C94C;
    margin-left: 3px;
    vertical-align: text-top;
  }
  &__card-delete {
    margin-top: 49px;
    text-align: center;
    cursor: pointer;
  }
  &__order-title {
    margin-left: 48px;
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 23px;
    display: flex;
    align-items: flex-end;
    color: #59606D;
  }
  &__form {

  }
  &__form-name {
    margin-left: 48px;
    input {
      padding-left: 14px;
      height: 50px;
      width: 364px;
      background: #F8F8F8;
      border: none;
      border-radius: 8px;
      font-family: PT Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #959DAD;
    }
  }
  &__form-phone {
    margin-left: 48px;
    input {
      margin-top: 16px;
      padding-left: 14px;
      height: 50px;
      width: 364px;
      background: #F8F8F8;
      border: none;
      border-radius: 8px;
      font-family: PT Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #959DAD;
    }
  }
  &__form-address {
    margin-left: 48px;
    input {
      margin-top: 16px;
      padding-left: 14px;
      height: 50px;
      width: 364px;
      background: #F8F8F8;
      border: none;
      border-radius: 8px;
      font-family: PT Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #959DAD;
    }
  }
  &__success {

  }
  &__success-logo {
    margin: 50% auto auto 190px;
    height: 80px;
    width: 80px;
  }
  &__success-title {
    margin: 24px 0 0 0;
    font-family: PT Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
    text-align: center;
    color: #000000;
  }
  &__success-subtitle {
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #59606D;
  }
}
</style>
