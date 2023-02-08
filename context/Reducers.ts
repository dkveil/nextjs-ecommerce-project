import { IShoppingCartItem } from "../types/ShoppingCartItem.types";
import { IUser, IUserDetails } from "../types/User.types";
import ACTIONS from "./Actions";
import type { IInitialState } from "./GlobalContext";

const reducers = (state: IInitialState, action: ActionTypes): IInitialState => {
    switch(action.type){
        case ACTIONS.LANGUAGE as LanguageActionTypes["type"]:
            return {
                ...state,
                currentLanguage: action.payload
            }
        case ACTIONS.NOTIFY as NotifyActionTypes["type"]:
            return {
                ...state,
                notify: action.payload
            }
        case ACTIONS.USER  as UserActionTypes["type"]:
            return {
                ...state,
                user: action.payload
            }
        case ACTIONS.SET_USER_DETAILS as UserDetailsActionTypes["type"]:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: action.payload
                }
            }
        case ACTIONS.LOGOUT_USER as LogoutActionTypes["type"]:
            return {
                ...state,
                user: null
            }
        case ACTIONS.CHANGE_THEME as ChangeThemeActionTypes["type"]:
            return{
                ...state,
                websiteTheme: action.payload
            }
        case ACTIONS.SET_SHOPPING_CART as ShoppingCartActionTypes["type"]:
            return {
                ...state,
                shoppingcart: action.payload
            }
        case ACTIONS.SET_WISHLIST as WishlistActionTypes["type"]:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...state.user?.data,
                        wishlist: action.payload
                    }
                }
            }
        default:
            return state
    }
}

export default reducers

export type LanguageActionTypes = {
    type: 'LANGUAGE',
    payload: 'ENG' | 'PL'
}

export type NotifyActionTypes = {
    type: 'NOTIFY',
    payload: string | null
}

export type UserActionTypes = {
    type: 'USER',
    payload: IUser
}

export type UserDetailsActionTypes = {
    type: 'SET USER DETAILS',
    payload: IUserDetails
}

export type LogoutActionTypes = {
    type: 'LOGOUT USER';
}

export type ChangeThemeActionTypes = {
    type: 'CHANGE THEME',
    payload: 'light theme' | 'dark theme'
}

export type ShoppingCartActionTypes = {
    type: 'SET SHOPPING CART',
    payload: IShoppingCartItem[]
}

export type WishlistActionTypes = {
    type: 'SET WISHLIST',
    payload: { productId: string, createdAt: string }[]
}

export type ActionTypes = LanguageActionTypes | NotifyActionTypes | UserActionTypes | UserDetailsActionTypes |  LogoutActionTypes | ChangeThemeActionTypes | ShoppingCartActionTypes | WishlistActionTypes
