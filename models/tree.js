module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'tree',
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
            treetitle:{
                type: DataTypes.STRING,
                field: 'treetitle'
            },
            treecontent:{
                type: DataTypes.STRING,
                field: 'treecontent'
            },
            picture:{
                type: DataTypes.STRING,
                field: 'picture'
            }, 
            time:{
                type: DataTypes.DATE,
                field: 'time'
            },
            thumbs:{
                type: DataTypes.INTEGER,
                field: 'thumbs',
                defaultValue:'0'
            },
            commentNum:{
                type: DataTypes.INTEGER,
                field: 'commentNum',
                defaultValue:'0'
            },
        }
    );
}