<template>
  <div class="app-container">
    <el-table
      :data="data"
      style="width: 100%"
      border
      v-loading="listLoading"
      element-loading-exte="加载中"
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目名称" width="180">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="proName">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目描述">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="预览图">
        <template slot-scope="scope">
          <el-image
            style="width: 200px"
            :src="scope.row.thumb"
            fit="container"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="info"
              icon="iconfont icon-github-fill"
              circle
              size="min"
              @click="openGithub(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="min"
              @click="editProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="min"
              @click="delProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每项描述以英文逗号分隔）">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="GitHub地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="预览图地址">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditProjectHandle"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, editProject, delProject } from "@/api/project";
import { server_URL } from "@/urlConfig";
import Upload from "@/components/Upload.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      listLoading: true,
      srcList: [],
      dialogFormVisible: false,
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
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getProject().then(({ data }) => {
        this.listLoading = false;
        this.data = data;
        for (const item of this.data) {
          // item.thumb2 = server_URL + item.thumb;
          this.srcList.push(item.thumb);
        };
      });
    },

    openGithub(projectInfo) {
      window.open(projectInfo.github);
    },
    delProjectHandle(projectInfo) {
      this.$confirm("确定删除该项目？?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(projectInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editProjectHandle(projectInfo) {
      this.dialogFormVisible = true;
      this.form = {...projectInfo, description:projectInfo.description.toString()};

    },
    // 确认修改
    confirmEditProjectHandle() {
      let obj = {...this.form};
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order); 

      editProject(obj.id, obj).then(()=>{
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功")
      })
    },
  },
};
</script>

<style>
.proName:hover {
  color: rgb(163, 163, 163);
}
</style>