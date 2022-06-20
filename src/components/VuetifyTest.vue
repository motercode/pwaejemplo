  <script setup lang="ts">
import { createVuetify  } from 'vuetify'
const vuetify = createVuetify()

  </script>
  <template>
  <div v-if="!vuetify"> Vuetify its not working </div>
  <div v-else>
  <v-container fluid>
    <v-row align="center">
      <div>VUETIFY WORKS</div>
    </v-row>
  </v-container>
  </div>
  </template>