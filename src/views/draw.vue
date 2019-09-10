<template>
  <div class="container">
    <div style="height:100px"></div>
    <div class="yellow-bc" style="height: 65%;">
      <div class="guajiang-area">
        <div class="jine">
          <canvas id="canvas"></canvas>
          <div class="shuzi" style="display: block;">
            <div class="font">刮刮乐</div>
            <div class="num">{{name}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-button class="code" type="danger" plain @click="dialogVisible = true" v-if="!code">点击获取抽奖码</el-button>
    <div class="code" v-else>
      <span>抽奖码：{{code}}</span>
    </div>
    <el-dialog title="请输入手机号(不能修改)" :visible.sync="dialogVisible" width="85%" :before-close="handleClose">
      <el-input v-model="input" placeholder="请输入手机号" :type="'number'" :maxlength="11"></el-input>
      <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="getCode">确 定</el-button>
                    </span>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  import axios from 'axios';
  import {
    mcall
  } from 'q';
  export default {
    data() {
      return {
        canDraw: false,
        dialogVisible: false,
        input: "",
        code: "",
        userId: "",
        name: "无抽奖码"
      }
    },
    methods: {
      initDraw() {
        var _this = this;
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var w = canvas.parentNode.offsetWidth;
        var h = canvas.parentNode.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        /*灰色背景*/
        context.fillStyle = "#aaa";
        context.fillRect(0, 0, w, h);
        /*外框*/
        context.strokeStyle = "#fff";
        context.lineWidth = 8;
        context.strokeRect(0, 0, w, h);
        /*脸*/
        context.strokeStyle = "#b3b3b3";
        context.fillStyle = "#b3b3b3";
        context.lineWidth = 8;
        context.beginPath();
        context.arc(145, 68, 50, 0, Math.PI * 2, true);
        context.stroke();
        context.closePath();
        /*嘴巴*/
        context.beginPath();
        context.arc(145, 78, 25, 0, Math.PI, false);
        context.fill();
        context.closePath();
        /*左眼*/
        context.beginPath();
        context.arc(125, 48, 8, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        /*右眼*/
        context.beginPath();
        context.arc(165, 48, 8, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        /*写字*/
        context.fillStyle = "#828282";
        context.font = "700 37px microsoft yahei"
        context.textAlign = "center";
        context.fillText("刮我中大奖", w / 2, (h + 20) / 2);
        context.globalCompositeOperation = "destination-out";
        var offsetX = canvas.parentNode.offsetLeft;
        var offsetY = canvas.parentNode.offsetTop;
        var mousedown = false;
        canvas.addEventListener("touchstart", function(e) {
          if (!_this.canDraw) {
            return;
          }
          e.preventDefault();
          mousedown = true;
        });
        canvas.addEventListener("touchmove", function(e) {
          if (!_this.canDraw) {
            return;
          }
          e.preventDefault();
          if (mousedown) {
            if (e.changedTouches) {
              e = e.changedTouches[e.changedTouches.length - 1];
            }
            var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
            var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
            context.beginPath()
            context.arc(x, y, 10, 0, Math.PI * 2);
            context.fill();
          }
        });
        canvas.addEventListener("touchend", function(e) {
          if (!_this.canDraw) {
            return;
          }
          e.preventDefault();
          mousedown = false;
          var num = 0;
          var datas = context.getImageData(50, 25, w - 110, h - 50);
          for (var i = 0; i < datas.data.length; i++) {
            if (datas.data[i] == 0) {
              num++;
            };
          };
          if (num >= datas.data.length * 0.75) {
            // 达到面积要求时执行的内容    
            canvas.style.display = "none";
            _this.openDrawPopup()
          }
        });
        canvas.addEventListener("mousedown", function(e) {
          if (!_this.canDraw) {
            return;
          }
          e.preventDefault();
          mousedown = true;
        });
        canvas.addEventListener("mousemove", function(e) {
          if (!_this.canDraw) {
            return;
          }
          e.preventDefault();
          if (mousedown) {
            if (e.changedTouches) {
              e = e.changedTouches[e.changedTouches.length - 1];
            }
            var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
            var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
            context.beginPath()
            context.arc(x, y, 10, 0, Math.PI * 2);
            context.fill();
          }
        });
        canvas.addEventListener("mouseup", function(e) {
          if (!_this.canDraw) {
            return;
          }
          e.preventDefault();
          mousedown = false;
          var num = 0;
          var datas = context.getImageData(50, 25, w - 110, h - 50);
          for (var i = 0; i < datas.data.length; i++) {
            if (datas.data[i] == 0) {
              num++;
            };
          };
          if (num >= datas.data.length * 0.75) {
            // 达到面积要求时执行的内容    
            canvas.style.display = "none";   
            _this.openDrawPopup()
          }
        });
        var shuzi = document.getElementsByClassName("shuzi");
        shuzi[0].style.display = "block";
      },
      openDrawPopup() {
        this.$message({
          message: "你获得了：" + this.name + "!",
          type: 'success',
          center: true
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getCode() {
        var input = this.input;
        if (input.length !== 11 || isNaN(parseInt(input))) {
          this.$message({
            message: "请输入正确的手机号.",
            center: true
          });
          this.input = ""
          return;
        }
        axios.post(this.GLOBAL.basePath + '/user/register?mobile=' + this.input)
          .then(res => {
            return res.data.data.data
          }).then(data => {
            this.$ls.set("draw_data_code", data.openId);
            this.$ls.set("draw_data_user_id", data.id);
            this.code = data.openId;
            this.userId = data.id;
            this.getDrawResult().then(() => {
              this.canDraw = true;
              this.dialogVisible = false;
            })
          })
      },
      getDrawResult() {
        if (this.code && this.userId) {
          return axios.post(this.GLOBAL.basePath + '/draw/luckDraw?activityId=' + this.$route.query.id + '&userId=' + this.userId)
            .then(res => {
              return res.data.data
            }).then(data => {
              if (data.draw_code === 1) {
                this.name = data.data.name;
              } else {
                this.initDraw()
                this.name = data.data.name;
              }
            })
        }
      }
    },
    mounted() {
      // this.initDraw();
      this.code = this.$ls.get("draw_data_code")
      this.userId = this.$ls.get("draw_data_user_id")
      this.getDrawResult()
    }
  }
</script>

<style scoped='' type='text/css'>
  .guajiang-area {
    /* margin-top: 150px; */
    text-align: center;
  }
  .jine {
    position: relative;
    width: 287px;
    height: 133px;
    margin: 0 auto;
    text-align: center;
    color: #c42d2d;
    border: 8px solid grey;
    background: #fff;
  }
  #canvas {
    position: absolute;
    left: -8px;
    top: -8px;
    background: transparent;
    user-select: none;
    -webkit-user-select: none;
  }
  .jine .font {
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  .jine .num {
    margin-top: 10px;
    font-size: 50px;
    line-height: 1;
    font-weight: 700;
  }
  .jine .yuan {
    font-size: 39px;
  }
  .container {
    /* background: #fff; */
    /* height: 100%; */
  }
  .el-button.code {
    display: block;
    margin: 50px auto;
    text-align: center;
  }
  .code {
    margin: 50px auto;
    text-align: center;
    color: red;
    font-weight: 900;
  }
  .code span {
    background: rgba(255, 255, 255, .8);
    padding: 15px;
  }
</style>