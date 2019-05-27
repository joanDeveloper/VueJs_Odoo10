import { CategoriesService } from "@/common/api.service";
import { GET_CATEGORIES } from "./actions.type";

const state = {
  categories: [],
  isLoading: true
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  categories(state) {
    return state.categories;
  }
};

const actions = {
  [GET_CATEGORIES](context, data) {
    CategoriesService.get()
      .then(({ data }) => {
        state.categories = data;
      })
      .catch(() => {});
  }
};
/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
  state,
  getters,
  actions
};
