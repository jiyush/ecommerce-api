const registerController = {
    register(req,res,next){
        console.log('test');
       res.json({msg:"node API"}).send();
    }
}
export default registerController;