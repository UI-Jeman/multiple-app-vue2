<template>
  <el-dialog
    v-bind="$attrs"
    @close="onCancel"
    :visible="visible"
    :show-close="true"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    class="my-dialog"
    append-to-body>
    <template #title>
      <span>{{ title }}</span>
    </template>
    <slot></slot>
    <template v-if="showFooter" #footer>
      <el-button
        size="small"
        type="primary"
        @click="onConfirm"
        :loading="confirmLoading"
        :disabled="cancelLoading">
        确定
      </el-button>
      <el-button
        size="small"
        @click="onCancel"
        :loading="cancelLoading"
        :disabled="confirmLoading">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'my-dialog',
    model: [ 'visible' ],
    props: {
      title: String,
      visible: { type: Boolean, default: false },
      confirm: { type: Function, default: () => undefined },
      cancel: { type: Function, default: () => undefined },
      showFooter: { type: Boolean, default: true }
    },
    data() {
      return {
        confirmLoading: false,
        cancelLoading: false
      }
    },
    methods: {
      async onConfirm() {
        this.confirmLoading = true
        try {
          await this.confirm()
          this.close()
        } catch (err) {
          console.error('my-dialog confirm error: ', err)
        }
        this.confirmLoading = false
      },
      async onCancel() {
        this.cancelLoading = true
        try {
          await this.cancel()
          this.close()
        } catch (err) {
          console.error('my-dialog cancel error: ' + err)
        }
        this.cancelLoading = false
      },
      close() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-dialog /deep/ {
    .el-dialog {
      border-radius: 0px;
    }

    .el-dialog__header {
      padding: 16px 20px 16px;
      border-bottom: 1px solid $border-color-light;

      > span {
        color: $color-primary;
      }
    }

    .el-dialog__body {
      padding: 15px 20px;
    }

    .el-dialog__footer {
      padding: 18px 20px 18px;
      border-top: 1px solid $border-color-light;
    }
  }
</style>
