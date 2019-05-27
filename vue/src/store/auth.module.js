import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH } from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";
import Vue from "vue";
import { Utils } from "../utils/utils";
import Toasted from "vue-toasted";
Vue.use(Toasted);

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("signin", { credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.result.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.result.error.message);
          //reject(response)
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("register", { credentials })
        .then(({ data }) => {
          // context.commit(SET_AUTH, data.user);
          // resolve(data);
          !JSON.parse(data.result).error
            ? Utils.toasterInfo(JSON.parse(data.result).message)
            : Utils.toasterError(JSON.parse(data.result).error.message);
        })
        .catch(({ response }) => {
          Utils.toasterError(response);
          context.commit(SET_ERROR, response.result.error);
          reject(response);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      //ApiService.setHeader();
      return new Promise((resolve, reject) => {
        ApiService.post("verify", { "Token": JwtService.getToken() })
          .then(({ data }) => {
            context.commit(SET_AUTH, data.result.user);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(
              SET_ERROR,
              JSON.parse(response.data.result).error.message
            );
            reject(response);
          });
      });
    } else {
      context.commit(PURGE_AUTH);
    }
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    Utils.toasterError(error);
    JwtService.destroyToken();
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user.currentUser;
    state.errors = {};
    JwtService.saveToken(user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
