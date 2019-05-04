<template>
  <div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper
        :indicator-dots="true"
        :autoplay="true"
        :interval="5000"
        :duration="500"
      >
        <block v-for="(index, key) in imgUrls" :key="key">
          <swiper-item>
            <image :src="index" class="swiper_img"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 所有商品 -->
    <van-tag mark color="#f56aa5" size="large" custom-class="tagTitle">所有商品</van-tag>
    <!-- 所有商品简介 -->
    <goodsInfo :info="goodsInfo[key]" v-for="(index, key) in goodsInfo" :key="key"></goodsInfo>
  </div>
</template>

<script>
import {$ajax} from '@/utils/request'
// import goodsCard from '@/components/goodsCard'
import goodsInfo from '@/components/goodsInfo'
export default {
  data () {
    return {  
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      tabbarTitle: ['素绽雪商城', 'aa', 'bb', '我的'],
      goodsImg:"../../../static/images/sp0.jpg",
      goods:[{
        num: "999",
        tag: "HOT",
        price: "556.00",
        desc: "日本进口 温和深层清洁 补水保湿控油",
        title: "海洋矿物质美颜套装",
        thumb:"../../../static/images/sp0.jpg"
      },{
        num: "999",
        tag: "HOT",
        price: "288.00",
        desc: "日本进口 温和深层清洁 补水保湿控油",
        title: "海洋矿物质莹亮修复霜",
        thumb:"../../../static/images/sp1.jpg"
      }],
      goodsInfo:[{
        name:'海洋矿物质美颜套装',
        price: '556.00',
        url:'../../static/images/sp0.jpg'
      },{
        name:'海洋矿物质莹亮修复霜',
        price: '288.00',
        url: '../../static/images/sp1.jpg'
      }]
    }
  },

  components: {
    // goodsCard,
    goodsInfo
  },
  computed: {
  },
  methods: {
    changeTabbar(e) {
      let index = e.mp.detail
      wx.setNavigationBarTitle({
        title: this.tabbarTitle[index]
      })
    }
  },
  async mounted() {
    let user = wx.getStorageSync('user').user_id
    let info = await $ajax('goods/'+ user, '', 'GET')
    this.goodsInfo = []
    for (let i = 0; i < info.result.length; i++) {
      let msg = info.result[i]
      let goodsInfo = {
        id: msg.goods_id,
        name: msg.goods_name,
        price: msg.goods_price_0,
        url:'../../static/images/sp0.jpg'
      }
      this.goodsInfo.push(goodsInfo)
    }
  },
  onLoad() {
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // })
  },
  // onShareAppMessage() {
  //     return {
  //       title: '自定义转发标题',
  //       path: '../pages/index',
  //       imageUrl: 'url',
  //       success: res => {},
  //       fail: () => {},
  //       complete: () => {}
  //     };
  //   },
}
</script>

<style>
.swiper_img{
  height: 100%;
  width: 100%;
}
.goodsInfo{
  height: 100%;
  font-size: 16px;
}
.goodsInfo img{
  height: 120px;
  width: 100%;
}
.goodsInfo p:nth-child(2) {
  padding: 0 10px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.goodsInfo p:nth-child(3) {
  color: red;
  padding: 0 10px;
}
.wrap{
  margin: 10px;
  border-radius: 5px; 
  overflow: hidden;
  box-shadow: 0px 0px 3px #888888;
}
.tagTitle{
  margin: 10px 0 0 0;
}
</style>
