<template>
  <div class="app-container">
    <el-table
      :v-loading="listLoading"
      :data="data"
      element-loading-text="加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="头像" width="80">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            size="small"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称" width="150">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="评论文章" width="150">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论日期" width="230">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-paddign fixed-width"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="delCommentHandle(scope.row)"
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
import { delComment, getComment } from "@/api/comment";
import { formatTime } from "@/utils";

export default {
  data() {
    return {
      listLoading: false,
      eachPage: 10,
      currentPage: 1,
      count: 10,
      totalPage: 0,
      data: [],
      pagerCurrentPage: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getComment(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (const item of this.data) {
          item.createDate = formatTime(item.createDate);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.total / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    delCommentHandle({ id }) {
      this.$confirm("是否删除此评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delComment(id).then(() => {
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
    
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
    currentChangeHandle(pageNumber) {
      this.currentPage = ~~pageNumber;
      this.fetchData();
    },
    //改变单页显示数
    sizeChangeHandle(pagerNum) {
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.eachPage = ~~pagerNum;
      this.fetchData();
    },
  },
};
</script>

<style>
</style>