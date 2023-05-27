<template>
  <div class="app-container">
    <el-table
      stripe
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
    >
      <el-table-column label="Task name" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Type" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>

      <el-table-column label="File size" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.filesize}}</span>
        </template>
      </el-table-column>

      <el-table-column label="State" width="110" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state===0" type="text" size="mini" :loading="true">Processing</el-button>
          <el-tag v-if="scope.row.state===1" type="success" >Completed</el-tag>
        </template>
      </el-table-column>

<!--      <el-table-column label="任务描述信息"  align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.desc }}-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column align="center" prop="created_at" label="Start time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Completion time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.completionTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="Operation" >
      <template slot-scope="scope">
        <el-button type="text" size="small" :disabled="scope.row.state===1  ?  false : true"><a :href="'https://obj-extend.oss-cn-nanjing.aliyuncs.com/zip/'+scope.row.taskname+'.zip'" target="_blank">Download</a></el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="scope.row.state===1  ?  false : true">Preview</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="scope.row.state===1  ?  false : true">Delete</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="scope.row.state===1  ?  false : true">Rename</el-button>
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
    <el-drawer
  title='Picture preview'
  size="90%"
  :visible.sync="drawer"
  :direction="direction">
      <div style="height: 800px;text-align: center;">
        <span style="color:#909399; font-weight: 600; margin-right: 30px ">Select the picture </span>
      <el-select v-model="select_pic" placeholder="Please select" @change="changeUrl()" style="width:250px">
    <el-option
      v-for="item in picnames"
      :key=item
      :value=item>
    </el-option>
  </el-select>
        <div style="margin-top:25px; text-align: center;"><img :src="picUrl" width="30%" class="image"></div>
        </div>

</el-drawer>

  </div>


</template>

<script>
import { getTask } from '@/api/table'
import {getPicNames} from "@/api/task";

export default {

  data() {
    return {
      totalNum: 1000,
      list: [],
      listLoading: false,
      drawer: false,
      direction: 'btt',
      taskname: '',
      picnames: [],
      select_pic: '',
      picUrl: ''
    }
  },
  methods: {
    changeUrl(){
      this.picUrl = 'https://obj-extend.oss-cn-nanjing.aliyuncs.com/'+this.taskname+'/images/'+this.select_pic
    },
    fetchData() {
      const arr = this
      this.listLoading = true
      getTask().then(response => {
        arr.list = response.data
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },

    getPicNames(){
      const param = {taskname: this.taskname}
        getPicNames(param).then(response => {
        this.picnames = response.data.picnames
      }).catch(err => {
        console.log(err)
      })
    },

    handleClick(row){
      this.drawer= true
      this.taskname = row.taskname
      this.getPicNames()
},
    // download(filename, path) {
    //   const params = {
    //     filename: filename
    //   }
    //   this.$confirm("是否确认下载?", "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(getFile(params)).then(response => {
    //     console.log(response.data)
    //     let blob = new Blob([response.data], {type: 'application/zip'})
    //       const url = window.URL.createObjectURL(blob)
    //       const link = document.createElement('a') // 创建a标签
    //       link.href = url
    //       link.download = filename // 重命名文件
    //       link.click()
    //       window.URL.revokeObjectURL(url) // 释放内存
    //     });
    // },

    // handleSizeChange(val) {
    //   this.offset = val
    // },
    //
    // handleCurrentChange(val) {
    //   this.page = val
    //   this.fetchData()
    // }
  },
  created() {
     this.fetchData()
      setInterval(() => {
      setTimeout(() => {
        this.fetchData()
      }, 0);
    }, 1000); //一天
  },
}
</script>

