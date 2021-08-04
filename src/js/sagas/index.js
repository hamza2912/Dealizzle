import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
GET_ARTIST_EVENTS_REQUEST, GET_ARTIST_EVENTS_SUCCESS, GET_ARTIST_EVENTS_FAILURE, SET_SKIP} from '../constants/action-types';
import API from '../../services/index';
import { call, takeEvery, put } from 'redux-saga/effects';


// generator function to fetch artist on base of search

function* getProducts(action) {
    try {
        const products = yield call(API.getProducts, action.payload);
        yield put({type: GET_PRODUCTS_SUCCESS, payload: products})
    }
    catch (error) {
        yield put({type: GET_PRODUCTS_FAILURE})
    }
}


function* setSkip(action) {
    try {
        const skip =  action.payload
        yield put({ payload: skip})
    }
    catch (error) {
        yield put({type: GET_PRODUCTS_FAILURE})
    }
}

//generator function to fetch events of artist

function* getEvents(action) {
    try {
        const events = yield call(API.getArtistEvents, action.payload);
        yield put({type: GET_ARTIST_EVENTS_SUCCESS, payload: events})
    }
    catch (error) {
        yield put({type: GET_ARTIST_EVENTS_FAILURE})
    }
}

function* rootSaga() {
    yield takeEvery(GET_PRODUCTS_REQUEST, getProducts);
    yield takeEvery(GET_ARTIST_EVENTS_REQUEST, getEvents);
    yield takeEvery(SET_SKIP, setSkip);
}

export default rootSaga;