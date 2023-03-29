"use strict";
(() => {
var exports = {};
exports.id = 5367;
exports.ids = [5367];
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

/***/ 5097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ stock_checkout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: ./src/store/setting/action.js
var action = __webpack_require__(9086);
// EXTERNAL MODULE: ./src/components/helper/emailValidator.js
var emailValidator = __webpack_require__(6820);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./src/utilities/product-helper.js
var product_helper = __webpack_require__(6152);
// EXTERNAL MODULE: ./src/components/helper/priceHelper.js
var priceHelper = __webpack_require__(5654);
// EXTERNAL MODULE: ./src/components/helper/cartHelper.js
var cartHelper = __webpack_require__(1528);
// EXTERNAL MODULE: ./src/store/cart/action.js
var cart_action = __webpack_require__(5848);
// EXTERNAL MODULE: ./src/store/product/action.js
var product_action = __webpack_require__(2188);
// EXTERNAL MODULE: external "react-select"
var external_react_select_ = __webpack_require__(1929);
var external_react_select_default = /*#__PURE__*/__webpack_require__.n(external_react_select_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/partials/account/StockCheckoutMain.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


















function StockCheckoutMain({ cartItems , productDetail , amount , addressData , countryData  }) {
    const { 0: fname , 1: setFname  } = (0,external_react_.useState)("");
    const { 0: lname , 1: setLname  } = (0,external_react_.useState)("");
    const { 0: email , 1: setEmail  } = (0,external_react_.useState)("");
    const { 0: phone , 1: setPhone  } = (0,external_react_.useState)("");
    const { 0: addressCheck , 1: setAddressCheck  } = (0,external_react_.useState)(0);
    const { 0: address , 1: setAddress  } = (0,external_react_.useState)("");
    const { 0: city , 1: setCity  } = (0,external_react_.useState)("");
    const { 0: postCode , 1: setPostCode  } = (0,external_react_.useState)("");
    const { 0: fnameError , 1: setFnameError  } = (0,external_react_.useState)("");
    const { 0: lnameError , 1: setLnameError  } = (0,external_react_.useState)("");
    const { 0: emailError , 1: setEmailError  } = (0,external_react_.useState)("");
    const { 0: phoneError , 1: setPhoneError  } = (0,external_react_.useState)("");
    const { 0: addresError , 1: setAddressError  } = (0,external_react_.useState)("");
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(false);
    const { 0: shippingZone , 1: setShippingZone  } = (0,external_react_.useState)("");
    const { 0: address2 , 1: setAddress2  } = (0,external_react_.useState)("");
    const { 0: priceadds , 1: setpriceadd  } = (0,external_react_.useState)();
    const { 0: quantity , 1: setQuantity  } = (0,external_react_.useState)(cartItems.quantityUpdated);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: auth , 1: setAuth  } = (0,external_react_.useState)(false);
    let currency = (0,external_react_redux_.useSelector)((s)=>s.setting).currency;
    const price = cartItems.price;
    const { t  } = (0,i18n.useTranslation)("common");
    let arrayComp = [];
    if (countryData !== []) {
        var len = countryData.length;
        for(var i = 0; i < len; i++){
            arrayComp.push({
                value: countryData[i].countryId,
                label: countryData[i].name
            });
        }
    }
    (0,external_react_.useEffect)(()=>{
        setpriceadd();
        setQuantity(cartItems.quantityUpdated);
    }, [
        cartItems.quantityUpdated
    ]);
    (0,external_react_.useEffect)(()=>{
        if (submit) {
            validate();
        }
    }, [
        fname,
        lname,
        email,
        phone,
        addressCheck
    ]);
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtUser")) {
            let a = localStorage.getItem("spurtUser");
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName), setEmail(JSON.parse(localStorage.getItem("spurtUser")).email), setPhone(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber);
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtToken")) {
            setAuth(true);
        }
    }, []);
    const addressSelect = (address)=>{
        setAddressCheck(1);
        setAddress(address.address1 + "," + address.address2);
        setCity(address.city);
        setPostCode(address.postcode);
        setShippingZone(address.state);
        setAddress2(address.address2);
    };
    const handleLoginSubmit = ()=>{
        setSubmit(true);
        if (validate()) {
            (0,api/* backCheckOutApi */._j)(fname, lname, address, phone, city, postCode, email, [
                cartItems
            ], shippingZone, address2);
        }
    };
    const validate = ()=>{
        let validObj = {
            fnameError: true,
            mailError: true,
            numError: true,
            addressCheck: true
        };
        if (fname === "") {
            setFnameError("First name is required");
            validObj.fnameError = false;
        } else {
            setFnameError("");
            validObj.fnameError = true;
        }
        if (phone === "") {
            setPhoneError("phone Number is required");
            validObj.numError = false;
        } else if (phone.length < 10) {
            setPhoneError("Minimum of 10 Numbers is requrired");
            validObj.numError = false;
        } else {
            setPhoneError("");
            validObj.numError = true;
        }
        if (email !== "") {
            let emailCheck = (0,emailValidator/* EmailValidator */.on)(email);
            if (emailCheck) {
                setEmailError("");
                validObj.mailError = true;
            } else {
                setEmailError("Invalid email address");
                validObj.mailError = false;
            }
        } else {
            setEmailError("Email is required");
            validObj.mailError = false;
        }
        if (auth == true) {
            if (!addressCheck) {
                setAddressError("Address is required");
                validObj.addressCheck = false;
            } else {
                setAddressError("");
                validObj.addressCheck = true;
            }
        } else {
            validObj.addressCheck = true;
        }
        if (validObj.fnameError && validObj.numError && validObj.mailError && validObj.addressCheck) {
            return true;
        } else {
            return false;
        }
    };
    const EditAddress = (detail)=>{
        dispatch((0,action/* editDetail */.tK)(detail));
        router_default().push("/account/addaddresses_edit/[eaid]", `/account/addaddresses_edit/${detail.addressId}`);
    };
    const handleIncreaseItemQty = (e, cartItems)=>{
        if (cartItems.maxQuantityAllowedCart !== null) {
            if (cartItems.quantityUpdated < cartItems.maxQuantityAllowedCart) {
                setQuantity(cartItems.quantityUpdated - 1);
                cartItems.quantityUpdated = cartItems.quantityUpdated + 1;
            }
        } else {
            setQuantity(cartItems.quantityUpdated + 1);
            cartItems.quantityUpdated = cartItems.quantityUpdated + 1;
        }
    };
    const handleDecreaseItemQty = (e, cartItems)=>{
        if (cartItems.minQuantityAllowedCart !== null) {
            if (cartItems.quantityUpdated > cartItems.minQuantityAllowedCart) {
                setQuantity(cartItems.quantityUpdated - 1);
                cartItems.quantityUpdated = cartItems.quantityUpdated - 1;
            }
        } else {
            if (cartItems.quantityUpdated > 1) {
                setQuantity(cartItems.quantityUpdated - 1);
                cartItems.quantityUpdated = cartItems.quantityUpdated - 1;
            }
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "cart-container",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "sc-new-container",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "sc-left-container",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            children: t("checkouts.FillYourInfo")
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "sc-form-container",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "sc-scinput-container",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: t("checkouts.FirstName"),
                                            value: fname,
                                            onChange: (e)=>setFname(e.target.value)
                                        }),
                                        submit && fnameError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "err-msg",
                                            children: fnameError
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "sc-scinput-container",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        placeholder: t("checkouts.LastName"),
                                        value: lname,
                                        onChange: (e)=>setLname(e.target.value)
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "sc-scinput-container",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: "Email",
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value)
                                        }),
                                        submit && emailError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "err-msg",
                                            children: emailError
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "sc-scinput-container",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "number",
                                            placeholder: t("StockCheckout.Phone"),
                                            value: phone,
                                            onChange: (e)=>e.target.value.length < 12 && setPhone(e.target.value)
                                        }),
                                        submit && phoneError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "err-msg",
                                            children: phoneError
                                        })
                                    ]
                                }),
                                auth == true ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                            children: [
                                                "Select a shipping address",
                                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/account/addaddress",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        children: " + Add new address "
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "sc-ship-add-conatiner",
                                            children: addressData && addressData.map((address, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "sc-ship-card flex",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "radio",
                                                            id: address.addressId,
                                                            onClick: (e)=>addressSelect(address),
                                                            value: address
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                            className: "sc-wh-container ",
                                                            for: address.addressId,
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                                    children: address && address.addressType === 1 ? "Work" : "Home"
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                    children: [
                                                                        address && address.address1,
                                                                        " ",
                                                                        address && address.address2,
                                                                        " ",
                                                                        address && address.city,
                                                                        " ",
                                                                        address && address.state,
                                                                        " ",
                                                                        address && address.postcode
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            onClick: (e)=>EditAddress(address),
                                                            children: "Edit"
                                                        })
                                                    ]
                                                }, index))
                                        }),
                                        submit && addresError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "err-msg",
                                            children: addresError
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                            children: "Select a shipping address"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "form-group",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "text",
                                                        placeholder: "Address (street,apartment,suite,unit,etc) *",
                                                        className: "form-control",
                                                        onChange: (e)=>setAddress(e.target.value),
                                                        value: address
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "form-group",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "text",
                                                        placeholder: "Address Line 1",
                                                        className: "form-control",
                                                        onChange: (e)=>setAddress2(e.target.value),
                                                        value: address2
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "row",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "col-sm-6",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "form-group",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                                    placeholder: "Country *",
                                                                    isSearchable: true,
                                                                    options: arrayComp
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "col-sm-6",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "form-group",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "text",
                                                                    placeholder: "State/Province *",
                                                                    className: "form-control",
                                                                    value: shippingZone,
                                                                    onChange: (e)=>setShippingZone(e.target.value)
                                                                })
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "row",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "col-sm-6",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "form-group",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "text",
                                                                    placeholder: "City *",
                                                                    className: "form-control",
                                                                    onChange: (e)=>setCity(e.target.value),
                                                                    value: city
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "col-sm-6",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "form-group",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "number",
                                                                    placeholder: "Zip/Postal code *",
                                                                    className: "form-control",
                                                                    value: postCode,
                                                                    onChange: (e)=>JSON.stringify(e.target.value).length < 9 && setPostCode(e.target.value)
                                                                })
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "sc-right-checkout",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                            children: [
                                t("ItemsinCart"),
                                " - 1"
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "sc-rht-table",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                                children: [
                                    cartItems && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                className: "sc-rht-td-data",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "rht-tb-img",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                        src: url/* imageUrl */.sQ + "?path=" + cartItems.productImage[0].containerName + "&name=" + cartItems.productImage[0].image + "&width=60&height=60",
                                                        width: 60,
                                                        height: 60,
                                                        objectFit: "contain",
                                                        layout: "responsive",
                                                        placeholder: "blur",
                                                        blurDataURL: "/static/img/no-image.png"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                className: "sc-rht-td-data",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "#",
                                                    children: cartItems && cartItems.name
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                className: "sc-rht-td-data",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "custom-product-box",
                                                    style: {
                                                        justifyContent: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            onClick: (e)=>handleDecreaseItemQty(e, cartItems),
                                                            children: "-"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            style: {
                                                                textAlign: "center"
                                                            },
                                                            children: quantity
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            onClick: (e)=>handleIncreaseItemQty(e, cartItems),
                                                            children: "+"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                className: "sc-rht-td-data",
                                                style: {
                                                    color: "red"
                                                },
                                                children: [
                                                    currency ? currency.symbol + " " : "$ ",
                                                    (0,product_helper/* formatCurrency */.x)((0,priceHelper/* priceHelpFunc */.k)(cartItems.price, cartItems.taxType, cartItems.taxValue, "") * quantity)
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                className: "sc-rht-ldc sc-rht-td-data ",
                                                colSpan: "2",
                                                children: t("checkouts.DeliveryCharges")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                className: "sc-rht-rdc",
                                                colSpan: "2",
                                                children: t("StockCheckout.Free")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                className: "sc-rht-ldc sc-rht-td-data",
                                                colSpan: "2",
                                                children: t("StockCheckout.Total")
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                className: "sc-rht-rdc",
                                                colSpan: "2",
                                                style: {
                                                    color: "black"
                                                },
                                                children: [
                                                    currency ? currency.symbol + " " : "$ ",
                                                    (0,product_helper/* formatCurrency */.x)((0,priceHelper/* priceHelpFunc */.k)(cartItems.price, cartItems.taxType, cartItems.taxValue, "") * quantity)
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "sc-submit-container",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                onClick: (e)=>handleLoginSubmit(e),
                                children: t("checkouts.PlaceOrder")
                            })
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const account_StockCheckoutMain = (StockCheckoutMain);

;// CONCATENATED MODULE: ./src/pages/account/stock-checkout.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const OrderTrackingPage = ()=>{
    const { 0: cartItems , 1: setCartItems  } = (0,external_react_.useState)("");
    const { 0: details , 1: setDetail  } = (0,external_react_.useState)("");
    const { 0: totalData , 1: setTotalData  } = (0,external_react_.useState)("");
    const { 0: addressData , 1: setAddressData  } = (0,external_react_.useState)([]);
    const { 0: addressLoader , 1: setAddressLoader  } = (0,external_react_.useState)(false);
    const { 0: countryData , 1: setCountryData  } = (0,external_react_.useState)([]);
    const totalInCart = ()=>{
        const locale = JSON.parse(localStorage.getItem("cartItem"));
        var len = locale && locale.length;
        let detailArray = [];
        for(var i = 0; i < len; i++){
            detailArray.push(locale[i].price * locale[i].quantity);
        }
        var sum = detailArray.reduce(function(a, b) {
            return a + b;
        }, 0);
        setTotalData(sum);
    };
    const addressList = ()=>{
        let dummyContent = "";
        if (localStorage.getItem("spurtToken")) {
            (0,api/* addressListApi */.BW)(setAddressData, setAddressLoader);
        }
    };
    (0,external_react_.useEffect)(()=>{
        addressList();
        (0,api/* countryListApi */.j4)(setCountryData);
    }, []);
    const arrayCreate = ()=>{
        const locale = JSON.parse(localStorage.getItem("cartItem"));
        var len = locale && locale.length;
        let detailArray = [];
        for(var i = 0; i < len; i++){
            detailArray.push({
                productId: locale[i].productId,
                quantity: locale[i].quantity,
                price: locale[i].price,
                basePrice: locale[i].price,
                model: locale[i].name,
                name: locale[i].name,
                productOptions: [],
                taxType: null,
                taxValue: null
            });
        }
        setDetail(detailArray);
    };
    (0,external_react_.useEffect)(()=>{
        setCartItems(JSON.parse(localStorage.getItem("backOrderLocal")));
        arrayCreate();
        totalInCart();
    }, []);
    const breadCrumb = [
        {
            text: "Home",
            url: "/"
        },
        {
            text: "Shopping Cart",
            url: "/account/shopping-cart"
        },
        {
            text: "Checkout Information"
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "site-content",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ps-page--simple",
            children: /*#__PURE__*/ jsx_runtime_.jsx(account_StockCheckoutMain, {
                cartItems: cartItems,
                productDetail: details,
                amount: totalData,
                addressData: addressData,
                countryData: countryData
            })
        })
    });
};
/* harmony default export */ const stock_checkout = (OrderTrackingPage);


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

/***/ 1929:
/***/ ((module) => {

module.exports = require("react-select");

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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384], () => (__webpack_exec__(5097)));
module.exports = __webpack_exports__;

})();