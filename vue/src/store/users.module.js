import { UsersService } from "@/common/api.service";
import { GET_LAWYERS,GET_DETAILS } from "./actions.type";

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
  [GET_DETAILS](context, id) {
    console.log("CONTEXT_DETAIL", context, id);
    UsersService.postDetail(id)
      .then(({ data }) => {
        console.log("GET_DETAILS", JSON.parse(data.result));
        state.userDetail = JSON.parse(data.result);
      })
      .catch(() => {});
  }
};

export default {
  actions,
  state,
  getters
};
