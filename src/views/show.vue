<template>
  <div class="show">
    <div class="qrcode" ref="qrcodeContainer">扫我抽奖！</div>
    <div class="qr"></div>
    <div class="text">奖品信息</div>
  </div>
</template>

<style>
.text{
  font-size: 40px;
  position: absolute;
  text-align: left;
  width: 40%;
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
    background-color: rgba(255,255,255,.8);
  }
  .show {
    position: absolute;
    left: 55%;
    /* right: 0; */
    /* margin: 25px auto; */
    height: 400px;
    width: 400px;
  }
  .qr {
    width: 300px;
    height: 300px;
    background: #fff;
    margin: 0 50px 50px;
  }
  .qrcode {
    color: gold;
    font-size: 20px;
    text-align: center;
    line-height: 46px;
  }
</style>

<script>
  import axios from "axios";
  import {
    setInterval
  } from 'timers';
  export default {
    created: function() {},
    data() {
      return {
        popList: []
      };
    },
    mounted() {
      this.popList.push(this.$notify.success({
        title: '#7323',
        message: '手机号143*****13，获得了一等奖',
        position: 'bottom-left',
        duration: 0,
        showClose: false
      }));
      setInterval(() => {
        if (this.popList.length > 3) {
          this.popList.shift().close();
        }
        this.popList.push(this.$notify.success({
          title: '#7323',
          message: '手机号143*****13，获得了一等奖',
          position: 'bottom-left',
          duration: 0,
          showClose: false,
        }));
      }, 3000);
  },
  methods: {
    },
    name: "App"
  };
</script>
