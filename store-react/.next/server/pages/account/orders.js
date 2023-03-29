"use strict";
(() => {
var exports = {};
exports.id = 5972;
exports.ids = [5972];
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

/***/ 4783:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ orders)
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
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/setting/action.js
var action = __webpack_require__(9086);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/store/auth/action.js
var auth_action = __webpack_require__(6250);
;// CONCATENATED MODULE: ./src/components/shared/modal/CancelPopup.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




function CancelPopup({ activate , setCancel , cancelReason , cancelId , setReload  }) {
    const { 0: selectValue , 1: setSelectValue  } = (0,external_react_.useState)("");
    const { 0: desc , 1: setDesc  } = (0,external_react_.useState)("");
    const { 0: descError , 1: setDescError  } = (0,external_react_.useState)("");
    const { 0: selectError , 1: setSelectError  } = (0,external_react_.useState)("");
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    let active = activate;
    const handleCloseSubscribePopup = (e)=>{
        e.preventDefault();
        setCancel(false);
        setDesc("");
        setSelectError("");
        setSelectValue("");
        setDescError("");
        setSubmit(0);
    };
    const handleCancelSubmit = (e)=>{
        e.preventDefault();
        setSubmit(1);
        if (selectValue !== "" && desc !== "") {
            (0,api/* CancelRequestApi */.zc)(cancelId, desc, selectValue, setCancel, setDesc, setSelectError, setDescError, setSubmit, setSelectValue, setReload);
        } else {
            if (desc === "") {
                setDescError("*Description is required");
            }
            if (selectValue === "") {
                setSelectError("*Reason is required");
            }
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: `ps-popup ${active ? "active" : ""}`,
        id: "subscribe",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-popup__content bg--cover",
            style: {
                backgroundImage: "url('/static/img/bg/subscribe.jpg')"
            },
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    className: "ps-popup__close",
                    href: "#",
                    onClick: (e)=>handleCloseSubscribePopup(e),
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        className: "icon-cross"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("form", {
                    className: "ps-form--subscribe-popup",
                    action: "/",
                    method: "get",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "ps-form__content",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                    children: "Cancel order"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "heading-reason",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                    children: "Reason:"
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                        className: "select-css",
                                        onChange: (e)=>{
                                            setSelectValue(e.target.value), setSelectError("");
                                        },
                                        value: selectValue,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {}),
                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "",
                                                selected: true,
                                                children: "Select Reason"
                                            }),
                                            cancelReason && cancelReason.map((reason)=>{
                                                return /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: reason.id,
                                                    children: reason.reason
                                                }, reason.id);
                                            })
                                        ]
                                    }),
                                    submit === 1 && selectError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "span-error-custom-cancel",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: selectError
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "heading-reason",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                    children: "Description:"
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "form-group",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                        className: "form-control",
                                        rows: "4",
                                        placeholder: "",
                                        value: desc,
                                        onChange: (e)=>{
                                            setDesc(e.target.value), setDescError("");
                                        }
                                    }),
                                    submit === 1 && descError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "span-error-custom-cancel",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: descError
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: "ps-btn",
                                        style: {
                                            marginRight: "20px"
                                        },
                                        onClick: (e)=>handleCancelSubmit(e),
                                        children: "Submit"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: "ps-btn",
                                        onClick: (e)=>handleCloseSubscribePopup(e),
                                        children: "Cancel"
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const modal_CancelPopup = (CancelPopup);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
;// CONCATENATED MODULE: ./src/components/partials/account/modules/DateOrder.jsx



function OrderDate({ dateCarry  }) {
    let date = external_moment_default()(dateCarry).format("DD MMM, YYYY");
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
        children: [
            "date: ",
            date
        ]
    });
}

// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
;// CONCATENATED MODULE: ./src/components/partials/account/MyOrder.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 



















function MyOrder({ currency  }) {
    const { 0: orderData , 1: setOrderData  } = (0,external_react_.useState)([]);
    const { 0: loadImg , 1: setLoadImg  } = (0,external_react_.useState)(false);
    const { 0: searchVal , 1: setSearchVal  } = (0,external_react_.useState)("");
    const { 0: imgLoadId , 1: setImgLoadId  } = (0,external_react_.useState)("");
    const { 0: fname , 1: setFname  } = (0,external_react_.useState)("");
    const { 0: orderLoader , 1: setOrderLoader  } = (0,external_react_.useState)(true);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: cancel , 1: setCancel  } = (0,external_react_.useState)(false);
    const { 0: cancelReason , 1: setCancelReason  } = (0,external_react_.useState)([]);
    const { 0: cancelId , 1: setCancelId  } = (0,external_react_.useState)("");
    const { 0: reload , 1: setReload  } = (0,external_react_.useState)(0);
    const { 0: limit , 1: setLimit  } = (0,external_react_.useState)(5);
    const { 0: currentPage , 1: setCurrentPage  } = (0,external_react_.useState)(1);
    const { 0: count , 1: setCount  } = (0,external_react_.useState)(0);
    const { 0: offset , 1: setOffset  } = (0,external_react_.useState)(0);
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtUser")) {
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        setOrderLoader(true);
        setReload(0);
        (0,api/* orderListApi */.F7)(limit, offset, setOrderData, searchVal, "", setOrderLoader, setCount);
        (0,api/* orderListApi */.F7)(limit, offset, setOrderData, searchVal, 1, setOrderLoader, setCount);
    }, [
        searchVal,
        reload,
        offset,
        limit
    ]);
    const getPdfData = (id)=>{
        setLoadImg(true);
        (0,api/* orderExportApi */.Jo)(id, setLoadImg);
        setImgLoadId(id);
    };
    const handleTrackOrder = (e, orderProductId)=>{
        router_default().push("/order/[orderid]", "/order/" + orderProductId);
    };
    const handleOrderDetails = (e, orderProductId)=>{
        router_default().push("/account/order/[orderdetail]", "/account/order/" + orderProductId);
    };
    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.clear();
        dispatch((0,auth_action/* logOut */.ni)());
        router_default().push("/account/login");
    };
    const handleCancel = (e, orderProductId)=>{
        e.preventDefault();
        setCancel(true);
        (0,api/* cancelReasonApi */.b)(setCancelReason);
        setCancelId(orderProductId);
    };
    const onShowSizeChange = (current, pageSize)=>{
        setLimit(pageSize);
    };
    const handlePagination = (value)=>{
        setOffset(Math.ceil((value - 1) * 5));
        setCurrentPage(value);
    };
    const accountLinks = [
        {
            text: "Account Information",
            url: "/account/user-information",
            icon: "icon-user"
        },
        {
            text: "My Order",
            url: "/account/orders",
            icon: "icon-bag2",
            active: true
        },
        {
            text: "Address",
            url: "/account/addresses",
            icon: "icon-map-marker"
        },
        {
            text: "Wishlist",
            url: "/account/wishlist",
            icon: "icon-heart"
        }, 
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "ps-my-account ps-page--account",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(modal_CancelPopup, {
                activate: cancel,
                setCancel: setCancel,
                cancelReason: cancelReason,
                cancelId: cancelId,
                setReload: setReload
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "container",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "row",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-lg-4",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "ps-section__left",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
                                    className: "ps-widget--account-dashboard",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "ps-widget__header",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                    src: "/static/img/users/3.jpg"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figure", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("figcaption", {
                                                            children: "Hello"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                            children: fname
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "ps-widget__content",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                                children: [
                                                    accountLinks.map((link)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                            className: link.active ? `active ${currentColor}` : "",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                                href: link.url,
                                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                            className: link.icon
                                                                        }),
                                                                        link.text
                                                                    ]
                                                                })
                                                            })
                                                        }, link.text)),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            onClick: (e)=>handleLogout(e),
                                                            href: "",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                    className: "icon-power-switch"
                                                                }),
                                                                "Logout"
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "col-lg-8",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ps-section--account-setting",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "ps-section__header",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            children: "My Orders"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "ps-section__content",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "row",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "col-md-12 col-24",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "custom-search-container",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                className: "custom-order-search",
                                                                placeholder: "Search orders",
                                                                type: "text",
                                                                value: searchVal,
                                                                onChange: (e)=>setSearchVal(e.target.value)
                                                            }),
                                                            searchVal !== "" && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                className: "custom-order-search-button-exit",
                                                                onClick: (e)=>setSearchVal(""),
                                                                children: "X"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                className: `custom-order-search-button ${currentColor}`,
                                                                type: "submit",
                                                                children: "Search"
                                                            })
                                                        ]
                                                    }),
                                                    orderLoader === false ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        children: orderData && orderData.length !== 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            children: [
                                                                orderData && orderData.map((order, index)=>{
                                                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                        className: "overall-custom-div",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                className: "custom-div-container",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                        className: "first-custom-div",
                                                                                        children: [
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                                                                                children: "Orders placed"
                                                                                            }),
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx(OrderDate, {
                                                                                                dateCarry: order && order.createdDate
                                                                                            })
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                        className: "second-custom-div",
                                                                                        children: [
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                                                                                children: "Total"
                                                                                            }),
                                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                                                children: [
                                                                                                    currency ? currency.symbol : "$",
                                                                                                    order && order.productPrice
                                                                                                ]
                                                                                            })
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                        className: "third-custom-div",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                                                children: [
                                                                                                    "ORDER ",
                                                                                                    order && order.orderProductPrefixId
                                                                                                ]
                                                                                            }),
                                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                                                                href: "javascript:void(0)",
                                                                                                onClick: (e)=>getPdfData(order.orderProductId),
                                                                                                children: [
                                                                                                    loadImg && imgLoadId === order.orderProductId ? /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                                                        src: "/static/img/loading.gif",
                                                                                                        style: {
                                                                                                            height: "20px",
                                                                                                            width: "20px"
                                                                                                        }
                                                                                                    }) : "",
                                                                                                    "Invoice"
                                                                                                ]
                                                                                            })
                                                                                        ]
                                                                                    })
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                className: "sub-div-container",
                                                                                children: [
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                                        className: "first-custom-div",
                                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                                            src: url/* imageUrl */.sQ + "?path=" + order.containerName + "&name=" + order.image + "&width=200&height=100",
                                                                                            alt: ""
                                                                                        })
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                        className: "second-custom-div",
                                                                                        children: [
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                                                                                children: order && order.name
                                                                                            }),
                                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                                                children: [
                                                                                                    currency ? currency.symbol : "$",
                                                                                                    order && order.productPrice
                                                                                                ]
                                                                                            })
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                        className: "third-custom-div",
                                                                                        children: [
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                                                onClick: (e)=>handleTrackOrder(e, order.orderProductId),
                                                                                                children: "Track order"
                                                                                            }),
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                                                onClick: (e)=>handleOrderDetails(e, order.orderProductId),
                                                                                                children: "Order details"
                                                                                            }),
                                                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                                                className: "cancel-anchor",
                                                                                                children: order.cancelRequest === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                                                    href: "",
                                                                                                    onClick: (e)=>handleCancel(e, order.orderProductId),
                                                                                                    children: "Cancel order"
                                                                                                }) : order.cancelRequest === 1 ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                                                    children: "Cancel request is accepted"
                                                                                                }) : order.cancelRequest === 2 ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                                                    children: "Cancel request is rejected"
                                                                                                }) : ""
                                                                                            })
                                                                                        ]
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }, order.orderProductId);
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "ps-shopping__footer text-center pt-40",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Pagination, {
                                                                        current: currentPage,
                                                                        total: count,
                                                                        pageSize: limit,
                                                                        pageSizeOptions: [
                                                                            "5",
                                                                            "10",
                                                                            "15",
                                                                            "20"
                                                                        ],
                                                                        showSizeChanger: true,
                                                                        responsive: true,
                                                                        defaultCurrent: 1,
                                                                        onChange: handlePagination,
                                                                        onShowSizeChange: onShowSizeChange
                                                                    })
                                                                })
                                                            ]
                                                        }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            children: "No results found"
                                                        })
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "ps-section__content",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("center", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                src: "/static/img/spurt-original-loader.gif"
                                                            })
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const account_MyOrder = ((0,external_react_redux_.connect)(mapStateToProps)(MyOrder));

// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/account/orders.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






const MyAccountPage = ()=>{
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
            text: "order"
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "site-content",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-page--my-account",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                    breacrumb: breadCrumb
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(account_MyOrder, {})
            ]
        })
    });
};
/* harmony default export */ const orders = (MyAccountPage);


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

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578], () => (__webpack_exec__(4783)));
module.exports = __webpack_exports__;

})();