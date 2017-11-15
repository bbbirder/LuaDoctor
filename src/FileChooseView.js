
(function (_super) {
    var Event = laya.events.Event;
    function FileChooseView(){
        this.__super.call(this);
        var last_dir = MyStorage["last_dir"]||"/";
    //net listenrs
        function on_list_dir(msg){
            if(msg.err) return;
            initWithTree(this.panDir,msg.dirs,function(v){
                var item = new Laya.Button("main/btn_none.png",v.name)
                item.dataSource ={
                    labelColors : "#d0d0d0,#d0d0d0,#d0d0d0",
                    labelAlign : "left",
                    labelPadding : "0,0,0,44",
                    sizeGrid : "6,6,6,6",
                    width:200,height:24,
                }
                item.on(Event.DOUBLE_CLICK,this,function(){
                    navto.apply(this,[v.path])
                }).on(Event.CLICK,this,function(){
                    this.inputPath.text = v.path
                    this.btnOk.disabled = v.path.split(/[/\\]/).pop()!="src"
                })
                var icon = new Laya.Image(v.isfile?
                    "main/img_file_1.png":"main/img_folder_1.png")
                icon.centerY = 0;
                icon.size(21,21)
                icon.x = 20
                item.addChild(icon)
                return item
            }.bind(this))
            this.panDir.getChildByName("boxContainer").dataSource={x:5,y:5};
        }
    //interfaces
        // this.visible = false;
        function navto(path){
            this.inputPath.text = path;
            var ret = ipcRenderer.sendSync("list_dir",{path:path})
            on_list_dir.call(this,ret)
            // initWithTree(this.panDir,)
        }
    //ui settings
        initWithTree(this.panMain,settings.main_dir,function(v){
            var item = new Laya.Button("main/btn_none.png",v.name)
            item.dataSource ={
                labelColors : "#d0d0d0,#d0d0d0,#d0d0d0",
                labelAlign : "left",
                labelPadding : "0,0,0,44",
                width:200,height:24,
            }
            item.on(Event.CLICK,this,function(){
                navto.apply(this,[v.path])
            }.bind(this))
            var icon = new Laya.Image("main/img_folder_1.png")
            icon.centerY = 0;
            icon.size(21,21)
            icon.x = 20
            item.addChild(icon)
            return item
        }.bind(this),5);
        this.btnGo.on(Event.CLICK,this,function(){
            navto.apply(this,[this.inputPath.text]);
        })
        this.boxDrag.on(Event.MOUSE_DOWN,this,function(){
            this.root.startDrag();
        })
        this.inputPath.on(Event.KEY_PRESS,this,function(event){
            if(event.keyCode==13){
                navto.apply(this,[this.inputPath.text]);
            }
        })
        this.btnOk.on(Event.CLICK,this,function(){
            MyStorage["last_dir"] = this.inputPath.text
            location.reload()
            this.close()
        })
        this.panMain.getChildByName("boxContainer").dataSource={x:-15,y:30};
        this.btnOk.disabled = last_dir.split(/[/\\]/).pop()!="src"

        navto.apply(this,[last_dir]);
    }
    Laya.class(FileChooseView,"FileChooseView",_super);
}(FileChooseViewUI));