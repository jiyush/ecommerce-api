import Joi from "joi";
// import CustomErrorHandle from ".../"
const registerController = {
    register(req,res,next){

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
            const exist = "";
            if(exist){
                // return next(CustomErrorHandle.)
            }
        }catch(err){

        }
        
       res.json({msg:"node API"});
    }
}
export default registerController;