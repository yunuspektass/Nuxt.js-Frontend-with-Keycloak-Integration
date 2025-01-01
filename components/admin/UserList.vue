<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon large left class="mr-2">
              mdi-account-group
            </v-icon>
            Kullanıcı Listesi
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Ara"
              single-line
              hide-details
              class="mr-4"
              style="max-width: 300px"
            />
          </v-card-title>

          <v-card-text class="pb-0">
            <v-btn
              color="primary"
              class="mb-4"
              @click="$router.push('/register')"
            >
              <v-icon left>mdi-account-plus</v-icon>
              Yeni Kullanıcı Ekle
            </v-btn>
          </v-card-text>

          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            :loading="loading"
            loading-text="Kullanıcılar yükleniyor..."
          >
            <template #[`item.emailVerified`]="{ item }">
              <v-chip :color="item.emailVerified ? 'success' : 'warning'" small>
                {{ item.emailVerified ? 'Doğrulanmış' : 'Doğrulanmamış' }}
              </v-chip>
            </template>

            <template #[`item.enabled`]="{ item }">
              <v-chip :color="item.enabled ? 'success' : 'error'" small>
                {{ item.enabled ? 'Aktif' : 'Pasif' }}
              </v-chip>
            </template>

            <template #[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="editUser(item)"
                  >
                    <v-icon color="primary">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Düzenle</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="confirmDelete(item)"
                  >
                    <v-icon color="error">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Sil</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Kullanıcıyı Silme
        </v-card-title>
        <v-card-text>
          {{ selectedUser?.username }} adlı kullanıcıyı silmek istediğinizden emin misiniz?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            İptal
          </v-btn>
          <v-btn
            color="error"
            text
            @click="deleteUserConfirmed"
          >
            Sil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserList',

  data: () => ({
    search: '',
    deleteDialog: false,
    selectedUser: null,
    headers: [
      { text: 'Kullanıcı Adı', value: 'username', sortable: true },
      { text: 'Ad', value: 'firstName', sortable: true },
      { text: 'Soyad', value: 'lastName', sortable: true },
      { text: 'Email', value: 'email', sortable: true },
      { text: 'Email Durumu', value: 'emailVerified', sortable: true },
      { text: 'Durum', value: 'enabled', sortable: true },
      { text: 'İşlemler', value: 'actions', sortable: false }
    ]
  }),

  computed: {
    ...mapState('users', ['users', 'loading', 'error'])
  },

  mounted () {
    this.fetchUsers()
  },

  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),

    editUser(user) {
      this.$router.push(`/admin/edit/${user.id}`)
    },

    confirmDelete(user) {
      this.selectedUser = user
      this.deleteDialog = true
    },

    async deleteUserConfirmed () {
      if (this.selectedUser) {
        try {
          await this.deleteUser(this.selectedUser.id)
          this.$toast.success('Kullanıcı başarıyla silindi')
        } catch (error) {
          this.$toast.error('Kullanıcı silme hatası')
        }
        this.deleteDialog = false
        this.selectedUser = null
      }
    }
  }
}
</script>
