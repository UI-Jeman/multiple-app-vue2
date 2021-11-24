<template>
  <div class="my-statistics text-center">
    <ul class="label-list">
      <li
        v-for="(item, index) in list"
        :style="`--color: ${ item.color }`"
        :key="index">
        <header>{{ item.label }}</header>
        <div>{{ item.value }}人</div>
        <footer>
          <span :style="`width: ${ (item.value / max) * 100 }%`"></span>
        </footer>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'my-statistics', // 出勤统计
    props: {
      /**
       * 关于颜色、label 名称、用于取值的数据索引的配置
       * e.g. { label: '应到人数', color: '#8578da', value: 'test1' },
       */
      list: { type: Array, default: () => [] }
    },
    computed: {
      max() {
        return Math.max(...this.list.map(({ value }) => value))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-statistics{
    width: 100%;
  }

  .label-list {
    display: inline-flex;
    padding: 15px 0px;
    border-radius: 10px;
    box-shadow: $color-text-placeholder 0px 0px 7px;

    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px 27px;
      max-width: 100px;

      + li {
        border-left: 1px solid #e8ebf5;
      }

      > header {
        display: inline-flex;
        align-items: center;
        color: #acadb8;
        font-size: 14px;

        &::before {
          content: '';
          width: 4px;
          height: 4px;
          margin-right: 5px;
          border: 2px solid var(--color);
          border-radius: 50%;
        }
      }

      > div {
        color: #333333;
        font-size: 17px;
        font-weight: bold;
        padding: 3px 0px 7px;
      }

      > footer {
        width: 45px;
        height: 2px;
        text-align: center;
        background-color: #ededed;

        > span {
          display: block;
          width: 0px;
          height: 100%;
          font-size: 0px;
          background-color: var(--color);
          transition: width .7s ease-in-out;
        }
      }
    }
  }
</style>
