<template>
  <div class="forme">
      <!-- 头部信息 头像,昵称和认证 -->
      <myinfo></myinfo>
      <!-- 买家和卖家中心 -->
      <collapse :info="collapseInfo[key]" v-for="(index, key) in collapseInfo" :key="key"></collapse>
      <!-- 设置 -->
      <van-cell-group custom-class="setGroup">
        <van-cell
          title="设置"
          icon="setting-o"
          is-link
          url="./setInfo/main"
        />
      </van-cell-group>
  </div>
</template>

<script>
import myinfo from '@/components/myInfo'
import collapse from '@/components/collapse'
export default {
  components: {
    myinfo,
    collapse
  },
  data () {
    return{
      collapseInfo:[{
        activeNames:['1'],
        title:'买家中心',
        icon: 'shop-o',
        iconName: ['newspaper-o', 'free-postage', 'certificate'],
        operat: ['代发货', '待收货', '已完成'],
        url: ['../others/sendGoods/main', '../others/receiveGoods/main' ,'']
      },{
        activeNames:['1'],
        title:'卖家中心',
        icon: 'shop-o',
        iconName: ['contact', 'shop-o', 'records'],
        operat: ['我的信息', '商品库存', '订单管理'],
        url: ['../others/myInfo/main', '' ,'']
      }],
      userinfo:{}
    }
  },
  onShow() {
    // this.userinfo= JSON.parse(wx.getStorageSync('userinfo'))
    // console.log(wx.getStorageSync('userinfo'))

    // console.log(userinfo.nickName)
  },
  methods: {
    changeCollapse(e) {
      this.activeNames = e.mp.detail
    },
    changeCollapse2(e) {
      this.activeNames2 = e.mp.detail
    }
  },
}
</script>

<style>
.setGroup{
  margin-top: 10px;
}
</style>
