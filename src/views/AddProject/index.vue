<template>
  <div class="app-container">
    <div class="block">项目名称</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
    </div>
    <div class="block">项目描述（每项描述以英文逗号分隔）</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.description"
        placeholder="请输入项目描述（每项描述以英文逗号分隔）"
      ></el-input>
    </div>
    <div class="block">项目链接</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
    </div>
    <div class="block">Github</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.github" placeholder="请输入Github地址"></el-input>
    </div>
    <div style="margin-bottom: 15px">
      <Upload uploadTitle="预览图" v-model="form.thumb" />
    </div>
    <div class="block">项目等级</div>
    <div style="margin-bottom: 15px">
      <el-select v-model="form.order" placeholder="分类等级">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>

    <el-button type="primary" @click="addProjectHandle">发布项目</el-button>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import { addProject } from "@/api/project";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  methods: {
    addProjectHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order);
      addProject(obj).then(()=>{
        this.$router.push("/projectList");
        this.$message.success("项目添加成功")
      })
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>