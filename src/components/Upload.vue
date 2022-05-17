<template>
  <div>
    <div class="block">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
  <!--  :before-upload="beforeAvatarUpload" -->
</template>

<script>
import {server_URL} from "@/urlConfig.js";
export default {
  props: ["uploadTitle", "value"], 
  computed: {
    imgUrl() {
      if (this.value) {
        return this.value;
      }
    },
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods:{
    handleAvatarSuccess(res){
      if(!res.code&&res.data){
        //上传成功返回信息
        this.$emit("input",res.data)
      }
    }
  }
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {

  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
    border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  display: block;
}
</style>