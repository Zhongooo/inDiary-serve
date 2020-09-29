const config = require('../config/mysql_sequelize');
const Sequelize = config.sequelize

const user = Sequelize.import(__dirname + '/user.js')
const role = Sequelize.import(__dirname + '/role.js')
const diary = Sequelize.import(__dirname + '/diary.js')
const tree = Sequelize.import(__dirname + '/tree.js')
const comment = Sequelize.import(__dirname + '/comment.js')
const reply = Sequelize.import(__dirname + '/reply.js')
const message = Sequelize.import(__dirname + '/message.js')
const complaint = Sequelize.import(__dirname + '/complaint.js')
const anniversary = Sequelize.import(__dirname + '/anniversary.js')
const moodpush = Sequelize.import(__dirname + '/moodpush.js')
const pushcontent = Sequelize.import(__dirname + '/pushcontent.js')
const tree_picture = Sequelize.import(__dirname + '/tree_picture.js')
const thumbs = Sequelize.import(__dirname + '/thumbs.js')
const commentThumb = Sequelize.import(__dirname + '/commentThumb.js')

diary.belongsTo(user, {
    foreignKey: 'user_id',
    targetKey:'user_id'
  })
  user.belongsTo(role, {
    foreignKey: 'role_id'
  })
  moodpush.belongsTo(pushcontent, {
    foreignKey: 'pushstart',
    targetKey:'pushstart'
  })
  tree.hasMany(tree_picture, {
    foreignKey: 'tree_id',
    sourceKey:'id'
  })
  comment.belongsTo(user, {
    foreignKey: 'user_id',
    targetKey:'user_id'
  })

module.exports = {user,role,diary,tree,comment,reply,message,complaint,anniversary,moodpush,pushcontent,tree_picture,thumbs,commentThumb}