import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { checkForAuthCookie } from './middlewares/authenticate.middleware.js';
import { getAllBlogs } from './controllers/blog.controller.js';
import connectDB from './utils/mongodb.js'


const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Specify the views directory
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get('/', getAllBlogs);


//import routes
import userRouter from './routes/user.routes.js'
import blogRouter from './routes/blog.routes.js'


//set routes
app.use('/user', userRouter)
app.use('/blog', blogRouter)

const PORT = process.env.PORT || 8000

connectDB().then(() =>{
    app.listen(PORT, () =>{
        console.log("Server started on port : ", PORT)
    })
}).catch(err =>{
    console.log("error while connecting to db", err)
})
