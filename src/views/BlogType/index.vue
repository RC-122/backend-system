<template>
  <div class="app-container">
    <!--搜索框-->
    <el-input
      placeholder="请输入要添加的分类，左侧选择该分类的等级"
      v-model="input"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="1级" value="1"></el-option>
        <el-option label="2级" value="2"></el-option>
        <el-option label="3级" value="3"></el-option>
      </el-select>
    </el-input>
    <el-button class="elbutton" type="primary" @click="addBlogTypeHandle"
      >添加</el-button
    >
    <!--分类表格-->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column align="center" prop="ud" label="序号" width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="博客类别">
      </el-table-column>
      <el-table-column align="center" prop="articleCount" label="文章数量">
        
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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
              @click="editBlogTypeHandle(scope.row)"
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
              @click="delBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑框-->
    <el-dialog title="编辑分类信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1级" value="1"></el-option>
            <el-option label="2级" value="2"></el-option>
            <el-option label="3级" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as bt from "@/api/blogType";

export default {
  data() {
    return {
      input: "",
      select: "1",
      data: [],
      listLoading: false,
      dialogFormVisible:false,
      form:{
        name:"",
        order:"1",
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    confirmEditBlogTypeHandle(){
      bt.updateBlogType({
         id:this.form.id,
         data:this.form
      }).then(()=>{
        this.fetchData();
        this.$message.success("修改成功")
        this.dialogFormVisible = false;
      })
    },
    editBlogTypeHandle({id}) {
      bt.getOneBlogType(id).then((res)=>{
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    delBlogTypeHandle({ id }) {
      this.$confirm("该分类下的文章将变为未分类状态, 是否继续?", "是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          bt.delBlogType(id).then(() => {
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
    addBlogTypeHandle() {
      if (this.input) {
        bt.addBlogType({ name: this.input, order: this.select }).then(() => {
          this.fetchData();
          this.$message.success("成功");
        });
      } else {
        this.$message.error("名称不能为空");
      }
    },
    fetchData() {
      this.listLoading = true;
      bt.getBlogType().then((res) => {
        this.listLoading = false;
        this.data = res.data;
      });
    },
  },
};
</script>

<style>
.el-select .el-input {
  width: 100px;
}
.input-with-select {
  width: 600px;
  margin-bottom: 20px;
  background-color: #fff;
}
.elbutton {
  margin-left: 10px;
}
</style>