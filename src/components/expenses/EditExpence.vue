<template>
    <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card v-if="editableItem">
          <v-card-title>
            <span class="headline">Edit Expence</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field 
                    :error-messages="titleErrors"
                    v-model="editableItem.title"
                    label="Title"
                    @input="$v.editableItem.title.$touch()"
                    @blur="$v.editableItem.title.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field 
                    v-model="editableItem.summ" 
                    label="Summ"
                    :error-messages="summErrors"
                    @input="$v.editableItem.summ.$touch()"
                    @blur="$v.editableItem.summ.$touch()"
                  ></v-text-field>
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
                          :error-messages="dateErrors"
                          @input="$v.editableItem.date.$touch()"
                          @blur="$v.editableItem.date.$touch()"
                        ></v-text-field>
                        <v-date-picker
                          v-model="editableItem.date"
                          @change="datePicker = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field 
                    v-model="editableItem.comment" 
                    label="Comment"
                  ></v-text-field>
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

import { validationMixin } from 'vuelidate'
import { required, minLength, numeric } from 'vuelidate/lib/validators'

export default {
    props:['editedId'],

    mixins: [validationMixin],

    validations: {
      editableItem: {
        title: { required },
        summ:  { required, numeric },
        date:  { required },
        testParams: { required }
      }
    },

    data: () => ({
      datePicker: false,
    }),
    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.editableItem.title.$dirty) return errors
        !this.$v.editableItem.title.required && errors.push('Title is required')
        return errors
      },
      summErrors () {
        const errors = []
        if (!this.$v.editableItem.summ.$dirty) return errors
        !this.$v.editableItem.summ.numeric && errors.push('Must be a number')
        !this.$v.editableItem.summ.required && errors.push('Summ is required')
        return errors
      },
      dateErrors () {
        const errors = []
        if (!this.$v.editableItem.date.$dirty) return errors
        !this.$v.editableItem.date.required && errors.push('Date is required')
        return errors
      },
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
        if(!this.titleErrors.length && !this.summErrors.length && !this.dateErrors.length){
          this.$store.dispatch("saveChangesToEditedExpence", expenceDataToEdit);
          this.close()
        }
      },
      close() {
        this.$store.commit("changeEditDialogModalState", false)
      },
    }
}
</script>

