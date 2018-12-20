import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
          align: 'center' 
        },
        { 
          text: 'Date', 
          value: 'date',  
          align: 'center' 
        },
        { 
          text: 'Comment', 
          value: 'comment', 
          align: 'center' 
        }
      ],
      expences: [
        {
          expence_name: 'Food',
          summ: 159,
          date: '2018-01-01',
          comment: 'empty comment',
        },
        {
          expence_name: 'Transport',
          summ: 237,
          date: '2018-10-01',
          comment: 'empty comment',
        },
        {
          expence_name: 'Food',
          summ: 262,
          date: '2018-10-01',
          comment: 'empty comment',
        },
        {
          expence_name: 'Food',
          summ: 159,
          date: '2018-02-01',
          comment: 'empty comment',
        },
        {
          expence_name: 'Transport',
          summ: 237,
          date: '2018-11-01',
          comment: 'empty comment',
        },
        {
          expence_name: 'Food',
          summ: 262,
          date: '2018-12-01',
          comment: 'empty comment',
        }
      ],
      editDialogWindowIsOpened: false,
      editableItem: {}
  },
  mutations: {
    createExpence(state, payload) {
      state.expences.push(payload);
    },
    changeEditDialogModalState(state, payload) {
      state.editDialogWindowIsOpened = payload
    },
    createEditableItem(state, payload){
        state.editableItem = Object.assign({}, payload);
    },
    saveChangesToEditedExpence(state, payload) {
      Object.assign(state.expences[payload.editedIndex], payload.editedItem)
    },
    deleteExpence(state, payload) {
      const index = state.expences.indexOf(payload);
      state.expences.splice(index, 1)
    }
  },
  getters:{
    currenthMonthExpences: state => {
      return state.expences
    }
  },
  actions: {
    createExpence({commit, getters}, payload) {
      commit("createExpence", payload)
    },
    saveChangesToEditedExpence({commit, getters}, payload) {
      commit("saveChangesToEditedExpence", payload);
    },
    deleteExpence({commit, getters},payload) {
      commit("deleteExpence", payload);
    }
  }
})
