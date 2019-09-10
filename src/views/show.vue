<template>
  <div class="show">
    <div class="qrcode"
         id="qrcode"
         ref="qrcode">扫我抽奖！</div>
    <div class="text">
      <template>
        <el-carousel :interval="4000"
                     type="card"
                     height="200px">
          <el-carousel-item v-for="item in 6"
                            :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>
  </div>
</template>
<style>
.text {
  font-size: 40px;
  position: absolute;
  text-align: left;
  width: 70%;
  color: #fff;
  color: red;
}
.el-notification__title {
  font-size: 39px;
}
.el-notification__content {
  font-size: 28px;
  line-height: 1.1;
}
.el-notification.left {
  /* right: 16px; */
  left: 30px;
  /* right: 0; */
  width: 40%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
.show {
  position: absolute;
  left: 55%;
  /* right: 0; */
  /* margin: 25px auto; */
  height: 400px;
  width: 400px;
}
.qrcode {
  width: 300px;
  height: 300px;

  margin: 0 50px 50px;
}
</style>

<script>
import axios from "axios";
import { setInterval } from "timers";
import QRCode from "qrcodejs2";
export default {
  created: function() {
    var that = this;
    var id = this.$route.query.id;
    that.$nextTick(() => {
      that.qrcode(that.basePath + "/draw?id=" + id);
    });

    window.setInterval(() => {
      setTimeout(fun, 0);
    }, 30000);
  },
  data() {
    return {
      basePath: this.GLOBAL.basePath,
      popList: []
    };
  },
  mounted() {
    this.popList.push(
      this.$notify.success({
        title: "#7323",
        message: "手机号143*****13，获得了一等奖",
        position: "bottom-left",
        duration: 0,
        showClose: false
      })
    );
    setInterval(() => {
      if (this.popList.length > 3) {
        this.popList.shift().close();
      }
      this.popList.push(
        this.$notify.success({
          title: "#7323",
          message: "手机号143*****13，获得了一等奖",
          position: "bottom-left",
          duration: 0,
          showClose: false
        })
      );
    }, 3000);
  },
  methods: {
    qrcode(url) {
      /* eslint-disable */
      let qrcode = new QRCode("qrcode", {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: url // 设置二维码内容或跳转地址
      });
    }
  },
  name: "App"
};
</script>
