"use strict";
(() => {
var exports = {};
exports.id = 1079;
exports.ids = [1079];
exports.modules = {

/***/ 5687:
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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3981);
/* harmony import */ var _api_account_resetPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8889);
/* harmony import */ var _components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6820);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 







function SetPassword({ query  }) {
    let router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { 0: passSubmit , 1: setPassSubmit  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const { 0: conPassError , 1: setConPassError  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: cpass , 1: setCpass  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: newPass , 1: setNewPass  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: newPassError , 1: setNewPassError  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: pageTru , 1: setPageTrue  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: passShow , 1: setPassShow  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: conpassShow , 1: setConPassShow  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
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
            if ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && !newPass.length < 8 && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must have at least 1 number or Symbol!"
                ]);
                validObj.conPassValid = false;
            }
            if (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && !newPass.length < 8 && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!",
                    "Must have at least 1 number or Symbol!"
                ]);
                validObj.conPassValid = false;
            }
            if (newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must be at least 8 characters!",
                    "Must contain at least 1 in Capital Case!",
                    "Must have at least 1 number or Symbol!"
                ]);
                validObj.conPassValid = false;
            }
            if (!newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!"
                ]);
                validObj.conPassValid = false;
            }
            if ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && !newPass.length < 8 && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([]);
                validObj.conPassValid = true;
            }
            if (newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!",
                    "Must be at least 8 characters!"
                ]);
                validObj.conPassValid = false;
            }
            if (newPass.length < 8 && !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || (0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
                setNewPassError([
                    "Must contain at least 1 in Capital Case!"
                ]);
                validObj.conPassValid = false;
            }
            if ((0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .upperPresent */ .Zw)(newPass) && newPass.length < 8 && (!(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .numPresent */ .kB)(newPass) || !(0,_components_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .specialPresent */ .h9)(newPass))) {
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
            (0,_api_account_resetPass__WEBPACK_IMPORTED_MODULE_4__/* .resetPassApi */ .B)(router.query.token, newPass, (next_router__WEBPACK_IMPORTED_MODULE_1___default()));
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        (0,_api_account_resetPass__WEBPACK_IMPORTED_MODULE_4__/* .resetConfomPassApi */ .V)(router.query.token, setPageTrue);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        passVaildator();
    }, [
        cpass,
        newPass
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: pageTru == true && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
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
                                type: passShow ? "text" : "password",
                                value: newPass,
                                onChange: (e)=>setNewPass(e.target.value),
                                spellCheck: false
                            }),
                            passShow ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.EyeOutlined, {
                                style: {
                                    position: "absolute",
                                    right: "10px",
                                    top: "85px",
                                    fontSize: "15px",
                                    color: "#c0c4cc"
                                },
                                onClick: (e)=>setPassShow(!passShow)
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.EyeInvisibleOutlined, {
                                style: {
                                    position: "absolute",
                                    right: "10px",
                                    top: "85px",
                                    fontSize: "15px",
                                    color: "#c0c4cc"
                                },
                                onClick: (e)=>setPassShow(!passShow)
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
                                type: conpassShow ? "text" : "password",
                                value: cpass,
                                onChange: (e)=>setCpass(e.target.value)
                            }),
                            conpassShow ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.EyeOutlined, {
                                style: {
                                    position: "absolute",
                                    right: "10px",
                                    top: "165px",
                                    fontSize: "15px",
                                    color: "#c0c4cc"
                                },
                                onClick: (e)=>setConPassShow(!conpassShow)
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.EyeInvisibleOutlined, {
                                style: {
                                    position: "absolute",
                                    right: "10px",
                                    top: "165px",
                                    fontSize: "15px",
                                    color: "#c0c4cc"
                                },
                                onClick: (e)=>setConPassShow(!conpassShow)
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

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

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

/***/ 6290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [3981,6300], () => (__webpack_exec__(5687)));
module.exports = __webpack_exports__;

})();