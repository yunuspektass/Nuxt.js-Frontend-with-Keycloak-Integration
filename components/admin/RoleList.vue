<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Roller
        <v-spacer />
        <v-btn color="primary" @click="openCreateDialog">
          Yeni Rol Ekle
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="roles"
        :loading="loading"
      >
        <template #[`item.actions`]="{ item }">
          <v-icon color="error" class="mr-2" @click="deleteRole(item.name)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Yeni Rol Ekle</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="newRole.name"
              label="Rol Adı"
              required
            />
            <v-text-field
              v-model="newRole.description"
              label="Açıklama"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog">
            İptal
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveRole">
            Kaydet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'RoleList',
  data() {
    return {
      loading: false,
      dialog: false,
      valid: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Rol Adı', value: 'name' },
        { text: 'İşlemler', value: 'actions', sortable: false }
      ],
      newRole: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    roles() {
      return this.$store.state.roles.roles
    }
  },
  async created() {
    await this.fetchRoles()
  },
  methods: {
    async fetchRoles() {
      this.loading = true
      try {
        await this.$store.dispatch('roles/fetchRoles')
      } catch (error) {
        this.$toast.error('Roller getirilirken bir hata oluştu')
      } finally {
        this.loading = false
      }
    },
    openCreateDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.newRole = {
        name: '',
        description: ''
      }
    },
    async saveRole() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch('roles/createRole', this.newRole)
          this.closeDialog()
          this.$toast.success('Rol başarıyla oluşturuldu')
        } catch (error) {
          this.$toast.error('Rol oluşturulurken bir hata oluştu')
        }
      }
    },
    async deleteRole(roleName) {
      if (confirm('Rolü silmek istediğinizden emin misiniz?')) {
        try {
          await this.$store.dispatch('roles/deleteRole', roleName)
          this.$toast.success('Rol başarıyla silindi')
        } catch (error) {
          this.$toast.error('Rol silinirken bir hata oluştu')
        }
      }
    }
  }
}
</script>
