import Vue from "vue";
import {
  ArticlesService,
  CommentsService,
  FavoriteService,
  GuardiasService,
  CasosService,
  AssociacionesService,
  ForumService
} from "@/common/api.service";
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  GET_COMMENT,
  UPDATE_COMMENT,
  GET_GUARDIAS,
  GET_CASOS,
  GET_ASSOCIACIONES,
  GET_LAWYERS_INTERESADOS,
  POST_ASSOCIACIONES,
  POST_INTERESADO,
  DELETE_INTERESADO,
  DELETE_ASOCIACION,
  GET_ASSOCIACIONES_INTERESADOS,
  GET_TEMES_FORUM,
  GET_ANSWER_FORUM,
  SUBMIT_ANSWER_FORUM,
  CREATE_QUESTION_FORUM,
  GET_QUESTIONS_FORUM,
  GET_QUESTIONS_BYSLUG_FORUM,
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
import {Utils} from "../utils/utils";

const initialState = {
  comments: [],
  guardias: [],
  casos: [],
  associaciones: [],
  lawyersInteresados: [],
  asociacionesInteresadas: [],
  temesForum: [],
  questionsForum: [],
  answerQuestion:[]
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
  async [UPDATE_COMMENT](context, payload) {
    console.log("UPDATE_COMMENT",context, payload);
    return await CommentsService.update(payload)
      .then((data)=>{console.log("DATA_UPDATE_COMMENT",data); return data;})
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
  async [GET_ASSOCIACIONES](context, payload) {
    console.log("GET_ASSOCIACIONES",context, payload);
    return await AssociacionesService.get()
    .then((data)=>{
      console.log("DATA_GET_ASSOCIACIONES",data, state);
      state.associaciones = data.data;
    }).catch(({ response }) => {});

  },
  async [GET_LAWYERS_INTERESADOS](context, payload) {
    console.log("GET_LAWYERS_INTERESADOS",context, payload);
    return await AssociacionesService.getLawyers(payload)
    .then((data)=>{
      console.log("DATA_LAWYERS_INTERESADOS",data, state);
      state.lawyersInteresados = data.data;
    }).catch(({ response }) => {});

  },
  async [POST_ASSOCIACIONES](context, payload) {
    console.log("POST_ASSOCIACIONES",context, payload);
    return await AssociacionesService.post(payload)
    .then((data)=>{
      console.log("DATA_POST_ASSOCIACIONES",data, state);
      if(JSON.parse(data.data.result).message!=undefined){
        console.log("ASOCIACIONES____ERROR_______");
        Utils.toasterError(JSON.parse(data.data.result).message);
        return false;
      }
      console.log("ASOCIACIONES____OK_______");
      state.lawyersInteresados = data.data;
    }).catch(({ response }) => {
      console.log("DATA_ERROR_POST_ASSOCIACIONES",response.data);
    });

  },

  async [POST_INTERESADO](context, payload) {
    console.log("POST_INTERESADO",context, payload);
    return await AssociacionesService.postInteresado(payload)
    .then((data)=>{
      console.log("DATA_POST_INTERESADO",data, state);
      if(JSON.parse(data.data.result).message!=undefined){
        console.log("INTERESADO____ERROR_______");
        Utils.toasterError(JSON.parse(data.data.result).message);
        return false;
      }
      state.lawyersInteresados = JSON.parse(data.data.result);
    }).catch(({ response }) => {});

  },

  async [DELETE_INTERESADO](context, payload) {
    console.log("DELETE_INTERESADO",context, payload);
    return await AssociacionesService.deleteInteresado(payload)
    .then((data)=>{
      console.log("DATA_DELETE_INTERESADO___",data.data.result);
      state.lawyersInteresados = JSON.parse(data.data.result);
    }).catch(({ response }) => {});

  },
  async [DELETE_ASOCIACION](context, payload) {
    console.log("DELETE_ASOCIACION",context, payload);
    return await AssociacionesService.deleteAsociacion(payload)
    .then((data)=>{
      console.log("DATA_DELETE_ASOCIACION___",data.data.result);
      if(JSON.parse(data.data.result).message!=undefined){
        console.log("DELETE_ASOCIACION____ERROR_______");
        Utils.toasterError(JSON.parse(data.data.result).message);
        return false;
      }
      //state.lawyersInteresados = JSON.parse(data.data.result);
    }).catch(({ response }) => {});

  },
  async [GET_ASSOCIACIONES_INTERESADOS](context, payload) {
    console.log("GET_ASSOCIACIONES_INTERESADOS",context, payload);
    return await AssociacionesService.getAsociacionesInteresados(payload)
    .then((data)=>{
      console.log("DATA_GET_ASSOCIACIONES_INTERESADOS___",data);
      state.asociacionesInteresadas = data.data;
    }).catch(({ response }) => {});

  },

  async [GET_TEMES_FORUM](context, payload) {
    console.log("GET_TEMES_FORUM",context, payload);
    return await ForumService.get()
    .then((data)=>{
      console.log("DATA_GET_TEMES_FORUM",data);
      state.temesForum = data.data;
    }).catch(({ response }) => {});

  },

  async [CREATE_QUESTION_FORUM](context, payload) {
    console.log("CREATE_QUESTION_FORUM",context, payload);
    return await ForumService.postQuestion(payload)
    .then((data)=>{
      console.log("DATA_CREATE_QUESTION_FORUM",data);
      state.questionsForum = JSON.parse(data.data.result).questions;
    }).catch(({ response }) => {});

  },

  async [GET_QUESTIONS_FORUM](context, payload) {
    console.log("GET_QUESTIONS_FORUM",context, payload);
    return await ForumService.getQuestions(payload)
    .then((data)=>{
      console.log("DATA_GET_QUESTIONS_FORUM",data);
      state.questionsForum = data.data.questions;
    }).catch(({ response }) => {});

  },

  async [SUBMIT_ANSWER_FORUM](context, payload) {
    console.log("SUBMIT_ANSWER_FORUM",context, payload);
    return await ForumService.postAnswer(payload)
    .then((data)=>{
      console.log("DATA_SUBMIT_ANSWER_FORUM",data);
      state.answerQuestion = JSON.parse(data.data.result).answers;
    }).catch(({ response }) => {
      console.log("FFF", response);
      let message = JSON.parse(response.data.result).error;
      Utils.toasterError(message);
    });

  },

  async [GET_QUESTIONS_BYSLUG_FORUM](context, payload) {
    console.log("GET_ALL_QUESTIONS_FORUM",context, payload);
    return await ForumService.getAllQuestions(payload)
    .then((data)=>{
      console.log("DATA_GET_ALL_QUESTIONS_FORUM",data);
      state.questionsForum = data.data.questions;
    }).catch(({ response }) => {});

  },

  async [GET_ANSWER_FORUM](context, payload) {
    console.log("GET_ANSWER_FORUM",context, payload);
    return await ForumService.getAnswer(payload)
    .then((data)=>{
      console.log("DATA_GET_ANSWER_FORUM",data);
      state.answerQuestion = data.data.answers;
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
  },
  associaciones(state) {
    return state.associaciones;
  },
  lawyersInteresados(state) {
    return state.lawyersInteresados;
  },
  asociacionesInteresadas(state) {
    return state.asociacionesInteresadas;
  },
  temesForum(state) {
    return state.temesForum;
  },
  questionsForum(state) {
    return state.questionsForum;
  },
  answerQuestion(state) {
    return state.answerQuestion;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
