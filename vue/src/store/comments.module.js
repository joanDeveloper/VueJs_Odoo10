import { CommentsService } from "@/common/api.service";
import { COMMENT_CREATE, GET_COMMENT, UPDATE_COMMENT } from "./actions.type";

const initialState = {
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [COMMENT_CREATE](context, payload) {
    return await CommentsService.post(payload)
      .then(data => {
        return data;
      })
      .catch(({ response }) => {
        return response;
      });
  },
  async [GET_COMMENT](context, payload) {
    return await CommentsService.get(payload.num_colegiado)
      .then(data => {
        return data;
      })
      .catch(({ response }) => {
        return response;
      });
  },
  async [UPDATE_COMMENT](context, payload) {
    return await CommentsService.update(payload)
      .then(data => {
        return data;
      })
      .catch(({ response }) => {
        return response;
      });
  }
};

const getters = {
  comments(state) {
    return state.comments;
  }
};

export default {
  state,
  actions,
  getters
};
