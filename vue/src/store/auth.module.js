import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";
import Vue from "vue";
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
      console.log("LOGIN__", credentials);
      ApiService.post("signin", { credentials })
        .then(({ data }) => {
          console.log("RES_LOGIN", data.result);
          context.commit(SET_AUTH, data.result.user);
          resolve(data);
        })
        .catch(({ response }) => {
          console.log("RES_LOGIN_ERROR", response);
          context.commit(SET_ERROR, JSON.parse(response.data.result).error);
          //reject(response)
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      console.log("REGISTER", context, credentials);
      ApiService.post("register", { credentials })
        .then(({ data }) => {
          // context.commit(SET_AUTH, data.user);
          // resolve(data);
          console.log("RES", data.result);
          if (!JSON.parse(data.result).error) {
            Vue.toasted.show(JSON.parse(data.result).message, {
              theme: "outline",
              position: "top-right",
              duration: 5000
            });
          } else {
            Vue.toasted.show(JSON.parse(data.result).error.message, {
              theme: "bubble",
              position: "top-right",
              duration: 5000
            });
          }
        })
        .catch(({ response }) => {
          console.log("RES_ERROR", response);
          Vue.toasted.show(response, {
            theme: "bubble",
            position: "top-right",
            duration: 5000
          });
          context.commit(SET_ERROR, response.result.error);
          reject(response);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      //ApiService.setHeader();
      ApiService.post("verify",{"Token":JwtService.getToken()})
        .then(({ data }) => {
          console.log("CHECK_AUTH",data.result);
          context.commit(SET_AUTH, data.result.user);
        })
        .catch(({ response }) => {
          console.log("CHECK_AUTH_ERROR",response);
          context.commit(SET_ERROR, JSON.parse(response.data.result).error.message);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    Vue.toasted.show(error, {
      theme: "bubble",
      position: "top-right",
      duration: 5000
    });
    JwtService.destroyToken();
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    console.log("SET_AUTH",user);
    state.isAuthenticated = true;
    state.user = user.currentUser;
    state.errors = {};
    JwtService.saveToken(user.token);
  },
  [PURGE_AUTH](state) {
    console.log("PURGE_AUTH__");
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
