<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Admin Panel
          </v-card-title>
          <v-card-text>
            <p>Hoş geldiniz, {{ userData.username }}</p>
            <p>Üst menüden yönetim işlemlerine erişebilirsiniz.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminIndex',
  computed: {
    ...mapGetters('user-auth', ['userData'])
  }
}
</script>
