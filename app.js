const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const cors=require('koa2-cors')
const koaBody=require('koa-body')

const index = require('./routes/index')
const users = require('./routes/users')


// error handler
onerror(app)

app.keys = ['this is my secret set'];

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

app.use(koaBody(
  {
      multipart: true,
      formidable: {
          maxFileSize: 200*1024*1024   
      }
  }));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  // extension: 'ejs'
  map:{html:'ejs'}
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//跨域处理
app.use(cors(
  {
    origin:function(ctx){
      if(ctx.url==='/test'){
        return '*';
      }
      return '*';
    },
    
    maxAge:5,
    credentials:true,
    allowMethods:['GET','POST','DELETE','OPTION'],
    allowHeaders: ['Content-Type','Authorization','Accept'],
    exposeHeaders:['WWW-Authenticate','Server-Authorization'] 
  }))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
