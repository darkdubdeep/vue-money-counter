import axios from "axios";

export default {
  state: {
    userToken: localStorage.getItem("access_token") || null,
    registered: false,
    logged: false
  },
  mutations: {
    setUser(state, payload) {
      state.userToken = payload;
    },
    register(state, payload) {
      state.registered = payload;
    },
    login(state, payload) {
      state.userToken = payload;
    },
    logout(state) {
      state.userToken = null;
    }
  },
  actions: {
    register({ commit }, payload) {
      commit("setLoading", true);
      axios
        .post("/register", {
          name: "empthy name",
          email: payload.username,
          username: payload.username,
          password: payload.password
        })
        .then(() => {
          commit("register", true);
          commit("setLoading", false);
        })
        .catch(error => {
          if (error.response) {
            commit("setRequestError", "user allready exist");
          } else {
            commit("setRequestError", "connection error");
          }
          commit("setLoading", false);
        });
    },
    login({ commit }, payload) {
      commit("setLoading", true);
      axios
        .post("/login", {
          username: payload.username,
          password: payload.password
        })
        .then(responce => {
          const token = responce.data.access_token;

          localStorage.setItem("access_token", token);

          commit("login", token);
          commit("setLoading", false);
          commit("clearError");
        })
        .catch(error => {
          if (error.response) {
            commit("setRequestError", error.response.data);
          } else {
            commit("setRequestError", "connection error");
          }
          commit("setLoading", false);
        });
    },
    logout({ commit, getters }) {
      console.log(this.state.userToken);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.state.user.userToken;

      if (getters.user) {
        axios
          .post("/logout")
          .then(() => {
            commit("logout");
            localStorage.removeItem("access_token");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    autoSignIn({ commit }) {
      commit("setUser", true);
    }
  },
  getters: {
    user(state) {
      return state.userToken;
    },
    userRegistration(state) {
      return state.registered;
    }
  }
};
