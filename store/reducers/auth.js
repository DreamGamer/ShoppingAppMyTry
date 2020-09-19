import { LOGIN, SIGNUP } from "../actions/auth";

const initalState = {
    token: null,
    userID: null,
};

export default (state = initalState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                token: action.token,
                userID: action.userID
            }

            break;
        case LOGIN:
            return {
                token: action.token,
                userID: action.userID
            }
            break;
        default:
            return state;
    }
};