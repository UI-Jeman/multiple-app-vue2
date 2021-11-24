<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" v-loading="loading">
        <my-block type="card" :style="{ height: '170px' }" :title="userInfo.tenantName">
          <el-row :gutter="20">
            <el-col :span="12">
              <span class="caption">管理员：</span><span>{{ userInfo.realName }}</span>
            </el-col>
            <el-col :span="12">
              <span class="caption">人数：</span><span>{{ studentCount }} 人</span>
            </el-col>
          </el-row>
        </my-block>
      </el-col>
      <el-col :span="12">
        <my-messages :style="{ height: '170px' }"></my-messages>
      </el-col>
    </el-row>
    <el-tabs v-model="active">
      <el-tab-pane label="全校" name="chart" lazy>
        <div class="display-flex">
          <el-col :span="14">
            <el-row :gutter="15" style="display: flex;">
              <el-col :span="12">
              </el-col>
              <el-col :span="12">
              </el-col>
            </el-row>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="班级" name="list" lazy>
        <my-block title=" " type="card">
          <my-table row-key="classId" :data="allClasses" :loading="loading">
            <el-table-column label="班级" align="center">
              <template v-slot="{ row: { className, classId } }">
                <!-- <router-link :to="{ name: 'ClassDetail', params: { id: classId, name: className } }">
                  {{ className }}
                </router-link> -->
                <router-link :to="{ name: 'view-teacher', params: { id: classId, name: className ,role:'admin'} }">
                  {{ className }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="班主任" align="center">
              <template v-slot="{ row: { teachers } }">
                {{ teachers.map(({ name }) => name).join('、') }}
              </template>
            </el-table-column>
            <el-table-column prop="studentCount" label="学生人数" align="center"></el-table-column>
          </my-table>
        </my-block>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        active: this.$route.query.tab || 'chart',
        loading: false,
        classes: []
      }
    },
    computed: {
      ...mapState(['userInfo', 'allClasses']),
      studentCount() {
        let count = 0

        this.allClasses.forEach(({ studentCount }) => count += studentCount)
        return count
      }
    },
    watch: {
      active(tab) {
        this.$router.replace({ query: { tab } })
      }
    },
    created() {
      if (!this.allClasses.length) {
        this.loading = true
        this.$store.dispatch('getAllClasses').then(() => this.loading = false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .caption {
    display: inline-block;
    width: 4em;
    margin-bottom: 10px;
    // text-align: right;

    + span {
      display: inline-block;
      text-align: left;
    }
  }
</style>
