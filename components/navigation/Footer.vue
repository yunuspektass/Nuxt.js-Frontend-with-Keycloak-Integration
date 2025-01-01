<template>
  <v-footer app padless>
    <v-card flat tile width="100%" class="text-center">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          class="mx-4"
          icon
          :href="icon.link"
          target="_blank"
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider />

      <v-card-text class="py-2">
        {{ new Date().getFullYear() }} — <strong>Keycloak App</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',

  data: () => ({
    icons: [
      { icon: 'mdi-github', link: 'https://github.com/yunuspektass' }
    ]
  })
}
</script>
