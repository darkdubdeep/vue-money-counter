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
      <div class="text-xs-center pt-2">
        <h3 class="mt-4 mb-4 text-uppercase" absolute>Total: {{totalSumm}} $</h3>
        <v-btn color="primary" @click="resetExpencesDateFilter">All</v-btn>
        <v-btn color="primary" @click="getCurrenthMonthExpences">Currenth month</v-btn>
        <v-btn color="primary" @click="getLastTreMonthsExpences">Current three months</v-btn>
        <v-btn color="primary" @click="getCurrentYearExpences">Current year</v-btn>
      </div>
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
    }),
    computed: {
      headers() {
        return this.$store.state.headers;
      },
      expences() {
        console.log(this.$store.state.expences);
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
    }
  }
</script>