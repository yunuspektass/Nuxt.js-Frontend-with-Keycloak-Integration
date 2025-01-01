<template>
  <v-row>
    <v-col cols="12" xl="6">
      <role-list />
    </v-col>
    <v-col cols="12" xl="6">
      <user-role-edit />
    </v-col>
  </v-row>
</template>

<script>
import RoleList from '@/components/admin/RoleList.vue'
import UserRoleEdit from '@/components/admin/UserRoleEdit.vue'

export default {
  components: {
    RoleList,
    UserRoleEdit
  }
}
</script>
