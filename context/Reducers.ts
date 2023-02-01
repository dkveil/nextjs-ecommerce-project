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
        case ACTIONS.SET_USER_DETAILS:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload
                }
            }
        case ACTIONS.LOGOUT_USER:
            return {
                ...state,
                user: null
            }
        case ACTIONS.CHANGE_THEME:
            return{
                ...state,
                websiteTheme: action.payload
            }
        case ACTIONS.SET_SHOPPING_CART:
            return {
                ...state,
                shoppingcart: action.payload
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

type LogoutActionTypes = {
    type: 'LOGOUT USER';
    payload?: string
}

type ChangeThemeActionTypes = {
    type: 'CHANGE THEME',
    payload?: 'light theme' | 'change theme'
}
export type ActionTypes = LanguageActionTypes | NotifyActionTypes | UserActionTypes | LogoutActionTypes | ChangeThemeActionTypes;
