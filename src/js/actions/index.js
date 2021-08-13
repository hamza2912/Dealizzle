import { GET_PRODUCTS_REQUEST, GET_ARTIST_EVENTS_REQUEST, SET_PRODUCT, SET_SKIP, ADD_PRODUCT, REMOVE_PRODUCT, ADD_PRODUCT_LOCAL } from '../constants/action-types'

export function getProducts(payload) {
    return { type: GET_PRODUCTS_REQUEST, payload };
}

export function setProduct(payload) {
    return { type: SET_PRODUCT, payload };
}

export function setSkip(payload) {
    return { type: SET_SKIP, payload };
}

export function getArtistEvents(payload) {
    return { type: GET_ARTIST_EVENTS_REQUEST, payload };
}
export function addProduct(payload) {
    return { type: ADD_PRODUCT, payload };
}
export function removeProduct(payload) {
    return { type: REMOVE_PRODUCT, payload };
}
export function addProductLocal(payload) {
    return { type: ADD_PRODUCT_LOCAL, payload };
}
