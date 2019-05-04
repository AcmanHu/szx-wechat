<template>
  <div class="address">
    <addressGroup v-for="(index, key) in 3" :key="key"></addressGroup>
    
    <div class="addGroup">
      <van-button type="danger" size="large" @click="addAddress" >添加新地址</van-button>
    </div> 
  </div>
</template>

<script>
import {$ajax} from '@/utils/request'
import addressGroup from '@/components/addressGroup'

export default {
  components: {
    addressGroup
  },

  data () {
    return{
      userID: wx.getStorageSync('user').user_id
    }
  },
  methods: {
    addAddress() {
      wx.navigateTo({ url: './addAddress/main' });
    }
  },
  computed: {
    areaList() {
      // return require('../../../utils/area')
    }
  },
  async onShow() {
    let info = await $ajax('user/'+ this.userID, '', 'GET')
    console.log(info)
    let address = JSON.parse(info.result.address)
    console.log(address)
  },
}
</script>

<style>
.addressGroup{
  /* height: 90px; */
  padding: 10px 0;
}
.address{
  position: relative;
  height: 100%;
  font-size: 14px;
}
.addGroup{
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 10px;
  box-sizing: border-box;
}
.nameImgBox{
  height: 100%;
  width: 100%;
  padding-top: 10px;
  text-align: center;
}
.nameImg{
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  background: #babcbe;
  color: white;
  display: inline-block;
}
.addressBox{

}
.addressBox .namePhone{
  
}
.addressBox .namePhone .telphone{
  padding-left: 5px;
  color: #999999;
}
.addressBox .allAddress{

}
.compileBox{
  text-align: center;
  margin-top: 10px;
  padding: 10px 0;
}
.compileBox .compile{
  display: inline-block;
  color: #9a9a9a;
}

</style>
