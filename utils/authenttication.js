import JWT from 'jsonwebtoken'


const secret = process.env.SECRET || "akfalkfdal";

const createToken =(user) =>{
    const paylaod = {
        _id : user._id,
        username : user.username,
        email : user.email,
        role : user.role
    }
    
    const token =JWT.sign(paylaod, secret)

    return token
}

const validateToken = (token) =>{
    const paylaod =  JWT.verify(token, secret)
    return paylaod
}


export {validateToken, createToken}