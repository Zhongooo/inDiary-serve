module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'message',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id:{
                type: DataTypes.STRING,
                field: 'user_id'
            },
            msgcontent:{
                type: DataTypes.STRING,
                field: 'msgcontent'
            },
            badge:{
                type: DataTypes.STRING,
                field: 'badge',
                defaultValue:1
            },
            time:{
                type: DataTypes.DATE,
                field: 'time',
            },
            headpic:{
                type:DataTypes.STRING,
                field:'headpic'
            },
            active:{
                type: DataTypes.INTEGER,
                field: 'active'
            }
        }
    );
}