import { ActionTypes } from "./Reducers"
import type { IShoppingCartItem } from "./GlobalContext"

const ACTIONS = {
    LANGUAGE: 'LANGUAGE',
    NOTIFY: 'NOTIFY',
    USER: 'USER',
    LOGOUT_USER: 'LOGOUT USER',
    CHANGE_THEME: 'CHANGE THEME',
    SET_SHOPPING_CART: 'SET SHOPPING CART',
}

export const addItemToShoppingCart = (product: IShoppingCartItem, cart: IShoppingCartItem[]) => {

}

export default ACTIONS