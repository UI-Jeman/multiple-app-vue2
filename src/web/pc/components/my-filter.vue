<template>
  <el-form v-bind="$attrs" :model="model" ref="filterForm" :disabled="disabled" class="my-filter filter-wrap" inline>
    <slot></slot>
    <el-form-item>
      <el-button @click="onConfirm" :loading="loading" type="primary">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'my-filter',
    props: {
      model: { type: Object, default: () => ({}) },
      handler: Function
    },
    data() {
      return {
        disabled: false,
        loading: false
      }
    },
    watch: {
      model: {
        handler(value) {
          this.$emit('change', JSON.parse(JSON.stringify(value)))
        },
        deep: true
      }
    },
    methods: {
      async onConfirm() {
        try {
          await this.$refs.filterForm.validate()

          const { handler } = this
          this.disabled = true
          this.loading = true

          if (handler) await this.handler()
        } catch (err) {
          console.error('my-filter error: ', err)
        }

        this.disabled = false
        this.loading = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-filter /deep/ {
    .el-form-item {
      margin-right: 10px;
      margin-bottom: 0px;
    }
  }
</style>
