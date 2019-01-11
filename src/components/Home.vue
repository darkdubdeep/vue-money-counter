<template>
<div>
 <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MONEY</span>
        <span class="font-weight-light">COUNTER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">LOGOUT</span>
      </v-btn>
    </v-toolbar>
    <v-container>
      <Expences></Expences>
    </v-container>
</div>
</template>

<script>
import Expences from './expenses/Expences'
  export default {
    components: {
      Expences
    },
    data () {
      return {
      }
    }
  }
</script>

<style>

</style>
