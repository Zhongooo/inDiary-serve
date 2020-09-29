const router = require('koa-router')()
const usersController = require('../controllers/users')
const passport = require('../middlewares/passport')


router.prefix('/users')

router.post('/login', usersController.login)
router.post('/uploadpushimg/:radio/:title/:content',usersController.uploadpushimg)

router.all('*',passport.authenticate('jwt',{session:false}))
router.get('/getUsers', usersController.getUsers)
router.get('/delUser', usersController.delUser)
router.get('/getmood', usersController.getmood)
router.get('/getmoodUser', usersController.getmoodUser)
//心情推送
router.get('/pushmood',usersController.pushmood)
//查找是否更新了心情推送
router.get('/searchpush',usersController.searchpush)
router.get('/addpush',usersController.addpush)
//查找是否本周是否给用户推送了//查看某用户的心情推送详情
router.get('/findweekPush',usersController.findweekPush)
// router.get('/getMoodpush',usersController.getMoodpush)
router.get('/systemMsg',usersController.systemMsg)

module.exports = router
