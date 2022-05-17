<template>
  <div class="app-container">
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
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
    </el-dialog>

    <el-table :data="data" style="width: 100%" border>
      <el-table-column align="center" prop="ud" label="序号" width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column align="center" prop="description" label="描述">
      </el-table-column>
      <el-table-column align="center" label="中图预览">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg"
            fit="container"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大图预览">
        <template slot-scope="scope">
          <el-image
            style="width: 125px"
            :src="scope.row.bigImg"
            fit="container"
          ></el-image>
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
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBanners, setBanner } from "@/api/banner";
import {server_URL} from "@/urlConfig.js";
import Upload from "@/components/Upload.vue";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      getBanners().then((res) => {
        this.data = res.data;
        // for (const item of this.data) {
        //   item.midImg2 = server_URL + item.midImg;
        //   item.bigImg2 = server_URL + item.bigImg;
        // }
      });
    },
    editBannerHandle(bannerInfo) {
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form;
        }
      }
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.fetchData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>