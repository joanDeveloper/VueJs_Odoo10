import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    console.log("setHeader",JwtService.getToken());
    Vue.axios.defaults.headers.common[
      "authorizationssss56557"
    ] = `Token ` + JwtService.getToken();
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  getParams(resource, params) {
    return Vue.axios.get(`${resource}/${params}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const TagsService = {
  get() {
    return ApiService.get("tags");
  }
};

export const ArticlesService = {
  query(type, params) {
    return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
      params: params
    });
  },
  get(slug) {
    return ApiService.get("articles", slug);
  },
  create(params) {
    return ApiService.post("articles", { article: params });
  },
  update(slug, params) {
    return ApiService.update("articles", slug, { article: params });
  },
  destroy(slug) {
    return ApiService.delete(`articles/${slug}`);
  }
};

export const ContactService = {
  post(payload) {
    return ApiService.post(`contact`, { data: payload });
  }
};

export const UsersService = {
  get() {
    return ApiService.get("lawyers");
  },
  post(payload) {
    return ApiService.post(`users`, { data: payload });
  },
  postFilter(payload) {
    return ApiService.post(`userFilter`, { data: payload });
  },
  postDetail(payload) {
    return ApiService.post(`detail`, { data: payload });
  }
};

export const CategoriesService = {
  get() {
    return ApiService.get("categories");
  }
};

export const GuardiasService = {
  get(id) {
    console.log("GuardiasService", id);
    return ApiService.getParams("getGuards", id);
  }
};

export const CasosService = {
  get(id) {
    console.log("CasosService", id);
    return ApiService.getParams("get-casos", id);
  }
};

export const ForumService = {
  get() {
    console.log("ForumService");
    return ApiService.get("get-temesForum");
  }
};

export const AssociacionesService = {
  get() {
    console.log("AssociacionesService");
    return ApiService.get("get-associaciones");
  },
  getLawyers(payload) {
    return ApiService.getParams("getLawyers-interesados", payload);
  },
  post(payload) {
    return ApiService.post("postInteresado", { payload });
  },
  postInteresado(payload) {
    return ApiService.post("postLawyer-interesado", { payload });
  },
  deleteInteresado(payload) {
    return ApiService.post("delete-interesado", { payload });
  },
  deleteAsociacion(payload) {
    return ApiService.post("post-desuscribe", { payload });
  },
  getAsociacionesInteresados(payload) {
    return ApiService.getParams("getAsociaciones-interesados", payload);
  }
};

export const CommentsService = {
  get(slug) {
    return ApiService.getParams("get-comments", slug);
  },

  post(payload) {
    console.log("POST COMMENT",payload);
    return ApiService.post(`create-comments`, { payload });
  },
  update(payload) {
    console.log("UPDATE COMMENT",payload);
    return ApiService.post(`update-comments`, { payload });
  },

  destroy(slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`);
  }
};

export const FavoriteService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/favorite`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/favorite`);
  }
};
