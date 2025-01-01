<template>
  <v-row>
    <v-col cols="12">
      <user-list />
    </v-col>
  </v-row>
</template>

<script>
import UserList from '@/components/admin/UserList.vue'

export default {
  name: 'UsersPage',
  components: {
    UserList
  }
}
</script>
