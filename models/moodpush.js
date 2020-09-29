module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'moodpush',
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
            radio:{
                type: DataTypes.INTEGER,
                field: 'radio'
            }, 
            time:{
                type: DataTypes.DATE,
                field: 'time',
            },
            pushstart:{
                type: DataTypes.DATE,
                field: 'pushstart'
            },
            feedback:{
                type: DataTypes.STRING,
                field: 'feedback'
            },
            rate:{
                type: DataTypes.INTEGER,
                field: 'rate',
                defaultValue:0
                //0:未评分 最高分5
            }
        }
    );
}