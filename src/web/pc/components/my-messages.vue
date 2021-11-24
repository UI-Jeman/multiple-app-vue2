<template>
  <!-- 消息中心 -->
  <my-block v-loading="loading" type="card" title="消息中心" class="my-messages">
    <ul v-show="messages.length">
      <li v-for="({ createTime, title }, index) in messages" :key="index" class="my-message-item">
        <span class="single-dot">{{ index + 1 }}、{{ title }}</span>
        <time datetime="">
          {{ new Date(createTime) | formatDate('yyyy-MM-dd HH:mm:ss') }}
        </time>
      </li>
    </ul>
    <p v-show="!messages.length" class="text-center color-info">暂无消息~</p>
    <el-pagination
      :total="total"
      :current="1"
      :page-size="2"
      @current-change="fetchMessages"
      class="text-center"
      layout="prev, pager, next"
      background
      small>
    </el-pagination>
  </my-block>
</template>

<script>
  import { getMessages } from '@pc/api'
  import { formatDate } from '@pc/utils'

  export default {
    name: 'my-messages',
    data() {
      return {
        loading: false,
        messages: [],
        total: 0
      }
    },
    methods: {
      fetchMessages(currentPage) {
        const pagination = { pageNum: currentPage, pageSize: 2 }
        this.loading = true
        getMessages(pagination, formatDate(new Date(), 'yyyy-MM-dd'))
          .then(({ data: { total, records } }) => {
            this.messages = records
            this.total = total
            this.loading = false
          })
      }
    },
    created() {
      this.fetchMessages(1)
    }
  }
</script>

<style lang="scss" scoped>
  .my-messages {
    display: flex;
    flex-direction: column;

    /deep/ .my-block_body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      > ul {
        height: 4em;
        overflow-y: auto;
      }

      > .el-pagination {
        flex-shrink: 0;
      }
    }
  }

  .my-message-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5;

    > time {
      color: $color-info;
      font-size: 14px;
      flex-shrink: 0;
      margin-left: 1em;
    }
  }
</style>
