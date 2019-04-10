import Vue from "vue";
import {
  ArticlesService,
  CommentsService,
  FavoriteService,
  GuardiasService,
  CasosService
} from "@/common/api.service";
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  GET_COMMENT,
  GET_GUARDIAS,
  GET_CASOS,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE
} from "./actions.type";
import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST,
  SET_GUARDIAS
} from "./mutations.type";

const initialState = {
  comments: [],
  guardias: [],
  casos: [],
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_ARTICLE](context, articleSlug, prevArticle) {
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return context.commit(SET_ARTICLE, prevArticle);
    }
    const { data } = await ArticlesService.get(articleSlug);
    context.commit(SET_ARTICLE, data.article);
    return data;
  },
  async [FETCH_COMMENTS](context, articleSlug) {
    const { data } = await CommentsService.get(articleSlug);
    context.commit(SET_COMMENTS, data.comments);
    return data.comments;
  },
  async [COMMENT_CREATE](context, payload) {
    console.log("COMMENTS_MODULE",context, payload);
   return await CommentsService.post(payload)
      .then((data)=>{return data;})
      .catch(({ response }) => {return response;});
    //context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [GET_COMMENT](context, payload) {
    console.log("GET_COMMENT",context, payload);
    return await CommentsService.get(payload.num_colegiado)
      .then((data)=>{console.log("DATA_GET_COMMENT",data); return data;})
      .catch(({ response }) => {return response;});
    //context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [GET_GUARDIAS](context, payload) {
    console.log("GET_GUARDIAS",context, payload);
    return await GuardiasService.get(context.getters.currentUser.id)
    .then((data)=>{
      console.log("DATA_GET_GUARDIAS",data, state);
      state.guardias = data.data;
      //return data;
      /*context.commit(SET_GUARDIAS, data);return data;*/})
      .catch(({ response }) => {/*return response;*/});
    //context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [GET_CASOS](context, payload) {
    console.log("GET_CASOS",context, payload);
    return await CasosService.get(context.getters.currentUser.id)
    .then((data)=>{
      console.log("DATA_GET_CASOS",data, state);
      state.casos = data.data;
    }).catch(({ response }) => {});

  },
  async [COMMENT_DESTROY](context, payload) {
    await CommentsService.destroy(payload.slug, payload.commentId);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [FAVORITE_ADD](context, payload) {
    const { data } = await FavoriteService.add(payload);
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  async [FAVORITE_REMOVE](context, payload) {
    const { data } = await FavoriteService.remove(payload);
    // Update list as well. This allows us to favorite an article in the Home view.
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, { root: true });
    context.commit(SET_ARTICLE, data.article);
  },
  [ARTICLE_PUBLISH]({ state }) {
    return ArticlesService.create(state.article);
  },
  [ARTICLE_DELETE](context, slug) {
    return ArticlesService.destroy(slug);
  },
  [ARTICLE_EDIT]({ state }) {
    return ArticlesService.update(state.article.slug, state.article);
  },
  [ARTICLE_EDIT_ADD_TAG](context, tag) {
    context.commit(TAG_ADD, tag);
  },
  [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
    context.commit(TAG_REMOVE, tag);
  },
  [ARTICLE_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [SET_GUARDIAS](state, guardia) {
    console.log("SET_GUARDIAS",guardia);
    state.guardias = guardia.data;
  },
  [TAG_ADD](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag]);
  },
  [TAG_REMOVE](state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag);
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  article(state) {
    return state.article;
  },
  comments(state) {
    return state.comments;
  },
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
  mutations,
  getters
};
