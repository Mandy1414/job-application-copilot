"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const User_1 = require("../models/User");
const setupPassport = (app) => {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Serialize user for session
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    // Deserialize user from session
    passport_1.default.deserializeUser(async (id, done) => {
        try {
            const user = await User_1.User.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error, undefined);
        }
    });
    // Google OAuth Strategy
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        passport_1.default.use(new passport_google_oauth20_1.Strategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User_1.User.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                }
                // Check if user exists with same email
                user = await User_1.User.findOne({ email: profile.emails?.[0]?.value });
                if (user) {
                    // Link Google account to existing user
                    user.googleId = profile.id;
                    await user.save();
                    return done(null, user);
                }
                // Create new user
                user = new User_1.User({
                    googleId: profile.id,
                    email: profile.emails?.[0]?.value,
                    firstName: profile.name?.givenName,
                    lastName: profile.name?.familyName,
                    avatar: profile.photos?.[0]?.value,
                    provider: 'google',
                });
                await user.save();
                done(null, user);
            }
            catch (error) {
                done(error, undefined);
            }
        }));
    }
    // GitHub OAuth Strategy
    if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
        passport_1.default.use(new passport_github2_1.Strategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/api/auth/github/callback',
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User_1.User.findOne({ githubId: profile.id });
                if (user) {
                    return done(null, user);
                }
                // Check if user exists with same email
                user = await User_1.User.findOne({ email: profile.emails?.[0]?.value });
                if (user) {
                    // Link GitHub account to existing user
                    user.githubId = profile.id;
                    await user.save();
                    return done(null, user);
                }
                // Create new user
                user = new User_1.User({
                    githubId: profile.id,
                    email: profile.emails?.[0]?.value,
                    firstName: profile.displayName?.split(' ')[0],
                    lastName: profile.displayName?.split(' ')[1],
                    avatar: profile.photos?.[0]?.value,
                    provider: 'github',
                });
                await user.save();
                done(null, user);
            }
            catch (error) {
                done(error, undefined);
            }
        }));
    }
};
exports.setupPassport = setupPassport;
//# sourceMappingURL=passport.js.map