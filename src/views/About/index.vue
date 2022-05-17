<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input v-model="url" placeholder="请输入链接" :disabled="isDisable">
    </el-input>
    <el-button type="primary" style="margin-top: 15px" @click="switchHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about";
export default {
  data() {
    return {
      url: "",
      isDisable: true,
      btnContent: "编辑",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data;
      });
    },
    switchHandle() {
      if (this.isDisable) {
        this.isDisable = false;
        this.btnContent = "完成";
      }else{
        if(this.url){
          setAbout({url:this.url}).then((res)=>{
            this.$message.success("编辑成功");
          }).catch(()=>{
            this.$message.error("编辑失败");
          })
          this.isDisable = true;
          this.btnContent = "编辑";
        }else{
          this.$message.info("请输入链接")
        }
      }

      
    },
  },
};
</script>

<style>
.block {
  font-weight: 100;
  margin: 15px 0;
}
</style>