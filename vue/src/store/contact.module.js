import { ContactService } from "@/common/api.service";
import { SEND_CONTACT } from "./actions.type";
import Vue from "vue";
import { Utils } from "../utils/utils";
import Toasted from "vue-toasted";
Vue.use(Toasted);

const actions = {
  [SEND_CONTACT](context, data) {
    return new Promise((resolve, reject) => {
      ContactService.post(data)
        .then(({ data }) => {
          JSON.parse(data.result).message
            ? Utils.toasterInfo(JSON.parse(data.result).message)
            : false;
        })
        .catch(() => {
          Utils.toasterError("There has been some problem sending the email");
        });
    });
  }
};

export default {
  actions
};
