<template>
  <v-container>
    <v-card>
      <v-card-title>
        Kullanıcı Düzenle
        <v-spacer />
        <v-btn color="primary" text @click="$router.push('/admin/users')">
          <v-icon left>
            mdi-arrow-left
          </v-icon>
          Geri Dön
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveUser">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="userForm.firstName"
                label="Ad"
                :rules="nameRules"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="userForm.lastName"
                label="Soyad"
                :rules="nameRules"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="userForm.email"
                label="E-posta"
                :rules="emailRules"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-switch
                v-model="userForm.enabled"
                label="Kullanıcı Aktif"
                color="success"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-switch
                v-model="userForm.emailVerified"
                label="E-posta Doğrulanmış"
                color="success"
              />
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :loading="loading"
              color="primary"
              type="submit"
              :disabled="!valid"
            >
              Kaydet
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserEdit',

  data: () => ({
    valid: false,
    userForm: {
      firstName: '',
      lastName: '',
      email: '',
      emailVerified: false,
      enabled: true
    },
    nameRules: [
      v => !!v || 'Bu alan zorunludur',
      v => v.length >= 2 || 'En az 2 karakter olmalıdır'
    ],
    emailRules: [
      v => !!v || 'E-posta zorunludur',
      v => /.+@.+\..+/.test(v) || 'E-posta geçerli değil'
    ]
  }),

  computed: {
    ...mapState('users', ['selectedUser', 'loading', 'error'])
  },

  async created () {
    if (this.$route.params.id) {
      await this.getUserById(this.$route.params.id)
      if (this.selectedUser) {
        this.userForm = { ...this.selectedUser }
      }
    }
  },

  methods: {
    ...mapActions('users', ['getUserById', 'updateUser']),

    async saveUser () {
      if (this.$refs.form.validate()) {
        try {
          await this.updateUser({
            id: this.$route.params.id,
            userData: this.userForm
          })
          this.$toast.success('Kullanıcı başarıyla güncellendi')
          this.$router.push('/admin/users')
        } catch (error) {
          this.$toast.error('Kullanıcı güncellenirken bir hata oluştu')
        }
      }
    }
  }
}
</script>
