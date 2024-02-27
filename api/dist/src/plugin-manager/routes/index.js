"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER = void 0;
const tslib_1 = require("tslib");
const AuthRouter_1 = require("./AuthRouter");
const HomeRouter_1 = require("./HomeRouter");
const CashondeliveryRouter_1 = require("./CashondeliveryRouter");
const PaypalRouter_1 = require("./PaypalRouter");
const RazorpayRouter_1 = require("./RazorpayRouter");
const GmailRouter_1 = require("./GmailRouter");
const FacebookRouter_1 = require("./FacebookRouter");
const StripeRouter_1 = require("./StripeRouter");
// API keys and Passport configuration
const passportConfig = tslib_1.__importStar(require("../config/passport"));
const globalMiddleware = tslib_1.__importStar(require("../middlewares/environment"));
exports.ROUTER = [
    {
        handler: AuthRouter_1.AuthRoute,
        middleware: [globalMiddleware.index],
        path: '/',
    },
    {
        handler: HomeRouter_1.HomeRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/home',
    },
    {
        handler: CashondeliveryRouter_1.cashOnDeliveryRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/CashOnDelivery',
    },
    {
        handler: PaypalRouter_1.PaypalRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/paypal',
    },
    {
        handler: PaypalRouter_1.PaypalNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/paypal-payment',
    },
    {
        handler: GmailRouter_1.GmailRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/gmail',
    },
    {
        handler: GmailRouter_1.GmailNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/gmail-login',
    },
    {
        handler: FacebookRouter_1.FacebookRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/facebook',
    },
    {
        handler: FacebookRouter_1.FacebookNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/facebook-login',
    },
    {
        handler: RazorpayRouter_1.RazorpayRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/razorpay',
    },
    {
        handler: RazorpayRouter_1.RazorpayNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/razorpay-payment',
    },
    {
        handler: StripeRouter_1.StripeRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/stripe',
    },
    {
        handler: StripeRouter_1.StripeNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/stripe-payment',
    },
];
//# sourceMappingURL=index.js.map