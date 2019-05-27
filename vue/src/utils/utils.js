/**
 * methods use at the level of the entire application
 */
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

export const Utils = {
  /**
   * @method toasterError show error missage
   */
  toasterError(error) {
    Vue.toasted.show(error, {
      theme: "bubble",
      position: "top-right",
      duration: 5000
    });
  },
  /**
   * @method toasterError show information missage
   */
  toasterInfo(content) {
    Vue.toasted.show(content, {
      theme: "outline",
      position: "top-right",
      duration: 5000
    });
  },
  /**
   * @method TitleBannerForum show title banner forum (questions, answer)
   */
  TitleBannerForum(slug) {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/gi, " ");
  },
  /**
   * @method TitleBannerTemeForum show title banner forum (itemForo)
   */
  TitleBannerTemeForum(slug) {
    return (
      slug
        .split("tema-")[1]
        .charAt(0)
        .toUpperCase() +
      slug
        .split("tema-")[1]
        .slice(1)
        .replace("-", " ")
    );
  }
};
