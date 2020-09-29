module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'commentThumb',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            comment_id:{
                type: DataTypes.INTEGER,
                field: 'comment_id'
            },
            user_id:{
                type: DataTypes.STRING,
                field: 'user_id'
            },
            time:{
                type: DataTypes.DATE,
                field: 'time'
            },
            
        }
    );
}