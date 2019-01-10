<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card v-if="editableItem">
          <v-card-title>
            <span class="headline">Edit Expence</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editableItem.expence_name" label="Expence name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editableItem.summ" label="Summ"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-menu
                        v-model="datePicker"
                        full-width
                        max-width="290"
                        :close-on-content-click="false"

                      >
                        <v-text-field
                          slot="activator"
                          clearable
                          readonly
                          v-model="editableItem.date" label="Date"
                        ></v-text-field>
                        <v-date-picker
                          v-model="editableItem.date"
                          @change="datePicker = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editableItem.comment" label="Comment"></v-text-field>
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
    props:['editedId'],
    data: () => ({
      datePicker: false,
    }),
    computed: {
      dialog() {
        return this.$store.state.editDialogWindowIsOpened;
      },
      editableItem() {
        return this.$store.state.editableItem;
      }
    },
    methods: {
      save () {
        let expenceDataToEdit = {
          editedId: this.editedId,
          editedItem: this.editableItem
        }
        console.log(expenceDataToEdit);
        this.$store.dispatch("saveChangesToEditedExpence", expenceDataToEdit);
        this.close()
      },
      close() {
        this.$store.commit("changeEditDialogModalState", false)
      },
    }
}
</script>

