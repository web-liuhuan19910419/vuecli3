<template>
  <div class="upload-layout">
    <div class="head-left-layout">
      <input
        class="file-input"
        type="file"
        accept="image/png,image/gif,image/jpeg,application/pdf"
        @change="choosePhotoPathFile"/>
    </div>
  </div>
</template>

<script>
import requestUtil from '../utils/request/requestUtil.js'
export default {
  props: {
    indexProp: 0
  },
  data () {
    return {
      fileParam: {},
      uploadContent: ''
    }
  },
  methods: {
    choosePhotoPathFile (e) {
      let file = e.target.files[0]
      this.fileParam = new FormData() // 创建form对象
      this.fileParam.append('file', file) // 通过append向form对象添加数据
      let fileName = file.name.substring(0, file.name.lastIndexOf('.'))
      if (fileName.length > 80) {
        fileName = fileName.substring(0, 80)
      }
      fileName = encodeURI(fileName) // 转译成url识别的路径
      let unique = fileName + '_' + (new Date()).getTime()
      let requestLink = this.$sglobal.getUploadAPI() + unique
      requestUtil.uploadFile(requestLink, this.fileParam).then((responseData) => {
        if (responseData.data.result === '1') {
          this.$toast(responseData.data.data + ' upload success.')
          this.uploadContent = responseData.data.data
        } else {
          this.$toast(responseData.data.data)
        }
      })
    }
  },
  watch: {
    uploadContent (to, from) {
      if (to !== undefined) {
        this.$emit('on-upload-content-change', {'content': to, 'index': this.indexProp})
      }
    }
  }
}
</script>

<style scoped>
.upload-layout {
  display: flex;
  justify-content: flex-start;
  margin-top: 0px;
  margin-left: 160px;
}

.file-input {
  float: left;
  margin-left: 10px;
  margin-top: 12px;
}
</style>
