module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'tree_picture',
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
            path:{
                type: DataTypes.STRING,
                field: 'path'
            },
        }
    );
}