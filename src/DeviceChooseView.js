(function (_super) {
    var Event = laya.events.Event;
    function DeviceChooseView(){
        this.__super.call(this);
        function refresh(){
            this.boxList.removeChildren()
            var my_peers = ipcRenderer.sendSync("get_peers_listened")
            var peers = ipcRenderer.sendSync("get_peers")
            for(var k in peers){
                var uuid = peers[k];
                var item = new Laya.HBox();
                var cb = new Laya.Button("main/cb.png");
                var txt = new Laya.Label(uuid);
                var icon = new Laya.Image("main/img_mobile.png")
                cb.dataSource = {
                    left:5,centerY:0,
                    width:32,height:32,
                    toggle:true,name:"btn",
                    selected:my_peers.indexOf(uuid)!=-1,
                }
                icon.dataSource = {
                    left:42,centerY:0,
                    width:32,height:32,
                }
                txt.dataSource = {
                    left:80,centerY:0,
                    color:"#ddd",
                    overflow:"hidden",
                }
                cb.on(Event.CHANGE,this,function(uuid,cb){
                    ipcRenderer.sendSync(cb.selected?"listen_list_add":"listen_list_remove",{
                        uuid:uuid
                    })
                },[uuid,cb])
                item.addChild(cb)
                item.addChild(txt)
                item.addChild(icon)
                this.boxList.addChild(item)
            }
        }
        refresh.call(this)
        this.btnRefresh.on(Event.CLICK,this,refresh);
        this.btnSelectAll.on(Event.CHANGE,this,function(){
            for(var k in this.boxList._childs){
                var btn = this.boxList._childs[k].getChildByName("btn");
                btn.selected = this.btnSelectAll.selected
            }
        })
        this.boxDrag.on(Event.MOUSE_DOWN,this,function(){
            this.root.startDrag();
        })
    }
    Laya.class(DeviceChooseView,"DeviceChooseView",_super);
}(DeviceChooseViewUI));