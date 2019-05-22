import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * All the routes of the application, which point to the component or view
 */
export default new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home")
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/views/Register")
    },
    {
      name: "settings",
      path: "/settings",
      component: () => import("@/views/Settings")
    },
    {
      name: "contact",
      path: "/contact",
      component: () => import("@/views/Contact")
    },
    {
      path: "/list/:categories",
      component: () => import("@/components/ItemList"),
      children: [
        {
          path: "",
          name: "listItems"
        }
      ]
    },
    {
      path: "/detail/:id",
      component: () => import("@/components/ItemDetail"),
      children: [
        {
          path: "",
          name: "detailItems"
        }
      ]
    },
    {
      path: "/lista/:categories",
      component: () => import("@/components/GuardiasLawyer"),
      children: [
        {
          path: "",
          name: "guardiasLawyer"
        }
      ]
    },
    {
      path: "/listar/:categories",
      component: () => import("@/components/CasosLawyer"),
      children: [
        {
          path: "",
          name: "casosLawyer"
        }
      ]
    },
    {
      path: "/listas/:categories",
      component: () => import("@/components/Associaciones"),
      children: [
        {
          path: "",
          name: "AssociacionesLawyer"
        }
      ]
    },
    {
      name: "foro",
      path: "/foro",
      component: () => import("@/components/Foro")
    },
    {
      name: "itemForum",
      path: "/foro/:slug",
      component: () => import("@/components/ItemForo")
    },

    {
      name: "questionsForum",
      path: "/foro/questions/:subtema",
      component: () => import("@/components/QuestionsForum")
    },
    {
      name: "answerForum",
      path: "/foro/answers/:subtema",
      component: () => import("@/components/AnswerForum")
    },
    // Handle child routes with a default, by giving the name to the
    // child.
    // SO: https://github.com/vuejs/vue-router/issues/777

    {
      name: "profile",
      path: "/@:username",
      component: () => import("@/views/Profile")
    }
  ]
});
