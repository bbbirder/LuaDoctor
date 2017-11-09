var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;

var settings = {
    main_dir:ipcRenderer.sendSync("main_dir"),
    src_dir:ipcRenderer.sendSync("dump_dir",{
        path:MyStorage["last_dir"]
    }),
};


// ws.on("lua_string_resp",function(msg){
//     alert(msg.result)
// })
function SwitchWorkSpace(path){

}
function MainView(){
	var Event = laya.events.Event;
	MainViewUI.super(this);
    //global listeners

    this.txtTitle.text = MyStorage["last_dir"]
    //init menus
    var menus = [this.menuDoctor,this.menuDebug,this.menuUI];
    var subviews = [this.doctorView,this.debugView,this.uiView];
    for(var i=0;i<3;i++){
        menus[i].on(Event.CLICK,this,function(idx){
            for(var j=0;j<3;j++){
                menus[j].selected = idx==j;
                subviews[j].visible = idx==j;
            }
        },[i])
        console.log(i)
    }
//init doctor
    this.btnOpen.on(Event.CLICK,this,function(){
        new FileChooseView().show();
    })
    this.on(Event.RESIZE,this,function(){
        this.panDoc.vScrollBar.visible = this.displayHeight<700
        this.panDoc.hScrollBar.visible = this.displayWidth<500
        // new Laya.Panel().vScrollBar.visible
    })
    this.btnHelp.on(Event.CLICK,this,function(){
        ws.send({
            cmd:"lua_string_req",
            str:
                "local f1 = io.open(cc.FileUtils:getInstance():getWritablePath()..'/LuaDoctor/test3.lua','w+');f1:write('return {name=\"leo\",hw=function()print(123)end}');f1:close();"+
                // "local f2 = io.open(cc.FileUtils:getInstance():getWritablePath()..'/src/main.lua','r');"+
                "local obj = require('test3');print(obj.name);obj.hw()"
        })
    })
    
    initDebugView.call(this);
    function dump_child(node,cb){
        for(var i = 0;i<node.numChildren;i++){
            var v = node.getChildAt(i)
            cb.call(this,v)
            dump_child.call(this,v,cb);
        }
    }
    dump_child.call(this,this,function(node){
        var arr = node.name.split(",")
        if(arr[0]=="r-div"||arr[0]=="c-div"){
            var isRowDiver = arr[0]=="r-div"
            node.on(Event.MOUSE_OVER,this,function(){
                laya.utils.Mouse.cursor = isRowDiver?"row-resize":"col-resize"
            }).on(Event.MOUSE_OUT,this,function(){
                laya.utils.Mouse.cursor = "auto"
            }).on(Event.MOUSE_DOWN,this,function(){
                var min = 72
                var max = node.parent[isRowDiver?"displayHeight":"displayWidth"]-min*2
                node.startDrag(new Laya.Rectangle(
                    isRowDiver?0:min,
                    isRowDiver?min:0,
                    isRowDiver?0:max,
                    isRowDiver?max:0
                ))
            }).on(Event.DRAG_MOVE,this,function(){
                var ruler = node[isRowDiver?"y":"x"]
                laya.utils.Mouse.cursor = isRowDiver?"row-resize":"col-resize"
                this[arr[1]][isRowDiver?"height":"width"] = ruler
                this[arr[2]][isRowDiver?"top":"left"] = ruler+node[isRowDiver?"height":"width"]
            })
        }
    })

}
Laya.class(MainView, "MainView", MainViewUI);

Laya.init(1206, 750);
Laya.stage.scaleMode = "full"
Laya.stage.bgColor = "#121212"
Laya.stage.on(laya.events.Event.KEY_DOWN,this,function(event){
    switch(event.keyCode){
    case 27:
        Dialog.closeAll();
        break;
    
    }
})
Laya.stage.on(laya.events.Event.RESIZE,this,function(){
    var w = Laya.stage.width;
    var h = Laya.stage.height;
    var childs = Dialog.manager._childs;
    for(var k in childs){
        console.log(w,h)
        childs[k].size(w,h)
    }
})
function onAssetLoaded()
{
    console.log("assets loaded...")    
	Laya.stage.addChild(new MainView());

}

Laya.loader.load("res/atlas/main.json", Handler.create(this, onAssetLoaded), null, Loader.ATLAS,0);
