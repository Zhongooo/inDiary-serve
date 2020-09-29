//前端
const md5=require('../middlewares/md5')
const uuid=require('../middlewares/uuid')
const jwt=require('jsonwebtoken')
const userDao = require('../service/user_dao')
const fs=require('fs');
var moment = require('moment');

module.exports = {
  login:async (ctx, next) => {
    const id = ctx.query.user_id
    const pass = ctx.query.password
    console.log('try:'+pass)
    const user = await userDao.getUserInfo(id)
    console.log('usersolt:'+user.solt)
    // 判断用户是否存在
    if(!user){
      ctx.body = {
        code:-1,
        message:'该用户不存在'
      };
      return;
    }
    let md5pass = await md5.MD5(pass,user.solt)
    if(md5pass === user.password){
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
    }},
  register:async (ctx, next) => {
    const user_id = ctx.query.phone
    const password = ctx.query.password
    console.log('try:'+password)
    const user = await userDao.findUser(user_id)
    if(user){
      ctx.body={
        code:0,
        msg:'该手机号已注册过'
      }
    }else{
      let solt=uuid.uuid();
      let MDpassword=await md5.MD5(password,solt);
      await userDao.AddUser(user_id,MDpassword,solt);
        ctx.body={
          code:1,
          msg:'注册成功啦'
        }
      }
    },
    saveinfo:async (ctx,next)=>{
      const user = ctx.query;
      console.log(user.username,user.sex,user.age)
      const save=await userDao.saveInfo(user.user_id,user.username,user.sex,user.age);
      if(save){
        ctx.body={
          code:1
        }
      }else{
        ctx.body={
          code:0
        }
      }
    },
    getInfo:async(ctx,next)=>{
      const id=ctx.query.user_id;
      const user = await userDao.getUserInfo(id);
      if(user){
        ctx.body = {
          code:1,
          user:user
        }
      }else{
        ctx.body={
          code:-1
        }
      }
    },
    uploadPortrait:async(ctx,next)=>{
      const id = ctx.params.id
      const file=ctx.request.files.file;
      var obj=JSON.stringify(ctx.request.files);
      const reader = fs.createReadStream(file.path);
      let filePath = 'G:/koaS/koaPass/public/images'+ `/${file.name}`;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      const picpath= `${file.name}`;
      const upload=await userDao.uploadPortrait(id,picpath)
      if(upload){
        ctx.body={
          msg:'保存成功!'
      }
    }
    },
    saveDiary:async(ctx)=>{
      const diarycontent=ctx.query;
      const res = await userDao.saveDiary(diarycontent.user_id,diarycontent.weather,
        diarycontent.mood,diarycontent.title,diarycontent.content,diarycontent.time,diarycontent.realwea,diarycontent.drafts);
      const find=await userDao.findDiaryid(diarycontent.user_id,diarycontent.title,diarycontent.time)
        if(res){
          ctx.body={code:1,resid:find}
        }else{
          ctx.body={code:-1}
        }
    },
    //日记本、草稿箱拿日记列表
    getDiaryList:async(ctx)=>{
      const req=ctx.query;
      if(req.time){
        const res = await userDao.getDiaryListcal(req.user_id,req.drafts,req.time);
        if(res){
          ctx.body={
            code:1,
            list:res
          }
        }else{
          ctx.body={
            code:-1
          }
        }
      }
      else{
        const res = await userDao.getDiaryList(req.user_id,req.drafts);
        if(res){
          ctx.body={
            code:1,
            list:res
          }
        }else{
          ctx.body={
            code:-1
          }
        }
      }
      
    },
    uploadDiaryPhoto:async(ctx)=>{
      const id = ctx.params.id;
      const file=ctx.request.files.file;
      var obj=JSON.stringify(ctx.request.files);
      const reader = fs.createReadStream(file.path);
      let filePath = 'G:/koaS/koaPass/public/diaryimg'+ `/${file.name}`;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      const picpath= `${file.name}`;
      // var time = moment().format('YYYY-MM-DD HH:mm:ss');
      const upload=await userDao.uploadDiaryphoto(id,picpath)
      if(upload){
        ctx.body={
          msg:'保存成功!'
      }
    }
    },
    setpwd:async(ctx)=>{
      const id = ctx.query.user_id;
      const pwd=ctx.query.pwd;
      const res=await userDao.setpwd(id,pwd);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    saveAnniversary:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.saveAnniversary(req.user_id,req.content,req.time,req.icon);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    getAnniversary:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.getAnniversary(req.user_id);
      console.log(res[0]);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    getTimeline:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.getTimeline(req.user_id,req.wea);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    getdetail:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.getdetail(req.id);
      if(res){
        ctx.body={
          code:1,
          data:res
        }
      }
    },
    savedetail:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.savedetail(req.id,req.content);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    resubmitDiary:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.resubmitDiary(req.id,req.drafts);
      console.log('666:'+res)
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    todelDiary:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.todelDiary(req.id);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    getAllmoodpush:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.getAllmoodpush(req.user_id);
      if(res){
        ctx.body={
          code:1,
          data:res
        }
      }
    },
    getmoodPushContent:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.getmoodPushContent(req.id);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    uploadDiaryPhoto:async(ctx)=>{
      const id = ctx.params.id;
      const file=ctx.request.files.file;
      var obj=JSON.stringify(ctx.request.files);
      const reader = fs.createReadStream(file.path);
      let filePath = 'G:/koaS/koaPass/public/diaryimg'+ `/${file.name}`;
      const upStream = fs.createWriteStream(filePath);
      reader.pipe(upStream);
      const picpath= `${file.name}`;
      // var time = moment().format('YYYY-MM-DD HH:mm:ss');
      const upload=await userDao.uploadDiaryphoto(id,picpath)
      if(upload){
        ctx.body={
          msg:'保存成功!'
      }
    }
    },
    uploadTreePhoto:async(ctx)=>{
      const user_id=ctx.params.user_id;
      const title=ctx.params.title;
      const content=ctx.params.content;
      await userDao.addTree(user_id,title,content);
      const res=await userDao.findTreeid(user_id);
      console.log('tree:'+res[0].id);
      const id=res[0].id;
      const file=ctx.request.files.file;
      var obj=JSON.stringify(ctx.request.files);
      console.log('file:'+file.length);
      console.log('obj:'+obj);
      for(var i=0;i<file.length;i++){
        const reader = fs.createReadStream(file[i].path);
        let filePath = 'G:/koaS/koaPass/public/tree'+ `/${file[i].name}`;
        const upStream = fs.createWriteStream(filePath);
        reader.pipe(upStream);
        const picpath= `${file[i].name}`; 
        console.log('path:'+picpath)
        await userDao.uploadTreephoto(id,picpath)
          ctx.body={
            msg:'保存成功!'
          }
      }
    },
    addTreeMain:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.addTree(req.user_id,req.title,req.content);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    userOpinion:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.userOpinion(req.user_id,req.id,req.value,req.content);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    getTreeList:async(ctx)=>{
      const res=await userDao.getTreeList();
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    getHotList:async(ctx)=>{
      const res=await userDao.getHotList();
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    getAllMsg:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.getAllMsg(req.user_id,req.active);
      if(res){
        ctx.body={
          code:1,
          data:res
        }
      }
    },
    delMsg:async(ctx)=>{
      const req=ctx.query;
      const res=await userDao.delMsg(req.id);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    getTreeDetail:async(ctx)=>{
      const tree_id=ctx.query.tree_id;
      const res=await userDao.getTreeDetail(tree_id);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    getUserTree:async(ctx)=>{
      const user_id=ctx.query.user_id;
      const res=await userDao.getUserTree(user_id);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    addComment:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.addComment(data.tree_id,data.user_id,data.content);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    getComment:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.getComment(data.tree_id);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    Thumbs:async(ctx)=>{
      const data=ctx.query;
      if(data.handle=='add'){
        await userDao.addThumbs(data.tree_id,data.user_id);
      }else if(ctx.query.handle=='decrease'){
        await userDao.decThumbs(data.tree_id,data.user_id);
      }
      ctx.body={
        code:1
      }
    },
    getThumbs:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.getThumbs(data.tree_id,data.user_id);
      console.log('thumbs:'+res)
      if(res){
        ctx.body={
          code:1
        }
      }else{
        ctx.body={
          code:-1
        }
      }
    },
    getThumbsUser:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.getThumbsUser(data.user_id);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    delDot:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.delDot(data.id);
      if(res){
        ctx.body={
          code:1
        }
      }
    },
    findDot:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.findDot(data.user_id);
      if(res){
        ctx.body={
          code:1
        }
      }else{
        ctx.body={
          code:0
        }
      }
    },
    CommentThumbs:async(ctx)=>{
      const data=ctx.query;
      const res=await userDao.CommentThumbs(data.user_id);
      if(res){
        ctx.body={
          code:1,
          list:res
        }
      }
    },
    commentCount:async(ctx)=>{
      const data=ctx.query;
      if(data.handle=='add'){
        await userDao.addCommentThumbs(data.comment_id,data.user_id);
      }else if(ctx.query.handle=='decrease'){
        await userDao.decCommentThumbs(data.comment_id,data.user_id);
      }
      ctx.body={
        code:1
      }
    },
}