"use strict";
exports.id = 3981;
exports.ids = [3981];
exports.modules = {

/***/ 6531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
class APIServices {
    getAll(url1) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`/${url1}`);
    }
    get(url1, id) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`/${url1}/${id}`);
    }
    getUser(url1) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`/${url1}`);
    }
    create(url1, data) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(`/${url1}`, data);
    }
    createPost(url1) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .ZP.post(`/${url1}`);
    }
    update(url1, id, data) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].put */ .ZP.put(`/${url1}/${id}`, data);
    }
    updateUser(url1, data) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].put */ .ZP.put(`/${url1}`, data);
    }
    delete(url1, id) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["delete"] */ .ZP["delete"](`/${url1}/${id}`);
    }
    deleteAll() {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["delete"] */ .ZP["delete"](`/${url}`);
    }
    deleteUser(url1, id) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].put */ .ZP.put(`/${url1}/${id}`);
    }
    deletePut(url1) {
        return _src_api_intercept__WEBPACK_IMPORTED_MODULE_0__/* ["default"].put */ .ZP.put(`/${url1}`);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new APIServices());


/***/ }),

/***/ 7351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ UserAddAddress)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function UserAddAddress(address1, address2, city, countryId, states, postCode, Router, addressType, fname, setFname, setAddress, setAddress1, setCity, setCountryId, setZoneName, setPostCode, setAddressType) {
    const data = JSON.stringify({
        address1: address1,
        address2: address2,
        city: city,
        state: states,
        countryId: countryId,
        postcode: postCode,
        addressType: addressType,
        company: fname
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create("CustomerAddress/add-address", data);
    if (result && result.data) {
        setAddress("");
        setAddress1("");
        setCity("");
        setCountryId("");
        setFname("");
        setZoneName("");
        setPostCode("");
        setAddressType(1);
        if (result.data.status === 1) {
            (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
            Router.push("/account/addresses");
        }
    }
}


/***/ }),

/***/ 5888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ countryListApi)
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
async function countryListApi(setCountryData) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_0__/* ["default"].getAll */ .Z.getAll("list/country-list?limit=0&offset=0&keyword=&count=0");
    if (result && result.data && result.data.data) {
        setCountryData(result.data.data);
    }
}


/***/ }),

/***/ 2759:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ editAddressApi)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function editAddressApi(addressId, address1, address2, city, countryId, states, postCode, Router, addressType, fname, setFname, setAddress, setAddress1, setCity, setCountryId, setZoneName, setPostCode, setAddressType) {
    const data = JSON.stringify({
        address1: address1,
        address2: address2,
        city: city,
        state: states,
        postcode: postCode,
        countryId: countryId,
        addressType: addressType,
        company: fname
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].update */ .Z.update("CustomerAddress/update-address", addressId, data);
    if (result.data) {
        setAddress("");
        setAddress1("");
        setCity("");
        setCountryId("");
        setFname("");
        setZoneName("");
        setPostCode("");
        setAddressType(1);
    }
    if (result.data.status === 1) {
        Router.push("/account/addresses");
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
    } else {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalWarning */ .eX)("error", result.data.message);
    }
    return result.data;
}


/***/ }),

/***/ 8342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ forgotApi)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function forgotApi(email, setForgotSuccess) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getAll */ .Z.getAll("customer/forgot-password-link?email=" + email);
    if (result && result.data && result.data.status === 1) {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
        setForgotSuccess(true);
    } else {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalWarning */ .eX)("error", result.data.message);
    }
}


/***/ }),

/***/ 6629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ UserOauthLogin)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function UserOauthLogin(profie, Router, res, googleId, googlePath) {
    const http = axios__WEBPACK_IMPORTED_MODULE_1___default().create({
        baseURL: googlePath,
        headers: {
            "Content-type": "application/json"
        }
    });
    const data = JSON.stringify({
        emailId: profie.email,
        oauthData: {
            email: profie.email,
            id: res.googleId,
            idToken: res.accessToken,
            image: profie.imageUrl,
            name: profie.name,
            provider: googleId,
            token: res.accessToken
        }
    });
    const result = await http.post("", data);
    if (result && result.data && result.data.status === 1) {
        localStorage.setItem("spurtToken", result.data.data.token);
        localStorage.setItem("spurtUser", JSON.stringify(result.data.data.user));
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
        Router.push("/");
    } else {}
}
;


/***/ }),

/***/ 1659:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ addtoCartGuest),
/* harmony export */   "k": () => (/* binding */ addToCartApi)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function addToCartApi(id, price, quantity, optionName, productOptionValueId, setButtonLoader, skuName, type, variantId, variantName) {
    const data = JSON.stringify({
        productId: id,
        productPrice: price,
        quantity: quantity,
        type: type,
        productOptionValueId: productOptionValueId,
        productVarientOptionId: variantId,
        varientName: variantName,
        skuName: skuName,
        tirePrice: ""
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create("customer-cart/add-cart", data);
    setButtonLoader(false);
    if (result && result.data && result.data.status === 1) {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
    } else {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalWarning */ .eX)("error", result.data.message);
    }
}
async function addtoCartGuest(id, price, quantity, skuName) {
    const data = JSON.stringify({
        "productId": id,
        "productPrice": price,
        "quantity": quantity,
        "skuName": skuName,
        "type": "new"
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create("guest-cart", data);
}


/***/ }),

/***/ 5728:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export cartCountApi */
/* harmony import */ var _cartList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4015);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function cartCountApi(dispatch) {
    const result = await APIServices.getAll("customer-cart/customer-cart-list?limit=0&offset=0&count=true");
    if (result && result.data && result.data.data) {
        if (result && result.data && result.data.data !== 0) {
            cartListApi(dispatch);
        }
    }
}


/***/ }),

/***/ 4015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ cartListApi)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6531);
/* harmony import */ var _store_cart_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5848);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function cartListApi(dispatch) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_0__/* ["default"].getAll */ .Z.getAll("customer-cart/customer-cart-list");
    if (result && result.data && result.data.data) {
        localStorage.setItem("cartItem", JSON.stringify(result.data.data.cartList));
        dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_1__/* .addItem */ .jX)(1));
    }
}


/***/ }),

/***/ 7064:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ backCheckOutApi)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function backCheckOutApi(fname, lname, address, num, city, postCode, email, productDetail, shippingZone, address2) {
    const data = JSON.stringify({
        shippingFirstName: fname,
        shippingLastName: lname,
        shippingCity: city,
        shippingPostCode: postCode,
        shippingZone: shippingZone,
        phoneNumber: num,
        shippingAddress_1: address,
        shippingAddress_2: address2,
        emailId: email,
        shippingCountryId: 12,
        productDetails: productDetail,
        paymentMethod: 2,
        shippingCompany: ""
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].create */ .Z.create("orders/back-order-checkout", data);
    if (result && result.data && result.data.status === 1) {
        next_router__WEBPACK_IMPORTED_MODULE_0___default().push("/checkout-success/[cid]", "/checkout-success/" + result.data.data.orderPrefixId);
    }
}


/***/ }),

/***/ 2561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ productCompareApi)
/* harmony export */ });
/* harmony import */ var _store_compare_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6011);
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6531);
/* harmony import */ var _toast_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7708);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 



async function productCompareApi(idArray, data, setCompareData, dispatch, setCompareStatus, setloadings, compareTrues) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_2__/* ["default"].getAll */ .Z.getAll("product-store/product-compare?data=" + data + "&productId=" + idArray);
    if (result.data) {
        setloadings(true);
        if (data === 0) {
            if (result && result.data && result.data.status === 1 && result.data.message !== "please choose same category product") {
                localStorage.setItem("compareId", JSON.stringify(idArray));
                dispatch((0,_store_compare_action__WEBPACK_IMPORTED_MODULE_0__/* .getCompareList */ .UU)(1));
                setCompareStatus(1);
            }
        }
        if (result && result.data && result.data.message === "please choose same category product") {
            (0,_toast_index__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP)({
                type: "error",
                message: result.data.message
            });
        } else {
            if (data === 0 && result.data.status) {}
        }
        if (result && result.data && result.data.status) {
            if (compareTrues == true) {
                result.data.message !== "please choose same category product" && (0,_toast_index__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP)({
                    type: "success",
                    message: result.data.message
                });
            }
            if (data === 1) {
                setCompareData(result.data.data);
                dispatch((0,_store_compare_action__WEBPACK_IMPORTED_MODULE_0__/* .compareLoading */ .oO)(false));
            }
        }
    }
}


/***/ }),

/***/ 1966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _store_setting_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9086);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function getPageApi(dispatch) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getAll */ .Z.getAll("pages/pagelist?limit=0&offset=0&keyword=");
    if (result && result.data && result.data.data) {
        dispatch((0,_store_setting_action__WEBPACK_IMPORTED_MODULE_0__/* .footerAddress */ .On)(result.data.data));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPageApi);


/***/ }),

/***/ 3054:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _store_setting_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9086);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function getProfileApi(dispatch) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getAll */ .Z.getAll("settings/get-settings");
    if (result && result.data && result.data.data) {
        dispatch((0,_store_setting_action__WEBPACK_IMPORTED_MODULE_0__/* .footerPage */ .vd)(result.data.data[0]));
        dispatch((0,_store_setting_action__WEBPACK_IMPORTED_MODULE_0__/* .changeCurrency */ .sy)({
            symbol: result.data.data[0].symbolLeft,
            text: result.data.data[0].currencyCode
        }));
        dispatch((0,_store_setting_action__WEBPACK_IMPORTED_MODULE_0__/* .maintenanceState */ .Q5)(result.data.data[0].maintenanceMode));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getProfileApi);


/***/ }),

/***/ 3981:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "zc": () => (/* reexport */ CancelRequestApi),
  "Sz": () => (/* reexport */ address/* UserAddAddress */.S),
  "K8": () => (/* reexport */ UserLogin),
  "zb": () => (/* reexport */ UserRegister),
  "kL": () => (/* reexport */ addToCart/* addToCartApi */.k),
  "BW": () => (/* reexport */ addressListApi),
  "_j": () => (/* reexport */ backOrderCheckout/* backCheckOutApi */._),
  "b": () => (/* reexport */ cancelReasonApi),
  "vV": () => (/* reexport */ cartList/* cartListApi */.v),
  "BK": () => (/* reexport */ categoryListApi),
  "dt": () => (/* reexport */ changePasswordApi),
  "nw": () => (/* reexport */ checkOutApi),
  "eJ": () => (/* reexport */ contactApi),
  "j4": () => (/* reexport */ country/* countryListApi */.j),
  "n5": () => (/* reexport */ delAddressApi),
  "YJ": () => (/* reexport */ deleteProduct/* delWishApi */.Y),
  "gh": () => (/* reexport */ editAddress/* editAddressApi */.g),
  "zE": () => (/* reexport */ editProfileApi),
  "CL": () => (/* reexport */ enquiryApi),
  "xp": () => (/* reexport */ forgotPassword/* forgotApi */.x),
  "Pj": () => (/* reexport */ getPaymentApi),
  "$X": () => (/* reexport */ getProductDetApi),
  "w2": () => (/* reexport */ getServiceListApi),
  "tR": () => (/* reexport */ homeBannerApi),
  "PH": () => (/* reexport */ orderDetailApi),
  "Jo": () => (/* reexport */ orderExportApi),
  "F7": () => (/* reexport */ orderListApi),
  "Zu": () => (/* reexport */ orderTrackIdApi),
  "SZ": () => (/* reexport */ pageDetApi),
  "rc": () => (/* reexport */ productCompare/* productCompareApi */.r),
  "iT": () => (/* reexport */ productCountApi),
  "ZY": () => (/* reexport */ productListApi),
  "tT": () => (/* reexport */ removeFromCartApi),
  "Jf": () => (/* reexport */ specificCategoryApi),
  "BR": () => (/* reexport */ trackOrderApi),
  "p8": () => (/* reexport */ wishListApi)
});

// UNUSED EXPORTS: AddWishlist, ApplyCouponApi, UserOauthLogin, addtoCartGuest, cartCountApi, vendorProductApi, vendorSlugApi, vendorproducreviewApi

// EXTERNAL MODULE: ./src/api/account/address.js
var address = __webpack_require__(7351);
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(6695);
// EXTERNAL MODULE: ./src/api/intercept.js
var intercept = __webpack_require__(5200);
// EXTERNAL MODULE: ./services.js
var services = __webpack_require__(6531);
;// CONCATENATED MODULE: ./src/api/account/applyCoupon.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


async function ApplyCouponApi(couponInput, mail, couponProduct, setDiscountedPrice, setCouponApplied, setAppliedName, totalData, setcoupdata) {
    const data = JSON.stringify({
        couponCode: couponInput,
        emailId: mail,
        productDetail: couponProduct
    });
    const result = await APIServices.create("customer-coupon/apply-coupon", data);
    if (result.data) {
        setcoupdata(result.data.couponData);
        if (result.data.data) {
            setCouponApplied(true);
            modalSuccess("success", result.data.message);
            if (result.data.data.appliedProducts.length !== 0) {
                let initialSum = 0;
                let sumValue = 0;
                result.data.data.appliedProducts.forEach((coupon)=>{
                    sumValue = coupon.discountAmount + initialSum;
                    initialSum = sumValue;
                });
                setDiscountedPrice(Number(sumValue).toFixed(2));
                setAppliedName(totalData - sumValue);
            }
        } else {
            modalWarning("error", result.data.message);
        }
    }
}

;// CONCATENATED MODULE: ./src/api/account/cancelReason.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function cancelReasonApi(setCancelReason) {
    const result = await services/* default.getAll */.Z.getAll("orders/order-cancel-reason-list?limit=0&offset=0&count=0");
    if (result && result.data && result.data.data) {
        setCancelReason(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/account/cancelRequest.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function CancelRequestApi(orderProductId, desc, selectValue, setDesc, setSelectError, setDescError, setSubmit, setSelectValue, Router) {
    const data = JSON.stringify({
        orderProductId: orderProductId,
        description: desc,
        reasonId: selectValue
    });
    const result = await services/* default.create */.Z.create("orders/order-cancel-request", data);
    if (result && result.data && result.data.status === 1) {
        Router.push("/account/myorders");
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
        setDesc("");
        setSelectError("");
        setSelectValue("");
        setDescError("");
        setSubmit(0);
    }
}

;// CONCATENATED MODULE: ./src/api/account/changePassword.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function changePasswordApi(oldPass, newPass, setPassButtonLoader, setOldPass, setNewPass, setOldPassError, setNewPassError, setPassSubmit) {
    const data = JSON.stringify({
        oldPassword: oldPass,
        newPassword: newPass
    });
    const result = await services/* default.create */.Z.create("customer/change-password", data);
    if (result && result.data) {
        setPassButtonLoader(false);
        if (result && result.data && result.data.status === 1) {
            (0,intercept/* modalSuccess */.jS)("success", result.data.message);
            setOldPass("");
            setNewPass("");
            setOldPassError("");
            setNewPassError("");
            setPassSubmit(0);
        } else {
            (0,intercept/* modalWarning */.eX)("error", result.data.message);
            setOldPass("");
            setNewPass("");
            setOldPassError("");
            setNewPassError("");
            setPassSubmit(0);
        }
        return result.data //unwanted
        ;
    }
}

// EXTERNAL MODULE: ./src/api/account/country.js
var country = __webpack_require__(5888);
;// CONCATENATED MODULE: ./src/api/account/deleteAddress.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function delAddressApi(id, setDelStatus) {
    const result = await services/* default.delete */.Z["delete"]("CustomerAddress/delete-address", id);
    if (result && result.data && result.data.status === 1) {
        setDelStatus(1);
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
    } else {
        (0,intercept/* modalWarning */.eX)("error", result.data.message);
    }
    return result.data //unwanteed
    ;
}

// EXTERNAL MODULE: ./src/api/account/editAddress.js
var editAddress = __webpack_require__(2759);
;// CONCATENATED MODULE: ./src/api/account/editProfile.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function editProfileApi(fname, lname, email, num, Router, newDp, setButtonLoader, setimpuploadsuccess) {
    const data = JSON.stringify({
        firstName: fname,
        lastName: lname,
        emailId: email,
        image: newDp,
        phoneNumber: num
    });
    const result = await services/* default.create */.Z.create("customer/edit-profile", data);
    setButtonLoader(false);
    if (result && result.data && result.data.status === 1) {
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
        localStorage.setItem("spurtUser", JSON.stringify(result.data.data));
        Router.push("/");
    } else {
        (0,intercept/* modalWarning */.eX)("error", result.data.message);
    }
    setimpuploadsuccess(false);
    return result.data;
}

;// CONCATENATED MODULE: ./src/api/account/getAddress.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function addressListApi(setAddressData, setAddressLoader) {
    const result = await services/* default.getAll */.Z.getAll("CustomerAddress/get-address-list?limit=0&offset=0&count=0");
    if (result && result.data && result.data.status === 1) {
        setAddressData(result.data.data);
        setAddressLoader(false);
    }
}

;// CONCATENATED MODULE: ./src/api/account/orderDetail.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function orderDetailApi(orderProductId, setOrderDetailInfo, setOrderLoading) {
    const result = await services/* default.getAll */.Z.getAll("orders/order-detail?orderProductId=" + orderProductId);
    if (result && result.data && result.data.data) {
        setOrderDetailInfo(result.data.data);
        setOrderLoading(false);
    }
}

;// CONCATENATED MODULE: ./src/api/account/orderExport.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function orderExportApi(id, setLoadImg) {
    const result = await services/* default.getAll */.Z.getAll(`orders/order-export-pdf?orderProductId=${id}`);
    if (result && result.data) {
        var a = document.createElement("a"); //Create <a>
        a.href = result.data.data //Image Base64 Goes here
        ;
        a.download = "Invoice"; //File name Here
        a.click();
        setLoadImg(false);
    }
}

;// CONCATENATED MODULE: ./src/api/account/orderList.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function orderListApi(limit, offset, setOrderData, searchVal, count, setOrderLoader, setCount, status) {
    const result = await services/* default.getAll */.Z.getAll("orders/order-list?limit=" + limit + "&offset=" + offset + "&keyword=" + searchVal + "&count=0" + "&status=" + status);
    if (result && result.data && result.data.status === 1 && result.data.message !== "Successfully get Count. ") {
        setOrderData(result.data.data);
        setOrderLoader(false);
    }
    if (result && result.data && result.data.message === "Successfully get Count. ") {
        setCount(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/account/orderTrack.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function orderTrackIdApi(orderPrefixId, setOrderInfo) {
    const result = await services/* default.getAll */.Z.getAll("orders/track-order-product?orderProductId=" + orderPrefixId);
    if (result && result.data && result.data.status === 0) {} else {
        setOrderInfo(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/account/specificCategory.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function specificCategoryApi(categorySlug, setSpecificCat, setSelectedCategoryId) {
    const result = await services/* default.getAll */.Z.getAll("list/specific-category-list?categorySlug=" + categorySlug);
    if (result && result.data && result.data.data) {
        setSpecificCat(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/account/trackOrder.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function trackOrderApi(orderProductId, setOrderTrack, setTrackLoading) {
    const result = await services/* default.getAll */.Z.getAll("orders/track-order-product?orderProductId=" + orderProductId);
    if (result && result.data && result.data.data) {
        setOrderTrack(result.data.data);
        setTrackLoading(false);
    }
}

;// CONCATENATED MODULE: ./src/api/account/index.js

















// EXTERNAL MODULE: ./src/api/auth/forgotPassword.js
var forgotPassword = __webpack_require__(8342);
// EXTERNAL MODULE: ./src/api/cart/cartList.js
var cartList = __webpack_require__(4015);
// EXTERNAL MODULE: ./src/store/cart/action.js
var action = __webpack_require__(5848);
;// CONCATENATED MODULE: ./src/api/home/getInfo.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function getProfileInfoApi(dispatch) {
    const result = await services/* default.getAll */.Z.getAll("customer/get-profile");
    if (result && result.data) {
        if (result && result.data && result.data.status === 1) {
            localStorage.setItem("spurtUser", JSON.stringify(result.data.data));
            dispatch((0,action/* addItem */.jX)(1));
        }
    }
}
/* harmony default export */ const getInfo = (getProfileInfoApi);

;// CONCATENATED MODULE: ./src/api/auth/login.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




async function UserLogin(email, password, loginType, Router, setLoginError, dispatch, setMail, setPassword, setLoadImg, setSubmit) {
    const data = JSON.stringify({
        emailId: email,
        password: password,
        type: loginType
    });
    const result = await services/* default.create */.Z.create("customer/login", data);
    if (result && result.data && result.data.status === 1) {
        localStorage.setItem("spurtToken", result.data.data.token);
        getInfo(dispatch);
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
        Router.push("/");
        (0,cartList/* cartListApi */.v)(dispatch);
        setLoadImg(false);
        setSubmit(0);
        dispatch((0,action/* headerreloaditem */.cE)(1));
        dispatch((0,action/* addItem */.jX)(1));
    } else {
        setLoginError(result.data.message);
        (0,intercept/* modalWarning */.eX)("error", result.data.message);
        setMail("");
        setPassword("");
        setLoadImg(false);
        setSubmit(0);
    }
}
;

// EXTERNAL MODULE: ./src/api/auth/oAuthLogin.js
var oAuthLogin = __webpack_require__(6629);
;// CONCATENATED MODULE: ./src/api/auth/register.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function UserRegister(name, email, password, confirmPassword, number, Router) {
    const data = JSON.stringify({
        name: name,
        emailId: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: number
    });
    const result = await services/* default.create */.Z.create("customer/register", data);
    if (result.status !== 400 && result.status !== 500) {
        Router.push("/account/login");
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
    } else {
        if (result.status !== 500) {
            (0,intercept/* modalSuccess */.jS)("error", result.data.message);
        }
    }
}

;// CONCATENATED MODULE: ./src/api/auth/index.js





// EXTERNAL MODULE: ./src/api/cart/addToCart.js
var addToCart = __webpack_require__(1659);
// EXTERNAL MODULE: ./src/api/cart/cartCount.js
var cartCount = __webpack_require__(5728);
;// CONCATENATED MODULE: ./src/api/cart/removeFromCart.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function removeFromCartApi(id, price, optionIdArrayValue, skuName, variantId, variantName) {
    const data = JSON.stringify({
        productId: id,
        productPrice: price,
        quantity: 0,
        productOptionValueId: optionIdArrayValue,
        type: "new",
        optionValueName: "",
        productVarientOptionId: variantId,
        varientName: variantName,
        skuName: skuName
    });
    const result = await services/* default.create */.Z.create("customer-cart/add-cart", data);
    if (result && result.data && result.data.status === 1) {
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
    }
}

;// CONCATENATED MODULE: ./src/api/cart/index.js





// EXTERNAL MODULE: ./src/api/checkout/backOrderCheckout.js
var backOrderCheckout = __webpack_require__(7064);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
;// CONCATENATED MODULE: ./src/api/checkout/checkoutMain.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 



async function checkOutApi(gstNumber, dispatch, fname, lname, address, num, city, postCode, email, productDetail, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountproprice, couponInput, name, address1, setButtonLoader, coupandata) {
    const data = JSON.stringify({
        shippingLastName: lname != null ? lname : "",
        shippingCity: city,
        shippingPostCode: postCode,
        shippingCompany: fname,
        shippingFirstName: fname,
        shippingZone: zoneName,
        taxNumber: gstNumber,
        phoneNumber: num,
        shippingAddressFormat: "",
        shippingAddress_1: address,
        shippingAddress_2: address1,
        emailId: email,
        shippingCountryId: countryId,
        productDetails: productDetail,
        paymentMethod: method,
        paymentAddress_1: address11,
        paymentAddress_2: address111,
        paymentCity: city1,
        paymentCompany: fname1,
        paymentCountryId: countryId,
        paymentFirstName: fname1,
        paymentLastName: "",
        paymentPostCode: postCode1,
        paymentZone: zoneName1,
        couponCode: couponInput,
        couponData: coupandata,
        couponDiscountAmount: discountproprice
    });
    const result = await services/* default.create */.Z.create("orders/customer-checkout", data);
    if (result && result.data && result.data.status === 1) {
        router_default().push("/checkout-success/[cid]", "/checkout-success/" + result.data.data.orderPrefixId);
        localStorage.setItem("cartItem", JSON.stringify([]));
        dispatch((0,action/* addItem */.jX)(1));
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
        setButtonLoader(false);
    }
    if (result && result.data && result.data.status === 3) {
        window.open(result.data.data, "_self");
        localStorage.setItem("cartItem", JSON.stringify([]));
        dispatch((0,action/* addItem */.jX)(1));
    }
    if (result && result.data && result.data.status === 0) {
        (0,intercept/* modalWarning */.eX)("error", result.data.message);
    }
}

;// CONCATENATED MODULE: ./src/api/checkout/paymentSetting.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function getPaymentApi(setPaymentOption) {
    const result = await services/* default.getAll */.Z.getAll("list/get-payment-setting?keyword=payment");
    if (result && result.data && result.data.data) {
        setPaymentOption(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/checkout/index.js




// EXTERNAL MODULE: ./src/api/compare/productCompare.js
var productCompare = __webpack_require__(2561);
;// CONCATENATED MODULE: ./src/api/compare/index.js


;// CONCATENATED MODULE: ./src/api/contact/contactUs.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


async function contactApi(name, mail, phone, message) {
    const data = JSON.stringify({
        name: name,
        email: mail,
        phoneNumber: phone,
        message: message
    });
    const result = await services/* default.create */.Z.create("list/contact-us", data);
    if (result && result.data && result.data.status === 1) {
        router_default().push("/");
        (0,intercept/* modalSuccess */.jS)("success", result.data.message);
    } else {
        (0,intercept/* modalWarning */.eX)("error", result.data.message);
    }
}

;// CONCATENATED MODULE: ./src/api/contact/index.js


// EXTERNAL MODULE: ./src/api/home/getPage.js
var getPage = __webpack_require__(1966);
// EXTERNAL MODULE: ./src/api/home/getProfile.js
var getProfile = __webpack_require__(3054);
// EXTERNAL MODULE: ./src/store/setting/action.js
var setting_action = __webpack_require__(9086);
;// CONCATENATED MODULE: ./src/api/home/getService.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
 // export async function getServiceApi(dispatch) {
 //         const result = await APIServices.getAll('store-service/category-list?limit=0&offset=0&keyword=&count=0')
 //         if(result && result.data && result.data.data){
 //             if(result.data.data){
 //                         dispatch(serviceDetail(result.data.data))
 //                     } 
 //         }
 // }

;// CONCATENATED MODULE: ./src/api/home/getServiceList.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function getServiceListApi(dispatch, categoryId, setServelistLoader) {
    const result = await services/* default.get */.Z.get("store-service/service-list?limit=0&offset=0&keyword=&categoryId=" + categoryId + "&count=0");
    if (result && result.data && result.data.data) {
        dispatch((0,setting_action/* serviceListInfoDet */.HA)(result.data.data.data));
        setServelistLoader(false);
    }
}

// EXTERNAL MODULE: ./src/store/wishlist/action.js
var wishlist_action = __webpack_require__(9751);
;// CONCATENATED MODULE: ./src/api/home/homeBanner.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function homeBannerApi(dispatch) {
    const result = await services/* default.getAll */.Z.getAll("list/banner-list");
    if (result && result.data && result.data.data) {
        dispatch((0,wishlist_action/* Bannermainloaded */.pA)(result.data.data));
    }
}

;// CONCATENATED MODULE: ./src/api/home/pageDet.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function pageDetApi(id, setDet, setPostLoading) {
    const result = await services/* default.get */.Z.get("pages/get_pagedetails", id);
    if (result && result.data && result.data.data) {
        setDet(result.data.data);
        setPostLoading(false);
    }
}

;// CONCATENATED MODULE: ./src/api/home/serviceEnquiry.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


async function enquiryApi(serviceId, name, mail, phone, message) {
    const data = JSON.stringify({
        serviceId: serviceId,
        name: name,
        email: mail,
        mobile: phone,
        comments: message
    });
    const result = await services/* default.create */.Z.create("store-service/store-enquiry", data);
    if (result.data.status === 1) {
        router_default().push("/services/enquiry-success");
        (0,intercept/* modalSuccess */.jS)("success", json.message);
    } else {
        (0,intercept/* modalWarning */.eX)("error", json.message);
    }
}

;// CONCATENATED MODULE: ./src/api/home/index.js









// EXTERNAL MODULE: ./src/store/product/action.js
var product_action = __webpack_require__(2188);
;// CONCATENATED MODULE: ./src/api/product/categoryListTree.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function categoryListApi(dispatch, setLoad) {
    const result = await services/* default.getAll */.Z.getAll("list/category-list");
    if (result && result.data && result.data.data) {
        dispatch((0,product_action/* getProductCategories */.zm)(result.data.data));
        setLoad(true);
    } else {
        setLoad(true);
    }
}

;// CONCATENATED MODULE: ./src/api/product/getProductDetail.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function getProductDetApi(productSlug, categorySlug, dispatch, setPriceChartInfo, setQuestionInfo, setBreadCategory, setstarcoutid) {
    const result = await services/* default.getAll */.Z.getAll(`product-store/productdetail/${productSlug}?id=${productSlug}&categorySlug=${categorySlug === undefined ? "" : categorySlug}`);
    if (result && result.data && result.data.data) {
        dispatch((0,product_action/* getProductsById */.OA)(result.data.data));
        setBreadCategory(result.data.data.Category);
        dispatch((0,product_action/* getProductByLoading */.bN)(false));
        setstarcoutid(result.data.data.productId);
        setPriceChartInfo(result.data.data.productTirePrices);
    }
}

;// CONCATENATED MODULE: ./src/api/product/productCount.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function productCountApi(dispatch, setCount, price, orderBy, search, categoryInitial, manuId, limit, priceToInitial, priceFromInitial) {
    const result = await services/* default.getAll */.Z.getAll("list/product-count?limit=" + limit + "&offset=0&manufacturerId=" + manuId + "&categoryslug=" + categoryInitial + "&priceFrom=" + priceFromInitial + "&priceTo=" + priceToInitial + "&price=" + orderBy + "&keyword=" + search + "&count=true");
    if (result && result.data && result.data.data) {
        dispatch((0,product_action/* getTotalProducts */.bO)(result.data.data.productCount));
        setCount(result.data.data.productCount);
    }
}

;// CONCATENATED MODULE: ./src/api/product/productList.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function productListApi(dispatch, setProductData, offset, setLoader, orderBy, price, search, categoryInitial, manuId, limit, priceToInitial, setSelectedCategoryId, setCrumbArray, itemSlug, variants) {
    if (itemSlug) {
        const result = await services/* default.getAll */.Z.getAll("list/custom-product-list?limit=18&offset=" + offset + "&priceFrom=" + price + "&priceTo=" + priceToInitial + "&price=" + orderBy + "&keyword=" + search + "&count=&categoryslug=" + categoryInitial + "&manufacturerId=" + manuId + "&attribute=" + itemSlug);
        if (result && result.data) {
            setCrumbArray(result.data.categoryLevel);
            dispatch((0,product_action/* getCategoruCrumb */.f2)(result.data.categoryLevel));
            if (result && result.data && result.data.data) {
                if (result.data.categoryLevel.length > 0) {
                    let lastIndex = result.data.categoryLevel.length - 1;
                    setSelectedCategoryId(lastIndex);
                }
                dispatch((0,product_action/* getProducts */.Xp)(result.data.data));
                setProductData(result.data.data);
                setTimeout(()=>{
                    setLoader(false);
                }, 1000);
            }
        }
    } else if (variants) {
        const result1 = await services/* default.getAll */.Z.getAll("list/custom-product-list?limit=18&offset=" + offset + "&priceFrom=" + price + "&priceTo=" + priceToInitial + "&price=" + orderBy + "&keyword=" + search + "&count=&categoryslug=" + categoryInitial + "&manufacturerId=" + manuId + "&attribute=" + itemSlug + "&variant=" + variants);
        if (result1 && result1.data) {
            setCrumbArray(result1.data.categoryLevel);
            dispatch((0,product_action/* getCategoruCrumb */.f2)(result1.data.categoryLevel));
            if (result1 && result1.data && result1.data.data) {
                if (result1.data.categoryLevel.length > 0) {
                    let lastIndex1 = result1.data.categoryLevel.length - 1;
                    setSelectedCategoryId(lastIndex1);
                }
                dispatch((0,product_action/* getProducts */.Xp)(result1.data.data));
                setProductData(result1.data.data);
                setTimeout(()=>{
                    setLoader(false);
                }, 1000);
            }
        }
    } else {
        const result2 = await services/* default.getAll */.Z.getAll("list/custom-product-list?limit=18&offset=" + offset + "&priceFrom=" + price + "&priceTo=" + priceToInitial + "&price=" + orderBy + "&keyword=" + search + "&count=&categoryslug=" + categoryInitial + "&manufacturerId=" + manuId);
        if (result2 && result2.data) {
            setCrumbArray(result2.data.categoryLevel);
            dispatch((0,product_action/* getCategoruCrumb */.f2)(result2.data.categoryLevel));
            if (result2 && result2.data && result2.data.data) {
                if (result2.data.categoryLevel.length > 0) {
                    let lastIndex2 = result2.data.categoryLevel.length - 1;
                    setSelectedCategoryId(lastIndex2);
                }
                dispatch((0,product_action/* getProducts */.Xp)(result2.data.data));
                setProductData(result2.data.data);
                setTimeout(()=>{
                    setLoader(false);
                }, 1000);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/api/product/index.js





;// CONCATENATED MODULE: ./src/api/vendor-detail/vendorProduct.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function vendorProductApi(vendorId, setVendorProduct, setVendorLoading, categorySlug, displayNameUrl) {
    setVendorLoading(false);
    const result = await APIServices.getAll("vendor-store/vendor-product-list" + "?limit=0&offset=0&count=0&vendorId=" + displayNameUrl + `&categorySlug=${categorySlug === undefined ? "" : categorySlug}&displayNameUrl=${displayNameUrl}`);
    if (result && result.data && result.data.data) {
        setVendorProduct(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/vendor-detail/vendorSlug.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function vendorSlugApi(vendorSlug, setVendorInfo, displayNameUrl) {
    const result = await APIServices.get("vendor-store/vendor-details", displayNameUrl);
    if (result && result.data && result.data.data) {
        setVendorInfo(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/vendor-detail/vendorproducreview.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function vendorproducreviewApi(vendorId, setvendoreviews, offset) {
    const result = await APIServices.getAll("vendor-store/vendor-product-review-list?limit=10&offset=" + offset + "&count=0&vendorId=" + vendorId);
    if (result && result.data && result.data.data) {
        setvendoreviews(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/api/vendor-detail/index.js




// EXTERNAL MODULE: ./src/api/wishlist/addWishlist.js
var addWishlist = __webpack_require__(7291);
// EXTERNAL MODULE: ./src/api/wishlist/deleteProduct.js
var deleteProduct = __webpack_require__(3717);
;// CONCATENATED MODULE: ./src/api/wishlist/wishlist.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function wishListApi(setWishListApi, dispatch, setInitialLoad) {
    const result = await services/* default.getAll */.Z.getAll("customer/wishlist-product-list");
    setInitialLoad(false);
    if (result && result.data && result.data.data) {
        setWishListApi(result.data.data);
        dispatch((0,wishlist_action/* getWishlistList */.bH)(result.data.data));
        setTimeout(()=>{
            dispatch((0,wishlist_action/* wishListLoading */.W1)(false));
        });
    }
}

;// CONCATENATED MODULE: ./src/api/wishlist/index.js




;// CONCATENATED MODULE: ./src/api/index.js












/***/ }),

/***/ 5200:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "eX": () => (/* binding */ modalWarning),
/* harmony export */   "jS": () => (/* binding */ modalSuccess)
/* harmony export */ });
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7708);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


const http = axios__WEBPACK_IMPORTED_MODULE_1___default().create({
    baseURL: "http://3.109.173.92/backend/api/",
    headers: {
        "Content-type": "application/json"
    }
});
const modalSuccess = (type, message)=>{
    (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
        type: type,
        message: message
    });
};
const modalWarning = (type, message)=>{
    (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
        type: type,
        message: message
    });
};
http.interceptors.request.use((config)=>{
    var token = localStorage.getItem("spurtToken");
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});
http.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    switch(error.response.status){
        // case 400:
        //  handleBadRequest(error.response.data.message);
        //   break;
        case 401:
            handleUnauthorized(error.response.statusText);
            break;
        case 403:
            handleForbidden(error.response.statusText);
            break;
        case 404:
            handleNotFound(error.response.statusText);
            break;
        case 422:
            handleUnProcessableEntry(error.response.statusText);
            break;
        case 500:
            handleServerError(error.response.statusText);
            break;
        default:
            break;
    }
    return error.response;
});
function handleBadRequest(error) {
    modalWarning({
        type: "error",
        message: error
    });
}
function handleUnauthorized(error) {
    (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
        type: "error",
        message: "Unauthorized"
    });
    localStorage.clear();
    next_router__WEBPACK_IMPORTED_MODULE_2___default().push("/account/login");
}
function handleForbidden() {
    (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
        type: "error",
        message: "Unauthorized"
    });
    localStorage.clear();
    next_router__WEBPACK_IMPORTED_MODULE_2___default().push("/account/login");
}
function handleNotFound(error) {
// toast({type:"error",message:error})
}
function handleUnProcessableEntry(error) {
    (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
        type: "error",
        message: error
    });
}
function handleServerError(error) {
    (0,_toast__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
        type: "error",
        message: error
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (http);


/***/ }),

/***/ 7708:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports displayIcon, color */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6290);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const displayIcon = (type)=>{
    switch(type){
        case "success":
            return /*#__PURE__*/ _jsx(FaCheck, {});
        case "info":
            return /*#__PURE__*/ _jsx(FaInfo, {});
        case "error":
            return /*#__PURE__*/ _jsx(FaExclamationCircle, {});
        case "warning":
            return /*#__PURE__*/ _jsx(FaExclamationTriangle, {});
        default:
            return /*#__PURE__*/ _jsx(FaBug, {});
    }
};
const color = (type)=>{
    switch(type){
        case "success":
            return "white";
        case "info":
            return "orange";
        case "error":
            return "white";
        case "warning":
            return "yellow";
        default:
            return "red";
    }
};
const ToastMessage = ({ type , message  })=>{
    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.dismiss();
    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast[type](/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            display: "flex",
            color: color(type)
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    flexGrow: 1,
                    fontSize: 15,
                    padding: "8px 12px"
                },
                children: message
            })
        ]
    }));
    ToastMessage.propTypes = {
        message: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
        type: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired)
    };
    ToastMessage.dismiss = react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.dismiss;
    react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.clearWaitingQueue();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToastMessage);


/***/ }),

/***/ 7291:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ AddWishlist)
/* harmony export */ });
/* harmony import */ var _store_wishlist_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9751);
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


async function AddWishlist(productId, dispatch) {
    const data = JSON.stringify({
        productId: productId,
        productOptionValueId: ""
    });
    const result = await _services__WEBPACK_IMPORTED_MODULE_2__/* ["default"].create */ .Z.create("customer/add-product-to-wishlist", data);
    if (result && result.data && result.data.status === 1) {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_1__/* .modalSuccess */ .jS)("success", result.data.message);
        dispatch((0,_store_wishlist_action__WEBPACK_IMPORTED_MODULE_0__/* .addItemToWishlist */ .yK)(1));
    } else {
        (0,_intercept__WEBPACK_IMPORTED_MODULE_1__/* .modalWarning */ .eX)("error", result.data.message);
    }
}


/***/ }),

/***/ 3717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ delWishApi)
/* harmony export */ });
/* harmony import */ var _intercept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5200);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6531);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

async function delWishApi(productId, setDelStatus) {
    const result = await _services__WEBPACK_IMPORTED_MODULE_1__/* ["default"]["delete"] */ .Z["delete"]("customer/wishlist-product-delete", productId);
    if (result) {
        if (result && result.data && result.data.status === 1) {
            (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalSuccess */ .jS)("success", result.data.message);
            setTimeout(()=>{
                setDelStatus(1);
            }, 1000);
        } else {
            (0,_intercept__WEBPACK_IMPORTED_MODULE_0__/* .modalWarning */ .eX)("error", result.data.message);
        }
    }
}


/***/ }),

/***/ 5848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "WG": () => (/* binding */ decreaseItemQty),
/* harmony export */   "cE": () => (/* binding */ headerreloaditem),
/* harmony export */   "cl": () => (/* binding */ removeItem),
/* harmony export */   "jX": () => (/* binding */ addItem),
/* harmony export */   "zb": () => (/* binding */ increaseItemQty)
/* harmony export */ });
/* unused harmony exports getCartSuccess, getCartError, updateCartSuccess, updateCartError, getCart */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    GET_CART: "GET_CART",
    GET_CART_SUCCESS: "GET_CART_SUCCESS",
    GET_CART_ERROR: "GET_CART_ERROR",
    GET_CART_TOTAL_QUANTITY: "GET_CART_TOTAL_QUANTITY",
    GET_CART_TOTAL_QUANTITY_SUCCESS: "GET_CART_TOTAL_QUANTITY_SUCCESS",
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    CLEAR_CART: "CLEAR_CART",
    CLEAR_CART_SUCCESS: "CLEAR_CART_SUCCESS",
    CLEAR_CART_ERROR: "CLEAR_CART_ERROR",
    INCREASE_QTY: "INCREASE_QTY",
    INCREASE_QTY_SUCCESS: "INCREASE_QTY_SUCCESS",
    INCREASE_QTY_ERROR: "INCREASE_QTY_ERROR",
    DECREASE_QTY: "DECREASE_QTY",
    UPDATE_CART: "UPDATE_CART",
    UPDATE_CART_SUCCESS: "UPDATE_CART_SUCCESS",
    UPDATE_CART_ERROR: "UPDATE_CART_ERROR",
    ADD_ITEM_RELOAD: "ADD_ITEM_RELOAD"
};
function getCartSuccess() {
    return {
        type: actionTypes.GET_CART_SUCCESS
    };
}
function getCartError(error) {
    return {
        type: actionTypes.GET_CART_ERROR,
        error
    };
}
function addItem(product) {
    return {
        type: actionTypes.ADD_ITEM,
        payload: product
    };
}
function removeItem(product) {
    return {
        type: actionTypes.REMOVE_ITEM,
        payload: product
    };
}
function increaseItemQty(product) {
    return {
        type: actionTypes.INCREASE_QTY,
        payload: product
    };
}
function decreaseItemQty(product) {
    return {
        type: actionTypes.DECREASE_QTY,
        payload: product
    };
}
function updateCartSuccess(payload) {
    return {
        type: actionTypes.UPDATE_CART_SUCCESS,
        payload
    };
}
function updateCartError(payload) {
    return {
        type: actionTypes.UPDATE_CART_ERROR,
        payload
    };
}
function getCart(payload) {
    return {
        type: actionTypes.GET_CART,
        payload: payload
    };
}
function headerreloaditem(product) {
    return {
        type: actionTypes.ADD_ITEM_RELOAD,
        payload: product
    };
}


/***/ }),

/***/ 6011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "UU": () => (/* binding */ getCompareList),
/* harmony export */   "oO": () => (/* binding */ compareLoading),
/* harmony export */   "tK": () => (/* binding */ getCompareListcompare)
/* harmony export */ });
/* unused harmony exports getCompareListSuccess, addItemToCompare, removeCompareItem, clearCompare, updateCompareListSuccess, comparescompareLoading */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    GET_COMPARE_LIST: "GET_COMPARE_LIST",
    GET_COMPARE_LIST_SUCCESS: "GET_COMPARE_LIST_SUCCESS",
    GET_COMPARE_LIST_ERROR: "GET_COMPARE_LIST_ERROR",
    ADD_ITEM_COMPARE: "ADD_ITEM_COMPARE",
    REMOVE_ITEM_COMPARE: "REMOVE_ITEM_COMPARE",
    UPDATE_COMPARE_LIST: "UPDATE_COMPARE_LIST",
    UPDATE_COMPARE_LIST_SUCCESS: "UPDATE_COMPARE_LIST_SUCCESS",
    UPDATE_COMPARE_LIST_ERROR: "UPDATE_COMPARE_LIST_ERROR",
    COMPARE_LOADING: "COMPARE_LOADING",
    CLEAR_COMPARE_LIST: "CLEAR_COMPARE_LIST",
    GET_COMPARE_LIST_COMPARE: "GET_COMPARE_LIST_COMPARE",
    COMPARE_LOADING_WAITINGS: "COMPARE_LOADING_WAITINGS"
};
function getCompareList(payload) {
    return {
        type: actionTypes.GET_COMPARE_LIST,
        payload: payload
    };
}
function getCompareListcompare(payload) {
    return {
        type: actionTypes.GET_COMPARE_LIST_COMPARE,
        payload: payload
    };
}
function getCompareListSuccess(data) {
    return {
        type: actionTypes.GET_COMPARE_LIST_SUCCESS,
        data
    };
}
function addItemToCompare(product) {
    return {
        type: actionTypes.ADD_ITEM_COMPARE,
        product
    };
}
function removeCompareItem(product) {
    return {
        type: actionTypes.REMOVE_ITEM_COMPARE,
        product
    };
}
function clearCompare() {
    return {
        type: actionTypes.CLEAR_CART
    };
}
function updateCompareListSuccess(payload) {
    return {
        type: actionTypes.UPDATE_COMPARE_LIST_SUCCESS,
        payload
    };
}
function compareLoading(payload) {
    return {
        type: actionTypes.COMPARE_LOADING,
        payload: payload
    };
}
function comparescompareLoading(payload) {
    return {
        type: actionTypes.COMPARE_LOADING_WAITINGS,
        payload: payload
    };
}


/***/ }),

/***/ 2188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$M": () => (/* binding */ gettotaldatas),
/* harmony export */   "Ae": () => (/* binding */ getvarientproducthidefun),
/* harmony export */   "EH": () => (/* binding */ getOptionRevies),
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "K6": () => (/* binding */ getHomeRevies),
/* harmony export */   "OA": () => (/* binding */ getProductsById),
/* harmony export */   "Ry": () => (/* binding */ getsliderimageclicks),
/* harmony export */   "V8": () => (/* binding */ getProductsByCategory),
/* harmony export */   "WL": () => (/* binding */ getmaildatas),
/* harmony export */   "Xp": () => (/* binding */ getProducts),
/* harmony export */   "bN": () => (/* binding */ getProductByLoading),
/* harmony export */   "bO": () => (/* binding */ getTotalProducts),
/* harmony export */   "bY": () => (/* binding */ getQuantymin),
/* harmony export */   "c2": () => (/* binding */ getProductsByPrice),
/* harmony export */   "f2": () => (/* binding */ getCategoruCrumb),
/* harmony export */   "rM": () => (/* binding */ getOrderBy),
/* harmony export */   "zm": () => (/* binding */ getProductCategories)
/* harmony export */ });
/* unused harmony exports getBrands, getBrandsSuccess, getProductCategoriesSuccess, getTotalProductsSuccess, getProductsSuccess, getProductByKeywordsSuccess, getSingleProductsSuccess, getProductsError, getProductsByBrand, getProductsByKeyword, getProductRatingCount, getProductDetailReviws, getTriggges, getvarientProductsnewapis, getvarientdatamethlist, getCoupondata, getDiscountdata, getTotaldata, getcouponsdatas */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    GET_PRODUCTS: "GET_PRODUCTS",
    GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
    GET_PRODUCTS_ERROR: "GET_PRODUCTS_ERROR",
    GET_ORDERBY: "GET_ORDERBY",
    GET_PRODUCTS_BY_CATEGORY: "GET_PRODUCTS_BY_CATEGORY",
    GET_PRODUCTS_BY_PRICE_RANGE: "GET_PRODUCTS_BY_PRICE_RANGE",
    GET_PRODUCTS_BY_BRAND: "GET_PRODUCTS_BY_BRAND",
    GET_PRODUCTS_BY_KEYWORD: "GET_PRODUCTS_BY_KEYWORD",
    GET_PRODUCTS_BY_KEYWORD_SUCCESS: "GET_PRODUCTS_BY_KEYWORD_SUCCESS",
    GET_PRODUCT_BY_ID: "GET_PRODUCT_BY_ID",
    GET_PRODUCT_BY_ID_SUCCESS: "GET_PRODUCT_BY_ID_SUCCESS",
    GET_PRODUCT_LOADING: "GET_PRODUCT_LOADING",
    GET_TOTAL_OF_PRODUCTS: "GET_TOTAL_OF_PRODUCTS",
    GET_TOTAL_OF_PRODUCTS_SUCCESS: "GET_TOTAL_OF_PRODUCTS_SUCCESS",
    GET_BRANDS: "GET_BRANDS",
    GET_BRANDS_SUCCESS: "GET_BRANDS_SUCCESS",
    GET_PRODUCT_CATEGORIES: "GET_PRODUCT_CATEGORIES",
    GET_PRODUCT_CATEGORIES_SUCCESS: "GET_PRODUCT_CATEGORIES_SUCCESS",
    GET_PRODUCT_RATING_COUNT: " GET_PRODUCT_RATING_COUNT",
    GET_PRODUCT_DETAIL_REVIEWS: "GET_PRODUCT_DETAIL_REVIEWS",
    GET_PRODUCT_HOME_REVIEWS: "GET_PRODUCT_HOME_REVIEWS",
    GET_PRODUCT_OPTION_REVIEWS: "GET_PRODUCT_OPTION_REVIEWS",
    GET_PRODUCT_TRIGGERS: "GET_PRODUCT_TRIGGERS",
    GET_PRODUCT_BY_ID_VARIENT_APIS: "GET_PRODUCT_BY_ID_VARIENT_APIS",
    GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN: "GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN",
    GET_PRODUCT_SLIDER_IMAGE_CLICK: "GET_PRODUCT_SLIDER_IMAGE_CLICK",
    GET_SKU_APIS: "GET_SKU_APIS",
    GET_QUT_APIS: "GET_QUT_APIS",
    GET_CATE_CARY_CRUMB: "GET_CATE_CARY_CRUMB",
    GET_COUPON_DATA: "GET_COUPON_DATA",
    GET_DISCOUNT_PRICE: "GET_DISCOUNT_PRICE",
    GET_TOTAL_PAYABLE: "GET_TOTAL_PAYABLE",
    GET_COUPONS_DATAS: "GET_COUPONS_DATAS",
    GET_TOTAL_DATA: "GET_TOTAL_DATA",
    GET_MAIL_ID: "GET_MAIL_ID"
};
function getProducts(payload) {
    return {
        type: actionTypes.GET_PRODUCTS,
        payload: payload
    };
}
function getTotalProducts(payload) {
    return {
        type: actionTypes.GET_TOTAL_OF_PRODUCTS,
        payload: payload
    };
}
function getOrderBy(payload) {
    return {
        type: actionTypes.GET_ORDERBY,
        payload: payload
    };
}
function getBrands(payload) {
    return {
        type: actionTypes.GET_BRANDS,
        payload: payload
    };
}
function getBrandsSuccess(payload) {
    return {
        type: actionTypes.GET_BRANDS_SUCCESS,
        payload
    };
}
function getProductCategories(payload) {
    return {
        type: actionTypes.GET_PRODUCT_CATEGORIES,
        payload: payload
    };
}
function getProductCategoriesSuccess(payload) {
    return {
        type: actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS,
        payload
    };
}
function getTotalProductsSuccess(payload) {
    return {
        type: actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS,
        payload
    };
}
function getProductsSuccess(data) {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        data
    };
}
function getProductByKeywordsSuccess(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS,
        payload
    };
}
function getSingleProductsSuccess(data) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_SUCCESS,
        data
    };
}
function getProductsError(error) {
    return {
        type: actionTypes.GET_PRODUCTS_ERROR,
        error
    };
}
function getProductsByCategory(category) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_CATEGORY,
        category
    };
}
function getProductsByBrand(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_BRAND,
        payload
    };
}
function getProductsByKeyword(keyword) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_KEYWORD,
        keyword
    };
}
function getProductsById(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID,
        payload: payload
    };
}
function getProductsByPrice(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_PRICE_RANGE,
        payload: payload
    };
}
function getProductByLoading(payload) {
    return {
        type: actionTypes.GET_PRODUCT_LOADING,
        payload: payload
    };
}
function getProductRatingCount(payload) {
    return {
        type: actionTypes.GET_PRODUCT_RATING_COUNT,
        payload: payload
    };
}
function getProductDetailReviws(payload) {
    return {
        type: actionTypes.GET_PRODUCT_DETAIL_REVIEWS,
        payload: payload
    };
}
function getHomeRevies(payload) {
    return {
        type: actionTypes.GET_PRODUCT_HOME_REVIEWS,
        payload: payload
    };
}
function getOptionRevies(payload) {
    return {
        type: actionTypes.GET_PRODUCT_OPTION_REVIEWS,
        payload: payload
    };
}
function getTriggges(payload) {
    return {
        type: actionTypes.GET_PRODUCT_TRIGGERS,
        payload: payload
    };
}
function getvarientProductsnewapis(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_VARIENT_APIS,
        payload: payload
    };
}
function getvarientproducthidefun(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN,
        payload: payload
    };
}
function getsliderimageclicks(payload) {
    return {
        type: actionTypes.GET_PRODUCT_SLIDER_IMAGE_CLICK,
        payload: payload
    };
}
function getvarientdatamethlist(payload) {
    return {
        type: actionTypes.GET_SKU_APIS,
        payload: payload
    };
}
function getQuantymin(payload) {
    return {
        type: actionTypes.GET_QUT_APIS,
        payload: payload
    };
}
function getCategoruCrumb(payload) {
    return {
        type: actionTypes.GET_CATE_CARY_CRUMB,
        payload: payload
    };
}
function getCoupondata(payload) {
    return {
        type: actionTypes.GET_COUPON_DATA,
        payload: payload
    };
}
function getDiscountdata(payload) {
    return {
        type: actionTypes.GET_DISCOUNT_PRICE,
        payload: payload
    };
}
function getTotaldata(payload) {
    return {
        type: actionTypes.GET_TOTAL_PAYABLE,
        payload: payload
    };
}
function getcouponsdatas(payload) {
    return {
        type: actionTypes.GET_COUPONS_DATAS,
        payload: payload
    };
}
function gettotaldatas(payload) {
    return {
        type: actionTypes.GET_TOTAL_DATA,
        payload: payload
    };
}
function getmaildatas(payload) {
    return {
        type: actionTypes.GET_MAIL_ID,
        payload: payload
    };
}


/***/ }),

/***/ 9086:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HA": () => (/* binding */ serviceListInfoDet),
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "On": () => (/* binding */ footerAddress),
/* harmony export */   "Q5": () => (/* binding */ maintenanceState),
/* harmony export */   "sy": () => (/* binding */ changeCurrency),
/* harmony export */   "tK": () => (/* binding */ editDetail),
/* harmony export */   "vd": () => (/* binding */ footerPage)
/* harmony export */ });
/* unused harmony exports changeCurrencySuccess, serviceDetail */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    CHANGE_CURRENCY: "CHANGE_CURRENCY",
    CHANGE_CURRENCY_SUCCESS: "CHANGE_CURRENCY_SUCCESS",
    EDIT_ADDRESS_DETAIL: "EDIT_ADDRESS_DETAIL",
    FOOTER_PAGE_LIST: "FOOTER_PAGE_LIST",
    FOOTER_ADDRESS: "FOOTER_ADDRESS",
    SERVICE_LIST: "SERVICE_LIST",
    SERVICE_LIST_INFO: "SERVICE_LIST_INFO",
    MAINTENANCE_DETAIL: "MAINTENANCE_DETAIL"
};
function changeCurrency(currency) {
    return {
        type: actionTypes.CHANGE_CURRENCY,
        payload: currency
    };
}
function changeCurrencySuccess(currency) {
    return {
        type: actionTypes.CHANGE_CURRENCY_SUCCESS,
        currency
    };
}
function editDetail(payload) {
    return {
        type: actionTypes.EDIT_ADDRESS_DETAIL,
        payload: payload
    };
}
function serviceDetail(payload) {
    return {
        type: actionTypes.SERVICE_LIST,
        payload: payload
    };
}
function serviceListInfoDet(payload) {
    return {
        type: actionTypes.SERVICE_LIST_INFO,
        payload: payload
    };
}
function footerPage(payload) {
    return {
        type: actionTypes.FOOTER_PAGE_LIST,
        payload: payload
    };
}
function footerAddress(payload) {
    return {
        type: actionTypes.FOOTER_ADDRESS,
        payload: payload
    };
}
function maintenanceState(payload) {
    return {
        type: actionTypes.MAINTENANCE_DETAIL,
        payload: payload
    };
}


/***/ }),

/***/ 9751:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ LanguageOneTimeLoading),
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "NH": () => (/* binding */ LanguageListLoading),
/* harmony export */   "W1": () => (/* binding */ wishListLoading),
/* harmony export */   "bH": () => (/* binding */ getWishlistList),
/* harmony export */   "pA": () => (/* binding */ Bannermainloaded),
/* harmony export */   "yK": () => (/* binding */ addItemToWishlist)
/* harmony export */ });
/* unused harmony exports getWishlistListSuccess, removeWishlistItem, clearWishlist, updateWishlistListSuccess */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    GET_WISHLIST_LIST: "GET_WISHLIST_LIST",
    GET_WISHLIST_LIST_SUCCESS: "GET_WISHLIST_LIST_SUCCESS",
    GET_WISHLIST_LIST_ERROR: "GET_WISHLIST_LIST_ERROR",
    ADD_ITEM_WISHLISH: "ADD_ITEM_WISHLISH",
    REMOVE_ITEM_WISHLISH: "REMOVE_ITEM_WISHLISH",
    UPDATE_WISHLISH_LIST: "UPDATE_WISHLISH_LIST",
    UPDATE_WISHLISH_LIST_SUCCESS: "UPDATE_WISHLISH_LIST_SUCCESS",
    UPDATE_WISHLISH_LIST_ERROR: "UPDATE_WISHLISH_LIST_ERROR",
    CLEAR_WISHLISH_LIST: "CLEAR_WISHLISH_LIST",
    WISHLIST_LOADING: "WISHLIST_LOADING",
    LANGUAGE_LOADING: "LANGUAGE_LOADING",
    LANGUAGE_LOADING_ONE_TIME: "LANGUAGE_LOADING_ONE_TIME",
    BANNER_MAIND_ONE_TIME: "BANNER_MAIND_ONE_TIME"
};
function getWishlistList(data) {
    return {
        type: actionTypes.GET_WISHLIST_LIST,
        payload: data
    };
}
function getWishlistListSuccess(data) {
    return {
        type: actionTypes.GET_WISHLIST_LIST_SUCCESS,
        data
    };
}
function addItemToWishlist(product) {
    return {
        type: actionTypes.ADD_ITEM_WISHLISH,
        payload: product
    };
}
function removeWishlistItem(product) {
    return {
        type: actionTypes.REMOVE_ITEM_WISHLISH,
        product
    };
}
function clearWishlist() {
    return {
        type: actionTypes.CLEAR_CART
    };
}
function updateWishlistListSuccess(payload) {
    return {
        type: actionTypes.UPDATE_WISHLISH_LIST_SUCCESS,
        payload
    };
}
function wishListLoading(payload) {
    return {
        type: actionTypes.WISHLIST_LOADING,
        payload: payload
    };
}
function LanguageListLoading(payload) {
    return {
        type: actionTypes.LANGUAGE_LOADING,
        payload: payload
    };
}
function LanguageOneTimeLoading(payload) {
    return {
        type: actionTypes.LANGUAGE_LOADING_ONE_TIME,
        payload: payload
    };
}
function Bannermainloaded(payload) {
    return {
        type: actionTypes.BANNER_MAIND_ONE_TIME,
        payload: payload
    };
}


/***/ })

};
;