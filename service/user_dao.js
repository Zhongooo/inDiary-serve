const {user,comment,diary,message,reply,role,tree,complaint,anniversary,moodpush,pushcontent,tree_picture,thumbs,commentThumb} = require('../models/index') 

const {Op} = require('sequelize')
var Sequelize = require("sequelize")
var moment = require('moment'); 

class userDao {
    static async getUserInfo(user_id) {
        return await user.findOne({
            where: {
                user_id:user_id
            }
        })
    }
    static async getUsers(){
        return await user.findAll({
            where:{
                role_id:2
            }
        })
    }
    static async delUser(id){
        return await user.destroy({
            where:{
                user_id:id
            }
        })
    }
    static async findUser(user_id){
        return await user.findOne({
            where:{
                user_id:user_id
            }
        })
    }
    static async AddUser(id,pwd,solt){
        return await user.create({
            user_id:id,
            password:pwd,
            solt:solt,
            role_id:2,
            headpic:good.jpg
        })
    }
    static async getmood(){
        return await diary.findAll({
            where:{
                mood:'难过',
                time:{
                    [Op.gt]:moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'),
                    [Op.lt]:moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')
                },           
            },
            include:[{
                model:user,
                attributes:['user_name','headpic','sex','age','moodpushed','pushstart']
            }],
            attributes:['user_id','mood', [Sequelize.fn('COUNT', Sequelize.col('mood')), 'moodcount']], 
            group:'user_id'},
            )
    }
    static async saveInfo(id,username,sex,age){
        return await user.update(
            {
                user_name:username,
                sex:sex,
                age:age
            },
            {
                where:{user_id:id}
            }
          )
    }
    static async uploadPortrait(id,picpath){
        return await user.update({
            headpic:picpath
        },
        {
            where:{user_id:id}
        })
    }
    static async saveDiary(user_id,weather,mood,title,content,time,realwea,drafts){
        return await diary.create({
            user_id:user_id,
            weather:weather,
            mood:mood,
            title:title,
            content:content,
            time:time,
            picture:'bg.jpg',
            realwea:realwea,
            drafts:drafts
        })
    }
    static async findDiaryid(user_id,title,time){
        return await diary.findOne({
            where:{
                user_id:user_id,
                title:title,
                time:time,
            },
            attributse:['id']
        })
    }
    static async uploadDiaryphoto(id,picpath){
        return await diary.update({
            picture:picpath
        },
        {
            where:{id:id}
        })
    }
    static async getDiaryList(user_id,drafts){
        return await diary.findAll({
            order:[ ['time', 'DESC']],
            where:{
                user_id:user_id,
                drafts:drafts,
            }
        })
    }
    static async getDiaryListcal(user_id,drafts,times){
        return await diary.findAll({
            order:[ ['time', 'DESC']],
            where:{
                user_id:user_id,
                drafts:drafts,
                time:{
                    [Op.gt]:times,
                    [Op.lt]:moment(times).add('day',1).format('YYYY-MM-DD')
                }
            }
            
        })
    }
    static async setpwd(user_id,pwd){
        return await user.update({
            diarypwd:pwd
        },
        {
            where:{user_id:user_id}
        })
    }
    static async saveAnniversary(user_id,content,time,icon){
        return await anniversary.create({
            user_id:user_id,
            content:content,
            time:time,
            icon:icon
        })
    }
    static async getTimeline(user_id,wea){
        return await diary.findAll({
            order:[ ['time', 'DESC']],
            where:{
                user_id:user_id,
                weather:wea,
            }
        })
    }
    static async getAnniversary(user_id){
        return await anniversary.findAll({
            order:[ ['time', 'DESC']],
            where:{
                user_id:user_id
            }
        })
    }
    static async getdetail(id){
        return await diary.findOne({
            where:{
                id:id
            },
        })
    }
    static async savedetail(id,content){
        return await diary.update({
            content:content
        },
        {
            where:{id:id}
        })
    }
    static async resubmitDiary(id,drafts){
        return await diary.update({
            drafts:drafts
        },
        {
            where:{id:id}
        })
    }
    static async todelDiary(id){
        return await diary.destroy({
            where:{
                id:id
            }
        })
    }
    static async pushmood(user_id,radio){
        return await moodpush.create({
            user_id:user_id,
            radio:radio,
            time:moment().format('YYYY-MM-DD HH:mm:ss'),
            pushstart:moment().week(moment().week()).startOf('week').format('YYYY-MM-DD')
        })
    }
    static async changestate(user_id){
        return await user.update({
            moodpushed:'yes',
            pushstart:moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'),
        },
        {
            where:{user_id:user_id}
        })
    }
    static async searchpush(pushstart,radio){
        return await pushcontent.findOne({
            where:{
                pushstart:{
                    [Op.gt]:pushstart,
                    [Op.lt]:moment(pushstart).add('day',7).format('YYYY-MM-DD')
                },
                radio:radio
            },
        })
    }
    static async uploadpushimg(radio,covertitle,covercontent,pushstart,picpath){
        return await pushcontent.create({
            radio:radio,
            cover_title:covertitle,
            cover_content:covercontent,
            cover_img:picpath,
            pushstart:pushstart
        })
    }
    static async findpush(radio,pushstart){
        return await pushcontent.findOne({
            where:{
                pushstart:{
                    [Op.gt]:pushstart,
                    [Op.lt]:moment(pushstart).add('day',7).format('YYYY-MM-DD')
                },
                radio:radio
            },
        })
    }
    static async addpush(radio,pushstart,content){
        return await pushcontent.update({
            content:content,
            time:moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
            where:{
                radio:radio,
                pushstart:{
                    [Op.gt]:pushstart,
                    [Op.lt]:moment(pushstart).add('day',7).format('YYYY-MM-DD')
                }
            }
        })
    }
    static async findweekPush(user_id){
        return await moodpush.findOne({
            where:{
                pushstart:{
                    [Op.gt]:moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'),
                    [Op.lt]:moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')
                },
                user_id:user_id
            },
        })
    }
    static async getAllmoodpush(user_id){
        return await moodpush.findAll({
            where:{
                user_id:user_id
            },
            include:[{
                model:pushcontent,
            }],
        })
    }
    static async getmoodPushContent(id){
        return await pushcontent.findOne({
            where:{
                id:id
            },
        })
    }
    static async addTree(user_id,title,content){
        return await tree.create({
            user_id:user_id,
            treetitle:title,
            treecontent:content,
            time:moment().format('YYYY-MM-DD HH:mm:ss')
        })
    }
    static async findTreeid(user_id){
        return tree.findAll({
            order:[['id', 'DESC']],
            limit:1,
            where:{
                user_id:user_id
            },
            attributes:['id']
        })
    }
    static async uploadTreephoto(id,picpath){
        await tree_picture.create({
            tree_id:id,
            path:picpath
        })
    }
    static async userOpinion(user_id,id,value,content){
        return await moodpush.update({
            rate:value,
            feedback:content
        },
        {
            where:{
                user_id:user_id,
                id:id
            }
        })
    }
    static async getTreeList(){
        return tree.findAll({
            order:[ ['time', 'DESC']],
            include:[{
                model:tree_picture,
            }]
        })
    }
    static async getHotList(){
        return tree.findAll({
            order:[ ['thumbs', 'DESC']],
            include:[{
                model:tree_picture,
            }]
        })
    }
    //系统通知：心情推送
    static async systemMsg(user_id){
        await message.create({
            user_id:user_id,
            time:moment().format('YYYY-MM-DD HH:mm:ss'),
            msgcontent:'[心情推送]据说点击查看后心情会变好',
            active:0
            //0:系统通知
        })
    }
    static async getAllMsg(user_id,active){
        return message.findAll({
            order:[ ['time', 'DESC']],
            where:{
                user_id:user_id,
                active:active
            }
        })
    }
    static async delMsg(id){
        return await message.destroy({
            where:{
                id:id
            }
        })
    }
    static async getTreeDetail(tree_id){
        return await tree.findOne({
            where:{
                id:tree_id
            },
            include:[{
                model:tree_picture
            }]
        })
    }
    static async getUserTree(user_id){
        return tree.findAll({
            where:{
                user_id:user_id
            },
            include:[{
                model:tree_picture,
            }]
        })
    }
    static async addComment(tree_id,user_id,content){
        await comment.create({
            tree_id:tree_id,
            user_id:user_id,
            content:content,
            time:moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        return await tree.update({
            commentNum:Sequelize.literal('commentNum + 1'),
        },{
            where:{
                id:tree_id
            }
        })
    }
    static async getComment(tree_id){
        return comment.findAll({
            order:[ ['time', 'DESC']],
            where:{
               tree_id:tree_id
            },
            include:[{
                model:user,
            }]
        })
    }
    static async addThumbs(tree_id,user_id){
        await thumbs.create({
            tree_id:tree_id,
            user_id:user_id,
            time:moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        await tree.update({
            thumbs:Sequelize.literal('thumbs + 1'),
        },{
            where:{
                id:tree_id
            }
        })
        }   
    static async decThumbs(tree_id,user_id){
        await thumbs.destroy({
            where:{
                tree_id:tree_id,
                user_id:user_id
            }
        })
        await tree.update({
            thumbs:Sequelize.literal('thumbs - 1')
        },{
            where:{
                id:tree_id
            }
        })
    }
    static async getThumbs(tree_id,user_id){
        return await thumbs.findOne({
            where:{
                tree_id:tree_id,
                user_id:user_id
            }
        })
    }
    static async getThumbsUser(user_id){
        return await thumbs.findAll({
            where:{
                user_id:user_id
            },
            attributes:['tree_id']
        })
    }
    static async delDot(id,active){
        return await message.update({
            badge:0
        },
        {
            where:{
                id:id
            }
        })
    }
    static async findDot(user_id){
        return await message.findOne({
            where:{
                user_id:user_id,
                badge:1
            }
        })
    }
    static async CommentThumbs(user_id){
        return await commentThumb.findAll({
            where:{
                user_id:user_id
            },
            attributes:['comment_id']
        })
    }
    static async addCommentThumbs(comment_id,user_id){
        await commentThumb.create({
            comment_id:comment_id,
            user_id:user_id,
            time:moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        await comment.update({
            thumbs:Sequelize.literal('thumbs + 1'),
        },{
            where:{
                id:comment_id
            }
        })
        }   
    static async decCommentThumbs(comment_id,user_id){
        await commentThumb.destroy({
            where:{
                comment_id:comment_id,
                user_id:user_id
            }
        })
        await comment.update({
            thumbs:Sequelize.literal('thumbs - 1')
        },{
            where:{
                id:comment_id
            }
        })
    }
}

module.exports = userDao