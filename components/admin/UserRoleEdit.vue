<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h3>Kullanıcı Rol Yönetimi</h3>
      </v-card-title>

      <v-card-text>
        <v-tabs v-model="activeTab">
          <v-tab v-for="user in users" :key="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="user in users" :key="user.id">
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-subheader>
                      Mevcut Roller
                    </v-subheader>
                    <v-list>
                      <v-list-item v-for="role in userRoles" :key="role.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ role.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn
                            icon
                            color="error"
                            @click="removeRole(role)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                    <v-alert
                      v-if="userRoles.length === 0"
                      type="info"
                      dense
                      text
                    >
                      Kullanıcıya atanmış rol bulunmamaktadır.
                    </v-alert>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-subheader>Eklenebilir Roller</v-subheader>
                    <v-list>
                      <v-list-item v-for="role in availableRoles" :key="role.id">
                        <v-list-item-content>
                          <v-list-item-title>{{ role.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn
                            icon
                            color="success"
                            :disabled="userRoles.length > 0"
                            @click="assignRole(role)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                    <v-alert
                      v-if="userRoles.length > 0"
                      type="warning"
                      dense
                      text
                    >
                      Kullanıcının zaten bir rolü bulunmaktadır. Yeni rol eklemek için önce mevcut rolü kaldırınız.
                    </v-alert>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserRoleEdit',

  data() {
    return {
      availableRoles: [],
      activeTab: 0
    }
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
      userRoles: state => state.userRoles.userRoles,
      allRoles: state => state.roles.roles
    }),

    selectedUserId() {
      return this.users[this.activeTab]?.id
    }
  },

  watch: {
    activeTab: {
      handler(newVal) {
        if (this.selectedUserId) {
          this.loadUserRoles()
        }
      }
    },

    users: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.lenght > 0 && !this.userRoles.length) {
          this.loadUserRoles()
        }
      }
    }
  },

  async created() {
    try {
      await Promise.all([
        this.fetchUsers(),
        this.fetchRoles()
      ])
      if (this.users && this.users.length > 0) {
        await this.loadUserRoles()
      }
    } catch (error) {
      this.$toast.error('Veriler yüklenirken bir hata oluştu:' + error.message)
    }
  },

  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
      fetchRoles: 'roles/fetchRoles',
      getUserRoles: 'userRoles/getUserRoles',
      assignRoles: 'userRoles/assignRoles',
      removeRoles: 'userRoles/removeRoles'
    }),

    async loadUserRoles() {
      if (!this.selectedUserId) { return }

      await this.getUserRoles(this.selectedUserId)
      this.updateAvailableRoles()
    },

    updateAvailableRoles() {
      this.availableRoles = this.allRoles.filter(role =>
        !this.userRoles.some(userRole => userRole.id === role.id)
      )
    },

    async assignRole(role) {
      try {
        await this.assignRoles({
          userId: this.selectedUserId,
          roles: [role]
        })
        await this.loadUserRoles()
        this.$toast.success('Rol başarıyla eklendi')
      } catch (error) {
        this.$toast.error('Rol eklenirken bir hata oluştu: ' + error.message)
      }
    },

    async removeRole(role) {
      try {
        await this.removeRoles({
          userId: this.selectedUserId,
          roles: [role]
        })
        await this.loadUserRoles()
        this.$toast.success('Rol başarıyla kaldırıldı')
      } catch (error) {
        this.$toast.error('Rol kaldırılırken bir hata oluştu: ' + error.message)
      }
    }
  }
}
</script>
