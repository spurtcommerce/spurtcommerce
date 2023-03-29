"use strict";
exports.id = 1760;
exports.ids = [1760];
exports.modules = {

/***/ 1760:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_auth_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6250);
/* harmony import */ var _store_wishlist_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9751);
/* harmony import */ var _components_connectPlugins__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(384);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 










function AccountNav({ keyValue  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    let reloadedheader = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)((s)=>s.cart.addproduct);
    const { 0: addonsShow , 1: setAddonsShow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setAddonsShow(JSON.parse(sessionStorage && sessionStorage.getItem("addonsShow")));
    }, [
        reloadedheader
    ]);
    const AccountInfoRoute = ()=>{
        next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/account/information");
    };
    const DashboardRoute = ()=>{
        next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/account/dashboard");
    };
    const AddressRoute = ()=>{
        next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/account/addresses");
    };
    const QuotationRoute = ()=>{
        next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/account/quotation-list");
    };
    const OrderRoute = ()=>{
        next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/account/myorders");
    };
    const handleLogout = (e)=>{
        localStorage.clear();
        dispatch((0,_store_auth_action__WEBPACK_IMPORTED_MODULE_7__/* .logOut */ .ni)());
        dispatch((0,_store_wishlist_action__WEBPACK_IMPORTED_MODULE_8__/* .getWishlistList */ .bH)([]));
        next_router__WEBPACK_IMPORTED_MODULE_5___default().push("/account/login");
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "cus-left-position",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "cus-left-subcontainer",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Menu, {
                    defaultSelectedKeys: [
                        JSON.stringify(keyValue)
                    ],
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.AppstoreFilled, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>DashboardRoute(),
                            children: "Account Dashboard"
                        }, "1"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.InfoCircleFilled, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>AccountInfoRoute(),
                            children: "Account Information"
                        }, "2"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.EnvironmentFilled, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            className: `${router.route === "/account/addaddress" ? "hilidtadvalu" : ""}`,
                            onClick: (e)=>AddressRoute(),
                            children: "Address"
                        }, "3"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.ShoppingCartOutlined, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>OrderRoute(),
                            children: "Order History"
                        }, "4"),
                        addonsShow && addonsShow?.["product-quotation"] == 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: _components_connectPlugins__WEBPACK_IMPORTED_MODULE_9__/* .ConnectPlugin.SpurtQuotationList */ .d.SpurtQuotationList !== undefined && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.ShoppingCartOutlined, {
                                    style: {
                                        color: "#2874f0",
                                        fontSize: "18px"
                                    }
                                }),
                                style: {
                                    margin: "0",
                                    borderBottom: "solid thin #f2f2f2",
                                    color: "#212121",
                                    fontSize: "12px"
                                },
                                onClick: (e)=>QuotationRoute(),
                                children: "Quotation Request List"
                            }, "5")
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.PoweroffOutlined, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>handleLogout(),
                            children: "Logout"
                        }, "6")
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "checkbox",
                id: "menu-toggle"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                class: "hamburger-wrapper",
                for: "menu-toggle",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    class: "hamburger"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Menu, {
                    defaultSelectedKeys: [
                        JSON.stringify(keyValue)
                    ],
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.AppstoreFilled, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>DashboardRoute(),
                            children: "Account Dashboard"
                        }, "1"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.InfoCircleFilled, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>AccountInfoRoute(),
                            children: "Account Information"
                        }, "2"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.EnvironmentFilled, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>AddressRoute(),
                            children: "Address"
                        }, "3"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.ShoppingCartOutlined, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>OrderRoute(),
                            children: "Order History"
                        }, "4"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.ShoppingCartOutlined, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>QuotationRoute(),
                            children: "Quotation Request List"
                        }, "5"),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Menu.Item, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.PoweroffOutlined, {
                                style: {
                                    color: "#2874f0",
                                    fontSize: "18px"
                                }
                            }),
                            style: {
                                margin: "0",
                                borderBottom: "solid thin #f2f2f2",
                                color: "#212121",
                                fontSize: "12px"
                            },
                            onClick: (e)=>handleLogout(),
                            children: "Logout"
                        }, "6")
                    ]
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountNav);


/***/ })

};
;