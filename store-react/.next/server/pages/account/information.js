"use strict";
(() => {
var exports = {};
exports.id = 346;
exports.ids = [346];
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

/***/ 4439:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ information)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/components/elements/AccountNav.jsx
var AccountNav = __webpack_require__(1760);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/components/helper/emailValidator.js
var emailValidator = __webpack_require__(6820);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
// EXTERNAL MODULE: ./src/api/toast/index.js
var toast = __webpack_require__(7708);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
;// CONCATENATED MODULE: ./src/components/partials/account/InformationUser.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
















function InformationCustom() {
    const { 0: fname , 1: setFname  } = (0,external_react_.useState)("");
    const { 0: lname , 1: setLname  } = (0,external_react_.useState)("");
    const { 0: email , 1: setEmail  } = (0,external_react_.useState)("");
    const { 0: num , 1: setNum  } = (0,external_react_.useState)("");
    const { 0: userDetail , 1: setUserDetail  } = (0,external_react_.useState)("");
    const { 0: mailValid , 1: setMailValid  } = (0,external_react_.useState)("");
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    const { 0: fnameError , 1: setFnameError  } = (0,external_react_.useState)("");
    const { 0: lnameError , 1: setLnameError  } = (0,external_react_.useState)("");
    const { 0: numError , 1: setNumError  } = (0,external_react_.useState)("");
    const { 0: oldPass , 1: setOldPass  } = (0,external_react_.useState)("");
    const { 0: newPass , 1: setNewPass  } = (0,external_react_.useState)("");
    const { 0: newPassError , 1: setNewPassError  } = (0,external_react_.useState)([]);
    const { 0: oldPassError , 1: setOldPassError  } = (0,external_react_.useState)("");
    const { 0: passSubmit , 1: setPassSubmit  } = (0,external_react_.useState)(0);
    const { 0: newDp , 1: setNewDp  } = (0,external_react_.useState)("");
    const { 0: buttonLoader , 1: setButtonLoader  } = (0,external_react_.useState)(false);
    const { 0: passButtonLoader , 1: setPassButtonLoader  } = (0,external_react_.useState)(false);
    const inputFile = (0,external_react_.useRef)(null);
    const { 0: newDpError , 1: setNewDpError  } = (0,external_react_.useState)("");
    const { 0: impuploadsuccess , 1: setimpuploadsuccess  } = (0,external_react_.useState)(false);
    const { 0: passShow , 1: setPassShow  } = (0,external_react_.useState)(false);
    const { 0: conpassShow , 1: setConPassShow  } = (0,external_react_.useState)(false);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { t  } = (0,i18n.useTranslation)("common");
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtUser")) {
            setUserDetail(JSON.parse(localStorage.getItem("spurtUser")));
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName);
            let lname = JSON.parse(localStorage.getItem("spurtUser")).lastName === null ? "" : JSON.parse(localStorage.getItem("spurtUser")).lastName;
            setLname(lname);
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email);
            setNum(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber);
            JSON.parse(localStorage.getItem("spurtUser")).avatar && setNewDp(url/* imageUrl */.sQ + "?path=" + JSON.parse(localStorage.getItem("spurtUser")).avatarPath + "&name=" + JSON.parse(localStorage.getItem("spurtUser")).avatar + "&width=500&height=500");
        }
    }, []);
    const changeDP = (e)=>{
        setNewDpError("");
        const { files  } = e.target;
        if (files && files[0] && files[0].name.match(/\.(jpg|jpeg|png)$/)) {
            const fsize = files[0].size;
            const file = Math.round(fsize / 1024);
            if (file < 2048) {
                let reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onloadend = ()=>setNewDp(reader.result);
                setimpuploadsuccess(true);
            } else {
                setNewDpError("Please upload minimum 2 MB");
            }
        }
    };
    const changeHandlerPassword = (name, value)=>{
        if (name === "oldPass") {
            if (value === "") {
                setOldPassError("Current password is required");
                setOldPass(value);
            } else {
                setOldPass(value);
                setOldPassError("");
            }
        }
        if (name === "newPass") {
            if (value === "") {
                setNewPassError([
                    "New password is required"
                ]);
                setNewPass(value);
            } else {
                setPassSubmit(1);
                setNewPass(value);
                let arrayValue = [];
                if (!(0,emailValidator/* upperPresent */.Zw)(value)) {
                    arrayValue.push("Must contain at least 1 in Capital Case!");
                }
                if (!(0,emailValidator/* numPresent */.kB)(value)) {
                    arrayValue.push("Must have at least 1 Number");
                }
                if (!(0,emailValidator/* lowerPresent */.FK)(value)) {
                    arrayValue.push("Must contain at least 1 Lower Case!");
                }
                if (!(0,emailValidator/* specialPresent */.h9)(value)) {
                    arrayValue.push("Must contain at least 1 Special characters!");
                }
                if (value.length < 8) {
                    arrayValue.push("Must be at least 8 characters!");
                }
                if (arrayValue.length > 0) {
                    setNewPassError(arrayValue);
                } else {
                    setNewPassError([]);
                }
            }
        }
    };
    const validate = ()=>{
        if (fname === "") {
            setFnameError("First name is required");
        } else {
            setFnameError("");
        }
        if ((0,emailValidator/* EmailValidator */.on)(email)) {
            setMailValid("");
        } else {
            if (email.length !== 0) {
                setMailValid("Please enter a valid email");
            } else {
                setMailValid("Email is required");
            }
        }
        if (num.length === 0) {
            setNumError("Mobile number is required");
        } else if (num.length < 4) {
            setNumError("Must be at least 4 numbers long");
        } else {
            setNumError("");
        }
    };
    const onChangeHandler = (name, value)=>{
        if (name === "fname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                if (value === "") {
                    setFnameError("First name is required");
                    setFname(value);
                } else {
                    setFname(value);
                    setFnameError("");
                }
            }
        }
        if (name === "num") {
            var roleExpression = /[^0-9]/g;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setNum(value);
                if (value) {
                    setNumError("");
                } else {
                    setNumError("Mobile number is required");
                }
            }
        }
        if (name === "email") {
            if ((0,emailValidator/* EmailValidator */.on)(value)) {
                setEmail(value);
                setMailValid("");
            } else {
                if (value.length !== 0) {
                    setEmail(value);
                    setMailValid("Please enter a valid email");
                } else {
                    setEmail(value);
                    setMailValid("Email is required");
                }
            }
        }
    };
    const handleLoginSubmit = ()=>{
        setSubmit(1);
        if (fname === "" || email === "" || num === "" || fnameError !== "" || mailValid !== "" || numError !== "") {
            validate();
            return;
        } else {
            setButtonLoader(true);
            (0,api/* editProfileApi */.zE)(fname, lname !== undefined ? lname : "", email, num, (router_default()), impuploadsuccess === true ? newDp : "", setButtonLoader, setimpuploadsuccess);
        }
    };
    const handlePassSubmit = ()=>{
        setPassSubmit(1);
        if (newPass === "" || oldPass === "" || oldPassError !== "" || newPassError.length !== 0) {
            passVaildator();
        } else {
            setPassButtonLoader(true);
            (0,api/* changePasswordApi */.dt)(oldPass, newPass, setPassButtonLoader, setOldPass, setNewPass, setOldPassError, setNewPassError, setPassSubmit);
        }
    };
    const passVaildator = ()=>{
        if (oldPass.length === 0) {
            setOldPassError("Password is required");
        } else {
            setOldPassError("");
        }
        if (newPass.length === 0) {
            setNewPassError([
                "Password is required"
            ]);
        } else {
            let arrayValue = [];
            if (!(0,emailValidator/* upperPresent */.Zw)(newPass)) {
                arrayValue.push("Must contain at least 1 in Capital Case!");
            }
            if (!(0,emailValidator/* numPresent */.kB)(newPass)) {
                arrayValue.push("Must have at least 1 Number");
            }
            if (!(0,emailValidator/* lowerPresent */.FK)(newPass)) {
                arrayValue.push("Must contain at least 1 Lower Case!");
            }
            if (!(0,emailValidator/* specialPresent */.h9)(newPass)) {
                arrayValue.push("Must contain at least 1 Special characters!");
            }
            if (newPass.length < 8) {
                arrayValue.push("Must be at least 8 characters!");
            }
            if (arrayValue.length > 0) {
                setNewPassError(arrayValue);
            } else {
                setNewPassError([]);
            }
        }
    };
    function isUpper(str) {
        const pattern = new RegExp(" /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$/");
        return /(\d)([!@#$%^&*(),.?":{}|<>])/.test("dsdsd1#");
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "cus-account-container",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "cus-account-subcontainer",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Account Information"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "cus-position-container",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(AccountNav/* default */.Z, {
                            keyValue: 2
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "cus-right-position",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "cus-right-subcontainer",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                        children: t("account.AccountInformation")
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "cus-parent-card-container",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "cus-card-row",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "cus-card-account-row",
                                                    style: {
                                                        padding: "20px!important"
                                                    },
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "cinfo-card-center",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                                children: t("account.AccountDetails")
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-image-contain",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                        src: newDp ? newDp : "/static/img/user.jpg",
                                                                        alt: "",
                                                                        onClick: (e)=>inputFile.current.click()
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        type: "file",
                                                                        accept: "image/*",
                                                                        name: "",
                                                                        id: "file",
                                                                        class: "file",
                                                                        ref: inputFile,
                                                                        onChange: (e)=>changeDP(e)
                                                                    }),
                                                                    newDpError === "" ? /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                        style: {
                                                                            marginLeft: "55px",
                                                                            marginTop: "82px"
                                                                        },
                                                                        children: "Support (.png .jpg .jpeg) Format & below 2MB Files allowed"
                                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx("small", {
                                                                        className: "error-span",
                                                                        style: {
                                                                            marginLeft: "110px",
                                                                            marginTop: "80px"
                                                                        },
                                                                        children: newDpError
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-input-container",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        children: [
                                                                            t("account.FirstName"),
                                                                            " *"
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        name: "fname",
                                                                        placeholder: t("account.FirstName"),
                                                                        maxLength: "30",
                                                                        value: fname,
                                                                        onChange: (e)=>onChangeHandler(e.target.name, e.target.value),
                                                                        spellCheck: "false",
                                                                        style: {
                                                                            border: fnameError && "1px solid red"
                                                                        }
                                                                    }),
                                                                    fnameError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: "error-span",
                                                                        children: fnameError
                                                                    }) : ""
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-input-container",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        children: [
                                                                            t("account.LastName"),
                                                                            " "
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        name: "lname",
                                                                        placeholder: t("account.LastName"),
                                                                        maxLength: "30",
                                                                        value: lname,
                                                                        onChange: (e)=>setLname(e.target.value),
                                                                        spellCheck: "false",
                                                                        style: {
                                                                            border: lnameError && "1px solid red"
                                                                        }
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-input-container",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                        children: "Email *"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        name: "email",
                                                                        placeholder: "Email",
                                                                        value: email,
                                                                        onChange: (e)=>onChangeHandler(e.target.name, e.target.value),
                                                                        spellCheck: "false",
                                                                        style: {
                                                                            border: mailValid && "1px solid red"
                                                                        }
                                                                    }),
                                                                    mailValid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: "error-span",
                                                                        children: mailValid
                                                                    }) : ""
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-input-container",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        children: [
                                                                            t("account.PhoneNumber"),
                                                                            " *"
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        name: "num",
                                                                        maxLength: "15",
                                                                        placeholder: t("account.PhoneNumber"),
                                                                        value: num,
                                                                        onChange: (e)=>onChangeHandler(e.target.name, e.target.value),
                                                                        spellCheck: "false",
                                                                        style: {
                                                                            border: numError && "1px solid red"
                                                                        }
                                                                    }),
                                                                    numError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: "error-span",
                                                                        children: numError
                                                                    }) : ""
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "cinfo-btn-contain",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                    onClick: (e)=>handleLoginSubmit(),
                                                                    children: t("account.Save")
                                                                })
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "cus-card-account-row",
                                                    style: {
                                                        padding: "20px!important"
                                                    },
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "cinfo-card-center",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                                children: t("account.ChangePassword")
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "cinfo-image-contain-pass",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                    src: "/static/img/lock.svg",
                                                                    alt: ""
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-input-container",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        children: [
                                                                            t("account.CurrentPassword"),
                                                                            " *"
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        placeholder: t("account.CurrentPassword"),
                                                                        spellCheck: "false",
                                                                        type: passShow ? "text" : "password",
                                                                        name: "oldPass",
                                                                        value: oldPass,
                                                                        onChange: (e)=>changeHandlerPassword(e.target.name, e.target.value),
                                                                        style: {
                                                                            border: oldPassError && "1px solid red"
                                                                        }
                                                                    }),
                                                                    passShow ? /*#__PURE__*/ jsx_runtime_.jsx(icons_.EyeOutlined, {
                                                                        style: {
                                                                            position: "absolute",
                                                                            right: "10px",
                                                                            top: "40px",
                                                                            fontSize: "18px",
                                                                            color: "#c0c4cc"
                                                                        },
                                                                        onClick: (e)=>setPassShow(!passShow)
                                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(icons_.EyeInvisibleOutlined, {
                                                                        style: {
                                                                            position: "absolute",
                                                                            right: "10px",
                                                                            top: "40px",
                                                                            fontSize: "18px",
                                                                            color: "#c0c4cc"
                                                                        },
                                                                        onClick: (e)=>setPassShow(!passShow)
                                                                    }),
                                                                    oldPassError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        className: "error-span",
                                                                        children: oldPassError
                                                                    }) : ""
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "cinfo-input-container",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                        children: [
                                                                            t("account.NewPassword"),
                                                                            " *"
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        placeholder: t("account.NewPassword"),
                                                                        spellCheck: "false",
                                                                        name: "newPass",
                                                                        type: conpassShow ? "text" : "password",
                                                                        value: newPass,
                                                                        onChange: (e)=>changeHandlerPassword(e.target.name, e.target.value),
                                                                        style: {
                                                                            border: newPassError.length !== 0 && newPassError && "1px solid red"
                                                                        }
                                                                    }),
                                                                    conpassShow ? /*#__PURE__*/ jsx_runtime_.jsx(icons_.EyeOutlined, {
                                                                        style: {
                                                                            position: "absolute",
                                                                            right: "10px",
                                                                            top: "40px",
                                                                            fontSize: "18px",
                                                                            color: "#c0c4cc"
                                                                        },
                                                                        onClick: (e)=>setConPassShow(!conpassShow)
                                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(icons_.EyeInvisibleOutlined, {
                                                                        style: {
                                                                            position: "absolute",
                                                                            right: "10px",
                                                                            top: "40px",
                                                                            fontSize: "18px",
                                                                            color: "#c0c4cc"
                                                                        },
                                                                        onClick: (e)=>setConPassShow(!conpassShow)
                                                                    }),
                                                                    newPassError.length !== 0 && newPassError && newPassError.map((error)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                className: "error-span",
                                                                                children: error
                                                                            })
                                                                        }))
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "cinfo-btn-contain",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                    onClick: (e)=>handlePassSubmit(),
                                                                    children: t("account.Change")
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const InformationUser = (InformationCustom);

;// CONCATENATED MODULE: ./src/pages/account/information.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const InformationFormMain = ()=>{
    const breadCrumb = [
        {
            text: "Account",
            url: "/"
        },
        {
            text: "Account Information"
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
                /*#__PURE__*/ jsx_runtime_.jsx(InformationUser, {})
            ]
        })
    });
};
/* harmony default export */ const information = (InformationFormMain);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,1760], () => (__webpack_exec__(4439)));
module.exports = __webpack_exports__;

})();