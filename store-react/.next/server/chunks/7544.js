exports.id = 7544;
exports.ids = [7544];
exports.modules = {

/***/ 7544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(6029)


/***/ }),

/***/ 6029:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return _utils.AppInitialProps;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return _utils.NextWebVitalsMetric;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return _utils.AppType;
    }
});
__webpack_unused_export__ = void 0;
var _async_to_generator = (__webpack_require__(932)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(2648)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(6689));
var _utils = __webpack_require__(9232);
function appGetInitialProps(_) {
    return _appGetInitialProps.apply(this, arguments);
}
function _appGetInitialProps() {
    _appGetInitialProps = /**
 * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
 * This allows for keeping state between navigation, custom error handling, injecting additional data.
 */ _async_to_generator(function*({ Component , ctx  }) {
        const pageProps = yield (0, _utils).loadGetInitialProps(Component, ctx);
        return {
            pageProps
        };
    });
    return _appGetInitialProps.apply(this, arguments);
}
var _Component;
class App extends (_Component = _react.default.Component) {
    render() {
        const { Component , pageProps  } = this.props;
        return /*#__PURE__*/ _react.default.createElement(Component, Object.assign({}, pageProps));
    }
}
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
__webpack_unused_export__ = App; //# sourceMappingURL=_app.js.map


/***/ })

};
;