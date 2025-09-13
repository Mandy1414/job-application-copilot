import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Application } from 'express';
import { User, IUser } from '../models/User';

export const setupPassport = (app: Application): void => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  });

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/auth/google/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
          try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
              return done(null, user);
            }

            // Check if user exists with same email
            user = await User.findOne({ email: profile.emails?.[0]?.value });

            if (user) {
              // Link Google account to existing user
              user.googleId = profile.id;
              await user.save();
              return done(null, user);
            }

            // Create new user
            user = new User({
              googleId: profile.id,
              email: profile.emails?.[0]?.value,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              avatar: profile.photos?.[0]?.value,
              provider: 'google',
            });

            await user.save();
            done(null, user);
          } catch (error) {
            done(error, undefined);
          }
        }
      )
    );
  }

  // GitHub OAuth Strategy
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: '/api/auth/github/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
          try {
            let user = await User.findOne({ githubId: profile.id });

            if (user) {
              return done(null, user);
            }

            // Check if user exists with same email
            user = await User.findOne({ email: profile.emails?.[0]?.value });

            if (user) {
              // Link GitHub account to existing user
              user.githubId = profile.id;
              await user.save();
              return done(null, user);
            }

            // Create new user
            user = new User({
              githubId: profile.id,
              email: profile.emails?.[0]?.value,
              firstName: profile.displayName?.split(' ')[0],
              lastName: profile.displayName?.split(' ')[1],
              avatar: profile.photos?.[0]?.value,
              provider: 'github',
            });

            await user.save();
            done(null, user);
          } catch (error) {
            done(error, undefined);
          }
        }
      )
    );
  }
};