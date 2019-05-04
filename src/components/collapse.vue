<template>
  <div class="collapse">
    <van-collapse :value="info.activeNames" @change="changeCollapse">
      <van-collapse-item :title="info.title" name="1" :icon="info.icon">
        <div class="centerGroup">
          <div class="item item3" v-for="(index, key) in info.iconName" :key="key" @click="toInfo(key)">
            <van-icon :name="index" :size="size" :color="color"/>
            <p>{{info.operat[key]}}</p>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      activeNames: ['1'],
      color: '#f56aa5',
      size:"40px"
    }
  },

  created() {
    // console.log(this.info.activeNames)
  },
  methods: {
    changeCollapse(e) {
      this.info.activeNames = e.mp.detail
    },
    toInfo(i) {
      wx.navigateTo({
        url: `${this.info.url[i]}`
      })
    }
  },
}
</script>

<style>
.centerGroup{
  height: 50px;
  display: flex;
}
.item{
  flex: 1;
  text-align: center;
}

</style>
