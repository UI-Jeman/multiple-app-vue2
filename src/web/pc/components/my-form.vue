<template>
  <div class="my-form">
    <el-form
      :disabled="$attrs.disabled || disabled"
      ref="myForm"
      v-bind="$attrs"
      :style="{ width: width }"
      :label-width="labelWidth">
      <slot></slot>
      <el-form-item v-if="showFooter" class="my-form_footer">
        <slot name="footer">
          <el-button @click="onCancel" :disabled="loading">{{ cancelText }}</el-button>
          <el-button @click="onSubmit" :loading="loading" type="primary">{{ submitText }}</el-button>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'my-form',
    inheritAttrs: false,
    props: {
      width: String,
      labelWidth: { type: String, default: '88px' },
      submit: { type: Function, default: () => undefined },
      cancel: { type: Function, default: () => undefined },
      submitText: { type: String, default: '提交' },
      cancelText: { type: String, default: '取消' },
      resetOnCancel: { type: Boolean, default: true }, // 是否点击取消执行 cancel 事件后重置表单
      resetOnSubmit: { type: Boolean, default: false }, // 是否提交成功后重置表单
      showFooter: { type: Boolean, default: true }
    },
    data() {
      return {
        loading: false,
        disabled: false
      }
    },
    methods: {
      async onSubmit() {
        try {
          const { validate, resetFields } = this.$refs.myForm

          await validate()

          this.loading = true
          this.disabled = true

          await this.submit()

          if (this.resetOnSubmit) resetFields()
        } catch (err) {
          console.error('my-form submit error: ', err)
        }

        this.loading = false
        this.disabled = false
      },
      onCancel() {
        this.cancel()
        if (this.resetOnCancel) {
          const { resetFields, clearValidate } = this.$refs.myForm
          resetFields()
          this.$nextTick().then(clearValidate)
        }
      },
      validate(...rest) {
        this.$refs.myForm.validate(rest)
      },
      validateField(...rest) {
        this.$refs.myForm.validateField(rest)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-form /deep/ {
    display: flex;
    justify-content: center;

    .el-form {
      min-width: 410px;

      .el-input, .el-select {
        width: 100%;
      }
    }

    .my-form_footer {
      text-align: left;
    }
  }
</style>
