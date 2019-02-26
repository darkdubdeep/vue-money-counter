import axios from "axios";
import api from "../../store/tools/api";

export default {
  state: {
    headers: [
      {
        text: "Expence name",
        align: "center",
        sortable: false,
        value: "expence_name"
      },
      {
        text: "Summ",
        value: "summ",
        align: "center"
      },
      {
        text: "Date",
        value: "date",
        align: "center"
      },
      {
        text: "Comment",
        value: "comment",
        align: "center"
      }
    ],
    expences: [],
    filteredByDateExpences: null,
    editDialogWindowIsOpened: false,
    editableItem: {},
    totalSumm: 0
  },
  mutations: {
    createExpence(state, payload) {
      state.expences.push(payload);
      state.filteredByDateExpences !== null
        ? state.filteredByDateExpences.push(payload)
        : true;
    },
    changeEditDialogModalState(state, payload) {
      state.editDialogWindowIsOpened = payload;
    },
    createEditableItem(state, payload) {
      state.editableItem = Object.assign({}, payload);
    },
    saveChangesToEditedExpence(state, payload) {
      let foundExpenceIndex = state.expences.findIndex(
        item => item.id == payload.id
      );
      Object.assign(state.expences[foundExpenceIndex], payload);
      state.filteredByDateExpences !== null
        ? Object.assign(state.expences[foundExpenceIndex], payload)
        : true;
    },
    deleteExpence(state, payload) {
      let foundExpenceIndex = state.expences.findIndex(
        item => item.id == payload.id
      );
      state.expences.splice(foundExpenceIndex, 1);

      if (state.filteredByDateExpences !== null) {
        let foundExpenceIndex = state.filteredByDateExpences.findIndex(
          item => item.id == payload.id
        );
        state.filteredByDateExpences.splice(foundExpenceIndex, 1);
      }
    },
    getExpences(state, payload) {
      state.expences = payload;
    },
    getCurrenthMonthExpences(state) {
      let currentYear = new Date().getFullYear();
      let date = new Date();
      let currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 2)
        .toISOString()
        .substr(0, 10);
      state.filteredByDateExpences = state.expences.filter(expence => {
        return (
          expence.date.substr(0, 4) == currentYear &&
          expence.date.substr(5, 2) == currentMonthDate.substr(5, 2)
        );
      });
    },
    getLastTreMonthsExpences(state) {
      let date = new Date();
      let lastTreeMonthDate = new Date(
        date.getFullYear(),
        date.getMonth() - 2,
        date.getDate()
      )
        .toISOString()
        .substr(0, 10);

      let futureTreeMonths = new Date(
        date.getFullYear(),
        date.getMonth() + 2,
        date.getDate()
      )
        .toISOString()
        .substr(0, 10);

      state.filteredByDateExpences = state.expences.filter(expence => {
        return (
          expence.date > lastTreeMonthDate && expence.date < futureTreeMonths
        );
      });
    },
    getCurrentYearExpences(state) {
      let currentYear = new Date().toISOString().substr(0, 4);
      state.filteredByDateExpences = state.expences.filter(
        expence => expence.date.substr(0, 4) === currentYear
      );
    },
    resetExpencesDateFilter(state) {
      state.filteredByDateExpences = null;
    }
  },
  actions: {
    getExpences({ commit }) {
      commit("setLoading", true);
      api
        .get(
          "/expences",

          { headers: { Authorization: `Bearer ${this.state.user.userToken}` } }
        )
        .then(responce => {
          commit("getExpences", responce.data);
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setRequestError", "request error");
          console.log(error);
        });
    },
    createExpence({ commit }, payload) {
      commit("setLoading", true);
      api
        .post(
          "/expences",
          {
            title: payload.title,
            summ: payload.summ,
            date: payload.date,
            comment: payload.comment
          },
          { headers: { Authorization: `Bearer ${this.state.user.userToken}` } }
        )
        .then(responce => {
          commit("createExpence", responce.data);
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setRequestError", "request error");
          console.log(error);
        });
    },
    saveChangesToEditedExpence({ commit }, payload) {
      commit("setLoading", true);

      api
        .put(
          "/expences" + "/" + payload.editedId,
          {
            title: payload.editedItem.title,
            summ: payload.editedItem.summ,
            date: payload.editedItem.date,
            comment: payload.editedItem.comment
          },
          { headers: { Authorization: `Bearer ${this.state.user.userToken}` } }
        )
        .then(responce => {
          commit("saveChangesToEditedExpence", responce.data);
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setRequestError", "request error");
          console.log(error);
        });
    },
    deleteExpence({ commit }, payload) {
      commit("setLoading", true);
      api
        .delete("/expences" + "/" + payload.id, {
          headers: { Authorization: `Bearer ${this.state.user.userToken}` }
        })
        .then(responce => {
          commit("setLoading", false);
          commit("deleteExpence", payload);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setRequestError", "request error");
          console.log(error);
        });
    }
  },
  getters: {
    filteredByDateExpences: state => {
      return state.filteredByDateExpences;
    },
    sparklineDataGetter: state => (monthsCount, monthNumber) => {
      let sparklineObj = {
        sparklineValues: 12,
        sparklineLabels: []
      };

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];

      if (monthsCount === 1) {
        let currentYear = new Date().getFullYear();
        let daysInMonth = (currentYear, monthNumber) => {
          return new Date(currentYear, monthNumber, 0).getDate();
        };
        sparklineObj.sparklineValues = Array(
          daysInMonth(currentYear, monthNumber)
        ).fill(0);
      }
      if (monthsCount === 3) {
        sparklineObj.sparklineValues = Array(3).fill(0);
      }
      if (monthsCount === 12) {
        sparklineObj.sparklineValues = Array(monthsCount).fill(0);
      }

      let currentYear = new Date().getFullYear();

      let currentYearExpences = state.expences.filter(
        expence => expence.date.substr(0, 4) == currentYear
      );

      let date = new Date();
      let currentMonthDate = Number(
        new Date(date.getFullYear(), date.getMonth(), 2)
          .toISOString()
          .substr(5, 2)
      );

      const indexes = Object.keys(sparklineObj.sparklineValues);

      if (monthsCount == 1) {
        for (let index of indexes) {
          sparklineObj.sparklineLabels.push(Number(index) + 1);
        }
      }

      if (monthsCount == 3) {
        for (let index of indexes) {
          sparklineObj.sparklineLabels.push(monthNames[Number(index)]);
        }
      }

      if (monthsCount == 12) {
        sparklineObj.sparklineLabels = monthNames;
      }

      for (let expence of currentYearExpences) {
        let expenceMonth = Number(expence.date.substr(5, 2));
        let expenceDay = Number(expence.date.substr(8, 2));
        for (let index of indexes) {
          if (monthsCount == 1) {
            if (currentMonthDate == expenceMonth && expenceDay == index) {
              sparklineObj.sparklineValues[index - 1] += Number(expence.summ);
            }
          } else {
            if (index == expenceMonth) {
              sparklineObj.sparklineValues[index - 1] += Number(expence.summ);
            }
          }
        }
      }
      return sparklineObj;
    }
  }
};
