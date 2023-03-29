"use strict";
(() => {
var exports = {};
exports.id = 975;
exports.ids = [975];
exports.modules = {

/***/ 1550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _tid_)
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
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/partials/account/TrackOrder.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








const { Step  } = external_antd_.Steps;
function TrackOrderCustom({ orderInfo  }) {
    const { 0: currentDelivery , 1: setCurrentDelivery  } = (0,external_react_.useState)(0);
    const { t  } = (0,i18n.useTranslation)("common");
    (0,external_react_.useEffect)(()=>{
        if (orderInfo && orderInfo.deliveryStatus && orderInfo.deliveryStatus.length !== 0) {
            let deliveryArray = orderInfo && orderInfo.deliveryStatus.filter((order)=>order.createdDate !== "");
            setCurrentDelivery(deliveryArray.length);
        }
    }, [
        orderInfo
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "cus-account-container",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "cus-account-subcontainer",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "cus-position-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(AccountNav/* default */.Z, {
                        keyValue: 4
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "cus-right-position",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "to-container",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "to-subContainer",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "to-subcontainer-main-header",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            children: t("Shared.TrackOrder")
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "to-content-header",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                                children: [
                                                    t("trackOrder.trackingId"),
                                                    " "
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/account/order-details/[odid]",
                                                as: `/account/order-details/${orderInfo.orderProductId}`,
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    children: t("account.OrderDetails")
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "to-content-main",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "to-content-image",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                    src: url/* imageUrl */.sQ + "?path=" + orderInfo.containerName + "&name=" + orderInfo.productImage + "&width=400&height=200",
                                                    width: 200,
                                                    height: 200,
                                                    objectFit: "contain",
                                                    layout: "responsive",
                                                    placeholder: "blur",
                                                    blurDataURL: "/static/img/no-image.png"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "to-content-right",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "to-content-super-header",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                                children: orderInfo.productName
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                                                children: [
                                                                    orderInfo.currencySymbolLeft,
                                                                    " ",
                                                                    orderInfo.basePrice
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "to-content-shipping",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                                children: t("account.ShippingAddress")
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                                children: orderInfo.shippingAddress1
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                children: orderInfo.shippingAddress2
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                children: orderInfo.shippingCity
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                children: orderInfo.shippingPostcode
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Steps, {
                                                        current: currentDelivery,
                                                        labelPlacement: "vertical",
                                                        style: {
                                                            marginTop: "40px"
                                                        },
                                                        children: orderInfo && orderInfo.deliveryStatus && orderInfo.deliveryStatus.map((order)=>/*#__PURE__*/ jsx_runtime_.jsx(Step, {
                                                                description: order.name
                                                            }))
                                                    })
                                                ]
                                            })
                                        ]
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
/* harmony default export */ const TrackOrder = (TrackOrderCustom);

// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/pages/account/track/[tid].jsx
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
        text: "Track Order"
    }, 
];
const TrackOrderComp = ({ query  })=>{
    const { 0: orderInfo , 1: setOrderInfo  } = (0,external_react_.useState)([]);
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    const { 0: orderId , 1: setOrderId  } = (0,external_react_.useState)("");
    const router = (0,router_.useRouter)();
    const tid = router.query.tid;
    (0,external_react_.useEffect)(()=>{
        if (tid !== undefined) {
            (0,api/* orderTrackIdApi */.Zu)(tid, setOrderInfo);
        }
    }, [
        tid
    ]);
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
                /*#__PURE__*/ jsx_runtime_.jsx(TrackOrder, {
                    orderInfo: orderInfo
                })
            ]
        })
    });
};
/* harmony default export */ const _tid_ = (TrackOrderComp);
TrackOrderComp.getInitialProps = async (ctx)=>({
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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,1760], () => (__webpack_exec__(1550)));
module.exports = __webpack_exports__;

})();