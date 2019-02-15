import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import user from "./modules/user";
import expences from "./modules/expences";
import shared from "./modules/shared";

Vue.use(Vuex);

// const developUrl = 'http://192.168.99.100/api';

const developUrl = "http://212.109.193.230:8081/api";

axios.defaults.baseURL = developUrl;

export const store = new Vuex.Store({
  modules: {
    user: user,
    expences: expences,
    shared: shared
  }
});
