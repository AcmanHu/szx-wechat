<template>
  <div class="card">
    <van-card
      tag="HOT"
      :price="info.price"
      desc="描述信息"
      :title="info.goods_name"
      origin-price="1000"
      thumb="../../../static/images/sp0.jpg"
    >
      <div slot="footer" class="botGroup">
        <van-checkbox custom-class="check" :value="info.status" checked-color="#f56aa5" @change="checkOne">选中</van-checkbox>
        <van-stepper custom-class="stepper" :value="info.quantity" min="1" @change="changeStepper" />
      </div>
    </van-card> 
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  props: ['info'],
  data() {
    return {
      num:1,
    }
  },
  created() {
  },
  onShow() {
    
  },
  computed: {

  },
  methods: {
    changeStepper(e) { //步进器的值发生改变时触发
      this.info.quantity = e.mp.detail
      this.upDataNum({
          req:{
            goods_id:this.info.goods_id,
            quantity:this.info.quantity
          },
          data:[{
            goods_id:this.info.goods_id,
            goods_name: this.info.goods_name,
            quantity: this.info.quantity,
            price: this.info.unitPricre
          }]
        })
    },
    checkOne(e) {
      this.info.status = e.mp.detail
      if(this.info.status) {
        this.$emit('deleteOne', this.info.goods_id)
      } else {
        this.$emit('deleteOne', null)
      }
      this.selectOne([this.info.goods_id, this.info.status])
    },
    ...mapActions(['addGood', 'upDataNum']),
    ...mapMutations(['selectOne'])
  },
}
</script>

<style>
.card{
  margin-bottom: 10px;
}
.botGroup{
  /* background: red; */
  height: 30px;
  /* line-height: 40px; */
  position: relative;
}
.check{
  /* display: inline-block; */
  /* padding-top: 10px; */
  position: absolute;
  top: 5px;
  /* left: 0; */
}
.delete{
  /* float: left;
  margin-left: 20px; */
  text-align: center;
  /* background: #fafafa; */
}
.delete span {
  color: #f56aa5;
  font-size: 30px;
  display: inline-block;
  margin-top: 50px;
  /* background: red; */
}
.stepper{
  /* display: inline-block; */
  position: absolute;
  right: 0px;
}
</style>
