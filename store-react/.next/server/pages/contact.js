"use strict";
(() => {
var exports = {};
exports.id = 9335;
exports.ids = [9335];
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

/***/ 7509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ contact)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/components/helper/emailValidator.js
var emailValidator = __webpack_require__(6820);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
;// CONCATENATED MODULE: ./src/components/partials/contact/ContactNew.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function ContactComp() {
    const { 0: name , 1: setName  } = (0,external_react_.useState)("");
    const { 0: nameError , 1: setNameError  } = (0,external_react_.useState)("");
    const { 0: mail , 1: setMail  } = (0,external_react_.useState)("");
    const { 0: mailError , 1: setMailError  } = (0,external_react_.useState)("");
    const { 0: phone , 1: setPhone  } = (0,external_react_.useState)("");
    const { 0: phoneError , 1: setPhoneError  } = (0,external_react_.useState)("");
    const { 0: message , 1: setMessage  } = (0,external_react_.useState)("");
    const { 0: messageError , 1: setMessageError  } = (0,external_react_.useState)("");
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    const { t  } = (0,i18n.useTranslation)("common");
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmit(1);
        if (name !== "" && mail !== "" && phone !== "" && message !== "" && message.length >= 6 && mailError === "") {
            (0,api/* contactApi */.eJ)(name, mail, phone, message);
        } else {
            if (name === "") {
                setNameError("Name is required");
            }
            if (mail === "") {
                setMailError("Mail is required");
            }
            if (phone === "") {
                setPhoneError("Phone number is required");
            }
            if (message === "") {
                setMessageError("Message is required");
            }
        }
    };
    const emailCheck = (value)=>{
        if ((0,emailValidator/* EmailValidator */.on)(value)) {
            setMail(value);
            setMailError("");
        } else {
            setMail(value);
            setMailError("Please enter a valid email");
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
    const handleNumber = (e)=>{
        if (e.target.value.length < 16) {
            setPhone(e.target.value);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ct-container",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ct-left-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        children: t("contact.CONTACTUS")
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "ct-form-container",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ct-ip-container",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            t("contact.Name"),
                                            " *"
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        placeholder: t("contact.Name"),
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        style: {
                                            border: submit === 1 && name === "" && "1px solid red"
                                        }
                                    }),
                                    submit === 1 && name === "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "error-div",
                                        children: nameError
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ct-ip-container",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            t("contact.Email"),
                                            " *"
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        placeholder: "Email",
                                        value: mail,
                                        onChange: (e)=>emailCheck(e.target.value),
                                        style: {
                                            border: mailError && "1px solid red"
                                        }
                                    }),
                                    submit === 1 && mailError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "error-div",
                                        children: mailError
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ct-ip-container",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            t("contact.Phone"),
                                            " "
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "number",
                                        placeholder: t("contact.Phone"),
                                        value: phone,
                                        onChange: (e)=>handleNumber(e),
                                        style: {
                                            border: submit === 1 && phone === "" && "1px solid red"
                                        }
                                    }),
                                    submit === 1 && phone === "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "error-div",
                                        children: phoneError
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ct-ip-container",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            t("contact.Message"),
                                            " *"
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                        placeholder: t("contact.Message"),
                                        value: message,
                                        onChange: (e)=>messageValid(e.target.value),
                                        style: {
                                            border: messageError && "1px solid red"
                                        }
                                    }),
                                    submit === 1 && messageError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "error-div",
                                        children: messageError
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "ct-button-container",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    onClick: (e)=>handleSubmit(e),
                                    children: t("contact.Submit")
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ct-right-container",
                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: "/static/img/contact-img.svg"
                })
            })
        ]
    });
}
/* harmony default export */ const ContactNew = (ContactComp);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./src/pages/contact/index.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function ContactIndex() {
    const breadCrumb = [
        {
            text: "Contact"
        }, 
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "site-content",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Contacts"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ps-page--shop",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            backgroundColor: "#f1f3f6"
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                            breacrumb: breadCrumb,
                            layout: "fullwidth"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            marginTop: "16px"
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(ContactNew, {})
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const contact = (ContactIndex);


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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578], () => (__webpack_exec__(7509)));
module.exports = __webpack_exports__;

})();