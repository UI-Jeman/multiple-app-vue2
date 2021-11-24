<template>
  <nav>
    <div class="nav-item aside-toggle" @click="onAsideToggle">
      <a>
        <i class="iconfont" :class="asideToggle ? 'iconmenu_toggle_expand' : 'iconmenu_toggle_back'"></i>
      </a>
    </div>
    <div class="nav-item" @click="userInfoVisible = true">
      <span class="user">
        <el-avatar :size="40" :src="userInfo.avatar"></el-avatar>
        <div>
          <span>{{ userInfo.realName }}</span>
          <el-tag size="mini" type="success">{{ userInfo.currentRole.name }}</el-tag>
        </div>
      </span>
    </div>
    <my-dialog :visible.sync="userInfoVisible" :show-footer="false" custom-class="user-info-dialog" width="550px" center>
      <div>
        <el-divider><i class="iconfont iconjibenxinxi"></i> 基本信息</el-divider>
        <div class="user-info_base">
          <el-avatar shape="square" :size="130" :src="userInfo.avatar" fit="cover"></el-avatar>
          <ul>
            <li v-for="(item, index) of baseInfo" :key="index">
              <span class="caption">{{ item[0] }}</span><span class="content">{{ item[1] }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-info_role">
        <el-divider><i class="iconfont iconjiaose"></i> 角色信息（点击可切换角色）</el-divider>
        <el-button-group>
          <el-button
            v-for="{ id, name } in userInfo.roles"
            :key="id"
            :loading="selectId === id"
            :type="userInfo.currentRoleId === id ? 'primary' : ''"
            @click="onChangeRole(id)"
            size="mini">
            {{ name }}
          </el-button>
        </el-button-group>
      </div>
    </my-dialog>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'
  import { switchRole } from '@pc/api'

  export default {
    name: 'my-nav',
    data() {
      return {
        userInfoVisible: false,
        selectId: ''
      }
    },
    computed: {
      ...mapState(['asideToggle', 'userInfo', 'genderMap']),
      baseInfo() {
        const { userInfo: { loginName, realName, phone, gender }, genderMap } = this

        return new Map([
          ['姓名', realName],
          ['账号', loginName],
          ['号码', phone],
          ['性别', genderMap[gender || 0]]
        ])
      }
    },
    methods: {
      onAsideToggle() {
        this.$store.commit('SET_ASIDE_TOGGLE', !this.asideToggle)

        setTimeout(() => {
          // 手动触发 resize 事件，使图表组件执行 resize 方法
          const event = new Event('resize')
          window.dispatchEvent(event)
        }, 400) // 400 毫秒为菜单栏过渡的时长
      },
      onChangeRole(roleId) {
        if (this.userInfo.currentRoleId === roleId) return

        this.selectId = roleId
        switchRole(roleId).then(() => {
          this.selectId = ''
          this.$store.dispatch('getUserInfo').then(() => {
            const { $store: { getters: { isUser, isAdmin }, dispatch } } = this

            Promise.race([
              isUser && dispatch('getClassDetail'),
              isAdmin && dispatch('getAllClasses')
            ]).then(() => {
              this.$message.success('切换角色成功')
              location.reload()
            })
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $height-nav;
    padding: 0px 20px 0px 0px;

    .aside-toggle {
      color: $color-white;

      i.iconfont {
        font-size: 18px;
        line-height: 18px;
      }
    }

    .nav-item {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0px 10px;
      cursor: pointer;
      transition: background-color .2s;

      &:hover {
        background-color: rgba($background-color-base, .2);
      }

      > span, .user {
        cursor: pointer;
        color: $color-white;
        transition: .2s;
      }

      + .nav-item {
        margin-left: 40px;
      }
    }

    .user {
      display: inline-flex;
      align-items: center;

      > div {
        display: inline-flex;
        align-items: center;

        > span {
          padding: 0px 10px;
        }
      }
    }
  }

  /deep/ .user-info-dialog {
    .el-dialog__header {
      display: none;
    }

    .user-info_base {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      > ul {
        flex: 1;
        padding-left: 20px;
      }

      li {
        display: flex;
        padding: 9px 0px;
        font-size: 15px;

        .caption {
          width: 5em;
          text-align: right;
          color: $color-text-secondary;

          &::after {
            content: '： '
          }
        }

        .content {
          color: $color-text-regular;
        }
      }
    }

    .user-info_role {
      padding-bottom: 20px;
      text-align: center;
    }
  }
</style>
