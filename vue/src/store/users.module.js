import { UsersService } from "@/common/api.service";
import { GET_LAWYERS, GET_DETAILS, GET_LAWYERS_FILTERED } from "./actions.type";

const state = {
  users: [],
  userDetail: [],
  isLoading: true
};

const getters = {
  user(state) {
    return state.users;
  },
  userDetail(state) {
    console.log("AAAA22222________",state);
    return state.userDetail;
  }
};

const actions = {
  [GET_LAWYERS](context, slug) {
    console.log("CONTEXT", context, slug);
    UsersService.post(slug)
      .then(({ data }) => {
        console.log("GET_LAWYERS", JSON.parse(data.result));
        state.users = JSON.parse(data.result);
      })
      .catch(() => {});
  },
  [GET_LAWYERS_FILTERED](context, slug) {
    console.log("CONTEXT_GET_LAWYERS_FILTERED", context, slug);
    UsersService.postFilter(slug)
      .then(({ data }) => {
        console.log("GET_LAWYERS_FILTERED", JSON.parse(data.result));
        state.users = JSON.parse(data.result);
      })
      .catch(() => {});
  },
  [GET_DETAILS](context, id) {
    return new Promise(resolve => {
      console.log("CONTEXT_DETAIL", context, id);
      UsersService.postDetail(id)
        .then(({ data }) => {
          console.log("GET_DETAILS", JSON.parse(data.result));
          state.userDetail = JSON.parse(data.result);
          console.log("AAAA________",state);
          //resolve(JSON.parse(data.result));
          return JSON.parse(data.result);
        })
        .catch(() => {});
    });
  }
};

export default {
  actions,
  state,
  getters
};
