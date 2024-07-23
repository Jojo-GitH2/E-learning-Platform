module.exports = (req, res, next) => {
    if (req.user.role !== 'creator') return res.status(403).json({ msg: 'Access denied' });
    next();
};
