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
    const {ipcRenderer,remote} = require("electron")
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

//WebSocket

//JSON
    //@直接把包含循环引用信息的string转换成对象
    JSON.parse2 = function(v){
        var tmp = JSON.parse(v);
        return JSON.suffix(tmp)
    }
    JSON.suffix = function(v){
        var root = JSON.parse(v.obj)
        eval(v.suffix)
        return root
    }
//remote
    var thisWin = remote.getCurrentWindow();

    var sendLuaString = (function(){
        var index = 0
        return function(str,func){
            ipcRenderer.send("lua_string_req",{
                cmd:"lua_string_req",
                str:str,
                tag:index,
            })
            innerCall.on(index,function(msg){
                func&&func(msg.result)
                innerCall.on(index,undefined);
            })
            index = (index+1)%512
        }
    })()