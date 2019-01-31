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
        @click="logOut"
      >
        <span class="mr-2">LOGOUT</span>
      </v-btn>
    </v-toolbar>
    <v-container fluid class="expences-conteiner">
      <div  v-if="loading === true" > 
          <preloader-component></preloader-component>
      </div>
      <v-container>
        <Expences></Expences>
      </v-container>
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
    },
    methods: {
      logOut () {
      this.$store.dispatch('logout');
      this.$router.replace('/');
      }
    },
    computed: {
      loading(){
        return this.$store.getters.loading;
      }
    }
  }
</script>

<style>
.expences-conteiner {
    padding:0;
}
</style>
