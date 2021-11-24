<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <my-block
          type="card"
          :style="{ height: '170px' }"
          :title="userInfo.tenantName"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <span class="caption">班主任：</span
              ><span>{{ userInfo.realName }}</span>
            </el-col>
            <el-col :span="12">
              <span class="caption">年级：</span>
              <span v-if="this.$route.params.role === 'admin'">{{
                this.admins.grade
              }}</span>
              <span v-else>{{ classDetail.className }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <span class="caption">助教：</span>
              <span>
                <el-tooltip
                  v-if="assistant.length > 10"
                  :content="assistant"
                  placement="top"
                >
                  <span>{{ assistant.slice(0, 10) }}...</span>
                </el-tooltip>
                <el-tooltip
                  v-if="this.$route.params.role === 'admin'"
                  :content="this.admins.teacher"
                  placement="top"
                >
                  <span>{{ this.admins.teacher.slice(0, 10) }}...</span>
                </el-tooltip>
                <template v-else>{{ this.admins.teacher }}</template>
              </span>
            </el-col>
            <el-col :span="12">
              <span class="caption">人数：</span
              ><span v-if="this.$route.params.role === 'admin'"
                >{{ this.admins.classCount }} 人</span
              >
              <span v-else>{{ classDetail.studentCount }} 人</span>
            </el-col>
          </el-row>
        </my-block>
      </el-col>
      <el-col :span="12">
        <my-messages :style="{ height: '170px' }"></my-messages>
      </el-col>
    </el-row>

    <div>
      <el-tabs v-model="active">
        <el-tab-pane label="班级" name="chart" lazy>
          <div class="display-flex">
            <!-- <card-attendance target="班级" class-id=""></card-attendance> -->
            <el-col :span="14">
              <el-row :gutter="15" style="display: flex">
                <el-col :span="12">
                  <!-- <card-check target="班级" class-id=""></card-check> -->
                </el-col>
                <el-col :span="12">
                  <!-- <card-test target="班级" class-id=""></card-test> -->
                </el-col>
              </el-row>
              <!-- <card-preference target="班级" class-id=""></card-preference> -->
            </el-col>
          </div>
        </el-tab-pane>

        <el-tab-pane label="个人" name="list" lazy>
          <my-block title=" " type="card">
            <my-table
              :row-key="students.id"
              :data="students"
              :loading="loading"
            >
              <el-table-column
                label="序号"
                type="index"
                align="center"
              ></el-table-column>
              <el-table-column label="姓名" align="center" prop="name">
                <template slot-scope="scope">
                  <router-link
                    :to="{
                      name: 'StudentDetail',
                      params: {
                        studentId: scope.row.id,
                        time: new Date() - 0,
                        name: scope.row.name,
                      },
                    }"
                  >
                    {{ scope.row.name }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="年级" align="center" prop="gender">
              </el-table-column>
              <el-table-column
                prop="studentCode"
                label="学号"
                align="center"
              ></el-table-column>
              <el-table-column prop="gender" label="性别" align="center">
                <template slot-scope="scope">
                  {{ scope.row.gender === 1 ? "男" : "女" }}
                </template>
              </el-table-column>
            </my-table>
          </my-block>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      active: this.$route.query.tab || "chart",
      loading: true,
      students: [],
      eachOne: [],
      assistant: "",
      admins: {
        // 助教
        teacher: "",
        // 班级人数
        classCount: 0,
        // 年级
        grade: "",
      },
    };
  },
  mounted() {
    if (this.$route.params.role === "admin") {
      console.log(this.$route, "***********");
    }
  },
  computed: {
    ...mapState(["userInfo", "classDetail"]),
    ...mapGetters(["isTeacher"]),
  },
  methods: {
  },
  watch: {
    active(tab) {
      const { query } = this.$route;
      this.$router.replace({ query: { ...query, tab } });
    },
  },
};
</script>

<style lang="scss" scoped>
.view-teacher {
  margin-top: 20px;
}

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
/deep/ .el-tabs__item {
  font-size: 20px;
  font-weight: 600;
}
</style>
