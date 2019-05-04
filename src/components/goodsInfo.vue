<template>
  <div class="goodsInfo" @click="toInfo(info)">
      <van-col span="12" custom-class="goodsInfo">
        <div class="wrap">
          <img :src="info.url"  alt="">
          <p>{{info.name}}</p>
          <p>￥{{info.price}}</p>
        </div>
      </van-col>
  </div>
</template>

<script>
export default {
  props: ['info'],

  created() {
  },
  methods: {
    toInfo(res) {
      // let msg = JSON.stringify(res)
      // console.log(res.id)
    // let b = JSON.parse(a)
    // console.log(b)
      wx.navigateTo({ url: `./goodsDetail/main?id=${res.id}` });
    }
  },
}
</script>

<style>

</style>
