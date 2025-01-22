import { validateToken } from "../utils/authenttication.js"

const checkForAuthCookie = (cookieName) =>{
    return (req, res, next) =>{
        const token = req.cookies[cookieName]
        if(!token){
           return next()
        }
       try {
         const payload = validateToken(token)
         req.user = payload
       } catch (error) { 
        console.log(error)
       }
       return next()
    }
}

export {checkForAuthCookie}