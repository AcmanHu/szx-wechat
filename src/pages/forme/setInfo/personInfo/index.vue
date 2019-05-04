<template>
  <div class="setPersonInfo">
    <van-cell-group>
      <van-field
        :value="name"
        label="姓名"
        maxlength="10"
        placeholder="请输入姓名"
        @blur="changeName"
      />
      <van-field
        :value="IDcard"
        label="身份证"
        maxlength="20"
        placeholder="请输入身份证"
        @blur="changeIDcard"
      />
      <van-field
        type="number"
        :value="phone"
        label="电话"
        maxlength="11"
        placeholder="请输入电话"
        @blur="changePhone"
      />
      <van-field
        :value="sex"
        label="性别"
        disabled
        icon="arrow"
        @click="chooseSex"
        placeholder="选择性别"
      />
    </van-cell-group>

    <van-popup
      :show="showSex"
      position="bottom"
      @close="onClose"
    >
      <van-picker :columns="sexVal" @change="getSex"/>
    </van-popup>
    <div class="btnGroup">
      <van-button size="large" round type="danger" @click="save">保存</van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import {$ajax, $axios} from '@/utils/request'
import Toast from '@/../static/dist/toast/toast';
export default {
  components: {
  },

  data () {
    return{
      name:'',
      IDcard:'',
      phone:'',
      sex:'',
      showSex: false,
      sexVal: ['请选择','男', '女'],
      userId: wx.getStorageSync('user').user_id,
    }
  },
  methods: {
    onClose() {
      this.showSex = false
    },
    chooseSex() {
      this.showSex = true
    },
    getSex(e) {
      let sex = e.mp.detail.value
      if(sex) {
        this.sex = sex
        this.showSex = false 
      }
    },
    changeName(e) {
      this.name = e.mp.detail.value
    },
    changeIDcard(e) {
      this.IDcard = e.mp.detail.value
    },
    changePhone(e) {
      this.phone = e.mp.detail.value
    },
    async save() {
      if(this.name == '' || this.IDcard == '' || this.phone == '' || this.sex == '') {
        console.log("信息不能为空")
      } else {
        let data = {
          "inform": {
            "idcard": this.IDcard,
            "phone": this.phone,
            "realname": this.name,
            "sex": this.sex
          }
        }
        let msg = await $axios('user/' + this.userId, data, 'PUT')
        // console.log(msg)
        Toast.success(msg.msg)
      }
    }
  },
  async onShow() {
    // console.log(userId)
    let msg = await $ajax('user/' + this.userId, '', 'GET')
    let info = msg.result
    this.name = info.realname
    this.IDcard = info.idcard
    this.phone = info.phone
    this.sex = info.sex
    // this.info = info.result
  }
}
</script>

<style>
.btnGroup{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
