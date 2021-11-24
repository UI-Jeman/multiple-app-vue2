<template>
  <div class="my-block" :class="{ 'my-block-card': type === 'card' }">
    <div class="my-block_header">
      <span class="title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span v-if="showBack">
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </span>
      <span v-if="link || action" class="extra">
        <template v-if="action">
          <template v-if="Array.isArray(action)">
            <a-button
              v-for="(item, index) in action"
              @click="item.handler"
              :type="item.type || 'primary'"
              :size="item.size"
              :key="index">
              {{ item.text }}
            </a-button>
          </template>
          <el-button
            v-else
            @click="action.handler"
            :type="action.type || 'primary'"
            :size="action.size">
            {{ action.text }}
          </el-button>
        </template>
        <router-link v-if="link" :to="link" class="link">
          {{ linkText }} <i class="iconfont iconchakangengduo"></i>
        </router-link>
      </span>
    </div>
    <div v-if="type === 'page' && $slots.split" class="my-block_split">
      <slot name="split"></slot>
    </div>
    <div v-if="$slots.default" class="my-block_body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-block',
    props: {
      title: String,
      link: [String, Object],
      linkText: {
        type: String,
        default: '查看详情'
      },
      action: [Array, Object],
      type: {
        type: String,
        default: 'page'
      },
      showBack: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-block {
    width: 100%;
  }

  .my-block-card {
    padding: 15px;
    background-color: $background-color-white;
    border-radius: 10px;
    box-sizing: border-box;

    .my-block_header {
      margin-bottom: 2px;
    }

    .my-block_header, .my-block_body {
      padding: 0px;
      background-color: transparent;
    }
  }

  .my-block_header, .my-block_body {
    background-color: $background-color-white;
    border-radius: 10px;
    padding: 15px;
  }

  .my-block_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 40px;

    .title {
      display: flex;
      font-size: 18px;
      font-weight: 600;
    }

    .extra {
      > .link {
        margin-left: 20px;
      }
    }
  }

  .my-block_header, .my-block_split {
    margin-bottom: 15px;
  }
</style>
