function initDebugView(){
    var Event = laya.events.Event;
//common listeners
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
        this.txtLineNum.removeSelf()
        this.txtLineNum = new Laya.Label()
        this.txtLineNum.dataSource = {
            color:"#aaa",bgColor:"#5a5a5a",
            padding:"2,2,2,2",fontSize:14,//align:"right"
            zOrder:-1
        }
        if(msg.path.slice(-4)!=".lua"){
            this.divCode.innerHTML = '<span style="color:#fff">未知文件类型</span>';
            return;
        }
        var innerdata = ParseLuaToInnerData(msg.data)
        this.divCode.innerHTML = innerdata.htmlstring
        this.divCode.linecount = innerdata.linecount
        // this.divCode.height+=20;
        var linetext = "";
        for(var i = 0;i<innerdata.linecount;i++){
            linetext+=(i+1)+(i==(innerdata.linecount-1)?"":"\n")
        }
        this.txtLineNum.text = linetext;
        this.txtLineNum.width =this.txtLineNum.width+12
        var lineHeight = (this.txtLineNum.height-4)/innerdata.linecount
        this.txtLineNum.on(Event.MOUSE_DOWN,this,function(){
            var line = Math.ceil((this.txtLineNum.mouseY-2)/lineHeight)
            var lineNode = this.divCode.getChildByName(line)
            if(lineNode) {
                sendLuaString("LuaDoctor.DeleteBreakPoint(\""+this.txtFileName.text+"\","+line+")")
                return lineNode.removeSelf()
            }
            sendLuaString("LuaDoctor.NewBreakPoint(\""+this.txtFileName.text+"\","+line+")")
            // this.txtLineNum.addChild(icon)
            showBreakPointLine.call(this,line)
        })
        this.panCode.addChild(this.txtLineNum)
        this.divCode.x = this.txtLineNum.width+5
        sendLuaString('return LuaDoctor.__bp_list["'+
            this.txtFileName.text+
            '"] and table.keys(LuaDoctor.__bp_list["'+
            this.txtFileName.text+'"])',function(result){
            for(var i in result){
                showBreakPointLine.call(this,result[i])
            }
        }.bind(this))
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
            updateStatckInfo.call(this,msg.stack)
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
        console.log(msg.stack)
        var stacks = updateStatckInfo.call(this,msg.stack)
        view_source_at.call(this,MyStorage["last_dir"]+"/"+stacks[0][0],stacks[0][1]);
        this.btnContinue.disabled = false
        initWithTree(this.panScoop,JSON.parse2(msg.scoop),function(tn){
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
    innerCall.on("peer_in",function(msg){
        if(this.debugView.disabled){
            ipcRenderer.sendSync("listen_list_add",msg)
            this.debugView.disabled = false;
            this.coverDebug.visible = false;
        }
        console.log("peer_in",msg)
    }.bind(this))
    innerCall.on("peer_out",function(msg){
        console.log("peer_out",msg)
        var hasPeer = false;
        for(var k in ipcRenderer.sendSync("get_peers_listened")){
            hasPeer = true;break;
        }
        console.log("peer_out",hasPeer)
        if(!hasPeer){
            this.debugView.disabled = true;
            this.coverDebug.visible = true;
        }
        // console.log(ipcRenderer.sendSync("get_peers"));
    }.bind(this))
//ui console
    function updateStatckInfo(s){
        this.panStack.removeChildren()
        var stacks = [];
        s.replace(/\[string \"(.*?)\"\]:([0-9]*)/g,function(s,v1,v2){
            stacks.push([v1,v2]);
            var item = new Laya.Label(v1+":"+v2)
            item.dataSource = {
                left:5,color:"#ddd",
                top:this.panStack.numChildren*16,
                underline:true
            }
            item.on(Event.CLICK,this,function(){
                view_source_at.call(this,MyStorage["last_dir"]+"/"+v1,v2)
            })
            this.panStack.addChild(item)
        }.bind(this));
        return stacks;
    }
    this.btnClear.toolTip = "清除"
    this.btnError.toolTip = "显示Error"
    this.btnClear.toolTip = "显示Message"
    this.boxConsoleText.showError = true
    this.boxConsoleText.showPrint = true

    this.btnClear.on(Event.CLICK,this,function(){
        this.boxConsoleText.removeChildren()
        this.boxConsoleText.height = 0
        this.panConsole.size(this.panConsole.width,this.panConsole.height)
    })
    sendLuaString("return LuaDoctor.__CONT",function(res){
        this.btnContinue.disabled = res
    }.bind(this))
    this.btnContinue.on(Event.CLICK,this,function(){
        // ipcRenderer.send("lua_string_req",{
        //     tag:"",
        //     str:"LuaDoctor.__CONT = true"
        // })
        sendLuaString("LuaDoctor.__CONT = true")
        this.btnContinue.disabled = true
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
    this.btnChooseDevice.on(Event.CLICK,this,function(){
        new DeviceChooseView().show()
    })
//ui top-views common
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
//ui source viewer
    function showBreakPointLine(line){
        var lineNode = new Laya.Image("main/img_line_red.png")
        lineNode.dataSource = {
            sizeGrid:"6,6,6,6",
            left:-80,right:0,
            height:16,
            name:line,
            y:(this.txtLineNum.height-8)*(line-1)/this.divCode.linecount+2
        }
        var icon = new Laya.Image("main/img_bp.png")
        icon.dataSource = {
            width:12,height:12,
            left:63,
            centerY:0,
            // right:0,anchorY:.5,
            sizeGrid:"6,6,6,6",
            // y:(line-1)*lineHeight+2+lineHeight/2,
            name:line,
            alpha:100
        }
        lineNode.addChild(icon)
        this.divCode.addChild(lineNode)
    }
    function view_source_at(path,line){
        var data = ipcRenderer.sendSync("view_file",{
                    cmd:"view_file",
                    path:path
                })
        on_view_file.call(this,data)
        this.panCode.refresh()
        this.panCode.scrollTo(0,this.divCode.height*(line-1)/this.divCode.linecount-this.panCode.height/2)
        var lineNode = new Laya.Image("main/img_line_red.png")
        lineNode.dataSource = {
            sizeGrid:"6,6,6,6",
            left:-80,right:0,
            height:16,name:"stack_line",
            y:(this.txtLineNum.height-5)*(line-1)/this.divCode.linecount
        }
        this.divCode.addChild(lineNode)
    }
    settings.src_dir&&initWithTree(this.panDebugSrc,settings.src_dir,function(v){
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
//ui scripts
    this.txtScriptCode.on(Event.KEY_DOWN,this,function(event){
        var func = event.nativeEvent.metaKey&&{
            [Laya.Keyboard.B]:function(){
                sendLuaString(this.txtScriptCode.text,function(result){
                    this.txtScriptResult.text = result;
                }.bind(this))
            },
        }[event.keyCode]
        func&&func.call(this)
    })
//ui monitor
    // this.boxMonitor.
    var pnt_cnt = Math.floor(screen.width/20);
    var mem_data = [];
    function redrawMonitor(){
        var drawinfo = [];
        var cnt = Math.min(Math.ceil(this.boxMonitorGraph.width/20)+1,mem_data.length);
        var ifrom = mem_data.length-cnt;
        var ito = mem_data.length-1
        var average = 0;
        var min = mem_data[mem_data.length-1];
        var max = mem_data[mem_data.length-1];
        for(var i = ito;i>=ifrom;i--){
            average+=mem_data[i];
        console.log(min,mem_data[i])
            min = Math.min(min,mem_data[i])
            max = Math.max(max,mem_data[i])
        }
        average/=cnt;
        var h_scale = (this.boxMonitor.height-80)/(max-min)
                // console.log("div",mem_data.length-i,mem_data[mem_data.length-1],average,h_scale)
        for(var i = ito;i>=ifrom;i--){
            var j = mem_data.length-i-1;
            drawinfo = drawinfo.concat(-j*20,(average-mem_data[i])*h_scale)
        }
        this.boxMonitorGraph.graphics.clear()
        this.boxMonitorGraph.graphics.drawLines(this.boxMonitorGraph.width,0,drawinfo,"#0f0",1)
        console.log(drawinfo,max,min,average)
    }
    this.boxMonitorGraph.timerLoop(2000,this,function(){
        sendLuaString('return collectgarbage("count")',function(res){
            // console.log(res)
            mem_data.push(res)
            if(mem_data.length>pnt_cnt){
                mem_data.shift()
            }
            redrawMonitor.call(this)
        }.bind(this))
    })
    this.boxMonitorGraph.on(Event.RESIZE,this,redrawMonitor)
}