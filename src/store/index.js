import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    cart: {
        items: [],
    },
      searchQuery: '', // 搜索关键字
      selectedPriceRange: '', // 价格筛选

      filteredGoods: [], // 过滤后的商品
      isFiltering: false, // 是否正在筛选
    user: {
        name: '',
        userId: '',
    },
    goods: [],
    isLoading: false
  },
  mutations: {
      setGoods(state, goods) {
          state.goods = goods;
          state.filteredGoods = goods; // 初始化为全部商品
      },
      updateFilteredProducts(state, filteredGoods) {
          state.filteredGoods = filteredGoods;
      },
      setFiltering(state, isFiltering) {
          state.isFiltering = isFiltering;
      },


   initAddCart(state, cart) {
      state.cart = cart
   },
   setUserId(state, userId) {
      state.user.userId = userId
   },
   setUserName(state, username) {
      state.user.name = username
   },
      updateSearchQuery(state, query) {
          state.searchQuery = query;
      },
      updateSelectedPriceRange(state, range) {
          state.selectedPriceRange = range;
      },
  },
  actions: {
      fetchGoods({ commit }) {
          axios.get('/api/goods/list').then(response => {
              commit('setGoods', response.data);
          }).catch(error => console.error(error));
      },

    saveUserInfo(userStore) {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
      }
      localStorage.setItem('user', JSON.stringify(userStore))
    },
    removeUserInfo() {
      let userStore = JSON.parse(localStorage.getItem('user'))
      userStore.state.user.userId = ''
      userStore.state.user.name = ''
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(userStore))
    },
  },
  getters: {
      allGoods(state) {
          return state.goods;
      },
      filteredGoods(state) {
          return state.filteredGoods;
      },
      isFiltering(state) {
          return state.isFiltering;
      },

    getUserInfo() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  modules: {
  }
})