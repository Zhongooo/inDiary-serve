module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'role',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role_name:{
                type: DataTypes.STRING,
                field: 'role_name'
            },
        }
    );
}