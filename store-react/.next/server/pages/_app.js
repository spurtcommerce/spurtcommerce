"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 9061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__(7544);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(6695);
;// CONCATENATED MODULE: external "redux-devtools-extension"
const external_redux_devtools_extension_namespaceObject = require("redux-devtools-extension");
;// CONCATENATED MODULE: ./src/store/post/action.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    GET_POSTS: "GET_POSTS",
    GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
    GET_POSTS_ERROR: "GET_POSTS_ERROR",
    GET_FEATURED_POST: "GET_FEATURED_POST",
    GET_FEATURED_POST_SUCCESS: "GET_FEATURED_POST_SUCCESS",
    GET_FEATURED_POST_ERROR: "GET_FEATURED_POST_ERROR",
    GET_RECENT_POSTS: "GET_RECENT_POSTS",
    GET_RECENT_POSTS_SUCCESS: "GET_RECENT_POSTS_SUCCESS",
    GET_RECENT_POSTS_ERROR: "GET_RECENT_POSTS_ERROR",
    GET_POST_CATEGORIES: "GET_POST_CATEGORIES",
    GET_POST_CATEGORIES_SUCCESS: "GET_POST_CATEGORIES_SUCCESS",
    GET_POST_CATEGORIES_ERROR: "GET_POST_CATEGORIES_ERROR",
    GET_RELATED_BLOG: "GET_RELATED_BLOG",
    GET_POST_DETAIL: "GET_POST_DETAIL"
};
function getPosts(payload) {
    return {
        type: actionTypes.GET_POSTS,
        payload: payload
    };
}
function getPostsDetail(payload) {
    return {
        type: actionTypes.GET_POST_DETAIL,
        payload: payload
    };
}
function getRelatedBlog(payload) {
    return {
        type: actionTypes.GET_RELATED_BLOG,
        payload: payload
    };
}
function getPostsSuccess(data) {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        data
    };
}
function getPostsError(error) {
    return {
        type: actionTypes.GET_POSTS_ERROR,
        error
    };
}
function getFeaturedPost() {
    return {
        type: actionTypes.GET_FEATURED_POST
    };
}
function getFeaturedPostSuccess(data) {
    return {
        type: actionTypes.GET_FEATURED_POST_SUCCESS,
        data
    };
}
function getFeaturedPostError(error) {
    return {
        type: actionTypes.GET_FEATURED_POST_ERROR,
        error
    };
}
function getRecentPosts() {
    return {
        type: actionTypes.GET_RECENT_POSTS
    };
}
function getRecentPostsSuccess(data) {
    return {
        type: actionTypes.GET_RECENT_POSTS_SUCCESS,
        data
    };
}
function getRecentPostsError(error) {
    return {
        type: actionTypes.GET_RECENT_POSTS_ERROR,
        error
    };
}
function getPostCategories() {
    return {
        type: actionTypes.GET_POST_CATEGORIES
    };
}
function getPostCategoriesSuccess(data) {
    return {
        type: actionTypes.GET_POST_CATEGORIES_SUCCESS,
        data
    };
}
function getPostCategoriesError(error) {
    return {
        type: actionTypes.GET_POST_CATEGORIES_ERROR,
        error
    };
}

;// CONCATENATED MODULE: ./src/store/post/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const initialState = {
    posts: [],
    featuredPost: null,
    recentPost: [],
    categories: [],
    error: false,
    relatedBlog: [],
    postDet: {}
};
function reducer(state = initialState, action) {
    switch(action.type){
        case actionTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                ...{
                    posts: action.data
                }
            };
        case actionTypes.GET_POST_DETAIL:
            return {
                ...state,
                ...{
                    postDet: action.payload
                }
            };
        case actionTypes.GET_RELATED_BLOG:
            return {
                ...state,
                ...{
                    relatedBlog: action.payload
                }
            };
        case actionTypes.GET_POSTS:
            return {
                ...state,
                ...{
                    posts: action.payload
                }
            };
        case actionTypes.GET_FEATURED_POST_SUCCESS:
            return {
                ...state,
                ...{
                    featuredPost: action.data
                }
            };
        case actionTypes.GET_RECENT_POSTS_SUCCESS:
            return {
                ...state,
                ...{
                    recentPost: action.data
                }
            };
        case actionTypes.GET_POST_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{
                    categories: action.data
                }
            };
        case actionTypes.GET_POSTS_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case actionTypes.GET_FEATURED_POST_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case actionTypes.GET_RECENT_POSTS_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case actionTypes.GET_POST_CATEGORIES_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const post_reducer = (reducer);

// EXTERNAL MODULE: ./src/store/product/action.js
var product_action = __webpack_require__(2188);
;// CONCATENATED MODULE: ./src/store/product/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const reducer_initialState = {
    allProducts: null,
    singleProduct: {},
    error: false,
    totalProducts: 0,
    categories: [],
    brands: [],
    orderBy: "",
    productsLoading: true,
    productLoading: true,
    searchResults: null,
    price: {
        priceMin: 0,
        priceMax: ""
    },
    Ratingcounts: [],
    DetailpageReviews: [],
    Homerevies: "",
    option: {},
    triggersss: 0,
    varientapisprocut: {},
    hidefunavailable: false,
    sliderdataimage: [],
    skunameerdataimage: [],
    qut: 1,
    crumbarrcate: [],
    coupongetdata: {},
    discountpriceamount: [],
    totalpayable: [],
    couponsapplydata: [],
    totaldatas: [],
    maildata: []
};
function reducer_reducer(state = reducer_initialState, action) {
    switch(action.type){
        case product_action/* actionTypes.GET_PRODUCTS */.Hp.GET_PRODUCTS:
            return {
                ...state,
                ...{
                    allProducts: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_CATEGORIES */.Hp.GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                ...{
                    categories: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCTS_BY_PRICE_RANGE */.Hp.GET_PRODUCTS_BY_PRICE_RANGE:
            return {
                ...state,
                ...{
                    price: action.payload
                }
            };
        case product_action/* actionTypes.GET_ORDERBY */.Hp.GET_ORDERBY:
            return {
                ...state,
                ...{
                    orderBy: action.payload
                }
            };
        case product_action/* actionTypes.GET_TOTAL_OF_PRODUCTS */.Hp.GET_TOTAL_OF_PRODUCTS:
            return {
                ...state,
                ...{
                    totalProducts: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCTS_SUCCESS */.Hp.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{
                    allProducts: action.data,
                    productsLoading: false
                }
            };
        case product_action/* actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS */.Hp.GET_TOTAL_OF_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{
                    totalProducts: action.payload
                }
            };
        case product_action/* actionTypes.GET_BRANDS */.Hp.GET_BRANDS:
            return {
                ...state,
                ...{
                    brands: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS */.Hp.GET_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{
                    categories: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_BY_ID_SUCCESS */.Hp.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                ...{
                    singleProduct: action.data,
                    productLoading: false
                }
            };
        case product_action/* actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS */.Hp.GET_PRODUCTS_BY_KEYWORD_SUCCESS:
            return {
                ...state,
                ...{
                    searchResults: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCTS_ERROR */.Hp.GET_PRODUCTS_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_BY_ID */.Hp.GET_PRODUCT_BY_ID:
            return {
                ...state,
                ...{
                    singleProduct: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_LOADING */.Hp.GET_PRODUCT_LOADING:
            return {
                ...state,
                ...{
                    productLoading: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_RATING_COUNT */.Hp.GET_PRODUCT_RATING_COUNT:
            return {
                ...state,
                ...{
                    Ratingcounts: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_DETAIL_REVIEWS */.Hp.GET_PRODUCT_DETAIL_REVIEWS:
            return {
                ...state,
                ...{
                    DetailpageReviews: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_HOME_REVIEWS */.Hp.GET_PRODUCT_HOME_REVIEWS:
            return {
                ...state,
                ...{
                    Homerevies: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_OPTION_REVIEWS */.Hp.GET_PRODUCT_OPTION_REVIEWS:
            return {
                ...state,
                ...{
                    option: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_TRIGGERS */.Hp.GET_PRODUCT_TRIGGERS:
            return {
                ...state,
                ...{
                    triggersss: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_BY_ID_VARIENT_APIS */.Hp.GET_PRODUCT_BY_ID_VARIENT_APIS:
            return {
                ...state,
                ...{
                    varientapisprocut: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN */.Hp.GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN:
            return {
                ...state,
                ...{
                    hidefunavailable: action.payload
                }
            };
        case product_action/* actionTypes.GET_PRODUCT_SLIDER_IMAGE_CLICK */.Hp.GET_PRODUCT_SLIDER_IMAGE_CLICK:
            return {
                ...state,
                ...{
                    sliderdataimage: action.payload
                }
            };
        case product_action/* actionTypes.GET_SKU_APIS */.Hp.GET_SKU_APIS:
            return {
                ...state,
                ...{
                    skunameerdataimage: action.payload
                }
            };
        case product_action/* actionTypes.GET_QUT_APIS */.Hp.GET_QUT_APIS:
            return {
                ...state,
                ...{
                    qut: action.payload
                }
            };
        case product_action/* actionTypes.GET_CATE_CARY_CRUMB */.Hp.GET_CATE_CARY_CRUMB:
            return {
                ...state,
                ...{
                    crumbarrcate: action.payload
                }
            };
        case product_action/* actionTypes.GET_COUPON_DATA */.Hp.GET_COUPON_DATA:
            return {
                ...state,
                ...{
                    coupongetdata: action.payload
                }
            };
        case product_action/* actionTypes.GET_DISCOUNT_PRICE */.Hp.GET_DISCOUNT_PRICE:
            return {
                ...state,
                ...{
                    discountpriceamount: action.payload
                }
            };
        case product_action/* actionTypes.GET_TOTAL_PAYABLE */.Hp.GET_TOTAL_PAYABLE:
            return {
                ...state,
                ...{
                    totalpayable: action.payload
                }
            };
        case product_action/* actionTypes.GET_COUPONS_DATAS */.Hp.GET_COUPONS_DATAS:
            return {
                ...state,
                ...{
                    couponsapplydata: action.payload
                }
            };
        case product_action/* actionTypes.GET_TOTAL_DATA */.Hp.GET_TOTAL_DATA:
            return {
                ...state,
                ...{
                    totaldatas: action.payload
                }
            };
        case product_action/* actionTypes.GET_MAIL_ID */.Hp.GET_MAIL_ID:
            return {
                ...state,
                ...{
                    maildata: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const product_reducer = (reducer_reducer);

// EXTERNAL MODULE: ./src/store/setting/action.js
var setting_action = __webpack_require__(9086);
;// CONCATENATED MODULE: ./src/store/setting/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const setting_reducer_initialState = {
    currency: {
        symbol: "$",
        text: "USD"
    },
    editDetail: {},
    footerDet: {},
    footerPage: [],
    servicelist: [],
    seviceInfo: [],
    maintenance: 0
};
function setting_reducer_reducer(state = setting_reducer_initialState, action) {
    switch(action.type){
        case setting_action/* actionTypes.CHANGE_CURRENCY */.Hp.CHANGE_CURRENCY:
            return {
                ...state,
                ...{
                    currency: action.payload
                }
            };
        case setting_action/* actionTypes.EDIT_ADDRESS_DETAIL */.Hp.EDIT_ADDRESS_DETAIL:
            return {
                ...state,
                ...{
                    editDetail: action.payload
                }
            };
        case setting_action/* actionTypes.FOOTER_PAGE_LIST */.Hp.FOOTER_PAGE_LIST:
            return {
                ...state,
                ...{
                    footerDet: action.payload
                }
            };
        case setting_action/* actionTypes.FOOTER_ADDRESS */.Hp.FOOTER_ADDRESS:
            return {
                ...state,
                ...{
                    footerPage: action.payload
                }
            };
        case setting_action/* actionTypes.SERVICE_LIST */.Hp.SERVICE_LIST:
            return {
                ...state,
                ...{
                    servicelist: action.payload
                }
            };
        case setting_action/* actionTypes.SERVICE_LIST_INFO */.Hp.SERVICE_LIST_INFO:
            return {
                ...state,
                ...{
                    seviceInfo: action.payload
                }
            };
        case setting_action/* actionTypes.MAINTENANCE_DETAIL */.Hp.MAINTENANCE_DETAIL:
            return {
                ...state,
                ...{
                    maintenance: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const setting_reducer = (setting_reducer_reducer);

// EXTERNAL MODULE: ./src/store/cart/action.js
var cart_action = __webpack_require__(5848);
;// CONCATENATED MODULE: ./src/store/cart/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const initCart = {
    cartItems: [],
    amount: 0,
    cartTotal: 0,
    addproduct: 0,
    removeproduct: "",
    increment: "",
    decrement: "",
    reloadedheader: 0
};
function cart_reducer_reducer(state = initCart, action) {
    switch(action.type){
        case cart_action/* actionTypes.GET_CART_SUCCESS */.Hp.GET_CART_SUCCESS:
            return {
                ...state
            };
        case cart_action/* actionTypes.UPDATE_CART_SUCCESS */.Hp.UPDATE_CART_SUCCESS:
            return {
                ...state,
                ...{
                    cartItems: action.payload.cartItems
                },
                ...{
                    amount: action.payload.amount
                },
                ...{
                    cartTotal: action.payload.cartTotal
                }
            };
        case cart_action/* actionTypes.CLEAR_CART_SUCCESS */.Hp.CLEAR_CART_SUCCESS:
            return {
                ...state,
                ...{
                    cartItems: action.payload.cartItems
                },
                ...{
                    amount: action.payload.amount
                },
                ...{
                    cartTotal: action.payload.cartTotal
                }
            };
        case cart_action/* actionTypes.GET_CART_ERROR */.Hp.GET_CART_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case cart_action/* actionTypes.UPDATE_CART_ERROR */.Hp.UPDATE_CART_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case cart_action/* actionTypes.GET_CART */.Hp.GET_CART:
            return {
                ...state,
                ...{
                    cartItems: action.payload
                }
            };
        case cart_action/* actionTypes.ADD_ITEM */.Hp.ADD_ITEM:
            return {
                ...state,
                ...{
                    addproduct: state.addproduct + 1
                }
            };
        case cart_action/* actionTypes.REMOVE_ITEM */.Hp.REMOVE_ITEM:
            return {
                ...state,
                ...{
                    removeproduct: action.payload
                }
            };
        case cart_action/* actionTypes.INCREASE_QTY */.Hp.INCREASE_QTY:
            return {
                ...state,
                ...{
                    increment: action.payload
                }
            };
        case cart_action/* actionTypes.DECREASE_QTY */.Hp.DECREASE_QTY:
            return {
                ...state,
                ...{
                    decrement: action.payload
                }
            };
        case cart_action/* actionTypes.ADD_ITEM_RELOAD */.Hp.ADD_ITEM_RELOAD:
            return {
                ...state,
                ...{
                    reloadedheader: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const cart_reducer = (cart_reducer_reducer);

// EXTERNAL MODULE: ./src/store/compare/action.js
var compare_action = __webpack_require__(6011);
;// CONCATENATED MODULE: ./src/store/compare/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const reducer_initCart = {
    compareItems: [],
    compareTotal: 0,
    compareCount: 0,
    compareLoading: true,
    comparecompare: [],
    comparecompareloadings: []
};
function compare_reducer_reducer(state = reducer_initCart, action) {
    switch(action.type){
        case compare_action/* actionTypes.GET_COMPARE_LIST_SUCCESS */.Hp.GET_COMPARE_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    cart: action.data
                }
            };
        case compare_action/* actionTypes.UPDATE_COMPARE_LIST_SUCCESS */.Hp.UPDATE_COMPARE_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    compareItems: action.payload.compareItems,
                    compareTotal: action.payload.compareTotal
                }
            };
        case compare_action/* actionTypes.GET_COMPARE_LIST_ERROR */.Hp.GET_COMPARE_LIST_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case compare_action/* actionTypes.GET_COMPARE_LIST */.Hp.GET_COMPARE_LIST:
            return {
                ...state,
                ...{
                    compareCount: action.payload
                }
            };
        case compare_action/* actionTypes.COMPARE_LOADING */.Hp.COMPARE_LOADING:
            return {
                ...state,
                ...{
                    compareLoading: action.payload
                }
            };
        case compare_action/* actionTypes.GET_COMPARE_LIST_COMPARE */.Hp.GET_COMPARE_LIST_COMPARE:
            return {
                ...state,
                ...{
                    comparecompare: action.payload,
                    comparecompareloadings: action.payload
                }
            };
        case compare_action/* actionTypes.COMPARE_LOADING_WAITINGS */.Hp.COMPARE_LOADING_WAITINGS:
            return {
                ...state,
                ...{
                    comparecompareloadings: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const compare_reducer = (compare_reducer_reducer);

// EXTERNAL MODULE: ./src/store/auth/action.js
var auth_action = __webpack_require__(6250);
;// CONCATENATED MODULE: ./src/store/auth/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const initState = {
    isLoggedIn: false
};
function auth_reducer_reducer(state = initState, action) {
    switch(action.type){
        case auth_action/* actionTypes.LOGIN_SUCCESS */.Hp.LOGIN_SUCCESS:
            return {
                ...state,
                ...{
                    isLoggedIn: true
                }
            };
        case auth_action/* actionTypes.LOGIN_REQUEST */.Hp.LOGIN_REQUEST:
            return {
                ...state,
                ...{
                    isLoggedIn: true
                }
            };
        case auth_action/* actionTypes.LOGOUT */.Hp.LOGOUT:
            return {
                ...state,
                ...{
                    isLoggedIn: false
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const auth_reducer = (auth_reducer_reducer);

// EXTERNAL MODULE: ./src/store/wishlist/action.js
var wishlist_action = __webpack_require__(9751);
;// CONCATENATED MODULE: ./src/store/wishlist/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const reducer_initState = {
    wishlistItems: [],
    wishlistTotal: 0,
    addwishlist: 0,
    wishLoad: true,
    langagechange: "",
    mainloadedone: [],
    banners: []
};
function wishlist_reducer_reducer(state = reducer_initState, action) {
    switch(action.type){
        case wishlist_action/* actionTypes.GET_WISHLIST_LIST */.Hp.GET_WISHLIST_LIST:
            return {
                ...state,
                ...{
                    wishlistItems: action.payload
                }
            };
        case wishlist_action/* actionTypes.UPDATE_WISHLISH_LIST_SUCCESS */.Hp.UPDATE_WISHLISH_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    wishlistItems: action.payload.wishlistItems,
                    wishlistTotal: action.payload.wishlistTotal
                }
            };
        case wishlist_action/* actionTypes.GET_WISHLIST_LIST_ERROR */.Hp.GET_WISHLIST_LIST_ERROR:
            return {
                ...state,
                ...{
                    error: action.error
                }
            };
        case wishlist_action/* actionTypes.ADD_ITEM_WISHLISH */.Hp.ADD_ITEM_WISHLISH:
            return {
                ...state,
                ...{
                    addwishlist: action.payload
                }
            };
        case wishlist_action/* actionTypes.WISHLIST_LOADING */.Hp.WISHLIST_LOADING:
            return {
                ...state,
                ...{
                    wishLoad: action.payload
                }
            };
        case wishlist_action/* actionTypes.LANGUAGE_LOADING */.Hp.LANGUAGE_LOADING:
            return {
                ...state,
                ...{
                    langagechange: action.payload
                }
            };
        case wishlist_action/* actionTypes.LANGUAGE_LOADING_ONE_TIME */.Hp.LANGUAGE_LOADING_ONE_TIME:
            return {
                ...state,
                ...{
                    mainloadedone: action.payload
                }
            };
        case wishlist_action/* actionTypes.BANNER_MAIND_ONE_TIME */.Hp.BANNER_MAIND_ONE_TIME:
            return {
                ...state,
                ...{
                    banners: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const wishlist_reducer = (wishlist_reducer_reducer);

// EXTERNAL MODULE: ./src/store/collection/action.js
var collection_action = __webpack_require__(8969);
;// CONCATENATED MODULE: ./src/store/collection/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const collection_reducer_initialState = {
    collections: [],
    categories: [],
    collection: [],
    widgets: []
};
function collection_reducer_reducer(state = collection_reducer_initialState, action) {
    switch(action.type){
        case collection_action/* actionTypes.GET_COLLECTIONS_SUCCESS */.Hp.GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                ...{
                    collections: action.payload
                }
            };
        case collection_action/* actionTypes.GET_COLLECTION_SUCCESS */.Hp.GET_COLLECTION_SUCCESS:
            return {
                ...state,
                ...{
                    collection: action.payload
                }
            };
        case collection_action/* actionTypes.GET_COLLECTIONS */.Hp.GET_COLLECTIONS:
            return {
                ...state,
                ...{
                    collections: action.payload
                }
            };
        case collection_action/* actionTypes.GET_COLLECTION */.Hp.GET_COLLECTION:
            return {
                ...state,
                ...{
                    collection: action.payload
                }
            };
        case collection_action/* actionTypes.GET_WIDGETS */.Hp.GET_WIDGETS:
            return {
                ...state,
                ...{
                    widgets: action.payload
                }
            };
        case collection_action/* actionTypes.GET_CATEGORIES_SUCCESS */.Hp.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{
                    categories: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const collection_reducer = (collection_reducer_reducer);

// EXTERNAL MODULE: ./src/store/colorPalette/action.js
var colorPalette_action = __webpack_require__(969);
;// CONCATENATED MODULE: ./src/store/colorPalette/reducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const palette = {
    showContent: "color-show",
    currentColor: "blue",
    viewcurrentColor: "bluecolor",
    viewpannel: "block"
};
function colorPalette_reducer_reducer(state = palette, action) {
    switch(action.type){
        case colorPalette_action/* actionTypes.COLOR_SHOW */.Hp.COLOR_SHOW:
            return {
                ...state,
                ...{
                    showContent: action.payload
                }
            };
        case colorPalette_action/* actionTypes.COLOR_THEME */.Hp.COLOR_THEME:
            return {
                ...state,
                ...{
                    currentColor: action.payload
                }
            };
        case colorPalette_action/* actionTypes.COLOR_VIEW */.Hp.COLOR_VIEW:
            return {
                ...state,
                ...{
                    viewcurrentColor: action.payload
                }
            };
        case colorPalette_action/* actionTypes.DISPLAY_PANEL */.Hp.DISPLAY_PANEL:
            return {
                ...state,
                ...{
                    viewpannel: action.payload
                }
            };
        default:
            return state;
    }
}
/* harmony default export */ const colorPalette_reducer = (colorPalette_reducer_reducer);

;// CONCATENATED MODULE: ./src/store/rootReducer.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 









/* harmony default export */ const rootReducer = ((0,external_redux_.combineReducers)({
    auth: auth_reducer,
    post: post_reducer,
    product: product_reducer,
    setting: setting_reducer,
    cart: cart_reducer,
    compare: compare_reducer,
    wishlist: wishlist_reducer,
    collection: collection_reducer,
    palette: colorPalette_reducer
}));

;// CONCATENATED MODULE: external "redux-thunk"
const external_redux_thunk_namespaceObject = require("redux-thunk");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_namespaceObject);
;// CONCATENATED MODULE: external "next-redux-wrapper"
const external_next_redux_wrapper_namespaceObject = require("next-redux-wrapper");
;// CONCATENATED MODULE: ./src/store/store.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const store_initialState = {};
const middleware = [
    (external_redux_thunk_default())
];
const configureStore = (0,external_redux_.createStore)(rootReducer, store_initialState, (0,external_redux_devtools_extension_namespaceObject.composeWithDevTools)((0,external_redux_.applyMiddleware)(...middleware)));
/* harmony default export */ const store = (configureStore);
const makestore = ()=>configureStore;
const wrappers = (0,external_next_redux_wrapper_namespaceObject.createWrapper)(makestore);

// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./src/components/layouts/modules/Head.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


const StyleSheets = ()=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: "spurtcommerce"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "shortcut icon",
                href: "/static/img/favi.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                href: "/static/img/favi.png",
                sizes: "32x32"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "icon",
                href: "/static/img/favi.png",
                sizes: "192x192"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "apple-touch-icon-precomposed",
                href: "/static/img/favi.png"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                httpEquiv: "X-UA-Compatible",
                content: "IE=edge"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "format-detection",
                content: "telephone=no"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "apple-mobile-web-app-capable",
                content: "yes"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "author",
                content: "nouthemes"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "keywords",
                content: "Martfury, React, eCommerce, Template"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "description",
                content: "Martfury - React eCommerce Template"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css",
                integrity: "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
                crossorigin: "anonymous"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                href: "https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i",
                rel: "stylesheet"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "/static/fonts/Linearicons/Font/demo-files/demo.css"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "/static/fonts/font-awesome/css/font-awesome.min.css"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                type: "text/css",
                href: "/static/css/slick.min.css"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("script", {
                src: "https://code.jquery.com/jquery-3.2.1.slim.min.js",
                integrity: "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN",
                crossorigin: "anonymous"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("script", {
                src: "https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js",
                integrity: "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q",
                crossorigin: "anonymous"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("script", {
                src: "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js",
                integrity: "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl",
                crossorigin: "anonymous"
            })
        ]
    });
/* harmony default export */ const Head = (StyleSheets);

;// CONCATENATED MODULE: ./src/components/elements/BackToTop.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

const BackToTop = ()=>{
    const { 0: visible , 1: setVisible  } = (0,external_react_.useState)(false);
    const toggleVisible = ()=>{
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    (0,external_react_.useEffect)(()=>{
        window.addEventListener("scroll", toggleVisible);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            style: {
                display: visible ? "inline" : "none"
            },
            id: "back2top",
            className: "ps-btn--back-to-top",
            onClick: (e)=>scrollToTop(e),
            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "icon-chevron-up"
            })
        })
    });
};
/* harmony default export */ const elements_BackToTop = (BackToTop);

// EXTERNAL MODULE: ./src/components/partials/account/Login.jsx + 1 modules
var Login = __webpack_require__(8402);
;// CONCATENATED MODULE: ./src/components/layouts/DefaultLayout.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const DefaultLayout = ({ children , authCard , authCardState  })=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: authCard == true && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "layout--default",
            children: [
                connectPlugins/* ConnectPlugin.HeaderDefault */.d.HeaderDefault && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.HeaderDefault */.d.HeaderDefault, {}),
                connectPlugins/* ConnectPlugin.HeaderMobile */.d.HeaderMobile && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.HeaderMobile */.d.HeaderMobile, {}),
                connectPlugins/* ConnectPlugin.ThemeChanger */.d.ThemeChanger && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.ThemeChanger */.d.ThemeChanger, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(Head, {}),
                children,
                connectPlugins/* ConnectPlugin.FooterFullwidth */.d.FooterFullwidth && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.FooterFullwidth */.d.FooterFullwidth, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(elements_BackToTop, {
                    scrollStepInPx: "1000",
                    delayInMs: "0.5"
                })
            ]
        })
    });
/* harmony default export */ const layouts_DefaultLayout = (DefaultLayout);

// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./src/api/home/getProfile.js
var getProfile = __webpack_require__(3054);
// EXTERNAL MODULE: ./src/api/home/getPage.js
var getPage = __webpack_require__(1966);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
// EXTERNAL MODULE: ./services.js
var services = __webpack_require__(6531);
;// CONCATENATED MODULE: ./src/api/account/languageSwitcherAPi.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function LanguageSwitcherAPi(dispatch) {
    const result = await services/* default.getAll */.Z.getAll("list/language-list?limit=0&offset=0&keyword=&count=0");
    if (result && result.data && result.data.data) {
        dispatch((0,wishlist_action/* LanguageOneTimeLoading */.G)(result.data.data));
    }
}

// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
;// CONCATENATED MODULE: ./src/api/addonsApi/addonsApi.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function addonsListApi(dispatch) {
    const result = await services/* default.getAll */.Z.getAll("list/get-addons");
    if (result && result.data && result.data.data) {
        sessionStorage.setItem("addonsShow", JSON.stringify(result.data.data));
        dispatch((0,cart_action/* addItem */.jX)(1));
    }
}

;// CONCATENATED MODULE: ./src/pages/_app.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


















function MyApp({ Component , pageProps  }) {
    const router = (0,router_.useRouter)();
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: authCard , 1: setauthCard  } = (0,external_react_.useState)(false);
    const RedirectMaintain = (0,external_react_redux_.useSelector)((s)=>s.setting.maintenance);
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    (0,external_react_.useEffect)(()=>{
        if (RedirectMaintain === 1) {
            router_default().push("/maintenance");
        }
        if (localStorage.getItem("spurtToken") !== null) {
            (0,api/* cartListApi */.vV)(dispatch);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (router.pathname.includes("/account/")) {
            if (localStorage.getItem("spurtToken")) {
                setauthCard(true);
            } else {
                router.push("/account/login");
                setTimeout(function() {
                    setauthCard(true);
                }, 300);
            }
        } else {
            setauthCard(true);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        setTimeout(function() {
            document.getElementById("__next").classList.add("loaded");
        }, 100);
        (0,getProfile/* default */.Z)(dispatch);
        (0,getPage/* default */.Z)(dispatch);
        LanguageSwitcherAPi(dispatch);
        addonsListApi(dispatch);
        localStorage.getItem("colorThemeSpurt") && dispatch((0,colorPalette_action/* colorThemeCurrent */.jh)(localStorage.getItem("colorThemeSpurt")));
        localStorage.getItem("colorThemeSpurtView") && dispatch((0,colorPalette_action/* viewcolorThemeCurrent */.oA)(localStorage.getItem("colorThemeSpurtView")));
    }, []);
    const getLayout = Component.getLayout || ((page)=>/*#__PURE__*/ jsx_runtime_.jsx(layouts_DefaultLayout, {
            children: page,
            authCard: authCard
        }));
    return getLayout(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_redux_.Provider, {
        store: store,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            }),
            connectPlugins/* ConnectPlugin */.d?.AbandonedGuest && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.AbandonedGuest */.d.AbandonedGuest, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_toastify_.ToastContainer, {
                transition: external_react_toastify_.Zoom,
                theme: "colored",
                autoClose: 2500,
                hideProgressBar: true,
                newestOnTop: true,
                draggable: false,
                pauseOnVisibilityChange: true,
                closeOnClick: true,
                pauseOnHover: true
            })
        ]
    }));
}
const _app_makestore = ()=>store;
const _app_wrappers = (0,external_next_redux_wrapper_namespaceObject.createWrapper)(_app_makestore);
/* harmony default export */ const _app = (_app_wrappers.withRedux((0,i18n.appWithTranslation)(MyApp)));


/***/ }),

/***/ 7066:
/***/ ((module) => {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ 2433:
/***/ ((module) => {

module.exports = require("@react-google-maps/api");

/***/ }),

/***/ 5725:
/***/ ((module) => {

module.exports = require("antd");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 1377:
/***/ ((module) => {

module.exports = require("next-i18next");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 580:
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5154:
/***/ ((module) => {

module.exports = require("react-geocode");

/***/ }),

/***/ 67:
/***/ ((module) => {

module.exports = require("react-google-login");

/***/ }),

/***/ 9709:
/***/ ((module) => {

module.exports = require("react-i18next");

/***/ }),

/***/ 6290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

/***/ }),

/***/ 9931:
/***/ ((module) => {

module.exports = require("react-modal");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 8096:
/***/ ((module) => {

module.exports = require("react-slick");

/***/ }),

/***/ 1187:
/***/ ((module) => {

module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6695:
/***/ ((module) => {

module.exports = require("redux");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,7544,3981,384,8402,8969], () => (__webpack_exec__(9061)));
module.exports = __webpack_exports__;

})();