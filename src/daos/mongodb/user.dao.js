//import  {createHash, isValidPassword}  from  '../utils';
import { UserModel } from './models/user.model.js';
import MongoDao from './mongo.dao.js';

export default class UserDao extends MongoDao{
  constructor(){
    super(UserModel);
  }
    async registerUser(user) {
        // console.log('userDao:::', user);
        try {
          const { email, password } = user;
          const existUser = await UserModel.findOne({ email });
          if (!existUser) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
              return await UserModel.create({
                ...user,
                password: createHash(password),
                role: "admin",
              });
            }
            return await UserModel.create({
              ...user,
              password: createHash(password),
            });
          } else return false;
        } catch (error) {
          console.log(error);
        }
      }
    
      async loginUser(user) {
        try {
          const { email, password } = user;
          const userExist = await UserModel.findOne({ email });
          if (userExist) {
            const isValid = isValidPassword(password, userExist);
            console.log('isValid__', isValid);
            if (!isValid) return false;
            else return userExist;
            // !isValid ? false : userExist
          } return false;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }
      async createUser(user) {
        try {
          const { email, password } = user;
          const existUser = await UserModel.findOne({email});
          if(!existUser){
            if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
              return await UserModel.create({
                ...user,
                password: createHash(password),
                role: 'admin'
            });
            } 
              return await UserModel.create({
                  ...user,
                  password: createHash(password),
              });
            } else return false;
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }
        }


    async getById(id) {
        try {
            const userExist = await UserModel.findById(id)
            // console.log(userExist);
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
          throw new Error(error)
        }
    }
   
    

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({ email });
            // console.log(userExist);
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    async updateLastConnection(userId) {
      try {
        const currentDate = new Date();
        await this.model.findByIdAndUpdate(userId, { lastConnection: currentDate });
      } catch (error) {
        throw new Error(error.message);
      };
    };
  
    async deleteInactiveUsers() {
      try {
        const inactiveUsers = await this.model.find({ lastConnection: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } });
        await this.model.deleteMany({ _id: { $in: inactiveUsers.map(user => user._id) } });
        return inactiveUsers;
  
      } catch (error) {
        throw new Error(error.message);
      };
    };
  
    updateImg = async (userId, imagePath) => {
      try {
        const updatedUser = await this.model.findOneAndUpdate(
          { _id: userId },
          { $set: { image: imagePath } },
          { new: true }
        );
        if (userId.role != "admin" || userId.role != "premium") {
          const updatedUser = await this.model.findOneAndUpdate(
            { _id: userId },
            { $set: { role: 'premium' } },
            { new: true }
          );
          return updatedUser;
        }
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    };
}