export default {
  state: {
    requestError: null,
    loading: false
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setRequestError(state, payload) {
      state.requestError = payload;
    },
    clearError(state) {
      state.requestError = null;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    requestError(state) {
      return state.requestError;
    }
  }
};
