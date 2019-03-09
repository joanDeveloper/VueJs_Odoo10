import { CategoriesService } from "@/common/api.service";
import { GET_CATEGORIES } from "./actions.type";

const state = {
  categories: [],
  isLoading: true
};

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  },
  categories(state) {
    return state.categories;
  }
};

const actions = {
  [GET_CATEGORIES](context, data) {
    console.log("CONTEXT_CATEGORIES", context, data);
    CategoriesService.get()
      .then(({ data }) => {
        console.log("GET_CATEGORIES", data);
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
