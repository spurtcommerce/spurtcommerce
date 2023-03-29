"use strict";
(() => {
var exports = {};
exports.id = 71;
exports.ids = [71];
exports.modules = {

/***/ 8975:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _did_)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/connectPlugins.js + 33 modules
var connectPlugins = __webpack_require__(384);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./src/api/index.js + 43 modules
var api = __webpack_require__(3981);
// EXTERNAL MODULE: ./src/components/shared/modal/EnquiryPop.jsx
var EnquiryPop = __webpack_require__(2251);
// EXTERNAL MODULE: ./src/api/url.js
var url = __webpack_require__(4562);
;// CONCATENATED MODULE: ./src/components/partials/account/ServiceDetail.jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 








function ServiceDetailComp(setting) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const { SubMenu  } = external_antd_.Menu;
    const router = (0,router_.useRouter)();
    let CatName = router.query.category;
    let currentColor = (0,external_react_redux_.useSelector)((s)=>s.palette.currentColor);
    const { 0: showModal , 1: setShowModal  } = (0,external_react_.useState)(false);
    // useEffect(()=>{
    //     getServiceApi(dispatch)
    // },[])
    const forceServiceRoute = (service)=>{
        router_default().push(`/services/list/[sid]?category=${service.name}`, `/services/list/${service.serviceCategoryId}?category=${service.name}`, {
            query: {
                category: service.name
            }
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "service-det-custom",
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
                                children: "Services"
                            }),
                            setting.servicelist.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu, {
                                style: {
                                    width: 256
                                },
                                mode: "inline",
                                children: setting.servicelist.map((service)=>{
                                    if (service.children) {
                                        return /*#__PURE__*/ jsx_runtime_.jsx(SubMenu, {
                                            title: service.name,
                                            children: service && service.children && service.children.map((subservice, i)=>/*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                                    onClick: (e)=>forceServiceRoute(subservice),
                                                    children: subservice.name
                                                }, subservice.categoryId))
                                        }, service.categoryId);
                                    } else {
                                        return /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Menu.Item, {
                                            onClick: (e)=>forceServiceRoute(service),
                                            children: service.name
                                        }, service.categoryId);
                                    }
                                })
                            }) : "No Category"
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "col-lg-9 col-md-10",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "service-page-content",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "service-header-ps",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                    children: [
                                        CatName,
                                        " "
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "service-content-right",
                                children: setting.servelistLoader === false ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "service-conin",
                                        children: setting.seviceInfo.map((info)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "img-detail-service",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(EnquiryPop/* default */.Z, {
                                                                showModal: showModal,
                                                                setShowModal: setShowModal,
                                                                serviceId: info.serviceId
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                src: info.serviceImage ? url/* imageUrl */.sQ + "?path=" + info.serviceImage.containerName + "&name=" + info.serviceImage.image : "/static/img/no-image.png"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "title-detail-service",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                                children: info.title
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                children: info.description
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "phone-serv-egtvr",
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "phone-internal-feild",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                                        children: "Phone Number"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                        children: info.mobile
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                className: "phone-internal-feild",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                                                        children: "Status"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                                        children: info.isActive === 1 ? "Active" : "Inactive"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "service-detail-submt-enquiry",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: currentColor,
                                                            onClick: (e)=>setShowModal(true),
                                                            children: "Enquire now"
                                                        })
                                                    })
                                                ]
                                            }))
                                    })
                                }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "servlist-content-store",
                                    style: {
                                        border: "none"
                                    },
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
                })
            ]
        })
    });
}
/* harmony default export */ const ServiceDetail = ((0,external_react_redux_.connect)((state)=>state.setting)(ServiceDetailComp));

// EXTERNAL MODULE: ./src/components/elements/BreadCrumb.jsx
var BreadCrumb = __webpack_require__(4578);
// EXTERNAL MODULE: ./src/components/reusable/NetworkCheck.jsx
var NetworkCheck = __webpack_require__(6478);
;// CONCATENATED MODULE: ./src/pages/services/detail/[did].jsx
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  SpurtCommerce E-solutions Private Limited
* Author Piccosoft Software Labs Pvt Ltd <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/ 









function ServiceInfoDetail() {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const router = (0,router_.useRouter)();
    const { 0: servelistLoader , 1: setServelistLoader  } = (0,external_react_.useState)(true);
    let categoryId = router.query.did;
    const network = (0,NetworkCheck/* default */.Z)();
    (0,external_react_.useEffect)(()=>{
        if (network === false) {
            router_default().push("/network-error");
        }
    }, []);
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
        let categoryId = router.query.did;
        (0,api/* getServiceListApi */.w2)(dispatch, categoryId, setServelistLoader);
    }, []);
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
            text: "Service Detail"
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "service-layout--default",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "ps-service--custom",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(BreadCrumb/* default */.Z, {
                    breacrumb: breadCrumb,
                    layout: "fullwidth"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(ServiceDetail, {
                    categoryId: categoryId,
                    servelistLoader: servelistLoader
                })
            ]
        })
    });
}
/* harmony default export */ const _did_ = (ServiceInfoDetail);


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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,3981,384,4578,229], () => (__webpack_exec__(8975)));
module.exports = __webpack_exports__;

})();