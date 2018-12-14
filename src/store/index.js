import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
      expences: [
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
        },
      ],
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
  },
  mutations: {
    createExpence(state, payload) {
      state.expences.push(payload);
    },
    editExpence(state, payload) {
      Object.assign(state.expences[payload.editedIndex], payload.editedItem)
    },
    deleteExpence(state, payload) {
      const index = state.expences.indexOf(payload);
      state.expences.splice(index, 1)
    },
  },
  actions: {
    createExpence({commit, getters}, payload) {
      commit("createExpence", payload)
    },
    editExpence({commit, getters}, payload) {
      commit("editExpence", payload);
    },
    deleteExpence({commit, getters},payload) {
      commit("deleteExpence", payload);
    }
  }
})
