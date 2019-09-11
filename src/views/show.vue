<template>
  <div class="show">
    <div class="qrcode"
         id="qrcode"
         ref="qrcode">扫我抽奖！</div>
    <div class="text">
      <template>
        <el-carousel :interval="4000"
                     :indicator-position="'none'"
                     height="700px">
          <el-carousel-item class="class_card"
                            v-for="item in 5"
                            :key="item">
            <div class="jp_frame">
              <div :class="'jp_'+item"></div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>
  </div>
</template>

<style>
.jp_frame {
  height: 100%;
}
.jp_1 {
  height: 100%;
  background-image: url("../assets/jp_1.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.jp_2 {
  height: 100%;
  background-image: url("../assets/jp_2.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.jp_3 {
  height: 100%;
  background-image: url("../assets/jp_3.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.jp_4 {
  height: 100%;
  background-image: url("../assets/jp_4.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.jp_5 {
  height: 100%;
  background-image: url("../assets/jp_5.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.text {
  width: 1000px;
  font-size: 40px;
  position: absolute;
  text-align: left;
  left: -100px;
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
.el-notification__title {
  font-size: 25px;
  font-weight: 0;
}
.el-notification__icon {
  line-height: 35px;
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
import { setInterval, setTimeout } from "timers";
import QRCode from "qrcodejs2";
export default {
  created: function() {
    var that = this;
    var id = this.$route.query.id;
    that.$nextTick(() => {
      that.qrcode(that.basePath + "/index.html#/draw?id=" + id);
    });
    window.setInterval(() => {
      setTimeout(fun, 0);
    }, 30000);
  },
  data() {
    return {
      basePath: this.GLOBAL.basePath,
      popList: [],
      list: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .post(
          this.basePath + "/draw/getDraws?activityId=" + this.$route.query.id
        )
        .then(res => {
          return res.data.data;
        })
        .then(list => {
          var interval = setInterval(() => {
            var item = list.shift();
            if (this.popList.length > 5) {
              this.popList.shift().close();
            }
            if (item) {
              this.popList.push(
                this.$notify.success({
                  title:
                    "手机号：" +
                    item["mobile"].slice(0, 3) +
                    "*****" +
                    item["mobile"].slice(-4),
                  message: "恭喜您！获得了" + item["name"] + "!",
                  position: "bottom-left",
                  duration: 0,
                  showClose: false
                })
              );
            } else {
              clearInterval(interval);
              setTimeout(() => {
                this.getData();
              }, 3000);
            }
          }, 3000);
        });
    },
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
