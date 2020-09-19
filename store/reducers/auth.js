import { AUTHENTICATE, LOGOUT } from "../actions/auth";

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
        case LOGOUT:
                return initalState
            break;
        default:
            return state;
    }
};