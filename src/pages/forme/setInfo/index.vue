<template>
  <div class="setinfo">
    <van-row custom-class="head">
      <van-col span="6" custom-class="avatarUrl">
        <div class="userAvatarUrl">
          <open-data type="userAvatarUrl"></open-data>
        </div>
      </van-col>
      <van-col span="12" custom-class="detailMsg">
        <p>{{info.realname === null?'未注册':info.realname}}</p>
        <p>{{info.realname === null?'请先注册': "ID："+ ID}}</p>
      </van-col>
      <van-col span="6" custom-class="compile">
        <van-tag plain round type="danger" size="large" @click="toSetPersonInfo">编辑</van-tag>
      </van-col>
    </van-row>
    <van-cell title="我的收货地址" icon="logistics" url="../myAddress/main" is-link link-type="navigateTo" />
    <van-cell
      title="意见反馈"
      icon="edit"
      is-link
    />
    <van-cell
      title="关于素绽雪"
      icon="manager-o"
      is-link
    />
  </div>
</template>

<script>
import {$ajax} from '@/utils/request'
export default {
  components: {
    
  },
  data () {
    return{
      info:{},
      ID: wx.getStorageSync('user').user_id
    }
  },
  async onShow() {
    let userId = wx.getStorageSync('user').user_id
    let info = await $ajax('user/' + userId, '', 'GET')
    this.info = info.result
    console.log(this.info)
  },
  methods: {
    toSetPersonInfo() {
      wx.navigateTo({ url: './personInfo/main' });
    }
  },
  computed: {
  },
}
</script>

<style>
.head{
  height: 90px;
  /* background: red; */
  font-size: 16px;
  border-bottom: 1px solid #f6f7f7;
}

.avatarUrl{
  height: 100%;
  width: 100%;
  text-align: center;
}
.avatarUrl .userAvatarUrl{
  height: 60px;
  width: 60px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  padding: 15px;
}
.head .detailMsg{
  height: 100%;
  padding-top: 20px;
}
.detailMsg p{
  padding-bottom: 10px;
} 
.footer{
  text-align: right;
}
.compile{
  padding-top: 35px;
  text-align: center;

}
</style>
