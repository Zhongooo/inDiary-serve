module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'pushcontent',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content:{
                type: DataTypes.STRING,
                field: 'content'
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
            cover_content:{
                type: DataTypes.STRING,
                field: 'cover_content'
            },
            cover_img:{
                type: DataTypes.STRING,
                field: 'cover_img'
            }, 
            cover_title:{
                type: DataTypes.STRING,
                field: 'cover_title'
            },
        }
    );
}