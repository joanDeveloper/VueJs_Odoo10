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
    //const { username } = payload;
    return ProfileService.post(payload)
      .then(({ data }) => {
        console.log("DATA_CHARGE_MONEY_PROFILE",data);
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
  // [SET_ERROR] (state, error) {
  //   state.errors = error
  // },
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
