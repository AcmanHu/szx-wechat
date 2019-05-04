<template>
  <div class="myinfo">
    <van-row custom-class="vanrow">
      <van-col span="6" custom-class="vancol">
        <div class="userAvatarUrl">
          <open-data type="userAvatarUrl"></open-data>
        </div>
      </van-col>
      <van-col span="18" custom-class="vancol">
        <div class="name">
          <p><open-data type="userNickName"></open-data></p> 
          <van-tag type="danger">未认证</van-tag>
          <div class="registerBtn">
            <van-button plain hairline type="default" size="small">认证商户</van-button>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  // props: ['info'],

  created() {

  },
  methods: {

  },
}
</script>

<style scoped>
.myinfo{
  height: 90px;
  background: #f56aa5;
  color: white;
}
.vanrow{
  height: 100%;
  font-size: 16px;
}
.vancol{
  height: 100%;
}
.vancol .userAvatarUrl{
  height: 80px;
  width: 80px;
  margin: 5px auto;
  overflow: hidden;
  border-radius: 50%;
}
.name{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 20px;
}
.vanrow .imgcol{
  text-align: center;
}
.registerBtn{
  text-align: right;
  padding: 0 10px;
}
</style>
