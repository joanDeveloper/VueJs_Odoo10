import { ContactService } from "@/common/api.service";
import {
    SEND_CONTACT
} from "./actions.type";
import Vue from "vue";
import Toasted from 'vue-toasted';
Vue.use(Toasted);

const actions = {

    [SEND_CONTACT](context, data) {
        return new Promise((resolve, reject) => {
            ContactService.post(data)
                .then(({ data }) => {
                    if(JSON.parse(data.result).message){
                        Vue.toasted.show(JSON.parse(data.result).message, { 
                            theme: "outline", 
                            position: "top-right", 
                            duration : 5000
                       });
                    } 
                })
                .catch(() => {
                    Vue.toasted.show("There has been some problem sending the email", { 
                        theme: "bubble", 
                        position: "top-right", 
                        duration : 5000
                   });
                });
        });
    }
};

export default {
    actions
};
