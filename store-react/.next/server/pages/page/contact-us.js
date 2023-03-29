"use strict";
(() => {
var exports = {};
exports.id = 8662;
exports.ids = [8662];
exports.modules = {

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



/***/ }),

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

/***/ 1152:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ contact_us)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/components/partials/commons/Newletters.jsx
var Newletters = __webpack_require__(556);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./src/components/partials/page/ContactInfo.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 



const ContactInfo = ()=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-contact-info",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "container",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ps-section__content",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "row",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ps-block--contact-info",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                        children: "ADDRESS:"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "mailto:contact@martfury.com",
                                            children: "Chennai, India"
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ps-block--contact-info",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                        children: "PHONE:"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: "9840322505"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {})
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ps-block--contact-info",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                        children: "E-MAIL:"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "support@spurtcommerce.com"
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        })
    });
/* harmony default export */ const page_ContactInfo = (ContactInfo);

// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/components/helper/emailValidator.js
var emailValidator = __webpack_require__(6820);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: ./src/components/partials/page/ContactForm.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






const ContactForm = ()=>{
    const { 0: name , 1: setName  } = (0,external_react_.useState)("");
    const { 0: nameError , 1: setNameError  } = (0,external_react_.useState)("");
    const { 0: mail , 1: setMail  } = (0,external_react_.useState)("");
    const { 0: mailError , 1: setMailError  } = (0,external_react_.useState)("");
    const { 0: phone , 1: setPhone  } = (0,external_react_.useState)("");
    const { 0: phoneError , 1: setPhoneError  } = (0,external_react_.useState)("");
    const { 0: message , 1: setMessage  } = (0,external_react_.useState)("");
    const { 0: messageError , 1: setMessageError  } = (0,external_react_.useState)("");
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmit(1);
        if (name !== "" && mail !== "" && phone !== "" && message !== "" && message.length >= 6 && mailError === "") {
            (0,api/* contactApi */.eJ)(name, mail, phone, message);
        } else {
            if (name === "") {
                setNameError("* Name is required");
            }
            if (mail === "") {
                setMailError("* Mail is required");
            }
            if (phone === "") {
                setPhoneError("* Phone number is required");
            }
            if (message === "") {
                setMessageError("* Message is required");
            }
        }
    };
    const emailCheck = (value)=>{
        if ((0,emailValidator/* EmailValidator */.on)(value)) {
            setMail(value);
            setMailError("");
        } else {
            setMail(value);
            setMailError("*Please enter a valid email");
        }
    };
    const messageValid = (value)=>{
        setMessage(value);
        if (value.length >= 6) {
            setMessageError("");
        } else {
            setMessageError("Minimum 6 characters is required");
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-contact-form",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "container",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                className: "ps-form--contact-us",
                action: "/",
                method: "get",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        children: "CONTACT US"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "row",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            className: "form-control",
                                            type: "text",
                                            placeholder: "Name *",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value)
                                        }),
                                        submit === 1 && name === "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "error-div",
                                            children: nameError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            className: "form-control",
                                            type: "mail",
                                            placeholder: "Email *",
                                            value: mail,
                                            onChange: (e)=>emailCheck(e.target.value)
                                        }),
                                        submit === 1 && mailError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "error-div",
                                            children: mailError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            className: "form-control",
                                            type: "number",
                                            placeholder: "Phone *",
                                            value: phone,
                                            onChange: (e)=>setPhone(e.target.value)
                                        }),
                                        submit === 1 && phone === "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "error-div",
                                            children: phoneError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                            className: "form-control",
                                            rows: "5",
                                            placeholder: "Message (minimum 6 characters required) *",
                                            value: message,
                                            onChange: (e)=>messageValid(e.target.value)
                                        }),
                                        submit === 1 && messageError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "error-div",
                                            children: messageError
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-group submit",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: `ps-btn ${currentColor}`,
                            onClick: (e)=>handleSubmit(e),
                            children: "Send message"
                        })
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const page_ContactForm = (ContactForm);

;// CONCATENATED MODULE: ./src/components/partials/page/ContactMap.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


const ContactMap = ()=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-contact-map",
        children: /*#__PURE__*/ jsx_runtime_.jsx("iframe", {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5185853708!2d80.13661845014707!3d12.938633490832752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525faafa012d49%3A0xb59db5ed9d99a29b!2sPiccosoft%20Software%20labs%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1600516515000!5m2!1sen!2sin",
            height: 500
        })
    });
/* harmony default export */ const page_ContactMap = (ContactMap);

// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/page/contact-us.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 










const ContactUsPage = ()=>{
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
            text: "ContactUs"
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "site-content",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-page--single",
            id: "contact-us",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                    breacrumb: breadCrumb
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(page_ContactMap, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(page_ContactInfo, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(page_ContactForm, {})
            ]
        })
    });
};
/* harmony default export */ const contact_us = (ContactUsPage);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,556], () => (__webpack_exec__(1152)));
module.exports = __webpack_exports__;

})();