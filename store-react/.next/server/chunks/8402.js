"use strict";
exports.id = 8402;
exports.ids = [8402];
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

/***/ 8402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ account_Login)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "react-google-login"
var external_react_google_login_ = __webpack_require__(67);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/components/helper/emailValidator.js
var emailValidator = __webpack_require__(6820);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./services.js
var services = __webpack_require__(6531);
// EXTERNAL MODULE: ./src/api/intercept.js
var intercept = __webpack_require__(5200);
// EXTERNAL MODULE: ./src/api/auth/oAuthLogin.js
var oAuthLogin = __webpack_require__(6629);
;// CONCATENATED MODULE: ./src/api/auth/GoogleLoginApi.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


async function GoogleLoginApi(mail, password, gmail, setgoogleId, setgooglePath, googleId, googlePath, profie, Router, res) {
    const data = JSON.stringify({
        emailId: mail,
        password: password,
        type: gmail
    });
    const result = await services/* default.create */.Z.create("customer/login", data);
    if (result && result.data && result.data.status === 1) {
        if (result.data.data.clientId && result.data.data.returnPath) {
            (0,oAuthLogin/* UserOauthLogin */.n)(profie, Router, res, result.data.data.clientId, result.data.data.returnPath);
        }
    } else {}
}
;

// EXTERNAL MODULE: ./src/store/auth/action.js
var action = __webpack_require__(6250);
// EXTERNAL MODULE: ./src/store/wishlist/action.js
var wishlist_action = __webpack_require__(9751);
// EXTERNAL MODULE: ./src/store/product/action.js
var product_action = __webpack_require__(2188);
;// CONCATENATED MODULE: ./src/components/partials/account/Login.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 



















function Login(props) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: mail , 1: setMail  } = (0,external_react_.useState)("");
    const { 0: password , 1: setPassword  } = (0,external_react_.useState)("");
    const { 0: loginError , 1: setLoginError  } = (0,external_react_.useState)("");
    const { 0: loginType , 1: setLoginType  } = (0,external_react_.useState)("normal");
    const { 0: emailValid , 1: setEmailValid  } = (0,external_react_.useState)("");
    const { 0: passValid , 1: setPassValid  } = (0,external_react_.useState)("");
    const { 0: passShow , 1: setPassShow  } = (0,external_react_.useState)(false);
    const { 0: loadImg , 1: setLoadImg  } = (0,external_react_.useState)(false);
    const { t  } = (0,i18n.useTranslation)("common");
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    const emailInputRef = external_react_default().useRef(null);
    (0,external_react_.useEffect)(()=>{
        emailInputRef.current.focus();
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtToken") !== null) {
            if (props.isLoggedIn === true) {
                router_default().push("/");
            }
        } else {
            dispatch((0,action/* logOut */.ni)());
            dispatch((0,wishlist_action/* getWishlistList */.bH)([]));
        }
    }, [
        props
    ]);
    const handleFeatureWillUpdate = (type)=>{
        setLoginType(type);
        external_antd_.notification.open({
            message: "Opp! Something went wrong.",
            description: "This feature has been updated later!",
            duration: 500
        });
    };
    const handleLoginSubmit = (e)=>{
        setSubmit(1);
        if (mail !== "" && password !== "" && emailValid === "" && passValid === "") {
            setLoadImg(true);
            (0,api/* UserLogin */.K8)(mail, password, loginType, (router_default()), setLoginError, dispatch, setMail, setPassword, setLoadImg, setSubmit);
        } else if (mail == "" && password == "") {
            setEmailValid("Email is required");
            setPassValid("Password is required");
        } else if (mail == "" || password == !"" && mail == !"" || password == "") {} else if (emailValid == !"") {} else {
            setEmailValid("Invalid email address");
        }
    };
    const responseGoogle = (response)=>{
        GoogleLoginApi(mail, password, "gmail", setgoogleId, setgooglePath, googleId, googlePath, response.profileObj, (router_default()), response);
    };
    const loginOnChange = (e)=>{
        const { name , value  } = e.target;
        if (name === "email") {
            dispatch((0,product_action/* getmaildatas */.WL)(value));
            setMail(value);
            if (submit == 1) {
                if (value) {
                    let emailCheck = (0,emailValidator/* EmailValidator */.on)(value);
                    if (emailCheck) {
                        setEmailValid("");
                    } else {
                        setEmailValid("Invalid email address");
                    }
                } else {
                    setEmailValid("Email is required");
                }
            }
        }
        if (name === "password") {
            setPassword(e.target.value);
            if (submit == 1) {
                if (value) {
                    if (value.length) {
                        setPassValid("");
                    }
                } else {
                    setPassValid("Password is required");
                }
            }
        }
    };
    const enterKeyEvent = (e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            handleLoginSubmit();
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-my-account",
        onKeyPress: (e)=>enterKeyEvent(e),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Login"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ps-login-container",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "ps-login-sub-container flex-common",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-login-left",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ps-login-left-main",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                        children: t("login.login")
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "ps-login-email-contain",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                children: t("login.E-mail")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                name: "email",
                                                placeholder: t("login.E-mail"),
                                                ref: emailInputRef,
                                                value: mail,
                                                onChange: (e)=>loginOnChange(e),
                                                style: {
                                                    border: emailValid && "1px solid red"
                                                }
                                            }),
                                            emailValid !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: emailValid
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "ps-login-email-contain ps-bottom-pass",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                children: t("login.Password")
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "ps-login-passcontain",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        name: "password",
                                                        placeholder: t("login.password"),
                                                        type: passShow ? "text" : "password",
                                                        value: password,
                                                        style: {
                                                            border: passValid && "1px solid red"
                                                        },
                                                        onChange: (e)=>loginOnChange(e),
                                                        onKeyPress: (e)=>enterKeyEvent(e)
                                                    }),
                                                    passShow ? /*#__PURE__*/ jsx_runtime_.jsx(icons_.EyeOutlined, {
                                                        style: {
                                                            position: "absolute",
                                                            right: "10px",
                                                            top: "10px",
                                                            fontSize: "18px",
                                                            color: "#c0c4cc"
                                                        },
                                                        onClick: (e)=>setPassShow(!passShow)
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(icons_.EyeInvisibleOutlined, {
                                                        style: {
                                                            position: "absolute",
                                                            right: "10px",
                                                            top: "10px",
                                                            fontSize: "18px",
                                                            color: "#c0c4cc"
                                                        },
                                                        onClick: (e)=>setPassShow(!passShow)
                                                    })
                                                ]
                                            }),
                                            passValid !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                style: {
                                                    color: "#ff5252"
                                                },
                                                children: passValid
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "ps-forgot-container",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/account/forgot-password",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                children: [
                                                    t("login.forgetpassword"),
                                                    " ?"
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: "ps-login-button",
                                        onClick: (e)=>handleLoginSubmit(e),
                                        children: loadImg ? /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "/static/img/loading.gif",
                                            style: {
                                                height: "40px",
                                                width: "40px"
                                            }
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                            children: t("login.login")
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: "ps-login-reg-link",
                                        children: [
                                            t("login.Donothaveanaccount"),
                                            "?",
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/account/register",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                    children: [
                                                        " ",
                                                        t("login.registernow")
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "ps-social-link-container",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_google_login_.GoogleLogin, {
                                                clientId: "326680404078-fm2pbkgomc4nic42o6ua4difup6ff2dn.apps.googleusercontent.com",
                                                render: (renderProps)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                        className: "ps-social-button",
                                                        onClick: renderProps.onClick,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                src: "/static/img/google-sign.svg"
                                                            }),
                                                            " Sign In with Google"
                                                        ]
                                                    }),
                                                buttonText: "Login",
                                                onSuccess: responseGoogle,
                                                onFailure: responseGoogle,
                                                isSignedIn: false
                                            }),
                                            connectPlugins/* ConnectPlugin.Facebooklog */.d.Facebooklog && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.Facebooklog */.d.Facebooklog, {})
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-login-right",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: "/static/img/logo-img.svg"
                            })
                        })
                    ]
                })
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.auth;
};
/* harmony default export */ const account_Login = ((0,external_react_redux_.connect)(mapStateToProps)(Login));


/***/ })

};
;