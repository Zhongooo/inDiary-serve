module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'reply',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            replied_id:{
                type: DataTypes.INTEGER,
                field: 'replied_id'
            },
            comment_id:{
                type: DataTypes.INTEGER,
                field: 'comment_id'
            },
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            headpic:{
                type: DataTypes.STRING,
                field: 'headpic'
            }, 
            time:{
                type: DataTypes.DATE,
                field: 'time'
            },
            content:{
                type: DataTypes.TEXT,
                field: 'content'
            }
        }
    );
}