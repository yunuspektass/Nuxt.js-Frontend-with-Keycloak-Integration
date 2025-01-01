<template>
  <v-app>
    <template v-if="$auth.loggedIn">
      <admin-header v-if="isAdmin" />
      <user-header v-else />
    </template>

    <v-main>
      <nuxt />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminHeader from '@/components/navigation/AdminHeader.vue'
import UserHeader from '@/components/navigation/UserHeader.vue'
import AppFooter from '@/components/navigation/Footer.vue'
export default {
  components: {
    AdminHeader,
    UserHeader,
    AppFooter
  },
  computed: {
    ...mapGetters('user-auth', ['isAdmin'])
  }
}
</script>
