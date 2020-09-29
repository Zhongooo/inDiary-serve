module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'complaint',
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
            comment_id:{
                type: DataTypes.INTEGER,
                field: 'comment_id'
            },
            reply_id:{
                type: DataTypes.INTEGER,
                field: 'reply_id'
            },
            complaint_id:{
                type: DataTypes.INTEGER,
                field: 'complaint_id'
            },
            time:{
                type: DataTypes.DATE,
                field: 'time',
            },
            checktime:{
                type: DataTypes.DATE,
                field: 'checktime',
            },
            reason:{
                type:DataTypes.TEXT,
                field:'reason'
            },
            checkresult:{
                type:DataTypes.INTEGER,
                field:'checkresult',
                defaultValue:'0'
            },
        }
    );
}