"use strict";
exports.id = 7929;
exports.ids = [7929];
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

/***/ 5258:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _connectPlugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(384);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


function OptionNameDisplay({ optionName  }) {
    let totalOptionResponse = optionName.options;
    let optionArray = optionName.optionValueArray;
    let myArrayOption = [];
    totalOptionResponse && totalOptionResponse.forEach((a)=>{
        a.optionValue.forEach((b)=>{
            for(var i = a.optionValue.length - 1; i >= 0; i--){
                for(var j = 0; j < optionArray.length; j++){
                    if (b.optionValueName === optionArray[j]) {
                        const found = myArrayOption.some((el)=>el.optionArrayName === a.optionname);
                        if (!found) {
                            myArrayOption.push({
                                optionArrayName: a.optionname,
                                optionName: b.optionValueName
                            });
                        }
                    }
                }
            }
        });
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
        children: myArrayOption && myArrayOption.map((name, index)=>{
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                children: [
                    name.optionArrayName,
                    ":",
                    name.optionName,
                    " "
                ]
            }, index);
        }, [])
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionNameDisplay);


/***/ })

};
;