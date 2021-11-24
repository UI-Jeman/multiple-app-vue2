<template>
  <el-select v-bind="$attrs" :value="value" @change="onChange">
    <el-option
      v-for="item in (setups[type] || [])"
      :key="item.id"
      :value="item.id"
      :label="item.name">
      {{ item.name }}
    </el-option>
  </el-select>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    // 体制测定、体征测试选择器
    name: 'my-setup-dropdown',
    props: {
      type: {
        type: String, // test - 体制测定，sign - 体征测试
        default: 'sign'
      },
      value: String,
      defaultIndex: Number,
      defaultId: String
    },
    model: ['value'],
    methods: {
      onChange(value) {
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },
    computed: mapState(['setups']),
    async mounted() {
      const { setups, type, $store: { dispatch }, defaultIndex, defaultId, onChange } = this

      !setups[type] && await dispatch('getSetups', type)

      if (defaultId) {
        onChange(defaultId)
        this.$emit('default-selected')
      }

      if (defaultIndex || defaultIndex === 0) {
        const id = setups[type]?.[0]?.id
        onChange(id)
        this.$emit('default-selected')
      }
    }
  }
</script>
