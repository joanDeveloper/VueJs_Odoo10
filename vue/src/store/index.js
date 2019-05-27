import Vue from "vue";
import Vuex from "vuex";
import home from "./home.module";
import auth from "./auth.module";
import profile from "./profile.module";
import contact from "./contact.module";
import users from "./users.module";
import comments from "./comments.module";
import lawyers from "./lawyer.module";
import asociation from "./asociation.module";
import forum from "./forum.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    auth,
    profile,
    contact,
    users,
    comments,
    lawyers,
    asociation,
    forum
  }
});
