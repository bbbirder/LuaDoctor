var startup_uri = "ws://127.0.0.1:8181"
/**
 * 网络通信模块
 * @param uri 服务器地址
 * @param onopen 连接成功回调
 * @param onclose 连接失败回调
 * @param msg_dealers 消息接收回调
 */
var ProtoEngine = function(ip,port){
    this.ws = new WebSocket("ws://"+ip+":"+port);
    this.listeners = {};
    var ws = this.ws;
    ws.onopen = function(ev){
        console.log("ws open",ev.target.url)
        this.listeners["open"]&&this.listeners["open"]();
    }.bind(this);
    ws.onclose = function(ev){
        console.log("ws close",ev.reason,ev.target.url)
        ev.reason!="useless"&&this.listeners["close"]&&this.listeners["close"]();
    }.bind(this);
    ws.onmessage = function(evt) { 
        console.log("get msg:",evt.origin,evt.data)
        var data = JSON.parse((evt.data));//decodeURI
        var dealer = this.listeners[data.cmd];
        if(!dealer) return console.log("unknown msg:",data.cmd);
        dealer.bind(this)(data);
    }.bind(this); 
    ws.onerror = function(ev){
        console.log("ws err",ev)
        new PromptDialog("连接丢失").show();
        this.listeners["close"]&&this.listeners["close"]();
    }.bind(this);
}
ProtoEngine.prototype.close = function(uri){
    this.ws.close(1000,"useless");
}

ProtoEngine.prototype.send = function(msg){
    console.log("  ",JSON.stringify(msg));
    if(this.ws.readyState!=WebSocket.OPEN){
    new PromptDialog("发送失败").show();
    return console.log("send err : ws is not opened");}
    this.ws.send((JSON.stringify(msg)))
}
/**
 * 注册事件回调
 * @param key “open”：连接成功，“close”：连接失败，msgid：对应数据包
 * @param callback 对应回调函数
 */
ProtoEngine.prototype.on = function(key,callback){
    this.listeners[key] = callback;
}