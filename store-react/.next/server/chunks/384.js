exports.id = 384;
exports.ids = [384];
exports.modules = {

/***/ 5548:
/***/ ((module) => {

// Exports
module.exports = {
	"ps-product-list": "widgets_ps-product-list__c7S6F",
	"ps-section__links": "widgets_ps-section__links__k6VLp",
	"active": "widgets_active__aYi9Z",
	"ps-section__header": "widgets_ps-section__header__9jck5",
	"slick-slide": "widgets_slick-slide__ir1_N",
	"ps-product-list--2": "widgets_ps-product-list--2__HA7Ex",
	"homepage-1": "widgets_homepage-1__eF_mK",
	"ps-carousel": "widgets_ps-carousel__8yzkB",
	"slick-list": "widgets_slick-list__HSuzJ",
	"ps-container": "widgets_ps-container__v34hS",
	"pscontentarrow": "widgets_pscontentarrow__a_XPD",
	"outside": "widgets_outside__lsgUo",
	"slick-arrow": "widgets_slick-arrow__LanVV",
	"slick-prev": "widgets_slick-prev__lHpu5",
	"viewall-card": "widgets_viewall-card__joIbc",
	"ps-product": "widgets_ps-product__Kx8Ig",
	"slick-next": "widgets_slick-next__0rQ_j",
	"slick-disabled": "widgets_slick-disabled__y1rYB",
	"slick-dots": "widgets_slick-dots__pLWc_",
	"slick-active": "widgets_slick-active__IL9iO",
	"blur": "widgets_blur__iP62a",
	"today-slider": "widgets_today-slider__V442r",
	"ps-product__variants": "widgets_ps-product__variants__6QV97",
	"item": "widgets_item__ax3Nx",
	"ps-video": "widgets_ps-video__nnjrG",
	"slick-current": "widgets_slick-current__AiGy9",
	"product-flow-refurbished": "widgets_product-flow-refurbished__hXdVC"
};


/***/ }),

/***/ 3192:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
const NextI18Next = (__webpack_require__(1377)["default"]);
const path = __webpack_require__(1017);
module.exports = new NextI18Next({
    otherLanguages: [
        "de",
        "fr"
    ],
    localePath: path.resolve("./public/static/locales")
});


/***/ }),

/***/ 4562:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JW": () => (/* binding */ apiUrl),
/* harmony export */   "sQ": () => (/* binding */ imageUrl),
/* harmony export */   "xy": () => (/* binding */ videoUrl)
/* harmony export */ });
/* unused harmony exports env, port */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const apiUrl = "http://3.109.173.92/backend/api/";
const imageUrl = "http://3.109.173.92/backend/api/media/image-resize/";
const env = "development";
const port = "3000";
const videoUrl = "http://3.109.173.92/backend/api//media/video-preview-s3/";


/***/ }),

/***/ 384:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "d": () => (/* binding */ ConnectPlugin)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
;// CONCATENATED MODULE: ./src/components/elements/menu/MegaMenu.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const Menu = ({ item , viewcurrentColor  })=>{
    const { 0: defaluremove , 1: setdefaluremove  } = (0,external_react_.useState)(true);
    const handlewidget = (e, data)=>{
        router_default().push({
            pathname: "/widgetDetails/[widget]"
        }, {
            pathname: `/widgetDetails/${data.widgetSlugName}`
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("li", {
            className: `menu-item-has-children  ${viewcurrentColor}`,
            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                onClick: (e)=>handlewidget(e, item),
                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: item.widgetTitle
                })
            })
        })
    });
};
/* harmony default export */ const MegaMenu = (Menu);

// EXTERNAL MODULE: ./services.js
var services = __webpack_require__(6531);
;// CONCATENATED MODULE: ./src/api/product/widgetmenulist.js

async function widgetmenulist(setMenulist) {
    const result = await services/* default.getAll */.Z.getAll("list/widget-menu-name");
    if (result && result.data && result.data.data) {
        setMenulist(result.data.data);
    }
}

;// CONCATENATED MODULE: ./src/components/elements/menu/Menu.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








const Menu_Menu = ({ data , className , service  })=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    let viewcurrentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.viewcurrentColor);
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    const { 0: addonsShow , 1: setAddonsShow  } = (0,external_react_.useState)("");
    const { 0: menulist , 1: setMenulist  } = (0,external_react_.useState)();
    (0,external_react_.useEffect)(()=>{
        widgetmenulist(setMenulist);
    }, []);
    (0,external_react_.useEffect)(()=>{
        setAddonsShow(JSON.parse(sessionStorage && sessionStorage.getItem("addonsShow")));
    }, [
        reloadedheader
    ]);
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
        className: className,
        children: [
            menulist && menulist.map((item)=>{
                return /*#__PURE__*/ jsx_runtime_.jsx(MegaMenu, {
                    item: item,
                    viewcurrentColor: viewcurrentColor
                });
            }),
            addonsShow && addonsShow?.blog == 1 && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: ConnectPlugin.SpurtBlogGridplugin !== undefined && /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/blog",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "BLOGS"
                        })
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/contact",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        children: "CONTACT"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const menu_Menu = (Menu_Menu);

// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
;// CONCATENATED MODULE: ./src/components/shared/navigation/NavigationDefault.jsx
/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
 * Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
 * Licensed under the MIT license.
 */ 







function NavigationDefault(props) {
    let category = (0,external_react_redux_.useSelector)((s)=>s.product);
    const { t  } = (0,i18n.useTranslation)("common");
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const { 0: categoryState , 1: setCategoryState  } = (0,external_react_.useState)([]);
    const { 0: buttoncatgy , 1: setButtoncatgy  } = (0,external_react_.useState)(false);
    const catheight = (0,external_react_.useRef)();
    const { 0: catgyrmv , 1: setCatgymv  } = (0,external_react_.useState)(false);
    const { 0: arrList , 1: setArraList  } = (0,external_react_.useState)({});
    const { 0: cateTrues , 1: setCateTrues  } = (0,external_react_.useState)(false);
    const { 0: nextArrys , 1: setArrys  } = (0,external_react_.useState)({});
    const { 0: cateTruesSecond , 1: setCateTruesSecond  } = (0,external_react_.useState)(false);
    const { 0: totalShows , 1: setTotalShows  } = (0,external_react_.useState)(false);
    const { 0: mouseleave , 1: setMouseleave  } = (0,external_react_.useState)(false);
    const handlesubmenu = (e, data)=>{
        setTotalShows(false);
        setMouseleave(true);
        router_default().push({
            pathname: "/shop/[sid]",
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
                categorySlug: data.categorySlug
            }
        }, {
            pathname: `/shop/${data.categoryId}`,
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
                categorySlug: data.categorySlug
            }
        });
    };
    const handlesubmenutwo = (e, sdata)=>{
        setTotalShows(false);
        setMouseleave(true);
        router_default().push({
            pathname: "/shop/[sid]",
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
                categorySlug: sdata.categorySlug
            }
        }, {
            pathname: `/shop/${sdata.categoryId}`,
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
                categorySlug: sdata.categorySlug
            }
        });
    };
    const handlemenuitem = (e, ssdata)=>{
        setTotalShows(false);
        setMouseleave(true);
        router_default().push({
            pathname: "/shop/[sid]",
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
                categorySlug: ssdata.categorySlug,
                categoryId: ssdata.categoryId
            }
        }, {
            pathname: `/shop/${ssdata.categoryId}`,
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
                categorySlug: ssdata.categorySlug,
                categoryId: ssdata.categoryId
            }
        });
    };
    (0,external_react_.useEffect)(()=>{
        categoriesMap();
    }, []);
    const categoriesMap = ()=>{
        let menuCategoryData = [];
        category.categories.forEach((categoryData)=>{
            var categoryObj = new Object();
            categoryObj.title = categoryData.name;
            categoryObj.link = "";
            menuCategoryData.push(categoryObj);
        });
        setCategoryState(menuCategoryData);
    };
    const dataMap = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Blog",
            link: "/blog"
        },
        {
            title: "Contact",
            link: "/page/contact-us"
        },
        {
            title: "Services",
            serviceArray: props.servicelist
        }, 
    ];
    const handleHOves = (datass)=>{
        setLastTrue(true);
        setLastestUpade(datass);
    };
    const handleHOvesStart = (datass)=>{
        setLastTrue(false);
    };
    const handleMouseHove = (data)=>{
        setCateTrues(true);
        setArraList(data);
        setCateTruesSecond(false);
    };
    const handleMouseHovetwo = (data)=>{
        setCateTruesSecond(true);
        setArrys(data);
    };
    const handleMousecatgy = ()=>{
        setCateTruesSecond(false);
        setTotalShows(true);
        setMouseleave(false);
    };
    const handlemodalcls = ()=>{
        setModalclosecat(false);
    };
    const handlemouseleave = ()=>{
        setMouseleave(true);
        setCateTrues(false);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("nav", {
        className: `navigation`,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ps-container",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: mouseleave == false ? "all-cat-new" : "all-cat-newopac",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: "all-catogories-menu",
                                onMouseOver: handleMousecatgy,
                                children: [
                                    " All CATEGORIES  ",
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: "static/img/caret-right-fill.svg",
                                        alt: ""
                                    })
                                ]
                            }),
                            totalShows === false ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "acm-main",
                                    onMouseLeave: handlemouseleave,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "acm-first",
                                            children: category && category?.categories && category?.categories?.map((data, index)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        onMouseOver: ()=>handleMouseHove(data),
                                                        onClick: (e)=>handlesubmenu(e, data),
                                                        children: data?.name
                                                    })
                                                }))
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "acm-sec",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "acm-sec-tit",
                                                    children: cateTrues == false ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: category?.categories?.[0]?.name
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: arrList?.name
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "acm-sec-row",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "acm-sec-sm1",
                                                            children: cateTrues == false ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                children: category?.categories?.[0]?.children?.map((sdata, sindex)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                        children: [
                                                                            " ",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                                onMouseOver: ()=>handleMouseHovetwo(sdata),
                                                                                onClick: (e)=>{
                                                                                    handlesubmenutwo(e, sdata);
                                                                                },
                                                                                children: sdata?.name
                                                                            })
                                                                        ]
                                                                    }))
                                                            }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                children: arrList?.children?.map((sdata, sindex)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                            onMouseOver: ()=>handleMouseHovetwo(sdata),
                                                                            onClick: (e)=>{
                                                                                handlesubmenutwo(e, sdata);
                                                                            },
                                                                            children: sdata?.name
                                                                        })
                                                                    }))
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "acm-sec-sm1",
                                                            children: [
                                                                cateTruesSecond == false ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                    children: [
                                                                        " ",
                                                                        cateTrues == false ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                            children: [
                                                                                " ",
                                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h5", {
                                                                                    children: [
                                                                                        " ",
                                                                                        category?.categories?.[0]?.children?.[0]?.name
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                            children: [
                                                                                " ",
                                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h5", {
                                                                                    children: [
                                                                                        " ",
                                                                                        arrList?.children?.[0]?.name
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                                                        children: nextArrys?.name
                                                                    })
                                                                }),
                                                                cateTruesSecond == false ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                    children: cateTrues == false ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                        children: [
                                                                            " ",
                                                                            category?.categories?.[0]?.children?.[0]?.children?.map((ssdata, ssindex)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                                    children: [
                                                                                        " ",
                                                                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                                            onClick: (e)=>{
                                                                                                handlemenuitem(e, ssdata);
                                                                                            },
                                                                                            children: ssdata?.name
                                                                                        })
                                                                                    ]
                                                                                }))
                                                                        ]
                                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                                        children: arrList?.children?.[0]?.children?.map((ssdata, ssindex)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                                children: [
                                                                                    " ",
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                                        onClick: (e)=>{
                                                                                            handlemenuitem(e, ssdata);
                                                                                        },
                                                                                        children: ssdata?.name
                                                                                    })
                                                                                ]
                                                                            }))
                                                                    })
                                                                }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                    children: [
                                                                        " ",
                                                                        nextArrys?.children?.map((ssdata, ssindex)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                                                children: [
                                                                                    " ",
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                                        onClick: (e)=>{
                                                                                            handlemenuitem(e, ssdata);
                                                                                        },
                                                                                        children: ssdata?.name
                                                                                    })
                                                                                ]
                                                                            }))
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "navigation__right",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(menu_Menu, {
                            data: category.categories,
                            className: "menu",
                            service: dataMap
                        })
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const navigation_NavigationDefault = ((0,external_react_redux_.connect)((s)=>s.setting)(NavigationDefault));

// EXTERNAL MODULE: ./src/components/shared/headers/modules/CartPopUp.jsx
var CartPopUp = __webpack_require__(9255);
// EXTERNAL MODULE: ./src/store/colorPalette/action.js
var action = __webpack_require__(969);
;// CONCATENATED MODULE: ./src/components/shared/headers/modules/MiniCart.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








function MiniCart({ currency  }) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const any = (0,external_react_redux_.useSelector)((s)=>s.cart);
    const { 0: data , 1: setData  } = (0,external_react_.useState)([]);
    const { 0: totalData , 1: setTotalData  } = (0,external_react_.useState)([]);
    const { 0: optionIdValArray , 1: setOptionIdValArray  } = (0,external_react_.useState)([]);
    let reloadCart = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    let cartArray = data && data;
    const { 0: changeData , 1: setChangeData  } = (0,external_react_.useState)();
    const { 0: showMiniCart , 1: setShowMiniCart  } = (0,external_react_.useState)(false);
    const { 0: newCartCount , 1: setNewCartCount  } = (0,external_react_.useState)(0);
    const { 0: accepted , 1: setAccepted  } = (0,external_react_.useState)(1);
    let removeFromCart = (0,external_react_redux_.useSelector)((s)=>s.cart.removeproduct);
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    const { t  } = (0,i18n.useTranslation)("common");
    (0,external_react_.useEffect)(()=>{
        setData(JSON.parse(localStorage.getItem("cartItem")));
        quantityTotal();
    }, [
        reloadCart,
        removeFromCart
    ]);
    (0,external_react_.useEffect)(()=>{
        if (showMiniCart) {
            document.body.classList.add("scroll-block-home");
        } else {
            document.body.classList.remove("scroll-block-home");
        }
    }, [
        showMiniCart
    ]);
    const quantityTotal = ()=>{
        let locale = JSON.parse(localStorage.getItem("cartItem"));
        let tempValue = 0;
        let currentValue = 0;
        locale && locale.map((current)=>{
            currentValue = tempValue + current.quantity;
            tempValue = currentValue;
        });
        setNewCartCount(tempValue);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-cart--mini",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(CartPopUp/* default */.Z, {
                showMiniCart: showMiniCart,
                setShowMiniCart: setShowMiniCart,
                cartData: data
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                className: "header__extra",
                href: "#",
                onClick: (e)=>{
                    setShowMiniCart(!showMiniCart, dispatch((0,action/* displayWhenclose */.HL)("none")));
                    e.preventDefault();
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/shopping-cart.svg",
                        alt: ""
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            children: data !== null ? newCartCount : 0
                        })
                    })
                ]
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.cart, state.setting;
};
/* harmony default export */ const modules_MiniCart = ((0,external_react_redux_.connect)(mapStateToProps)(MiniCart));

// EXTERNAL MODULE: ./src/store/auth/action.js
var auth_action = __webpack_require__(6250);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/store/wishlist/action.js
var wishlist_action = __webpack_require__(9751);
// EXTERNAL MODULE: ./src/store/compare/action.js
var compare_action = __webpack_require__(6011);
;// CONCATENATED MODULE: ./src/components/shared/headers/modules/CompardItems.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





function CompardItems({ compareCount  }) {
    let reloadCart = (0,external_react_redux_.useSelector)((s)=>s.compare.comparecompare);
    const dispatch = (0,external_react_redux_.useDispatch)();
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    (0,external_react_.useEffect)(()=>{
        dispatch((0,compare_action/* getCompareListcompare */.tK)(compareCount));
    }, [
        compareCount,
        reloadedheader
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
            href: "/account/compare",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                className: "header__extra",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/compare.svg",
                        alt: ""
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            children: reloadCart && reloadCart.length !== 0 ? compareCount && compareCount.length == 0 ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: reloadCart.length
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: compareCount && compareCount.length
                            }) : 0
                        })
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const modules_CompardItems = (CompardItems);

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/wishlistItems.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function WishlistItems({ wishlistData  }) {
    let reloadCart = (0,external_react_redux_.useSelector)((s)=>s.wishlist.wishlistItems);
    const handleridrect = ()=>{
        if (localStorage.getItem("spurtToken")) {
            router_default().push("/account/wishlist");
        } else {
            router_default().push("/account/login");
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
            className: "header__extra",
            onClick: (e)=>handleridrect(e),
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: "/static/img/heart.svg",
                    alt: ""
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        children: reloadCart && reloadCart.length !== 0 ? wishlistData && wishlistData.length == 0 ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: reloadCart.length
                        }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: wishlistData.length
                        }) : 0
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const wishlistItems = (WishlistItems);

// EXTERNAL MODULE: external "react-modal"
var external_react_modal_ = __webpack_require__(9931);
var external_react_modal_default = /*#__PURE__*/__webpack_require__.n(external_react_modal_);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: ./src/api/intercept.js
var intercept = __webpack_require__(5200);
// EXTERNAL MODULE: ./src/store/cart/action.js
var cart_action = __webpack_require__(5848);
;// CONCATENATED MODULE: ./src/api/auth/LogOut.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




async function LogOut(dispatch, Router) {
    const data = JSON.stringify({});
    const result = await services/* default.create */.Z.create("customer/logout", data);
    if (result && result.data) {
        if (result && result.data && result.data.status) {
            localStorage.clear();
            dispatch((0,auth_action/* logOut */.ni)());
            dispatch((0,wishlist_action/* getWishlistList */.bH)([]));
            dispatch((0,cart_action/* addItem */.jX)(1));
            Router.push("/account/login");
            (0,intercept/* modalSuccess */.jS)("success", result.data.message);
        }
    }
}

;// CONCATENATED MODULE: ./src/components/shared/modal/AccountPop.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 













function AccountPopUp({ showPop , setShowPop  }) {
    const { t  } = (0,i18n.useTranslation)("common");
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: fname , 1: setFname  } = (0,external_react_.useState)("");
    const { 0: aimg , 1: setAimg  } = (0,external_react_.useState)("");
    const { 0: email , 1: setEmail  } = (0,external_react_.useState)("");
    const { 0: accepted , 1: setAccepted  } = (0,external_react_.useState)(1);
    const { 0: logstatus , 1: setLogstatus  } = (0,external_react_.useState)();
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    const customStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "transparent",
            inset: "0% 0% 0% -38%"
        },
        content: {
            top: "0%",
            left: "80%",
            right: "0%",
            bottom: "65%",
            marginRight: "3%",
            marginTop: "3%",
            backgroundColor: "white",
            height: "222px",
            padding: "0",
            overflow: "hidden",
            width: "257px"
        }
    };
    const closeModal = ()=>{
        setShowPop(false);
    };
    const handleLogout = (e)=>{
        e.preventDefault();
        document.body.classList.remove("scroll-block-home");
        LogOut(dispatch, (router_default()));
    };
    (0,external_react_.useEffect)(()=>{
        let a = JSON.parse(localStorage.getItem("spurtUser"));
        if (a != null) {
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName);
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email);
            JSON.parse(localStorage.getItem("spurtUser")).avatar ? setAimg(url/* imageUrl */.sQ + "?path=" + JSON.parse(localStorage.getItem("spurtUser")).avatarPath + "&name=" + JSON.parse(localStorage.getItem("spurtUser")).avatar + "&width=500&height=500") : setAimg("/static/img/no-image.png");
        }
    }, [
        reloadedheader
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_modal_default()), {
        isOpen: showPop,
        onRequestClose: (e)=>closeModal(e),
        style: customStyles,
        contentLabel: "Example Modal",
        shouldCloseOnOverlayClick: true,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ap-header",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: aimg
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        children: [
                            fname,
                            " ",
                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                            " ",
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("small", {
                                children: [
                                    email,
                                    " "
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ap-divider"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/account/myorders",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    className: "ap-anchor",
                    onClick: (e)=>closeModal(e),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icons_.FileTextFilled, {
                            style: {
                                fontSize: "20px"
                            }
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            style: {
                                marginLeft: "20px"
                            },
                            children: t("OrderHistory")
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/account/dashboard",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    className: "ap-anchor",
                    onClick: (e)=>closeModal(e),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(icons_.SettingFilled, {
                            style: {
                                fontSize: "20px"
                            }
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            style: {
                                marginLeft: "20px"
                            },
                            children: t("AccountSettings")
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ap-divider"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                className: "ap-anchor",
                style: {
                    paddingTop: "12px",
                    paddingBottom: "0px"
                },
                onClick: (e)=>handleLogout(e),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(icons_.PoweroffOutlined, {
                        style: {
                            fontSize: "20px"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        style: {
                            marginLeft: "20px"
                        },
                        children: t("SignOut")
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const AccountPop = (AccountPopUp);

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/AccountQuickLinks.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function AccountQuickLinks(props) {
    const { 0: showPop , 1: setShowPop  } = (0,external_react_.useState)(false);
    const { t  } = (0,i18n.useTranslation)("common");
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    (0,external_react_.useEffect)(()=>{
        if (showPop) {
            document.body.classList.add("scroll-block-home");
        } else {
            document.body.classList.remove("scroll-block-home");
        }
    }, [
        showPop,
        props
    ]);
    const { isLoggedIn  } = props;
    if (isLoggedIn === true) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-block--user-account",
            style: {
                marginLeft: "30px"
            },
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(AccountPop, {
                    showPop: showPop,
                    setShowPop: setShowPop
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "account-looginin-view",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            className: "icon-user",
                            style: {
                                color: "white"
                            }
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            onClick: (e)=>setShowPop(!showPop),
                            children: "Account"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            class: "fa fa-angle-down",
                            "aria-hidden": "true"
                        })
                    ]
                })
            ]
        });
    } else {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-block--user-header",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ps-block__left",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        className: "icon-user"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "ps-block__right",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/account/login",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Login"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/account/register",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: "Register"
                            })
                        })
                    ]
                })
            ]
        });
    }
}
const AccountQuickLinks_mapStateToProps = (state)=>{
    return state;
};
/* harmony default export */ const modules_AccountQuickLinks = ((0,external_react_redux_.connect)(AccountQuickLinks_mapStateToProps)(AccountQuickLinks));

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/SignINLINks.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




function SignINLINks() {
    const { t  } = (0,i18n.useTranslation)("common");
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
            className: "navigation__extra",
            style: {
                display: "flex"
            },
            children: /*#__PURE__*/ jsx_runtime_.jsx("li", {
                style: {
                    padding: "0",
                    margin: "0"
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/account/login",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                        children: [
                            t("Shared.SignIn"),
                            " ",
                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: "/static/img/user.svg",
                                alt: ""
                            })
                        ]
                    })
                })
            })
        })
    });
}
/* harmony default export */ const modules_SignINLINks = (SignINLINks);

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/AuthSignIN.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




function AuthSignIN({ auth  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: auth.isLoggedIn && Boolean(auth.isLoggedIn) ? /*#__PURE__*/ jsx_runtime_.jsx(modules_AccountQuickLinks, {
            isLoggedIn: true
        }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(modules_SignINLINks, {})
        })
    });
}
/* harmony default export */ const modules_AuthSignIN = (AuthSignIN);

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/HeaderActions.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 












function HeaderActions({ auth , compare  }) {
    const { t  } = (0,i18n.useTranslation)("common");
    const { 0: wishlistData , 1: setWishListApi  } = (0,external_react_.useState)([]);
    const { 0: compareCount , 1: setCompareCount  } = (0,external_react_.useState)([]);
    const { 0: dummy , 1: setDummy  } = (0,external_react_.useState)([]);
    let reloadCart = (0,external_react_redux_.useSelector)((s)=>s.wishlist.addwishlist);
    let compareSet = (0,external_react_redux_.useSelector)((s)=>s.compare.compareCount);
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const wishlist = "";
    let TokenAuth = "";
    let cartLocal = [];
    const authFunc = ()=>{
        if (TokenAuth !== null) {
            dispatch((0,auth_action/* login */.x4)());
        }
    };
    (0,external_react_.useEffect)(()=>{
        TokenAuth = localStorage.getItem("spurtToken");
        cartLocal = JSON.parse(localStorage.getItem("cartItem"));
        authFunc();
    }, [
        reloadedheader
    ]);
    (0,external_react_.useEffect)(()=>{
        dispatch((0,wishlist_action/* addItemToWishlist */.yK)(0));
        localStorage.getItem("spurtToken") && (0,api/* wishListApi */.p8)(setWishListApi, dispatch, setDummy);
    }, [
        reloadCart,
        reloadedheader
    ]);
    (0,external_react_.useEffect)(()=>{
        dispatch((0,compare_action/* getCompareList */.UU)(0));
        setCompareCount(JSON.parse(localStorage.getItem("compareId")));
    }, [
        compareSet,
        reloadedheader
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "header__right",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "header__actions",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(modules_AuthSignIN, {
                        auth: auth
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(modules_CompardItems, {
                        compareCount: compareCount
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(wishlistItems, {
                        wishlistData: wishlistData
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(modules_MiniCart, {})
                ]
            })
        })
    });
}
const HeaderActions_mapStateToProps = (state)=>{
    return state;
};
/* harmony default export */ const modules_HeaderActions = ((0,external_react_redux_.connect)(HeaderActions_mapStateToProps)(HeaderActions));

;// CONCATENATED MODULE: ./src/api/account/productSearchList.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function searchListApi(keyword, setSearchList, offset) {
    const result = await services/* default.getAll */.Z.getAll("product-store/productSearchList?keyword=" + keyword + "&limit=10" + "&offset=" + offset);
    if (result && result.data && result.data.status === 1) {
        setSearchList(result.data.data);
    }
}

// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/shared/headers/modules/SearchHeader.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 









function SearchHeader() {
    let viewcurrentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.viewcurrentColor);
    const { 0: keyword , 1: setKeyword  } = (0,external_react_.useState)("");
    const { 0: searchList , 1: setSearchList  } = (0,external_react_.useState)([]);
    const { 0: searchClick , 1: setSearchClick  } = (0,external_react_.useState)(true);
    const { 0: empyt , 1: setempty  } = (0,external_react_.useState)([]);
    const { 0: limit , 1: setLimit  } = (0,external_react_.useState)(5);
    const { 0: offset , 1: setOffset  } = (0,external_react_.useState)();
    const router = (0,router_.useRouter)();
    const inputRef = (0,external_react_.useRef)(null);
    const listInnerRef = (0,external_react_.useRef)();
    const { 0: scrall , 1: setscrall  } = (0,external_react_.useState)(false);
    const { 0: muscles , 1: setmuscles  } = (0,external_react_.useState)(false);
    const { 0: routerproductvalue , 1: setRouterproductValue  } = (0,external_react_.useState)("");
    let reloadKey = router.query.keyword;
    const { t  } = (0,i18n.useTranslation)("common");
    const handleSearch = (e)=>{
        setscrall(false);
        setSearchClick(true);
        setKeyword(e.target.value);
        const add = 0;
        setOffset(add);
        setempty([]);
        searchListApi(e.target.value, setSearchList, add);
        setRouterproductValue(e.target.value);
    };
    (0,external_react_.useEffect)(()=>{
        if (scrall === false) {
            setempty(searchList);
        }
    }, [
        scrall,
        searchList
    ]);
    (0,external_react_.useEffect)(()=>{
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
    }, []);
    const ProductRoute = (product)=>{
        router.push({
            pathname: "/product/[pid]",
            query: {
                pid: product.productSlug,
                productname: product.name
            }
        });
        setKeyword(product.name);
        setSearchClick(false);
    };
    (0,external_react_.useEffect)(()=>{
        if (router.route !== "/") {
            if (router.query.productname != undefined) {
                setRouterproductValue(router.query.productname);
            } else {
                setRouterproductValue(router.query.keyword);
            }
        } else {
            setRouterproductValue("");
        }
    }, [
        router.query.productname,
        router.query.keyword
    ]);
    const onsetSearchClick = ()=>{
        setSearchClick(false);
        setKeyword("");
    };
    const onScroll = ()=>{
        if (listInnerRef.current) {
            const { scrollTop , scrollHeight , clientHeight  } = listInnerRef.current;
            let scrollTops = Math.ceil(scrollTop);
            if (scrall == false && keyword.length > 1) {
                setempty([]);
            }
            if (scrollTops + clientHeight >= scrollHeight) {
                let val = [];
                let res = [];
                setSearchList([]);
                let add = offset + 10;
                setOffset(add);
                if (add != 0) {
                    searchListApi(keyword, setSearchList, add);
                }
                if (searchList.length > 0) {
                    setscrall(true);
                    val = empyt.concat(searchList.length > 0 ? searchList : []);
                    if (val.length > 0) {
                        res = val;
                        let newArr = [];
                        res.forEach((item, index)=>{
                            if (newArr.findIndex((i)=>i.productId == item.productId) === -1) {
                                newArr.push(item);
                            }
                        });
                        if (scrall === false) {
                            setempty([]);
                            setSearchList([]);
                        }
                        setempty(newArr);
                    }
                }
            }
        }
    };
    const enterKeyEvent = (e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            if (keyword) {
                router_default().push({
                    pathname: `/shop/[sid]`,
                    query: {
                        keyword: keyword,
                        attribute: "",
                        priceTo: 30000,
                        priceFrom: 0,
                        brand: "",
                        variantValue: "",
                        defaultCallValue: "",
                        offset: 0,
                        limit: 18,
                        index: 0,
                        categorySlug: ""
                    }
                }, {
                    pathname: `/shop/${keyword}`,
                    query: {
                        keyword: keyword,
                        attribute: "",
                        priceTo: 30000,
                        priceFrom: 0,
                        brand: "",
                        variantValue: "",
                        defaultCallValue: "",
                        offset: 0,
                        limit: 18,
                        index: 0,
                        categorySlug: ""
                    }
                });
            }
            setSearchClick(false);
            setKeyword("");
        }
    };
    const onsearchclick = (e)=>{
        if (keyword) {
            router_default().push({
                pathname: `/shop/[sid]`,
                query: {
                    keyword: keyword,
                    attribute: "",
                    priceTo: 30000,
                    priceFrom: 0,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: "",
                    offset: 0,
                    limit: 18,
                    index: 0,
                    categorySlug: ""
                }
            }, {
                pathname: `/shop/${keyword}`,
                query: {
                    keyword: keyword,
                    attribute: "",
                    priceTo: 30000,
                    priceFrom: 0,
                    brand: "",
                    variantValue: "",
                    defaultCallValue: "",
                    offset: 0,
                    limit: 18,
                    index: 0,
                    categorySlug: ""
                }
            });
        }
        setSearchClick(false);
        setKeyword("");
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-form--quick-search",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                ref: inputRef,
                value: routerproductvalue,
                className: "form-control",
                autoFocus: true,
                type: "text",
                placeholder: t("Search for products"),
                onChange: (e)=>handleSearch(e),
                onKeyPress: (e)=>enterKeyEvent(e),
                defaultValue: reloadKey !== undefined ? reloadKey : ""
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "search-anchor-contain",
                onClick: (e)=>onsetSearchClick(),
                children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.SearchOutlined, {
                    className: viewcurrentColor,
                    onClick: (e)=>onsearchclick()
                })
            }),
            searchList && keyword.length >= 1 && searchClick && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "search-auto-container",
                onScroll: onScroll,
                ref: listInnerRef,
                children: empyt && empyt.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                    children: empyt.map((product)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "search-auto-maincontainer",
                            onClick: (e)=>ProductRoute(product),
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "search-auto-imgconatiner",
                                    children: product && product.productImage && /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        src: url/* imageUrl */.sQ + "?path=" + product.productImage.containerName + "&name=" + product.productImage.image + "&width=200&height=400",
                                        width: 24,
                                        height: 30,
                                        objectFit: "contain",
                                        layout: "responsive",
                                        placeholder: "blur",
                                        blurDataURL: "/static/img/no-image.png"
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "search-auto-content-container",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h5", {
                                            style: {
                                                fontSize: "14px !important"
                                            },
                                            children: product && product.name
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            children: product && product.categoryName && product.categoryName.name
                                        })
                                    ]
                                })
                            ]
                        }, product.productId))
                }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "search-auto-content-container",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        style: {
                            display: "flex",
                            marginTop: "10rem",
                            fontSize: "2.5rem",
                            justifyContent: "center",
                            color: "#000"
                        },
                        children: searchList && searchList.length == 0 ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: "No Data Found"
                        }) : ""
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const modules_SearchHeader = ((0,external_react_redux_.connect)((state)=>state.product)(SearchHeader));

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/LanguageSwicher.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function LanguageSwicher({ t , i18n  }) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: currentLang , 1: setCurrentLang  } = (0,external_react_.useState)("");
    const { 0: countryFlag , 1: setCountryFlag  } = (0,external_react_.useState)("");
    let coutryf = (0,external_react_redux_.useSelector)((s)=>s.wishlist.langagechange);
    let countflagcout = (0,external_react_redux_.useSelector)((s)=>s.wishlist.mainloadedone);
    (0,external_react_.useEffect)(()=>{
        let lagnchange = JSON.parse(localStorage.getItem("language-spurt"));
        if (lagnchange !== null) {
            if (lagnchange.code === "eng") {
                dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + lagnchange.imagePath + "&name=" + lagnchange.image + "&width=20&height=20"));
                setCurrentLang(lagnchange.name);
                setCountryFlag(url/* imageUrl */.sQ + "?path=language/&name=Img_1622893818038.png&width=20&height=20");
                i18n.changeLanguage("en");
            } else if (lagnchange.code === "fr") {
                dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + lagnchange.imagePath + "&name=" + lagnchange.image + "&width=20&height=20"));
                setCurrentLang(lagnchange.name);
                setCountryFlag(url/* imageUrl */.sQ + "?path=language/&name=Img_1557569207176.png&width=20&height=20");
                i18n.changeLanguage("fr");
            } else {
                setCurrentLang(lagnchange.name);
                dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + lagnchange.imagePath + "&name=" + lagnchange.image + "&width=20&height=20"));
                setCountryFlag(url/* imageUrl */.sQ + "?path=language/&name=Img_1622893818038.png&width=20&height=20");
                i18n.changeLanguage("en");
            }
        } else {
            if (countflagcout && countflagcout.length !== 0) {
                setCurrentLang(countflagcout.at(0).name);
                dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + countflagcout.at(0).imagePath + "&name=" + countflagcout.at(0).image + "&width=20&height=20"));
                setCountryFlag(url/* imageUrl */.sQ + "?path=language/&name=Img_1622893818038.png&width=20&height=20");
                i18n.changeLanguage("en");
            }
        }
    }, [
        countflagcout
    ]);
    const onChangeLanguage = (e, datas)=>{
        countflagcout && countflagcout.map((equaldata, inex)=>{
            if (equaldata.languageId === datas.languageId) {
                if (datas.code === "eng") {
                    setCurrentLang(datas.name);
                    i18n.changeLanguage("en");
                    dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + datas.imagePath + "&name=" + datas.image + "&width=20&height=20"));
                    setCountryFlag(url/* imageUrl */.sQ + "?path=" + datas.imagePath + "&name=" + datas.image + "&width=20&height=20");
                    localStorage.setItem("language-spurt", JSON.stringify(datas));
                } else if (datas.code === "fr") {
                    setCurrentLang(datas.name);
                    i18n.changeLanguage("fr");
                    dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + datas.imagePath + "&name=" + datas.image + "&width=20&height=20"));
                    setCountryFlag(url/* imageUrl */.sQ + "?path=" + datas.imagePath + "&name=" + datas.image + "&width=20&height=20");
                    localStorage.setItem("language-spurt", JSON.stringify(datas));
                } else {
                    setCurrentLang(datas.name);
                    dispatch((0,wishlist_action/* LanguageListLoading */.NH)(url/* imageUrl */.sQ + "?path=" + datas.imagePath + "&name=" + datas.image + "&width=20&height=20"));
                    setCountryFlag(url/* imageUrl */.sQ + "?path=" + datas.imagePath + "&name=" + datas.image + "&width=20&height=20");
                }
            }
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-dropdown language",
        children: [
            coutryf && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    onClick: (e)=>e.preventDefault(),
                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: coutryf && coutryf,
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                        layout: "responsive",
                        placeholder: "blur",
                        blurDataURL: "/static/img/no-image.png"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                className: "ps-dropdown-menu",
                children: [
                    countflagcout && countflagcout.map((flagcout, index)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: url/* imageUrl */.sQ + "?path=" + flagcout.imagePath + "&name=" + flagcout.image + "&width=20&height=20",
                                        style: {
                                            width: "25px!important",
                                            height: "13px!important"
                                        },
                                        alt: "martfury"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: flagcout.languageId,
                                        children: flagcout.name
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "radio",
                                        value: flagcout.name,
                                        id: flagcout.languageId,
                                        onChange: (e)=>onChangeLanguage(e, flagcout),
                                        checked: currentLang === flagcout.name
                                    })
                                ]
                            })
                        })),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "view_more",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            href: "",
                            children: "View more"
                        })
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const modules_LanguageSwicher = ((0,i18n.withTranslation)("common")(LanguageSwicher));

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/Logo.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






function Logo() {
    const logopaths = (0,external_react_redux_.useSelector)((s)=>s.setting.footerDet);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
            href: "/",
            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "ps-logo",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "logo-div",
                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        src: url/* imageUrl */.sQ + "?path=" + logopaths?.storeLogoPath + "&name=" + logopaths?.storeLogo + "&width=220&height=50",
                        width: 188,
                        height: 50,
                        objectFit: "contain",
                        layout: "responsive",
                        placeholder: "blur",
                        blurDataURL: "/static/img/no-image.png",
                        alt: "Spurtcommerce"
                    })
                })
            })
        })
    });
}

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
// EXTERNAL MODULE: external "@react-google-maps/api"
var api_ = __webpack_require__(2433);
// EXTERNAL MODULE: external "react-geocode"
var external_react_geocode_ = __webpack_require__(5154);
;// CONCATENATED MODULE: ./src/api/googlemap/googlemapApi.js

async function GoogleMapApi(setCitypin, setCheck) {
    const data = JSON.stringify({
        address1: "piccosoft",
        address2: "crompet",
        addressType: 2,
        city: "chennai",
        postcode: "600001",
        state: "Tamil Nadu",
        addressId: 2,
        countryId: 88,
        company: "Thulasi"
    });
    const result = await services/* default.create */.Z.create("CustomerAddress/add-address", data);
    if (result && result.data && result.data.status == 1) {
        GoogleMapApiget(setCitypin, setCheck);
    }
}
async function GoogleMapApiget(setCitypin, setCheck) {
    const result = await services/* default.getAll */.Z.getAll("CustomerAddress/get-address-list");
    if (result && result.data && result.data.data) {
        setCitypin(result.data.data);
        setCheck(true);
    }
}

;// CONCATENATED MODULE: ./src/components/shared/headers/HeaderDefault.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






// import { useEffect } from "react";











const lib = [
    "places"
];
function HeaderDefault(props) {
    let category = (0,external_react_redux_.useSelector)((s)=>s.product);
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { t  } = (0,i18n.useTranslation)("common");
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const { 0: currentPosition , 1: setCurrentPosition  } = (0,external_react_.useState)({});
    const { 0: searchBox , 1: setSearchBox  } = (0,external_react_.useState)(null);
    const { 0: location , 1: setLocation  } = (0,external_react_.useState)({});
    const { 0: citypin , 1: setCitypin  } = (0,external_react_.useState)();
    const { 0: check , 1: setCheck  } = (0,external_react_.useState)(false);
    const { 0: search , 1: setSearch  } = (0,external_react_.useState)();
    const { 0: load , 1: setLoad  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        (0,api/* categoryListApi */.BK)(dispatch, setLoad);
    }, []);
    const onPlacesChanged = ()=>{
        GoogleMapApi(setCitypin, setCheck);
    };
    const onSBLoad = (ref)=>{
        setSearchBox(ref);
    };
    const onMarkerDragEnd = (e)=>{
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({
            lat,
            lng
        });
    };
    const success = (position)=>{
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition.lat},${currentPosition.lng}&key=AIzaSyAW-UoMeFIKDsThjYnIf74AMtRlo3CvOcM`).then((res)=>res.json()).then((data)=>{});
        (error)=>{
            console.error(error);
        };
        setCurrentPosition(currentPosition);
    };
    (0,external_react_.useEffect)(()=>{
        navigator.geolocation.getCurrentPosition(success);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
            className: "header header--1",
            "data-sticky": "true",
            id: "headerSticky",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: `header__top ${currentColor}`,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "ps-container",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "header__left",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Logo, {}),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "menu--product-categories",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "menu__toggle",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                    className: "icon-menu"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    children: [
                                                        " ",
                                                        t("soc")
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "header-menu-main ",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "header__center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(modules_SearchHeader, {}),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "header__newtheme_language",
                                                style: {},
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(modules_LanguageSwicher, {})
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(modules_HeaderActions, {})
                                ]
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(navigation_NavigationDefault, {}),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "modal fade locationmodal",
                    id: "exampleModal",
                    tabindex: "-1",
                    role: "dialog",
                    "aria-labelledby": "exampleModalLabel",
                    "aria-hidden": "true",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "modal-dialog modal-dialog-centered",
                        role: "document",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "modal-content",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "modal-body",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: "close",
                                        "data-dismiss": "modal",
                                        "aria-label": "Close",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "/static/img/x-white.svg",
                                            alt: ""
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "locationModal_wrap",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(api_.LoadScript, {
                                            googleMapsApiKey: "AIzaSyAW-UoMeFIKDsThjYnIf74AMtRlo3CvOcM",
                                            libraries: lib,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(api_.GoogleMap, {
                                                google: props.google,
                                                mapContainerStyle: {
                                                    maxWidth: "100%",
                                                    height: "500px"
                                                },
                                                center: currentPosition,
                                                zoom: 12,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(api_.MarkerF, {
                                                        style: {
                                                            backgroundColor: "red",
                                                            color: "green"
                                                        },
                                                        position: currentPosition,
                                                        onDragEnd: (e)=>onMarkerDragEnd(e),
                                                        draggable: true
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(api_.StandaloneSearchBox, {
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "locationModal_row",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                                        type: "text",
                                                                        value: search,
                                                                        placeholder: "Search area, landmark, locality",
                                                                        onChange: (e)=>setSearch(e.target.value)
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                                        onClick: onPlacesChanged,
                                                                        children: [
                                                                            " ",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                                src: "/static/img/loc-white.svg",
                                                                                alt: ""
                                                                            }),
                                                                            " Confirm location"
                                                                        ]
                                                                    })
                                                                ]
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
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const headers_HeaderDefault = (HeaderDefault);

// EXTERNAL MODULE: ./src/components/shared/footers/FooterFullwidth.jsx + 3 modules
var FooterFullwidth = __webpack_require__(8761);
;// CONCATENATED MODULE: ./src/components/elements/color/themeControl.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




function ThemeChanger() {
    let showClass = (0,external_react_redux_.useSelector)((s)=>s.palette.showContent);
    let showpannelonlyopen = (0,external_react_redux_.useSelector)((s)=>s.palette.viewpannel);
    const dispatch = (0,external_react_redux_.useDispatch)();
    (0,external_react_.useEffect)(()=>{
        dispatch((0,action/* colorShowContent */._2)(""));
    }, []);
    const handleThemeChange = (color)=>{
        showClass === "color-show" ? dispatch((0,action/* colorShowContent */._2)("")) : dispatch((0,action/* colorShowContent */._2)("color-show"));
        localStorage.setItem("colorThemeSpurt", color);
        localStorage.setItem("colorThemeSpurtView", color + "color");
        dispatch((0,action/* colorThemeCurrent */.jh)(color));
        dispatch((0,action/* viewcolorThemeCurrent */.oA)(color + "color"));
    };
    const display = "blockblock";
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `colorOption transistionColor ${showClass} ${showpannelonlyopen}`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                className: "button-palette",
                onClick: (e)=>showClass === "color-show" ? dispatch((0,action/* colorShowContent */._2)("")) : dispatch((0,action/* colorShowContent */._2)("color-show")),
                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: "/static/img/new-color-pallete.png"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "palette-color-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/polygon17.svg",
                        onClick: (e)=>handleThemeChange("blue")
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/polygon18.svg",
                        onClick: (e)=>handleThemeChange("red")
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/polygon19.svg",
                        onClick: (e)=>handleThemeChange("purple")
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/polygon20.svg",
                        onClick: (e)=>handleThemeChange("green")
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/polygon21.svg",
                        onClick: (e)=>handleThemeChange("grey")
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/polygon22.svg",
                        onClick: (e)=>handleThemeChange("normal")
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const themeControl = (ThemeChanger);

// EXTERNAL MODULE: external "react-slick"
var external_react_slick_ = __webpack_require__(8096);
var external_react_slick_default = /*#__PURE__*/__webpack_require__.n(external_react_slick_);
// EXTERNAL MODULE: ./src/components/elements/carousel/NextArrow.jsx
var NextArrow = __webpack_require__(1766);
// EXTERNAL MODULE: ./src/components/elements/carousel/PrevArrow.jsx
var PrevArrow = __webpack_require__(661);
;// CONCATENATED MODULE: ./src/components/partials/homepage/home-default/HomeBanner.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








function HomeBanner(data) {
    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: /*#__PURE__*/ jsx_runtime_.jsx(NextArrow/* default */.Z, {}),
        prevArrow: /*#__PURE__*/ jsx_runtime_.jsx(PrevArrow/* default */.Z, {}),
        autoplay: true,
        autoplaySpeed: 2000
    };
    const bannervalidatinon = (e, link)=>{
        if (link !== "") {
            let url = "";
            if (!/^http[s]?:\/\//.test(link)) {
                url += "http://";
            }
            url += link;
            window.open(url);
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
}
/* harmony default export */ const home_default_HomeBanner = (HomeBanner);

// EXTERNAL MODULE: ./src/store/setting/action.js
var setting_action = __webpack_require__(9086);
;// CONCATENATED MODULE: ./src/components/shared/headers/modules/CurrencyDropdown.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





class CurrencyDropdown extends external_react_.Component {
    constructor(props){
        super(props);
    }
    handleFeatureWillUpdate(e) {
        e.preventDefault();
        external_antd_.notification.open({
            message: "Opp! Something went wrong.",
            description: "This feature has been updated later!",
            duration: 500
        });
    }
    handleChangeCurrency = (e, currency)=>{
        e.preventDefault();
        this.props.dispatch((0,setting_action/* changeCurrency */.sy)(currency));
    };
    render() {
        const { currency  } = this.props;
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-dropdown",
            children: [
                currency ? /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    href: "/",
                    onClick: (e)=>e.preventDefault(),
                    children: currency.text
                }) : "",
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                    className: "ps-dropdown-menu",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: "/",
                                onClick: (e)=>this.handleChangeCurrency(e, {
                                        symbol: "$",
                                        text: "USD"
                                    }),
                                children: "USD"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: "/",
                                onClick: (e)=>this.handleChangeCurrency(e, {
                                        symbol: "€",
                                        text: "EURO"
                                    }),
                                children: "EURO"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: "/",
                                onClick: (e)=>this.handleChangeCurrency(e, {
                                        symbol: "\xa3",
                                        text: "GBP"
                                    }),
                                children: "GBP"
                            })
                        })
                    ]
                })
            ]
        });
    }
}
const CurrencyDropdown_mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const modules_CurrencyDropdown = ((0,external_react_redux_.connect)(CurrencyDropdown_mapStateToProps)(CurrencyDropdown));

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/AccountQuickLinksMobile.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






class AccountQuickLinksMobile_AccountQuickLinks extends external_react_.Component {
    constructor(props){
        super(props);
    }
    handleLogout = (e)=>{
        e.preventDefault();
        this.props.dispatch((0,auth_action/* logOut */.ni)());
    };
    render() {
        const accountLinks = [
            {
                text: "Account Information",
                url: "/account/user-information"
            },
            {
                text: "Notifications",
                url: "/account/notifications"
            },
            {
                text: "Invoices",
                url: "/account/invoices"
            },
            {
                text: "Address",
                url: "/account/addresses"
            },
            {
                text: "Recent Viewed Product",
                url: "/account/recent-viewed-product"
            },
            {
                text: "Wishlist",
                url: "/account/wishlist"
            }, 
        ];
        const menu = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Menu, {
            children: [
                accountLinks.map((link)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: link.url,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: link.text
                            })
                        })
                    }, link.url)),
                /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "#",
                        onClick: this.handleLogout.bind(this),
                        children: "Logout"
                    })
                })
            ]
        });
        return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Dropdown, {
            overlay: menu,
            placement: "bottomLeft",
            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                href: "#",
                className: "header__extra ps-user--mobile",
                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                    className: "icon-user"
                })
            })
        });
    }
}
const AccountQuickLinksMobile_mapStateToProps = (state)=>{
    return state;
};
/* harmony default export */ const AccountQuickLinksMobile = ((0,external_react_redux_.connect)(AccountQuickLinksMobile_mapStateToProps)(AccountQuickLinksMobile_AccountQuickLinks));

// EXTERNAL MODULE: ./src/api/cart/cartCount.js
var cartCount = __webpack_require__(5728);
;// CONCATENATED MODULE: ./src/components/shared/panel/PanelMenu.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const { SubMenu  } = external_antd_.Menu;
class PanelMenu extends external_react_.Component {
    constructor(props){
        super(props);
    }
    rootSubmenuKeys = [
        "sub1",
        "sub2",
        "sub4"
    ];
    state = {
        openKeys: []
    };
    onOpenChange = (openKeys)=>{
        const latestOpenKey = openKeys.find((key)=>this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys
            });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [
                    latestOpenKey
                ] : []
            });
        }
    };
    render() {
        const { menuData  } = this.props;
        const { setMenuDrawer  } = this.props;
        return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu, {
            mode: "inline",
            openKeys: this.state.openKeys,
            onOpenChange: this.onOpenChange,
            className: "menu--mobile-2",
            children: /*#__PURE__*/ jsx_runtime_.jsx(SubMenu, {
                title: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
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
                            categorySlug: menuData.categorySlug
                        }
                    },
                    as: {
                        pathname: `/shop/${menuData.categorySlug}`,
                        query: {
                            attribute: "",
                            priceTo: 30000,
                            brand: "",
                            variantValue: "",
                            defaultCallValue: "ASC",
                            offset: 0,
                            index: 0,
                            categorySlug: menuData.categorySlug
                        }
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                        children: [
                            " ",
                            menuData.name
                        ]
                    })
                }),
                children: menuData && menuData.children.map((megaItemChild)=>/*#__PURE__*/ jsx_runtime_.jsx(SubMenu, {
                        title: megaItemChild.name,
                        children: megaItemChild && megaItemChild.children && megaItemChild.children.map((megaSubItem)=>megaSubItem.type === "dynamic" ? /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
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
                                        categorySlug: megaSubItem.categorySlug,
                                        categoryId: megaItemChild.categoryId
                                    }
                                },
                                as: {
                                    pathname: `/shop/${megaSubItem.categorySlug}`,
                                    query: {
                                        attribute: "",
                                        priceTo: 30000,
                                        brand: "",
                                        variantValue: "",
                                        defaultCallValue: "ASC",
                                        offset: 0,
                                        index: 0,
                                        categorySlug: megaSubItem.categorySlug,
                                        categoryId: megaItemChild.categoryId
                                    }
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                        children: megaSubItem.name
                                    })
                                })
                            }) : /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
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
                                        categorySlug: megaSubItem.categorySlug,
                                        categoryId: megaItemChild.categoryId
                                    }
                                },
                                as: {
                                    pathname: `/shop/${megaSubItem.categorySlug}`,
                                    query: {
                                        attribute: "",
                                        priceTo: 30000,
                                        brand: "",
                                        variantValue: "",
                                        defaultCallValue: "ASC",
                                        offset: 0,
                                        index: 0,
                                        categorySlug: megaSubItem.categorySlug,
                                        categoryId: megaItemChild.categoryId
                                    }
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                        className: "menu--mobile-203",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            onClick: (e)=>setMenuDrawer(false),
                                            className: "menu--mobile-209",
                                            children: megaSubItem.name
                                        })
                                    }, megaSubItem.name)
                                })
                            }))
                    }, megaItemChild.name))
            })
        });
    }
}
const PanelMenu_mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const panel_PanelMenu = ((0,external_react_redux_.connect)(PanelMenu_mapStateToProps)(PanelMenu));

;// CONCATENATED MODULE: ./src/components/shared/headers/modules/MobileHeaderActions.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 











function MobileHeaderActions({ auth , cartTotal  }) {
    let reloadCart = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    let category = (0,external_react_redux_.useSelector)((s)=>s.product.categories);
    let auths = (0,external_react_redux_.useSelector)((s)=>s.auth);
    const { 0: menuDrawer , 1: setMenuDrawer  } = (0,external_react_.useState)(false);
    const { 0: cartDrawer , 1: setCartDrawer  } = (0,external_react_.useState)(false);
    const { 0: searchDrawer , 1: setSearchDrawer  } = (0,external_react_.useState)(false);
    const { 0: categoriesDrawer , 1: setCategoriesDrawer  } = (0,external_react_.useState)(false);
    const { 0: cartData , 1: setCartData  } = (0,external_react_.useState)([]);
    let cartLocal = [];
    const dispatch = (0,external_react_redux_.useDispatch)();
    (0,external_react_.useEffect)(()=>{
        setCartData(JSON.parse(localStorage.getItem("cartItem")));
        cartLocal = JSON.parse(localStorage.getItem("cartItem"));
        cartGet();
    }, [
        reloadCart
    ]);
    const cartGet = ()=>{
        if (cartLocal === null || cartLocal.length === 0) {}
    };
    const handleDrawerClose = ()=>{
        setMenuDrawer(false);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "navigation__right",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Drawer, {
                className: "ps-panel--mobile",
                placement: "left",
                closable: false,
                onClose: (e)=>setMenuDrawer(false),
                visible: menuDrawer,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "ps-panel--wrapper",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "ps-panel__header",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {}),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "ps-panel__close",
                                    onClick: (e)=>setMenuDrawer(false),
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "icon-cross"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-panel__content",
                            children: category && category.map((item)=>{
                                return /*#__PURE__*/ jsx_runtime_.jsx(panel_PanelMenu, {
                                    menuData: item,
                                    setMenuDrawer: setMenuDrawer
                                });
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/account/compare",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    class: "header__extra",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "/static/img/compare.svg",
                            alt: ""
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                children: "0"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/account/wishlist",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                    class: "header__extra",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "/static/img/heart.svg",
                            alt: ""
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                children: "0"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                class: "header__extra",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "/static/img/shopping-cart.svg",
                        alt: ""
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                            children: "0"
                        })
                    })
                ]
            }),
            auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? /*#__PURE__*/ jsx_runtime_.jsx(AccountQuickLinksMobile, {}) : /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "header__extra",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/account/login",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                        className: "icon-user"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                className: "header__extra",
                onClick: (e)=>setMenuDrawer(true),
                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                    className: "icon-menu"
                })
            })
        ]
    });
}
const MobileHeaderActions_mapStateToProps = (state)=>{
    return state;
};
/* harmony default export */ const modules_MobileHeaderActions = ((0,external_react_redux_.connect)(MobileHeaderActions_mapStateToProps)(MobileHeaderActions));

;// CONCATENATED MODULE: ./src/components/shared/headers/HeaderMobile.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








function HeaderMobile() {
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        className: `header header--mobile ${currentColor}`,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "header__top",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "header__left",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Welcome to Martfury Online Shopping Store !"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "header__right",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "navigation__extra",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {}),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/account/order-tracking",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            children: "Track your order"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(modules_LanguageSwicher, {})
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "navigation--mobile",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "navigation__left",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: "ps-logo",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: url/* imageUrl */.sQ + "?path=storeLogo/&name=Img_1622556897722.png&width=220&height=50",
                                    alt: "picco"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(modules_MobileHeaderActions, {})
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "ps-search--mobile",
                children: /*#__PURE__*/ jsx_runtime_.jsx("form", {
                    className: "ps-form--search-mobile",
                    action: "/",
                    method: "get",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "form-group--nest",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                className: "form-control",
                                type: "text",
                                placeholder: "Search something..."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: "icon-magnifier"
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const headers_HeaderMobile = (HeaderMobile);

;// CONCATENATED MODULE: ./src/components/config.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const PluginComponent = {
    HeaderDefault: headers_HeaderDefault,
    FooterFullwidth: FooterFullwidth/* default */.Z,
    ThemeChanger: themeControl,
    HomeBanner: home_default_HomeBanner,
    HeaderMobile: headers_HeaderMobile
};

;// CONCATENATED MODULE: ./addOns/WidgetsAndProducts/widgetsapi.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
async function WidgetApi(dispatch, setDeals, setLoader) {
    const result = await services/* default.getAll */.Z.getAll("list/widget-list");
    if (result && result.data && result.data.data) {
        setDeals(result.data.data);
        setLoader(true);
    } else {
        setLoader(true);
    }
}
async function WidgetDetailsApi(widget, setWidgets, setLoader) {
    let id = widget.widget;
    const result = await services/* default.get */.Z.get("list/widget-detail", id);
    if (result && result.data && result.data.data) {
        setWidgets(result.data.data);
        setLoader(true);
    } else {
        setLoader(true);
    }
}

// EXTERNAL MODULE: ./src/utilities/product-helper.js
var product_helper = __webpack_require__(6152);
// EXTERNAL MODULE: external "react-i18next"
var external_react_i18next_ = __webpack_require__(9709);
// EXTERNAL MODULE: ./src/components/elements/products/Product.jsx
var Product = __webpack_require__(3923);
// EXTERNAL MODULE: ./addOns/WidgetsAndProducts/widgets.module.scss
var widgets_module = __webpack_require__(5548);
var widgets_module_default = /*#__PURE__*/__webpack_require__.n(widgets_module);
;// CONCATENATED MODULE: ./addOns/WidgetsAndProducts/common.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const apiUrl = (/* unused pure expression or super */ null && ("http://3.109.173.92/backend/api/"));
const imageUrl = "http://3.109.173.92/backend/api/media/image-resize/";
const videoUrl = (/* unused pure expression or super */ null && ("http://3.109.173.92/backend/api//media/video-preview-s3/"));

;// CONCATENATED MODULE: ./addOns/WidgetsAndProducts/TopSelling.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 












function TopSellingDeal({ collections , collectionSlug , data , coreData  }) {
    let viewcurrentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.viewcurrentColor);
    const carouselFullwidth = {
        dots: false,
        infinite: false,
        className: "center",
        speed: 50,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        nextArrow: /*#__PURE__*/ jsx_runtime_.jsx(NextArrow/* default */.Z, {}),
        prevArrow: /*#__PURE__*/ jsx_runtime_.jsx(PrevArrow/* default */.Z, {}),
        lazyload: true,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: false
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    arrows: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: true,
                    infinite: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: true,
                    infinite: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    arrows: true,
                    infinite: false
                }
            }, 
        ]
    };
    const { t  } = (0,external_react_i18next_.useTranslation)("common");
    const products = (0,product_helper/* getColletionBySlug */.o)(collections, collectionSlug);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (widgets_module_default())["ps-product-list"],
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (widgets_module_default())["ps-container"],
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (widgets_module_default())["ps-section__header"],
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (widgets_module_default())["ps-block__left"],
                        children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            children: coreData.widgetTitle
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ps-section__content pscontentarrow",
                    children: data && data.length > 4 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/widgetDetails/[widget]",
                                as: `/widgetDetails/${coreData.widgetSlugName}`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: viewcurrentColor,
                                    style: {
                                        display: "flex",
                                        justifyContent: "right",
                                        right: "150px"
                                    },
                                    children: "View All"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx((external_react_slick_default()), {
                                ...carouselFullwidth,
                                className: "ps-carousel outside today-slider",
                                children: data && data.map((product)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (widgets_module_default()).item,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Product/* default */.Z, {
                                            product: product,
                                            image: product.image && product.image.containerName !== "/" ? imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=400&height=200" : "/static/img/no-image.png"
                                        })
                                    }, product.productId))
                            })
                        ]
                    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-4 col-xs-12",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (widgets_module_default())["product-flow-refurbished"],
                            children: data && data.map((product)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "col-xl-3 col-lg-3",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Product/* default */.Z, {
                                        product: product,
                                        image: product.image && product.image.containerName !== "/" ? imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=400&height=200" : "/static/img/no-image.png"
                                    })
                                }))
                        })
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const TopSelling = ((0,external_react_redux_.connect)((state)=>state.collection)(TopSellingDeal));

// EXTERNAL MODULE: ./src/components/skeleton/skeletonProduct.js
var skeletonProduct = __webpack_require__(8143);
;// CONCATENATED MODULE: ./addOns/WidgetsAndProducts/Allwidgets.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private LimitedSpurtWidgetViewAll
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





function Allwidgets() {
    const dispatch = (0,external_react_redux_.useDispatch)();
    let reloadedheader = (0,external_react_redux_.useSelector)((s)=>s.cart.addproduct);
    const { 0: addonsShow , 1: setAddonsShow  } = (0,external_react_.useState)("");
    const { 0: deals , 1: setDeals  } = (0,external_react_.useState)([]);
    const { 0: loader , 1: setLoader  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        WidgetApi(dispatch, setDeals, setLoader);
        setAddonsShow(JSON.parse(sessionStorage && sessionStorage.getItem("addonsShow")));
    }, [
        reloadedheader
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: loader == true ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
            children: deals && deals && deals.map((deal, index)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                    children: addonsShow && addonsShow?.widget == 1 && /*#__PURE__*/ jsx_runtime_.jsx(TopSelling, {
                        collectionSlug: "top-selling",
                        data: deal.items,
                        coreData: deal
                    })
                }))
        }) : [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ].map((loading)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-3 skele",
                children: /*#__PURE__*/ jsx_runtime_.jsx(skeletonProduct/* default */.Z, {})
            }, loading))
    });
}
/* harmony default export */ const WidgetsAndProducts_Allwidgets = (Allwidgets);

;// CONCATENATED MODULE: ./addOns/WidgetsAndProducts/widgetViewAll.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const SpurtWidgetViewAll = ({ widgetId  })=>{
    const { 0: widgedetail , 1: setWidgets  } = (0,external_react_.useState)([]);
    const { 0: loader , 1: setLoader  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        if (widgetId !== undefined) {
            WidgetDetailsApi(widgetId, setWidgets, setLoader);
        }
    }, [
        widgetId
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
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
                        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                            className: "breadcrumb",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: widgedetail && widgedetail?.widgetTitle
                            })
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ps-shopping",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        class: "ps-shopping__content",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-shopping-product",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "row",
                                children: widgedetail && widgedetail.widgetItems && widgedetail.widgetItems.length > 0 ? widgedetail && widgedetail.widgetItems && widgedetail.widgetItems.map((product)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 ",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(Product/* default */.Z, {
                                            product: product,
                                            image: product.image && product.image.containerName !== "/" ? imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=400&height=200" : "/static/img/no-image.png"
                                        })
                                    }, product.id)) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6,
                                        7,
                                        8
                                    ].map((loading)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-3 skele",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(skeletonProduct/* default */.Z, {})
                                        }, loading))
                                })
                            })
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const widgetViewAll = (SpurtWidgetViewAll);

;// CONCATENATED MODULE: ./addOns/addonsconfig.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

const AddonsComponent = {
    SpurtWidgetsAndProducts: WidgetsAndProducts_Allwidgets,
    SpurtWidgetViewAll: widgetViewAll
};

;// CONCATENATED MODULE: ./src/components/connectPlugins.js
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

const ConnectPlugin = {
    ...PluginComponent,
    ...AddonsComponent
};


/***/ }),

/***/ 1766:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

const NextArrow = (props)=>{
    const { className , onClick , icon  } = props;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: `slick-arrow slick-next ${className}`,
        style: {
            marginRight: "2px"
        },
        onClick: onClick,
        children: icon ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
            className: icon
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            src: "/static/img/arrow-right-colour.svg"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NextArrow);


/***/ }),

/***/ 661:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

const PrevArrow = (props)=>{
    const { className , onClick , icon  } = props;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: `slick-arrow slick-prev ${className}`,
        onClick: onClick,
        children: icon ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
            className: icon
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            src: "/static/img/arrow-left-colour.svg"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrevArrow);


/***/ }),

/***/ 3922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ detail_ProductDetailQuickView)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/components/elements/carousel/NextArrow.jsx
var NextArrow = __webpack_require__(1766);
// EXTERNAL MODULE: ./src/components/elements/carousel/PrevArrow.jsx
var PrevArrow = __webpack_require__(661);
// EXTERNAL MODULE: ./src/components/elements/products/productWishList.jsx
var productWishList = __webpack_require__(6584);
;// CONCATENATED MODULE: ./src/components/elements/detail/modules/thumbnail/ThumbnailQuickView.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 






class ThumbnailQuickView extends external_react_.Component {
    constructor(props){
        super(props);
        this.state = {
            galleryCarousel: null,
            variantCarousel: null
        };
    }
    componentDidMount() {
        this.setState({
            galleryCarousel: this.slider1,
            variantCarousel: this.slider2
        });
    }
    render() {
        const gallerySetting = {
            dots: false,
            infinite: true,
            speed: 400,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: /*#__PURE__*/ jsx_runtime_.jsx(NextArrow/* default */.Z, {}),
            prevArrow: /*#__PURE__*/ jsx_runtime_.jsx(PrevArrow/* default */.Z, {})
        };
        const { product , image , wishListStatus  } = this.props;
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "ps-product__thumbnail",
            "data-vertical": "false",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figure", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "ps-wrapper",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "item",
                            style: {
                                maxHeight: "525px"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    src: image,
                                    width: 600,
                                    height: 600,
                                    objectFit: "contain",
                                    layout: "responsive",
                                    placeholder: "blur",
                                    blurDataURL: "/static/img/no-image.png",
                                    alt: product?.name,
                                    sizes: "margin:auto"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "wishlist-card",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(productWishList/* default */.Z, {
                            productId: product.productId,
                            wishListStatus: wishListStatus
                        })
                    })
                ]
            })
        });
    }
}
/* harmony default export */ const thumbnail_ThumbnailQuickView = (ThumbnailQuickView);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/utilities/product-helper.js
var product_helper = __webpack_require__(6152);
// EXTERNAL MODULE: ./i18n.js
var i18n = __webpack_require__(3192);
// EXTERNAL MODULE: ./src/components/helper/priceHelper.js
var priceHelper = __webpack_require__(5654);
;// CONCATENATED MODULE: ./src/components/elements/detail/modules/information/InformationQuickView.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








function InformationQuickView({ product , compareCheckFunction , handleAddItemToCompare  }) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { 0: compareStatus , 1: setCompareStatus  } = (0,external_react_.useState)(0);
    const { 0: loadings , 1: setloadings  } = (0,external_react_.useState)(false);
    const { t  } = (0,i18n.useTranslation)("common");
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const crumbArray = (0,external_react_redux_.useSelector)((s)=>s.product.crumbarrcate);
    const ProductRoute = (productSlug)=>{
        router_default().push("/product/[pid]", `/product/${productSlug}`);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-product__info",
        style: {
            paddingRight: "20px"
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                style: {
                    fontWeight: 600
                },
                children: product.name
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "qp-cat-container",
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        children: [
                            t("filter.categories"),
                            " :",
                            " ",
                            crumbArray && crumbArray.length !== 0 ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: crumbArray && crumbArray[crumbArray.length - 1].categoryName != undefined ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: crumbArray[crumbArray.length - 1].categoryName
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {})
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: product.categoryLevels !== undefined && product.categoryLevels.length !== 0 && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: product.categoryLevels.at(-1).categoryName
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "qp-content-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                            style: {
                                fontSize: "26px",
                                color: "#000",
                                fontWeight: "600"
                            },
                            children: [
                                "$",
                                " ",
                                product.price === null ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: "0"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: (0,product_helper/* formatCurrency */.x)((0,priceHelper/* priceHelpFunc */.k)(product.price, product.taxType, product.taxValue, ""))
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        title: "Compare",
                        onClick: (e)=>handleAddItemToCompare(e, product.productId),
                        children: compareCheckFunction() ? /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "/static/img/compare-icon.svg",
                            alt: "",
                            style: {
                                width: "32px",
                                height: "32px"
                            }
                        }) : /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "/static/img/compare-arrows.svg",
                            alt: "",
                            style: {
                                width: "32px",
                                height: "32px"
                            }
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        className: `add-to-cart-btn ${currentColor}`,
                        style: {
                            backgroundColor: "blue"
                        },
                        title: "Add to cart",
                        onClick: (e)=>ProductRoute(product.productSlug),
                        children: t("products.AddToCart")
                    })
                ]
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.cart;
};
/* harmony default export */ const information_InformationQuickView = ((0,external_react_redux_.connect)(mapStateToProps)(InformationQuickView));

;// CONCATENATED MODULE: ./src/components/elements/detail/ProductDetailQuickView.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 




const ProductDetailQuickView = ({ product , image , wishListStatus , crumbArray , compareCheckFunction , handleAddItemToCompare  })=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-product--detail ps-product--quickview",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-product__header",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(thumbnail_ThumbnailQuickView, {
                    product: product,
                    image: image,
                    wishListStatus: wishListStatus
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(information_InformationQuickView, {
                    product: product,
                    crumbArray: crumbArray,
                    compareCheckFunction: compareCheckFunction,
                    handleAddItemToCompare: handleAddItemToCompare
                })
            ]
        })
    });
/* harmony default export */ const detail_ProductDetailQuickView = (ProductDetailQuickView);


/***/ }),

/***/ 3923:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _detail_ProductDetailQuickView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3922);
/* harmony import */ var _utilities_product_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6152);
/* harmony import */ var _store_compare_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6011);
/* harmony import */ var _api_url__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4562);
/* harmony import */ var _helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5654);
/* harmony import */ var _api_compare_productCompare__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2561);
/* harmony import */ var _productWishList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6584);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _api_toast_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7708);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3192);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_i18n__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _connectPlugins__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(384);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_13__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 
















function Product({ product , image , currency , crumbArray  }) {
    const { 0: isQuickView , 1: setIsQuickView  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: checkWishList , 1: setCheckWishList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: compareStatus , 1: setCompareStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: loadings , 1: setloadings  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: compareTrues , 1: setTrues  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: valueset , 1: setValueset  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    let currentColor = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((s)=>s.palette.currentColor);
    let wishListData = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((s)=>s.wishlist);
    let wishListStatus = wishListData && wishListData.wishlistItems.some((value)=>value.productId === product.productId);
    const { t  } = (0,_i18n__WEBPACK_IMPORTED_MODULE_11__.useTranslation)("common");
    const customStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(64, 64, 64,55%)"
        },
        content: {
            top: "23%",
            left: "15%",
            right: "27%",
            bottom: "33%",
            backgroundColor: "white"
        }
    };
    const modalWarnings = (type, message)=>{
        (0,_api_toast_index__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP)({
            type: type,
            message: "Cannot add more than 3 product"
        });
    };
    const modalWarning = (type)=>{
        (0,_api_toast_index__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP)({
            type: type,
            message: "Successfully removed a product from compare"
        });
    };
    const handleAddItemToCart = (e, id, price, product)=>{
        next_router__WEBPACK_IMPORTED_MODULE_9___default().push("/product/[pid]", `/product/${product.productSlug}`);
    };
    const handleAddItemToCompare = (e, productId)=>{
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
                dispatch((0,_store_compare_action__WEBPACK_IMPORTED_MODULE_6__/* .getCompareList */ .UU)(1));
                (0,_api_toast_index__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP)({
                    type: "success",
                    message: "Successfully removed a product from compare"
                });
            } else {
                idArray.push(productId);
                e.preventDefault();
                if (idArray && idArray.length > 3) {
                    (0,_api_toast_index__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .ZP)({
                        type: "error",
                        message: "Cannot add more than 3 product"
                    });
                } else {
                    (0,_api_compare_productCompare__WEBPACK_IMPORTED_MODULE_7__/* .productCompareApi */ .r)(idArray, data, dummy, dispatch, setCompareStatus, setloadings, compareTrues, setTrues);
                }
            }
        } else {
            let idArray1 = [];
            let dummy1 = "";
            idArray1.push(productId);
            e.preventDefault();
            if (idArray1 && idArray1.length > 3) {
                modalWarnings("warning");
            } else {
                (0,_api_compare_productCompare__WEBPACK_IMPORTED_MODULE_7__/* .productCompareApi */ .r)(idArray1, data, dummy1, dispatch, setCompareStatus, setloadings, compareTrues, setTrues);
            }
        }
    };
    const handleShowQuickView = (e)=>{
        e.preventDefault();
        setIsQuickView(true);
    };
    const handleHideQuickView = (e)=>{
        e.preventDefault();
        setIsQuickView(false);
    };
    const wishListFunction = ()=>{
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value)=>value.productId === product.productId);
            return wishListStatus ? 1 : 0;
        }
    };
    function compareCheckFunction() {
        let idArray = JSON.parse(localStorage.getItem("compareId"));
        if (idArray && idArray.length !== 0) {
            let compareCheck = idArray.some((value)=>value === product.productId);
            return compareCheck;
        }
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus = wishListData.wishlistItems.some((value)=>value.productId === product.productId);
            setCheckWishList(wishListStatus ? 1 : 0);
        }
    }, [
        wishListData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setCompareStatus(0);
    }, [
        compareStatus
    ]);
    const categorySlug = router.query.categorySlug;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "ps-product slider-product-container",
        children: [
            product.flag !== "" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "cus-dis-tag",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/static/img/discount-tag.png"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: [
                            Math.abs(Math.round((product.price - product.pricerefer) * 100 / product.price)),
                            "%"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "wishlist-card",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_productWishList__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    productId: product.productId,
                    wishListStatus: wishListFunction()
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product__thumbnail",
                children: [
                    categorySlug === undefined ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/product/[pid]",
                        as: `/product/${product.productSlug}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "product-container-whole-project",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_13___default()), {
                                    src: image,
                                    width: 302,
                                    height: 200,
                                    objectFit: "contain",
                                    layout: "responsive",
                                    placeholder: "blur",
                                    blurDataURL: "/static/img/no-image.png",
                                    alt: product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."
                                })
                            })
                        })
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: {
                            pathname: `/product/[pid]`,
                            query: {
                                categorySlug: categorySlug
                            }
                        },
                        as: {
                            pathname: `/product/${product.productSlug}`,
                            query: {
                                categorySlug: categorySlug
                            }
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "product-container-whole-project",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_13___default()), {
                                    src: image,
                                    width: 302,
                                    height: 200,
                                    objectFit: "contain",
                                    layout: "responsive",
                                    placeholder: "blur",
                                    blurDataURL: "/static/img/no-image.png",
                                    alt: product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."
                                })
                            })
                        })
                    }),
                    product.badge ? productBadge : ""
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product__container",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__content product-margin-left-right",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                href: "/product/[pid]",
                                as: `/product/${product.productSlug}`,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: "ps-product__title",
                                    children: product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."
                                })
                            }),
                            _connectPlugins__WEBPACK_IMPORTED_MODULE_12__/* .ConnectPlugin.SpurtRatingAndReview */ .d.SpurtRatingAndReview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_connectPlugins__WEBPACK_IMPORTED_MODULE_12__/* .ConnectPlugin.SpurtRatingAndReview */ .d.SpurtRatingAndReview, {
                                product: product
                            }),
                            product.is_sale === true ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "ps-product__price sale",
                                children: [
                                    currency ? currency.symbol : "$",
                                    (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_14__/* .formatCurrency */ .x)(product.price),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("del", {
                                        className: "ml-2",
                                        children: [
                                            currency ? currency.symbol : "$",
                                            (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_14__/* .formatCurrency */ .x)(product.sale_price)
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: product && product.flag === "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "ps-product__price",
                                    children: product.pricerefer !== "" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            currency ? currency.symbol : "$ ",
                                            " ",
                                            (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(parseInt(product.pricerefer), product.taxType, product.taxValue, 0)
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            currency ? currency.symbol : "$ ",
                                            " ",
                                            product.price == null ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: 0
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_14__/* .formatCurrency */ .x)((0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(parseInt(product.price), JSON.parse(product.taxType), product.taxValue, 0))
                                            })
                                        ]
                                    })
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "ps-product__price",
                                    children: [
                                        product && product.flag === 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            style: {
                                                color: "grey",
                                                marginRight: "10px"
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("del", {
                                                children: [
                                                    currency ? currency.symbol : "$",
                                                    " ",
                                                    (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(product.price, product.taxType, product.taxValue, "")
                                                ]
                                            })
                                        }),
                                        currency ? currency.symbol : "$",
                                        product.pricerefer !== "" ? (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(product.pricerefer, product.taxType, product.taxValue, "") : (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(product.price, product.taxType, product.taxValue, "")
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__content hover",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                href: "/product/[pid]",
                                as: `/product/${product.productSlug}`,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: "ps-product__title",
                                    children: product && product.name
                                })
                            }),
                            product.is_sale === true ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "ps-product__price sale",
                                children: [
                                    currency ? currency.symbol : "$",
                                    (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_14__/* .formatCurrency */ .x)(product.price),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("del", {
                                        className: "ml-2",
                                        children: [
                                            currency ? currency.symbol : "$",
                                            product.sale_price
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                children: product && product.flag === "" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "ps-product__price",
                                    children: [
                                        currency ? currency.symbol : "$",
                                        (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_14__/* .formatCurrency */ .x)(product.price)
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "ps-product__price",
                                    children: [
                                        "$",
                                        product.pricerefer !== "" ? (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(product.pricerefer, product.taxType, product.taxValue, "") : (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_15__/* .priceHelpFunc */ .k)(product.price, product.taxType, product.taxValue, "")
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product__actions",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        title: "Compare",
                        onClick: (e)=>handleAddItemToCompare(e, product.productId),
                        children: compareCheckFunction() ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "/static/img/compare-icon.svg",
                            alt: "",
                            style: {
                                width: "32px",
                                height: "32px"
                            }
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "/static/img/compare-arrows.svg",
                            alt: "",
                            style: {
                                width: "32px",
                                height: "32px"
                            }
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        title: "Quick View",
                        onClick: handleShowQuickView,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "/static/img/eye.svg",
                            alt: "",
                            style: {
                                width: "32px",
                                height: "32px"
                            }
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                        href: "/product/[pid]",
                        as: `/product/${product.productSlug}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            "data-toggle": "tooltip",
                            "data-placement": "top",
                            className: `add-to-cart-btn ${currentColor}`,
                            title: "Add to cart",
                            onClick: (e)=>handleAddItemToCart(e, product.productId, product.price, product),
                            children: t("Shared.AddToCart")
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Modal, {
                title: product.title,
                centered: true,
                footer: null,
                width: 1024,
                onCancel: handleHideQuickView,
                visible: isQuickView,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_detail_ProductDetailQuickView__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    product: product,
                    crumbArray: crumbArray,
                    image: product.image && product.image.containerName !== "/" ? _api_url__WEBPACK_IMPORTED_MODULE_16__/* .imageUrl */ .sQ + "?path=" + product.containerName + "&name=" + product.image + "&width=573&height=673" : "/static/img/no-image.png",
                    compareCheckFunction: compareCheckFunction,
                    handleAddItemToCompare: handleAddItemToCompare,
                    wishListStatus: wishListFunction()
                })
            })
        ]
    });
}
const mapStateToProps = (state)=>{
    return state.setting;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(mapStateToProps)(Product));


/***/ }),

/***/ 6584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _connectPlugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(384);
/* harmony import */ var _api_wishlist_addWishlist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7291);
/* harmony import */ var _store_wishlist_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9751);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _api_wishlist_deleteProduct__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3717);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








function ProductWishList({ productId , wishListStatus  }) {
    const { 0: wishListStatusInfo , 1: setWishListStatusInfo  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(wishListStatus);
    const { 0: likeAnimate , 1: setLikeAnimate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: delStatus , 1: setDelStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
    const handleAddItemToWishlist = (e, productId)=>{
        e.preventDefault();
        let AuthCheck = localStorage.getItem("spurtToken");
        if (AuthCheck) {
            setLikeAnimate((i)=>!i);
            (0,_api_wishlist_addWishlist__WEBPACK_IMPORTED_MODULE_3__/* .AddWishlist */ .X)(productId, dispatch);
            dispatch((0,_store_wishlist_action__WEBPACK_IMPORTED_MODULE_4__/* .addItemToWishlist */ .yK)(1));
        } else {
            next_router__WEBPACK_IMPORTED_MODULE_7___default().push("/account/login");
        }
    };
    const handleRemoveWishlist = (e, productId)=>{
        e.preventDefault();
        (0,_api_wishlist_deleteProduct__WEBPACK_IMPORTED_MODULE_6__/* .delWishApi */ .Y)(productId, setDelStatus);
        setLikeAnimate((i)=>!i);
        dispatch((0,_store_wishlist_action__WEBPACK_IMPORTED_MODULE_4__/* .addItemToWishlist */ .yK)(1));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLikeAnimate(wishListStatus === 1 ? true : false);
    }, [
        wishListStatus
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
        href: "",
        "data-toggle": "tooltip",
        "data-placement": "top",
        style: {
            zIndex: "5"
        },
        title: "Add to wishlist",
        onClick: (e)=>likeAnimate === false ? handleAddItemToWishlist(e, productId) : handleRemoveWishlist(e, productId),
        children: likeAnimate === false ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
            className: "icon-heart"
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
            className: "fa fa-heart",
            style: {
                color: "red"
            }
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductWishList);


/***/ }),

/***/ 1528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ee": () => (/* binding */ cartRemove),
/* harmony export */   "S0": () => (/* binding */ cartAdd),
/* harmony export */   "X1": () => (/* binding */ decrementQuantity),
/* harmony export */   "g1": () => (/* binding */ incrementQuantity)
/* harmony export */ });
/* unused harmony exports quantityIncrement, quantityDecrement */
/* harmony import */ var _api_toast___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7708);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 

function cartAdd(payload, quantity, availValue) {
    let product = payload;
    const localCart = JSON.parse(localStorage.getItem("cartItem"));
    let currentCart = localCart;
    if (currentCart === null) {
        currentCart = [];
    }
    let existItem = currentCart && currentCart.find((item)=>item.productId === product.productId && item.skuName === product.skuName);
    let existItemsArray = currentCart && currentCart.filter((item)=>item.skuName === product.skuName);
    if (existItem) {
        if (product.optionName.length !== 0) {
            let existObject = existItemsArray && existItemsArray.find((item)=>JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString());
            if (existObject !== undefined) {
                existItem = existObject;
            }
        }
        let productOptName = JSON.parse(product.optionName);
        let existOptName = JSON.parse(existItem.optionName);
        if (JSON.stringify(productOptName.optionValueArray) !== JSON.stringify(existOptName.optionValueArray)) {
            product.quantity = quantity;
            currentCart.push(product);
        } else {
            product.quantity = quantity;
            existItem.quantity += product.quantity;
        }
    } else {
        product.quantity = quantity;
        currentCart.push(product);
    }
    return localStorage.setItem("cartItem", JSON.stringify(currentCart));
}
function cartRemove(payload) {
    const product = payload;
    let localCart = JSON.parse(localStorage.getItem("cartItem"));
    if (product && product.optionName && product.optionName.length !== 0) {
        let existItemsArray = localCart && localCart.filter((item)=>item.skuName === product.skuName);
        let existObject = existItemsArray && existItemsArray.find((item)=>JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString());
        let index = localCart.indexOf(existObject);
        localCart.splice(index, 1);
    } else {
        let index1 = localCart.findIndex((item)=>item.skuName === product.skuName);
        if (index1 > -1) {
            localCart.splice(index1, 1);
        }
    }
    return localStorage.setItem("cartItem", JSON.stringify(localCart));
}
function incrementQuantity(payload) {
    const modalWarningLimit = (type)=>{
        (0,_api_toast___WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
            type: type,
            message: "You have reached maximum quantity limit"
        });
    };
    const product = payload;
    let localCart = JSON.parse(localStorage.getItem("cartItem"));
    let selectedItem = localCart.find((item)=>item.skuName === product.skuName);
    if (product && product.productOption && product.productOption.length !== 0) {
        let existItemsArray = localCart && localCart.filter((item)=>item.skuName === product.skuName);
        let existObject = existItemsArray && existItemsArray.find((item)=>JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString());
        existObject.quantity++;
    } else {
        if (selectedItem) {
            if (selectedItem.maxQuantityAllowedCart !== null) {
                if (selectedItem.maxQuantityAllowedCart >= selectedItem.quantity + 1) {
                    selectedItem.quantity++;
                } else {
                    modalWarningLimit("error");
                }
            } else {
                selectedItem.quantity++;
            }
        }
    }
    return localStorage.setItem("cartItem", JSON.stringify(localCart));
}
function decrementQuantity(payload) {
    const product = payload;
    const localCart = JSON.parse(localStorage.getItem("cartItem"));
    let selectedItem = localCart.find((item)=>item.skuName === product.skuName);
    if (product && product.productOption && product.productOption.length !== 0) {
        let existItemsArray = localCart && localCart.filter((item)=>item.skuName === product.skuName);
        let existObject = existItemsArray && existItemsArray.find((item)=>JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString());
        if (existObject.minQuantityAllowedCart !== null) {
            if (existObject.quantity - 1 >= selectedItem.minQuantityAllowedCart) {
                existObject.quantity--;
            }
        } else {
            if (existObject.quantity - 1 >= 1) {
                existObject.quantity--;
            }
        }
    } else {
        if (selectedItem) {
            if (selectedItem.minQuantityAllowedCart !== null) {
                if (selectedItem.quantity - 1 >= selectedItem.minQuantityAllowedCart) {
                    selectedItem.quantity--;
                }
            } else {
                if (selectedItem.quantity - 1 >= 1) {
                    selectedItem.quantity--;
                }
            }
        }
    }
    return localStorage.setItem("cartItem", JSON.stringify(localCart));
}
function quantityIncrement(selectedItem, productTirePrices, quantity) {
    productTirePrices.sort(function(a, b) {
        return a.quantity - b.quantity;
    });
    var min = productTirePrices[0];
    var min2 = productTirePrices[1];
    var min3 = productTirePrices[2];
    var min4 = productTirePrices[3];
    selectedItem.quantity++;
    if (productTirePrices.length === 4) {
        if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
            selectedItem.price = priceHelpFunc(min2.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (quantity + 1 >= min3.quantity && quantity + 1 < min4.quantity) {
            selectedItem.price = priceHelpFunc(min3.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (quantity + 1 >= min4.quantity) {
            selectedItem.price = priceHelpFunc(min4.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
    if (productTirePrices.length === 3) {
        if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
            selectedItem.price = priceHelpFunc(min2.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (quantity + 1 >= min3.quantity) {
            selectedItem.price = priceHelpFunc(min3.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
    if (productTirePrices.length === 2) {
        if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (quantity + 1 >= min2.quantity) {
            selectedItem.price = priceHelpFunc(min2.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
    if (productTirePrices.length === 1) {
        if (quantity + 1 >= min.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
}
function quantityDecrement(selectedItem, productTirePrices, quantity) {
    productTirePrices.sort(function(a, b) {
        return a.quantity - b.quantity;
    });
    var min = productTirePrices[0];
    var min2 = productTirePrices[1];
    var min3 = productTirePrices[2];
    var min4 = productTirePrices[3];
    selectedItem.quantity--;
    if (selectedItem && selectedItem.productTirePrices.length === 4) {
        if (selectedItem.quantity >= selectedItem.quantity && selectedItem.quantity < min2.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity >= min2.quantity && selectedItem.quantity < min3.quantity) {
            selectedItem.price = priceHelpFunc(min2.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity >= min3.quantity && selectedItem.quantity < min4.quantity) {
            selectedItem.price = priceHelpFunc(min3.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity >= min4.quantity) {
            selectedItem.price = priceHelpFunc(min4.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
    if (selectedItem && selectedItem.productTirePrices.length === 3) {
        if (selectedItem.quantity >= min.quantity && selectedItem.quantity < min2.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity >= min2.quantity && selectedItem.quantity < min3.quantity) {
            selectedItem.price = priceHelpFunc(min2.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity + 1 >= min3.quantity) {
            selectedItem.price = priceHelpFunc(min3.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
    if (selectedItem && selectedItem.productTirePrices.length === 2) {
        if (selectedItem.quantity >= min.quantity && selectedItem.quantity < min2.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity >= min2.quantity) {
            selectedItem.price = priceHelpFunc(min2.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
        if (selectedItem.quantity < min.quantity) {
            selectedItem.price = priceHelpFunc(selectedItem.initialPrice, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
    if (selectedItem && selectedItem.productTirePrices.length === 1) {
        if (selectedItem.quantity >= min.quantity) {
            selectedItem.price = priceHelpFunc(min.price, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        } else {
            selectedItem.price = priceHelpFunc(selectedItem.initialPrice, selectedItem.taxType, selectedItem.taxValue, selectedItem.availValue);
        }
    }
}


/***/ }),

/***/ 5654:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ priceHelpFunc)
/* harmony export */ });
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const priceHelpFunc = (price, taxType, taxValue, availValue)=>{
    if (availValue !== "") {
        switch(taxType){
            case 1:
                const priceWithOutTax = parseFloat(price) + parseFloat(taxValue) + parseFloat(availValue);
                return Math.round(priceWithOutTax);
            case 2:
                const percentToAmount = price * (taxValue / 100);
                const priceWithTax = parseFloat(price) + parseFloat(percentToAmount) + parseFloat(availValue);
                return Math.round(priceWithTax);
            default:
                return parseFloat(price) + parseFloat(availValue);
        }
    } else {
        switch(taxType){
            case 1:
                const priceWithOutTax1 = parseFloat(price) + taxValue;
                return Math.round(priceWithOutTax1);
            case 2:
                const percentToAmount1 = price * (taxValue / 100);
                const priceWithTax1 = parseFloat(price) + percentToAmount1;
                return Math.round(priceWithTax1);
            default:
                return price;
        }
    }
};


/***/ }),

/***/ 8761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ footers_FooterFullwidth)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/components/shared/footers/modules/FooterWidgets.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const FooterWidgets = ({ footerDet , footerPage  })=>{
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "ps-footer__widgets",
        style: {
            paddingBottom: "0px"
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ftr-top",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex ftrtop-lft",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("aside", {
                        className: "widget widget_footer",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "ps-custom-footer-container",
                            children: footerPage && footerPage.map((page)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "footer-column-container",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                            className: "",
                                            children: page.groupName
                                        }),
                                        page && page.page.map((pagedet)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/page-detail/[pdid]",
                                                    as: `/page-detail/${pagedet.slugName}`,
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        children: pagedet.title
                                                    })
                                                }, pagedet.pageId)
                                            }))
                                    ]
                                }))
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            style: {
                                color: "white"
                            },
                            children: "Social"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                            className: "ps-list--social",
                            style: {
                                display: "block"
                            },
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        className: "facebook",
                                        href: footerDet.facebook,
                                        target: "_blank",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "/static/img/facebook.png"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        className: "twitter",
                                        href: footerDet.twitter,
                                        target: "_blank",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: "/static/img/twitter.png"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        className: "google-plus",
                                        href: footerDet.google,
                                        target: "_blank"
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "ftrtop-rht",
                    style: {},
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
                        className: "widget widget_footer widget_contact-us",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                className: "widget-title1 footer-color",
                                children: "Contact us"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "widget_content footer-contact-info",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: "footer-color",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                class: "fa fa-map-marker",
                                                "aria-hidden": "true",
                                                style: {
                                                    fontSize: "25px",
                                                    paddingRight: "16px"
                                                }
                                            }),
                                            "  ",
                                            footerDet.storeAddress
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                        className: "footer-color",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                class: "fa",
                                                style: {
                                                    fontSize: "25px",
                                                    paddingRight: "15px"
                                                },
                                                children: ""
                                            }),
                                            footerDet.storeTelephone
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: "footer-color",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                class: "fa fa-envelope",
                                                "aria-hidden": "true",
                                                style: {
                                                    fontSize: "25px",
                                                    paddingRight: "15px",
                                                    color: "white"
                                                }
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                href: "mailto:" + footerDet.storeEmail,
                                                target: "_blank",
                                                children: footerDet.storeEmail
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: "footer-color",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                class: "fa fa-clock-o",
                                                "aria-hidden": "true",
                                                style: {
                                                    fontSize: "25px",
                                                    paddingRight: "15px",
                                                    color: "white"
                                                }
                                            }),
                                            "Mon - Sun / 9:00AM - 8:00PM"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: "google-plus",
                                href: "https://play.google.com/store/apps/details?id=com.piccosoft.spurtcommerce",
                                target: "_blank",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/static/img/playstore.png"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
const mapStateToProps = (state)=>{
    return state = state.setting;
};
/* harmony default export */ const modules_FooterWidgets = ((0,external_react_redux_.connect)(mapStateToProps)(FooterWidgets));

;// CONCATENATED MODULE: ./src/components/shared/footers/modules/FooterLinks.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 



const Links = {
    consumerElectric: [
        {
            text: "Air Conditioners",
            url: "/shop"
        },
        {
            text: "Audios & Theaters",
            url: "/shop"
        },
        {
            text: "Car Electronics",
            url: "/shop"
        },
        {
            text: "Office Electronics",
            url: "/shop"
        },
        {
            text: "TV Televisions",
            url: "/shop"
        },
        {
            text: "Washing Machines",
            url: "/shop"
        }
    ],
    clothingAndApparel: [
        {
            text: "Printers",
            url: "/shop"
        },
        {
            text: "Projectors",
            url: "/shop"
        },
        {
            text: "Scanners",
            url: "/shop"
        },
        {
            text: "Store &amp; Business",
            url: "/shop"
        },
        {
            text: "4K Ultra HD TVs",
            url: "/shop"
        },
        {
            text: "LED TVs",
            url: "/shop"
        },
        {
            text: "OLED TVs",
            url: "/shop"
        }
    ],
    gardenAndKitchen: [
        {
            text: "Cookware",
            url: "/shop"
        },
        {
            text: "Decoration",
            url: "/shop"
        },
        {
            text: "Furniture",
            url: "/shop"
        },
        {
            text: "Garden Tools",
            url: "/shop"
        },
        {
            text: "Garden Equipments",
            url: "/shop"
        },
        {
            text: "Powers And Hand Tools",
            url: "/shop"
        },
        {
            text: "Utensil & Gadget",
            url: "/shop"
        }
    ],
    healthAndBeauty: [
        {
            text: "Hair Care",
            url: "/shop"
        },
        {
            text: "Decoration",
            url: "/shop"
        },
        {
            text: "Makeup",
            url: "/shop"
        },
        {
            text: "Body Shower",
            url: "/shop"
        },
        {
            text: "Skin Care",
            url: "/shop"
        },
        {
            text: "Cologine",
            url: "/shop"
        },
        {
            text: "Perfume",
            url: "/shop"
        }
    ],
    jewelryAndWatch: [
        {
            text: "Necklace",
            url: "/shop"
        },
        {
            text: "Pendant",
            url: "/shop"
        },
        {
            text: "Diamond Ring",
            url: "/shop"
        },
        {
            text: "Sliver Earing",
            url: "/shop"
        },
        {
            text: "Leather Watcher",
            url: "/shop"
        },
        {
            text: "Gucci",
            url: "/shop"
        }
    ],
    computerAndTechnology: [
        {
            text: "Desktop PC",
            url: "/shop"
        },
        {
            text: "Laptop",
            url: "/shop"
        },
        {
            text: "Smartphones",
            url: "/shop"
        },
        {
            text: "Tablet",
            url: "/shop"
        },
        {
            text: "Game Controller",
            url: "/shop"
        },
        {
            text: "Audio & Video",
            url: "/shop"
        },
        {
            text: "Wireless Speaker",
            url: "/shop"
        }
    ]
};
const FooterLinks = ()=>/*#__PURE__*/ _jsxs("div", {
        className: "ps-footer__links",
        children: [
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    /*#__PURE__*/ _jsx("strong", {
                        children: "Consumer Electric:"
                    }),
                    Links.consumerElectric.map((item)=>/*#__PURE__*/ _jsx(Link, {
                            href: item.url,
                            children: /*#__PURE__*/ _jsx("a", {
                                children: item.text
                            })
                        }, item.text))
                ]
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    /*#__PURE__*/ _jsx("strong", {
                        children: "Clothing & Apparel:"
                    }),
                    Links.clothingAndApparel.map((item)=>/*#__PURE__*/ _jsx(Link, {
                            href: item.url,
                            children: /*#__PURE__*/ _jsx("a", {
                                children: item.text
                            })
                        }, item.text))
                ]
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    /*#__PURE__*/ _jsx("strong", {
                        children: "Home, Garden & Kitchen:"
                    }),
                    Links.gardenAndKitchen.map((item)=>/*#__PURE__*/ _jsx(Link, {
                            href: item.url,
                            children: /*#__PURE__*/ _jsx("a", {
                                children: item.text
                            })
                        }, item.text))
                ]
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    /*#__PURE__*/ _jsx("strong", {
                        children: "Health & Beauty:"
                    }),
                    Links.healthAndBeauty.map((item)=>/*#__PURE__*/ _jsx(Link, {
                            href: item.url,
                            children: /*#__PURE__*/ _jsx("a", {
                                children: item.text
                            })
                        }, item.text))
                ]
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    /*#__PURE__*/ _jsx("strong", {
                        children: "Jewelry & Watches:"
                    }),
                    Links.jewelryAndWatch.map((item)=>/*#__PURE__*/ _jsx(Link, {
                            href: item.url,
                            children: /*#__PURE__*/ _jsx("a", {
                                children: item.text
                            })
                        }, item.text))
                ]
            }),
            /*#__PURE__*/ _jsxs("p", {
                children: [
                    /*#__PURE__*/ _jsx("strong", {
                        children: "Computer & Technologies:"
                    }),
                    Links.computerAndTechnology.map((item)=>/*#__PURE__*/ _jsx(Link, {
                            href: item.url,
                            children: /*#__PURE__*/ _jsx("a", {
                                children: item.text
                            })
                        }, item.text))
                ]
            })
        ]
    });
/* harmony default export */ const modules_FooterLinks = ((/* unused pure expression or super */ null && (FooterLinks)));

;// CONCATENATED MODULE: ./src/components/shared/footers/modules/FooterCopyright.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


const FooterCopyright = ()=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "ps-footer__copyright",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    display: "flex",
                    flexDirection: "row"
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "footer-color",
                    style: {
                        marginLeft: "40px"
                    },
                    children: "\xa9 2019-2023 Spurtcommerce eSolutions Pvt Limited."
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {})
        ]
    });
/* harmony default export */ const modules_FooterCopyright = (FooterCopyright);

;// CONCATENATED MODULE: ./src/components/shared/footers/FooterFullwidth.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 





const FooterFullwidth = ()=>/*#__PURE__*/ jsx_runtime_.jsx("footer", {
        className: "ps-footer",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-container",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(modules_FooterWidgets, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(modules_FooterCopyright, {})
            ]
        })
    });
/* harmony default export */ const footers_FooterFullwidth = (FooterFullwidth);


/***/ }),

/***/ 9255:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _connectPlugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(384);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9931);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api_url__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4562);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helper_cartHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1528);
/* harmony import */ var _store_cart_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5848);
/* harmony import */ var _helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5654);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3981);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3192);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_i18n__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _store_colorPalette_action__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(969);
/* harmony import */ var _utilities_product_helper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6152);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_13__);
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 


















function CartPopup({ showMiniCart , setShowMiniCart , cartData  }) {
    const { 0: dummy , 1: setDummy  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const { t  } = (0,_i18n__WEBPACK_IMPORTED_MODULE_10__.useTranslation)("common");
    const { 0: auth , 1: setAuth  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const customStyles = {
        overlay: {
            zIndex: 1099,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(0, 0, 0,.85)"
        },
        content: {
            zIndex: 1099,
            top: "0%",
            left: "65%",
            right: "0%",
            bottom: "0%",
            WebkitOverflowScrolling: "touch",
            border: "none",
            background: "none"
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (localStorage.getItem("spurtToken")) {
            setAuth(true);
        }
    }, []);
    const closeModal = ()=>{
        dispatch((0,_store_colorPalette_action__WEBPACK_IMPORTED_MODULE_12__/* .displayWhenclose */ .HL)("block"));
        setShowMiniCart(false);
    };
    function quantityTotal() {
        let tempValue = 0;
        let currentValue = 0;
        cartData && cartData.map((current)=>{
            currentValue = tempValue + current.quantity;
            tempValue = currentValue;
        });
        return tempValue;
    }
    function cartTotal() {
        let tempValue = 0;
        let currentValue = 0;
        cartData && cartData.map((current)=>{
            currentValue = tempValue + current.quantity * current.price;
            tempValue = currentValue;
        });
        return tempValue;
    }
    const handleRemoveFromCart = (product)=>{
        if (auth) {
            (0,_api__WEBPACK_IMPORTED_MODULE_8__/* .removeFromCartApi */ .tT)(product.productId, product.price, "", product.skuName, product.variantId, product.variantName);
        }
        (0,_helper_cartHelper__WEBPACK_IMPORTED_MODULE_6__/* .cartRemove */ .Ee)(product);
        dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_7__/* .removeItem */ .cl)(product));
    };
    const handleIncreaseItemQty = (product)=>{
        (0,_helper_cartHelper__WEBPACK_IMPORTED_MODULE_6__/* .incrementQuantity */ .g1)(product);
        dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_7__/* .increaseItemQty */ .zb)(product));
        dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_7__/* .addItem */ .jX)(1));
        if (auth) {
            const localCart = JSON.parse(localStorage.getItem("cartItem"));
            let currentProduct = localCart.find((current)=>{
                return current.productId === product.productId;
            });
            if (product.flag === "") {
                (0,_api__WEBPACK_IMPORTED_MODULE_8__/* .addToCartApi */ .kL)(product.productId, (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__/* .priceHelpFunc */ .k)(product.price, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
            } else {
                (0,_api__WEBPACK_IMPORTED_MODULE_8__/* .addToCartApi */ .kL)(product.productId, (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__/* .priceHelpFunc */ .k)(product.pricerefer, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
            }
        }
    };
    const handleDecreaseItemQty = (product)=>{
        if (product.quantity !== 1) {
            (0,_helper_cartHelper__WEBPACK_IMPORTED_MODULE_6__/* .decrementQuantity */ .X1)(product);
            dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_7__/* .decreaseItemQty */ .WG)(product));
            dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_7__/* .addItem */ .jX)(1));
            if (auth) {
                const localCart = JSON.parse(localStorage.getItem("cartItem"));
                let currentProduct = localCart.find((current)=>{
                    return current.productId === product.productId;
                });
                if (product.flag === "") {
                    (0,_api__WEBPACK_IMPORTED_MODULE_8__/* .addToCartApi */ .kL)(product.productId, (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__/* .priceHelpFunc */ .k)(product.price, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
                } else {
                    (0,_api__WEBPACK_IMPORTED_MODULE_8__/* .addToCartApi */ .kL)(product.productId, (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__/* .priceHelpFunc */ .k)(product.pricerefer, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName);
                }
            }
        } else {
            if (auth) {
                (0,_api__WEBPACK_IMPORTED_MODULE_8__/* .removeFromCartApi */ .tT)(product.productId, product.price, "", product.skuName);
            }
            (0,_helper_cartHelper__WEBPACK_IMPORTED_MODULE_6__/* .cartRemove */ .Ee)(product);
            dispatch((0,_store_cart_action__WEBPACK_IMPORTED_MODULE_7__/* .removeItem */ .cl)(product));
        }
    };
    const checkoutPageRedirect = ()=>{
        next_router__WEBPACK_IMPORTED_MODULE_9___default().push("/account/checkout");
        dispatch((0,_store_colorPalette_action__WEBPACK_IMPORTED_MODULE_12__/* .displayWhenclose */ .HL)("block"));
        setShowMiniCart(false);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_modal__WEBPACK_IMPORTED_MODULE_4___default()), {
        isOpen: showMiniCart,
        onRequestClose: (e)=>closeModal(e),
        style: customStyles,
        contentLabel: "Example Modal",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "cartpop-container",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_11___default()), {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Cart"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "cartpop-header",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "cartpop-back-container",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                onClick: (e)=>{
                                    e.preventDefault();
                                    closeModal();
                                },
                                children: "<" + t("cart.Back")
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: t("cart.ShoppingCart")
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                            children: [
                                " ",
                                t("cart.YourItem"),
                                " - ",
                                quantityTotal(),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                    href: "/account/shopping-cart",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        onClick: (e)=>closeModal(e),
                                        children: "View Cart"
                                    })
                                })
                            ]
                        })
                    ]
                }),
                cartData && cartData.length !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "cartpop-table-container",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("table", {
                        children: cartData && cartData.map((data)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                        className: "cartpop-table-data cart-data-img",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_13___default()), {
                                            src: data.productImage && data.productImage[0] && data.productImage[0].containerName !== "/" ? _api_url__WEBPACK_IMPORTED_MODULE_15__/* .imageUrl */ .sQ + "?path=" + data.productImage[0].containerName + "&name=" + data.productImage[0].image + "&width=500&height=500" : "/static/img/no-image.png",
                                            width: 84,
                                            height: 84,
                                            objectFit: "contain",
                                            layout: "responsive",
                                            placeholder: "blur",
                                            blurDataURL: "/static/img/no-image.png"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        className: "cartpop-table-data",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "cart-remove-button",
                                                onClick: (e)=>handleRemoveFromCart(data),
                                                children: "x"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                children: data.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "cartpop-action-row",
                                                children: [
                                                    data.variantName !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            "Variant: ",
                                                            data.variantName
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "custom-product-quant",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "custom-product-box",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                    onClick: (e)=>handleDecreaseItemQty(data),
                                                                    children: "-"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    children: data.quantity
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                    onClick: (e)=>handleIncreaseItemQty(data),
                                                                    children: "+"
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "cartpop-action-price",
                                                        children: [
                                                            data.flag !== "" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                children: [
                                                                    " $ ",
                                                                    (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_16__/* .formatCurrency */ .x)(data.quantity * (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__/* .priceHelpFunc */ .k)(data.pricerefer, data.taxType, data.taxValue, ""))
                                                                ]
                                                            }),
                                                            data.flag === "" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                children: [
                                                                    " $ ",
                                                                    (0,_utilities_product_helper__WEBPACK_IMPORTED_MODULE_16__/* .formatCurrency */ .x)(data.quantity * (0,_helper_priceHelper__WEBPACK_IMPORTED_MODULE_14__/* .priceHelpFunc */ .k)(data.price, data.taxType, data.taxValue, ""))
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }))
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "cartpop-empty-container",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: "/static/img/cart-empty.svg"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: t("EmptyCart")
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: t("NoItemsInYourCart")
                        })
                    ]
                }),
                cartData && cartData.length !== 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "cartpop-footer-container",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            className: "cartpop-checkout-button",
                            onClick: (e)=>checkoutPageRedirect(),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: "/static/img/checkout.svg"
                                }),
                                t("cart.Checkout")
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                            children: [
                                t("TOTAL "),
                                " : $ ",
                                cartTotal()
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartPopup);


/***/ }),

/***/ 2942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
// import './skeleton.css';

const Skeleton = ({ type  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "skeleton",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: type,
            children: " "
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Skeleton);


/***/ }),

/***/ 8143:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2942);


// import './skeleton.css';
const SkeletonProduct = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "skeleton-wrapper",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Skeleton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                type: "thumbnail"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Skeleton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                type: "text-lg"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Skeleton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                type: "text-md"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Skeleton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                type: "text-sm"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "shimmer-wrapper",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "shimmer"
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkeletonProduct);


/***/ }),

/***/ 6250:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "ni": () => (/* binding */ logOut),
/* harmony export */   "x4": () => (/* binding */ login)
/* harmony export */ });
/* unused harmony exports loginSuccess, logOutSuccess */
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION"
};
function login() {
    return {
        type: actionTypes.LOGIN_REQUEST
    };
}
function loginSuccess() {
    return {
        type: actionTypes.LOGIN_SUCCESS
    };
}
function logOut() {
    return {
        type: actionTypes.LOGOUT
    };
}
function logOutSuccess() {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
}


/***/ }),

/***/ 969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HL": () => (/* binding */ displayWhenclose),
/* harmony export */   "Hp": () => (/* binding */ actionTypes),
/* harmony export */   "_2": () => (/* binding */ colorShowContent),
/* harmony export */   "jh": () => (/* binding */ colorThemeCurrent),
/* harmony export */   "oA": () => (/* binding */ viewcolorThemeCurrent)
/* harmony export */ });
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ const actionTypes = {
    COLOR_SHOW: "COLOR_SHOW",
    COLOR_THEME: "COLOR_THEME",
    COLOR_VIEW: "COLOR_VIEW",
    DISPLAY_PANEL: "DISPLAY_PANEL"
};
function colorShowContent(payload) {
    return {
        type: actionTypes.COLOR_SHOW,
        payload: payload
    };
}
function colorThemeCurrent(payload) {
    return {
        type: actionTypes.COLOR_THEME,
        payload: payload
    };
}
function viewcolorThemeCurrent(payload) {
    return {
        type: actionTypes.COLOR_VIEW,
        payload: payload
    };
}
function displayWhenclose(payload) {
    return {
        type: actionTypes.DISPLAY_PANEL,
        payload: payload
    };
}


/***/ }),

/***/ 6152:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ getColletionBySlug),
/* harmony export */   "x": () => (/* binding */ formatCurrency)
/* harmony export */ });
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {}
}
function getColletionBySlug(collections, slug) {
    if (collections && collections.length > 0) {
        const result = collections.find((item)=>item.slug === slug.toString());
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}


/***/ })

};
;