const jwt = require("jsonwebtoken");
const controllers = require("../controllers/Controllers")
require("dotenv").config();

// decodes the token if present on each request 
function authenticate_token(req, res, next) {
    const unprotectedPaths = ["/signup", "/login"]
    if (!(unprotectedPaths.includes(req.path))) {
        const cookies = req.cookies;
        if (cookies && cookies.token) {

            try {
                const payload = jwt.verify(cookies.token, process.env.SECRET_KEY);
                req.user = payload.data;

            } catch (err) {
                res.clearCookie("token");
                return res.status(400)  // Invalid JWT token
            }

        }
        else {
            req.user = undefined;
        }
    }

    next();
}

// verifies the jwt payload
function authorize_user(req, res, next) {
    const unprotectedPaths = ["/signup", "/login"]
    if (!(unprotectedPaths.includes(req.path))) {
        if (req.user && req.user.uuid && req.user.email && req.user.name) {
            next();
        }
        else {
            res.clearCookie("token");
            res.user = undefined;
            return res.status(400);  // User not authenticated, Can't access route!
        }
    } else {
        next();
    }
}

module.exports = {
    authenticate_token,
    authorize_user,
    
};