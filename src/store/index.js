import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Promise from "core-js/features/promise";

Vue.use(Vuex);

const mainurl = "https://snappfood.ir";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    set(state, [variable, value]) {
      state[variable] = value;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    phone({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        const formData = new FormData();
        formData.append("cellphone", user.cellphone);
        axios({
          url: `${mainurl}/mobile/v2/user/loginMobileWithNoPass?lat=35.774&long=51.418&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.0&UDID=aaa8be3a-b094-425e-b593-5fef9b310de9&locale=fa`,
          data: formData,
          method: "POST",
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  modules: {},
});
