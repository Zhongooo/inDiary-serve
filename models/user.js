module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'user',
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
            user_name:{
                type: DataTypes.STRING,
                field: 'user_name'
            },
            password:{
                type: DataTypes.STRING,
                field: 'password'
            },
            role_id:{
                type: DataTypes.INTEGER,
                field: 'role_id'
            },
            solt:{
                type:DataTypes.INTEGER,
                field:'solt'
            },
            headpic:{
                type: DataTypes.STRING,
                field: 'headpic'
            }, 
            sex:{
                type: DataTypes.STRING,
                field: 'sex'
            },
            age:{
                type: DataTypes.INTEGER,
                field: 'age'
            },
            time:{
                type: DataTypes.DATE,
                field: 'time',
            },
            stoptalk:{
                type: DataTypes.STRING,
                field: 'stoptalk',
                defaultValue:'false'
            },
            diarypwd:{
                type: DataTypes.INTEGER,
                field: 'diarypwd'
            },
            moodpushed:{
                type: DataTypes.STRING,
                field: 'moodpushed',
                defaultValue:'no'
            },
            pushstart:{
                type: DataTypes.DATE,
                field: 'pushstart'
            }
        }
    );
}