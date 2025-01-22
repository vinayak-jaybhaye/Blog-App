const protectedRoutes = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/signin')
    }
    return next()
}

export { protectedRoutes }