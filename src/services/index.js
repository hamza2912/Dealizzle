import axios from 'axios';

const BASE_URL = "http://office21.dealizle.com/api/";

const API = {
    getProducts: (skip) => {
        console.log("Running Check")
        return axios
            .post(BASE_URL + "store/product/catalog/query/get", {
                "models": {
                    "location_data.value": "5f8be51e3277577ba1b84d2c",
                    "category.value": "606b54ba0846def3c4b09a19"
                },
                "skip": skip,
                "limit": 5,

            })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    getClearneceProducts: (skip) => {
        console.log("Running")
        return axios
            .post(BASE_URL + "store/product/catalog/query/get", {
                "models": {
                    "location_data.website_remarkse": "5f8be51e3277577ba1b84d2c_Live",
                    "category.value": "610173363351d210026762a9"
                },
                "skip": 0,
                "limit": 5,
                "sort": { "modified_date": -1 }
            })
            .then(response => {
                console.log("clearence product API")
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    getArtistEvents: (searchText) => {
        return axios
            .get(BASE_URL + `${searchText}/events?app_id=1`)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

export default API;