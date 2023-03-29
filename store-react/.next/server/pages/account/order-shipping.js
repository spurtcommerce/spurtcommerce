"use strict";
(() => {
var exports = {};
exports.id = 153;
exports.ids = [153];
exports.modules = {

/***/ 773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ order_shipping)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/cart/action.js
var action = __webpack_require__(5848);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/components/partials/account/backShipping.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





function OrderShipping({ amount  }) {
    const { 0: cartItems , 1: setCartItems  } = (0,external_react_.useState)("");
    const { 0: address , 1: setAddress  } = (0,external_react_.useState)("");
    (0,external_react_.useEffect)(()=>{
        setCartItems(JSON.parse(localStorage.getItem("backOrderLocal")));
        setAddress(JSON.parse(localStorage.getItem("contact")));
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-checkout ps-section--shopping",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ps-section__header",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        children: "Shipping Information"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ps-section__content",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-8 col-lg-8 col-md-12 col-sm-12",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "ps-block--shipping",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "ps-block__panel",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figure", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                            children: "Contact"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: address.email
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: "/account/checkout",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                children: "Change"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figure", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                            children: "Ship to"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: address.address
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: "/account/checkout",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                children: "Change"
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "ps-block__footer",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/account/stock-checkout",
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                className: "icon-arrow-left mr-2"
                                                            }),
                                                            "Return to information"
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/account/stock-payment",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        className: "ps-btn",
                                                        children: "Continue to payment"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-4 col-lg-4 col-md-12 col-sm-12 ps-block--checkout-order",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "ps-form__orders",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "ps-block--checkout-order",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "ps-block__content",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figcaption", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: "Product"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: "total"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                                                    className: "ps-block__items",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                        href: "/",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("strong", {
                                                                    children: [
                                                                        cartItems.name,
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                            children: [
                                                                                "x",
                                                                                cartItems.quantityUpdated
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                                                    children: [
                                                                        "$",
                                                                        cartItems.quantityUpdated * cartItems.price
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figcaption", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: "Total"
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                                                children: [
                                                                    "$",
                                                                    cartItems.quantityUpdated * cartItems.price
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
}
const mapStateToProps = (state)=>{
    return state.cart;
};
/* harmony default export */ const backShipping = ((0,external_react_redux_.connect)(mapStateToProps)(OrderShipping));

;// CONCATENATED MODULE: ./src/pages/account/order-shipping.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const ShippingPage = ()=>{
    const breadCrumb = [
        {
            text: "Home",
            url: "/"
        },
        {
            text: "Shopping Cart",
            url: "/account/shopping-cart"
        },
        {
            text: "Checkout Information",
            url: "/account/checkout"
        },
        {
            text: "Shipping"
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "site-content",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-page--simple",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                    breacrumb: breadCrumb
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(backShipping, {})
            ]
        })
    });
};
/* harmony default export */ const order_shipping = (ShippingPage);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578], () => (__webpack_exec__(773)));
module.exports = __webpack_exports__;

})();