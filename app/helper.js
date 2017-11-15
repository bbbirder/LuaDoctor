const {ipcMain} = require("electron");
var os = require("os")
var fs = require("fs")
function content2win_uuid(content){
	var win = BrowserWindow.fromWebContents(content);
	for(var uuid in wins)
		if(win==wins[uuid]) return uuid;
}
// var routers = {};
// routers.lua_string_req = function(msg){
// 	wss_rmt.send(JSON.stringify(msg))
// }
// routers.lua_string_resp = function(msg){
// 	wss_lcl.send(JSON.stringify(msg))
// }
// routers.lua_log = function(msg){
// 	ipcMain.sender.send("lua_log",msg)
// }

// routers.change_port = function(msg){
// 	wss_rmt.close()
// 	wss_rmt = new WebSocketServer({port:msg.port});
// 	wss_rmt.on('connection',function(ws){
// 		console.log('remote connected');
// 		ws.on('message',function(msg){
// 			console.log(msg)
// 		// try{
// 		    msg = JSON.parse(msg);
// 		    var ret = routers[msg.cmd](msg)
// 		    ret.cmd = msg.cmd
// 		    ret.tag = msg.ret
// 		    ws.send(JSON.stringify(ret))
// 		// }catch(err){}
// 		})
// 	})
// }
// routers.exec_shell = function(msg){

// }

var isWin = os.platform()=="win32";

function name_subarr(arr,arr_keys){
	for(var k in arr){
		var new_arr = {};
		for(var k2 in arr_keys){
			new_arr[arr_keys[k2]] = arr[k][k2];
		}
		arr[k] = new_arr
	}
	return arr
}
ipcMain.on("lua_string_req",(event,arg)=>{
	var uuid = content2win_uuid(event.sender);
	try{
		console.log("lua dostring:",arg.str)
		uidmap.for_each_v1(uuid,function(peer_uuid){
			peers[peer_uuid].send(JSON.stringify({
				cmd:"lua_string_req",
				tag:arg.tag,
				str:arg.str
			}))
		})
	}catch(e){}
})

ipcMain.on("get_peers",(event,arg)=>{
	let ret = [];
	for(var peer_uuid in peers) ret.push(peer_uuid);
	event.returnValue = ret;
})
ipcMain.on("get_peers_listened",(event,arg)=>{
	var uuid = content2win_uuid(event.sender);
	event.returnValue = uidmap.get_trans_v1(uuid);
})

ipcMain.on("listen_list_add",(event,arg)=>{
	var uuid = content2win_uuid(event.sender);
	uidmap.make_trans(uuid,arg.uuid)
	event.returnValue = true;
})

ipcMain.on("listen_list_remove",(event,arg)=>{
	var uuid = content2win_uuid(event.sender);
	uidmap.break_trans(uuid,arg.uuid)
	event.returnValue = true;
})

ipcMain.on("main_dir",(event,arg)=>{
	var arr_path = process.env[isWin?"HOMEPATH":"HOME"].split(/[/\\]/);
	var user_name = arr_path[arr_path.length-1];
	event.returnValue = isWin?{childs:name_subarr([
		[user_name,process.env.HOMEPATH],
		["我的电脑","/"],
		["桌面",process.env.HOMEPATH+"/Desktop"],
		["我的文档",process.env.HOMEPATH+"Documents"],
		["a",process.env.HOMEPATH],
		],["name","path"])
	}:{
		childs:name_subarr([
		[user_name,process.env.HOME],
		["应用程序","/Applications"],
		["桌面",process.env.HOME+"/Desktop"],
		["文稿",process.env.HOME+"/Documents"],
		["下载",process.env.HOME+"/Downloads"],
		],["name","path"])
	}
})

ipcMain.on("view_file",(event,msg)=>{
	event.returnValue = {
		path:msg.path,
		data:fs.readFileSync(msg.path).toString(),
	}
})

ipcMain.on("dump_dir",(event,msg)=>{
	function dumpdir(path,tn){
		tn.name = path.split(/[/\\]/).pop();
		tn.childs = [];
		var files = fs.readdirSync(path)
		for(var k in files){
			var file = files[k]
			if(file[0]==".")continue;
			var inf = {}
			inf.name = file
			inf.path = path+"/"+file
			inf.isfile = fs.statSync(inf.path).isFile()
			if(!inf.isfile){
				inf = dumpdir(inf.path,inf)
			}
			tn.childs.push(inf)
		}
		return tn
	}
	event.returnValue = dumpdir(msg.path,{})
})

ipcMain.on("list_dir",(event,msg)=>{
	if(msg.path=="/" && isWin){
		var result = child_process.execSync("wmic logicaldisk get caption\nexit").toString();
		var drivers = result.match(/.*\:/g)
		for(var i in drivers){
			drivers[i] = [drivers[i],drivers[i]+"/",false]
		}
		// cmdproc.stdin.end();
		event.returnValue = {
			disks:{
				childs:name_subarr(drivers,["name","path","isfile"])
			}
		}
	}
	if(!msg.path.slice(-1).match(/[/\\]/))
		msg.path = msg.path+"/";
	var files = [];
	try{
		files = fs.readdirSync(msg.path)
		files = files.filter(function(file){
			return fs.existsSync(msg.path+file) && file[0]!="."
		})
		for(var k in files){
			var file = files[k]
			files[k] = [file,msg.path+file,fs.statSync(msg.path+file).isFile()]
		}
	}catch(e){}
	event.returnValue = {
		dirs:{
			childs:name_subarr(files,["name","path","isfile"])
		}
	}
})
