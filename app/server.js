var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port:20100});

wss.on('connection',function(ws){
  console.log('remote connected');
  var _uid = UUID.v1();
  peers[_uid] = ws;
  // ws.uuid = _uid;
  for(var win_uuid in wins){
    wins[win_uuid].webContents.executeJavaScript("innerCall.send("+
    	JSON.stringify({
    		cmd:"peer_in",
    		uuid:_uid,
    	})+")")
  }
  ws.on('message',function(msg){
    console.log(msg)
    uidmap.for_each_v2(_uid,function(win_uuid){
    	wins[win_uuid].webContents.executeJavaScript("innerCall.send("+msg+")")
    })
  })
  ws.on('close',function(){
  	console.log("disconneted!")
  	uidmap.drop_v2(_uid)
  	delete peers[_uid];
	for(var win_uuid in wins){
		wins[win_uuid].webContents.executeJavaScript("innerCall.send("+JSON.stringify({
			cmd:"peer_out",
			uuid:_uid,
		})+")")
	}
  })
})