<template>
  <div>
      <view :v-show="canIUse" >
          <view class='header'>
              <image src='../../static/images/user.png'></image>
          </view>
  
          <view class='content'>
              <view>申请获取以下权限</view>
              <text>获得你的公开信息(昵称，头像等)</text>
          </view>
  
          <button class='bottom' type='primary' open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
              授权登录
          </button>
          <button class='bottom' type='primary'  @click="setTest">
              测试
          </button>
      </view>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
    }
  }, 
  methods: {
    bindGetUserInfo(e) {
      console.log(e.mp.detail)
      // wx.setStorageSync('userinfo', e.mp.detail.rawData)
      if(e.mp.detail.userInfo) {
        wx.switchTab({ url: '../index/main' })
      }
    },
    setTest() {
      wx.openSetting({
        success(res) {
          console.log(res.authSetting)
        }
      })
    }

  },
}
</script>

<style>
.header {
    margin: 90rpx 0 90rpx 50rpx;
    border-bottom: 1px solid #ccc;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
}
 
.header image {
    width: 200rpx;
    height: 200rpx;
}
 
.content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
}
 
.content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
}
 
.bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
}
</style>
