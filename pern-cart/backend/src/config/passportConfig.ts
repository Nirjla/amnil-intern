import passport, { Profile } from "passport";
import passportGoogle from "passport-google-oauth20"
const GoogleStrategy = passportGoogle.Strategy
import dotenv from "dotenv"
import { AppDataSource } from "../db/dataSource";
import { User } from "../entity/User.entity";
import { IUser } from "../interfaces/interfaces";
dotenv.config()
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env
passport.use(
      new GoogleStrategy({
            clientID: CLIENT_ID as string,
            clientSecret: CLIENT_SECRET as string,
            callbackURL: CALLBACK_URL as string
      },
            async (accessToken, refreshToken, profile: Profile, done) => {
                  try {
                        console.log('Access Token:', accessToken);
                        console.log('Profile:', profile);
                        console.log('Refresh Token:', refreshToken);
                        const userRepository = AppDataSource.getRepository(User);

                        let existingUser = await userRepository.findOne({ where: { google_id: profile.id } });

                        if (!existingUser) {
                              const newUser = userRepository.create({
                                    google_id: profile.id,
                                    name: profile.displayName,
                                    email: profile.emails?.[0].value,
                              });

                              existingUser = await userRepository.save(newUser);
                        }

                        done(null, existingUser);
                  } catch (err) {
                        done(err);
                  }



            }
      )
)


passport.serializeUser((user, done) => {
      done(null, user)
})

passport.deserializeUser(async (userData: User, done) => {
      try {
            const userRepo = AppDataSource.getRepository(User);

            const user = await userRepo.findOne({ where: { id: userData.id } });

            if (user) {
                  done(null, user);
            } else {
                  done(new Error("User not found"), null);
            }
      } catch (err) {
            done(err, null);
      }
})