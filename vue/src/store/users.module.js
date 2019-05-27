import { UsersService } from "@/common/api.service";
import {
  GET_LAWYERS,
  GET_DETAILS,
  GET_LAWYERS_FILTERED,
  GET_ALL_USERS
} from "./actions.type";

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
    return state.userDetail;
  },
  countUsers(state) {
    return state.countUsers;
  }
};

const actions = {
  [GET_LAWYERS](context, slug) {
    UsersService.post(slug)
      .then(({ data }) => {
        state.users = JSON.parse(data.result);
      })
      .catch(() => {});
  },
  [GET_ALL_USERS]() {
    UsersService.getAll()
      .then(({ data }) => {
        state.countUsers = data.countUsers;
      })
      .catch(() => {});
  },
  [GET_LAWYERS_FILTERED](context, slug) {
    UsersService.postFilter(slug)
      .then(({ data }) => {
        state.users = JSON.parse(data.result);
      })
      .catch(() => {});
  },
  [GET_DETAILS](context, id) {
    return new Promise(resolve => {
      UsersService.postDetail(id)
        .then(({ data }) => {
          state.userDetail = JSON.parse(data.result);
          resolve(data);
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
