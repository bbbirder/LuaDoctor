var WebSocketServer = require('ws').Server
var wss_rmt = new WebSocketServer({port:20100});
wss_rmt.on('connection',function(ws){
  global.ws = ws;
  console.log('remote connected');
  ws.on('message',function(msg){
    console.log(msg)
  // try{
    win.webContents.executeJavaScript("innerCall.send("+msg+")")
  // }catch(err){}
  })
})