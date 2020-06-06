const redis = require('redis')

const REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
    password: 'root'
  }

// 创建客户端连接
const redisClient = redis.createClient(REDIS_CONF)
redisClient.on('error',err=>{
    console.log('reids连接失败:' + err);
})

// test
redisClient.set('name','zhangsan2',redis.print)
redisClient.get('name',(err,val)=>{
    if(err){
        console.log(err);
        return
    }
    console.log('val: ' + val);

    // 退出
    redisClient.quit()
    
})