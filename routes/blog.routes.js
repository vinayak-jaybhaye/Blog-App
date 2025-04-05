import Router from 'express'
import { addBlog, getBlog, blogComment } from '../controllers/blog.controller.js'
import upload from '../utils/upload.js'
import { protectedRoutes } from '../middlewares/protectedRoutes.middleware.js'


const router = Router()

router.route('/addblog').get(protectedRoutes, (req, res) => {
    res.render("addBlog", {
        user: req.user
    })
}).post(upload.single('coverImage'), addBlog)

router.route('/:id').get(getBlog)

router.route('/comment/:id').post(protectedRoutes, blogComment);


export default router;