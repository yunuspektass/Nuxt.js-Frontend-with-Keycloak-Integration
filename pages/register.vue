<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="justify-center">
            <h3>Yeni Kullanıcı Kaydı</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="register">
              <v-text-field
                v-model="form.userName"
                :rules="[rules.required]"
                label="Kullanıcı Adı"
                required
              />

              <v-text-field
                v-model="form.firstName"
                :rules="[rules.required]"
                label="Ad"
                required
              />

              <v-text-field
                v-model="form.lastName"
                :rules="[rules.required]"
                label="Soyad"
                required
              />

              <v-text-field
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                label="E-posta"
                required
              />

              <v-text-field
                v-model="form.password"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                label="Şifre"
                required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />

              <v-btn
                block
                color="primary"
                :loading="loading"
                :disabled="!valid"
                class="mt-4"
                @click="register"
              >
                Kaydet
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RegisterPage',

  data: () => ({
    valid: false,
    showPassword: false,
    form: {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    rules: {
      required: v => !!v || 'Bu alan zorunludur',
      email: v => /.+@.+\..+/.test(v) || 'E-posta geçerli değil',
      min: v => v.length >= 6 || 'Şifre en az 6 karakter olmalıdır'
    }
  }),

  computed: {
    ...mapState('users', ['loading'])
  },

  methods: {
    ...mapActions('users', ['registerUser']),

    async register() {
      if (!this.$refs.form.validate()) { return }

      try {
        await this.registerUser(this.form)
        this.$toast.success('Kullanıcı başarıyla oluşturuldu')
        this.$router.push('/admin/users')
      } catch (error) {
        this.$toast.error('Kullanıcı oluşturulurken hata oluştu: ' + error.message)
      }
    }
  }
}
</script>
