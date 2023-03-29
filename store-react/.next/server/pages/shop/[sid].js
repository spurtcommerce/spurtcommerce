(() => {
var exports = {};
exports.id = 4549;
exports.ids = [4549];
exports.modules = {

/***/ 6478:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 9697:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _sid_)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/components/elements/products/Product.jsx
var Product = __webpack_require__(3923);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/store/compare/action.js
var action = __webpack_require__(6011);
// EXTERNAL MODULE: ./src/utilities/product-helper.js
var product_helper = __webpack_require__(6152);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./src/components/elements/detail/ProductDetailQuickView.jsx + 2 modules
var ProductDetailQuickView = __webpack_require__(3922);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: ./src/components/elements/products/productWishList.jsx
var productWishList = __webpack_require__(6584);
// EXTERNAL MODULE: ./src/api/toast/index.js
var toast = __webpack_require__(7708);
// EXTERNAL MODULE: ./src/components/helper/priceHelper.js
var priceHelper = __webpack_require__(5654);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/elements/products/ProductWide.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
















function ProductWide({ product , key , image , currency , crumbArray  }) {
    const { 0: isQuickView , 1: setIsQuickView  } = (0,external_react_.useState)(false);
    const { 0: checkWishList , 1: setCheckWishList  } = (0,external_react_.useState)(0);
    const { 0: compareStatus , 1: setCompareStatus  } = (0,external_react_.useState)(0);
    const { 0: loadings , 1: setloadings  } = (0,external_react_.useState)(false);
    const { 0: compareTrues , 1: setTrues  } = (0,external_react_.useState)(true);
    const dispatch = (0,external_react_redux_.useDispatch)();
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    let wishListData = (0,external_react_redux_.useSelector)((s)=>s.wishlist);
    const handleShowQuickView = (e)=>{
        e.preventDefault();
        setIsQuickView(true);
    };
    const handleHideQuickView = (e)=>{
        e.preventDefault();
        setIsQuickView(false);
    };
    const modalWarnings = (type, message)=>{
        (0,toast/* default */.ZP)({
            type: type,
            message: "Cannot add more than 3 product"
        });
    };
    function compareCheckFunction() {
        let idArray = JSON.parse(localStorage.getItem("compareId"));
        if (idArray && idArray.length !== 0) {
            let compareCheck = idArray.some((value)=>value === product.productId);
            return compareCheck;
        }
    }
    const wishListFunction = ()=>{
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value)=>value.productId === product.productId);
            return wishListStatus ? 1 : 0;
        }
    };
    (0,external_react_.useEffect)(()=>{
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value)=>value.productId === product.productId);
            setCheckWishList(wishListStatus ? 1 : 0);
        }
    }, [
        wishListData
    ]);
    (0,external_react_.useEffect)(()=>{
        setCompareStatus(0);
    }, [
        compareStatus
    ]);
    const handleAddItemToCompare = (e, productId)=>{
        dispatch((0,action/* getCompareList */.UU)(0));
        let data = 0;
        let dummy = "";
        if (localStorage.getItem("compareId") !== null) {
            let idArray = JSON.parse(localStorage.getItem("compareId"));
            var index = idArray.indexOf(product.productId);
            if (index !== -1) {
                let localCompareId = JSON.parse(localStorage.getItem("compareId"));
                localCompareId.splice(index, 1);
                localStorage.setItem("compareId", JSON.stringify(localCompareId));
                setCompareStatus(1);
                dispatch((0,action/* getCompareList */.UU)(1));
                modalWarning("success");
            } else {
                idArray.push(productId);
                e.preventDefault();
                if (idArray && idArray.length > 3) {
                    modalWarnings("warning");
                } else {
                    (0,api/* productCompareApi */.rc)(idArray, data, dummy, dispatch, setCompareStatus, setloadings, compareTrues, setTrues);
                }
            }
        } else {
            let idArray1 = [];
            let dummy1 = "";
            idArray1.push(productId);
            e.preventDefault();
            if (idArray1 && idArray1.length > 3) {
                modalWarning("warning");
            } else {
                (0,api/* productCompareApi */.rc)(idArray1, data, dummy1, dispatch, setCompareStatus, setloadings, compareTrues, setTrues);
            }
        }
    };
    const modalWarning = (type)=>{
        (0,toast/* default */.ZP)({
            type: type,
            message: "Successfully removed a product from compare"
        });
    };
    const handleAddItemToCart = (e, id, price, product)=>{
        router_default().push("/product/[pid]", `/product/${product.productSlug}`);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-product ps-product--wide",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ps-product__thumbnail",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/product/[pid]",
                    as: `/product/${product.productSlug}`,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: image,
                            width: 183,
                            height: 205,
                            objectFit: "contain",
                            layout: "responsive",
                            placeholder: "blur",
                            blurDataURL: "/static/img/no-image.png",
                            alt: product?.name
                        })
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ps-product__container",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "ps-product__content",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/product/[pid]",
                                as: `/product/${product.productSlug}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: "ps-product__title",
                                    children: product.name
                                })
                            }),
                            connectPlugins/* ConnectPlugin.SpurtRatingAndReview */.d.SpurtRatingAndReview && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.SpurtRatingAndReview */.d.SpurtRatingAndReview, {
                                product: product
                            }),
                            product.is_sale === true ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                className: "ps-product__price sale",
                                children: [
                                    currency ? currency.symbol : "$",
                                    (0,product_helper/* formatCurrency */.x)(product.price),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("del", {
                                        className: "ml-2",
                                        children: [
                                            currency ? currency.symbol : "$",
                                            (0,product_helper/* formatCurrency */.x)(product.sale_price)
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: product && product.flag === "" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "ps-product__price",
                                    children: [
                                        currency ? currency.symbol : "$ ",
                                        product.pricerefer !== "" ? (0,product_helper/* formatCurrency */.x)((0,priceHelper/* priceHelpFunc */.k)(JSON.parse(product.pricerefer), JSON.parse(product.taxType), product.taxValue, "")) : (0,product_helper/* formatCurrency */.x)((0,priceHelper/* priceHelpFunc */.k)(JSON.parse(product.price), JSON.parse(product.taxType), product.taxValue, ""))
                                    ]
                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "ps-product__price",
                                    children: [
                                        product && product.flag === 1 && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            style: {
                                                color: "grey",
                                                marginRight: "10px"
                                            },
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("del", {
                                                children: [
                                                    currency ? currency.symbol : "$",
                                                    " ",
                                                    product.price
                                                ]
                                            })
                                        }),
                                        currency ? currency.symbol : "$",
                                        product.pricerefer !== "" ? (0,priceHelper/* priceHelpFunc */.k)(product.pricerefer, product.taxType, product.taxValue, "") : (0,priceHelper/* priceHelpFunc */.k)(product.price, product.taxType, product.taxValue, "")
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "product-wide-desc",
                                dangerouslySetInnerHTML: {
                                    __html: product.description.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&sbquo;", "‚").replaceAll("&#61;", "=").replaceAll("&#45;", "-").replaceAll("&hellip;", "…").replaceAll("&commat;", "@").replaceAll("&copy;", "\xa9").replaceAll("&#35;", "#").replaceAll("&ldquo;", "“").replaceAll("&rsquo;", "’").replaceAll("&lsquo;", "‘").replaceAll("&trade;", "™").replaceAll("&reg;", "\xae").replaceAll("&ndash;", "–").replaceAll("&eacute;", "\xe9").replaceAll("&euro;", "€").replaceAll("&pound;", "\xa3")
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "wishlist-card",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(productWishList/* default */.Z, {
                            productId: product.productId,
                            wishListStatus: wishListFunction()
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "product-wide-actions",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                title: "Compare",
                                onClick: (e)=>handleAddItemToCompare(e, product.productId),
                                children: compareCheckFunction() ? /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/static/img/compare-icon.svg",
                                    alt: ""
                                }) : /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/static/img/compare-arrows.svg",
                                    alt: ""
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                title: "Quick View",
                                onClick: handleShowQuickView,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/static/img/eye.svg",
                                    alt: ""
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                className: `add-to-cart-btn ${currentColor}`,
                                title: "Add to cart",
                                onClick: (e)=>handleAddItemToCart(e, product.productId, product.price, product),
                                children: "Add to cart"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Modal, {
                title: product.title,
                centered: true,
                footer: null,
                width: 1024,
                onCancel: handleHideQuickView,
                visible: isQuickView,
                children: /*#__PURE__*/ jsx_runtime_.jsx(ProductDetailQuickView/* default */.Z, {
                    crumbArray: crumbArray,
                    product: product,
                    image: product.image && product.image.containerName !== "/" ? url/* imageUrl */.sQ + "?path=" + product.containerName + "&name=" + product.image + "&width=573&height=673" : "/static/img/no-image.png",
                    handleAddItemToCompare: handleAddItemToCompare,
                    compareCheckFunction: compareCheckFunction,
                    wishListStatus: wishListFunction()
                })
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const products_ProductWide = ((0,external_react_redux_.connect)(mapStateToProps)(ProductWide));

// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__(4722);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./src/store/product/action.js
var product_action = __webpack_require__(2188);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: ./src/components/skeleton/skeletonProduct.js
var skeletonProduct = __webpack_require__(8143);
;// CONCATENATED MODULE: ./src/components/partials/shop/LayoutShop.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
















const { TabPane  } = external_antd_.Tabs;
const { Panel  } = external_antd_.Collapse;
function LayoutShop({ data , count , setOffset , setInitialLoad , loader , setLimit , limit , categoryInitial , defaultCallValueInitial , priceMin , maxPrice , orderBy , setProductData , offset , setLoader , priceToInitial , setCrumbArray , setSelectedCategoryId , priceFromInitial , manuId , crumbArray , currentvaluesof , reloadKey ,  }) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const router = (0,router_.useRouter)();
    let viewcurrentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.viewcurrentColor);
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const { 0: listView , 1: setListView  } = (0,external_react_.useState)(true);
    const { 0: currentPage , 1: setCurrentPage  } = (0,external_react_.useState)();
    const { 0: metrailOpen , 1: setmetrailOpen  } = (0,external_react_.useState)(false);
    const { 0: getAttribute , 1: setgetAttribute  } = (0,external_react_.useState)([]);
    const { 0: checkeds , 1: setchecked  } = (0,external_react_.useState)(false);
    const { 0: attmanuIdArray , 1: setAttManuIdArray  } = (0,external_react_.useState)([]);
    const { 0: attmanuIdArr , 1: setattmanuIdArr  } = (0,external_react_.useState)([]);
    const { 0: triger , 1: setTrigger  } = (0,external_react_.useState)(0);
    const { 0: description , 1: setdescription  } = (0,external_react_.useState)([]);
    const { 0: state3 , 1: setState3  } = (0,external_react_.useState)([]);
    const { 0: state4 , 1: setState4  } = (0,external_react_.useState)("");
    const { 0: triggerss , 1: settriggerss  } = (0,external_react_.useState)("");
    (0,external_react_.useEffect)(()=>{
        setAttManuIdArray([]);
    }, []);
    const pageStyle = {
        backgroundColor: "red"
    };
    const products = data;
    const total = "";
    const viewMode = listView;
    const myRef = (0,external_react_.useRef)(null);
    const executeScroll = ()=>scrollToRef(myRef);
    let pageSizeCustom = Math.ceil(count / 18);
    const { t  } = (0,i18n.useTranslation)("common");
    const handleChangeViewMode = (event)=>{
        event.preventDefault();
        setListView(!listView);
    };
    (0,external_react_.useEffect)(()=>{
        setCurrentPage(offset / limit + 1);
    }, [
        triger,
        offset
    ]);
    const handlePagination = (value)=>{
        setOffset(Math.ceil((value - 1) * 18));
        setInitialLoad(true);
        executeScroll();
        setCurrentPage(value);
        if (categoryInitial !== "") {
            router_default().push({
                pathname: `/shop/[sid]`,
                query: {
                    attribute: "",
                    priceTo: maxPrice,
                    brand: "",
                    priceFrom: priceMin,
                    variantValue: "",
                    defaultCallValue: orderBy,
                    offset: Math.ceil((value - 1) * 18),
                    index: 0,
                    categorySlug: categoryInitial
                }
            }, {
                pathname: `/shop/${categoryInitial}`,
                query: {
                    attribute: "",
                    priceTo: maxPrice,
                    priceFrom: priceMin,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: orderBy,
                    offset: Math.ceil((value - 1) * 18),
                    index: 0,
                    categorySlug: categoryInitial
                }
            });
        } else {
            router_default().push({
                pathname: `/shop/[sid]`,
                query: {
                    attribute: "",
                    priceTo: maxPrice,
                    brand: "",
                    priceFrom: priceMin,
                    variantValue: "",
                    defaultCallValue: orderBy,
                    keyword: reloadKey,
                    offset: Math.ceil((value - 1) * 18),
                    index: 0
                }
            }, {
                pathname: `/shop/${reloadKey}`,
                query: {
                    attribute: "",
                    priceTo: maxPrice,
                    priceFrom: priceMin,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: orderBy,
                    offset: Math.ceil((value - 1) * 18),
                    keyword: reloadKey,
                    index: 0
                }
            });
        }
        window.scroll({
            top: 0
        });
    };
    const scrollToRef = (ref)=>window.scrollTo(0, ref.current.offsetTop);
    const sortFunction = (value)=>{
        setInitialLoad(true);
        dispatch((0,product_action/* getOrderBy */.rM)(value));
        if (categoryInitial !== "") {
            router.push({
                pathname: `/shop/[sid]`,
                query: {
                    sid: categoryInitial,
                    attribute: "",
                    priceTo: maxPrice,
                    brand: "",
                    priceFrom: priceMin,
                    variantValue: "",
                    defaultCallValue: value,
                    offset: offset,
                    index: 0,
                    categorySlug: categoryInitial
                }
            });
        } else {
            router_default().push({
                pathname: `/shop/[sid]`,
                query: {
                    attribute: "",
                    priceTo: maxPrice,
                    brand: "",
                    priceFrom: priceMin,
                    variantValue: "",
                    defaultCallValue: value,
                    keyword: reloadKey,
                    offset: offset,
                    index: 0
                }
            }, {
                pathname: `/shop/${reloadKey}`,
                query: {
                    attribute: "",
                    priceTo: maxPrice,
                    priceFrom: priceMin,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: value,
                    keyword: reloadKey,
                    offset: offset,
                    index: 0
                }
            });
        }
    };
    const changesetchecked = (e, itemSlug)=>{
        setchecked(true);
        const { name , checked  } = e.target;
        setLoader(true);
        const temp = description && description.map((value, index)=>{
            return value && value.map((val, index)=>{
                if (val.itemName === name) {
                    return Object.assign({}, val, {
                        checked
                    });
                }
                return val;
            });
        });
        setdescription(temp);
        let manuSubArrays = attmanuIdArray;
        if (manuSubArrays.indexOf(e.target.value) !== -1) {
            manuSubArrays = manuSubArrays.filter((manufactureId)=>manufactureId != e.target.value);
        } else {
            manuSubArrays.push(e.target.value);
        }
        setAttManuIdArray(manuSubArrays);
        let manuSubArr = attmanuIdArr;
        if (manuSubArr.indexOf(itemSlug) !== -1) {
            manuSubArr = manuSubArr.filter((manufactId)=>manufactId != itemSlug);
        } else {
            manuSubArr.push(itemSlug);
        }
        setattmanuIdArr(manuSubArr);
        (0,api/* productListApi */.ZY)(dispatch, setProductData, offset, setLoader, orderBy, priceFromInitial, "", categoryInitial, manuId, limit, priceToInitial, setSelectedCategoryId, setCrumbArray, manuSubArr);
        if (manuSubArr.length == 0) {
            setTrigger(triger + 1);
        }
    };
    const REmoveFUnc = (attit, index)=>{
        setLoader(true);
        const temp = description && description.map((value, index)=>{
            return value && value.map((val, index)=>{
                if (val.itemSlug === attit) {
                    return Object.assign({}, val, {
                        checked: false
                    });
                }
                return val;
            });
        });
        setdescription(temp);
        attmanuIdArray.splice(index, 1);
        let manuSubArr = attmanuIdArr;
        manuSubArr.splice(index, 1);
        (0,api/* productListApi */.ZY)(dispatch, setProductData, offset, setLoader, orderBy, priceFromInitial, "", categoryInitial, manuId, limit, priceToInitial, setSelectedCategoryId, setCrumbArray, manuSubArr);
        if (manuSubArr.length == 0) {
            setTrigger(triger + 1);
        }
    };
    function itemRender(current, type, originalElement) {
        if (type === "prev") {
            return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "pagination-next-change-prev",
                children: "Prev"
            });
        }
        if (type === "next") {
            return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "pagination-next-change",
                children: "Next"
            });
        }
        return originalElement;
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-shopping",
        ref: myRef,
        style: {
            padding: "0 1rem"
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ps-shopping__header",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex-tab-contain",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "Sort By"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Tabs, {
                                className: ` .ant-tabs-tab-btn:focus, .ant-tabs-tab:hover, .ant-tabs-tab-btn:active, .ant-tabs-ink-bar  ${viewcurrentColor}`,
                                defaultActiveKey: defaultCallValueInitial,
                                onTabClick: sortFunction,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(TabPane, {
                                        tab: ""
                                    }, ""),
                                    /*#__PURE__*/ jsx_runtime_.jsx(TabPane, {
                                        tab: "Price Low To High",
                                        children: " "
                                    }, "ASC"),
                                    /*#__PURE__*/ jsx_runtime_.jsx(TabPane, {
                                        tab: "Price High To Low",
                                        children: " "
                                    }, "DESC")
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "ps-shopping__view",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "ps-tab-list",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        onClick: handleChangeViewMode,
                                        children: viewMode ? /*#__PURE__*/ jsx_runtime_.jsx(icons_.MenuOutlined, {
                                            style: {
                                                fontSize: "20px"
                                            }
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(icons_.MenuOutlined, {
                                            style: {
                                                fontSize: "20px"
                                            },
                                            className: viewcurrentColor
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        href: "#",
                                        onClick: handleChangeViewMode,
                                        children: !viewMode ? /*#__PURE__*/ jsx_runtime_.jsx(icons_.AppstoreOutlined, {
                                            style: {
                                                fontSize: "20px"
                                            }
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(icons_.AppstoreOutlined, {
                                            style: {
                                                fontSize: "20px"
                                            },
                                            className: viewcurrentColor
                                        })
                                    })
                                })
                            ]
                        })
                    })
                ]
            }),
            loader === false ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ps-shopping__content",
                children: products.length !== 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    children: [
                        viewMode === true ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-shopping-product",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "row",
                                children: products && products.length > 0 ? products && products.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 col-xs-12",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Product/* default */.Z, {
                                            crumbArray: crumbArray,
                                            product: item,
                                            image: item.image && item.image.containerName !== "/" ? url/* imageUrl */.sQ + "?path=" + item.containerName + "&name=" + item.image + "&width=200&height=600" : "/static/img/no-image.png"
                                        })
                                    }, item.id)) : ""
                            })
                        }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-shopping-product",
                            children: products && products.length > 0 ? products && products.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(products_ProductWide, {
                                    crumbArray: crumbArray,
                                    product: item,
                                    image: item.image && item.image.containerName !== "/" ? url/* imageUrl */.sQ + "?path=" + item.containerName + "&name=" + item.image + "&width=200&height=600" : "/static/img/no-image.png"
                                }, item.productId)) : ""
                        }),
                        pageSizeCustom > 1 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "shop-product-pagination",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    children: [
                                        "Page ",
                                        currentPage,
                                        " of ",
                                        pageSizeCustom
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Pagination, {
                                    total: count,
                                    pageSize: 18,
                                    current: currentPage,
                                    defaultCurrent: 1,
                                    itemRender: itemRender,
                                    onChange: handlePagination,
                                    className: `${viewcurrentColor}`
                                })
                            ]
                        }),
                        crumbArray && crumbArray[crumbArray.length - 1].categoryDescription != null && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "psproduct-data-de",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Collapse, {
                                    bordered: false,
                                    defaultActiveKey: [
                                        "1"
                                    ],
                                    expandIconPosition: "right",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Panel, {
                                        header: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                            children: [
                                                "More About",
                                                crumbArray[crumbArray.length - 1].categoryName
                                            ]
                                        }),
                                        className: "site-collapse-left-category-opnens",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            dangerouslySetInnerHTML: {
                                                __html: crumbArray[crumbArray.length - 1].categoryDescription.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&sbquo;", "‚").replaceAll("&#61;", "=").replaceAll("&#45;", "-").replaceAll("&hellip;", "…").replaceAll("&commat;", "@").replaceAll("&copy;", "\xa9").replaceAll("&#35;", "#").replaceAll("&ldquo;", "“").replaceAll("&rsquo;", "’").replaceAll("&lsquo;", "‘").replaceAll("&trade;", "™").replaceAll("&reg;", "\xae").replaceAll("&ndash;", "–").replaceAll("&eacute;", "\xe9").replaceAll("&euro;", "€").replaceAll("&pound;", "\xa3")
                                            }
                                        })
                                    }, "")
                                })
                            })
                        })
                    ]
                }) : /*#__PURE__*/ jsx_runtime_.jsx("center", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: "No Results found"
                    })
                })
            }) : [
                1,
                2,
                3
            ].map((loading)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-3 skele",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(skeletonProduct/* default */.Z, {})
                }, loading))
        ]
    });
}
/* harmony default export */ const shop_LayoutShop = ((0,external_react_redux_.connect)((state)=>state.product)(LayoutShop));

;// CONCATENATED MODULE: ./src/components/partials/shop/modules/ShopWidget.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 












const { Panel: ShopWidget_Panel  } = external_antd_.Collapse;
function ShopWidget({ type , categoryMain , setInitialLoad , brands , manuId , setManuId , maxPrice , setMaxPrice , setCategoryInitial , manuIdArray , setManuIdArray , brandFinal , setBrandFinal , categoryInitial , defaultCallValueInitial , orderBy , priceToInitial , priceMin , setPriceMin , openKeys , setOpenKeys , selectedCategoryId , categoryIdFinal , setCategoryIdFinal , setSelectedCategoryId , categoryIdState , setCategoryIdState , currency , setProductData , setLoader , priceFromInitial , setCrumbArray , offset , limit , reloadKey , crumbArray  }) {
    const { 0: priceMax , 1: setPriceMax  } = (0,external_react_.useState)();
    const { 0: getAttribute , 1: setgetAttribute  } = (0,external_react_.useState)([]);
    const { 0: attmanuIdArr , 1: setattmanuIdArr  } = (0,external_react_.useState)([]);
    const { 0: triger , 1: setTrigger  } = (0,external_react_.useState)(0);
    let viewcurrentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.viewcurrentColor);
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { SubMenu  } = external_antd_.Menu;
    const anything = (0,external_react_redux_.useSelector)((s)=>s.product);
    const { t  } = (0,i18n.useTranslation)("common");
    (0,external_react_.useEffect)(()=>{
        if (crumbArray && crumbArray.length !== 0) {
            setSelectedCategoryId(crumbArray[crumbArray.length - 1].categoryId);
        }
    }, [
        crumbArray,
        selectedCategoryId
    ]);
    const handleChangeRange = (value)=>{
        setInitialLoad(true);
        setPriceMax(value[1]);
        setPriceMin(value[0]);
        const params = {
            priceMin: value[0],
            priceMax: value[1]
        };
        dispatch((0,product_action/* getProductsByPrice */.c2)(params));
    };
    const handleFilterProductsByCategory = (e, slug)=>{
        e.preventDefault();
        if (slug !== null) {
            router_default().push({
                pathname: "/shop",
                query: {
                    category: slug
                }
            });
        } else {
            const params = {
                _start: 1,
                _limit: 12
            };
        }
    };
    (0,external_react_.useEffect)(()=>{
        maxPrice !== 0 && setPriceMax(maxPrice);
    }, []);
    const handleCheck = (e, defaultCallValueInitial)=>{
        let manuSubArray = manuIdArray;
        if (manuSubArray.indexOf(e.target.value) !== -1) {
            manuSubArray = manuSubArray.filter((manufactureId)=>manufactureId != e.target.value);
        } else {
            manuSubArray.push(e.target.value);
        }
        let manuIdString = manuSubArray.toString();
        setManuIdArray(manuSubArray);
        router_default().push({
            pathname: `/shop/[sid]`,
            query: {
                attribute: "",
                priceTo: 30000,
                brand: manuIdString,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        }, {
            pathname: `/shop/${categoryInitial}`,
            query: {
                attribute: "",
                priceTo: 30000,
                brand: manuIdString,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        });
        setManuId(manuIdString.toString());
    };
    const handleClick = (e)=>{};
    const handleCategoryPush = (e, categorySlug, categoryId)=>{
        setCategoryInitial(categorySlug);
        setInitialLoad(true);
        router_default().push({
            pathname: `/shop/[sid]`,
            query: {
                attribute: "",
                priceFrom: priceMin,
                priceTo: maxPrice,
                brand: manuId,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categorySlug,
                categoryId: categoryId
            }
        }, {
            pathname: `/shop/${categorySlug}`,
            query: {
                attribute: "",
                priceFrom: priceMin,
                priceTo: maxPrice,
                brand: manuId,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categorySlug,
                categoryId: categoryId
            }
        });
    };
    const priceChange = (value)=>{
        setMaxPrice(value);
        router_default().push({
            pathname: `/shop/[sid]`,
            query: {
                attribute: "",
                priceFrom: priceMin,
                priceTo: value,
                brand: manuId,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                keyword: reloadKey,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        }, {
            pathname: `/shop/${{
                categoryInitial: reloadKey !== undefined && reloadKey != "" ? reloadKey : categoryInitial
            }}`,
            query: {
                attribute: "",
                priceFrom: priceMin,
                priceTo: value,
                brand: manuId,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                keyword: reloadKey,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        });
    };
    const priceChangeMin = (value)=>{
        setPriceMin(value);
        router_default().push({
            pathname: `/shop/[sid]`,
            query: {
                attribute: "",
                priceFrom: value,
                priceTo: maxPrice,
                brand: manuId,
                variantValue: "",
                keyword: reloadKey,
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        }, {
            pathname: `/shop/${{
                categoryInitial: reloadKey !== undefined && reloadKey != "" ? reloadKey : categoryInitial
            }}`,
            query: {
                attribute: "",
                priceFrom: priceMin,
                priceFrom: value,
                priceTo: maxPrice,
                brand: manuId,
                variantValue: "",
                keyword: reloadKey,
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        });
    };
    const priceClear = ()=>{
        setPriceMin(0);
        setMaxPrice(10000);
        router_default().push({
            pathname: `/shop/[sid]`,
            query: {
                attribute: "",
                priceFrom: 0,
                priceTo: 10000,
                brand: manuId,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        }, {
            pathname: `/shop/${categoryInitial}`,
            query: {
                attribute: "",
                priceFrom: 0,
                priceTo: 10000,
                brand: manuId,
                variantValue: "",
                defaultCallValue: orderBy,
                offset: 0,
                index: 0,
                categorySlug: categoryInitial,
                categoryId: categoryIdState
            }
        });
    };
    const onOpenChange = (keys)=>{
        setOpenKeys(keys);
    };
    (0,external_react_.useEffect)(()=>{
        if (selectedCategoryId.length > 0) {
            let lastIndex = selectedCategoryId.length - 1;
            const selectCat = selectedCategoryId[lastIndex].categoryId;
            setCategoryIdFinal([
                JSON.stringify(selectCat)
            ]);
        }
    }, [
        selectedCategoryId
    ]);
    const onSelectVal = (value)=>{
        setSelectedCategoryId(JSON.parse(value.key));
    };
    const changesetchecked = (e, itemSlug)=>{
        setLoader(true);
        let manuSubArr = attmanuIdArr;
        if (manuSubArr.indexOf(itemSlug) !== -1) {
            manuSubArr = manuSubArr.filter((manufactId)=>manufactId != itemSlug);
        } else {
            manuSubArr.push(itemSlug);
        }
        setattmanuIdArr(manuSubArr);
        (0,api/* productListApi */.ZY)(dispatch, setProductData, offset, setLoader, orderBy, priceFromInitial, "", categoryInitial, manuId, limit, priceToInitial, setSelectedCategoryId, setCrumbArray, "", manuSubArr);
        if (manuSubArr.length == 0) {
            setTrigger(triger + 1);
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-layout__left",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: `ps-left-shop-subcontainer`,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                    children: "Filter"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Collapse, {
                    defaultActiveKey: [
                        "1",
                        "2",
                        "3"
                    ],
                    expandIconPosition: "right",
                    className: "",
                    bordered: false,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(ShopWidget_Panel, {
                            header: "CATEGORIES",
                            className: "site-collapse-left-category",
                            children: type === "normal" ? /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu, {
                                onClick: (e)=>handleClick(e),
                                style: {
                                    width: 256
                                },
                                openKeys: openKeys,
                                onOpenChange: onOpenChange,
                                selectedKeys: [
                                    JSON.stringify(selectedCategoryId)
                                ],
                                onSelect: onSelectVal,
                                mode: "inline",
                                children: categoryMain && categoryMain?.map((category)=>/*#__PURE__*/ jsx_runtime_.jsx(SubMenu, {
                                        title: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: category.name
                                            })
                                        }),
                                        children: category?.children && category?.children?.map((cat)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.ItemGroup, {
                                                title: cat.name,
                                                children: cat.children && cat.children.map((subCat)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                                        onClick: (e)=>handleCategoryPush(e, subCat.categorySlug),
                                                        children: subCat.name
                                                    }, "1" + subCat.categoryId))
                                            }, cat.categoryId))
                                    }, JSON.stringify(category.categoryId)))
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu, {
                                onClick: (e)=>handleClick(e),
                                style: {
                                    width: 256
                                },
                                openKeys: openKeys,
                                onOpenChange: onOpenChange,
                                selectedKeys: [
                                    JSON.stringify(selectedCategoryId)
                                ],
                                onSelect: onSelectVal,
                                mode: "inline",
                                children: categoryMain && categoryMain && categoryMain?.children && categoryMain?.children?.map((category)=>/*#__PURE__*/ jsx_runtime_.jsx(SubMenu, {
                                        title: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: viewcurrentColor + "b",
                                                children: category.name
                                            })
                                        }),
                                        children: category?.children && category?.children?.map((subCat)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                                onClick: (e)=>handleCategoryPush(e, subCat.categorySlug, category.categoryId),
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    children: subCat.name
                                                })
                                            }, JSON.stringify(subCat.categoryId)))
                                    }, JSON.stringify(category.categoryId)))
                            })
                        }, "1"),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ShopWidget_Panel, {
                            header: "PRICE",
                            className: "site-collapse-left-category",
                            extra: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                onClick: (e)=>priceClear(e),
                                className: `${viewcurrentColor}`,
                                children: "CLEAR"
                            }),
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Row, {
                                    style: {
                                        justifyContent: "space-between"
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Col, {
                                            span: 10,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Slider, {
                                                min: 0,
                                                max: 10000,
                                                onAfterChange: priceChangeMin,
                                                defaultValue: priceMin,
                                                className: `${viewcurrentColor}`
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Col, {
                                            span: 10,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Slider, {
                                                min: 30000,
                                                max: 95000,
                                                defaultValue: maxPrice,
                                                onAfterChange: priceChange,
                                                className: `${viewcurrentColor}`
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "price-slide-input",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            value: " $ " + priceMin
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            children: "to"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            value: " $ " + maxPrice
                                        })
                                    ]
                                })
                            ]
                        }, "2")
                    ]
                })
            ]
        })
    });
}
const ShopWidget_mapStateToProps = (state)=>{
    return state.product, state.setting;
};
/* harmony default export */ const modules_ShopWidget = ((0,external_react_redux_.connect)(ShopWidget_mapStateToProps)(ShopWidget));

// EXTERNAL MODULE: ./src/store/collection/action.js
var collection_action = __webpack_require__(8969);
// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
// EXTERNAL MODULE: ./src/components/shared/footers/FooterFullwidth.jsx + 3 modules
var FooterFullwidth = __webpack_require__(8761);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
;// CONCATENATED MODULE: ./src/pages/shop/[sid].jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




















function ShopDefaultPage(props, { query  }) {
    const router = (0,router_.useRouter)();
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: productData , 1: setProductData  } = (0,external_react_.useState)([]);
    const { 0: offset , 1: setOffset  } = (0,external_react_.useState)(0);
    const { 0: initialLoad , 1: setInitialLoad  } = (0,external_react_.useState)(true);
    const { 0: count , 1: setCount  } = (0,external_react_.useState)(0);
    const { 0: categoryInitial , 1: setCategoryInitial  } = (0,external_react_.useState)("");
    const { 0: loader , 1: setLoader  } = (0,external_react_.useState)(false);
    const { 0: search , 1: setSearch  } = (0,external_react_.useState)("");
    const { 0: brands , 1: setBrands  } = (0,external_react_.useState)([]);
    const { 0: manuId , 1: setManuId  } = (0,external_react_.useState)("");
    const { 0: limit , 1: setLimit  } = (0,external_react_.useState)(18);
    const { 0: maxPrice , 1: setMaxPrice  } = (0,external_react_.useState)(30000);
    const { 0: specificCat , 1: setSpecificCat  } = (0,external_react_.useState)();
    const { 0: manuIdArray , 1: setManuIdArray  } = (0,external_react_.useState)([]);
    const { 0: brandFinal , 1: setBrandFinal  } = (0,external_react_.useState)();
    const { 0: priceMin , 1: setPriceMin  } = (0,external_react_.useState)(0);
    const { 0: openKeys , 1: setOpenKeys  } = (0,external_react_.useState)([]);
    const { 0: categoryIdState , 1: setCategoryIdState  } = (0,external_react_.useState)("");
    const { 0: selectedCategoryId , 1: setSelectedCategoryId  } = (0,external_react_.useState)("");
    const { 0: categoryIdFinal , 1: setCategoryIdFinal  } = (0,external_react_.useState)("");
    const { 0: crumbArray , 1: setCrumbArray  } = (0,external_react_.useState)([]);
    const { 0: variant , 1: setvariant  } = (0,external_react_.useState)("");
    const { 0: load , 1: setLoad  } = (0,external_react_.useState)(false);
    let orderBy = props.product.orderBy;
    let price = props.product.price;
    let reloadKey = router.query.keyword;
    let keywords = router.query.sid;
    let categorySlug = router.query.categorySlug;
    let brandInitial = router.query.brand;
    let currentvaluesof = router.query.currentpagevalues;
    let attributeInitial = router.query.attribute;
    let priceToInitial = router.query.priceTo;
    let priceFromInitial = router.query.priceFrom;
    let defaultCallValueInitial = router.query.defaultCallValue;
    let offsetInitial = router.query.offset;
    let limitInitial = router.query.limit;
    let categoryIdInitial = router.query.categoryId;
    let catIt = router.query.catIt;
    let logInfo = (0,external_react_redux_.useSelector)((s)=>s.auth);
    const network = (0,NetworkCheck/* default */.Z)();
    (0,external_react_.useEffect)(()=>{
        if (network === false) {
            router_default().push("/network-error");
        }
    }, [
        orderBy
    ]);
    const productListApiCall = ()=>{
        if (categorySlug !== undefined && categorySlug !== "") {
            setLoader(true);
            (0,api/* productListApi */.ZY)(dispatch, setProductData, offsetInitial, setLoader, defaultCallValueInitial, priceFromInitial ? priceFromInitial : 0, search, categorySlug, manuId, limit, priceToInitial, setSelectedCategoryId, setCrumbArray);
            (0,api/* productCountApi */.iT)(dispatch, setCount, props.product.price, defaultCallValueInitial, search, categorySlug, manuId, limit, priceToInitial, priceFromInitial);
        } else {
            setLoader(true);
            (0,api/* productListApi */.ZY)(dispatch, setProductData, offsetInitial, setLoader, defaultCallValueInitial, priceFromInitial ? priceFromInitial : 0, reloadKey, "", "", limit, priceToInitial, setSelectedCategoryId, setCrumbArray);
            (0,api/* productCountApi */.iT)(dispatch, setCount, props.product.price, defaultCallValueInitial, reloadKey, "", "", limit, priceToInitial ? priceToInitial : 30000, priceFromInitial ? priceFromInitial : 0);
        }
    };
    (0,external_react_.useEffect)(()=>{
        (0,api/* categoryListApi */.BK)(dispatch, setLoad);
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (selectedCategoryId.length > 0) {
            let lastIndex = selectedCategoryId.length - 1;
            const selectCat = selectedCategoryId[lastIndex].categoryId;
            setCategoryIdFinal(selectCat);
        }
    }, [
        selectedCategoryId
    ]);
    (0,external_react_.useEffect)(()=>{
        if (categorySlug !== undefined && categorySlug !== "") {
            setInitialLoad(true);
            setCategoryInitial(categorySlug);
            setMaxPrice(priceToInitial);
            setCategoryIdState(categoryIdInitial);
            setOpenKeys([
                categoryIdInitial
            ]);
            setOffset(offsetInitial);
            priceFromInitial ? setPriceMin(priceFromInitial) : setPriceMin(0);
            (0,api/* specificCategoryApi */.Jf)(categorySlug, setSpecificCat, setSelectedCategoryId);
            dispatch((0,product_action/* getOrderBy */.rM)(defaultCallValueInitial));
            productListApiCall();
        } else if (reloadKey !== undefined && reloadKey !== "") {
            setInitialLoad(true);
            setCategoryInitial("");
            setMaxPrice(priceToInitial);
            setCategoryIdState(categoryIdInitial);
            setOpenKeys([
                categoryIdInitial
            ]);
            setOffset(offsetInitial);
            priceFromInitial ? setPriceMin(priceFromInitial) : setPriceMin(0);
            dispatch((0,product_action/* getOrderBy */.rM)(defaultCallValueInitial));
            productListApiCall();
        }
    }, [
        categorySlug,
        defaultCallValueInitial,
        manuId.length,
        priceMin,
        maxPrice,
        priceToInitial,
        priceFromInitial,
        offset,
        offsetInitial,
        reloadKey, 
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!router.isReady) return;
    }, [
        router.isReady
    ]);
    (0,external_react_.useEffect)(()=>{
        if (query) {
            if (query.category) {
                dispatch((0,product_action/* getProductsByCategory */.V8)(query.category));
            } else {
                const params = {
                    _start: 1,
                    _limit: 12
                };
                dispatch((0,product_action/* getProducts */.Xp)(params));
            }
            const collectionsParams = [
                "shop_best_sale_items",
                "shop-recommend-items", 
            ];
        }
    }, []);
    const breadCrumb = [
        {
            text: crumbArray && crumbArray.length !== 0 && crumbArray,
            href: {
                pathname: `/shop/[sid]`,
                query: {
                    attribute: "",
                    priceTo: 30000,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: "ASC",
                    offset: 0,
                    index: 0,
                    categorySlug: crumbArray && crumbArray.length !== 0 && crumbArray[0].categorySlug,
                    categoryId: crumbArray && crumbArray.length !== 0 && crumbArray[0].categoryId
                }
            },
            as: {
                pathname: `/shop/${crumbArray && crumbArray.length !== 0 && crumbArray[0].categorySlug}`,
                query: {
                    attribute: "",
                    priceTo: 30000,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: "ASC",
                    offset: 0,
                    index: 0,
                    categorySlug: crumbArray && crumbArray.length !== 0 && crumbArray[0].categorySlug,
                    categoryId: crumbArray && crumbArray.length !== 0 && crumbArray[0].categoryId
                }
            }
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "site-content",
            children: [
                connectPlugins/* ConnectPlugin.SpurtCategorySeo */.d.SpurtCategorySeo && /*#__PURE__*/ jsx_runtime_.jsx(connectPlugins/* ConnectPlugin.SpurtCategorySeo */.d.SpurtCategorySeo, {
                    categorySlug: categorySlug
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    style: {
                        backgroundColor: "#f1f3f6",
                        padding: "16px"
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            style: {
                                backgroundColor: "#fff",
                                paddingLeft: "10px",
                                marginBottom: "16px"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "ps-breadcrumb",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "fullwidth",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                className: "breadcrumb",
                                                children: categorySlug && categorySlug !== "" ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                    children: crumbArray && crumbArray.length !== 0 && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: crumbArray && crumbArray.map((val, index)=>/*#__PURE__*/ jsx_runtime_.jsx((external_react_default()).Fragment, {
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                                    className: "dis-point",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                                        href: {
                                                                            pathname: `/shop/[sid]`,
                                                                            query: {
                                                                                attribute: "",
                                                                                priceTo: 30000,
                                                                                priceFrom: 0,
                                                                                brand: "",
                                                                                variantValue: "",
                                                                                defaultCallValue: "",
                                                                                offset: 0,
                                                                                index: 0,
                                                                                keyword: "",
                                                                                categorySlug: val.categorySlug
                                                                            }
                                                                        },
                                                                        as: {
                                                                            pathname: `/shop/${val.categorySlug}`,
                                                                            query: {
                                                                                attribute: "",
                                                                                priceTo: 30000,
                                                                                priceFrom: 0,
                                                                                brand: "",
                                                                                variantValue: "",
                                                                                defaultCallValue: "",
                                                                                offset: 0,
                                                                                index: 0,
                                                                                keyword: "",
                                                                                categorySlug: val.categorySlug
                                                                            }
                                                                        },
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                            children: val.categoryName
                                                                        })
                                                                    })
                                                                }, index)
                                                            }))
                                                    })
                                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        className: "dis-point",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            children: "Searched Products"
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "ps-layout--shop",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(modules_ShopWidget, {
                                    type: categorySlug !== "" ? "specific " : "normal",
                                    categoryMain: categorySlug !== "" ? specificCat : props.product.categories,
                                    setInitialLoad: setInitialLoad,
                                    brands: brands,
                                    manuId: manuId,
                                    setManuId: setManuId,
                                    maxPrice: maxPrice,
                                    setMaxPrice: setMaxPrice,
                                    setCategoryInitial: setCategoryInitial,
                                    manuIdArray: manuIdArray,
                                    setManuIdArray: setManuIdArray,
                                    brandFinal: brandFinal,
                                    setBrandFinal: setBrandFinal,
                                    categoryInitial: categoryInitial,
                                    defaultCallValueInitial: defaultCallValueInitial,
                                    orderBy: orderBy,
                                    priceToInitial: priceToInitial,
                                    priceMin: priceMin,
                                    setPriceMin: setPriceMin,
                                    openKeys: openKeys,
                                    setOpenKeys: setOpenKeys,
                                    selectedCategoryId: selectedCategoryId,
                                    categoryIdFinal: categoryIdFinal,
                                    setCategoryIdFinal: setCategoryIdFinal,
                                    setSelectedCategoryId: setSelectedCategoryId,
                                    categoryIdState: categoryIdState,
                                    setCategoryIdState: setCategoryIdState,
                                    setProductData: setProductData,
                                    setLoader: setLoader,
                                    priceFromInitial: priceFromInitial,
                                    setCrumbArray: setCrumbArray,
                                    offset: offset,
                                    limit: limit,
                                    reloadKey: reloadKey,
                                    categoryIdInitial: categoryIdInitial,
                                    catIt: catIt,
                                    crumbArray: crumbArray
                                }),
                                load == true ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "ps-layout__right",
                                        children: initialLoad ? /*#__PURE__*/ jsx_runtime_.jsx(shop_LayoutShop, {
                                            data: productData,
                                            count: count,
                                            setOffset: setOffset,
                                            setInitialLoad: setInitialLoad,
                                            loader: loader,
                                            setLimit: setLimit,
                                            limit: limit,
                                            categoryInitial: categoryInitial,
                                            defaultCallValueInitial: defaultCallValueInitial,
                                            priceMin: priceMin,
                                            maxPrice: maxPrice,
                                            orderBy: orderBy,
                                            setProductData: setProductData,
                                            offset: offset,
                                            setLoader: setLoader,
                                            priceToInitial: priceToInitial,
                                            setSelectedCategoryId: setSelectedCategoryId,
                                            setCrumbArray: setCrumbArray,
                                            crumbArray: crumbArray,
                                            priceFromInitial: priceFromInitial,
                                            manuId: manuId,
                                            currentvaluesof: currentvaluesof,
                                            reloadKey: reloadKey
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(shop_LayoutShop, {
                                            data: [],
                                            count: count,
                                            setOffset: setOffset,
                                            setInitialLoad: setInitialLoad,
                                            loader: loader,
                                            setLimit: setLimit,
                                            limit: limit,
                                            categoryInitial: categoryInitial,
                                            defaultCallValueInitial: defaultCallValueInitial,
                                            priceMin: priceMin,
                                            maxPrice: maxPrice,
                                            orderBy: orderBy,
                                            setProductData: setProductData,
                                            offset: offset,
                                            setLoader: setLoader,
                                            priceToInitial: priceToInitial,
                                            setSelectedCategoryId: setSelectedCategoryId,
                                            setCrumbArray: setCrumbArray,
                                            crumbArray: crumbArray,
                                            priceFromInitial: priceFromInitial,
                                            manuId: manuId,
                                            currentvaluesof: currentvaluesof,
                                            reloadKey: reloadKey
                                        })
                                    })
                                }) : [
                                    1,
                                    2,
                                    3
                                ].map((loading)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-3 skele",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(skeletonProduct/* default */.Z, {})
                                    }, loading))
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const _sid_ = ((0,external_react_redux_.connect)((state)=>state)(ShopDefaultPage));


/***/ }),

/***/ 4722:
/***/ (() => {



/***/ }),

/***/ 7066:
/***/ ((module) => {

"use strict";
module.exports = require("@ant-design/icons");

/***/ }),

/***/ 2433:
/***/ ((module) => {

"use strict";
module.exports = require("@react-google-maps/api");

/***/ }),

/***/ 5725:
/***/ ((module) => {

"use strict";
module.exports = require("antd");

/***/ }),

/***/ 2167:
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ 1377:
/***/ ((module) => {

"use strict";
module.exports = require("next-i18next");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 580:
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 5154:
/***/ ((module) => {

"use strict";
module.exports = require("react-geocode");

/***/ }),

/***/ 9709:
/***/ ((module) => {

"use strict";
module.exports = require("react-i18next");

/***/ }),

/***/ 6290:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fa");

/***/ }),

/***/ 9931:
/***/ ((module) => {

"use strict";
module.exports = require("react-modal");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 8096:
/***/ ((module) => {

"use strict";
module.exports = require("react-slick");

/***/ }),

/***/ 1187:
/***/ ((module) => {

"use strict";
module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6695:
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,8969], () => (__webpack_exec__(9697)));
module.exports = __webpack_exports__;

})();