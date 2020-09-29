//后台管理系统
const userDao = require('../service/user_dao')
const jwt=require('jsonwebtoken')
const fs=require('fs');
var moment = require('moment'); 
module.exports = {
    login:async (ctx, next) => {
        const id = ctx.query.user_id
        const pass = ctx.query.password
        console.log('try:'+pass)
        const user = await userDao.getUserInfo(id)
        // 判断用户是否存在
        if(!user){
          ctx.body = {
            code:-1,
            message:'该用户不存在'
          };
          return;
        }
        // let md5pass = await md5.MD5(pass,user.solt)
      //  if(user.role_id==1){
        if(pass === user.password){
          const payload = {
            user_id: user.user_id,
            user_name: user.user_name
          };
          const token = jwt.sign(payload, "gamercode", {
            expiresIn:3600
          });
          ctx.body = {
            code:1,
            message: '验证成功',
            token:'Bearer ' + token,
            userInfo:user
          }
        }else{
          ctx.body = {
            code:0,
            message:'密码错误'
          }
        }
      //  }
      //  else{
      //   ctx.body = {
      //     code:-100,
      //     message:'不是管理员'
      //   };
      //   return;
      //  }
    },
    getUsers:async (ctx, next) => {
      const result=await userDao.getUsers();
      ctx.body={
        code:'1',
        users:result
      }
    },
    delUser:async(ctx)=>{
      const id = ctx.query.id;
      await userDao.delUser(id);
      ctx.body={
        code:'1',
      }
    },
    getmood:async(ctx)=>{
      const result=await userDao.getmood();
      var obj=JSON.stringify(result[0]);
      console.log('result:'+obj);
      ctx.body={
        code:'1',
        users:result
      }
    },
    getmoodUser:async(ctx)=>{
      const req=ctx.query;
      console.log('~:'+req.user_id)
      const result=await userDao.getUserInfo(req.user_id);
      ctx.body={
        code:'1',
        users:result
      }
    },
    pushmood:async(ctx)=>{
      const req=ctx.query;
      await userDao.pushmood(req.user_id,req.radio);
      await userDao.changestate(req.user_id);
      ctx.body={
        code:'1'
      }
    },
    searchpush:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.searchpush(req.pushstart,req.radio);
      console.log('moodpush:'+res);
      if(res==null){
        ctx.body={
          code:'1'
        }
      }else if(res!=null){
        ctx.body={
          code:'0'
        }
      }
    },
    uploadpushimg:async(ctx,next)=>{
      const radio = ctx.params.radio;
      const covertitle = ctx.params.title;
      const covercontent=ctx.params.content;
      const file=ctx.request.files.file;
      var obj=JSON.stringify(ctx.request.files);
      const reader = fs.createReadStream(file.path);
      let filePath = 'G:/koaS/koaPass/public/moodpush'+ `/${file.name}`;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      const picpath= `${file.name}`;
      const pushstart=moment().week(moment().week()).startOf('week').format('YYYY-MM-DD');
      const upload=await userDao.uploadpushimg(radio,covertitle,covercontent,pushstart,picpath)
      if(upload){
        ctx.body={
          msg:'保存成功!'
      }
    }
    },
    addpush:async(ctx,next)=>{
      const req=ctx.query;
      const res=await userDao.findpush(req.radio,req.pushstart);
      console.log('moodpush:'+res.content);
      if(res.content!=null){
        ctx.body={
          code:'1'
        }
      }else if(res.content==null){
        await userDao.addpush(req.radio,req.pushstart,req.content);
        ctx.body={
          code:'0'
        }
      }
    },
    findweekPush:async(ctx,next)=>{
      const req=ctx.query;
      const res=await userDao.findweekPush(req.user_id);
      console.log('look:'+res)
      if(res==null){
        ctx.body={
          code:'1'
        }
      }else if(res!=null){
        ctx.body={
          code:'0',
          mood:res
        }
      }
    },
    systemMsg:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.systemMsg(req.user_id);
      if(res){
        ctx.body={
          code:1
        }
      }
    }
}