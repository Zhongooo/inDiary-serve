var uuid=require('node-uuid');

exports.uuid=function generateId(){
    return uuid.v4();
}