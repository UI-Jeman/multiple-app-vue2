<template>
  <component :is="roleInfo.viewName" class="home-page"></component>
</template>

<script>
  import ViewAdmin from './components/view-admin.vue'
  import ViewUser from './components/view-user.vue'
  import ViewUnauth from './components/view-unauth.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: { ViewAdmin, ViewUser, ViewUnauth },
    computed: {
      ...mapGetters(['isAdmin', 'isUser']),
      roleInfo() {
        const { isAdmin, isUser } = this
        const views = [
          { roleFlag: isAdmin, viewName: 'view-admin', name: '管理员' },
          { roleFlag: isUser, viewName: 'view-user', name: '教师' }
        ]
        return views.find(({ roleFlag }) => roleFlag) || { viewName: 'view-unauth', name: '无权限' }
      }
    }
  }
</script>
