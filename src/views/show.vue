<template>
  <div class="show">
    <div class="qrcode"
         ref="qrcodeContainer">扫我抽奖！</div>
  </div>
</template>
<style>
.show {
  height: 762px;
  width: 1080px;
  background: url("http://localhost/images/bj.jpg");
}
.qrcode {
  color: gold;
  font-size: 20px;

  height: 100px;
  width: 100px;
  margin: 0 auto;
}
</style>
<script>
import axios from "axios";
import QRCode from "qrcodejs2";
export default {
  created: function() {},
  data() {
    return {
      basePath: this.GLOBAL.basePath,
      activityId: 0
    };
  },
  mounted() {
    document.querySelector("html").style.height = "100%";
    document.querySelector("body").style.height = "100%";
    var id = this.$route.query.id;
    this.activityId = id;
    this.showQRCode();
  },
  methods: {
    showQRCode() {
      var qrcode = new QRCode(this.$refs.qrcodeContainer, {
        //text: "http://e111310a.ngrok.io?id=" + this.activityId,
        text: "http://192.168.2.212:8080/admin",
        width: 110,
        height: 110,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  name: "App"
};
</script>
