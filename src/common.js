//localStorage
var MyStorage = MyStorage || {_cache:{}};

function RegisterLocalStorageItem(name,valueDefault){
    Laya.getset(0,MyStorage,name,function(){
        if(!MyStorage._cache[name]){
            MyStorage._cache[name] = [localStorage.getItem(name) || valueDefault];
        }
        return MyStorage._cache[name][0];
    },function(value){
        if(MyStorage._cache[name]&&value==MyStorage._cache[name][0])return;
        localStorage.setItem(name,value);
        MyStorage._cache[name] = [value];
    })
};
RegisterLocalStorageItem("last_dir")

//ipcRenderer
const {ipcRenderer} = require("electron")
var innerCall = {
    _listeners:{
        lua_string_resp:function(msg){
            innerCall._listeners[msg.tag]
                &&innerCall._listeners[msg.tag](msg)
        }
    }
};
innerCall.on = function(event,callback){
    innerCall._listeners[event] = callback;
}
innerCall.send = function(msg){
    innerCall._listeners[msg.cmd]
        &&innerCall._listeners[msg.cmd](msg)
}


var WebSocketServer = require('ws').Server
var wss_rmt = new WebSocketServer({port:20101});
wss_rmt.on('connection',function(ws){
  wss_rmt = ws;
  console.log('remote connected');
  ws.on('message',function(msg){
    console.log(msg)
  // try{
    win.webContents.executeJavaScript("innerCall.send("+msg+")")
  // }catch(err){}
  })
})

JSON.parse2 = function(v){
    var tmp = JSON.parse(v);
    return JSON.suffix(tmp)
}
JSON.suffix = function(v){
    var root = v.obj
    eval(v.suffix)
    return root
}