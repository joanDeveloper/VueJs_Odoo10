import { ContactService } from "@/common/api.service";
import {
    SEND_CONTACT
} from "./actions.type";

const actions = {

    [SEND_CONTACT](context, data) {
        return new Promise((resolve, reject) => {
            ContactService.post(data)
                .then(({ data }) => {
                    console.log("SUCCESS", JSON.parse(data.result));
                    if(JSON.parse(data.result).message) alert("EMAIL SEND CORRECT");
                })
                .catch(({ response }) => {
                    alert("There has been some problem sending the email");
                });
        });
    }
};

export default {
    actions
};
