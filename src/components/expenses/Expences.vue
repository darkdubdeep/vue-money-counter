<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
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
                  <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
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
      :items="desserts"
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
      dialog: false,
      headers: [
        {
          text: 'Expence name',
          align: 'center',
          sortable: false,
          value: 'expence_name'
        },
        { 
          text: 'Summ', 
          value: 'summ', 
          align: 'center' },
        { 
          text: 'Date', 
          value: 'fat',  
          align: 'center' 
        },
        { 
          text: 'Comment', 
          value: 'carbs', 
          align: 'center' 
        }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        expence_name: 'new name',
        summ: 0,
        date: 0,
        comment: 0,
      },
      defaultItem: {
        expence_name: 'new name',
        summ: 0,
        date: 0,
        comment: 0,
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        this.desserts = [
          {
            expence_name: 'Food',
            summ: 159,
            date: '24.12.2018',
            comment: 'empty comment',
          },
          {
            expence_name: 'Transport',
            summ: 237,
            date: '24.12.2018',
            comment: 'empty comment',
          },
          {
            expence_name: 'Food',
            summ: 262,
            date: '24.12.2018',
            comment: 'empty comment',
          },
          {
            expence_name: 'Food',
            summ: 305,
            date: '24.12.2018',
            comment: 'empty comment',
          },
          {
            expence_name: 'Food',
            summ: 356,
            date: '24.12.2018',
            comment: 'empty comment',
          },
          {
            expence_name: 'Moovie',
            summ: 375,
            date: '24.12.2018',
            comment: 'empty comment',
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>