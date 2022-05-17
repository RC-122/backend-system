<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <div style="margin-bottom: 20 px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      height="600px "
      :initialValue="form.editorText"
    />

    <div class="block">文章描述</div>
    <div style="margin-bottom: 20 px">
      <el-input
        rows="5"
        type="textarea"
        v-model="form.description"
        placeholder="请输入文章描述"
      ></el-input>
    </div>

    <Upload uploadTitle="文章头图" v-model="form.thumb" />

    <div class="block">
      <el-select v-model="form.select" placeholder="分类等级" @change="changeHandle">
        <el-option
          v-for="item in blogType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          
        ></el-option>
      </el-select>
    </div>

    <el-button
      type="primary"
      style="margin-top: 15px"
      @click="editArticleHandle"
      >确认修改</el-button
    >
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload.vue";
import { getOneBlog, editBlog } from "@/api/blog";
import * as bt from "@/api/blogType";

export default {
  components: {
    Editor,
    Upload,
  },
  data() {
    return {
      id: null,

      form: {
        title: "",
        description: "",
        thumb: "",
        editorText: "",
        select: "",
      },
      blogType: [], //存放博客分类
      imageUrl: "",
    };
  },
  created() {
    bt.getBlogType().then(({ data }) => {
      this.blogType = data;
    });
    this.id = this.$route.params.id;
    //获取数据回填
    getOneBlog(this.id).then(({ data }) => {
      this.form = data;
      this.form.select = data.category.id == null ? "" : data.category.id;
      this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
    });
  },
  methods: {
    editArticleHandle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };

      if (
        obj.title &&
        obj.description &&
        obj.htmlContent &&
        obj.markdownContent
      ) {
        editBlog({ id: this.form.id, data: obj }).then((res) => {
          this.$router.push("/blogList");
          this.$message.success("修改成功");
        });
      } else {
        this.$message.error("请完整填写内容");
      }
    },
    changeHandle() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.block {
  margin: 10px 0;
  font-weight: 100;
}
</style>