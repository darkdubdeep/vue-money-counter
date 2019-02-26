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
              <v-text-field
                :error-messages="titleErrors"
                v-model="newExpence.title"
                label="Expence name"
                @input="$v.newExpence.title.$touch()"
                @blur="$v.newExpence.title.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="newExpence.summ"
                label="Sum"
                :error-messages="summErrors"
                @input="$v.newExpence.summ.$touch()"
                @blur="$v.newExpence.summ.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-menu v-model="datePicker" full-width max-width="290">
                <v-text-field
                  slot="activator"
                  :error-messages="dateErrors"
                  clearable
                  readonly
                  v-model="newExpence.date"
                  label="Date"
                  @input="$v.newExpence.date.$touch()"
                  @blur="$v.newExpence.date.$touch()"
                ></v-text-field>
                <v-date-picker v-model="newExpence.date" @change="menu1 = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-textarea v-model="newExpence.comment" label="Comment"></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    newExpence: {
      title: { required },
      summ: { required, numeric, maxLength: maxLength(8) },
      date: { required },
      testParams: { required }
    }
  },

  data: () => ({
    datePicker: false,
    dialog: false,
    newExpence: {
      title: "",
      id: "",
      summ: null,
      date: "",
      comment: ""
    },
    defaultExpence: {
      title: "",
      summ: null,
      date: "",
      comment: ""
    }
  }),
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.newExpence.title.$dirty) return errors;
      !this.$v.newExpence.title.required && errors.push("Title is required");
      return errors;
    },
    summErrors() {
      const errors = [];
      if (!this.$v.newExpence.summ.$dirty) return errors;
      !this.$v.newExpence.summ.numeric && errors.push("Must be a number");
      !this.$v.newExpence.summ.maxLength &&
        errors.push("Max lenght is 8 digits");
      !this.$v.newExpence.summ.required && errors.push("Summ is required");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.newExpence.date.$dirty) return errors;
      !this.$v.newExpence.date.required && errors.push("Date is required");
      return errors;
    }
  },
  methods: {
    setTitle(value) {
      this.newExpence.title = value;
      this.$v.name.$touch();
    },
    save() {
      this.$v.$touch();
      if (
        !this.titleErrors.length &&
        !this.summErrors.length &&
        !this.dateErrors.length
      ) {
        this.$store.dispatch("createExpence", this.newExpence);
        this.newExpence = Object.assign({}, this.defaultExpence);
        this.$v.$reset();
        this.close();
      }
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
