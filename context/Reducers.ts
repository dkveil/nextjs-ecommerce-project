import ACTIONS from "./Actions";
import type { IInitialState } from "./GlobalContext";

const reducers = (state: IInitialState, action: ActionTypes) => {
    switch(action.type){
        case ACTIONS.LANGUAGE:
            return {
                ...state,
                currentLanguage: action.payload
            }
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            }
        case ACTIONS.USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default reducers

type LanguageActionTypes = {
    type: 'LANGUAGE',
    payload: string
}

type NotifyActionTypes = {
    type: 'NOTIFY',
    payload: string
}

type UserActionTypes = {
    type: 'USER',
    payload: null
}

export type ActionTypes = LanguageActionTypes | NotifyActionTypes | UserActionTypes;
