<template>
    <my-empty content="Admin"></my-empty>
</template>

<script>

import { getDataList } from "@app/api";

export default {
  name: "Overview",
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.getDataList('test', 4);
  },
  methods: {
    async getDataList(id, count) {
      let params = { id, count }
      const { data } = await getDataList(params);
      if (!data) {
        return new Error("数据异常");
      } else {
        this.dataList = data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
