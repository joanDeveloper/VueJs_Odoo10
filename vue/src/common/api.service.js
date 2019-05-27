import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
//import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  // setHeader() {
  //   console.log("setHeader",JwtService.getToken());
  //   Vue.axios.defaults.headers.common[
  //     "authorizationssss56557"
  //   ] = `Token ` + JwtService.getToken();
  // },

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

export const ContactService = {
  post(payload) {
    return ApiService.post(`contact`, { data: payload });
  }
};

export const UsersService = {
  get() {
    return ApiService.get("lawyers");
  },
  getAll() {
    return ApiService.get("count-all-users");
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
    return ApiService.getParams("getGuards", id);
  }
};

export const CasosService = {
  get(id) {
    return ApiService.getParams("get-casos", id);
  }
};

export const ProfileService = {
  post(payload) {
    return ApiService.post("charge-money-profile", payload);
  }
};

export const ForumService = {
  get() {
    return ApiService.get("get-temesForum");
  },
  postQuestion(payload) {
    return ApiService.post("create-commentForum", { payload });
  },
  postAnswer(payload) {
    return ApiService.post("create-answer", { payload });
  },
  getAnswer(slug) {
    return ApiService.getParams("get-answer", slug);
  },
  getQuestions(id_tema) {
    return ApiService.getParams("get-questionForum", id_tema);
  },
  getAllQuestions(slug) {
    return ApiService.getParams("get-all-questions", slug);
  },
};

export const AssociacionesService = {
  get() {
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
    return ApiService.post(`create-comments`, { payload });
  },
  update(payload) {
    return ApiService.post(`update-comments`, { payload });
  }
};
