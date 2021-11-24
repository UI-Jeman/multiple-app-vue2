<template>
  <div class="my-header">
    <div class="my-header-container">
      <div class="my-header-nav" v-if="showTopBar">
        <slot name="left">
          <div class="my-header-nav-left">
            <span v-if="title !== ''">{{ title }}</span>
          </div>
        </slot>
        <slot name="right">
          <div class="my-header-nav-btn">
            <div
              class="my-header-nav-icon"
              @click="showSearchBar = true"
            >
              <i class="iconfont iconsearch"></i>
            </div>
            <div class="my-header-nav-icon" @click="toMsgCenter">
              <i class="iconfont iconlingdang"></i>
            </div>
            <div
              class="my-header-nav-icon"
              @click="showSwitchRole = true"
            >
              <i class="iconfont iconqiehuan"></i>{{userDetail.currentRole.name}}
            </div>
          </div>
        </slot>
      </div>
      <transition name="search">
        <van-search
          v-if="showSearchBar"
          v-model="value"
          show-action
          @cancel="onCancel"
          @search="onSearch"
          @input="onSearch"
          @clear="onSearch"
          placeholder="请输入"
        />
      </transition>
      <my-tabs
        v-if="tabList.length > 0"
        :list="tabList"
        color="#78befe"
        class="my-header-tab"
      />
      <div class="notice-bar-wrap" v-if="showNotice && $store.state.showNotice &&this.noticeMsg!==''">
        <div class="notice-bar">
          <div class="notice-title" @click="toMsgCenter">
            <i class="iconfont iconsystemprompt_fill"></i>
            <span>{{ noticeMsg }}</span>
          </div>
          <div class="notice-btn" @click="closeNotice">
            <i class="iconfont icondelete_fill"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="my-header-radius-bg" v-if="showHeaderBg"></div>
    <van-popup v-model="showSwitchRole" round position="bottom"  class="switch-role">
      <ul>
        <li v-for="item in userDetail.roles" :key="item.id" :class="item.id===userDetail.currentRoleId?'active-role':''">
          <button  @click="switchRole(item.id)" :disabled="item.id===userDetail.currentRoleId">{{item.name}}</button>
        </li>
      </ul>
      <div class="switch-role-cancel" @click="showSwitchRole = false">
        取消
      </div>
    </van-popup>
  </div>
</template>

<script>
import { switchRole } from "@app/api";
import { mapState } from 'vuex';
export default {
  props: {
    title: { type: String, default: () => "" }, // 班级名称
    tabList: { type: Array, default: () => [] }, // tab列表
    showNotice: { type: Boolean, default: false }, // 是否显示通知消息
    showHeaderBg: { type: Boolean, default: false }, // 是否显示弧形背景
    showTopBar: { type: Boolean, default: true }, // 是否显示搜索和消息栏
  },
  name: "MyHeader",
  data() {
    return {
      noticeMsg: "",
      showSearchBar: false, // 显示搜索框
      value: "", // 搜索框的值
      showSwitchRole:false,
    };
  },
  created() {
    this.showNotice && this.getNewsReceiveList();
  },
  computed:{
    ...mapState(['userDetail'])
  },
  methods: {
    closeNotice() {
      // 关闭通知消息
      this.$store.dispatch("closeNotice");
    },
    toMsgCenter() {
      // 点击消息图标跳转消息中心
      this.$router.push({ name: "MessageCenter" });
    },
    onSearch(val) {
      // 搜索学生
      this.$bus.$emit("searchStudent", val);
    },
    onCancel() {
      // 取消搜索
      this.showSearchBar = false;
      this.onSearch('')
    },
    async switchRole(roleId){
      const { msg, code } = await switchRole(roleId);
      if (code!==200) {
        return new Error("数据异常");
      } else {
        console.log(msg)
        if(msg==='success'){
          this.$storage.remove('user-detail')
          this.$storage.remove('class-id')
          sessionStorage.removeItem("roleType")
          window.location.reload()
          window.scrollTo(0, 0);
        }
      }
    }
  },
};
</script>
<style lang="scss">
.my-header {
  position: relative;
  background: #0186fd;
  padding: 1px 0;
  // height: 200px;
  .my-header-container {
    margin: $main-margin;
    .notice-bar-wrap {
      height: 60px;
      .notice-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 100%;
        height: 100%;
        color: #fff;
        border-radius: 8px 8px 0 0;
        background: #42a5fe;
        padding: 0 20px;
        margin: 10px auto;
        .notice-title {
          font-size: 24px;
          display: flex;
          align-items: center;
          width: calc(100% - 60px);
          .iconfont {
            display: block;
            width: 40px;
            margin-right: 10px;
          }
          span {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: calc(100% - 50px);
          }
        }
        .notice-btn {
          width: 60px;
          text-align: right;
        }
      }
    }
    .my-header-nav {
      color: #fff;
      display: flex;
      justify-content: space-between;
      line-height: 80px;
      .my-header-nav-left {
        width: 400px;
      }
      .my-header-nav-btn {
        display: flex;
        .my-header-nav-icon {
          // width: 60px;
          height: 80px;
          line-height: 80px;
          // margin-left: 20px;
          text-align: center;
          display: flex;
          padding: 0 10px;
          .iconfont {
            font-size: 48px;
          }
        }
      }
    }
    .van-search {
      padding: 0;
      margin-bottom: 10px;
    }
    @keyframes one {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    .search-enter-active {
      transform-origin: center;
      animation: one 0.5s;
    }
    .search-leave-active {
      transform-origin: center;
      animation: one 0.5s reverse;
    }
    .my-header-tab {
      margin: 20px 0;
    }
  }
  .my-header-radius-bg {
    position: absolute;
    width: 100%;
    height: 40px;
    background: #0186fd;
    bottom: -38px;
    z-index: -1;
  }
  .my-header-radius-bg::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 60px;
    background: #0186fd;
    z-index: -1;
    border-radius: 50%;
    bottom: -30px;
  }
  .switch-role{
    background: #f5f5f5;
    ul{
      background: #fff;
      li{
        line-height: 80px;
        text-align: center;
        button{
          width: 100%;
          display: block;
          border: none;
          outline: none;
          background: none;
          text-align: center;
        }
        &.active-role{
          color: $color-primary;
        }
      }
    }
    .switch-role-cancel{
      line-height: 80px;
      text-align: center;
      background: #fff;
      margin-top: 10px;
    }
  }
}
</style>
