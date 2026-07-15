const isAuthenticated = (req, res, next) => {
    // If the user is not logged in, we reject the request and kick them out
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access.");
    }
    next();
};

module.exports = {
    isAuthenticated
};