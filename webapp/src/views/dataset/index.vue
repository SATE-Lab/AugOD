<template>
  <div class="app-container">
    <el-table
      stripe
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column label="Name"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.filename }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Type" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>

      <el-table-column label="File size" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.filesize }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Upload Time" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="Operation" width="320">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">Download</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">Delete</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">Rename</el-button>
        <el-button v-if="scope.row.category=='Picture'" type="text" size="small"><router-link :to="`/handlePic/index?filename=`+scope.row.filename">Create task</router-link></el-button>
        <el-button v-if="scope.row.category=='Dataset'" type="text" size="small"><router-link :to="`/createTask/index?filename=`+scope.row.filename">Create task</router-link></el-button>
<!--        <el-button type="text" size="small">编辑</el-button>-->
      </template>
    </el-table-column>
    </el-table>

<!--    <div class="block" style="float: right">-->
<!--      <el-pagination-->
<!--        :current-page="this.page"-->
<!--        :page-sizes="[10, 50, 100, 200]"-->
<!--        :page-size="this.offset"-->
<!--        layout="total, sizes, prev, pager, next, jumper"-->
<!--        :total="this.totalNum"-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {

  data() {
    return {
      page: 1,
      offset: 10,
      totalNum: 1000,
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {
        page: this.page,
        offset: this.offset
      }
      const arr = this
      this.listLoading = true
      getList(params).then(response => {
        arr.list = response.data
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    }

    // handleSizeChange(val) {
    //   this.offset = val
    // },
    //
    // handleCurrentChange(val) {
    //   this.page = val
    //   this.fetchData()
    // }
  }
}
</script>

