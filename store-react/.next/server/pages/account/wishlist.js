"use strict";
(() => {
var exports = {};
exports.id = 2743;
exports.ids = [2743];
exports.modules = {

/***/ 6478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

function useNetwork() {
    const { 0: isOnline , 1: setNetwork  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)( false && 0);
    const updateNetwork = ()=>{
        setNetwork(window.navigator.onLine);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        window.addEventListener("offline", updateNetwork);
        window.addEventListener("online", updateNetwork);
        return ()=>{
            window.removeEventListener("offline", updateNetwork);
            window.removeEventListener("online", updateNetwork);
        };
    });
    return isOnline;
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useNetwork);


/***/ }),

/***/ 4275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ wishlist)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/wishlist/action.js
var action = __webpack_require__(9751);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/components/helper/priceHelper.js
var priceHelper = __webpack_require__(5654);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/components/skeleton/skeletonProduct.js
var skeletonProduct = __webpack_require__(8143);
;// CONCATENATED MODULE: ./src/components/partials/account/Wishlist.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 















function Wishlist(props) {
    const { 0: wishlistData , 1: setWishListApi  } = (0,external_react_.useState)([]);
    const { 0: delstatus , 1: setDelStatus  } = (0,external_react_.useState)(0);
    const { 0: initialLoad , 1: setInitialLoad  } = (0,external_react_.useState)(true);
    const { t  } = (0,i18n.useTranslation)("common");
    const dispatch = (0,external_react_redux_.useDispatch)();
    const wishApiCall = ()=>{
        dispatch((0,action/* wishListLoading */.W1)(true));
        setTimeout(async ()=>{
            (0,api/* wishListApi */.p8)(setWishListApi, dispatch, setInitialLoad);
        });
    };
    (0,external_react_.useEffect)(()=>{
        setDelStatus(0);
        wishApiCall();
    }, [
        delstatus
    ]);
    const handleRemoveWishListItem = (e, productId)=>{
        e.preventDefault();
        (0,api/* delWishApi */.YJ)(productId, setDelStatus);
        dispatch((0,action/* addItemToWishlist */.yK)(1));
    };
    const handleCartAddRedirect = (e, productSlug)=>{
        router_default().push("/product/[pid]", `/product/${productSlug}`);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "compare-container-main",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Wishlist"
                })
            }),
            initialLoad ? [
                1
            ].map((loading)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-12",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(skeletonProduct/* default */.Z, {})
                    })
                }, loading)) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: wishlistData && wishlistData.length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "wishlist-subcontainer-custom",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "wishList-load-contain",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "wishList-load-subcontainer",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/static/img/wishlist-empty-img.svg"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    children: t("Wishlist.EmptyWishlist")
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    children: t("Wishlist.item")
                                })
                            ]
                        })
                    })
                }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "wishlist-subcontainer-custom",
                    children: wishlistData && wishlistData.map((product)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "wish-contains-fdsf",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "wish-card-conatainer",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        src: url/* imageUrl */.sQ + "?path=" + product.containerName + "&name=" + product.image + "&width=500&height=500",
                                        width: 144,
                                        height: 144,
                                        objectFit: "contain",
                                        layout: "responsive",
                                        placeholder: "blur",
                                        blurDataURL: "/static/img/no-image.png"
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "wish-card-main-details",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "wish-card-title",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: "/product/[pid]",
                                                            as: `/product/${product.productSlug}`,
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                children: product.name
                                                            })
                                                        })
                                                    })
                                                }),
                                                connectPlugins/* ConnectPlugin.SpurtRatingAndReview */.d.SpurtRatingAndReview && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.SpurtRatingAndReview */.d.SpurtRatingAndReview, {
                                                    product: product
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        children: [
                                                            "$",
                                                            " ",
                                                            product.pricerefer !== "" ? (0,priceHelper/* priceHelpFunc */.k)(JSON.parse(product.pricerefer), JSON.parse(product.taxType), product.taxValue, "") : (0,priceHelper/* priceHelpFunc */.k)(JSON.parse(product.price), JSON.parse(product.taxType), product.taxValue, ""),
                                                            " "
                                                        ]
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "wish-card-button",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                    onClick: (e)=>handleCartAddRedirect(e, product.productSlug),
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                            src: "/static/img/cart-blue.svg",
                                                            style: {
                                                                marginRight: "10px"
                                                            }
                                                        }),
                                                        t("Wishlist.Addtocart")
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                    onClick: (e)=>handleRemoveWishListItem(e, product.productId),
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                            src: "/static/img/trash.svg",
                                                            style: {
                                                                marginRight: "10px"
                                                            }
                                                        }),
                                                        t("Wishlist.Clear")
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }))
                })
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.wishlist;
};
/* harmony default export */ const account_Wishlist = ((0,external_react_redux_.connect)(mapStateToProps)(Wishlist));

// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/account/wishlist.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const WishlistPage = ()=>{
    const network = (0,NetworkCheck/* default */.Z)();
    (0,external_react_.useEffect)(()=>{
        if (network === false) {
            router_default().push("/network-error");
        }
    }, []);
    const breadCrumb = [
        {
            text: "Home",
            url: "/"
        },
        {
            text: "Wishlist"
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "site-content",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ps-page--simple",
            children: /*#__PURE__*/ jsx_runtime_.jsx(account_Wishlist, {})
        })
    });
};
/* harmony default export */ const wishlist = (WishlistPage);


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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384], () => (__webpack_exec__(4275)));
module.exports = __webpack_exports__;

})();