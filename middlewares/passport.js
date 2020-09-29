const passport=require('koa-passport')
var JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const jwt=require('jsonwebtoken')
const userDao=require('../service/user_dao')

//jwt
const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();//token
opts.secretOrKey='gamercode'
passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{
    const user=await userDao.getUserInfo(jwt_payload.user_id);
    if(user){
        done(null,user);
    }else{
        done(null,false)
    }
}))


module.exports=passport