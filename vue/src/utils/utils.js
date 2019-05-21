/**
 * methods to use at the level of the entire application
 */
import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

export const Utils = {
  /**
   * show error missage
   */
  toasterError(error) {
    Vue.toasted.show(error, {
      theme: "bubble",
      position: "top-right",
      duration: 5000
    });
  }
};
