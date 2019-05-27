/**
 * methods use at the level of the entire application
 */
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

export const Utils = {
  /**
   * show error missage
   * @method toasterError
   */
  toasterError(error) {
    Vue.toasted.show(error, {
      theme: "bubble",
      position: "top-right",
      duration: 5000
    });
  },
  /**
   * show information missage
   * @method toasterInfo
   */
  toasterInfo(content) {
    Vue.toasted.show(content, {
      theme: "outline",
      position: "top-right",
      duration: 5000
    });
  },
  /**
   * replace hyphens with spaces and the first letter in uppercase
   * @method TitleBannerForum
   */
  TitleBannerForum(slug) {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/gi, " ");
  },
  /**
   * replace hyphens with spaces and the first letter in uppercase
   * @method TitleBannerTemeForum
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
