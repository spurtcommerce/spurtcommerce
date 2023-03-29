"use strict";
(() => {
var exports = {};
exports.id = 9838;
exports.ids = [9838];
exports.modules = {

/***/ 6574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ zoneListApi)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function zoneListApi(setZoneData) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_0__/* ["default"].getAll */ .Z.getAll("list/zone-list?limit=0&offset=0&keyword=&count=0");
    if (result && result.data && result.data.data != null) {
        setZoneData(result.data.data);
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



/***/ }),

/***/ 1314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ checkout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./src/components/shared/headers/modules/optionNamePar.jsx
var optionNamePar = __webpack_require__(5258);
// EXTERNAL MODULE: external "react-select"
var external_react_select_ = __webpack_require__(1929);
var external_react_select_default = /*#__PURE__*/__webpack_require__.n(external_react_select_);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
;// CONCATENATED MODULE: ./src/components/partials/account/modules/FormCheckoutInformation.jsx














function FormCheckoutInformation({ cartItems , amount , productDetail , addressData , currency , fname , setFname , l1name , setL1name , email , setEmail , address , setAddress , city , setCity , postCode , setPostCode , num , setNum , addressCheck , setAddressCheck , countryId , setCountryId , countryData , setCountryData , countryName , setCountryName , countryError , setCountryError , fnameError , setFnameError , numError , setNumError , emailError , setEmailError , addressError , setAddressError , cityError , setCityError , postalError , setPostalError , address1 , setAddress1 , zoneData , setZoneData , zoneComp , setZoneComp , zoneId , setZoneId , zoneName , setZoneName , zoneError  }) {
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
    const zoneCreate = (countryValueId)=>{
        setZoneName([]);
        let zoneArray = zoneData;
        let zoneFilter = [];
        let zoneFilter1 = [];
        let zoneMainArray = [];
        if (zoneData.length !== 0) {
            zoneFilter1 = zoneArray.filter((zone)=>zone.country != null);
            if (zoneFilter1.length !== 0) {
                zoneFilter = zoneFilter1.filter((zone)=>zone.country.countryId === countryValueId);
                if (zoneFilter.length !== 0) {
                    var zonelength = zoneFilter.length;
                    for(var i = 0; i < zonelength; i++){
                        zoneMainArray.push({
                            value: zoneFilter[i].zoneId,
                            label: zoneFilter[i].name
                        });
                    }
                    setZoneComp(zoneMainArray);
                } else {
                    setZoneComp([]);
                }
            }
        }
    };
    const { t  } = (0,i18n.useTranslation)("common");
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    (0,external_react_.useEffect)(()=>{
        apiCallFunc();
    }, []);
    const addressSelect = (address)=>{
        setAddressCheck(1);
        setAddress(address.address1 + "," + address.address2);
        setCity(address.city);
        setPostCode(address.postcode);
    };
    const apiCallFunc = ()=>{
        (0,api/* countryListApi */.j4)(setCountryData);
    };
    const colourStyles = {
        control: (styles, state)=>({
                ...styles,
                backgroundColor: state.isFocused ? "#fff" : "transparent",
                color: "#495057",
                borderRadius: "0",
                height: "50px",
                boxShadow: state.isFocused ? 0 : 0,
                borderColor: state.isFocused ? "#fcb800" : "#ced4da",
                "&:hover": {
                    borderColor: "none"
                }
            })
    };
    const colourStylesError = {
        control: (styles, state)=>({
                ...styles,
                borderColor: "red",
                borderRadius: "0",
                height: "50px",
                boxShadow: state.isFocused ? 0 : 0,
                "&:hover": {
                    borderColor: "none"
                }
            })
    };
    const modalWarning = (type)=>{
        external_antd_.notification[type]({
            message: "Address is required",
            description: "Enter the address for shipping purpose",
            duration: 3
        });
    };
    function onSearch(val) {}
    const validNameFill = (value)=>{
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setFname(value);
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Form, {
        className: "ps-form--checkout",
        initialValues: {
            ["fname"]: "ddaniel"
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ps-form__content",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "row",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-xl-12 col-lg-12 col-md-12 col-sm-12",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "ps-form__billing-info",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "ps-form__heading",
                                children: t("account.ShippingAddress")
                            }),
                            addressData && addressData.length === 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                placeholder: "Name *",
                                                maxLength: "30",
                                                className: "form-control",
                                                value: fname,
                                                onChange: (e)=>validNameFill(e.target.value),
                                                style: {
                                                    borderColor: fnameError && "red"
                                                }
                                            }),
                                            fnameError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "error-span",
                                                children: fnameError
                                            }) : ""
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                placeholder: "Address (street,apartment,suite,unit,etc) *",
                                                className: "form-control",
                                                onChange: (e)=>setAddress(e.target.value),
                                                value: address,
                                                style: {
                                                    borderColor: addressError && "red"
                                                }
                                            }),
                                            addressError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "error-span",
                                                children: addressError
                                            }) : ""
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "form-group",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "text",
                                            placeholder: "Apartment,suite, etc.(optional)",
                                            className: "form-control",
                                            onChange: (e)=>setAddress1(e.target.value),
                                            value: address1
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                            placeholder: "Select Country *",
                                                            onChange: (e)=>{
                                                                setCountryId(e.value);
                                                                setCountryName(e.label);
                                                                zoneCreate(e.value);
                                                            },
                                                            isSearchable: true,
                                                            options: arrayComp,
                                                            styles: countryError !== "" ? colourStylesError : colourStyles
                                                        }),
                                                        countryError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: countryError
                                                        }) : ""
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        zoneComp && zoneComp.length !== 0 ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                            placeholder: "Select state",
                                                            onChange: (e)=>{
                                                                setZoneId(e.value);
                                                                setZoneName(e.label);
                                                            },
                                                            onSearch: onSearch,
                                                            isSearchable: true,
                                                            showSearch: true,
                                                            options: zoneComp,
                                                            styles: zoneError !== "" ? colourStylesError : colourStyles
                                                        }) : /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "text",
                                                            placeholder: "Select state",
                                                            className: "form-control",
                                                            value: zoneName,
                                                            onChange: (e)=>setZoneName(e.target.value),
                                                            style: {
                                                                borderColor: zoneError && "red"
                                                            }
                                                        }),
                                                        zoneError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: zoneError
                                                        }) : ""
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "text",
                                                            placeholder: "City *",
                                                            className: "form-control",
                                                            onChange: (e)=>setCity(e.target.value),
                                                            value: city,
                                                            style: {
                                                                borderColor: cityError && "red"
                                                            }
                                                        }),
                                                        cityError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: cityError
                                                        }) : ""
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "number",
                                                            placeholder: "Postal code *",
                                                            className: "form-control",
                                                            value: postCode,
                                                            onChange: (e)=>JSON.stringify(e.target.value).length < 9 && setPostCode(e.target.value),
                                                            style: {
                                                                borderColor: postalError && "red"
                                                            }
                                                        }),
                                                        postalError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: postalError
                                                        }) : ""
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: addressData && addressData.map((address, index)=>{
                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "address-container",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "radio",
                                                id: address.addressId,
                                                name: "drone",
                                                onClick: (e)=>addressSelect(address),
                                                value: address,
                                                className: "addr-input"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                for: address.addressId,
                                                className: "address-custom-label",
                                                children: address.addressType === 0 ? "Home" : "Work"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: "address-paragraph",
                                                children: [
                                                    address && address.address1,
                                                    ",",
                                                    address.address2,
                                                    ",",
                                                    address.city,
                                                    ",",
                                                    address.state + ":" + address.postcode
                                                ]
                                            })
                                        ]
                                    }, index);
                                })
                            })
                        ]
                    })
                })
            })
        })
    });
}
const mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const modules_FormCheckoutInformation = ((0,external_react_redux_.connect)(mapStateToProps)(FormCheckoutInformation));

// EXTERNAL MODULE: ./src/components/helper/cartHelper.js
var cartHelper = __webpack_require__(1528);
// EXTERNAL MODULE: ./src/store/cart/action.js
var action = __webpack_require__(5848);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: ./src/components/helper/emailValidator.js
var emailValidator = __webpack_require__(6820);
// EXTERNAL MODULE: ./src/api/account/zoneList.js
var zoneList = __webpack_require__(6574);
;// CONCATENATED MODULE: ./src/components/partials/account/modules/FormCheckoutBilling.jsx














function FormCheckoutBillingInformation({ cartItems , amount , productDetail , addressData , currency , fname , setFname , l1name , setL1name , email , setEmail , address , setAddress , city , setCity , postCode , setPostCode , num , setNum , addressCheck , setAddressCheck , countryId , setCountryId , countryData , setCountryData , countryName , setCountryName , countryError , setCountryError , fnameError , setFnameError , numError , setNumError , emailError , setEmailError , addressError , setAddressError , cityError , setCityError , postalError , setPostalError , address1 , setAddress1 , zoneData , setZoneData , zoneComp , setZoneComp , zoneId , setZoneId , zoneName , setZoneName , zoneError  }) {
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
    const zoneCreate = (countryValueId)=>{
        setZoneName([]);
        let zoneArray = zoneData;
        let zoneFilter = [];
        let zoneFilter1 = [];
        let zoneMainArray = [];
        if (zoneData.length !== 0) {
            zoneFilter1 = zoneArray.filter((zone)=>zone.country != null);
            if (zoneFilter1.length !== 0) {
                zoneFilter = zoneFilter1.filter((zone)=>zone.country.countryId === countryValueId);
                if (zoneFilter.length !== 0) {
                    var zonelength = zoneFilter.length;
                    for(var i = 0; i < zonelength; i++){
                        zoneMainArray.push({
                            value: zoneFilter[i].zoneId,
                            label: zoneFilter[i].name
                        });
                    }
                    setZoneComp(zoneMainArray);
                } else {
                    setZoneComp([]);
                }
            }
        }
    };
    const { t  } = (0,i18n.useTranslation)("common");
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    (0,external_react_.useEffect)(()=>{
        apiCallFunc();
    }, []);
    const addressSelect = (address)=>{
        setAddressCheck(1);
        setAddress(address.address1 + "," + address.address2);
        setCity(address.city);
        setPostCode(address.postcode);
    };
    const apiCallFunc = ()=>{
        (0,api/* countryListApi */.j4)(setCountryData);
    };
    const colourStyles = {
        control: (styles, state)=>({
                ...styles,
                backgroundColor: state.isFocused ? "#fff" : "transparent",
                color: "#495057",
                borderRadius: "0",
                height: "50px",
                boxShadow: state.isFocused ? 0 : 0,
                borderColor: state.isFocused ? "#fcb800" : "#ced4da",
                "&:hover": {
                    borderColor: "none"
                }
            })
    };
    const modalWarning = (type)=>{
        external_antd_.notification[type]({
            message: "Address is required",
            description: "Enter the address for shipping purpose",
            duration: 3
        });
    };
    function onSearch(val) {}
    return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Form, {
        className: "ps-form--checkout",
        initialValues: {
            ["fname"]: "ddaniel"
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ps-form__content",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "row",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-xl-12 col-lg-12 col-md-12 col-sm-12",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "ps-form__billing-info",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                className: "ps-form__heading",
                                children: " Billing address "
                            }),
                            addressData && addressData.length === 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                placeholder: "Name *",
                                                className: "form-control",
                                                value: fname,
                                                onChange: (e)=>setFname(e.target.value)
                                            }),
                                            fnameError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "error-span",
                                                children: fnameError
                                            }) : ""
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                placeholder: "Address (street,apartment,suite,unit,etc) *",
                                                className: "form-control",
                                                onChange: (e)=>setAddress(e.target.value),
                                                value: address
                                            }),
                                            addressError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "error-span",
                                                children: addressError
                                            }) : ""
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "form-group",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "text",
                                            placeholder: "Apartment,suite, etc.(optional)",
                                            className: "form-control",
                                            onChange: (e)=>setAddress1(e.target.value),
                                            value: address1
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                            placeholder: "Country *",
                                                            onChange: (e)=>{
                                                                setCountryId(e.value);
                                                                setCountryName(e.label);
                                                                zoneCreate(e.value);
                                                            },
                                                            isSearchable: true,
                                                            options: arrayComp,
                                                            styles: colourStyles
                                                        }),
                                                        countryError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: countryError
                                                        }) : ""
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        zoneComp && zoneComp.length !== 0 ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                            placeholder: "Select state",
                                                            onChange: (e)=>{
                                                                setZoneId(e.value);
                                                                setZoneName(e.label);
                                                            },
                                                            onSearch: onSearch,
                                                            isSearchable: true,
                                                            showSearch: true,
                                                            options: zoneComp,
                                                            value: {
                                                                label: zoneName
                                                            },
                                                            styles: colourStyles
                                                        }) : /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "text",
                                                            placeholder: "State/Province *",
                                                            className: "form-control",
                                                            value: zoneName,
                                                            onChange: (e)=>setZoneName(e.target.value)
                                                        }),
                                                        zoneError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: zoneError
                                                        }) : ""
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "text",
                                                            placeholder: "City *",
                                                            className: "form-control",
                                                            onChange: (e)=>setCity(e.target.value),
                                                            value: city
                                                        }),
                                                        cityError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: cityError
                                                        }) : ""
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-sm-6",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "form-group",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "number",
                                                            placeholder: "Zip/Postal code *",
                                                            className: "form-control",
                                                            value: postCode,
                                                            onChange: (e)=>JSON.stringify(e.target.value).length < 9 && setPostCode(e.target.value)
                                                        }),
                                                        postalError !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: postalError
                                                        }) : ""
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: addressData && addressData.map((address, index)=>{
                                    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "address-container",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "radio",
                                                id: address.addressId,
                                                name: "drone",
                                                onClick: (e)=>addressSelect(address),
                                                value: address,
                                                className: "addr-input"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                for: address.addressId,
                                                className: "address-custom-label",
                                                children: address.addressType === 0 ? "Home" : "Work"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: "address-paragraph",
                                                children: [
                                                    address && address.address1,
                                                    ",",
                                                    address.address2,
                                                    ",",
                                                    address.city,
                                                    ",",
                                                    address.state + ":" + address.postcode
                                                ]
                                            })
                                        ]
                                    }, index);
                                })
                            })
                        ]
                    })
                })
            })
        })
    });
}
const FormCheckoutBilling_mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const FormCheckoutBilling = ((0,external_react_redux_.connect)(FormCheckoutBilling_mapStateToProps)(FormCheckoutBillingInformation));

// EXTERNAL MODULE: ./src/store/setting/action.js
var setting_action = __webpack_require__(9086);
// EXTERNAL MODULE: ./src/components/helper/priceHelper.js
var priceHelper = __webpack_require__(5654);
// EXTERNAL MODULE: ./src/utilities/product-helper.js
var product_helper = __webpack_require__(6152);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/store/product/action.js
var product_action = __webpack_require__(2188);
;// CONCATENATED MODULE: ./src/components/partials/account/Checkout.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

























const { Panel  } = external_antd_.Collapse;
function Checkout() {
    const { 0: cartItems , 1: setCartItems  } = (0,external_react_.useState)("");
    const { 0: details , 1: setDetail  } = (0,external_react_.useState)("");
    const { 0: totalData , 1: setTotalData  } = (0,external_react_.useState)("");
    const { 0: addressData , 1: setAddressData  } = (0,external_react_.useState)([]);
    const { 0: addressLoader , 1: setAddressLoader  } = (0,external_react_.useState)(false);
    const { 0: couponProduct , 1: setCouponProduct  } = (0,external_react_.useState)("");
    const { 0: discountedPrice , 1: setDiscountedPrice  } = (0,external_react_.useState)("");
    const { 0: coupandata , 1: setcoupdata  } = (0,external_react_.useState)("");
    const { 0: appliedName , 1: setAppliedName  } = (0,external_react_.useState)("");
    const { 0: appliedProductArray , 1: setAppliedProductArray  } = (0,external_react_.useState)([]);
    const { 0: paymentOption , 1: setPaymentOption  } = (0,external_react_.useState)([]);
    const { 0: name , 1: setName  } = (0,external_react_.useState)("");
    const { 0: lname , 1: setLname  } = (0,external_react_.useState)("");
    const { 0: mail , 1: setMail  } = (0,external_react_.useState)("");
    const { 0: number , 1: setNumber  } = (0,external_react_.useState)("");
    const { 0: nameValid , 1: setNameValid  } = (0,external_react_.useState)("");
    const { 0: mailValid , 1: setMailValid  } = (0,external_react_.useState)("");
    const { 0: numValid , 1: setNumValid  } = (0,external_react_.useState)("");
    const { 0: nameFocus , 1: setNameFocus  } = (0,external_react_.useState)(false);
    const { 0: mailFocus , 1: setMailFocus  } = (0,external_react_.useState)(false);
    const { 0: numFocus , 1: setNumFocus  } = (0,external_react_.useState)(false);
    const { 0: lnameFocus , 1: setLnameFocus  } = (0,external_react_.useState)(false);
    const { 0: method , 1: setMethod  } = (0,external_react_.useState)();
    const { 0: gstNumber , 1: setGstNumber  } = (0,external_react_.useState)("");
    const { 0: gstNumberValid , 1: setGstNumberValid  } = (0,external_react_.useState)("");
    const { 0: gstNumberFocus , 1: setGstNumberFocus  } = (0,external_react_.useState)(false);
    const { 0: gstClick , 1: setGstClick  } = (0,external_react_.useState)(false);
    const { 0: accountPassword , 1: setAccountPassword  } = (0,external_react_.useState)(false);
    const { 0: paymentvalid , 1: setPaymentValid  } = (0,external_react_.useState)("");
    const { 0: gstvalid , 1: setGstValid  } = (0,external_react_.useState)("");
    const { t  } = (0,i18n.useTranslation)("common");
    let removeFromCart = (0,external_react_redux_.useSelector)((s)=>s.cart.removeproduct);
    let reloadCart = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    let incrementLoad = (0,external_react_redux_.useSelector)((s)=>s.cart.increment);
    let decrementLoad = (0,external_react_redux_.useSelector)((s)=>s.cart.decrement);
    let coupondisdata = (0,external_react_redux_.useSelector)((s)=>s.product.coupongetdata);
    let discountproprice = (0,external_react_redux_.useSelector)((s)=>s.product.discountpriceamount);
    let totalpayableamount = (0,external_react_redux_.useSelector)((s)=>s.product.totalpayable);
    let coupongetdatas = (0,external_react_redux_.useSelector)((s)=>s.product.couponsapplydata);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: fname , 1: setFname  } = (0,external_react_.useState)("");
    const { 0: l1name , 1: setL1name  } = (0,external_react_.useState)("");
    const { 0: email , 1: setEmail  } = (0,external_react_.useState)("");
    const { 0: address , 1: setAddress  } = (0,external_react_.useState)("");
    const { 0: address1 , 1: setAddress1  } = (0,external_react_.useState)("");
    const { 0: city , 1: setCity  } = (0,external_react_.useState)("");
    const { 0: postCode , 1: setPostCode  } = (0,external_react_.useState)("");
    const { 0: num , 1: setNum  } = (0,external_react_.useState)("");
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const { 0: countryId , 1: setCountryId  } = (0,external_react_.useState)("");
    const { 0: countryData , 1: setCountryData  } = (0,external_react_.useState)([]);
    const { 0: countryName , 1: setCountryName  } = (0,external_react_.useState)("");
    const { 0: fnameError , 1: setFnameError  } = (0,external_react_.useState)("");
    const { 0: numError , 1: setNumError  } = (0,external_react_.useState)("");
    const { 0: emailError , 1: setEmailError  } = (0,external_react_.useState)("");
    const { 0: addressError , 1: setAddressError  } = (0,external_react_.useState)("");
    const { 0: cityError , 1: setCityError  } = (0,external_react_.useState)("");
    const { 0: postalError , 1: setPostalError  } = (0,external_react_.useState)("");
    const { 0: countryError , 1: setCountryError  } = (0,external_react_.useState)("");
    const { 0: zoneData , 1: setZoneData  } = (0,external_react_.useState)([]);
    const { 0: zoneComp , 1: setZoneComp  } = (0,external_react_.useState)([]);
    const { 0: zoneId , 1: setZoneId  } = (0,external_react_.useState)("");
    const { 0: zoneName , 1: setZoneName  } = (0,external_react_.useState)("");
    const { 0: zoneError , 1: setZoneError  } = (0,external_react_.useState)("");
    const { 0: fname1 , 1: setFname1  } = (0,external_react_.useState)("");
    const { 0: l1name1 , 1: setL1name1  } = (0,external_react_.useState)("");
    const { 0: email1 , 1: setEmail1  } = (0,external_react_.useState)("");
    const { 0: address111 , 1: setAddress111  } = (0,external_react_.useState)("");
    const { 0: address11 , 1: setAddress11  } = (0,external_react_.useState)("");
    const { 0: city1 , 1: setCity1  } = (0,external_react_.useState)("");
    const { 0: postCode1 , 1: setPostCode1  } = (0,external_react_.useState)("");
    const { 0: num1 , 1: setNum1  } = (0,external_react_.useState)("");
    const { 0: countryId1 , 1: setCountryId1  } = (0,external_react_.useState)("");
    const { 0: countryData1 , 1: setCountryData1  } = (0,external_react_.useState)([]);
    const { 0: countryName1 , 1: setCountryName1  } = (0,external_react_.useState)("");
    const { 0: fnameError1 , 1: setFnameError1  } = (0,external_react_.useState)("");
    const { 0: numError1 , 1: setNumError1  } = (0,external_react_.useState)("");
    const { 0: emailError1 , 1: setEmailError1  } = (0,external_react_.useState)("");
    const { 0: addressError1 , 1: setAddressError1  } = (0,external_react_.useState)("");
    const { 0: cityError1 , 1: setCityError1  } = (0,external_react_.useState)("");
    const { 0: postalError1 , 1: setPostalError1  } = (0,external_react_.useState)("");
    const { 0: countryError1 , 1: setCountryError1  } = (0,external_react_.useState)("");
    const { 0: zoneData1 , 1: setZoneData1  } = (0,external_react_.useState)([]);
    const { 0: zoneComp1 , 1: setZoneComp1  } = (0,external_react_.useState)([]);
    const { 0: zoneId1 , 1: setZoneId1  } = (0,external_react_.useState)("");
    const { 0: zoneName1 , 1: setZoneName1  } = (0,external_react_.useState)("");
    const { 0: zoneError1 , 1: setZoneError1  } = (0,external_react_.useState)("");
    const { 0: billToSame , 1: setBillToSame  } = (0,external_react_.useState)(true);
    const { 0: billToSameAddress , 1: setBillToSameAddress  } = (0,external_react_.useState)(true);
    const { 0: cpasswordFocus , 1: setCpasswordFocus  } = (0,external_react_.useState)(false);
    const { 0: cpassword , 1: setCpassword  } = (0,external_react_.useState)("");
    const { 0: cpasswordValid , 1: setCpasswordValid  } = (0,external_react_.useState)([]);
    const { 0: couponApplied , 1: setCouponApplied  } = (0,external_react_.useState)(false);
    const { 0: couponError , 1: setCounponError  } = (0,external_react_.useState)("");
    const { 0: prevAddressRadio , 1: setPrevAddressRadio  } = (0,external_react_.useState)(false);
    const { 0: prevAddressRadioValid , 1: setPrevAddressRadioValid  } = (0,external_react_.useState)("");
    const { 0: prevAddressBillRadioValid , 1: setPrevAddressBillRadioValid  } = (0,external_react_.useState)("");
    const { 0: prevAddressBillRadio , 1: setPrevAddressBillRadio  } = (0,external_react_.useState)(false);
    const { 0: dummy , 1: setDummy  } = (0,external_react_.useState)();
    const { 0: buttonLoader , 1: setButtonLoader  } = (0,external_react_.useState)(false);
    const { 0: buttondisable , 1: setbuttondisable  } = (0,external_react_.useState)(false);
    const { 0: auth , 1: setAuth  } = (0,external_react_.useState)(false);
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    let authValue = (0,external_react_redux_.useSelector)((s)=>s.auth);
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
    const apiCallFunc = ()=>{
        (0,api/* countryListApi */.j4)(setCountryData);
        (0,zoneList/* zoneListApi */.Z)(setZoneData);
        (0,zoneList/* zoneListApi */.Z)(setZoneData1);
    };
    (0,external_react_.useEffect)(()=>{
        if (coupondisdata?.status == 1) {
            setCouponApplied(true);
        }
    }, [
        coupondisdata
    ]);
    (0,external_react_.useEffect)(()=>{
        document.body.classList.remove("scroll-block-home");
        if (submit) {
            validate();
        }
    }, [
        fname,
        email,
        num,
        address,
        city,
        countryName,
        postCode,
        zoneName,
        gstNumber,
        fname1,
        address111,
        city1,
        postCode1,
        zoneName1,
        countryName,
        countryName1,
        cpassword,
        prevAddressRadio,
        prevAddressBillRadio,
        method
    ]);
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtUser")) {
            setName(JSON.parse(localStorage.getItem("spurtUser")).firstName), setMail(JSON.parse(localStorage.getItem("spurtUser")).email), setNumber(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber);
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName);
        }
    }, []);
    const validate = ()=>{
        let validateObj = {
            fnameSub: true,
            numSub: true,
            addressSub: true,
            citySub: true,
            countryNameSub: true,
            postCodeSub: true,
            zoneNameSub: true,
            fname1Sub: true,
            num1Sub: true,
            address111Sub: true,
            city1Sub: true,
            countryName1Sub: true,
            postCode1Sub: true,
            zoneName1Sub: true,
            nameSub: true,
            mailSub: true,
            numberSub: true,
            methodSub: true,
            gstNumberSub: true,
            cpasswordSub: true,
            prevAddressRadioValidSub: true,
            prevAddressBillRadioValidSub: true
        };
        if (addressData && addressData.length === 0) {
            if (fname === "") {
                setFnameError("Name is required");
                validateObj.fnameSub = false;
            } else {
                setFnameError("");
                validateObj.fnameSub = true;
            }
            if (address === "") {
                setAddressError("Address is required");
                validateObj.addressSub = false;
            } else {
                setAddressError("");
                validateObj.addressSub = true;
            }
            if (city === "") {
                setCityError("City is required");
                validateObj.citySub = false;
            } else {
                setCityError("");
                validateObj.citySub = true;
            }
            if (countryName === "") {
                setCountryError("Country is required");
                validateObj.countryNameSub = false;
            } else {
                setCountryError("");
                validateObj.countryNameSub = true;
            }
            if (postCode === "") {
                setPostalError("Post code is required");
                validateObj.postCodeSub = false;
            } else {
                setPostalError("");
                validateObj.postCodeSub = true;
            }
            if (zoneName === "") {
                setZoneError("State is required");
                validateObj.zoneNameSub = false;
            } else {
                setZoneError("");
                validateObj.zoneNameSub = true;
            }
        }
        if (!billToSame) {
            if (fname1 === "") {
                setFnameError1("Name is required");
                validateObj.fname1Sub = false;
            } else {
                setFnameError1("");
                validateObj.fname1Sub = true;
            }
            if (address111 === "") {
                setAddressError1("Address is required");
                validateObj.address111Sub = false;
            } else {
                setAddressError1("");
                validateObj.address111Sub = true;
            }
            if (city1 === "") {
                setCityError1("City is required");
                validateObj.city1Sub = false;
            } else {
                setCityError1("");
                validateObj.city1Sub = true;
            }
            if (countryName1 === "") {
                setCountryError1("Country is required");
                validateObj.countryName1Sub = false;
            } else {
                setCountryError1("");
                validateObj.countryName1Sub = true;
            }
            if (postCode1 === "") {
                setPostalError1("Post code is required");
                validateObj.postCode1Sub = false;
            } else {
                setPostalError1("");
                validateObj.postCode1Sub = true;
            }
            if (zoneName1 === "") {
                setZoneError1("State is required");
                validateObj.zoneName1Sub = false;
            } else {
                setZoneError1("");
                validateObj.zoneName1Sub = true;
            }
        }
        if (name === "") {
            if (name.length < 3 && name.length !== 0) {
                setNameValid("Minimum of 3 characters");
                validateObj.nameSub = false;
            } else if (name.length === 0) {
                setNameValid("First name is required");
                validateObj.nameSub = false;
            } else {
                setNameValid("");
                validateObj.nameSub = true;
            }
        }
        if (mail === "") {
            if (mail) {
                let emailCheck = (0,emailValidator/* EmailValidator */.on)(mail);
                if (emailCheck) {
                    setMailValid("");
                    validateObj.mailSub = true;
                } else {
                    setMailValid("Invalid email address");
                    validateObj.mailSub = false;
                }
            } else {
                setMailValid("Email is required");
                validateObj.mailSub = false;
            }
        }
        if (number === "") {
            if (number) {
                setNumValid("");
                validateObj.numberSub = true;
            } else {
                setNumValid("Number is required");
                validateObj.numberSub = false;
            }
        }
        if (method === undefined) {
            setPaymentValid("Select one of these payment method.");
            validateObj.methodSub = false;
        } else {
            setPaymentValid("");
            validateObj.methodSub = true;
        }
        if (gstClick && gstNumber === "") {
            setGstValid("Tax number is required");
            validateObj.gstNumberSub = false;
        } else {
            setGstValid("");
            validateObj.gstNumberSub = true;
        }
        if (accountPassword && cpassword.length === 0) {
            setCpasswordValid([
                "Password is required"
            ]);
            validateObj.cpasswordSub = true;
        } else {
            let arrayValue = [];
            if (!(0,emailValidator/* upperPresent */.Zw)(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 in Capital Case!");
            }
            if (!(0,emailValidator/* numPresent */.kB)(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must have at least 1 Number");
            }
            if (!(0,emailValidator/* lowerPresent */.FK)(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 Lower Case!");
            }
            if (!(0,emailValidator/* specialPresent */.h9)(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 Special characters!");
            }
            if (!authValue.isLoggedIn && accountPassword && cpassword.length < 8) {
                arrayValue.push("Must be at least 8 characters!");
            }
            if (arrayValue.length > 0) {
                validateObj.cpasswordSub = false;
            } else {
                validateObj.cpasswordSub = true;
            }
            validateObj.cpasswordSub = true;
            setCpasswordValid(arrayValue);
        }
        if (authValue.isLoggedIn && !prevAddressRadio) {
            setPrevAddressRadioValid("Select one of these address.");
            validateObj.prevAddressRadioValidSub = false;
        } else {
            setPrevAddressRadioValid("");
            validateObj.prevAddressRadioValidSub = true;
        }
        if (authValue.isLoggedIn && !billToSameAddress && !prevAddressBillRadio) {
            setPrevAddressBillRadioValid("Select one of these address.");
            validateObj.prevAddressBillRadioValidSub = false;
        } else {
            setPrevAddressBillRadioValid("");
            validateObj.prevAddressBillRadioValidSub = true;
        }
        if (validateObj.fnameSub && validateObj.fname1Sub && validateObj.numSub && validateObj.num1Sub && validateObj.addressSub && validateObj.postCodeSub && validateObj.postCode1Sub && validateObj.zoneNameSub && validateObj.zoneName1Sub && validateObj.address111Sub && validateObj.countryNameSub && validateObj.countryName1Sub && validateObj.nameSub && validateObj.mailSub && validateObj.methodSub && validateObj.gstNumberSub && validateObj.cpasswordSub && validateObj.prevAddressRadioValidSub && validateObj.prevAddressBillRadioValidSub && validateObj.citySub && validateObj.city1Sub) {
            return true;
        } else {
            return false;
        }
    };
    const addressSelect = (e, address)=>{
        setPrevAddressRadio(true);
        setAddress(address.address1);
        setAddress1(address.address2);
        setCity(address.city);
        setPostCode(address.postcode);
        setCountryId(address.countryId);
        setZoneName(address.state);
        setFname(address.company);
        if (billToSameAddress) {
            setPrevAddressBillRadio(true);
            setAddress11(address.address1);
            setAddress111(address.address2);
            setCity1(address.city);
            setPostCode1(address.postcode);
            setCountryId1(address.countryId);
            setZoneName1(address.state);
            setFname1(address.company);
        }
    };
    const billAddressSelect = (e, billAddress)=>{
        setPrevAddressBillRadio(true);
        setAddress11(billAddress.address1);
        setAddress111(billAddress.address2);
        setCity1(billAddress.city);
        setPostCode1(billAddress.postcode);
        setCountryId1(billAddress.countryId);
        setZoneName1(billAddress.state);
        setFname1(billAddress.company);
    };
    const handleChangePaymentMethod = (e)=>{
        setMethod(e.target.value);
    };
    const detailCart = ()=>{
        let cartLocale = JSON.parse(localStorage.getItem("cartItem"));
        let cartFinal = {};
        let cartArray = [];
        cartLocale.forEach((product)=>{
            cartFinal = {
                productId: product.productId,
                productPrice: product.price,
                quantity: product.quantity,
                skuName: product.skuName,
                total: product.price * product.quantity
            };
            cartArray.push(cartFinal);
            setCouponProduct(cartArray);
        });
    };
    const totalInCart = ()=>{
        const locale = JSON.parse(localStorage.getItem("cartItem"));
        var len = locale && locale.length;
        let detailArray = [];
        for(var i = 0; i < len; i++){
            if (locale[i].flag !== "") {
                detailArray.push((0,priceHelper/* priceHelpFunc */.k)(locale[i].pricerefer, locale[i].taxType, locale[i].taxValue, "") * locale[i].quantity);
            }
            if (locale[i].flag === "") {
                detailArray.push((0,priceHelper/* priceHelpFunc */.k)(locale[i].price, locale[i].taxType, locale[i].taxValue, "") * locale[i].quantity);
            }
        }
        var sum = detailArray.reduce(function(a, b) {
            return a + b;
        }, 0);
        setTotalData(sum);
        dispatch((0,product_action/* gettotaldatas */.$M)(sum));
    };
    const addressList = ()=>{
        if (auth) {
            (0,api/* addressListApi */.BW)(setAddressData, setAddressLoader);
        }
    };
    (0,external_react_.useEffect)(()=>{
        addressList();
        detailCart();
        (0,api/* getPaymentApi */.Pj)(setPaymentOption);
        apiCallFunc();
    }, [
        discountproprice,
        totalData,
        coupongetdatas
    ]);
    const radioStyle = {};
    const arrayCreate = ()=>{
        const locale = JSON.parse(localStorage.getItem("cartItem"));
        var len = locale && locale.length;
        let detailArray = [];
        for(var i = 0; i < len; i++){
            let vendorids = locale[i].vendorId && locale[i].vendorId ? locale[i].vendorId : 0;
            detailArray.push({
                productId: locale[i].productId,
                quantity: locale[i].quantity,
                price: locale[i].price,
                basePrice: locale[i].price,
                model: locale[i].name,
                name: locale[i].name + `(${locale[i].variantName})`,
                productVarientOptionId: "",
                taxType: null,
                taxValue: null,
                varientName: "",
                skuName: locale[i].skuName,
                vendorId: vendorids
            });
        }
        setDetail(detailArray);
    };
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("spurtToken")) {
            setAuth(true);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        setCartItems(JSON.parse(localStorage.getItem("cartItem")));
        arrayCreate();
        totalInCart();
    }, [
        reloadCart,
        removeFromCart,
        incrementLoad,
        decrementLoad
    ]);
    const handleIncreaseItemQty = (product)=>{
        (0,cartHelper/* incrementQuantity */.g1)(product);
        dispatch((0,action/* increaseItemQty */.zb)(product));
        dispatch((0,action/* addItem */.jX)(1));
        setCouponApplied(false);
        setDiscountedPrice("");
        if (auth) {
            const localCart = JSON.parse(localStorage.getItem("cartItem"));
            let currentProduct = localCart.find((current)=>{
                return current.productId === product.productId;
            });
            if (product.flag === "") {
                (0,api/* addToCartApi */.kL)(product.productId, (0,priceHelper/* priceHelpFunc */.k)(product.price, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
            } else {
                (0,api/* addToCartApi */.kL)(product.productId, (0,priceHelper/* priceHelpFunc */.k)(product.pricerefer, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
            }
        }
    };
    const handleDecreaseItemQty = (product)=>{
        if (product.quantity !== 1) {
            setCouponApplied(false);
            setDiscountedPrice("");
            (0,cartHelper/* decrementQuantity */.X1)(product);
            dispatch((0,action/* decreaseItemQty */.WG)(product));
            dispatch((0,action/* addItem */.jX)(1));
            if (auth) {
                const localCart = JSON.parse(localStorage.getItem("cartItem"));
                let currentProduct = localCart.find((current)=>{
                    return current.productId === product.productId;
                });
                if (product.flag === "") {
                    (0,api/* addToCartApi */.kL)(product.productId, (0,priceHelper/* priceHelpFunc */.k)(product.price, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
                } else {
                    (0,api/* addToCartApi */.kL)(product.productId, (0,priceHelper/* priceHelpFunc */.k)(product.pricerefer, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
                }
            }
        } else {
            if (auth) {
                (0,api/* removeFromCartApi */.tT)(product.productId, product.price, "", product.skuName);
            }
            (0,cartHelper/* cartRemove */.Ee)(product);
            dispatch((0,action/* removeItem */.cl)(product));
        }
    };
    const registerOnChange = (e)=>{
        const { name , value  } = e.target;
        if (name === "fullname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setName(value);
            }
            if (value.length < 3 && value.length !== 0) {
                setNameValid("Minimum of 3 characters");
            } else if (value.length === 0) {
                setNameValid("Full name is required");
            } else {
                setNameValid("");
            }
        }
        if (name === "lastname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setLname(value);
            }
        }
        if (name === "email") {
            setMail(value);
            dispatch((0,product_action/* getmaildatas */.WL)(value));
            if (value) {
                let emailCheck = (0,emailValidator/* EmailValidator */.on)(value);
                if (emailCheck) {
                    setMailValid("");
                } else {
                    setMailValid("Invalid email address");
                }
            } else {
                setMailValid("Email is required");
            }
        }
        if (name === "number") {
            value.length <= 15 && setNumber(e.target.value);
            if (value) {
                setNumValid("");
            } else {
                setNumValid("Phone number is required");
            }
        }
        if (name === "cpassname") {
            if (value === "") {
                setCpasswordValid([
                    " password is required"
                ]);
                setCpassword(value);
            } else {
                setCpassword(value);
                let arrayValue = [];
                if (!(0,emailValidator/* upperPresent */.Zw)(value)) {
                    arrayValue.push("Must contain at least 1 in capital case!");
                }
                if (!(0,emailValidator/* numPresent */.kB)(value)) {
                    arrayValue.push("Must have at least 1 Number");
                }
                if (!(0,emailValidator/* lowerPresent */.FK)(value)) {
                    arrayValue.push("Must contain at least 1 lower case!");
                }
                if (!(0,emailValidator/* specialPresent */.h9)(value)) {
                    arrayValue.push("Must contain at least 1 special characters!");
                }
                if (value.length < 8) {
                    arrayValue.push("Must be at least 8 characters!");
                }
                if (arrayValue.length > 0) {
                    setCpasswordValid(arrayValue);
                } else {
                    setCpasswordValid([]);
                }
            }
        }
    };
    const cancelCoupon = ()=>{
        setCouponApplied(false);
        setDiscountedPrice("");
    };
    const onCheckoutApiCall = ()=>{
        setSubmit(1);
        validate();
        let any = validate();
        if (validate()) {
            setButtonLoader(true);
            setbuttondisable(true);
            (0,api/* checkOutApi */.nw)(gstNumber, dispatch, fname, lname, address, number, city, postCode, mail, details, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountproprice, coupondisdata?.data?.couponCode, name, address1, setButtonLoader, coupongetdatas, buttonLoader);
        }
    };
    const EditAddress = (detail)=>{
        dispatch((0,setting_action/* editDetail */.tK)(detail));
        router_default().push("/account/addaddresses_edit/[eaid]", `/account/addaddresses_edit/${detail.addressId}`);
    };
    const handleRemoveFromCart = (product)=>{
        if (auth) {
            (0,api/* removeFromCartApi */.tT)(product.productId, product.price, "", product.skuName, product.variantId, product.variantName);
        }
        (0,cartHelper/* cartRemove */.Ee)(product);
        dispatch((0,action/* removeItem */.cl)(product));
    };
    const CouponOnchange = (e)=>{
        setCounponError("");
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "cart-container",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "checkout-contaoner",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "custom-checkout-form",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "custom-checkout-form-left",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                children: t("checkouts.FillYourInfo")
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "custom-checkout-form-contact",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "custom-field-row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                className: "vendor-sign-input",
                                                maxLength: "30",
                                                placeholder: t("checkouts.FirstName"),
                                                name: "fullname",
                                                value: name,
                                                onFocus: (e)=>setNameFocus(true),
                                                onBlur: (e)=>{
                                                    setNameFocus(false);
                                                    registerOnChange(e);
                                                },
                                                onChange: (e)=>registerOnChange(e),
                                                style: {
                                                    borderColor: nameValid && "red"
                                                }
                                            }),
                                            nameValid !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "custom-field-error",
                                                style: {},
                                                children: nameValid
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "custom-field-row",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            className: "vendor-sign-input",
                                            name: "lastname",
                                            value: lname,
                                            placeholder: t("authentication.LastName"),
                                            onChange: (e)=>registerOnChange(e),
                                            onFocus: (e)=>setLnameFocus(true),
                                            onBlur: (e)=>{
                                                setLnameFocus(false);
                                                registerOnChange(e);
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "custom-field-row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                className: "vendor-sign-input",
                                                placeholder: "Email *",
                                                value: mail,
                                                name: "email",
                                                onChange: (e)=>registerOnChange(e),
                                                onFocus: (e)=>setMailFocus(true),
                                                onBlur: (e)=>setMailFocus(false),
                                                style: {
                                                    borderColor: mailValid && "red"
                                                }
                                            }),
                                            mailValid !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "custom-field-error",
                                                style: {},
                                                children: mailValid
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "custom-field-row",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                className: "vendor-sign-input",
                                                type: "number",
                                                name: "number",
                                                placeholder: t("contact.Phone"),
                                                value: number,
                                                onChange: (e)=>registerOnChange(e),
                                                onFocus: (e)=>setNumFocus(true),
                                                onBlur: (e)=>{
                                                    setNumFocus(false);
                                                    registerOnChange(e);
                                                },
                                                style: {
                                                    borderColor: numValid && "red"
                                                }
                                            }),
                                            numValid !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "custom-field-error",
                                                style: {},
                                                children: numValid
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "add-gst-number-container",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "add-gst-number-subcontainer",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "checkbox",
                                                        onClick: (e)=>setGstClick(e.target.checked)
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: t("checkouts.AddGstNumber")
                                                    })
                                                ]
                                            }),
                                            gstClick && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "agns-input",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        className: "vendor-sign-input",
                                                        placeholder: "Tax Number *",
                                                        name: "gstnumber",
                                                        style: {
                                                            borderColor: gstvalid && "red"
                                                        },
                                                        value: gstNumber,
                                                        onChange: (e)=>setGstNumber(e.target.value),
                                                        onBlur: (e)=>setGstNumberFocus(false),
                                                        onFocus: (e)=>setGstNumberFocus(true)
                                                    }),
                                                    gstvalid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "error-span",
                                                        children: gstvalid
                                                    }) : ""
                                                ]
                                            })
                                        ]
                                    }),
                                    !authValue.isLoggedIn && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "add-gst-number-container",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "add-gst-number-subcontainer",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "checkbox",
                                                        onClick: (e)=>setAccountPassword(e.target.checked)
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: t("checkouts.createAccount")
                                                    })
                                                ]
                                            }),
                                            accountPassword && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "agns-input",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        className: "vendor-sign-input",
                                                        placeholder: "create account password *",
                                                        name: "cpassname",
                                                        value: cpassword,
                                                        type: "password",
                                                        onChange: (e)=>registerOnChange(e),
                                                        onFocus: (e)=>setCpasswordFocus(true),
                                                        onBlur: (e)=>{
                                                            setCpasswordFocus(false);
                                                        }
                                                    }),
                                                    cpasswordValid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: cpasswordValid.map((error)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                                className: "error-span",
                                                                style: {},
                                                                children: [
                                                                    error,
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                ]
                                                            }))
                                                    }) : ""
                                                ]
                                            })
                                        ]
                                    }),
                                    authValue.isLoggedIn && addressData.length === 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "checkout-add-shipping-address",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/account/addaddress",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        children: "+ Add Shipping Address"
                                                    })
                                                })
                                            }),
                                            prevAddressRadioValid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "error-span",
                                                children: prevAddressRadioValid
                                            }) : "",
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "checkout-add-shipping-address",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/account/addaddress",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        children: "+ Add Billing Address"
                                                    })
                                                })
                                            })
                                        ]
                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                        children: authValue.isLoggedIn && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                                    className: "add-select-address",
                                                    children: [
                                                        t("account.ShippingAddress"),
                                                        " ",
                                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: "/account/addaddress",
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                                children: [
                                                                    "+ ",
                                                                    t("account.AddNewAddress")
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                }),
                                                addressData && addressData.map((address, index)=>{
                                                    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "address-container",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                            className: "address-custom-label",
                                                            for: address.addressId,
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                    type: "radio",
                                                                    name: "address-radeo",
                                                                    className: "addr-input",
                                                                    id: address.addressId,
                                                                    onClick: (e)=>addressSelect(e, address),
                                                                    value: address
                                                                }),
                                                                address.addressType === 0 ? "Work" : "Home",
                                                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                    className: "edit-address",
                                                                    onClick: (e)=>EditAddress(address),
                                                                    children: t("checkouts.Edit")
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                    className: "address-paragraph",
                                                                    children: [
                                                                        address && address.address1,
                                                                        ",",
                                                                        address.address2,
                                                                        ",",
                                                                        address.city,
                                                                        ",",
                                                                        address.state + ":" + address.postcode
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    });
                                                }),
                                                prevAddressRadioValid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "error-span",
                                                    children: prevAddressRadioValid
                                                }) : "",
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "add-gst-number-subcontainer",
                                                    style: {
                                                        marginBottom: "20px",
                                                        marginLeft: "12px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                            type: "checkbox",
                                                            onClick: (e)=>setBillToSameAddress(e.target.checked),
                                                            checked: billToSameAddress
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            children: t("checkouts.BillToSame")
                                                        })
                                                    ]
                                                }),
                                                !billToSameAddress && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                            className: "add-select-address",
                                                            children: "Select a billing address"
                                                        }),
                                                        addressData && addressData.map((address, index)=>{
                                                            return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "address-container",
                                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                                                    className: "address-custom-label",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                            type: "radio",
                                                                            name: "address-radeo",
                                                                            className: "addr-input",
                                                                            id: address.addressId,
                                                                            onClick: (e)=>billAddressSelect(e, address),
                                                                            value: address
                                                                        }),
                                                                        address.addressType === 0 ? "Work" : "Home",
                                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                            className: "address-paragraph",
                                                                            children: [
                                                                                address && address.address1,
                                                                                ",",
                                                                                address.address2,
                                                                                ",",
                                                                                address.city,
                                                                                ",",
                                                                                address.state + ":" + address.postcode
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            });
                                                        }),
                                                        prevAddressBillRadioValid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "error-span",
                                                            children: prevAddressBillRadioValid
                                                        }) : ""
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    !authValue.isLoggedIn && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(modules_FormCheckoutInformation, {
                                                cartItems: cartItems,
                                                productDetail: details,
                                                amount: totalData,
                                                addressData: addressData,
                                                fname: fname,
                                                setFname: setFname,
                                                l1name: l1name,
                                                setL1name: setL1name,
                                                email: email,
                                                setEmail: setEmail,
                                                address: address,
                                                setAddress: setAddress,
                                                address1: address1,
                                                setAddress1: setAddress1,
                                                city: city,
                                                setCity: setCity,
                                                postCode: postCode,
                                                setPostCode: setPostCode,
                                                num: num,
                                                setNum: setNum,
                                                countryId: countryId,
                                                setCountryId: setCountryId,
                                                countryData: countryData,
                                                setCountryData: setCountryData,
                                                countryName: countryName,
                                                setCountryName: setCountryName,
                                                fnameError: fnameError,
                                                setFnameError: setFnameError,
                                                numError: numError,
                                                setNumError: setNumError,
                                                emailError: emailError,
                                                setEmailError: setEmailError,
                                                addressError: addressError,
                                                setAddressError: setAddressError,
                                                cityError: cityError,
                                                setCityError: setCityError,
                                                postalError: postalError,
                                                setPostalError: setPostalError,
                                                countryError: countryError,
                                                setCountryError: setCountryError,
                                                submit: submit,
                                                setSubmit: setSubmit,
                                                zoneData: zoneData,
                                                setZoneData: setZoneData,
                                                zoneComp: zoneComp,
                                                setZoneComp: setZoneComp,
                                                zoneId: zoneId,
                                                setZoneId: setZoneId,
                                                zoneName: zoneName,
                                                setZoneName: setZoneName,
                                                zoneError: zoneError
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "add-gst-number-subcontainer",
                                                style: {
                                                    marginBottom: "20px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        type: "checkbox",
                                                        onClick: (e)=>setBillToSame(e.target.checked),
                                                        checked: billToSame
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        children: t("checkouts.BillToSame")
                                                    })
                                                ]
                                            }),
                                            !billToSame && /*#__PURE__*/ jsx_runtime_.jsx(FormCheckoutBilling, {
                                                cartItems: cartItems,
                                                productDetail: details,
                                                amount: totalData,
                                                addressData: addressData,
                                                fname: fname1,
                                                setFname: setFname1,
                                                l1name: l1name1,
                                                setL1name: setL1name1,
                                                email: email1,
                                                setEmail: setEmail1,
                                                address: address111,
                                                setAddress: setAddress111,
                                                address1: address11,
                                                setAddress1: setAddress11,
                                                city: city1,
                                                setCity: setCity1,
                                                postCode: postCode1,
                                                setPostCode: setPostCode1,
                                                num: num1,
                                                setNum: setNum1,
                                                countryId: countryId1,
                                                setCountryId: setCountryId1,
                                                countryData: countryData1,
                                                setCountryData: setCountryData1,
                                                countryName: countryName1,
                                                setCountryName: setCountryName1,
                                                fnameError: fnameError1,
                                                setFnameError: setFnameError1,
                                                numError: numError1,
                                                setNumError: setNumError1,
                                                emailError: emailError1,
                                                setEmailError: setEmailError1,
                                                addressError: addressError1,
                                                setAddressError: setAddressError1,
                                                cityError: cityError1,
                                                setCityError: setCityError1,
                                                postalError: postalError1,
                                                setPostalError: setPostalError1,
                                                countryError: countryError1,
                                                setCountryError: setCountryError1,
                                                submit: submit,
                                                setSubmit: setSubmit,
                                                zoneData: zoneData1,
                                                setZoneData: setZoneData1,
                                                zoneComp: zoneComp1,
                                                setZoneComp: setZoneComp1,
                                                zoneId: zoneId1,
                                                setZoneId: setZoneId1,
                                                zoneName: zoneName1,
                                                setZoneName: setZoneName1,
                                                zoneError: zoneError1
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "custom-checkout-form-right",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                children: [
                                    t("ItemsinCart"),
                                    " - ",
                                    cartItems.length,
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/account/shopping-cart",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: "custom-checkout-form-veiw-cart",
                                            children: t("view-cart")
                                        })
                                    })
                                ]
                            }),
                            cartItems.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    console.log(cartItems, "sdfs34234"),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "custom-checkout-product-card",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                                            className: "custom-checkout-card-table",
                                            children: [
                                                cartItems && cartItems.map((product)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                                className: "custom-checkout-td-img",
                                                                style: {
                                                                    width: "80px"
                                                                },
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                        src: product?.productImage && product?.productImage?.[0] && product?.productImage?.[0]?.containerName !== "/" ? url/* imageUrl */.sQ + "?path=" + product.productImage[0].containerName + "&name=" + product.productImage[0].image + "&width=400&height=200" : "/static/img/no-image.png",
                                                                        width: 60,
                                                                        height: 60,
                                                                        objectFit: "contain",
                                                                        layout: "responsive",
                                                                        placeholder: "blur",
                                                                        blurDataURL: "/static/img/no-image.png"
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                                className: "custom-checkout-td-content",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                        className: "close-btn-outer",
                                                                        style: {},
                                                                        onClick: (e)=>handleRemoveFromCart(product),
                                                                        children: "x"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                        className: "checkout-td-prooductname",
                                                                        children: product.name
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                        className: "checkout-td-prooductname-subcontainer",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                                                children: [
                                                                                    product.skuName,
                                                                                    " ",
                                                                                    product.variantName
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                className: "custom-product-box",
                                                                                children: [
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                                        onClick: (e)=>handleDecreaseItemQty(product),
                                                                                        children: "-"
                                                                                    }),
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                                        children: product.quantity
                                                                                    }),
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                                        onClick: (e)=>handleIncreaseItemQty(product),
                                                                                        children: "+"
                                                                                    })
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                                className: "cctd-price",
                                                                                children: [
                                                                                    "$",
                                                                                    product.flag !== "" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                                        children: [
                                                                                            " ",
                                                                                            (0,product_helper/* formatCurrency */.x)(product.quantity * (0,priceHelper/* priceHelpFunc */.k)(product.pricerefer, product.taxType, product.taxValue, ""))
                                                                                        ]
                                                                                    }),
                                                                                    product.flag === "" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                                        children: [
                                                                                            " ",
                                                                                            (0,product_helper/* formatCurrency */.x)(product.quantity * (0,priceHelper/* priceHelpFunc */.k)(product.price, product.taxType, product.taxValue, ""))
                                                                                        ]
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                            className: "custom-td-total",
                                                            children: [
                                                                " ",
                                                                t("total")
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                            className: "custom-td-total",
                                                            style: {
                                                                textAlign: "right"
                                                            },
                                                            children: [
                                                                "$ ",
                                                                (0,product_helper/* formatCurrency */.x)(totalData)
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                couponApplied && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                            className: "custom-td-total",
                                                            children: [
                                                                " Discount Amount",
                                                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                    className: "coupon-apply-text",
                                                                    children: "Coupons, Vouchers  & Promotional"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                            className: "custom-td-total",
                                                            style: {
                                                                textAlign: "right"
                                                            },
                                                            children: [
                                                                "(-) $ ",
                                                                /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                    children: discountproprice
                                                                }),
                                                                " "
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                            className: "custom-td-total",
                                                            onClick: (e)=>cancelCoupon(),
                                                            style: {
                                                                cursor: "pointer"
                                                            },
                                                            children: "x"
                                                        })
                                                    ]
                                                }),
                                                couponApplied && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                            className: "custom-td-total",
                                                            children: " Total amount payable"
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("td", {
                                                            className: "custom-td-total",
                                                            children: [
                                                                "$ ",
                                                                totalpayableamount
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    connectPlugins/* ConnectPlugin.CouponAdd */.d.CouponAdd && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.CouponAdd */.d.CouponAdd, {}),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "payment-new-screen",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                children: t("checkouts.SelectPaymentMode")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "payment-main-grid",
                                                style: {
                                                    width: "calc(100% - 0px)",
                                                    fontSize: "18px"
                                                },
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Radio.Group, {
                                                    onChange: (e)=>handleChangePaymentMethod(e),
                                                    value: method,
                                                    size: "small",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "payment-main-grid",
                                                        children: paymentOption && paymentOption.map((pay)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Radio, {
                                                                style: radioStyle,
                                                                value: pay.id,
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                    src: url/* imageUrl */.sQ + "?path=" + pay.pluginAvatarPath + "&name=" + pay.pluginAvatar + "&width=400&height=400",
                                                                    alt: "",
                                                                    style: {}
                                                                })
                                                            }, pay.id))
                                                    })
                                                })
                                            }),
                                            paymentvalid !== "" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "error-span",
                                                children: paymentvalid
                                            }) : ""
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "custom-place-order",
                                children: buttonLoader === true ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    disabled: buttondisable === true,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        class: "fa fa-refresh fa-spin"
                                    })
                                }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    disabled: buttondisable === true,
                                    onClick: (e)=>onCheckoutApiCall(e),
                                    children: t("StockCheckout.Placeorder")
                                })
                            })
                        ]
                    })
                ]
            })
        })
    });
}
const Checkout_mapStateToProps = (state)=>{
    return state.cart;
};
/* harmony default export */ const account_Checkout = ((0,external_react_redux_.connect)(Checkout_mapStateToProps)(Checkout));

// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/account/checkout.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const OrderTrackingPage = ()=>{
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
            children: /*#__PURE__*/ jsx_runtime_.jsx(account_Checkout, {})
        })
    });
};
/* harmony default export */ const checkout = (OrderTrackingPage);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,7929], () => (__webpack_exec__(1314)));
module.exports = __webpack_exports__;

})();