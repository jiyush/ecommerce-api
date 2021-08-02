import Joi from "joi";
import CustomErrorHandle from "../../services/CustomErrorHandler";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService";
import { User } from "../../Models";

const loginController = {
    async login(req, res, next){
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(), 
        });

        const  {error} = loginSchema.validate(req.body);

        if(error){
            return next(error);
        }
        
        try{
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return next(CustomErrorHandle.doesNotExist('Wrong Email or password'));
            }
            const match = await bcrypt.compare(req.body.password,user.password);
            if(!match){
                return next(CustomErrorHandle.doesNotExist('Wrong Email or password'));
            }
          const access_token = JwtService.sign({id: user._id, role: user.role});
          res.json({access_token});
        }catch(error){
            return next(error);
        }
        
    }
}

export default loginController;