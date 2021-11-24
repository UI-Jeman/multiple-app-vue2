<template>
  <el-select v-bind="$attrs" :value="value" @change="onChange">
    <el-option
      v-for="item in (dictionaries[type] || [])"
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
    // 字典选择器
    name: 'my-dict-dropdown',
    props: {
      type: {
        type: String,
        required: true
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
    computed: mapState(['dictionaries']),
    async mounted() {
      const { dictionaries, type, $store: { dispatch }, defaultIndex, defaultId, onChange} = this

      !dictionaries[type] && await dispatch('getdictionaries', type)

      defaultId && onChange(defaultId)

      if (defaultIndex || defaultIndex === 0) onChange(dictionaries[type]?.[0]?.id)

      this.dictionaries[type]
    }
  }
</script>
