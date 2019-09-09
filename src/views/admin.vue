<template>
  <div class="show">
    <el-row>
      <el-col :span="4">
        抽奖活动名:
      </el-col>
      <el-col :span="12">
        <el-input v-model="name"
                  placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        一等奖数量:
      </el-col>
      <el-col :span="12">
        <el-input v-model="first"
                  placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        二等奖数量:
      </el-col>
      <el-col :span="12">
        <el-input v-model="second"
                  placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        三等奖数量:
      </el-col>
      <el-col :span="12">
        <el-input v-model="third"
                  placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        参与奖数量:
      </el-col>
      <el-col :span="12">
        <el-input v-model="join"
                  placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="8">
        <el-button type="success"
                   plain
                   :loading="isDraw"
                   @click="btnOnclick()">发起抽奖</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.show {
  width: 800px;
  height: 600px;
  margin: auto;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      basePath: this.GLOBAL.basePath,
      name: "中秋抽奖活动",
      first: "1",
      second: "2",
      third: "5",
      join: "20",
      isDraw: false
    };
  },
  methods: {
    btnOnclick() {
      var that = this;
      that.isDraw = true;
      var params = new URLSearchParams();
      params.append("name", that.name);
      params.append("first", that.first);
      params.append("second", that.second);
      params.append("third", that.third);
      params.append("join", that.join);
      axios
        .post(that.basePath + "/draw/createActivity", params)
        .then(response => {
          var id = response.data.data.id;
          var name = response.data.data.name;
          this.$router.push({ path: "/show?id=" + id });
        })
        .catch(error => {
          that.isDraw = false;
          alert("网络错误，不能访问");
        });
    },
    test() {}
  },
  name: "App"
};
</script>