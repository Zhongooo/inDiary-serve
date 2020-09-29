module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'anniversary',
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
            icon:{
                type: DataTypes.INTEGER,
                field: 'icon',
                defaultValue:0
            },
            content:{
                type: DataTypes.STRING,
                field: 'content'
            },
            time:{
                type: DataTypes.DATE,
                field: 'time'
            }
        }
    );
}