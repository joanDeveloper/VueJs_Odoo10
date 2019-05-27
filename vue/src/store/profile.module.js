import { ProfileService } from "@/common/api.service";
import { CHARGE_MONEY_PROFILE } from "./actions.type";
import { SET_PROFILE } from "./mutations.type";

const state = {
  errors: {},
  profile: []
};

const getters = {
  profile(state) {
    return state.profile;
  }
};

const actions = {
  [CHARGE_MONEY_PROFILE](context, payload) {
    return ProfileService.post(payload)
      .then(({ data }) => {
        context.commit(SET_PROFILE, JSON.parse(data.result));
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  }
};

const mutations = {
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
