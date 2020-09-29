module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'thumbs',
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
            
        }
    );
}