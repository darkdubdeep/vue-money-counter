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
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Expence</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.expence_name" label="Expence name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.summ" label="Summ"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu
                        v-model="menu1"
                        full-width
                        max-width="290"
                      >
                        <v-text-field
                          slot="activator"
                          clearable
                          readonly
                          v-model="editedItem.date" label="Date"
                        ></v-text-field>
                        <v-date-picker
                          v-model="editedItem.date"
                          @change="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.comment" label="Comment"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      dialog: false,
      editedIndex: -1,
      newExpence: {
        expence_name: 'new name',
        summ: 0,
        date: '2018-01-01',
        comment: '',
      },
      editedItem: {
        expence_name: 'new name',
        summ: 0,
        date: '2018-01-01',
        comment: '',
      },
      defaultItem: {
        expence_name: 'new name',
        summ: 0,
        date: '2018-01-01',
        comment: '',
      }
    }),

    computed: {
      headers() {
        return this.$store.state.headers;
      },
      expences() {
        return this.$store.state.expences;
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
      },

      createExpence(item){
          newExpence = Object.assign({}, item)
          this.dialog = true
      },
      editItem (item) {
        this.editedIndex = this.expences.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') 
        && this.$store.dispatch("deleteExpence", item);
      },
      // save edited expence
      save () {
        let expenceDataToEdit = {
          editedIndex: this.editedIndex,
          editedItem: this.editedItem
        }
        this.$store.dispatch("editExpence", expenceDataToEdit);
        this.close()
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    }
  }
</script>