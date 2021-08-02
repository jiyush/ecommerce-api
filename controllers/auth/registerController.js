import Joi from "joi";
import { User } from "../../Models";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService";
import CustomErrorHandle from "../../services/CustomErrorHandler";

const registerController = {
    async register(req,res,next){

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            repeat_password: Joi.ref('password')
        });

        const {error} = registerSchema.validate(req.body);

        if(error){
            return next(error);
        }

        try{
            const exist = await User.exists({email: req.body.email});
            if(exist){
                return next(CustomErrorHandle.emailAlreadyExist('This Email is already exist..!'));
            }
        }catch(err){
            return next(err);
        }

        const {name,email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        
        let access_token;
        try{
            const result = await user.save();

            access_token = JwtService.sign({id: result._id, role: result.role});

        }catch(err){
            return next(err);
        }
        
       res.json({access_token:access_token});
    }
}
export default registerController;