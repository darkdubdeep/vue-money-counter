<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Create expence</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="newExpence.expence_name" label="Expence name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="newExpence.summ" label="Summ"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu
                        v-model="datePicker"
                        full-width
                        max-width="290"
                      >
                        <v-text-field
                          slot="activator"
                          clearable
                          readonly
                          v-model="newExpence.date" label="Date"
                        ></v-text-field>
                        <v-date-picker
                          v-model="newExpence.date"
                          @change="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="newExpence.comment" label="Comment"></v-text-field>
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

</template>

<script>
export default {
    data: () => ({
      datePicker: false,
      dialog: false,
      newExpence: {
        expence_name: '',
        summ: null,
        date: '',
        comment: '',
      },
      defaultExpence: {
        expence_name: '',
        summ: null,
        date: '',
        comment: '',
      }
    }),
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
      save () {
        this.$store.dispatch("createExpence", this.newExpence);
        this.newExpence = Object.assign({}, this.defaultExpence)
        this.close()
      },
      close () {
        this.dialog = false
      },
    }

}
</script>
