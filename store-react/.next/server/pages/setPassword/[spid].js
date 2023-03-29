"use strict";
(() => {
var exports = {};
exports.id = 8855;
exports.ids = [8855];
exports.modules = {

/***/ 51:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_connectPlugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(384);
/* harmony import */ var _api_account_resetPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8889);
/* harmony import */ var _components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6820);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function SetPassword({ query  }) {
    const { 0: passSubmit , 1: setPassSubmit  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const { 0: conPassError , 1: setConPassError  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: cpass , 1: setCpass  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: newPass , 1: setNewPass  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: newPassError , 1: setNewPassError  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const passVaildator = ()=>{
        let validObj = {
            newPassValid: true,
            conPassValid: true
        };
        if (cpass.length !== 0) {
            if (cpass !== newPass) {
                setConPassError("Password MisMatch");
                validObj.newPassValid = false;
            } else {
                setConPassError("");
                validObj.newPassValid = true;
            }
        } else {
            setConPassError("Password is required");
            validObj.newPassValid = false;
        }
        if (newPass.length === 0) {
            setNewPassError([
                "Password is required"
            ]);
            validObj.conPassValid = false;
        } else {
            if ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && !newPass.length < 8 && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must have at least 1 number or Symbol!"
                ]);
                validObj.conPassValid = false;
            }
            if (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && !newPass.length < 8 && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!",
                    "Must have at least 1 number or Symbol!"
                ]);
                validObj.conPassValid = false;
            }
            if (newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must be at least 8 characters!",
                    "Must contain at least 1 in Capital Case!",
                    "Must have at least 1 number or Symbol!"
                ]);
                validObj.conPassValid = false;
            }
            if (!newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!"
                ]);
                validObj.conPassValid = false;
            }
            if ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && !newPass.length < 8 && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([]);
                validObj.conPassValid = true;
            }
            if (newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!",
                    "Must be at least 8 characters!"
                ]);
                validObj.conPassValid = false;
            }
            if (newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!"
                ]);
                validObj.conPassValid = false;
            }
            if ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .upperPresent */ .Zw)(newPass) && newPass.length < 8 && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_5__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must be at least 8 characters!"
                ]);
                validObj.conPassValid = false;
            }
        }
        if (validObj.newPassValid && validObj.conPassValid) {
            return true;
        } else {
            return false;
        }
    };
    const handlePassSubmit = ()=>{
        setPassSubmit(1);
        if (passVaildator()) {
            (0,_api_account_resetPass__WEBPACK_IMPORTED_MODULE_4__/* .resetPassApi */ .B)(query.spid, newPass, (next_router__WEBPACK_IMPORTED_MODULE_1___default()));
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        passVaildator();
    }, [
        cpass,
        newPass
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "rp-container",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "rp-subcontainer",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rp-main-container",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Reset Password"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        placeholder: "New Password",
                        type: "password",
                        value: newPass,
                        onChange: (e)=>setNewPass(e.target.value),
                        spellCheck: false
                    }),
                    passSubmit === 1 && newPassError.length !== 0 && newPassError && newPassError.map((error)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "error-span",
                            style: {
                                margin: "0",
                                fontSize: "11px"
                            },
                            children: error
                        })),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        placeholder: "Confirm Password",
                        type: "password",
                        value: cpass,
                        onChange: (e)=>setCpass(e.target.value)
                    }),
                    passSubmit === 1 && conPassError.length !== 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "error-span",
                        style: {
                            margin: "0",
                            fontSize: "11px"
                        },
                        children: conPassError
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: (e)=>handlePassSubmit(),
                        children: "Submit"
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SetPassword);
SetPassword.getInitialProps = async (ctx)=>({
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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,6300], () => (__webpack_exec__(51)));
module.exports = __webpack_exports__;

})();