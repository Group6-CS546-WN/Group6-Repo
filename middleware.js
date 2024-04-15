const ensureAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

// Middleware for admin routes
const ensureAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).render('error', { errorMessage: "Access Denied: You do not have permission to view this page." });
    }
    next();
}

const checkLogoutAccess = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

const logger = (req, res, next) => {
    const currentTimestamp = new Date().toUTCString();
    const authStatus = req.session.user ? "Authenticated User" : "Non-Authenticated User";
    console.log(`[${currentTimestamp}]: ${req.method} ${req.originalUrl} (${authStatus})`);
    next();
};


module.exports = {
    logger,
    ensureAuthenticated,
    ensureAdmin,
    checkLogoutAccess
};