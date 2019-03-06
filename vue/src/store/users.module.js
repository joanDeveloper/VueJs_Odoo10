import { UsersService } from "@/common/api.service";
import {
    GET_LAWYERS
} from "./actions.type";

const state = {
    users: [],
    isLoading: true
};

const getters = {
    user(state) { return state.users; }
};

const actions = {
    [GET_LAWYERS](context, data) {
        console.log("CONTEXT", context);
        UsersService.get()
            .then(({ data }) => {
                console.log("GET_LAWYERS", data);
                state.users = data;
            })
            .catch(() => {

            });
    }
};

export default {
    actions,
    state,
    getters
};
