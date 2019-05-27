import { GuardiasService, CasosService } from "@/common/api.service";
import { GET_GUARDIAS, GET_CASOS } from "./actions.type";
import { Utils } from "../utils/utils";

const initialState = {
  guardias: [],
  casos: []
};

export const state = { ...initialState };

export const actions = {
  async [GET_GUARDIAS](context) {
    return await GuardiasService.get(context.getters.currentUser.id)
      .then(data => {
        state.guardias = data.data;
      })
      .catch(({ response }) => {});
  },
  async [GET_CASOS](context) {
    return await CasosService.get(context.getters.currentUser.id)
      .then(data => {
        state.casos = data.data;
      })
      .catch(({ response }) => {});
  }
};

const getters = {
  guardias(state) {
    return state.guardias;
  },
  casos(state) {
    return state.casos;
  }
};

export default {
  state,
  actions,
  getters
};
