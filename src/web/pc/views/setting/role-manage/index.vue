<template>
  <div>
    <my-block title="角色管理">
      <el-alert :closable="false" show-icon>
        <span class="color-danger">教师、学生、家长</span> 数据均来自于教育号基础数据。
        <br />
        <span class="color-danger">开发者</span> 数据来自于开发者管理。
        <br />
        以上数据不可编辑！
      </el-alert>
      <br />
      <my-table :data="roles" :loading="loading">
        <el-table-column prop="name" label="姓名" align="center" width="180"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <my-button
              v-for="({ handler, type, text, disabled }, index) in actions"
              :handler="() => handler(row)"
              :type="type"
              :key="index"
              :disabled="disabled && disabled(row)"
              size="mini">
              {{ text }}
            </my-button>
          </template>
        </el-table-column>
      </my-table>
      <my-dialog :visible.sync="infoVisible" :show-footer="false" title="修改角色信息">
        <my-form :model="form" :rules="rules" :submit="onSubmit" :cancel="() => infoVisible = false">
          <el-form-item label="序号" prop="no">
            <el-input v-model="form.no" placeholder="请输入序号"></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </my-form>
      </my-dialog>
    </my-block>
    <!-- 查看角色内用户 dialog -->
    <my-dialog :visible.sync="checkVisible" :title="`用户列表 - ${ checkRole.name }`" width="900px" custom-class="user-dialog">
      <my-table
        :data="userCache[checkRole.id]"
        :loading="checkLoading"
        :filter-handler="({ realName }, keyword) => new RegExp(keyword, 'g').test(realName)">
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
          <template v-slot="{ row: { gender } }">{{ $store.state.genderMap[gender] }}</template>
        </el-table-column>
      </my-table>
    </my-dialog>
    <!-- 角色授权 dialog -->
    <my-dialog :confirm="onAuth" :visible.sync="authVisible" width="500px" title="角色授权" custom-class="menu-dialog">
      <el-tree
        node-key="id"
        ref="menuTree"
        :data="[currentRoleMenus]"
        :props="{ children: 'children', label: 'name' }"
        default-expand-all
        show-checkbox>
      </el-tree>
    </my-dialog>
    <!-- 添加用户 dialog -->
    <my-dialog :visible.sync="allTearchersVisible" :confirm="onConfirm" :cancel="onCancel" title="所有教师" width="900px" custom-class="user-dialog">
      <my-table
        ref="userTable"
        :data="allTeachers || []"
        :selected-key.sync="selectedTeacherIds"
        :filter-handler="({ realName }, keyword) => new RegExp(keyword, 'g').test(realName)">
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
          <template v-slot="{ row: { gender } }">{{ $store.state.genderMap[gender] }}</template>
        </el-table-column>
      </my-table>
    </my-dialog>
    <!-- 删除用户 dialog -->
    <my-dialog :visible.sync="deleteVisible" :confirm="onConfirm" :cancel="onCancel" :title="`用户列表 - ${ checkRole.name }`" width="900px" custom-class="user-dialog">
      <my-table
        :data="userCache[checkRole.id]"
        :loading="checkLoading"
        :selected-key.sync="selectedTeacherIds"
        :filter-handler="({ realName }, keyword) => new RegExp(keyword, 'g').test(realName)">
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
          <template v-slot="{ row: { gender } }">{{ $store.state.genderMap[gender] }}</template>
        </el-table-column>
      </my-table>
    </my-dialog>
  </div>
</template>

<script>
  import { addRoleUsers, authRoleMenu, deleteRoleUsers, getAllTeachers, getRoleMenuTree, getRoles, getUsersWithinRole, updateRoleInfo } from '@pc/api'
  import { flatObjectField } from '@pc/utils'

  export default {
    data() {
      const checkInfo = ({ id, name, no }) => {
        this.infoVisible = true
        this.$nextTick().then(() => this.form = { id, name, no })
      }

      const deleteUser = role => {
        this.currentRole = role
        this.currentActionFlag = false
        return this.fetchDeleteUsers(role)
      }

      const addUser = role => {
        this.currentRole = role
        this.currentActionFlag = true
        return this.fetchAllTeachers()
      }

      const setDisabled = ({ code }) => [35, 5, 10, 15].includes(code)

      return {
        loading: false,
        roles: [],
        actions: [
          { text: '查看用户', type: 'default', handler: this.fetchUsers },
          { text: '添加用户', type: 'primary', handler: addUser, disabled: setDisabled },
          { text: '删除用户', type: 'danger', handler: deleteUser, disabled: setDisabled },
          { text: '角色信息', type: 'info', handler: checkInfo },
          { text: '菜单授权', type: 'warning', handler: this.fetchUserMenu }
        ],
        checkVisible: false,
        infoVisible: false,
        authVisible: false,
        deleteVisible: false,
        form: { id: '', no: '', name: '' },
        rules: {
          no: { type: 'number', message: '请输入数字', transform: val => Number(val) },
          name: { required: true, message: '请输入角色名称' }
        },
        currentRole: {},
        currentRoleMenus: {},
        userCache: {},
        checkLoading: false,
        checkRole: {},
        selectedMenuIds: [],
        allTeachers: undefined,
        allTearchersVisible: false,
        selectedTeacherIds: [],
        currentActionFlag: true // 当前操作的标识，true：添加，false：删除
      }
    },
    methods: {
      async fetchData() {
        this.loading = true
        try {
          const { data } = await getRoles()
          this.roles = data
        } catch (err) { err }
        this.loading = false
      },
      onSubmit() {
        return updateRoleInfo(this.form)
          .then(() => {
            this.infoVisible = false
            this.$message.success('操作成功')
            this.fetchData()
          })
      },
      async fetchUsers(role) {
        const { id } = role

        this.checkRole = role
        this.checkVisible = true

        if (!this.userCache[id]) {
          this.checkLoading = true
          try {
            const { data } = await getUsersWithinRole(id)
            this.userCache[id] = data
          } catch (err) { err }
          this.checkLoading = false
        }
      },
      async fetchUserMenu(role) {
        const { id } = role
        this.currentRole = role

        try {
          const { data } = await getRoleMenuTree(id)
          this.currentRoleMenus = data

          this.authVisible = true

          // 选中已授权的菜单
          this.$nextTick(() => {
            const authMenuKeys = flatObjectField(data, { children: 'children', prop: 'id' }, menu => menu.authStatus)
            this.$refs.menuTree.setCheckedKeys(authMenuKeys)
          })
        } catch (err) {
          return err
        }
      },
      fetchAllTeachers() {
        if (this.allTeachers) this.allTearchersVisible = true
        else return getAllTeachers().then(({ data }) => {
          this.allTeachers = data
          this.allTearchersVisible = true
        })
      },
      async fetchDeleteUsers(role) {
        const { id } = role

        this.checkRole = role
        this.deleteVisible = true

        if (!this.userCache[id]) {
          this.checkLoading = true
          try {
            const { data } = await getUsersWithinRole(id)
            this.userCache[id] = data
          } catch (err) { err }
          this.checkLoading = false
        }
      },
      onAuth() {
        const menuIds = this.$refs.menuTree.getCheckedKeys()
        const { id } = this.currentRole

        return authRoleMenu(id, menuIds).then(() => {
          this.$message.success('操作成功')
        })
      },
      onConfirm() {
        const { id } = this.currentRole
        const success = () => {
          this.userCache[id] = undefined
          this.$message.success('操作成功')
          this.selectedTeacherIds = []
        }

        if (this.selectedTeacherIds.length) {
          return this.currentActionFlag
            ? addRoleUsers(id, this.selectedTeacherIds).then(success)
            : deleteRoleUsers(id, this.selectedTeacherIds).then(success)
        }
      },
      onCancel() {
        this.selectedTeacherIds = []
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .user-dialog {
    margin-top: 5vh!important;

    .el-table {
      height: calc(100vh - 350.344px)!important;
    }
  }

  /deep/ .menu-dialog {
    .el-dialog__body {
      max-height: calc(70vh - 130px);
      overflow-y: auto;
    }
  }
</style>
