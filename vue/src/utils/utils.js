import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

export const Utils = {
    toasterError(error) {
        Vue.toasted.show(error, {
            theme: "bubble",
            position: "top-right",
            duration: 5000
        });
    }
}

