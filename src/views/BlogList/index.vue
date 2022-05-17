<template>
  <div class="app-container">
    <!-- <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12"
            ><el-form-item label="中图"
              ><Upload v-model="form.midImg" /></el-form-item
          ></el-col>
          <el-col :span="12"
            ><el-form-item label="大图"
              ><Upload v-model="form.bigImg" /></el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog> -->

    <el-table :data="data" style="width: 100%" border>
      <el-table-column align="center" prop="ud" label="序号" width="180">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage +1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="title" label="文章名称" width="180">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="预览图"
            width="230"
            trigger="hover"
            ><el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              slot="reference"
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="description" label="文章描述">
      </el-table-column>
      <el-table-column align="center" prop="scanNumber" label="浏览数">
      </el-table-column>
      <el-table-column align="center" prop="commentNumber" label="评论量">
      </el-table-column>
      <el-table-column align="center" label="所属分类">
        <template slot-scope="scope">
          {{scope.row.category === null ? "未分类" : scope.row.category.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建日期">
        <template slot-scope="scope">
          {{ formatTime(scope.row.createDate) }}
        </template>
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
              @click="editBlogHandle(scope.row)"
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
              @click="delBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px"
      background
      layout="prev, pager, next,->,sizes,jumper,total"
      :page-size="eachPage"
      :page-sizes="[5, 10, 15, 20, 30]"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getDate } from "@/utils/formatDate";
import { findBlog, delBlog } from "@/api/blog";
import { server_URL, frontEnd_URL } from "@/urlConfig";

export default {
  data() {
    return {
      data: [],
      srcList: [],
      eachPage: 5, //单页显示数
      currentPage: 1, //当前页码
      totalPage: 0, //总页数
      count: 0, //总条数
      pagerCurrentPage: 1, //分页栏当前页码  ？
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    //改变单页显示数
    sizeChangeHandle(pageNumber) {
      this.eachPage = parseInt(pageNumber);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
    editBlogHandle(blogInfo){
      this.$router.push(`editBlog/${blogInfo.id}`)
    },
    delBlogHandle(blogInfo) {
      this.$confirm("文章下的评论将不会保留, 是否继续?", "是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBlog(blogInfo.id).then(() => {
            this.fetchData();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (const i of this.data) {
          // i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(data.total / this.eachPage);

        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    formatTime(timeStamp) {
      return getDate(timeStamp);
    },
  },
};
</script>

<style>
</style>