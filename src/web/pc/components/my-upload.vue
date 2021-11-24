<template>
  <el-upload
    class="my-upload"
    v-bind="$attrs"
    action=""
    :limit="limit"
    :file-list="fileList"
    :on-success="onSuccess"
    :on-preview="onPreview"
    :before-remove="onRemove"
    :http-request="onRequest">
    <el-button :disabled="$attrs.disabled" type="text" style="padding: 0px">
      <slot v-if="fileList && limit > fileList.length" name="default">
        点击上传
      </slot>
    </el-button>
    <template #tip>
      <div>{{ tip }}</div>
    </template>
    <my-dialog title="图片预览" :visible.sync="previewVisible" class="preview-dialog" append-to-body>
      <div class="text-center">
        <img :src="previewUrl">
      </div>
    </my-dialog>
  </el-upload>
</template>

<script>
  import { upload } from '@pc/api'

  export default {
    name: 'my-upload',
    props: {
      total: Number, // 当前文件数量
      tip: String,
      limit: Number,
      fileList: Array,
      max: { type: Number, default: 20 } // 图片最大值，单位 MB
    },
    data() {
      return {
        previewUrl: '',
        previewVisible: false
      }
    },
    methods: {
      // 自定义上传实现
      onRequest({ file }) {
        const formData = new FormData()
        formData.append('file', file)
        return upload(formData)
      },
      onSuccess(response, file) {
        const { data: url } = response
        const { uid } = file
        const { fileList } = this

        fileList.push({ url, name: '', uid })
        this.$emit('update:file-list', fileList)
        this.$emit('files-change', fileList)
      },
      onPreview(file) {
        this.previewUrl = file.url
        this.previewVisible = true
      },
      onRemove(file, fileList) {
        return this.$confirm(`将删除该图片，是否继续`, '提示', { type: 'warning' })
          .then(() => {
            fileList = fileList.filter(({ uid }) => file.uid !== uid)
            this.$emit('update:file-list', fileList)
            this.$emit('files-change', fileList)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-upload /deep/ {
    .el-upload--picture-card {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .el-upload-list__item-thumbnail {
      object-fit: cover;
    }

    .el-icon-close-tip {
      visibility: hidden;
    }
  }

  .preview-dialog {
    img {
      max-width: 100%;
    }
  }
</style>
