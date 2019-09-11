<template>
  <div>
    <el-input type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
    </el-input>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      textarea: ""
    };
  },
  created: function() {
    var that = this;
    axios
      .get("http://localhost/user/getMobiles")
      .then(response => {
        var obj = response.data.data;
        for (var i in obj) {
          var mobile = obj[i].mobile;
          that.textarea += mobile + "\r\n";
        }
      })
      .catch(error => {
        that.isDraw = false;
        alert("网络错误，不能访问");
      });
  }
};
</script>