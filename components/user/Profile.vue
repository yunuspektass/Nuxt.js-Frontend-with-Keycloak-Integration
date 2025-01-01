<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon large class="mr-2">
              mdi-account-circle
            </v-icon>
            Profil Bilgileri
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="form.firstName"
                :rules="[rules.required]"
                label="Ad"
                :loading="loading"
                :disabled="!isEditing"
              />

              <v-text-field
                v-model="form.lastName"
                :rules="[rules.required]"
                label="Soyad"
                :loading="loading"
                :disabled="!isEditing"
              />

              <v-text-field
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                label="E-Posta"
                :loading="loading"
                :disabled="!isEditing"
              />

              <v-row>
                <v-col cols="6">
                  <v-switch
                    v-model="form.emailVerified"
                    label="E-Posta Doğrulandı"
                    :loading="loading"
                    disabled
                  />
                </v-col>
                <v-col cols="6">
                  <v-switch
                    v-model="form.enabled"
                    label="Hesap Durumu"
                    :loading="loading"
                    disabled
                  />
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer />
                <template v-if="!isEditing">
                  <v-btn
                    color="primary"
                    @click="startEditing"
                  >
                    <v-icon left>
                      mdi-pencil
                    </v-icon>
                    Düzenle
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                    text
                    @click="cancelEditing"
                  >
                    <v-icon left>
                      mdi-close
                    </v-icon>
                    İptal
                  </v-btn>
                  <v-btn
                    color="success"
                    :loading="loading"
                    :disabled="!valid"
                    @click="updateProfile"
                  >
                    <v-icon left>
                      mdi-content-save
                    </v-icon>
                    Kaydet
                  </v-btn>
                </template>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',

  data() {
    return {
      valid: true,
      isEditing: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        emailVerified: false,
        enabled: false
      },
      rules: {
        required: v => !!v || 'Bu alan zorunludur',
        email: v => /.+@.+\..+/.test(v) || 'Geçerli bir e-posta adresi giriniz'
      },
      originalForm: null
    }
  },

  computed: {
    ...mapState('users', ['loading', 'error']),

    currentUser() {
      return this.$auth.user?.user
    }
  },

  created() {
    try {
      this.form = {
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        emailVerified: this.currentUser.emailVerified,
        enabled: this.currentUser.enabled
      }
      this.originalForm = { ...this.form }
    } catch (error) {
      this.$toast.error('Profil bilgileri yüklenirken bir hata oluştu')
    }
  },

  methods: {
    ...mapActions('users', ['updateUser']),

    startEditing() {
      this.isEditing = true
    },

    cancelEditing() {
      this.form = { ...this.originalForm }
      this.isEditing = false
      this.$refs.form.resetValidation()
    },

    async updateProfile() {
      if (!this.$refs.form.validate()) { return }

      try {
        await this.updateUser({
          id: this.currentUser.id,
          userData: this.form
        })

        this.originalForm = { ...this.form }
        this.isEditing = false
        this.$toast.success('Peofil başarıyla güncellendi')
      } catch (error) {
        this.$toast.error('Profil güncellenirken bir hata oluştu')
      }
    }
  }

}
</script>
