var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var FileChooseViewUI=(function(_super){
		function FileChooseViewUI(){
			
		    this.root=null;
		    this.panMain=null;
		    this.panDir=null;
		    this.btnOk=null;
		    this.inputPath=null;
		    this.btnGo=null;
		    this.boxDrag=null;

			FileChooseViewUI.__super.call(this);
		}

		CLASS$(FileChooseViewUI,'ui.FileChooseViewUI',_super);
		var __proto__=FileChooseViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FileChooseViewUI.uiView);
		}

		STATICATTR$(FileChooseViewUI,
		['uiView',function(){return this.uiView={"type":"Dialog","props":{"y":0,"x":0,"width":1206,"height":750},"child":[{"type":"Image","props":{"width":545,"var":"root","skin":"main/img_win.png","height":404,"centerY":0,"centerX":0,"sizeGrid":"31,6,6,6"},"child":[{"type":"Panel","props":{"y":77,"x":168,"width":354,"height":280},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"main/bgButton2.png","right":0,"left":0,"bottom":0,"sizeGrid":"5,5,5,5"}},{"type":"Image","props":{"y":25,"x":111,"width":389,"skin":"main/imgPrint.png","height":389,"alpha":0.5}}]},{"type":"Panel","props":{"y":77,"x":23,"width":138,"var":"panMain","height":279},"child":[{"type":"Image","props":{"y":0,"x":0,"top":0,"skin":"main/bgButton2.png","right":0,"left":0,"bottom":0,"sizeGrid":"5,5,5,5"}}]},{"type":"Panel","props":{"y":99,"x":168,"width":354,"var":"panDir","vScrollBarSkin":"main/vscroll.png","height":257}},{"type":"Button","props":{"y":365,"x":402,"width":120,"var":"btnOk","skin":"main/btn_blue.png","label":"确定","height":27,"disabled":true,"sizeGrid":"6,6,6,6","labelColors":"#e0e0e0,#e0e0e0,#e0e0e0"}},{"type":"Label","props":{"y":10,"x":14,"text":"选择目录","color":"#e0e0e0"}},{"type":"Label","props":{"y":45,"x":23,"width":48,"valign":"middle","text":"路径","height":22,"color":"#d0d0d0","bgColor":"#505050","align":"center"}},{"type":"TextInput","props":{"y":45,"x":71,"width":425,"var":"inputPath","text":"/","height":22,"color":"#d0d0d0","bgColor":"#202020"}},{"type":"Button","props":{"y":45,"x":490,"var":"btnGo","skin":"main/btn_blue.png","label":"GO","height":22,"sizeGrid":"6,6,6,6","labelColors":"#e0e0e0,#e0e0e0,#e0e0e0"}},{"type":"Box","props":{"var":"boxDrag","top":3,"right":3,"mouseEnabled":true,"left":3,"height":27}},{"type":"Button","props":{"y":8,"x":517,"width":16,"stateNum":"1","skin":"main/img_close.png","name":"close","height":16}},{"type":"Label","props":{"y":77,"x":23,"width":138,"text":"个人收藏","padding":"5,0,,5","height":23,"color":"#d0d0d0","bgColor":"#505050"}},{"type":"Label","props":{"y":77,"x":168,"width":354,"text":"目录视图","padding":"5,0,0,5","height":22,"color":"#d0d0d0","bgColor":"#505050"},"child":[{"type":"Button","props":{"y":1,"x":304,"width":21,"toggle":true,"skin":"main/btn_none.png","selected":true,"height":21,"sizeGrid":"8,8,8,8"},"child":[{"type":"Image","props":{"width":18,"skin":"main/img_fs_2.png","height":17,"centerY":0,"centerX":0}}]},{"type":"Button","props":{"y":1,"x":327,"width":21,"toggle":true,"skin":"main/btn_none.png","selected":false,"height":21,"sizeGrid":"8,8,8,8"},"child":[{"type":"Image","props":{"width":16,"skin":"main/img_fs_1.png","height":16,"centerY":0,"centerX":0}}]}]}]}]};}
		]);
		return FileChooseViewUI;
	})(Dialog);
var LogRowUI=(function(_super){
		function LogRowUI(){
			
		    this.bg=null;
		    this.txtLog=null;

			LogRowUI.__super.call(this);
		}

		CLASS$(LogRowUI,'ui.LogRowUI',_super);
		var __proto__=LogRowUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LogRowUI.uiView);
		}

		STATICATTR$(LogRowUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"right":0,"left":0,"height":52},"child":[{"type":"Button","props":{"var":"bg","top":0,"skin":"main/btn_red.png","sizeGrid":"6,6,6,6","right":0,"left":0,"labelColors":"#e0e0e0,#e0e0e0,#e0e0e0","gray":true,"bottom":0},"child":[{"type":"Button","props":{"width":24,"skin":"main/btn_light_green.png","left":16,"labelColors":"#fff","label":"99+","height":12,"disabled":true,"centerY":0,"sizeGrid":"6,6,6,6"}},{"type":"Label","props":{"var":"txtLog","valign":"middle","text":"[lua print]","left":48,"height":38,"color":"#d0d0d0","centerY":0}}]}]};}
		]);
		return LogRowUI;
	})(View);
var MainViewUI=(function(_super){
		function MainViewUI(){
			
		    this.bgMenu=null;
		    this.menuDoctor=null;
		    this.menuDebug=null;
		    this.menuUI=null;
		    this.txtTitle=null;
		    this.subviews=null;
		    this.doctorView=null;
		    this.panDoc=null;
		    this.btnOpen=null;
		    this.btnSetting=null;
		    this.btnHelp=null;
		    this.btnHistory=null;
		    this.debugView=null;
		    this.boxDebugTop=null;
		    this.btnSandBox=null;
		    this.btnScript=null;
		    this.btnMonitor=null;
		    this.boxSandBox=null;
		    this.boxDebugOpen=null;
		    this.panDebugSrc=null;
		    this.boxDebugCode=null;
		    this.bgFileName=null;
		    this.txtFileName=null;
		    this.panCode=null;
		    this.divCode=null;
		    this.txtLineNum=null;
		    this.boxScript=null;
		    this.boxMonitor=null;
		    this.boxDebugBottom=null;
		    this.boxConsole=null;
		    this.bgConsoleTitle=null;
		    this.btnClear=null;
		    this.btnLog=null;
		    this.btnError=null;
		    this.drgConsole=null;
		    this.btnContinue=null;
		    this.panConsole=null;
		    this.boxConsoleText=null;
		    this.boxConsoleLeft=null;
		    this.boxStack=null;
		    this.panStack=null;
		    this.boxScoop=null;
		    this.panScoop=null;
		    this.uiView=null;

			MainViewUI.__super.call(this);
		}

		CLASS$(MainViewUI,'ui.MainViewUI',_super);
		var __proto__=MainViewUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainViewUI.uiView);
		}

		STATICATTR$(MainViewUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1206,"top":0,"right":0,"left":0,"height":750,"bottom":0},"child":[{"type":"Image","props":{"x":0,"width":72,"var":"bgMenu","top":0,"skin":"main/bgButton.png","bottom":-5,"sizeGrid":"5,5,5,5"}},{"type":"CheckBox","props":{"y":25,"x":5,"var":"menuDoctor","skin":"main/icon_doctor.png","selected":true}},{"type":"CheckBox","props":{"y":105,"x":5,"var":"menuDebug","skin":"main/icon_debug.png"}},{"type":"CheckBox","props":{"y":185,"x":5,"var":"menuUI","skin":"main/icon_ui.png"}},{"type":"Box","props":{"right":0,"left":72,"height":30},"child":[{"type":"Image","props":{"skin":"main/bgButton2.png","sizeGrid":"0,5,0,5","right":0,"left":0,"height":2,"bottom":-2}},{"type":"Label","props":{"y":7,"x":24,"var":"txtTitle","text":"lua博士 - 1111123123123123","right":24,"overflow":"scroll","left":24,"fontSize":16,"color":"#d0d0d0","centerY":0}},{"type":"Button","props":{"width":30,"skin":"main/btn_win.png","right":60,"height":24},"child":[{"type":"Image","props":{"width":16,"skin":"main/img_win_min.png","height":16,"centerY":0,"centerX":0}}]},{"type":"Button","props":{"width":30,"skin":"main/btn_win.png","right":30,"height":24},"child":[{"type":"Image","props":{"width":16,"skin":"main/img_win_max.png","height":16,"centerY":0,"centerX":0}}]},{"type":"Button","props":{"width":30,"skin":"main/btn_win.png","right":0,"height":24},"child":[{"type":"Image","props":{"width":16,"skin":"main/img_win_close.png","height":16,"centerY":0,"centerX":0}}]}]},{"type":"Box","props":{"y":30,"x":72,"var":"subviews","top":30,"right":0,"left":72,"bottom":0},"child":[{"type":"Box","props":{"y":0,"x":0,"visible":true,"var":"doctorView","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"skin":"main/imgPrint.png","centerY":50,"centerX":80}},{"type":"Panel","props":{"var":"panDoc","vScrollBarSkin":"main/vscroll.png","top":0,"right":0,"left":0,"hScrollBarSkin":"main/hscroll.png","bottom":0},"child":[{"type":"Button","props":{"y":63,"x":54,"width":192,"var":"btnOpen","skin":"main/btn_plain.png","labelSize":24,"labelPadding":"50","labelColors":"#828282,#828282,#828282","label":"打开src","height":192,"sizeGrid":"3,3,3,3"},"child":[{"type":"Image","props":{"y":28,"x":54,"skin":"main/btnOpen.png","mouseEnabled":false}}]},{"type":"Button","props":{"y":254,"x":54,"width":192,"var":"btnSetting","skin":"main/btn_plain.png","labelSize":24,"labelPadding":"50","labelColors":"#828282,#828282,#828282","label":"网络","height":192,"sizeGrid":"3,3,3,3"},"child":[{"type":"Image","props":{"y":32,"x":52,"skin":"main/btnPort.png","mouseEnabled":false}}]},{"type":"Button","props":{"y":446,"x":54,"width":192,"var":"btnHelp","skin":"main/btn_plain.png","labelSize":24,"labelPadding":"50","labelColors":"#828282,#828282,#828282","label":"关于","height":192,"sizeGrid":"3,3,3,3"},"child":[{"type":"Image","props":{"y":26,"x":54,"width":76,"skin":"main/btnHelp.png","mouseEnabled":false,"height":90}}]},{"type":"Button","props":{"y":63,"x":244,"width":192,"var":"btnHistory","skin":"main/btn_plain.png","labelSize":24,"labelPadding":"50","labelColors":"#828282,#828282,#828282","label":"历史记录","height":192,"sizeGrid":"3,3,3,3"},"child":[{"type":"Image","props":{"y":28,"x":54,"skin":"main/btnHistory.png","mouseEnabled":false}}]}]}]},{"type":"Box","props":{"y":0,"x":0,"visible":false,"var":"debugView","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"y":0,"var":"boxDebugTop","top":0,"right":0,"left":0,"height":360},"child":[{"type":"Image","props":{"y":0,"x":1092,"width":52,"top":0,"skin":"main/bgButton3.png","right":0,"bottom":0,"sizeGrid":"5,5,5,5"},"child":[{"type":"Button","props":{"width":42,"var":"btnSandBox","top":50,"toggle":true,"skin":"main/btn_sandbox.png","selected":true,"height":42,"centerX":0}},{"type":"Button","props":{"width":42,"var":"btnScript","top":102,"toggle":true,"skin":"main/btn_script.png","height":42,"centerX":0}},{"type":"Button","props":{"width":42,"var":"btnMonitor","top":154,"toggle":true,"skin":"main/btn_monitor.png","height":42,"centerX":0}},{"type":"Image","props":{"width":24,"top":11,"skin":"main/img_fs_1.png","height":24,"centerX":0,"alpha":0.2}},{"type":"Image","props":{"width":32,"top":40,"skin":"main/bgButton.png","sizeGrid":"0,5,0,5","height":1,"centerX":0}}]},{"type":"Box","props":{"var":"boxSandBox","top":0,"right":52,"left":0,"bottom":0},"child":[{"type":"Box","props":{"y":4.9999999,"x":52,"width":201,"var":"boxDebugOpen","top":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"main/bgButton2.png","right":0,"left":0,"height":32,"sizeGrid":"5,5,5,5"},"child":[{"type":"Label","props":{"text":"src目录","left":10,"color":"#d0d0d0","centerY":0}}]},{"type":"Panel","props":{"var":"panDebugSrc","vScrollBarSkin":"main/vscroll.png","top":32,"right":0,"left":0,"bottom":0}}]},{"type":"Box","props":{"y":4.9999999,"var":"boxDebugCode","top":0,"right":0,"left":208,"height":361,"bottom":0},"child":[{"type":"Image","props":{"y":0,"var":"bgFileName","top":0,"skin":"main/bgButton2.png","right":0,"left":0,"height":32,"sizeGrid":"5,5,5,5"},"child":[{"type":"Label","props":{"var":"txtFileName","valign":"middle","text":"没有源文件","right":0,"left":0,"height":21,"fontSize":14,"color":"#b5b5b5","centerY":0,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Panel","props":{"var":"panCode","vScrollBarSkin":"main/vscroll.png","top":32,"right":0,"left":0,"bottom":0},"child":[{"type":"HTMLDivElement","props":{"y":0,"x":5,"width":918,"var":"divCode","height":326}},{"type":"Label","props":{"var":"txtLineNum","padding":"2,2,2,2","left":0,"fontSize":14,"color":"#aaaaaa","bgColor":"#5a5a5a","align":"right"}}]}]},{"type":"Image","props":{"x":201,"width":8,"top":0,"skin":"main/bgButton3.png","name":"c-div,boxDebugOpen,boxDebugCode","bottom":0,"sizeGrid":"5,5,5,5"}}]},{"type":"Box","props":{"var":"boxScript","top":0,"right":52,"left":0,"bottom":0}},{"type":"Box","props":{"var":"boxMonitor","top":0,"right":52,"left":0,"bottom":0}}]},{"type":"Image","props":{"y":360,"skin":"main/bgButton3.png","right":0,"name":"r-div,boxDebugTop,boxDebugBottom","left":0,"height":8,"sizeGrid":"5,5,5,5"}},{"type":"Box","props":{"var":"boxDebugBottom","top":368,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"var":"boxConsole","top":0,"right":0,"left":200,"bottom":0},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bgConsoleTitle","skin":"main/bgButton2.png","sizeGrid":"5,5,5,5","right":0,"mouseThrough":false,"mouseEnabled":true,"left":0,"height":37},"child":[{"type":"Label","props":{"y":10,"x":7,"width":62,"text":"控制台","height":20,"fontSize":14,"color":"#b5b5b5"}},{"type":"Button","props":{"y":0,"x":60,"width":32,"var":"btnClear","skin":"main/btn_clear.png","right":145,"height":32,"centerY":0}},{"type":"Button","props":{"y":0,"x":145,"width":32,"var":"btnLog","toggle":true,"skin":"main/btn_log.png","selected":true,"right":60,"height":32,"centerY":0}},{"type":"Button","props":{"y":0,"x":110,"width":32,"var":"btnError","toggle":true,"skin":"main/btn_error.png","selected":true,"right":95,"mouseThrough":false,"height":32,"centerY":0}},{"type":"Image","props":{"y":0,"x":100,"width":2,"skin":"main/bgButton.png","right":135,"height":28,"centerY":0,"sizeGrid":"5,5,5,5"}},{"type":"Image","props":{"y":0,"x":185,"width":2,"skin":"main/bgButton.png","right":50,"height":28,"centerY":0,"sizeGrid":"5,5,5,5"}},{"type":"Image","props":{"y":0,"x":-897,"width":32,"var":"drgConsole","skin":"main/icon_drag.png","right":10,"height":16,"centerY":0}},{"type":"Image","props":{"width":2,"skin":"main/bgButton.png","right":183,"height":28,"centerY":0,"sizeGrid":"5,5,5,5"}},{"type":"Button","props":{"width":32,"var":"btnContinue","skin":"main/btn_continue.png","right":197,"height":32,"centerY":0}}]},{"type":"Panel","props":{"y":37,"x":0,"var":"panConsole","vScrollBarSkin":"main/vscroll.png","top":37,"right":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"var":"boxConsoleText","right":0,"left":0}}]}]},{"type":"Box","props":{"width":192,"var":"boxConsoleLeft","top":0,"left":0,"bottom":0},"child":[{"type":"VBox","props":{"y":0,"x":0,"var":"boxStack","right":0,"left":0,"height":150},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/bgButton2.png","right":0,"left":0,"height":24,"sizeGrid":"5,5,5,5"},"child":[{"type":"Label","props":{"text":"调用堆栈","left":5,"color":"#d0d0d0","centerY":0}}]},{"type":"Panel","props":{"var":"panStack","vScrollBarSkin":"main/vscroll.png","top":24,"right":0,"left":0,"bottom":0}}]},{"type":"Image","props":{"y":150,"skin":"main/bgButton3.png","right":0,"name":"r-div,boxStack,boxScoop","left":0,"height":8,"sizeGrid":"5,5,5,5"}},{"type":"VBox","props":{"y":158,"x":0,"var":"boxScoop","top":158,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"skin":"main/bgButton2.png","right":0,"left":0,"height":24,"sizeGrid":"5,5,5,5"},"child":[{"type":"Label","props":{"text":"环境变量","left":5,"color":"#d0d0d0","centerY":0}}]},{"type":"Panel","props":{"var":"panScoop","vScrollBarSkin":"main/vscroll.png","top":24,"right":0,"left":0,"bottom":0}}]}]},{"type":"Image","props":{"x":192,"width":8,"top":0,"skin":"main/bgButton3.png","name":"c-div,boxConsoleLeft,boxConsole","bottom":0,"sizeGrid":"5,5,5,5"}}]}]},{"type":"Box","props":{"visible":false,"var":"uiView","top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Panel","props":{"vScrollBarSkin":"main/vscroll.png","top":0,"right":0,"left":0,"hScrollBarSkin":"main/hscroll.png","bottom":0},"child":[{"type":"Image","props":{"y":76,"x":74,"skin":"main/btnHistory.png"}},{"type":"Image","props":{"y":10,"x":10,"skin":"main/btnHistory.png"}}]}]}]}]};}
		]);
		return MainViewUI;
	})(View);
var TestPageUI=(function(_super){
		function TestPageUI(){
			
		    this.btn=null;
		    this.clip=null;
		    this.combobox=null;
		    this.tab=null;
		    this.list=null;
		    this.btn2=null;
		    this.check=null;
		    this.radio=null;
		    this.box=null;

			TestPageUI.__super.call(this);
		}

		CLASS$(TestPageUI,'ui.test.TestPageUI',_super);
		var __proto__=TestPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TestPageUI.uiView);
		}

		STATICATTR$(TestPageUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","height":400}},{"type":"Button","props":{"y":56,"x":41,"width":150,"var":"btn","skin":"comp/button.png","sizeGrid":"4,4,4,4","labelPadding":"0,0,0,50","labelAlign":"left","label":"点我赋值","height":37}},{"type":"Clip","props":{"y":56,"x":401,"var":"clip","skin":"comp/clip_num.png","clipX":10}},{"type":"ComboBox","props":{"y":143,"x":220,"width":200,"var":"combobox","skin":"comp/combobox.png","sizeGrid":"4,20,4,4","selectedIndex":1,"labels":"select1,select2,selecte3","height":23}},{"type":"Tab","props":{"y":96,"x":220,"var":"tab","skin":"comp/tab.png","labels":"tab1,tab2,tab3"}},{"type":"VScrollBar","props":{"y":223,"x":259,"skin":"comp/vscroll.png","height":150}},{"type":"VSlider","props":{"y":223,"x":224,"skin":"comp/vslider.png","height":150}},{"type":"List","props":{"y":68,"x":452,"width":128,"var":"list","vScrollBarSkin":"comp/vscroll.png","repeatX":1,"height":299},"child":[{"type":"Box","props":{"y":0,"x":0,"width":112,"name":"render","height":30},"child":[{"type":"Label","props":{"y":5,"x":26,"width":78,"text":"this is a list","skin":"comp/label.png","name":"label","height":20,"fontSize":14}},{"type":"Clip","props":{"y":2,"x":0,"skin":"comp/clip_num.png","name":"clip","clipX":10}}]}]},{"type":"Button","props":{"y":4,"x":563,"skin":"comp/btn_close.png","name":"close"}},{"type":"Button","props":{"y":112,"x":41,"width":150,"var":"btn2","skin":"comp/button.png","sizeGrid":"4,4,4,4","labelSize":30,"labelBold":true,"label":"点我赋值","height":66}},{"type":"CheckBox","props":{"y":188,"x":220,"var":"check","skin":"comp/checkbox.png","label":"checkBox1"}},{"type":"RadioGroup","props":{"y":61,"x":220,"var":"radio","skin":"comp/radiogroup.png","labels":"radio1,radio2,radio3"}},{"type":"Panel","props":{"y":223,"x":299,"width":127,"vScrollBarSkin":"comp/vscroll.png","height":150},"child":[{"type":"Image","props":{"skin":"comp/image.png"}}]},{"type":"CheckBox","props":{"y":188,"x":326,"skin":"comp/checkbox.png","labelColors":"#ff0000","label":"checkBox2"}},{"type":"Box","props":{"y":197,"x":41,"var":"box"},"child":[{"type":"ProgressBar","props":{"y":70,"width":150,"skin":"comp/progress.png","sizeGrid":"4,4,4,4","name":"progress","height":14}},{"type":"Label","props":{"y":103,"width":137,"text":"This is a Label","skin":"comp/label.png","name":"label","height":26,"fontSize":20}},{"type":"TextInput","props":{"y":148,"width":150,"text":"textinput","skin":"comp/textinput.png","name":"input"}},{"type":"HSlider","props":{"width":150,"skin":"comp/hslider.png","name":"slider"}},{"type":"HScrollBar","props":{"y":34,"width":150,"skin":"comp/hscroll.png","name":"scroll"}}]},{"type":"CheckBox","props":{"y":3,"x":3,"skin":"main/icon_doctor.png"}}]};}
		]);
		return TestPageUI;
	})(View);