import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const developUrl = 'http://192.168.99.100/api';

axios.defaults.baseURL = developUrl;


export const store = new Vuex.Store({
  state: {
    userToken: localStorage.getItem('access_token') || null,
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
      expences:[],
      filteredByDateExpences:[],
      editDialogWindowIsOpened: false,
      editableItem: {},
      registered: false,
      logged: false,
      totalSumm:0,
      requestError:null,
      loading: false
  },
  mutations: {
    setUser(state, payload) {
      state.userToken = payload;
    },
    register(state, payload){
      state.registered = payload
    },
    login(state, payload){
      state.userToken = payload;
    },
    logout(state) {
      state.userToken = null;
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
        item => item.id == payload.id);
      Object.assign(state.expences[foundExpenceIndex], payload)
    },
    deleteExpence(state, payload) {
      let foundExpenceIndex = state.expences.findIndex(
        item => item.id == payload.id);
      state.expences.splice(foundExpenceIndex, 1)
    },
    getExpences(state, payload) {
      state.expences = payload;
    },
    getCurrenthMonthExpences(state){
      let currentYear = new Date().toISOString().substr(0, 4);
      let date = new Date();
      let currentMonthDate = 
        new Date(date.getFullYear(), date.getMonth(), 2)
        .toISOString().substr(0, 10);
        state.filteredByDateExpences = state.expences.filter (
         expence => {
           return expence.date.substr(0, 4) === 
           currentYear && expence.date.substr(5, 2) === currentMonthDate.substr(5, 2)
          }
        )
    },
    getLastTreMonthsExpences(state){
      let date = new Date();
      let lastTreeMonthDate = 
      new Date(date.getFullYear(), date.getMonth() -2, date.getDate())
      .toISOString().substr(0, 10);

      let futureTreeMonths = 
      new Date(date.getFullYear(), date.getMonth() +2, date.getDate())
      .toISOString().substr(0, 10);

      state.filteredByDateExpences = state.expences.filter (
       expence => {
         console.log(expence.date.substr(5, 2))
         console.log(futureTreeMonths.substr(5, 2))
         expence.date.substr(5, 2) > lastTreeMonthDate.substr(5, 2) && expence.date.substr(5, 2) > futureTreeMonths.substr(5, 2)
        }
      )
    },
    getCurrentYearExpences(state){
      let currentYear = new Date().toISOString().substr(0, 4);
      state.filteredByDateExpences = state.expences.filter (
        expence => expence.date.substr(0, 4) === currentYear
      )
    },
    resetExpencesDateFilter(state){
      state.filteredByDateExpences = state.expences;
    },
    setLoading(state, payload){
        state.loading = payload
    },
    setRequestError(state, payload) {
      state.requestError = payload
    },
    clearError(state){
      state.requestError = null;
    }
  },
  actions: {
    register({commit}, payload){

      commit('setLoading', true)
      axios.post('/register',
      { 
        name:'empthy name',
        email:payload.username,
        username: payload.username,
        password: payload.password, 
      }
      ).then(responce=>{

        commit('register', true)
        commit('setLoading', false)

      }).catch(error => {
        if(error.response) {
          commit('setRequestError', 'user allready exist')
        } else {
          commit('setRequestError', 'connection error')
        }
        commit('setLoading', false)
      })
    },
    login({commit, getters}, payload) {

      commit('setLoading', true)
      axios.post('/login',
      { 
        username:payload.username,
        password:payload.password
      }
      ).then(responce=>{

        const token = responce.data.access_token;

        localStorage.setItem('access_token', token);

        commit('login', token);
        commit('setLoading', false)
        
      }).catch((error) => {
        if(error.response) {
          commit('setRequestError', error.response.data)
        } else {
          commit('setRequestError', 'connection error')
        }
        commit('setLoading', false)
      })
    },
    logout({commit, getters}){

      axios.defaults.headers.common['Authorization'] ='Bearer ' + this.state.userToken;

      if(getters.user){

        axios.post('/logout')
        .then(responce=>{

          localStorage.removeItem('access_token');

          commit('logout');

        }).catch(error => {
          // console.log(error);
        })
      }
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", true);
    },
    getExpences({commit}) {

      commit('setLoading', true)

      axios.get('/expences',

      { headers: {"Authorization" : `Bearer ${this.state.userToken}`} }

      ).then(responce=>{


        commit('getExpences', responce.data)
        commit('setLoading', false)

      }).catch(error => {
        commit('setLoading', false)
        commit('setRequestError', 'request error')
        console.log(error);
      })
    },
    createExpence({commit, getters}, payload) {
      commit('setLoading', true)
      axios.post('/expences',
      {
        title: payload.title,
        body: payload.title,
        summ: payload.summ,
        date: payload.date, 
        comment: payload.comment, 
      },
      { headers: {"Authorization" : `Bearer ${this.state.userToken}`} }

      ).then(responce=>{

        commit("createExpence", responce.data)
        commit('setLoading', false)

      }).catch(error => {
        commit('setLoading', false)
        commit('setRequestError', 'request error')
        console.log(error);
      })
    },
    saveChangesToEditedExpence({commit, getters}, payload) {

      commit('setLoading', true)

      axios.put("/expences" + "/" + payload.editedId,
      {
        title: payload.editedItem.title,
        body: payload.editedItem.title,
        summ: payload.editedItem.summ,
        date: payload.editedItem.date, 
        comment: payload.editedItem.comment, 
      },
      { headers: {"Authorization" : `Bearer ${this.state.userToken}`} }

      ).then(responce=>{

        commit("saveChangesToEditedExpence", responce.data);
        commit('setLoading', false)

      }).catch(error => {
        commit('setLoading', false)
        commit('setRequestError', 'request error')
        console.log(error);
      })

    },
    deleteExpence({commit, getters},payload) {
      commit('setLoading', true)
      axios.delete("/expences" + "/" + payload.id,
      { headers: {"Authorization" : `Bearer ${this.state.userToken}`} }

      ).then(responce=>{
        commit('setLoading', false)
        commit("deleteExpence", payload);

      }).catch(error => {
        commit('setLoading', false)
        commit('setRequestError', 'request error')
        console.log(error);
      })
    },
    clearError({commit, getters}, payload) {
        commit('clearError')
    }
  },
  getters:{
    user(state) {
      return state.userToken;
    },
    userRegistration(state) {
      return state.registered
    },
    filteredByDateExpences: state => {
      return state.filteredByDateExpences
    },
    loading(state){
      return state.loading
    },
    requestError(state){
      return state.requestError
    },
    sparklineValues(state) {
      let sparklineValues = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ];

      let currentYear = new Date().toISOString().substr(0, 4);
      let currentYearExpences = state.expences.filter (
        expence => expence.date.substr(0, 4) === currentYear
      )

      for (let expence of currentYearExpences) {
        let expenceMonth = Number(expence.date.substr(5, 2));
        let index = 0;
        for (let value of sparklineValues) {
            index ++;
            if (index === expenceMonth) {
              sparklineValues[index -1] += Number(expence.summ);
            }
        }


      }
      return sparklineValues
    }
  },
})
