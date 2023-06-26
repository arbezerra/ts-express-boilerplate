import passport from "passport"

const isLoggedIn = () => {
    return passport.authenticate("jwt", { session: false });
}

export default isLoggedIn;