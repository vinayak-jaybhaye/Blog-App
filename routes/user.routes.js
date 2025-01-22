import { Router } from 'express'

import { userSignup, userSignin, userLogout } from '../controllers/user.controllers.js'


const router = Router()

router.route('/signup').get((req, res) => {
    return res.render('signup');
})
    .post(userSignup)


router.route('/signin').get((req, res) => {
    return res.render('signin')
})
    .post(userSignin)

router.route('/logout').get(userLogout)
router.route('/profile').get((req, res) => {
    return res.render('error')
})

export default router;