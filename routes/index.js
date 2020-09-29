const router = require('koa-router')()
const passport = require('../middlewares/passport')
const homeController = require('../controllers/index')
const SMSController = require('../controllers/sendmsg')


router.prefix('/api')

//发送短信验证码
router.get('/sendmsg', SMSController.sendmsg)
//注册
router.post('/register', homeController.register)
router.post('/login', homeController.login)
//上传头像
router.post('/uploadPortrait/:id', homeController.uploadPortrait)
//上传日记图片
router.post('/uploadDiaryPhoto/:id', homeController.uploadDiaryPhoto)
//发布树洞
router.post('/uploadTreePhoto/:user_id/:title/:content', homeController.uploadTreePhoto)
router.all('*',passport.authenticate('jwt',{session:false}))
//修改个人资料
router.get('/saveinfo',homeController.saveinfo)
router.get('/getInfo',homeController.getInfo)
router.get('/saveDiary',homeController.saveDiary)
//获取日记列表，同理草稿箱也能用
router.get('/getDiaryList',homeController.getDiaryList)
//设置密码锁
router.post('/setpwd',homeController.setpwd)
//上传纪念日
router.get('/saveAnniversary',homeController.saveAnniversary)
//获取纪念日列表
router.get('/getAnniversary',homeController.getAnniversary)
//时间轴列表
router.get('/getTimeline',homeController.getTimeline)
//日记详情
router.get('/getdetail',homeController.getdetail)
//修改日记
router.get('/savedetail',homeController.savedetail)
//草稿箱重发日记
router.get('/resubmitDiary',homeController.resubmitDiary)
//删除日记
router.get('/todelDiary',homeController.todelDiary)
//获取心情推送
router.get('/getAllmoodpush',homeController.getAllmoodpush)
//获取心情推送内容
router.get('/getmoodPushContent',homeController.getmoodPushContent)
router.get('/addTreeMain',homeController.addTreeMain)
router.get('/userOpinion',homeController.userOpinion)
router.get('/getTreeList',homeController.getTreeList)
router.get('/getHotList',homeController.getHotList)
router.get('/getAllMsg',homeController.getAllMsg)
router.get('/delMsg',homeController.delMsg)
router.get('/getTreeDetail',homeController.getTreeDetail)
router.get('/getUserTree',homeController.getUserTree)
router.get('/addComment',homeController.addComment)
router.get('/getComment',homeController.getComment)
router.get('/Thumbs',homeController.Thumbs)
router.get('/getThumbs',homeController.getThumbs)
router.get('/getThumbsUser',homeController.getThumbsUser)
router.get('/delDot',homeController.delDot)
router.get('/findDot',homeController.findDot)
router.get('/CommentThumbs',homeController.CommentThumbs)
router.get('/commentCount', homeController.commentCount)

module.exports = router
