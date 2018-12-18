<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My expences</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <create-expence-dialog></create-expence-dialog>

      <edit-expence-dialog :item="expenceToEdit" :editedIndex="editedIndex"></edit-expence-dialog>

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
  </div>
</template>

<script>
  export default {
    data: () => ({
      expenceToEdit: {},
      editedIndex:-1
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
        console.log(this.editedIndex);
        this.expenceToEdit = item;
        this.$store.commit('ChangeEditDialogModalState', true)
      },
      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') 
        && this.$store.dispatch("deleteExpence", item);
      },
    }
  }
</script>