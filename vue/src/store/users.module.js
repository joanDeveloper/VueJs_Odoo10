import { UsersService } from "@/common/api.service";
import { GET_LAWYERS } from "./actions.type";

const state = {
  users: [],
  isLoading: true
};

const getters = {
  user(state) {
    return state.users;
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
  }
};

export default {
  actions,
  state,
  getters
};
