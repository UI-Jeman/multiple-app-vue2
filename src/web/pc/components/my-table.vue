<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.9)"
    :class="{ 'my-table': true, 'no-border': !border, 'no-hover': noHover }">
    <div v-if="filterHandler" class="text-right">
      <el-input v-model="keyword" placeholder="请输入用户名称" size="small" style="width: 200px; margin-bottom: 10px">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table
      @selection-change="onSelect"
      :height="tableHeight"
      :data="dataSource"
      :row-key="rowKey"
      :border="border"
      :stripe="stripe"
      :style="{ minHeight }"
      ref="myTable"
      v-bind="$attrs"
      v-on="$listeners"
      header-row-class-name="my-table_header">
      <el-table-column v-if="selectedKey && showSelecte" type="selection" align="left" reserve-selection></el-table-column>
      <slot></slot>
      <el-table-column v-if="actionEdit && actionDelete" label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="actionEdit(untrack(scope.row), scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="actionDelete(untrack(scope.row), scope.$index)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else-if="actionEdit && !actionDelete" label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="actionEdit(untrack(scope.row), scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else-if="!actionEdit && actionDelete" label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" type="danger" @click="actionDelete(untrack(scope.row), scope.$index)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <my-empty :content="emptyText"></my-empty>
      </template>
    </el-table>
    <template v-if="showPagination">
      <!-- 前端分页 -->
      <el-pagination
        v-if="!pagination"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="currentPage"
        :page-sizes="[baseSize, baseSize + 10, baseSize + 20, baseSize + 30]"
        :page-size="pageSize"
        :total="results.length"
        :layout="paginationLayout"
        :small="smallPagination"
        class="my-table_pagination"
        background>
      </el-pagination>
      <!-- 后台分页 -->
      <el-pagination
        v-else
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[baseSize, baseSize + 10, baseSize + 20, baseSize + 30]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :layout="paginationLayout"
        :small="smallPagination"
        class="my-table_pagination"
        background>
      </el-pagination>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'my-table',
    inheritAttrs: false,
    props: {
      loading: Boolean,
      border: { type: Boolean, default: false },
      rowKey: { type: String, default: 'id' },
      data: { type: Array, default: () => [] },
      actionEdit: Function,
      actionEditText: { type: String, default: '编辑' },
      actionDelete: Function,
      emptyText: String,
      selectedKey: Array,
      showSelecte: { type: Boolean, default: true },
      showPagination: { type: Boolean, default: true }, // 是否需要分页组件
      pagination: Object,
      fixedHeight: { type: Boolean, default: true }, // 是否需要固定高度
      minHeight: { type: String, default: '250px' },
      paginationLayout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
      smallPagination: { type: Boolean, default: false },
      filterHandler: Function, // 本地检索
      stripe: { type: Boolean, default: true },
      noHover: Boolean
    },
    data() {
      return {
        tableHeight: ' ',
        currentPage: 1,
        pageSize: 10,
        baseSize: 10,
        keyword: ''
      }
    },
    computed: {
      results() {
        const { filterHandler, keyword, data } = this
        return (filterHandler && keyword) ? data.filter(item => filterHandler(item, keyword)) : data
      },
      dataSource() {
        const { results } = this
        if (!this.pagination && this.showPagination) {
          const { currentPage, pageSize } = this
          return results.slice((currentPage - 1) * pageSize, pageSize * currentPage)
        } else {
          return results
        }
      }
    },
    watch: {
      results(newValue, oldValue) {
        if (newValue !== oldValue && !this.pagination && this.showPagination) {
          this.currentPage = 1
        }
      }
    },
    methods: {
      untrack(val) {
        return JSON.parse(JSON.stringify(val))
      },
      onSizeChange(pageSize) {
        if (!this.pagination) this.pageSize = pageSize
        else {
          const { currentPage, total } = this.pagination
          this.$emit('change', { currentPage, pageSize, total })
        }
      },
      onCurrentChange(currentPage) {
        if (!this.pagination) this.currentPage = currentPage
        else {
          const { pageSize, total } = this.pagination
          this.$emit('change', { currentPage, pageSize, total })
        }
      },
      onSelect(selectedRow) {
        const { rowKey } = this
        // selectedRow.map(item => item[rowKey])
        this.$emit('update:selected-key', selectedRow.map(item => item[rowKey]))
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 这段代码是为了尽量让表格与其他内容一屏展示，屏幕高度如果不足，便不固定表格高度
        let height = ''
        if (this.fixedHeight) {
          const { showPagination } = this
          const outerHeight = this.$refs.myTable.$el.getBoundingClientRect().y + (showPagination ? 100 : 40)
          const max = window.innerHeight - outerHeight
          height = max >= 300 ? `calc(100vh - ${ outerHeight }px)` : ''
        }
        this.tableHeight = height
      })

      if (this.selectedKey) {
        this.$watch(
          'selectedKey',
          val => {
            if (!val.length) this.$refs.myTable.clearSelection()
            else {
              const { rowKey, dataSource } = this
              dataSource.forEach(item => this.$refs.myTable.toggleRowSelection(item, val.includes(item[rowKey])))
            }
          },
          { immediate: true }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-table {
    &::before {
      background: none;
    }

    &.no-border {
      /deep/ .el-table {
        tr, td {
          border: none;

          th, tr {
            border: none;
          }
        }
      }
    }

    &.no-hover {
      /deep/ .el-table {
        tr:hover td {
          background-color: transparent;
        }
      }
    }

    & /deep/ {
      .el-table {
        min-width: 100%;

        .el-table__body-wrapper {
          max-height: 100vh;
          overflow-y: auto;
        }
      }

      .my-table_header {
        color: $color-text-primary;

        .el-table-column--selection > .cell {
          padding-left: 14px;
        }

        th, tr {
          background-color: #fef4eb;
        }
      }

      .el-table__row--striped {
        td {
          background-color: #f7faff;
        }
      }
    }
  }

  .my-table_pagination {
    padding-top: 20px;
    text-align: center;
  }
</style>
