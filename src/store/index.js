import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import expences from "./modules/expences";
import shared from "./modules/shared";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    expences: expences,
    shared: shared
  }
});
