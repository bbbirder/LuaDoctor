function initDebugView(){
    var Event = laya.events.Event;
//net listeners
    function on_view_file(msg){
        // ws.send(ParseLuaToInnerData(msg.data))
        this.txtFileName.text = msg.path.substr(MyStorage["last_dir"].length+1)
        this.divCode.removeSelf()
        this.divCode = new Laya.HTMLDivElement();
        this.panCode.addChild(this.divCode)
        this.divCode.width = this.panCode.width;
        this.divCode.style.wordWrap=false;
        this.divCode.style.font = "14px Courier New"
        // this.divCode.style.font = "Arial";
        this.txtLineNum.text = ""
        if(msg.path.slice(-4)!=".lua"){
            this.divCode.innerHTML = '<span style="color:#fff">未知文件类型</span>';
            return;
        }
        var innerdata = ParseLuaToInnerData(msg.data)
        this.divCode.innerHTML = innerdata.htmlstring
        // this.divCode.height+=20;
        for(var i = 0;i<innerdata.linecount;i++){
            this.txtLineNum.text+=(i+1)+(i==(innerdata.linecount-1)?"":"\n")
        }
        // this.txtLineNum.autoSize = true
        // this.txtLineNum.width = this.txtLineNum.displayWidth
        this.divCode.x = this.txtLineNum.width+5
        // this.txtLineNum.scaleY = this.divCode.height/this.txtLineNum.height
        // new HTMLDivElement().style.fontSizeAdjust = true
    }
    innerCall.on("lua_log",function(msg){
        if(this.boxConsoleText.lastRow&&this.boxConsoleText.lastRow.name==msg.stack+msg.log){
            var cnt = this.boxConsoleText.lastRow.getChildByName("cnt")
            cnt._value = cnt._value || 1;
            cnt._value++;
            cnt.label = cnt._value>99?"99+":cnt._value;
            cnt.visible = true
            var txt = this.boxConsoleText.lastRow.getChildByName("txt")
            txt.left = 28;
            return;
        }
        var logRow = new Laya.Button(this.boxConsoleText.numChildren%2==0?"main/btn_log_0.png":"main/btn_log_1.png");
        // var logRow = new Laya.Button(msg.iserr?"main/btn_red.png":"main/btn_green.png");
        var cnt = new Laya.Button("main/btn_red.png");
        var txt = new Laya.Label(msg.log.split("\n")[0]);
        // var stack = JSON.parse(msg.stack)
        // for(var k in stack){
        //     var v = stack[k]
        //     if(v.path)
        //         txt.text+="\n"+v.path+"@"+v.line
        // }
        logRow.dataSource = {
            right:21, left:0,
            height:21, sizeGrid:"6,6,6,6",
            name:msg.stack+msg.log,
            scaleY:msg.iserr?(this.boxConsoleText.showError?1:0)
                :(this.boxConsoleText.showPrint?1:0)
        }
        logRow.iserr = msg.iserr
        logRow.idx = this.boxConsoleText.numChildren

        cnt.dataSource = {
            name:"cnt",visible:false,
            left:2,centerY:0,
            sizeGrid:"6,6,6,6",
            disabled:true,label:1,labelColors:"#fff",
            width:24,height:16
        }
        txt.dataSource = {
            name:"txt",color:msg.iserr?"#f00":"#ddd",
            centerY:0,left:8,valign:"middle",
            top:0,bottom:0,
            wordWrap:false,right:64
        }
        logRow.addChild(cnt)
        logRow.addChild(txt)
        logRow.on(Event.CLICK,this,function(logRow){
            var pan = this.boxConsoleText.getChildByName("pan")
            if(pan) pan.removeSelf();
            if(pan && pan.idx==logRow.idx+0.5) return; //is toggling operation
            //add pan
            pan = new Laya.VBox();
            pan.dataSource = {
                name:"pan",left:0,right:21
            }
            pan.iserr = logRow.iserr
            pan.idx = logRow.idx+0.5
            var txt = new Laya.TextArea();
            txt.dataSource = {
                editable:false,
                left:0,right:0,
                autoSize:true,
                color:"#fff",
                bgColor:"#444",
                borderColor:"#aaa",
                padding:"5,5,5,5"
            };
            txt.width = 1000
            txt.text = msg.log
            txt.height = txt.textField.textHeight+20
            pan.addChild(txt)
            // console.log(txt.textField.textHeight)
            this.boxConsoleText.addChild(pan)
            // logRow.scaleY = logRow.scaleY==1?1.5:1
        },[logRow])

        var shouldBottom = this.panConsole.vScrollBar.value==this.boxConsoleText.height-this.panConsole.height
        this.boxConsoleText.addChild(logRow)
        this.boxConsoleText.lastRow = logRow;

        if(shouldBottom){
            this.panConsole.frameOnce(2,this,function(){
                console.log(this.panConsole.vScrollBar.value)
                this.panConsole.vScrollBar.value+=52
                console.log(this.panConsole.vScrollBar.value)
            })
        }
    }.bind(this))
    innerCall.on("lua_bp",function(msg){
        initWithTree(this.panScoop,msg.scoop,function(tn){
            tn.depth==0 && this.panScoop.unfold(tn)
            var node = new Laya.Label(tn.name)
            node.dataSource = {
                text:tn.depth==0?tn.name
                    :tn.name+" = "+JSON.stringify(tn.val),
                color:tn.depth==0?"#d0d0d0":"#666",
                x:tn.depth*20+5,
            }
            node.on(Event.CLICK,this,function(){
                tn.childs&&this.panScoop.toggle(tn)
                // tn.depth==0 && 
            })
            return node
        }.bind(this))
    }.bind(this))
//ui settings
    this.btnClear.toolTip = "清除"
    this.btnError.toolTip = "显示Error"
    this.btnClear.toolTip = "显示Message"
    this.boxConsoleText.showError = true
    this.boxConsoleText.showPrint = true
    // this.sldDebug0.on(Event.MOUSE_OVER,this,function(){
    //     laya.utils.Mouse.cursor = "row-resize"
    // }).on(Event.MOUSE_OUT,this,function(){
    //     laya.utils.Mouse.cursor = "auto"
    // }).on(Event.MOUSE_DOWN,this,function(){
    //     this.sldDebug0.startDrag(new Laya.Rectangle(0,72,0,Laya.stage.height-72-100))
    // }).on(Event.DRAG_MOVE,this,function(){
    //     laya.utils.Mouse.cursor = "row-resize"
    //     this.boxDebugBottom.top = this.sldDebug0.y+8
    //     this.boxDebugTop.height = this.sldDebug0.y
    // })
    // this.sldDebug1.on(Event.MOUSE_DOWN,this,function(){
    //     this.sldDebug1.startDrag(new Laya.Rectangle(0,0,this.debugView.width,0))
    // }).on(Event.DRAG_MOVE,this,function(){
    //     laya.utils.Mouse.cursor = "col-resize"
    //     this.boxDebugOpen.width = this.sldDebug1.x
    //     this.boxDebugCode.left = this.boxDebugOpen.width+8
    // }).on(Event.MOUSE_OVER,this,function(){
    //     laya.utils.Mouse.cursor = "col-resize"
    // }).on(Event.MOUSE_OUT,this,function(){
    //     laya.utils.Mouse.cursor = "auto"
    // })
    this.btnClear.on(Event.CLICK,this,function(){
        this.boxConsoleText.removeChildren()
        this.boxConsoleText.height = 0
        this.panConsole.size(this.panConsole.width,this.panConsole.height)
    })
    this.btnContinue.on(Event.CLICK,this,function(){
        ipcRenderer.send("lua_string_req",{
            tag:"",
            str:"LuaDoctor.__CONT = true"
        })
        this.panScoop.removeChildren()
    })
    this.btnError.on(Event.CLICK,this,function(){
        this.boxConsoleText.showError = this.btnError.selected;
        var idx = 1;
        for(var i in this.boxConsoleText._childs){
            var row = this.boxConsoleText._childs[i]
            if(row.iserr){
                row.scaleY = this.btnError.selected?1:0
            }
            if(row.scaleY){
                idx++
            }
            row.skin = idx%2==0?"main/btn_log_0.png":"main/btn_log_1.png"
        }
    })
    this.btnLog.on(Event.CLICK,this,function(){
        this.boxConsoleText.showPrint = this.btnLog.selected;
        var idx = 1;
        for(var i in this.boxConsoleText._childs){
            var row = this.boxConsoleText._childs[i]
            if(!row.iserr){
                row.scaleY = this.btnLog.selected?1:0
            }
            if(row.scaleY){
                idx++
            }
            row.skin = idx%2==0?"main/btn_log_0.png":"main/btn_log_1.png"
        }
    })
    this.boxConsoleText.sortItem = function(items){
        return items.sort(function(a,b){
            return a.idx-b.idx;
        })
    }
    initWithTree(this.panDebugSrc,settings.src_dir,function(v){
        var item = new Laya.Button("main/btn_none.png",v.name)
        item.dataSource ={
            labelColors : "#d0d0d0,#d0d0d0,#d0d0d0",
            labelAlign : "left",
            labelPadding : "0,0,0,24",
            width:200,height:24,
            sizeGrid : "6,6,6,6"
        }
        item.left = v.depth*20
        var icon = new Laya.Image(v.isfile?"main/img_file_1.png":"main/img_folder_1.png")
        icon.centerY = 0;
        icon.size(21,21)
        item.addChild(icon)
        item.on(Event.CLICK,this,function(){
            if(v.isfile){
                var data = ipcRenderer.sendSync("view_file",{
                    cmd:"view_file",
                    path:v.path
                })
                on_view_file.call(this,data)
            }else{
                icon.skin = v.folded?"main/img_folder_2.png":"main/img_folder_1.png"
                this.panDebugSrc.toggle(v)
            }
        }.bind(this))
        return item
    }.bind(this))
    var ratioGroup = [this.btnSandBox,this.btnScript,this.btnMonitor];
    var subViews = [this.boxSandBox,this.boxScript,this.boxMonitor];
    for(var i in ratioGroup){
        ratioGroup[i].on(Event.CLICK,this,function(i){
            for(var j in ratioGroup){
                ratioGroup[j].selected = i==j;
                subViews[j].visible = i==j;
            }
        },[i])
    }
    // var iHtml=new Laya.HTMLIframeElement();
    // iHtml.x = 72
    // Laya.stage.addChild(iHtml);
    // iHtml.href="a.html";

    // ws.send('<span style="font:14px Arial">'+luastring+'</span>')

}