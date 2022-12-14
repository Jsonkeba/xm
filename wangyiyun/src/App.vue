<template>
  <div>
    <button @click="onSubmit">1111</button>
    <button @click="onSubmit2">2222</button>
    <!-- <div v-for="(item,index) in img" :key="index">
      <img :src="item.pic" alt="">
    </div> -->
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in img" :key="index">
          <img :src="item.pic" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { sent, banner } from "/api/login";
export default {
  data() {
    return {
      img: [],
    };
  },
  methods: {
    onSubmit() {
      let params = {
        type: 1,
      };
      banner(params).then((res) => {
        if (res.code == 200) {
          this.img = res.banners;
          console.log("数据", this.img);
        }
      });
    },
    onSubmit2() {
      let params = {
        phone: 17762708641,
      };
      sent(params).then((res) => {
        if (res.code == 200) {
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
