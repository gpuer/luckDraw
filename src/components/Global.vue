<script>
const basePath = "http://localhost";
export default {
  basePath,
  successMsg(that, title) {
    that.$message({
      message: title,
      type: "success"
    });
  },
  errorMsg(title) {
    that.$message.error(title);
  },
  timestampToTime(cjsj) {
    var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }
};
</script>