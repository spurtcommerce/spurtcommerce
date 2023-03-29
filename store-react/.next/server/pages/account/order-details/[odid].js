"use strict";
(() => {
var exports = {};
exports.id = 4955;
exports.ids = [4955];
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

/***/ 814:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _odid_)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: ./src/components/elements/AccountNav.jsx
var AccountNav = __webpack_require__(1760);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/partials/account/OrderDetailNew.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 













function OrderDetComp({ orderDetailInfo  }) {
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    const { 0: addonsShow , 1: setAddonsShow  } = (0,external_react_.useState)("");
    const { 0: imgLoadId , 1: setImgLoadId  } = (0,external_react_.useState)("");
    const { 0: loadImg , 1: setLoadImg  } = (0,external_react_.useState)(false);
    const { t  } = (0,i18n.useTranslation)("common");
    const ProductRoute = (productSlug)=>{
        router_default().push("/product/[pid]", `/product/${productSlug}`);
    };
    const getPdfData = (id)=>{
        setLoadImg(true);
        (0,api/* orderExportApi */.Jo)(id, setLoadImg);
        setImgLoadId(id);
    };
    const ReviewRoute = (orderProductId)=>{
        router_default().push("/account/review/[rid]", `/account/review/${orderProductId}`);
    };
    (0,external_react_.useEffect)(()=>{
        setAddonsShow(JSON.parse(sessionStorage && sessionStorage.getItem("addonsShow")));
    }, [
        reloadedheader
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "cus-account-container",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "cus-account-subcontainer",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "cus-position-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(AccountNav/* default */.Z, {
                        keyValue: ""
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "cus-right-position",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "od-container",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "od-subcontainer",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "od-header-container",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                                children: [
                                                    t("account.OrderDetails"),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        children: [
                                                            t("account.order"),
                                                            " ",
                                                            external_moment_default()(orderDetailInfo.orderedDate).format("LL"),
                                                            " | Order# ",
                                                            orderDetailInfo.orderProductPrefixId
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                onClick: (e)=>getPdfData(orderDetailInfo.orderProductId),
                                                children: [
                                                    loadImg && imgLoadId === orderDetailInfo.orderProductId ? /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        src: "/static/img/loading.gif",
                                                        style: {
                                                            height: "20px",
                                                            width: "20px"
                                                        }
                                                    }) : "",
                                                    " ",
                                                    t("account.Invoice")
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "od-content-container",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "od-shipping-add",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                        children: t("account.ShippingAddress")
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                        children: orderDetailInfo.shippingAddress1
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        children: orderDetailInfo.shippingAddress2
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        children: orderDetailInfo.shippingCity
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        children: orderDetailInfo.shippingPostcode
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "od-ship-container",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                        children: t("account.OrderSummary")
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                children: [
                                                                    t("account.Quantity"),
                                                                    ":"
                                                                ]
                                                            }),
                                                            " ",
                                                            orderDetailInfo.productQuantity,
                                                            " "
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                children: [
                                                                    t("account.BasePrice"),
                                                                    ":"
                                                                ]
                                                            }),
                                                            orderDetailInfo.currencySymbolLeft,
                                                            " ",
                                                            orderDetailInfo.basePrice,
                                                            " "
                                                        ]
                                                    }),
                                                    orderDetailInfo.discountAmount && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                children: "Discount:"
                                                            }),
                                                            " ",
                                                            orderDetailInfo.currencySymbolLeft,
                                                            orderDetailInfo.discountAmount,
                                                            " "
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                children: [
                                                                    t("account.Tax"),
                                                                    ":"
                                                                ]
                                                            }),
                                                            orderDetailInfo.currencySymbolLeft,
                                                            " ",
                                                            orderDetailInfo.taxValue,
                                                            " ",
                                                            orderDetailInfo.taxType === 1 ? "" : "%"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                children: [
                                                                    t("account.CouponDiscount"),
                                                                    ":"
                                                                ]
                                                            }),
                                                            orderDetailInfo.currencySymbolLeft,
                                                            " ",
                                                            orderDetailInfo.couponDiscountAmount ? orderDetailInfo.couponDiscountAmount : 0,
                                                            " "
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        style: {
                                                            fontWeight: "bold"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                style: {
                                                                    fontWeight: "bold"
                                                                },
                                                                children: [
                                                                    t("account.GrandTotal"),
                                                                    ":"
                                                                ]
                                                            }),
                                                            " ",
                                                            orderDetailInfo.currencySymbolLeft,
                                                            orderDetailInfo.total,
                                                            " "
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "od-product-container",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "od-product-subcontainer",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "od-main-container",
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "od-det-sdfd",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "od-pro-img-container",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                    src: url/* imageUrl */.sQ + "?path=" + orderDetailInfo.containerName + "&name=" + orderDetailInfo.productImage + "&width=400&height=200",
                                                                    width: 100,
                                                                    height: 100,
                                                                    objectFit: "contain",
                                                                    layout: "responsive",
                                                                    placeholder: "blur",
                                                                    blurDataURL: "/static/img/no-image.png"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "od-product-det-main",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                                                        children: [
                                                                            " ",
                                                                            orderDetailInfo.productName
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {}),
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                                                        children: [
                                                                            orderDetailInfo.currencySymbolLeft,
                                                                            " ",
                                                                            orderDetailInfo.productPrice,
                                                                            " "
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "od-main-right-container",
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                            onClick: (e)=>ProductRoute(orderDetailInfo.productSlug),
                                                            children: [
                                                                " ",
                                                                t("account.BuyItAgain"),
                                                                " ",
                                                                /*#__PURE__*/ jsx_runtime_.jsx(icons_.RightOutlined, {
                                                                    style: {
                                                                        fontSize: "12px",
                                                                        paddingLeft: "10px"
                                                                    }
                                                                })
                                                            ]
                                                        }),
                                                        addonsShow && addonsShow?.["rating-review"] == 1 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                            children: [
                                                                " ",
                                                                connectPlugins/* ConnectPlugin.SpurtRatingAndReviewFeedback */.d.SpurtRatingAndReviewFeedback !== undefined && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                                    onClick: (e)=>ReviewRoute(orderDetailInfo.orderProductId),
                                                                    children: [
                                                                        " ",
                                                                        t("account.ReviewthisProduct"),
                                                                        " ",
                                                                        /*#__PURE__*/ jsx_runtime_.jsx(icons_.RightOutlined, {
                                                                            style: {
                                                                                fontSize: "12px",
                                                                                paddingLeft: "10px"
                                                                            }
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const OrderDetailNew = (OrderDetComp);

// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/account/order-details/[odid].jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








const breadCrumb = [
    {
        text: "Account"
    },
    {
        text: "Order History"
    },
    {
        text: "Order Details"
    }, 
];
const OrderDetailComp = ({ query  })=>{
    const { 0: orderDetailInfo , 1: setOrderDetailInfo  } = (0,external_react_.useState)("");
    const { 0: orderLoading , 1: setOrderLoading  } = (0,external_react_.useState)(true);
    const network = (0,NetworkCheck/* default */.Z)();
    const router = (0,router_.useRouter)();
    const orderProductId = router.query.odid;
    (0,external_react_.useEffect)(()=>{
        if (orderProductId === undefined) {
            router_default().push("/page/page-404");
        }
        if (router.query) {
            (0,api/* orderDetailApi */.PH)(orderProductId, setOrderDetailInfo, setOrderLoading);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (network === false) {
            router_default().push("/network-error");
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "site-content",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-page--my-account",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    style: {
                        backgroundColor: "#f1f1f1",
                        padding: "16px 0px"
                    },
                    children: /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                        breacrumb: breadCrumb
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(OrderDetailNew, {
                    orderDetailInfo: orderDetailInfo
                })
            ]
        })
    });
};
/* harmony default export */ const _odid_ = (OrderDetailComp);
OrderDetailComp.getInitialProps = async (ctx)=>({
        query: ctx.query
    });


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

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,1760], () => (__webpack_exec__(814)));
module.exports = __webpack_exports__;

})();