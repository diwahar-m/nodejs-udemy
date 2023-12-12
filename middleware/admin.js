// middleware/admin.js
module.exports = function (req, res, next) {
    // 401 Unauthorized ( not having a valid token)
    // 403 Forbidden ( has valid token, but specific users only allowed)
    if (!req.user.isAdmin) return res.status(403).send('Access denied');

    next();
}