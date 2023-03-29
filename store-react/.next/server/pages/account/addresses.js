"use strict";
(() => {
var exports = {};
exports.id = 3246;
exports.ids = [3246];
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

/***/ 7330:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ addresses)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./src/components/elements/AccountNav.jsx
var AccountNav = __webpack_require__(1760);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/store/setting/action.js
var action = __webpack_require__(9086);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./src/components/partials/account/CustomAddress.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 











function AddressNewComp() {
    const { 0: addressData , 1: setAddressData  } = (0,external_react_.useState)();
    const { 0: delStatus , 1: setDelStatus  } = (0,external_react_.useState)(0);
    const { 0: addressLoader , 1: setAddressLoader  } = (0,external_react_.useState)(true);
    const { 0: mousehowedit , 1: setmousehowedit  } = (0,external_react_.useState)(true);
    const dispatch = (0,external_react_redux_.useDispatch)();
    (0,external_react_.useEffect)(()=>{
        setDelStatus(0);
        addressList();
    }, [
        delStatus
    ]);
    const addressList = ()=>{
        setAddressLoader(true);
        (0,api/* addressListApi */.BW)(setAddressData, setAddressLoader);
    };
    const deleteAddress = (id)=>{
        setmousehowedit(false);
        (0,api/* delAddressApi */.n5)(id, setDelStatus);
    };
    const editAddess = (detail)=>{
        dispatch((0,action/* editDetail */.tK)(detail));
        router_default().push("/account/addaddresses_edit/[eaid]", `/account/addaddresses_edit/${detail.addressId}`);
    };
    const mouseOverFunc = ()=>{
        setmousehowedit(true);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "cus-account-container",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "cus-account-subcontainer",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Address"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "cus-position-container",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(AccountNav/* default */.Z, {
                            keyValue: 3
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "cus-right-position",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "adr-subcontainer",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "adr-main-contain",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            onClick: (e)=>router_default().push("/account/addaddress"),
                                            children: "+ ADD NEW ADDRESS"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "adr-list-container",
                                            children: addressData && addressData.map((data, index)=>data.addressType === 2 ? "" : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "adr-card-container",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                className: "homeorwork",
                                                                children: data.addressType === 0 ? "Home" : "Work"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "adr-card-content",
                                                            children: [
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                                                    children: [
                                                                        " ",
                                                                        data.company,
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                            className: "adr-card-more-btn",
                                                                            children: [
                                                                                /*#__PURE__*/ jsx_runtime_.jsx(icons_.MoreOutlined, {
                                                                                    onMouseOver: (e)=>mouseOverFunc(),
                                                                                    style: {
                                                                                        fontSize: "24px"
                                                                                    }
                                                                                }),
                                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                                    className: "adr-edit-delete",
                                                                                    children: mousehowedit && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                                                                className: "adr-ed-list",
                                                                                                onClick: (e)=>editAddess(data),
                                                                                                children: "Edit"
                                                                                            }),
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                                                                className: "adr-ed-list",
                                                                                                onClick: (e)=>deleteAddress(data.addressId),
                                                                                                children: "Delete"
                                                                                            })
                                                                                        ]
                                                                                    })
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                    children: [
                                                                        " ",
                                                                        data.address1,
                                                                        ", ",
                                                                        data.address2,
                                                                        ", ",
                                                                        data.city,
                                                                        ", ",
                                                                        data.state,
                                                                        " : ",
                                                                        data.postcode
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, index))
                                        })
                                    ]
                                })
                            })
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const CustomAddress = (AddressNewComp);

;// CONCATENATED MODULE: ./src/pages/account/addresses.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 







const MyAccountPage = ()=>{
    const network = (0,NetworkCheck/* default */.Z)();
    (0,external_react_.useEffect)(()=>{
        if (network === false) {
            router_default().push("/network-error");
        }
    }, []);
    const RedirectMaintain = (0,external_react_redux_.useSelector)((s)=>s.setting.maintenance);
    (0,external_react_.useEffect)(()=>{
        if (RedirectMaintain === 1) {
            router_default().push("/maintenance");
        }
    }, []);
    const breadCrumb = [
        {
            text: "Account"
        },
        {
            text: "Address"
        }, 
    ];
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
                /*#__PURE__*/ jsx_runtime_.jsx(CustomAddress, {})
            ]
        })
    });
};
/* harmony default export */ const addresses = (MyAccountPage);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,1760], () => (__webpack_exec__(7330)));
module.exports = __webpack_exports__;

})();