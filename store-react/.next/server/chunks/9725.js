"use strict";
exports.id = 9725;
exports.ids = [9725];
exports.modules = {

/***/ 9725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _connectPlugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(384);
/* harmony import */ var _api_account_country__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5888);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1929);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api_account_address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7351);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _api_account_editAddress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2759);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);











function FormEditAddress({ id , type , details  }) {
    const { 0: countryData , 1: setCountryData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: countryId , 1: setCountryId  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: address1 , 1: setAddress1  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: address2 , 1: setAddress2  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: city , 1: setCity  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: states , 1: setStates  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: postCode , 1: setPostCode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: addressError , 1: setAddressError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: cityError , 1: setCityError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: stateError , 1: setStateError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: postCodeError , 1: setPostCOdeError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: countryIdError , 1: setCountryIdError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: addressType , 1: setAddressType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
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
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (type === "edit") {
            setAddress1(details.address1);
            setAddress2(details.address2);
            setCity(details.city);
            setStates(details.state);
            setPostCode(details.postcode);
            setCountryId(details.countryId);
            setAddressType(details.addressType);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        apiCallFunc();
    }, []);
    const modalWarning = (type)=>{
        antd__WEBPACK_IMPORTED_MODULE_8__.notification[type]({
            message: "Address type is required",
            description: "Enter the address type for shipping purpose",
            duration: 3
        });
    };
    const apiCallFunc = ()=>{
        (0,_api_account_country__WEBPACK_IMPORTED_MODULE_3__/* .countryListApi */ .j)(setCountryData);
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
    const handleSubmit = ()=>{
        if (type === "edit") {
            if (address1 !== "" && city !== "" && countryId !== "" && states !== "" && postCode !== "") {
                (0,_api_account_editAddress__WEBPACK_IMPORTED_MODULE_7__/* .editAddressApi */ .g)(id, address1, address2, city, countryId, states, postCode, (next_router__WEBPACK_IMPORTED_MODULE_6___default()), addressType);
            } else {
                if (address1 === "") {
                    setAddressError("*Address is required");
                }
                if (city === "") {
                    setCityError("*City is required");
                }
                if (states === "") {
                    setStateError("*State is required");
                }
                if (postCode === "") {
                    setPostCOdeError("*Postcode is required");
                }
                if (countryId === "") {
                    setCountryIdError("Country is required");
                }
            }
        } else {
            if (address1 !== "" && city !== "" && countryId !== "" && states !== "" && postCode !== "" && addressType !== "") {
                (0,_api_account_address__WEBPACK_IMPORTED_MODULE_5__/* .UserAddAddress */ .S)(address1, address2, city, countryId, states, postCode, (next_router__WEBPACK_IMPORTED_MODULE_6___default()), addressType);
            } else {
                if (address1 === "") {
                    setAddressError("*Address is required");
                }
                if (city === "") {
                    setCityError("*City is required");
                }
                if (states === "") {
                    setStateError("*State is required");
                }
                if (postCode === "") {
                    setPostCOdeError("*Postcode is required");
                }
                if (countryId === "") {
                    setCountryIdError("Country is required");
                }
                if (addressType === "") {
                    modalWarning("warning");
                }
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        className: "ps-form--edit-address",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ps-form__header",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    children: "Billing address"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-form__content",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                children: [
                                    "Address line 1 ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("sup", {
                                        children: "*"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                placeholder: "",
                                className: "form-control",
                                value: address1,
                                onChange: (e)=>setAddress1(e.target.value)
                            }),
                            addressError !== "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "error-span",
                                children: addressError
                            }) : ""
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                children: "Address line 2"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                placeholder: "optional",
                                className: "form-control",
                                value: address2,
                                onChange: (e)=>setAddress2(e.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                children: [
                                    "City",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("sup", {
                                        children: "*"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                placeholder: "",
                                className: "form-control",
                                value: city,
                                onChange: (e)=>setCity(e.target.value)
                            }),
                            cityError !== "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "error-span",
                                children: cityError
                            }) : ""
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                children: [
                                    "Country ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("sup", {
                                        children: "*"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_select__WEBPACK_IMPORTED_MODULE_4___default()), {
                                onChange: (e)=>setCountryId(e.value),
                                isSearchable: true,
                                defaultValue: countryId,
                                options: arrayComp,
                                styles: colourStyles
                            }),
                            countryIdError !== "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "error-span",
                                children: countryIdError
                            }) : ""
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                children: [
                                    "State ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("sup", {
                                        children: "*"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                placeholder: "",
                                className: "form-control",
                                value: states,
                                onChange: (e)=>setStates(e.target.value)
                            }),
                            stateError !== "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "error-span",
                                children: stateError
                            }) : ""
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-group",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                children: [
                                    "Postcode ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("sup", {
                                        children: "*"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "number",
                                placeholder: "",
                                className: "form-control",
                                value: postCode,
                                onChange: (e)=>setPostCode(e.target.value)
                            }),
                            postCodeError !== "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "error-span",
                                children: postCodeError
                            }) : "",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "radio",
                                        id: "home",
                                        name: "drone",
                                        value: "Home",
                                        onClick: (e)=>setAddressType(0),
                                        className: "addr-input",
                                        checked: addressType === 0 ? "checked" : ""
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        for: "home",
                                        className: "address-custom-label",
                                        children: "Home"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "radio",
                                        id: "home",
                                        name: "drone",
                                        onClick: (e)=>setAddressType(1),
                                        value: "Work",
                                        className: "addr-input",
                                        checked: addressType === 1 ? "checked" : ""
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        for: "home",
                                        className: "address-custom-label",
                                        children: "Work"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "form-group submit",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "ps-btn",
                            type: "button",
                            onClick: (e)=>handleSubmit(),
                            children: "Save Address"
                        })
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormEditAddress);


/***/ })

};
;