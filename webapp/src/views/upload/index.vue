<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="130px" label-position="left" >
      <el-form-item  label="File type" >
        <el-select v-model="form.category" placeholder="Please select file type">
          <el-option label="Picture" value="Picture" />
          <el-option label="Dataset" value="Dataset" />
        </el-select>
      </el-form-item>

      <el-form-item label="Upload method">
        <el-radio-group v-model="method">
          <el-radio label="file" />
          <el-radio label="link" />
        </el-radio-group>
      </el-form-item>

      <el-form-item  v-if="method=='file'" label="Upload file">
      <el-upload ref="upload" class="upload" drag action="#"
                 :http-request="httpRequest"
                 accept=".png,.jpg,.txt, .zip"
                 :on-remove="handleRemove"
                 :on-change="handleChange"
                 :auto-upload="false"
                 :file-list="fileList"
                 :limit="2">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">Drag the file here, or<em> click to upload</em></div>
        <div v-if="form.category =='Dataset'" class="el-upload__tip" slot="tip">
          <ul style="padding-left: 10px; margin-top: 1px; margin-bottom: 1px">
            <li>Supported dataset extension: .zip</li>
            <li>Filename limited to 20 characters</li>
            <li>Upload one zip at a time </li>
            <li>Dataset is composed of two folders:&emsp;images&emsp;and&emsp;labels&emsp;</li></ul></div>
        <div v-if="form.category =='Picture'" class="el-upload__tip" slot="tip">
          <ul style="padding-left: 10px; margin-top: 1px; margin-bottom: 1px">
            <li>The image and its corresponding label file need to be uploaded</li>
            <li>Supported file extensions: .png, .jpg, .txt</li>
            <li>Filename limited to 20 characters</li></ul></div>
      </el-upload>
      </el-form-item>

      <el-form-item  v-if="method=='link'" label="link">
       <el-input placeholder="Please enter the link" v-model="form.link">
    <template slot="prepend">Http://</template></el-input>
      </el-form-item>

       <el-form-item label="Information">
        <el-input v-model="form.desc" style="width: 800px" type="textarea"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100px; margin-left: 200px" type="primary" @click="onSubmit">Upload</el-button>
        <el-button style="width: 100px; margin-left: 50px" @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
import { uploadInfo } from '@/api/upload.js'
export default {
  data() {
    return {
      form: {
        category:'Picture',
        link:'',
        desc: '',
        // date: this.timestampToTime(new Date().getTime()),
      },
      method:'file',
      category:'',
        hasFile: false,
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
	        if (!fileList.length) {
	          this.hasFile = false;
	        }
	        this.form.file = null;
	      },

    handleChange(file, fileList) {
    	    if (fileList.length > 2) {
	          return;
	        }
	        if (fileList.length != 0) {
	          this.hasFile = true;
	        }
	        this.fileList = fileList;
          // this.form.filename = file.name.substring(0,file.name.lastIndexOf('.'))
	      },

    onSubmit() {
      let fd = new FormData();
		      for(let key in this.form){
            fd.append(key,this.form[key]);}
          this.fileList.forEach((el, x) => {
        fd.append('files', el.raw)
      })

          uploadInfo( fd ).then(res => {
            console.log(res)
             this.$message({
        message: res["message"],
        type: 'success'
      })

			    }).catch(err =>{
            console.log('Request failed')
            console.log(err)
          })
    	  },
    // httpRequest() {
	  //   	  let fd = new FormData();
		//       for(let key in this.form){
    //         fd.append(key,this.form[key]);}
    //       this.fileList.forEach((el, x) => {
    //     fd.append('files', el.raw)
    //   })
    //
    //       uploadInfo( fd ).then(res => {
    //         console.log(res)
    //          this.$message({
    //     message: res["message"],
    //     type: 'success'
    //   })
    //
		// 	    }).catch(err =>{
    //         console.log('请求失败')
    //         console.log(err)
    //       })
		//       },

    onCancel() {
      this.$message({
        message: 'Cancel!',
        type: 'warning'
      })
    },
    // timestampToTime(timestamp) {
    //   var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //   var Y = date.getFullYear() + "-";
    //   var M = (date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1): date.getMonth() + 1) + "-";
    //   var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    //   var h =(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    //   var m =(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +":";
    //   var s =date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //   return Y + M + D + h + m + s;
    // },
		},
  }

</script>

<style scoped>
.line{
  text-align: center;
}
.upload{
  width: 500px;
  height: 350px
}

.el-upload__tip li{
  line-height: 25px;
  font-weight: 500;
}

</style>

