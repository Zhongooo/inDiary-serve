module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'diary',
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
            weather:{
                type: DataTypes.STRING,
                field: 'weather'
            },
            mood:{
                type: DataTypes.STRING,
                field: 'mood'
            },
            title:{
                type: DataTypes.STRING,
                field: 'title'
            },
            content:{
                type: DataTypes.TEXT,
                field: 'content'
            },
            picture:{
                type: DataTypes.STRING,
                field: 'picture'
            }, 
            time:{
                type: DataTypes.DATE,
                field: 'time'
            },
            drafts:{
                type: DataTypes.INTEGER,
                field: 'drafts',
                defaultValue:1
                //0为存到草稿箱，1为存到日记本
            }, 
            realwea:{
                type: DataTypes.STRING,
                field: 'realwea'
            }
        }
    );
}