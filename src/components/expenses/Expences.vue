<template>
  <div>
    <div v-if="requestError">
        <error-alert @dismissed="onDismissed" :text='requestError'></error-alert>
    </div>
    <v-toolbar flat color="white" >
      <v-toolbar-title>My expences</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <create-expence-dialog></create-expence-dialog>

      <edit-expence-dialog :editedId="editedId"></edit-expence-dialog>

       <v-dialog
      v-model="dialog"
      max-width="250"
      >
      <v-card>
            <v-card-text class="text-xs-center subheading">
              Are you sure ?
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                flat="flat"
                outline 
                @click="dialog = false"
                small
              >
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                flat="flat"
                outline
                @click="deleteItem(itemToDelete)"
                small
              >
                Yes
              </v-btn>
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
        <td class="text-xs-center">{{ props.item.title }}</td>
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
            @click="showDeleteDialog(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        no expences 
      </template>
    </v-data-table>

        <v-layout justify-center>
            <v-flex xs12 md8 >
              <div class="pt-2">
                <v-btn color="primary" @click="resetExpencesDateFilter" small >All</v-btn>
                <v-btn color="primary" @click="getCurrenthMonthExpences" small >Currenth month</v-btn>
                <v-btn color="primary" small @click="getLastTreMonthsExpences">Current three months</v-btn>
                <v-btn color="primary" small @click="getCurrentYearExpences">Current year</v-btn>
              </div>
            </v-flex>
            <v-flex xs12 md4 >
              <h4 class="mt-4 mb-4 text-uppercase text-lg-right" >Total: {{totalSumm}} $</h4>
            </v-flex>
        </v-layout>
        <v-layout>
          <v-flex lg12 >
              <v-sheet
                class="v-sheet--offset mx-auto"
                color="white"
                elevation="12"
                max-width="calc(50% - 32px)"
              >
                <v-sparkline
                  :labels="sparklineLabels"
                  :value="sparklineValues"
                  color="primary"
                  line-width="1"
                  padding="16"
                ></v-sparkline>
              </v-sheet>
            </v-flex>
        </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      editedId: '',
      curentMonth: new Date().getMonth() + 1,
      sorting: '',
      dialog: false,
      itemToDelete:{},
      sparklineLabels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }),
    computed: {
      headers() {
        return this.$store.state.headers;
      },
      expences() {
        return this.$store.getters.filteredByDateExpences.length 
        ? this.$store.getters.filteredByDateExpences 
        : this.$store.state.expences;
      },
      totalSumm() {
        let totalSumm = 0;
        for(let i = 0, len = this.expences.length; i < len; i++){
          totalSumm += parseInt(this.expences[i].summ);
        }
        return totalSumm
      },
      requestError(){
        return this.$store.getters.requestError
      },
      sparklineValues(){
        return this.$store.getters.sparklineValues
      }
    },

    created () {
      this.initialize();
      this.$store.dispatch("getExpences");

    },

    methods: {
      initialize () {
      },
      editItem (item) {
        this.editedId = item.id;
        this.$store.commit('changeEditDialogModalState', true);
        this.$store.commit('createEditableItem', item);
      },
      showDeleteDialog (item) {
        this.dialog = true;
        this.itemToDelete = item;
      },

      deleteItem(item) {
        this.dialog = false;
        this.$store.dispatch("deleteExpence", item);
      },
      getCurrenthMonthExpences(){
        this.$store.commit('getCurrenthMonthExpences')
      },
      getLastTreMonthsExpences(){
        this.$store.commit('getLastTreMonthsExpences')
      },
      getCurrentYearExpences(){
        this.$store.commit('getCurrentYearExpences')
      },
      resetExpencesDateFilter(){
        this.$store.commit('resetExpencesDateFilter')
      },
      onDismissed() {
        this.$store.dispatch("clearError");
      },
    }
  }
</script>