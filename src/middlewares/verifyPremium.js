import jwt from "jsonwebtoken";
import UserDao from "../daos/mongodb/user.dao.js";
import config from "../config/config.js";

const UserDao = new UserDao();
const SECRET_KEY = config.SECRET_KEY_JWT;

export const verifyPremium =  async (req, res, next) => {
    try{
        const token = req.cookies.token;
        const decode = jwt.verify(token, SECRET_KEY);
        console.log('TOKEN DECODIFICADO');
        console.log(decode);
        const user = await UserDao.getById(decode.userId);
        if(user.role === 'premium'){
            next()
        } else {
           return res.status(401).json({ msg: "Unauthorized" });
         }
     
    }catch(error){
        return res.status(401).json({ msg: "Unauthorized" });
    }
  };