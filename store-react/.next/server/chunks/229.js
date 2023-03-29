"use strict";
exports.id = 229;
exports.ids = [229];
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

/***/ 2251:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _connectPlugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(384);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9931);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3981);
/* harmony import */ var _helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6820);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 







function EnquiryPopUp({ showModal , setShowModal , serviceId  }) {
    const { 0: name , 1: setName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: mail , 1: setMail  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: phone , 1: setPhone  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: message , 1: setMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: nameError , 1: setNameError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: mailError , 1: setMailError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: phoneError , 1: setPhoneError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: messageError , 1: setMessageError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: submit , 1: setSubmit  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    let currentColor = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((s)=>s.palette.currentColor);
    const closeModal = ()=>{
        setShowModal(false);
        setName("");
        setMail("");
        setPhone("");
        setMessage("");
        setNameError("");
        setMailError("");
        setPhoneError("");
        setMessageError("");
    };
    const onSubmitHandler = (e)=>{
        setSubmit(1);
        if (name !== "" && mail !== "" && phone !== "" && message !== "" && (0,_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .EmailValidator */ .on)(mail) === true) {
            (0,_api__WEBPACK_IMPORTED_MODULE_4__/* .enquiryApi */ .CL)(JSON.parse(serviceId), name, mail, phone, message);
        } else {
            if (name === "") {
                setNameError("Please enter name");
            }
            if (phone === "") {
                setPhoneError("Please enter phone number");
            }
            if (message === "") {
                setMessageError("Please enter message");
            }
            if (mail === "") {
                setMailError("Please enter mail");
            }
            if ((0,_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .EmailValidator */ .on)(mail) === false) {
                setMailError("Please enter valid mail");
            }
        }
    };
    const customStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(64, 64, 64,55%)"
        },
        content: {
            top: "15%",
            left: "30%",
            right: "30%",
            bottom: "8%",
            backgroundColor: "white",
            zIndex: 9999
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_modal__WEBPACK_IMPORTED_MODULE_3___default()), {
        isOpen: showModal,
        onRequestClose: (e)=>closeModal(e),
        style: customStyles,
        contentLabel: "Example Modal",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "overall-enquiry",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "enquiry-container",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "header-enquiry",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    children: "Enquire now"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    children: "iPhone Service"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "close-enquiry",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                onClick: (e)=>closeModal(),
                                children: "X"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "input-enquiry",
                    children: [
                        submit === 1 && nameError !== "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            style: {
                                color: "red",
                                paddingLeft: "10px"
                            },
                            children: nameError
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            placeholder: "Enter your name",
                            value: name,
                            onChange: (e)=>{
                                setName(e.target.value);
                                e.target.value !== "" && setNameError("");
                            }
                        }),
                        submit === 1 && mailError !== "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            style: {
                                color: "red",
                                paddingLeft: "10px"
                            },
                            children: mailError
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            placeholder: "Enter your email",
                            value: mail,
                            onChange: (e)=>{
                                setMail(e.target.value);
                                e.target.value !== "" && (0,_helper_emailValidator__WEBPACK_IMPORTED_MODULE_6__/* .EmailValidator */ .on)(e.target.value) && setMailError("");
                            }
                        }),
                        submit === 1 && phoneError !== "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            style: {
                                color: "red",
                                paddingLeft: "10px"
                            },
                            children: phoneError
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            placeholder: "Enter your Phone Number",
                            type: "number",
                            value: phone,
                            onChange: (e)=>{
                                setPhone(e.target.value);
                                e.target.value !== "" && setPhoneError("");
                            }
                        }),
                        submit === 1 && messageError !== "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            style: {
                                color: "red",
                                paddingLeft: "10px"
                            },
                            children: messageError
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                            placeholder: "Enter your message",
                            value: message,
                            onChange: (e)=>{
                                setMessage(e.target.value);
                                e.target.value !== "" && setMessageError("");
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `button-enquiry-submit`,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: `${currentColor}`,
                        type: "button",
                        onClick: (e)=>onSubmitHandler(e),
                        children: " Submit"
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EnquiryPopUp);


/***/ })

};
;