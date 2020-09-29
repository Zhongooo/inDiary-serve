module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'comment',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tree_id:{
                type: DataTypes.INTEGER,
                field: 'tree_id'
            },
            user_id:{
                type: DataTypes.STRING,
                field: 'user_id'
            },
            time:{
                type: DataTypes.DATE,
                field: 'time'
            },
            content:{
                type: DataTypes.TEXT,
                field: 'content'
            },
            thumbs:{
                type: DataTypes.INTEGER,
                field: 'thumbs',
                defaultValue:'0'
            }
        }
    );
}