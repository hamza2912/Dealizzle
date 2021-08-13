import { object } from 'yup/lib/locale';
import {
    GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
    GET_ARTIST_EVENTS_REQUEST, GET_ARTIST_EVENTS_SUCCESS,
    GET_ARTIST_EVENTS_FAILURE,
    SET_PRODUCT,
    SET_SKIP,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    ADD_PRODUCT_LOCAL,
} from '../constants/action-types';

// initial state of store

const initialState = {
    products: [],
    product: null,
    skip: 0,
    artist_events: [],
    productList: [],
}

// main reducer function which on the basis of check update the initial state;

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return { ...state };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, products: state.products.concat(action.payload) };
        case GET_PRODUCTS_FAILURE:
            return { ...state, products: [] }

        case SET_PRODUCT:
            return { ...state, product: action.payload };
        case SET_SKIP:
            return { ...state, skip: action.payload };

        case GET_ARTIST_EVENTS_REQUEST:
            return { ...state, artist_events: [] };
        case GET_ARTIST_EVENTS_SUCCESS:
            return { ...state, artist_events: action.payload };
        case GET_ARTIST_EVENTS_FAILURE:
            return { ...state, artist_events: [] };
        case ADD_PRODUCT:
            return { ...state, productList: state.productList.concat(action.payload) }
        case REMOVE_PRODUCT:
            return {
                ...state, productList: state.productList.filter((value, index) => index !== action.payload)

            }
        case ADD_PRODUCT_LOCAL:
            return {
                ...state, productList: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;