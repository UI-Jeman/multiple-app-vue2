<template>
  <el-date-picker
    :type="type"
    v-bind="$attrs"
    v-model="timeRange"
    range-separator="至">
  </el-date-picker>
</template>

<script>
  export default {
    name: 'my-time-range',
    props: {
      startTime: [Number, String],
      endTime: [Number, String],
      type: {
        type: String,
        default: 'datetimerange'
      }
    },
    data() {
      return {
        timeRange: []
      }
    },
    watch: {
      startTime: {
        handler(val) {
          this.timeRange && this.$set(this.timeRange, 0, val)
        },
        immediate: true
      },
      endTime: {
        handler(val) {
          this.timeRange && this.$set(this.timeRange, 1, val)
        },
        immediate: true
      },
      timeRange(val) {
        val = val || []
        const startTime = val[0] ? val[0].valueOf() : ''
        const endTime = val[1] ? val[1].valueOf() : ''

        this.$emit('update:start-time', startTime)
        this.$emit('update:end-time', endTime)
      }
    }
  }
</script>
