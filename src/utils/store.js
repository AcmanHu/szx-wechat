// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import {$ajax, $axios} from '@/utils/request'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    car:[],
    cart:{
      totalStatus:false,
      car:[]
    }
  },
  getters: {
    money(state) {
      let money = 0
      let newMoney = state.cart.car.filter(item => {
        return item.status
      })
      newMoney.forEach(item =>{
        money += item.price
      })
      return money
    }
  },
  mutations: {
    //修改car中的数据
    addGood(state, params) {
      for (const i of params) {
        let {goods_id, quantity, price, status} = i
        let isHas = state.cart.car.some(item => {
          if(item.goods_id == goods_id){
            item.quantity += quantity
            item.price = price * item.quantity
            item.status = status
            item['unitPricre'] = price
            return true
          }else {
            return  false
          }
        })
        if(!isHas) {
          i.price *= quantity
          i['unitPricre'] = price
          state.cart.car.push(i)
        }
      }
      let allStatus = state.cart.car.every(item => {
        return item.status
      })
      state.cart.totalStatus = allStatus
    },
    //更新购物车数据
    upDataNum(state, params) {
      let [{goods_id, price, quantity}] = params
      state.cart.car.some(item => {
        if(item.goods_id == goods_id) {
          item.price = price * quantity
          item.quantity = quantity
        }
      })
    },
    //全选
    selectAll(state, params) {
      console.log(params)
      state.cart.car.forEach(item => {
        item.status = params
      })
    },
    //单选
    selectOne(state, params) {
      let {goods_id, status} = params
      state.cart.car.forEach(item => {
        if(item.goods_id == goods_id) {
          item.status = status
        }
        return item
      })
      let result = state.cart.car.every(item => {
        return item.status
      })
      if(result) {
          state.cart.totalStatus = true
      }else {
          state.cart.totalStatus = false
      }
    },
    //删除数据后更新购物车
    deleteGoods(state, params) {
      for (const key in state.cart.car) {
        for (const i of params) {
          if(state.cart.car[key].goods_id = i) {
            state.cart.car.splice(key, 1)
          }
        }
      }
    }
  },
  actions: {
    //增加到购物车
    async addGood({commit}, params) {
      let data = {
        user_id: wx.getStorageSync('user').user_id,
        goods_detail: params
      }
      let result = await $axios('shopcart', data, 'POST')
      if(result.code === 1) {
        wx.showToast({
          title: result.msg,
          icon: 'success',
          duration: 2000
        })
        let goodsInfo = params
        console.log(goodsInfo)
        goodsInfo.map(item => {
          item['status'] = true
          console.log(item)
          return item
        })
        commit('addGood', goodsInfo)

        // console.log(goodsInfo)
      } else {
        wx.showToast({
          title: "加入失败，请稍后再试",
          icon: 'none',
          duration: 2000
        })
      }
    },
    //购物车信息
    async selectGoods({commit}, params) {
      let info = await $ajax('shopcart/'+ params, '', "GET")
      if(info.code === 1) {
        let cart = info.result
        cart.map(item => {
          item['status'] = false
          return item
        })
        console.log(cart)
        commit('addGood', cart)
      }
    },
    //修改购物车数据
    async upDataNum({commit}, params) {
      let {req, data} = params
      let info = await $axios('shopcart/'+ wx.getStorageSync('user').user_id, req , "PUT")
      if(info.code === 1) {
        commit('upDataNum', data)
      }
    },
    //删除购物车
    async deleteGoods({commit}, params) {
      let {userinfo, goods_id} = params
      let info = await $axios('shopcart/'+userinfo, goods_id, 'DELETE')
      commit('deleteGoods', goods_id.goods_id)
    },
    //支付
  }
})

export default store
