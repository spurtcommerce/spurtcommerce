"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const passport_1 = tslib_1.__importDefault(require("passport"));
require("../config/passport");
class AuthController {
    constructor() {
        // ---
    }
    login(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/login', {
                title: 'Login',
                layout: 'pages/layouts/auth',
            });
        });
    }
    postLogin(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.assert('email', 'Email is not valid').isEmail();
            req.assert('password', 'Password cannot be blank').notEmpty();
            req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
            const errors = req.validationErrors();
            if (errors) {
                req.flash('errors', errors);
                return res.redirect('login');
            }
            passport_1.default.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash('errors', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (error) => {
                    if (error) {
                        return next(error);
                    }
                    req.flash('success', { msg: 'Success! You are logged in.' });
                    res.redirect(req.session.returnTo || 'home');
                });
            })(req, res, next);
        });
    }
    logout(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.logout();
            res.redirect('/');
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map