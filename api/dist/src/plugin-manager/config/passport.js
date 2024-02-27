"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.isAuthenticated = void 0;
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_local_1 = tslib_1.__importDefault(require("passport-local"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const typeorm_1 = require("typeorm");
const User_1 = require("../../api/core/models/User");
const class_transformer_1 = require("class-transformer");
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.userId);
});
passport_1.default.deserializeUser((id, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getManager)().getRepository(User_1.User);
    try {
        const user = yield userRepository.findOne(id);
        if (!user) {
            return done(new Error('user not found'));
        }
        done(undefined, user);
    }
    catch (e) {
        done(e);
    }
}));
/**
 * Sign in using Email and Password.
 */
passport_1.default.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getManager)().getRepository(User_1.User);
    const user = yield userRepository.findOne({
        where: {
            username: email,
            deleteFlag: 0,
            userGroupId: 1,
        }, relations: ['usergroup'],
    });
    if (!user) {
        return done(undefined, false, { message: [`Email ${email} not found.`] });
    }
    if (yield User_1.User.comparePassword(user, password)) {
        if (user.usergroup.isActive === 0) {
            return done(new Error('Inactive Role'));
        }
        return done(undefined, (0, class_transformer_1.instanceToPlain)(user));
    }
    else {
        return done(undefined, false, { message: ['Invalid email or password.'] });
    }
})));
/**
 * Login Required middleware.
 */
let isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
exports.isAuthenticated = isAuthenticated;
/**
 * Authorization Required middleware.
 */
let isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    if (lodash_1.default.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=passport.js.map