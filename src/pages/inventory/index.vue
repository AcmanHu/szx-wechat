<template>
  <div class="inventory">
    <div v-if="!cart.car.length">
      <van-notice-bar
        :scrollable="false"
        text="购物车空空的，也去购买吧"
      />
    </div>
    <div v-else>
      <goodsCard :info="cart.car[key]" v-for="(index, key) in cart.car" :key="key" @deleteOne="deleteMsg"></goodsCard>
    </div>
    <van-submit-bar
      :price="money*100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox custom-class="checkall" :value="cart.totalStatus" checked-color="#f56aa5" @change="checkAll">全选</van-checkbox>
      <van-button size="mini" type="danger" custom-class="delete" @click="deleteGood">删除</van-button>
    </van-submit-bar>
    <van-dialog id="van-dialog" />
    <div class="footer"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import goodsCard from '@/components/goodsCard'
import Dialog from "@/../static/dist/dialog/dialog"
export default {
  components: {
    goodsCard
  },
  data() {
    return {
      goodId: null,
      checkall: false,
      allGoodId: []
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['money'])
  },
  created() {
    this.selectGoods(wx.getStorageSync('user').user_id)
    console.log(wx.getStorageSync('user').status)
  },
  methods: {
    ...mapActions(['selectGoods', 'deleteGoods']),
    ...mapMutations(['selectAll']),
    onSubmit() {
      // console.log(this.cart)
      wx.requestPayment(
      {
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success':function(res){
        console.log("成功", res)
      },
      'fail':function(res){

        console.log("失败", res)
      },
      'complete':function(res){}
      })
    },
    checkAll(e) {
      this.cart.totalStatus = e.mp.detail
      this.selectAll(this.cart.totalStatus)
    },
    deleteMsg(id) {
      this.goodId = id
      // this.allGoodId.some(item => {
      //   if(item != id) {
          
      //   }
      // })
    },
    deleteGood() {
      let arr = []
      for (const i of this.cart.car) {
        if(i.status) {
          arr.push(i.goods_id)
        }
      }
      if(arr.length<1) {
         wx.showToast({
          title: '亲~你还没选中要删除的商品噢~',
          icon: 'none',
          duration: 2000
        })
      } else {
        Dialog.confirm({
          title: '警告',
          message: '是否删除选中商品'
        }).then(() => {
            this.deleteGoods({userinfo: wx.getStorageSync('user').user_id, goods_id: {goods_id: arr}})
          // on confirm
        }).catch(() => {
          // on cancel
        })
      } 
      // if(this.goodId) {
      //   Dialog.confirm({
      //     title: '警告',
      //     message: '是否删除选中商品'
      //   }).then(() => {
      //     this.deleteGoods({userinfo: wx.getStorageSync('user').user_id, goods_id: this.goodId})
      //     // on confirm
      //   }).catch(() => {
      //     // on cancel
      //   })
      // }else {
      //   wx.showToast({
      //     title: '请选选择您要删除的商品',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    },
  },
}
</script>

<style>
.inventory .checkall{
  /* margin: 5x 0px 0px 10px; */
  margin-left: 10px;
}
.inventory .delete{
  margin-left: 10px;
}
.footer{
  height: 50px;
}
</style>
