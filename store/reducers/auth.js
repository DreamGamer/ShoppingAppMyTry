import { AUTHENTICATE } from "../actions/auth";

const initalState = {
    token: null,
    userID: null,
};

export default (state = initalState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userID: action.userID
            }

            break;
        default:
            return state;
    }
};