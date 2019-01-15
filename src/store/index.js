import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
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
          id:"1",
          expence_name: 'Food',
          summ: 159,
          date: '2018-01-01',
          comment: 'empty comment',
        },
        {
          id:"2",
          expence_name: 'Transport',
          summ: 237,
          date: '2018-10-21',
          comment: 'empty comment',
        },
        {
          id:"3",
          expence_name: 'Food',
          summ: 262,
          date: '2018-10-01',
          comment: 'empty comment',
        },
        {
          id:"4",
          expence_name: 'Food',
          summ: 159,
          date: '2018-12-15',
          comment: 'empty comment',
        },
        {
          id:"5",
          expence_name: 'Transport',
          summ: 237,
          date: '2019-11-01',
          comment: 'empty comment',
        },
        {
          id:"6",
          expence_name: 'Food',
          summ: 262,
          date: '2019-12-01',
          comment: 'empty comment',
        }
      ],
      filteredByDateExpences:[],
      editDialogWindowIsOpened: false,
      editableItem: {},
      registered: false,
      logged: false,
      totalSumm:0
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    register(state, payload){
      state.registered = payload
    },
    login(state, payload){
      state.logged = payload
    },
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
      let foundExpenceIndex = state.expences.findIndex(
        item => item.id == payload.editedItem.id);
      Object.assign(state.expences[foundExpenceIndex], payload.editedItem)
    },
    deleteExpence(state, payload) {
      let foundExpenceIndex = state.expences.findIndex(
        item => item.id == payload.id);
      state.expences.splice(foundExpenceIndex, 1)
    },
    getCurrenthMonthExpences(state){
      let currentYear = new Date().toISOString().substr(0, 4);
      let date = new Date();
      let currentMonthDate = 
        new Date(date.getFullYear(), date.getMonth(), 1)
        .toISOString().substr(0, 10);
        state.filteredByDateExpences = state.expences.filter (
         expence => expence.date.substr(0, 4) === currentYear && expence.date > currentMonthDate
        )
    },
    getLastTreMonthsExpences(state){
      let date = new Date();
      let lastTreeMonthDate = 
      new Date(date.getFullYear(), date.getMonth()-2, date.getDate())
      .toISOString().substr(0, 10);
      state.filteredByDateExpences = state.expences.filter (
       expence => expence.date > lastTreeMonthDate
      )
    },
    getCurrentYearExpences(state){
      let currentYear = new Date().toISOString().substr(0, 4);
      state.filteredByDateExpences = state.expences.filter (
        expence => expence.date.substr(0, 4) === currentYear
      )
    },
    getAllExpences(state){
      state.filteredByDateExpences = state.expences;
    },
  },
  getters:{
    user(state) {
      return state.user;
    },
    filteredByDateExpences: state => {
      return state.filteredByDateExpences
    }
  },
  actions: {
    register({commit},payload){
      commit("setUser", payload);
      commit('register', payload)
    },
    login({commit, getters}, payload) {
      commit("setUser", payload)
      commit('login', payload)
    },
    logout({commit}){
      commit("setUser", null);
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid });
    },
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
