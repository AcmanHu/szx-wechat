<script>
import {$ajax} from '@/utils/request'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    
  },
  onLaunch() {
    wx.getSetting({ success: res => {
      if(res.authSetting['scope.userInfo']) {
        wx.login({
          async success(res) {
            console.log(res)
            let data = await $ajax('login/'+res.code, '', 'GET')
            // console.log(data)
            wx.setStorageSync('user', data.result)
          }
        })
      }else {
        console.log(1)
        wx.reLaunch({
          url: '../login/main'
        })
      }
    }})
    
  }, 
}
</script>

<style>
page{
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
