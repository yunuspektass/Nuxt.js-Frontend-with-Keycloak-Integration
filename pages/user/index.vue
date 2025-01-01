<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            Kullancı Panel
          </v-card-title>
          <v-card-text>
            <p>Hoş geldiniz, {{ userData.username }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserIndex',
  computed: {
    ...mapGetters('user-auth', ['userData'])
  }
}
</script>
