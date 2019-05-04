<template>
  <div class="addaddress">
    <van-cell-group>
      <van-field
        :value="name"
        clearable
        icon="friends-o"
        placeholder="收货人"
        @blur="changeUser"
      />
       <van-field
        type="number"
        :value="phone"
        placeholder="手机号码"
        @blur="changePhone"
      />
      <van-field
        :value="address"
        placeholder="所在地"
        disabled
        @blur="changeAddress"
        @click="showArea"
      />
      <van-field
        :value="addressDetail"
        placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
        @blur="changeDetail"
      />
      <van-switch-cell
        title="设为默认地址"
        :checked="isDefault"
        @change="onChange"
      />
    </van-cell-group>

    <div class="sureAdd">
      <van-button type="danger" size="large" @click="sureAdd" >确认添加</van-button>
    </div>

    <van-popup
      :show="show"
      position="bottom"
      :overlay="true"
      @close="onClose"
    >
    <van-area :area-list="areaList.default" @confirm="sureAddress" />
    </van-popup>
  </div>
</template>

<script>
import {$ajax, $axios} from '@/utils/request'
export default {
  components: {
  },
  data () {
    return{
      show: false,
      name:'',
      phone:'',
      address:'',
      addressDetail:'',
      isDefault: false
    }
  },
  methods: {
    addAddress() {
      this.show = true
    },
    onClose() {
      this.show = false
    },
    sureAddress(e) {
      let arr = e.mp.detail.values.map(res =>{
        return res.name
      })
      this.address = arr.join(" ")
      this.show = false
    },
    showArea() {
      this.show = true
    },
    onChange(e) {
      this.isDefault = e.mp.detail
    },
    changeUser(e) {
      this.name = e.mp.detail.value
    },
    changePhone(e) {
      this.phone = e.mp.detail.value
    },
    changeAddress(e) {
      this.address = e.mp.detail.value
    },
    changeDetail(e) {
      this.addressDetail = e.mp.detail.value
    },
    async sureAdd() {
      let data = {
        "user_id": wx.getStorageSync('user').user_id,
        "address": [
          {
            "main":this.address,
            "detail":this.addressDetail,
            "receivePerson": this.name,
            "phone":this.phone,
            "status": this.isDefault == true ? 1:0
          }
		    ]
      }
      let msg = await $axios('user', data, 'POST')
      console.log(msg)
      console.log(this.name, this.phone, this.address, this.addressDetail, this.isDefault)
    }
  },
  computed: { 
    areaList() {
      return require('../../../../utils/area')
    }
  },
}
</script>

<style>
.sureAdd{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
