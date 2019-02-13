<template>
  <div>
    <div v-if="requestError">
      <error-alert @dismissed="onDismissed" :text="requestError"></error-alert>
    </div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My expences</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <create-expence-dialog></create-expence-dialog>

      <edit-expence-dialog :editedId="editedId"></edit-expence-dialog>

      <v-dialog v-model="dialog" max-width="250">
        <v-card>
          <v-card-text class="text-xs-center subheading">Are you sure ?</v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat="flat" outline @click="dialog = false" small>Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" flat="flat" outline @click="deleteItem(itemToDelete)" small>Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="expences" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.summ | formtatNumbers}} $</td>
        <td class="text-xs-center">{{ props.item.date }}</td>
        <td class="text-xs-center">{{ props.item.comment }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="showDeleteDialog(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">no expences</template>
    </v-data-table>

    <v-layout justify-center>
      <v-flex xs12 md8>
        <div class="pt-2" ref="button-holder">
          <v-btn
            color="primary"
            id="show_all_button"
            @click="resetExpencesDateFilter(); activatedButton = 1;"
            small
            :class="{'v-btn--active': activatedButton === 1 }"
          >All</v-btn>
          <v-btn
            color="primary"
            id="show_month_button"
            @click="getCurrenthMonthExpences(); activatedButton = 2;"
            small
            :class="{'v-btn--active': activatedButton === 2 }"
          >Currenth month</v-btn>
          <v-btn
            color="primary"
            id="show_tree_month_button"
            small
            @click="getLastTreMonthsExpences(); activatedButton = 3;"
            :class="{'v-btn--active': activatedButton === 3 }"
          >Current three months</v-btn>
          <v-btn
            color="primary"
            id="show_four_month_button"
            small
            @click="getCurrentYearExpences();  activatedButton = 4;"
            :class="{'v-btn--active': activatedButton === 4 }"
          >Current year</v-btn>
        </div>
      </v-flex>
      <v-flex xs12 md4>
        <h4 class="mt-4 mb-4 text-uppercase text-lg-right">Total: {{totalSumm | formtatNumbers}} $</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex lg6>
        <v-sheet
          class="v-sheet--offset mx-auto expences-sparkline"
          color="white"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            v-if="!expences.length"
            :labels="sparklineDataGetter.sparklineLabels"
            :value="sparklineDataGetter.sparklineValues"
            color="primary"
            line-width="1"
            padding="16"
          ></v-sparkline>
          <v-sparkline
            v-if="expences.length"
            :labels="sparklineDataGetter.sparklineLabels"
            :value="sparklineDataGetter.sparklineValues"
            :key="sparklineDataGetter.sparklineValues.toString()"
            color="primary"
            line-width="1"
            padding="16"
            auto-draw
          ></v-sparkline>
        </v-sheet>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    editedId: "",
    monthsCount: 12,
    curentMonthNumber: new Date().getMonth() + 1,
    sorting: "",
    dialog: false,
    itemToDelete: {},
    activatedButton: 1,
    number: 12
  }),
  computed: {
    headers() {
      return this.$store.state.headers;
    },
    expences() {
      return this.$store.getters.filteredByDateExpences !== null
        ? this.$store.getters.filteredByDateExpences
        : this.$store.state.expences;
    },
    totalSumm() {
      let totalSumm = 0;
      for (let i = 0, len = this.expences.length; i < len; i++) {
        totalSumm += parseInt(this.expences[i].summ);
      }
      return totalSumm;
    },
    requestError() {
      return this.$store.getters.requestError;
    },
    sparklineDataGetter() {
      return this.$store.getters.sparklineDataGetter(
        this.monthsCount,
        this.curentMonthNumber
      );
    }
  },
  created() {
    this.initialize();
    this.$store.dispatch("getExpences");
  },
  filters: {
    formtatNumbers: function(num) {
      return Number(num).toLocaleString();
    }
  },
  methods: {
    initialize() {},
    activateButton(e) {
      this.buttonText = e.target.innerText;
      console.log(e.target.innerText);
    },
    editItem(item) {
      this.editedId = item.id;
      this.$store.commit("changeEditDialogModalState", true);
      this.$store.commit("createEditableItem", item);
    },
    showDeleteDialog(item) {
      this.dialog = true;
      this.itemToDelete = item;
    },
    deleteItem(item) {
      this.dialog = false;
      this.$store.dispatch("deleteExpence", item);
    },
    getCurrenthMonthExpences() {
      let date = new Date();
      let currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 2)
        .toISOString()
        .substr(5, 2);
      this.curentMonthNumber = currentMonthDate;
      this.monthsCount = 1;
      this.$store.commit("getCurrenthMonthExpences");
    },
    getLastTreMonthsExpences() {
      let date = new Date();
      let currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 2)
        .toISOString()
        .substr(5, 2);

      this.curentMonthNumber = currentMonthDate;

      this.monthsCount = 3;
      this.$store.commit("getLastTreMonthsExpences");
    },
    getCurrentYearExpences() {
      this.monthsCount = 12;
      this.$store.commit("getCurrentYearExpences");
    },
    resetExpencesDateFilter() {
      this.monthsCount = 12;
      this.$store.commit("resetExpencesDateFilter");
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style>
.expences-sparkline {
  margin-left: 3px !important;
}

/* .elevation-1 {
  min-height: 310px;
} */
</style>
