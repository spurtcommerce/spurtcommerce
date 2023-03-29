"use strict";
(() => {
var exports = {};
exports.id = 1046;
exports.ids = [1046];
exports.modules = {

/***/ 3331:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ payment)
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
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./src/store/cart/action.js
var action = __webpack_require__(5848);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/components/shared/headers/modules/optionNamePar.jsx
var optionNamePar = __webpack_require__(5258);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
;// CONCATENATED MODULE: ./src/components/partials/account/Payment.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 












const { Option  } = external_antd_.Select;
function Payment({ amount , currency  }) {
    const { 0: method , 1: setMethod  } = (0,external_react_.useState)(1);
    const { 0: cartItems , 1: setCartItems  } = (0,external_react_.useState)("");
    const { 0: address , 1: setAddress  } = (0,external_react_.useState)("");
    const { 0: buttonLoader , 1: setButtonLoader  } = (0,external_react_.useState)(false);
    const { 0: paymentOption , 1: setPaymentOption  } = (0,external_react_.useState)([]);
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const handleChangePaymentMethod = (e)=>{
        setMethod(e.target.value);
    };
    (0,external_react_.useEffect)(()=>{
        setCartItems(JSON.parse(localStorage.getItem("cartItem")));
        setAddress(JSON.parse(localStorage.getItem("contact")));
        (0,api/* getPaymentApi */.Pj)(setPaymentOption);
    }, []);
    const handleSubmit = ()=>{
        setButtonLoader(true);
        (0,api/* checkOutApi */.nw)("", dispatch, address.fname, address.lname, address.address, address.number, address.city, address.postCode, address.email, address.productDetail, setButtonLoader, method);
    };
    const radioStyle = {
        display: "block",
        height: "70px",
        width: "120px",
        lineHeight: "100px"
    };
    let month = [], year = [];
    for(let i = 1; i <= 12; i++){
        month.push(i);
    }
    for(let i1 = 2019; i1 <= 2050; i1++){
        year.push(i1);
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-checkout ps-section--shopping",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ps-section__header",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        children: "Payment"
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
                                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                            children: "Payment Methods"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "ps-block--payment-method",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "ps-block__header",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Radio.Group, {
                                                        onChange: (e)=>handleChangePaymentMethod(e),
                                                        value: method,
                                                        children: paymentOption && paymentOption.map((pay)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Radio, {
                                                                style: radioStyle,
                                                                value: pay.id,
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                    src: url/* imageUrl */.sQ + "?path=" + pay.pluginAvatarPath + "&name=" + pay.pluginAvatar,
                                                                    alt: "",
                                                                    style: {
                                                                        maxHeight: "100%",
                                                                        maxWidth: "100%"
                                                                    }
                                                                })
                                                            }, pay.id))
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "ps-block__content",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "ps-block__tab",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            className: `ps-btn ${currentColor}`,
                                                            onClick: (e)=>handleSubmit(),
                                                            disabled: buttonLoader === true ? "disabled" : "",
                                                            children: [
                                                                "Place Order",
                                                                buttonLoader === true && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                    src: "/static/img/buttonLoaders.gif",
                                                                    alt: "",
                                                                    style: {
                                                                        height: "30px",
                                                                        width: "30px",
                                                                        verticalAlign: "middle"
                                                                    }
                                                                })
                                                            ]
                                                        })
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "ps-block__footer",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/account/shipping",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                            className: "icon-arrow-left mr-2"
                                                        }),
                                                        "Return to shipping"
                                                    ]
                                                })
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-4 col-lg-4 col-md-12 col-sm-12 ",
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
                                                    children: cartItems && cartItems.map((product)=>/*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: "/",
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("strong", {
                                                                        children: [
                                                                            product.name,
                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                                children: [
                                                                                    "x",
                                                                                    product.quantity
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx(optionNamePar/* default */.Z, {
                                                                                optionName: JSON.parse(product && product.optionName)
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                                                        children: [
                                                                            currency ? currency.symbol : "$",
                                                                            product.quantity * product.price
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        }, product.id))
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figcaption", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                                children: "Subtotal"
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                                                children: [
                                                                    currency ? currency.symbol : "$",
                                                                    address.total
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                                                    className: "ps-block__total",
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                                        children: [
                                                            "Total",
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("strong", {
                                                                children: [
                                                                    currency ? currency.symbol : "$",
                                                                    parseInt(address.total),
                                                                    ".00"
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
    return state.cart, state.setting;
};
/* harmony default export */ const account_Payment = ((0,external_react_redux_.connect)(mapStateToProps)(Payment));

// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
;// CONCATENATED MODULE: ./src/pages/account/payment.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






const PaymentPage = ()=>{
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
            text: "Shopping Cart",
            url: "/account/shopping-cart"
        },
        {
            text: "Checkout Information",
            url: "/account/checkout"
        },
        {
            text: "Payment"
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
                /*#__PURE__*/ jsx_runtime_.jsx(account_Payment, {})
            ]
        })
    });
};
/* harmony default export */ const payment = (PaymentPage);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,7929], () => (__webpack_exec__(3331)));
module.exports = __webpack_exports__;

})();