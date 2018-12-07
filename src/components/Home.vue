<template>
  <v-container>
    <h1>Home page</h1>
    <Expences></Expences>
  </v-container>
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
