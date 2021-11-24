<template>
  <el-button @click="onClick" v-bind="$attrs" :loading="loading">
    <slot></slot>
  </el-button>
</template>

<script>
  export default {
    name: 'my-button',
    props: {
      handler: Function,
      default: () => undefined
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      async onClick() {
        this.loading = true
        try {
          await this.handler()
        } catch (err) {
          console.log(err)
        }
        this.loading = false
      }
    }
  }
</script>
