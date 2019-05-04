<template>
  <div class="goodsMsg">
    <div class="head">
      <img src="../../../../static/images/ab1.jpg" alt="">
    </div>
    <div class="goodinfo">
      <p class="price">￥{{price}}</p>
      <p class="oldPrice">￥{{price}}</p>
      <p class="describe">和风雨男士洗面奶美白祛痘控油去黑头补水保湿护肤品套装专用洁面</p>
    </div>

    <van-popup :show="show" @close="onClose" position="bottom">
      <div class="selectNum">
        <van-card
          :price="price"
          desc="描述信息"
          :title="goodsMsg.goods_name"
          thumb="../../../static/images/sp0.jpg"
        >
            <div slot="footer" class="stepperGroup">
              <span class="numclass">数量：{{value}}</span>
              <van-stepper :value="value" @change="changeNum" custom-class="stepper"/>  
            </div>  
        </van-card>
        <div class="btnGroup">
          <van-button size="large" round type="danger" @click="addShopCart">确定</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="cartNum" @click="toShopCart"/>
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button text="加入购物车" type="warning" @click="addGoods"/>
      <van-goods-action-button text="立即购买" @click="sureBuy"/>
    </van-goods-action>
    
  </div>
</template>

<script>
import {$ajax} from '@/utils/request'
import store from '@/utils/store'
import {mapState, mapActions} from 'vuex'
export default {
  components: {
  },
  data () {
    return{
      goodsMsg: {},
      show:false,
      value: 1,
      price: 0
    }
  },
  computed: {
    ...mapState(['cart']),
    cartNum() {
      let num = 0
      this.cart.car.forEach(item => {
        num += item.quantity
      })
      return num
    }
  },
  methods: {
    toShopCart() {
      wx.switchTab({ url: '../../inventory/main' });
    },
    addGoods() {
      this.show = true
    },
    onClose() {
      this.show = false
    },
    changeNum(e) {
      this.value = e.mp.detail
      this.price = this.value * this.goodsMsg.goods_price
    },
    sureBuy() {
      console.log(this.cart)
    },
    addShopCart() {
      let goodsInfo = [
          {
            goods_id:this.goodsMsg.goods_id,
            goods_name: this.goodsMsg.goods_name,
            quantity: this.value,
            price: this.goodsMsg.goods_price
          }
        ]
      this.addGood(goodsInfo)
      this.show = false
      this.value = 1
    },
    ...mapActions(['addGood'])
  },
  async onLoad(option) {
    let userId = wx.getStorageSync('user').user_id
    let msg = await $ajax(`goods_id/${option.id}/user_id/${userId}`, '', 'GET')
    this.goodsMsg = msg.result
    this.price = msg.result.goods_price
  },
  onUnload(){
    this.show = false
  }
}
</script>

<style scoped>
.head{
  height: 150px;
  background: #ccc;
}
.head img{
  height: 100%;
  width: 100%;
}
.goodinfo{
  height: 100px;
  padding: 10px;
  font-size: 18px;
}
.goodinfo .price{
  color: red;
}
.goodinfo .oldPrice{
  font-size: 14px;
  color: #828282;
  text-decoration: line-through;
}
.goodinfo .describe{

}
.selectNum{ 
  height: 450px;
  background: #f1f4f8;
  position: relative;
}
.stepper{
  display: inline-block;
}
.numclass{
  font-size: 16px;
  line-height: 30px;
  float: left;
}
.stepperGroup{
  height: 30px;
}
.btnGroup{
  width: 100%;
  position: absolute;
  bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
