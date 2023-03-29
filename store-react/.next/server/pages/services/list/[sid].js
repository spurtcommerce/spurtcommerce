"use strict";
(() => {
var exports = {};
exports.id = 614;
exports.ids = [614];
exports.modules = {

/***/ 5275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
// EXTERNAL MODULE: ./src/components/shared/modal/EnquiryPop.jsx
var EnquiryPop = __webpack_require__(2251);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
;// CONCATENATED MODULE: ./src/components/partials/account/ServiceList.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 










function ServiceListInfo(setting) {
    const router = (0,router_.useRouter)();
    let CatName = router.query.category;
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const { 0: showModal , 1: setShowModal  } = (0,external_react_.useState)(false);
    const { SubMenu  } = external_antd_.Menu;
    const forceServiceRoute = (service)=>{
        router_default().push(`/services/list/[sid]?category=${service.name}`, `/services/list/${service.serviceCategoryId}?category=${service.name}`, {
            query: {
                category: service.name
            }
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "sl--outer-layout",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "service-row",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-lg-3 col-md-2",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
                        className: "widget widget_shop",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                className: "widget-title",
                                children: "All Services"
                            }),
                            setting.servicelist.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu, {
                                style: {
                                    width: 256
                                },
                                defaultSelectedKeys: [
                                    setting.categoryId
                                ],
                                mode: "inline",
                                children: setting.servicelist.map((service)=>{
                                    if (service.children) {
                                        return /*#__PURE__*/ jsx_runtime_.jsx(SubMenu, {
                                            title: service.name,
                                            children: service && service.children && service.children.map((subservice, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                                    onClick: (e)=>forceServiceRoute(subservice),
                                                    children: subservice.name
                                                }, JSON.stringify(subservice.serviceCategoryId)))
                                        }, JSON.stringify(service.serviceCategoryId));
                                    } else {
                                        return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                            onClick: (e)=>forceServiceRoute(service),
                                            children: service.name
                                        }, JSON.stringify(service.serviceCategoryId));
                                    }
                                })
                            }) : "No Category"
                        ]
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "col-lg-9 col-md-10",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "service-page-content",
                            style: {
                                padding: "20px 0px"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "service-header-ps",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    children: CatName
                                })
                            })
                        }),
                        setting.servelistLoader === false && setting.seviceInfo.length === 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "servlist-content-store",
                            style: {
                                padding: "20px 20px"
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx("center", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: "/static/img/404.jpg"
                                })
                            })
                        }) : "",
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "",
                            children: setting.servelistLoader === false ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: setting.seviceInfo.map((info, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "servlist-content-store",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(EnquiryPop/* default */.Z, {
                                                showModal: showModal,
                                                setShowModal: setShowModal,
                                                serviceId: info.serviceId
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 ",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "ps-block--category-2",
                                                    "data-mh": "categories",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                            href: {
                                                                pathname: "/services/detail/[did]",
                                                                query: {
                                                                    category: info.title
                                                                }
                                                            },
                                                            as: {
                                                                pathname: `/services/detail/${setting.categoryId}`,
                                                                query: {
                                                                    category: CatName
                                                                }
                                                            },
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "ps-block__thumbnail ",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                        src: info.serviceImage ? url/* imageUrl */.sQ + "?path=" + info.serviceImage.containerName + "&name=" + info.serviceImage.image : "/static/img/no-image.png"
                                                                    })
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                            className: "ps-block__content",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                                    href: {
                                                                        pathname: "/services/detail/[did]",
                                                                        query: {
                                                                            category: CatName
                                                                        }
                                                                    },
                                                                    as: {
                                                                        pathname: `/services/detail/${setting.categoryId}`,
                                                                        query: {
                                                                            category: CatName
                                                                        }
                                                                    },
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                                            children: info.title
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h6", {
                                                                    children: [
                                                                        "$",
                                                                        info.price
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("h6", {
                                                                    children: info.description
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "service-enq-button",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                        onClick: (e)=>setShowModal(true),
                                                                        className: `${currentColor}`,
                                                                        children: "Enquiry"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }, index)
                                        ]
                                    }, info.serviceId))
                            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "servlist-content-store",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("center", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: "/static/img/spurt-original-loader.gif",
                                        style: {
                                            margin: "50px 0px"
                                        }
                                    })
                                })
                            })
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const ServiceList = ((0,external_react_redux_.connect)((state)=>state.setting)(ServiceListInfo));

// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/services/list/[sid].jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 










const ServiceListDisplay = ({ query  })=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    const router = (0,router_.useRouter)();
    const { 0: servelistLoader , 1: setServelistLoader  } = (0,external_react_.useState)(true);
    const network = (0,NetworkCheck/* default */.Z)();
    (0,external_react_.useEffect)(()=>{
        if (network === false) {
            router_default().push("/network-error");
        }
    }, []);
    let categoryId = router.query.sid;
    const breadCrumb = [
        {
            text: "Home",
            url: "/"
        },
        {
            text: "Service Category",
            url: "/services"
        },
        {
            text: "Services"
        }
    ];
    (0,external_react_.useEffect)(()=>{
        router_default().events.on("routeChangeStart", (url)=>{
            const nextPid = url.split("/").pop();
            const nid = nextPid.substring(0, 2);
            if (nid !== "" && isNaN(parseInt(nid)) === false) {
                setServelistLoader(true);
                (0,api/* getServiceListApi */.w2)(dispatch, nid, setServelistLoader);
            }
        });
    }, []);
    (0,external_react_.useEffect)(()=>{
        let categoryId = router.query.sid;
        (0,api/* getServiceListApi */.w2)(dispatch, categoryId, setServelistLoader);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "service-layout--default",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-service--custom",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                    breacrumb: breadCrumb,
                    layout: "fullwidth"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(ServiceList, {
                    categoryId: categoryId,
                    servelistLoader: servelistLoader
                })
            ]
        })
    });
};
/* harmony default export */ const _sid_ = (ServiceListDisplay);
ServiceListDisplay.getInitialProps = async (ctx)=>({
        query: ctx.query
    });


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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,229], () => (__webpack_exec__(5275)));
module.exports = __webpack_exports__;

})();