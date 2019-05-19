import { UsersService} from "@/common/api.service";
import { GET_LAWYERS, GET_DETAILS, GET_LAWYERS_FILTERED, GET_ALL_USERS  } from "./actions.type";

const state = {
  users: [],
  userDetail: [],
  isLoading: true,
  countUsers: []
};

const getters = {
  user(state) {
    return state.users;
  },
  userDetail(state) {
    console.log("AAAA22222________",state);
    return state.userDetail;
  },
  countUsers(state) {
    return state.countUsers;
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
  [GET_ALL_USERS](context, slug) {
    console.log("CONTEXT_GET_ALL_USERS", context, slug);
    UsersService.getAll()
      .then(({ data }) => {
        console.log("GET_ALL_USERS", data);
        state.countUsers = data.countUsers
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
    return new Promise((resolve, reject) => {
      console.log("CONTEXT_DETAIL", context, id);
      UsersService.postDetail(id)
        .then(({ data }) => {
          console.log("GET_DETAILS", JSON.parse(data.result));
          state.userDetail = JSON.parse(data.result);
          resolve(data);
          // return JSON.parse(data.result);
        })
        .catch(() => {});
    });
  },
  
};

export default {
  actions,
  state,
  getters
};
