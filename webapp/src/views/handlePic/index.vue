<template>
  <div class="app-container">
    <el-form label-position="left" ref="form" :model="form" label-width="130px">
      <el-form-item label="Select picture" >
        <span >
          <el-select style="vertical-align: middle" v-model="form.filename" placeholder="" @change="fileChange">
    <el-option
      v-for="item in filenames"
      :value=item>
    </el-option>
  </el-select>
        </span>
        <span style="vertical-align:top; margin-left: 40px">
         <el-empty>
           <img :src="picUrl" alt="selected picture" width="320px"/>
         </el-empty>
        </span>
      </el-form-item>

            <el-form-item label="Task name">
        <el-input v-model="form.taskname" style="width: 400px" placeholder="Task name"></el-input>
      </el-form-item>


      <el-form-item label="Methods">
        <el-checkbox-group v-model="form.methodList">
          <el-checkbox label=1 border>{{"Object insert"}}</el-checkbox>
          <el-checkbox label=2 border>{{"Object remove"}}</el-checkbox>
          <el-checkbox label=3 border>{{"Object replace"}}</el-checkbox>
  </el-checkbox-group>
      </el-form-item>
<!--      <el-form-item label="任务描述">-->
<!--        <el-input v-model="form.desc" :rows="2" style="width: 800px" type="textarea"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="输出数量倍数">-->
<!--       <div class="output_number" ><span>输出文件数量</span>-->
<!--         <el-select style="width: 85px; margin-left: 10px; margin-right: 10px" v-model="form.multiple" >-->
<!--    <el-option-->
<!--      v-for="item in multipleList"-->
<!--      :value=item>-->
<!--    </el-option>-->
<!--         </el-select>-->
<!--         <span>倍</span>-->
<!--       </div>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="添加扩增方法">-->
<!--        <div class="block">-->
<!--&lt;!&ndash;  <span class="demonstration">默认显示所有Tag&emsp;</span>&ndash;&gt;-->
<!--  <el-cascader-->
<!--    style="width: 400px"-->
<!--    placeholder="扩增方法（可多选）"-->
<!--    :show-all-levels="false"-->
<!--    :options="options"-->
<!--    :props="props"-->
<!--    @change="handleChange"-->
<!--    ref="cascader"-->
<!--    clearable></el-cascader>-->
<!--</div>-->
<!--      </el-form-item>-->

      <el-form-item label="Params" v-if="form.methodList!=[]">
        <el-form-item class="method_atr" v-if="form.methodList.findIndex(item => item==='1')!=-1"  label="Object insert">
          <div>
          <el-row>
            <el-col :span="8" :offset="0">
          <span style="font-weight: 400">Generated number </span>
          <el-input-number v-model="form.insertAtr[0]" size="small" style="margin-left: 10px" controls-position="right" :min="1"  :step="1"></el-input-number>
            </el-col>
              <el-col :span="11" :offset="1">
            <span style="font-weight: 400">Inserted objects </span>
          <el-input-number v-model="form.insertAtr[1]" size="small" style=" margin-left: 10px" controls-position="right" :min="1" :max="10"></el-input-number>
            </el-col>
          </el-row>

          <el-row style="margin-top: 12px">
            <el-col :span="8" :offset="0">
          <span>Category preference</span>
            <el-select size="small" style="width: 130px; margin-left: 10px; margin-right: 10px" v-model="form.insertAtr[2]"  placeholder="随机">
              <el-option
                v-for="item in obj_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option></el-select>
            </el-col>
            <el-col :span="11" :offset="1">
          <span style="font-weight: 400">Location preference</span>
          <el-select size="small" style="width: 130px; margin-left: 10px; margin-right: 10px" v-model="form.insertAtr[3]"  placeholder="随机">
              <el-option
                v-for="item in poz_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option></el-select>
            </el-col>
          </el-row>
            <el-row style="margin-top: 12px">
              <span style="font-weight: 400">Resize rate </span>
              <el-radio-group style="margin-left: 48px" v-model=form.insertAtr[4] size="small">
      <el-radio-button :label=0.02 >small</el-radio-button>
      <el-radio-button :label=0.05 >medium</el-radio-button>
      <el-radio-button :label=0.15 >large</el-radio-button>
    </el-radio-group>
            </el-row>
          </div>
      </el-form-item>

        <el-form-item class="method_atr" v-if="form.methodList.findIndex(item => item==='2')!=-1" label="Object remove">
       <el-row>
            <el-col :span="8" :offset="0">
          <span style="font-weight: 400">Generated number </span>
          <el-input-number v-model="form.removeAtr[0]" size="small" style="margin-left: 10px; margin-right: 10px" controls-position="right" :min="1"  :step="1"></el-input-number>
            </el-col>
         <el-col :span=11 :offset="1">
          <span style="font-weight: 400">Deleted object</span>
          <span style="width: 100px; margin-left: 26px; margin-right: 10px">
                  <el-switch v-model="form.removeAtr[1]"  inactive-value=0 inactive-text="one" active-value=1 active-text="multiple"></el-switch>
                </span>
         </el-col>
       </el-row>
      </el-form-item>

        <el-form-item class="method_atr" v-if="form.methodList.findIndex(item => item==='3')!=-1" label="Object replace">
          <div>
            <el-row>
            <el-col :span="8" :offset="0">
          <span style="font-weight: 400">Generated number </span>
          <el-input-number v-model="form.replaceAtr[0]" size="small" style="margin-left: 10px; margin-right: 10px" controls-position="right" :min="1" :step="1"></el-input-number>
            </el-col>
              <el-col :span="11" :offset="1">
          <span style="font-weight: 400">Replaced object </span>
                <span style="width: 100px; margin-left: 10px; margin-right: 10px">
                  <el-switch v-model="form.replaceAtr[1]"  inactive-value=0 inactive-text="one" active-value=1 active-text="multiple"></el-switch>
                </span>
              </el-col>
            </el-row>
          <el-row style="margin-top: 12px">
            <el-col :span="8" :offset="0">
          <span>Category preference </span>
            <el-select size="small" style="width: 130px; margin-left: 10px; margin-right: 10px" v-model="form.replaceAtr[2]"  placeholder="Random">
              <el-option
                v-for="item in obj_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option></el-select>
            </el-col>
          </el-row>
          </div>
      </el-form-item>
      </el-form-item>

      <el-form-item style="margin-top: -30px">
        <el-button style="width: 100px; margin-left: 300px" type="primary" @click="onSubmit">Submit</el-button>
        <el-button  style="width: 100px; margin-left: 50px" @click="onCancel">Cancel</el-button>
<!--        <el-button  v-if="getRes==true" style="width: 100px; margin-left: 350px" type="primary"><a href="https://obj-extend.oss-cn-nanjing.aliyuncs.com/zip/000000000139.zip" target="_blank">下载结果</a></el-button>-->
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import { getNames, handlePic, getRawPic } from '@/api/task.js'
import {Message} from "element-ui";


export default {
  data() {
    return {
      form: {
        filename: '',
        taskname: '',
        methodList: [],
        insertAtr: [1, 1, 1, 1, 0.05],
        removeAtr: [1, 0],
        replaceAtr: [1, 0, 1]
      },
      loading: false,
      picUrl: "",
      insertUrl: "",
      removeUrl: "",
      replaceUrl: "",
      filenames: [],
      multipleList: [2, 5, 10, 20],
      timeout: null,
      props: { multiple: true },
      getRes: false,
      obj_options: [{
          value: 1,
          label: 'Random'
        }, {
          value: 2,
          label: 'People'
        }, {
          value: 3,
          label: 'Animal'
        }, {
          value: 4,
          label: 'Still life'
        }, {
          value: 5,
          label: 'Traffic'
        },{
          value: 6,
          label: 'Food'
        }],
      poz_options: [{
          value: 1,
          label: 'Random'
        }, {
          value: 2,
          label: 'Top half'
        }, {
          value: 3,
          label: 'Bottom half'
        }, {
          value: 4,
          label: 'Left half'
        }, {
          value: 5,
          label: 'Right half'
        }]
    }},

  methods: {
    onSubmit() {
      const fd = new FormData();
      for (let key in this.form) {
        fd.append(key, this.form[key]);
      }
      handlePic(fd).then(res => {
        this.$message({
          message: 'Submit success!',
          type: 'success'
        })
        // this.insertUrl = 'https://obj-extend.oss-cn-nanjing.aliyuncs.com/'+this.form.filename+'/images/'+this.form.filename+'_insert.png'
        //   this.removeUrl = 'https://obj-extend.oss-cn-nanjing.aliyuncs.com/'+this.form.filename+'/images/'+this.form.filename+'_mask.png'
        //     this.replaceUrl =  'https://obj-extend.oss-cn-nanjing.aliyuncs.com/'+this.form.filename+'/images/'+this.form.filename+'_replace.png'

      }).catch(err => {
        console.log('error')
        console.log(err)
      })
    },
    onCancel() {
      this.$message({
        message: 'Cancel',
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
    fileList() {
      if (this.$route.query.filename) {
        this.form.filename = this.$route.query.filename
      }
    },
    fileChange(){
     const param = {filename: this.form.filename}
      getRawPic(param).then(response => {
        this.picUrl = "data:image/jpeg;base64," + this.arrayBufferToBase64(response);
      }).catch(err => {
        Message({
        message: 'Not picture',
        type: 'error',
        duration: 1000
      })

        // console.log(err)
      })
    },
     arrayBufferToBase64(buffer) {
      console.log(buffer)
      //第一步，将ArrayBuffer转为二进制字符串
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      //将二进制字符串转为base64字符串
      return window.btoa(binary);
    },
    genTaskname(){
      this.form.taskname = this.form.filename + '的扩增任务'
    }
  },
  created() {
    this.fetchData()
    this.fileList()
    if(this.form.filename){
      this.fileChange()
    }
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
.method_atr{
  padding-bottom: 30px;
}
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>

