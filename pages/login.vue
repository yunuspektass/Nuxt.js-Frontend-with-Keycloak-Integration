<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="4">
          <v-card-title class="justify-center">
            Giriş Yap
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="userName"
                label="Kullanıcı Adı"
                required
                :disabled="loading"
              />
              <v-text-field
                v-model="password"
                label="Şifre"
                type="password"
                required
                :disabled="loading"
              />
              <v-btn
                type="submit"
                color="primary"
                block
                :loading="loading"
              >
                Giriş Yap
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: 'guest',
  data: () => ({
    userName: '',
    password: '',
    loading: false
  }),

  methods: {
    async login() {
      try {
        this.loading = true
        await this.$auth.loginWith('local', {
          data: {
            userName: this.userName,
            password: this.password
          }
        })
      } catch (error) {
        console.error('Login error:', error)
        this.$toast.error('Kullanıcı adı veya şifre hatalı!')
      } finally {
        this.loading = false
      }
    }
  }
}

</script>
