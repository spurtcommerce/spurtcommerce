"use strict";
exports.id = 1616;
exports.ids = [1616];
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

/***/ 1616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ account_CustomAddAddress)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/components/elements/AccountNav.jsx
var AccountNav = __webpack_require__(1760);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: external "react-select"
var external_react_select_ = __webpack_require__(1929);
var external_react_select_default = /*#__PURE__*/__webpack_require__.n(external_react_select_);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
;// CONCATENATED MODULE: ./src/components/partials/account/modules/FormAddress.jsx











function FormAddressAddEdit({ fname , setFname , address , setAddress , address1 , setAddress1 , city , setCity , postCode , setPostCode , countryData , zoneData , zoneId , setZoneId , zoneName , setZoneName , zoneComp , setZoneComp , countryId , setCountryId , countryName , setCountryName , addressType , setAddressType , fnameError , cityError , countryError , zoneError , addressError , postalError , addressError1 , submit , apiCallAdd , type ,  }) {
    const { 0: defNation , 1: setDefaultNation  } = (0,external_react_.useState)("");
    const { t  } = (0,i18n.useTranslation)("common");
    (0,external_react_.useEffect)(()=>{
        if (type === "edit") {
            let defaultNationTemp = "";
            if (countryData && countryData.length !== 0) {
                defaultNationTemp = countryData && countryData.find((data)=>data.countryId === countryId);
                setDefaultNation(defaultNationTemp.name);
                setCountryName(defaultNationTemp.name);
            }
        }
    }, [
        countryData
    ]);
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
    const colourStyles = {
        control: (styles, state)=>({
                ...styles,
                backgroundColor: state.isFocused ? "#fff" : "transparent",
                color: "#495057",
                borderRadius: "0",
                height: "50px",
                boxShadow: state.isFocused ? 0 : 0,
                backgroundColor: "#f6f6f6",
                border: "none"
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
    const CancelClick = ()=>{
        router_default().push("/account/addresses");
    };
    const validNameFill = (value)=>{
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setFname(value);
        }
    };
    const validcityFill = (value)=>{
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
            setCity(value);
        }
    };
    const handldeStateChange = (e)=>{
        setZoneId(e.value);
        setZoneName(e.label);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "aa-subcontainer",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                            children: " Add Address"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "aa-form-container",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("account.Name"),
                                                "*"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: t("account.Name"),
                                            value: fname,
                                            maxLength: "30",
                                            onChange: (e)=>validNameFill(e.target.value),
                                            style: {
                                                border: submit === 1 && fnameError !== "" && "1px solid red"
                                            }
                                        }),
                                        submit === 1 && fnameError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: fnameError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("account.Country"),
                                                "*"
                                            ]
                                        }),
                                        type === "edit" ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                            placeholder: "Select Country ",
                                            onChange: (e)=>{
                                                setCountryId(e.value);
                                                setDefaultNation(e.label);
                                                setCountryName(e.label);
                                                zoneCreate(e.value);
                                            },
                                            isSearchable: true,
                                            options: arrayComp,
                                            styles: submit === 1 && countryError !== "" ? colourStylesError : colourStyles,
                                            value: {
                                                value: countryId,
                                                label: defNation
                                            }
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                            placeholder: "Select Country ",
                                            onChange: (e)=>{
                                                setCountryId(e.value);
                                                setDefaultNation(e.label);
                                                setCountryName(e.label);
                                                zoneCreate(e.value);
                                            },
                                            isSearchable: true,
                                            options: arrayComp,
                                            styles: submit === 1 && countryError !== "" ? colourStylesError : colourStyles
                                        }),
                                        submit === 1 && countryError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: countryError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("account.Address"),
                                                " 1*"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: t("account.Address"),
                                            maxLength: "30",
                                            value: address,
                                            onChange: (e)=>setAddress(e.target.value),
                                            style: {
                                                border: submit === 1 && addressError !== "" && "1px solid red"
                                            }
                                        }),
                                        submit === 1 && addressError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: addressError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("account.State"),
                                                " *"
                                            ]
                                        }),
                                        type === "edit" ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                            children: zoneComp && zoneComp.length !== 0 ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                placeholder: "Select State ",
                                                onChange: (e)=>handldeStateChange(e),
                                                isSearchable: true,
                                                showSearch: true,
                                                options: zoneComp,
                                                value: {
                                                    label: zoneName
                                                },
                                                styles: submit === 1 && zoneError !== "" ? colourStylesError : colourStyles
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                placeholder: "Select state",
                                                value: zoneName,
                                                onChange: (e)=>setZoneName(e.target.value),
                                                style: {
                                                    border: submit === 1 && zoneError !== "" && "1px solid red"
                                                }
                                            })
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                            children: zoneComp && zoneComp.length !== 0 ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_select_default()), {
                                                placeholder: "Select State ",
                                                onChange: (e)=>handldeStateChange(e),
                                                isSearchable: true,
                                                showSearch: true,
                                                options: zoneComp,
                                                styles: submit === 1 && zoneError !== "" ? colourStylesError : colourStyles
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                type: "text",
                                                placeholder: "Select state",
                                                value: zoneName,
                                                onChange: (e)=>setZoneName(e.target.value),
                                                style: {
                                                    border: submit === 1 && zoneError !== "" && "1px solid red"
                                                }
                                            })
                                        }),
                                        submit === 1 && zoneError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: zoneError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("account.Address"),
                                                "2 *"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: t("account.Address"),
                                            maxLength: "30",
                                            value: address1,
                                            onChange: (e)=>setAddress1(e.target.value),
                                            style: {
                                                border: submit === 1 && addressError1 !== "" && "1px solid red"
                                            }
                                        }),
                                        submit === 1 && addressError1 !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: addressError1
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("registerdetail.city"),
                                                " *"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: t("registerdetail.city"),
                                            value: city,
                                            maxLength: "30",
                                            onChange: (e)=>validcityFill(e.target.value),
                                            style: {
                                                border: submit === 1 && cityError !== "" && "1px solid red"
                                            }
                                        }),
                                        submit === 1 && cityError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: cityError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "aa-address-type",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        style: {
                                            width: "100%"
                                        },
                                        children: t("account.AddressType")
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Radio.Group, {
                                        name: "",
                                        value: addressType,
                                        onChange: (e)=>setAddressType(e.target.value),
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Radio, {
                                                value: 0,
                                                children: t("Shared.Home")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Radio, {
                                                value: 1,
                                                children: t("account.Work")
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "aa-input-main",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "aa-input-container",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            children: [
                                                t("account.Pincode"),
                                                " *"
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            placeholder: t("account.Pincode"),
                                            value: postCode,
                                            onChange: (e)=>e.target.value.length <= 6 && setPostCode(e.target.value),
                                            style: {
                                                border: submit === 1 && postalError !== "" && "1px solid red"
                                            },
                                            type: "number"
                                        }),
                                        submit === 1 && postalError !== "" && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "error-span",
                                            children: postalError
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "aa-input-button",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: "aa-input-save-button",
                                        onClick: (e)=>apiCallAdd(),
                                        children: t("account.SaveAddress")
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: "aa-input-cancel-button",
                                        onClick: (e)=>CancelClick(),
                                        children: t("account.Cancel")
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            '"'
        ]
    });
}
/* harmony default export */ const FormAddress = (FormAddressAddEdit);

// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/api/account/zoneList.js
var zoneList = __webpack_require__(6574);
;// CONCATENATED MODULE: ./src/components/partials/account/CustomAddAddress.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 












function CustomAddAddress({ type , addressId  }) {
    const { 0: fname , 1: setFname  } = (0,external_react_.useState)("");
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
    const { 0: addressError1 , 1: setAddressError1  } = (0,external_react_.useState)("");
    const { 0: cityError , 1: setCityError  } = (0,external_react_.useState)("");
    const { 0: postalError , 1: setPostalError  } = (0,external_react_.useState)("");
    const { 0: countryError , 1: setCountryError  } = (0,external_react_.useState)("");
    const { 0: zoneData , 1: setZoneData  } = (0,external_react_.useState)([]);
    const { 0: zoneId , 1: setZoneId  } = (0,external_react_.useState)("");
    const { 0: zoneName , 1: setZoneName  } = (0,external_react_.useState)("");
    const { 0: zoneError , 1: setZoneError  } = (0,external_react_.useState)("");
    const { 0: addressType , 1: setAddressType  } = (0,external_react_.useState)(0);
    const { 0: submit , 1: setSubmit  } = (0,external_react_.useState)(0);
    const { 0: zoneComp , 1: setZoneComp  } = (0,external_react_.useState)([]);
    const { t  } = (0,i18n.useTranslation)("common");
    const editAddress = (0,external_react_redux_.useSelector)((s)=>s.setting).editDetail;
    const apiCallFunc = ()=>{
        (0,api/* countryListApi */.j4)(setCountryData);
        (0,zoneList/* zoneListApi */.Z)(setZoneData);
    };
    (0,external_react_.useEffect)(()=>{
        apiCallFunc();
        if (type === "edit") {
            if (editAddress && editAddress.address1) {
                setFname(editAddress.company);
                setAddress(editAddress.address1);
                setAddress1(editAddress.address2);
                setCity(editAddress.city);
                setCountryId(editAddress.countryId);
                setPostCode(editAddress.postcode);
                setZoneName(editAddress.state);
                setAddressType(editAddress.addressType);
            }
        } else {
            setFname("");
            setAddress("");
            setAddress1("");
            setCity("");
            setCountryId("");
            setPostCode("");
            setZoneName("");
            setAddressType(0);
            setCountryName("");
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        validate();
    }, [
        fname,
        address,
        address1,
        countryId,
        zoneName,
        postCode,
        city
    ]);
    const validate = ()=>{
        let validateObj = {
            fnameSub: true,
            addressSub: true,
            citySub: true,
            countryNameSub: true,
            postCodeSub: true,
            zoneNameSub: true,
            addressSub1: true
        };
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
        if (address1 === "") {
            setAddressError1("Address is required");
            validateObj.addressSub1 = false;
        } else {
            setAddressError1("");
            validateObj.addressSub1 = true;
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
        if (validateObj.fnameSub && validateObj.addressSub && validateObj.postCodeSub && validateObj.zoneNameSub && validateObj.addressSub1 && validateObj.countryNameSub && validateObj.citySub) {
            return true;
        } else {
            return false;
        }
    };
    const apiCallAdd = ()=>{
        setSubmit(1);
        if (validate()) {
            if (type === "add") {
                (0,api/* UserAddAddress */.Sz)(address, address1, city, countryId, zoneName, postCode, (router_default()), addressType, fname, setFname, setAddress, setAddress1, setCity, setCountryId, setZoneName, setPostCode, setAddressType);
            } else {
                (0,api/* editAddressApi */.gh)(addressId, address, address1, city, countryId, zoneName, postCode, (router_default()), addressType, fname, setFname, setAddress, setAddress1, setCity, setCountryId, setZoneName, setPostCode, setAddressType);
            }
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        className: "cus-account-container",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "cus-account-subcontainer",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "cus-position-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(AccountNav/* default */.Z, {
                        keyValue: "0"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "cus-right-position",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "aa-container",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    children: t("account.AddAddress")
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(FormAddress, {
                                    fname: fname,
                                    setFname: setFname,
                                    address: address,
                                    setAddress: setAddress,
                                    address1: address1,
                                    setAddress1: setAddress1,
                                    city: city,
                                    setCity: setCity,
                                    postCode: postCode,
                                    setPostCode: setPostCode,
                                    zoneData: zoneData,
                                    countryData: countryData,
                                    zoneId: zoneId,
                                    setZoneId: setZoneId,
                                    zoneName: zoneName,
                                    setZoneName: setZoneName,
                                    zoneComp: zoneComp,
                                    setZoneComp: setZoneComp,
                                    setCountryId: setCountryId,
                                    countryId: countryId,
                                    countryName: countryName,
                                    setCountryName: setCountryName,
                                    addressType: addressType,
                                    setAddressType: setAddressType,
                                    fnameError: fnameError,
                                    cityError: cityError,
                                    countryError: countryError,
                                    zoneError: zoneError,
                                    addressError: addressError,
                                    postalError: postalError,
                                    submit: submit,
                                    addressError1: addressError1,
                                    apiCallAdd: apiCallAdd,
                                    type: type
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const account_CustomAddAddress = (CustomAddAddress);


/***/ })

};
;