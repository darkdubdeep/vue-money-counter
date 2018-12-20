<template>
  <div>
    <v-toolbar flat color="white" class="mt-5">
      <v-toolbar-title>My expences</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <create-expence-dialog></create-expence-dialog>

      <edit-expence-dialog :editedIndex="editedIndex"></edit-expence-dialog>

    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="expences"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.expence_name }}</td>
        <td class="text-xs-center">{{ props.item.summ }} $</td>
        <td class="text-xs-center">{{ props.item.date }}</td>
        <td class="text-xs-center">{{ props.item.comment }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
      <div class="text-xs-center pt-2">
        <h3 class="mt-4 mb-4 text-uppercase"  absolute>Total: 1111 $</h3>
        <v-btn color="primary" @click="getAllExpences">All</v-btn>
        <v-btn color="primary" @click="getCurrenthMonthExpences">Curenth month</v-btn>
        <v-btn color="primary" @click="getLastTreMonthExpences">Last three months</v-btn>
        <v-btn color="primary" @click="getCurrentYearExpences">Last year</v-btn>
      </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      editedIndex: -1,
      curentMonth: new Date().getMonth() + 1
    }),
    computed: {
      headers() {
        return this.$store.state.headers;
      },
      expences() {
        return this.$store.state.expences;
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
      },
      editItem (item) {
        this.editedIndex = this.expences.indexOf(item);
        this.$store.commit('changeEditDialogModalState', true);
        this.$store.commit('createEditableItem', item);
      },
      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') 
        && this.$store.dispatch("deleteExpence", item);
      },
      getAllExpences(){
         
      },
      getCurrenthMonthExpences(){
         let fomratedMonth = ("0" + this.curentMonth).slice(-2);
         let filteredExpences = this.expences.filter(
           expence => expence.date.substring(5,7) == fomratedMonth 
         )
      },
      getLastTreMonthExpences(){
          let filteredExpences = this.expences.filter (
           expence => parseInt(expence.date.substring(5,7)) == this.curentMonth 
           || parseInt(expence.date.substring(5,7)) == this.curentMonth - 1
           || parseInt(expence.date.substring(5,7)) == this.curentMonth - 2
          )
          console.log(filteredExpences);
      },
      getCurrentYearExpences(){
        
      }
    }
  }
</script>