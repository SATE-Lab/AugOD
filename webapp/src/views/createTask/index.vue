<template>
  <div class="app-container">
    <el-form label-position="left" ref="form" :model="form" label-width="130px">
      <el-form-item label="Select dataset" >
          <el-select v-model="form.filename"  @change="genTaskname">
    <el-option
      v-for="item in filenames"
      :value=item>
    </el-option>
  </el-select>
      </el-form-item>

      <el-form-item label="Task name">
        <el-input v-model="form.taskname" style="width: 400px" ></el-input>
      </el-form-item>

      <el-form-item label="information">
        <el-input v-model="form.desc" :rows="2" style="width: 800px" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="Output multiple">
       <div class="output_number" >
         <el-select style="width: 85px; margin-left: 10px; margin-right: 10px" v-model="form.multiple" >
    <el-option
      v-for="item in multipleList"
      :value=item>
    </el-option>
         </el-select>
       </div>
      </el-form-item>

      <el-form-item label="Extend methods">
        <div class="block">
<!--  <span class="demonstration">默认显示所有Tag&emsp;</span>-->
  <el-cascader
    style="width: 400px"
    placeholder="扩增方法（可多选）"
    :show-all-levels="false"
    :options="options"
    :props="props"
    @change="handleChange"
    ref="cascader"
    clearable></el-cascader>
</div>
      </el-form-item>

      <el-form-item v-if="form.methodList.length!=0" label="params">
        <el-form-item class="method_atr" v-if="form.methodList.findIndex(item => item===11)!=-1" label="对象插入">
          <div>
          <div>
          <span style="font-weight: 400; margin-left: 25px">执行概率 </span>
          <el-input-number v-model="form.insertAtr[0]" size="small" style="margin-left: 10px; margin-right: 10px" controls-position="right" :min="0" :max="1" :step="0.1"></el-input-number>

          <span style="font-weight: 400; margin-left: 60px">插入对象数量 </span>
          <el-input-number v-model="form.insertAtr[1]" size="small" style="margin-left: 10px; margin-right: 10px" controls-position="right" :min="1" :max="10"></el-input-number>
          <span style="font-weight: 400; margin-left: 2px">(个)</span>
          </div>

          <div style="margin-top: 20px">
          <span>插入对象偏好</span>
            <el-select size="small" style="width: 130px; margin-left: 10px; margin-right: 10px" v-model="form.insertAtr[2]"  placeholder="随机">
              <el-option
                v-for="item in obj_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option></el-select>

          <span style="font-weight: 400; margin-left: 60px">插入位置偏好 </span>
          <el-select size="small" style="width: 200px; margin-left: 10px; margin-right: 10px" v-model="form.insertAtr[3]"  placeholder="随机">
              <el-option
                v-for="item in poz_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option></el-select>
          </div>
          </div>
      </el-form-item>

        <el-form-item class="method_atr" v-if="form.methodList.findIndex(item => item===12)!=-1" label="对象删除">
       <div>
          <span style="font-weight: 400; margin-left: 25px">执行概率 </span>
          <el-input-number v-model="form.removeAtr[0]" size="small" style="margin-left: 10px; margin-right: 10px" controls-position="right" :min="0" :max="1" :step="0.1"></el-input-number>

          <span style="font-weight: 400; margin-left: 60px">删除对象数量 </span>
          <el-select size="small" style="width: 85px; margin-left: 10px; margin-right: 10px" v-model="form.removeAtr[1]">
            <el-option key=1 label="1" :value=1 />
            <el-option key=2 label="多" :value=2 /></el-select>
         <span style="font-weight: 400; margin-left: 2px">(个)</span>
          </div>
      </el-form-item>

        <el-form-item class="method_atr" v-if="form.methodList.findIndex(item => item===13)!=-1" label="对象替换">
       <div>
          <div>
          <span style="font-weight: 400; margin-left: 25px">执行概率 </span>
          <el-input-number v-model="form.replaceAtr[0]" size="small" style="margin-left: 10px; margin-right: 10px" controls-position="right" :min="0" :max="1" :step="0.1"></el-input-number>

          <span style="font-weight: 400; margin-left: 60px">替换对象数量 </span>
          <el-select size="small" style="width: 85px; margin-left: 10px; margin-right: 10px" v-model="form.replaceAtr[1]">
            <el-option key=1 label="1" :value=1 />
            <el-option key=2 label="多" :value=2 /></el-select>
         <span style="font-weight: 400; margin-left: 2px">(个)</span>
          </div>

          <div style="margin-top: 20px">
          <span>替换对象偏好</span>
            <el-select size="small" style="width: 130px; margin-left: 10px; margin-right: 10px" v-model="form.insertAtr[2]"  placeholder="随机">
              <el-option
                v-for="item in obj_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option></el-select>

          </div>
          </div>
      </el-form-item>
      </el-form-item>

      <el-form-item style="margin-top: 50px">
        <el-button style="width: 100px; margin-left: 200px" type="primary" @click="onSubmit">submit</el-button>
        <el-button style="width: 100px; margin-left: 50px" @click="onCancel">cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getNames, createTask } from '@/api/task.js'


export default {
  data() {
    return {
      form: {
        filename: '',
        taskname: '',
        desc: '',
        multiple: '2',
        methodList: [],
        insertAtr: [1, 1, 1, 1],
        removeAtr: [1, 2],
        replaceAtr: [1, 2, 1]
      },

      filenames: [],
      multipleList: [2, 5, 10, 20],
      timeout: null,
      props: { multiple: true },
      options: [{
          value: 1,
          label: '通用规则扩增',
          children: [
              { value: 2, label: '翻转' },
              { value: 3, label: '旋转' },
              { value: 4, label: '倾斜变换' },
              { value: 5, label: '弹性变换' },
            { value: 6, label: '高斯畸变' },
            { value: 7, label: '光学失真' },
            { value: 8, label: '随机裁剪' },
            { value: 9, label: '中心裁剪' }
            ]
          },
        {
            value: 10,
            label: '基于对象扩增',
            children: [
              { value: 11, label: '对象插入' },
              { value: 12, label: '对象删除' },
              { value: 13, label: '对象替换' }
            ]
          },],
      obj_options: [{
          value: 1,
          label: '随机'
        }, {
          value: 2,
          label: '人像'
        }, {
          value: 3,
          label: '动物'
        }, {
          value: 4,
          label: '静物'
        }, {
          value: 5,
          label: '风景'
        }],
      poz_options: [{
          value: 1,
          label: '随机'
        }, {
          value: 2,
          label: '图片左上角'
        }, {
          value: 3,
          label: '图片右上角'
        }, {
          value: 4,
          label: '图片左下角'
        }, {
          value: 5,
          label: '图片右下角'
        }]
    }},

  methods: {
    onSubmit() {
      const fd = new FormData();
      for (let key in this.form) {
        fd.append(key, this.form[key]);
      }
      createTask(fd).then(res => {
        console.log(res)
        this.$message({
          message: 'Success!',
          type: 'success'
        })

      }).catch(err => {
        console.log('error')
        console.log(err)
      })
    },
    onCancel() {
      this.$message({
        message: '取消操作',
        type: 'warning'
      })
    },
    fetchData() {
      const arr = this
      getNames().then(response => {
        arr.filenames = response.data.filenames
      }).catch(err => {
        console.log(err)
      })
    },
    handleChange(value) {
      let methods = []
      for (let i = 0; i < value.length; i++) {
        const method = value[i]
        if (method instanceof Array) {
          methods = methods.concat(method)
        }
      }
      this.form.methodList = methods
      console.log(this.form.methodList)
    },
    getFileName() {
      if (this.$route.query.filename) {
        this.form.filename = this.$route.query.filename
      }
    },
  },
  created() {
    this.fetchData()
    this.getFileName()
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
.method_atr{
  padding-bottom: 50px;
}
</style>

