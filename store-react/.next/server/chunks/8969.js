"use strict";
exports.id = 8969;
exports.ids = [8969];
exports.modules = {

/***/ 8969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hp": () => (/* binding */ actionTypes)
/* harmony export */ });
/* unused harmony exports getCollections, getWidgets, getCollectionsSuccess, getCategories, getCategoriesSuccess, getCollection, getCollectionSuccess */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    GET_COLLECTIONS: "GET_COLLECTIONS",
    GET_COLLECTIONS_SUCCESS: "GET_COLLECTIONS_SUCCESS",
    GET_COLLECTION: "GET_COLLECTION",
    GET_COLLECTION_SUCCESS: "GET_COLLECTION_SUCCESS",
    GET_CATEGORIES: "GET_CATEGORIES",
    GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
    GET_WIDGETS: "GET_WIDGETS"
};
function getCollections(payload) {
    return {
        type: actionTypes.GET_COLLECTION,
        payload: payload
    };
}
function getWidgets(payload) {
    return {
        type: actionTypes.GET_WIDGETS,
        payload: payload
    };
}
function getCollectionsSuccess(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS_SUCCESS,
        payload
    };
}
function getCategories(payload) {
    return {
        type: actionTypes.GET_CATEGORIES,
        payload
    };
}
function getCategoriesSuccess(payload) {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload
    };
}
function getCollection(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS,
        payload: payload
    };
}
function getCollectionSuccess(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS_SUCCESS,
        payload
    };
}


/***/ })

};
;