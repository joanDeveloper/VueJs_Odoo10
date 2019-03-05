import { UsersService } from "@/common/api.service";
import {
    GET_LAWYERS
} from "./actions.type";

const actions = {

    [GET_LAWYERS](context, data) {
        UsersService.get()
            .then(({ data }) => {
                console.log("GET_LAWYERS", data);
            })
            .catch(() => {

            });
    }
};

export default {
    actions
};
