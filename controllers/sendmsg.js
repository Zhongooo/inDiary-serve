const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAI4G6B5iagT4PwgFgj7bCM'//在阿里云后台的accessKeyId
const secretAccessKey = 'GM6AlbynLjVrGk8qEslccOeUzRNaGy'
// var sendmsg = {};
// module.exports = sendmsg;
/**
 * 发送短信验证码
 */
module.exports = {
sendmsg:async (ctx, next) =>{
    const phone=ctx.query.phone;
    var number="";
    for(var i=0;i<6;i++){
        number+=Math.floor(Math.random()*10)
    }
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    //发送短信
    var s = await smsClient.sendSMS({
        PhoneNumbers:phone,//发送的电话号码
        SignName: 'inDairy',//认证签名
        TemplateCode: 'SMS_190284169',//模板id
        TemplateParam: '{"code":"'+number+'"}'
    })
    if(s.Code=="OK"){
        ctx.body = {code :1,msg :number}
    }else{
        ctx.body = {code :0}
    }
}
}
