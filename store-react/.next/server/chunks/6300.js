"use strict";
exports.id = 6300;
exports.ids = [6300];
exports.modules = {

/***/ 8889:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ resetPassApi),
/* harmony export */   "V": () => (/* binding */ resetConfomPassApi)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function resetPassApi(key, newPass, Router) {
    const data = JSON.stringify({
        key: key,
        newPassword: newPass
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].updateUser */ .Z.updateUser("customer/reset-password", data);
    if (result && result.data && result.data.status === 1) {
        Router.push("/account/login");
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
    }
}
async function resetConfomPassApi(key, setPageTrue) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].get */ .Z.get("customer/forgot-password-key-check", key);
    if (result && result.data && result.data.status === 1) {
        setPageTrue(true);
    } else {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("error", result.data.message);
    }
}


/***/ }),

/***/ 6820:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FK": () => (/* binding */ lowerPresent),
/* harmony export */   "Zw": () => (/* binding */ upperPresent),
/* harmony export */   "h9": () => (/* binding */ specialPresent),
/* harmony export */   "kB": () => (/* binding */ numPresent),
/* harmony export */   "on": () => (/* binding */ EmailValidator)
/* harmony export */ });
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const EmailValidator = (value)=>{
    if (/^\w([\.-]?\w)*@\w([\.-]?\w)*(\.\w{2,3})+$/.test(value)) return true;
    else return false;
};
const upperPresent = (value)=>{
    if (/^(?=.*[A-Z]).+$/.test(value)) return true;
    else return false;
};
const lowerPresent = (value)=>{
    if (/^(?=.*[a-z]).+$/.test(value)) return true;
    else return false;
};
const numPresent = (value)=>{
    if (/\d/.test(value)) return true;
    else return false;
};
const specialPresent = (value)=>{
    if (/([!@#$%^&*(),.?":{}|<>])/.test(value)) return true;
    else return false;
};



/***/ })

};
;