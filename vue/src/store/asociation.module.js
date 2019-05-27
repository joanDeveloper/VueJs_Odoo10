import { AssociacionesService } from "@/common/api.service";
import {
  GET_ASSOCIACIONES,
  GET_LAWYERS_INTERESADOS,
  POST_ASSOCIACIONES,
  POST_INTERESADO,
  DELETE_INTERESADO,
  DELETE_ASOCIACION,
  GET_ASSOCIACIONES_INTERESADOS
} from "./actions.type";
import { Utils } from "../utils/utils";

const initialState = {
  associaciones: [],
  lawyersInteresados: [],
  asociacionesInteresadas: []
};

export const state = { ...initialState };

export const actions = {
  async [GET_ASSOCIACIONES](context, payload) {
    return await AssociacionesService.get()
      .then(data => {
        state.associaciones = data.data;
      })
      .catch(({ response }) => {});
  },
  async [GET_LAWYERS_INTERESADOS](context, payload) {
    return await AssociacionesService.getLawyers(payload)
      .then(data => {
        state.lawyersInteresados = data.data;
      })
      .catch(({ response }) => {});
  },
  async [POST_ASSOCIACIONES](context, payload) {
    return await AssociacionesService.post(payload)
      .then(data => {
        if (JSON.parse(data.data.result).message != undefined) {
          Utils.toasterError(JSON.parse(data.data.result).message);
          return false;
        }
        state.lawyersInteresados = data.data;
      })
      .catch(({ response }) => {});
  },

  async [POST_INTERESADO](context, payload) {
    return await AssociacionesService.postInteresado(payload)
      .then(data => {
        if (JSON.parse(data.data.result).message != undefined) {
          Utils.toasterError(JSON.parse(data.data.result).message);
          return false;
        }
        state.lawyersInteresados = JSON.parse(data.data.result);
      })
      .catch(({ response }) => {});
  },

  async [DELETE_INTERESADO](context, payload) {
    return await AssociacionesService.deleteInteresado(payload)
      .then(data => {
        state.lawyersInteresados = JSON.parse(data.data.result);
      })
      .catch(({ response }) => {});
  },
  async [DELETE_ASOCIACION](context, payload) {
    return await AssociacionesService.deleteAsociacion(payload)
      .then(data => {
        if (JSON.parse(data.data.result).message != undefined) {
          Utils.toasterError(JSON.parse(data.data.result).message);
          return false;
        }
      })
      .catch(({ response }) => {});
  },
  async [GET_ASSOCIACIONES_INTERESADOS](context, payload) {
    return await AssociacionesService.getAsociacionesInteresados(payload)
      .then(data => {
        state.asociacionesInteresadas = data.data;
      })
      .catch(({ response }) => {});
  }
};

const getters = {
  associaciones(state) {
    return state.associaciones;
  },
  lawyersInteresados(state) {
    return state.lawyersInteresados;
  },
  asociacionesInteresadas(state) {
    return state.asociacionesInteresadas;
  }
};

export default {
  state,
  actions,
  getters
};
