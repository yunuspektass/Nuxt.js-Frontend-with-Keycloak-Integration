<template>
  <v-app-bar app dark color="primary">
    <v-toolbar-title>Kullanıcı Paneli</v-toolbar-title>

    <v-spacer />

    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          {{ userData.username }}
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="$router.push('/user/profile')">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Profil</v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Çıkış Yap</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserHeader',

  computed: {
    ...mapGetters('user-auth', ['userData'])
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Çıkış yapırken bir hata oluştu', error)
      }
    }
  }
}
</script>
