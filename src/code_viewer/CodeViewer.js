function ParseLuaToInnerData(codelines){
    var lua_words = [
        [/\".*?(\\\".*?)*\"/,  "string"],
        [/\'.*?(\\\'.*?)*\'/,  "string"],
        [/\[\[[\s\S]*?\]\]/,  "string"],
        [/0x[0-9a-zA-Z]+/,"static"],
        [/[0-9]*\.?[0-9]+e?[0-9]*/,"static"],
        [/(nil|true|false|_G|\.\.\.)/,"static"],
        [/\.\./,"pre"],
        [/[_a-zA-Z]+[_a-zA-Z0-9]*\.[_a-zA-Z]+[_a-zA-Z0-9]*/,"var"],
        [/[_a-zA-Z]+[_a-zA-Z0-9]*/,"var"],
        [/--\[\[[\s\S]*\]\]/,    "prom"],
        [/--.*/,  "prom"],
        [/[\+\-\*/%\^\\#]/,"static"],
        [/[\=\~<>]/,"pre"],
        [/[\.:,\(\)\[\]\{\};\'\"]/,"symb"],
        [/[ ]/,"null"],
        [/[\n\r]/, "null"],
        [/[\t]/, "null"],
        [/./,"null"],
    ]
    var color_map = {
        string:"#0f0",
        static:"#f30",
        pre:   "#f08",
        symb:  "#ddd",
        prom:  "#666",
        // null:  "#ff0",
    }
    var lua_pre = [
        "local","function","end",
        "if","then","else","elseif",
        "for","do","while","until","in",
        "return","and","or","not","nil"
    ]
    var lua_predef = [
        "string.sub","string.upper","string.len","string.gfind",
        "string.rep","string.find","string.match","string.char",
        "string.dump","string.gmatch","string.reverse","string.byte",
        "string.format","string.gsub","string.lower","xpcall",
        "package.preload","package.loadlib","package.loaded","package.loaders",
        "package.cpath","package.config","package.path","package.seeall",
        "tostring","print","os.exit","os.setlocale",
        "os.date","os.getenv","os.difftime","os.remove",
        "os.time","os.clock","os.tmpname","os.rename",
        "os.execute","unpack","require","getfenv",
        "setmetatable","next","assert","tonumber",
        "io.lines","io.write","io.close","io.flush",
        "io.open","io.output","io.type","io.read",
        "io.stderr","io.stdin","io.input","io.stdout",
        "io.popen","io.tmpfile","rawequal","collectgarbage",
        "getmetatable","module","rawset","ipairs",
        "math.log","math.max","math.acos","math.huge",
        "math.ldexp","math.pi","math.cos","math.tanh",
        "math.pow","math.deg","math.tan","math.cosh",
        "math.sinh","math.random","math.randomseed","math.frexp",
        "math.ceil","math.floor","math.rad","math.abs",
        "math.sqrt","math.modf","math.asin","math.min",
        "math.mod","math.fmod","math.log10","math.atan2",
        "math.exp","math.sin","math.atan","debug.getupvalue",
        "debug.debug","debug.sethook","debug.getmetatable","debug.gethook",
        "debug.setmetatable","debug.setlocal","debug.traceback","debug.setfenv",
        "debug.getinfo","debug.setupvalue","debug.getlocal","debug.getregistry",
        "debug.getfenv","pcall","table.setn","table.insert",
        "table.getn","table.foreachi","table.maxn","table.foreach",
        "table.concat","table.sort","table.remove","newproxy",
        "type","coroutine.resume","coroutine.yield","coroutine.status",
        "coroutine.wrap","coroutine.create","coroutine.running","_G",
        "select","gcinfo","pairs","rawget",
        "loadstring","_VERSION","dofile",
        "setfenv","load","error","loadfile",
    ]
    var outstring = "<span>";
    // var outstring = "<p style='font:14px;width:100%'><ol><li><span style='color:"+color_map["null"]+"'>1";
    var lines = codelines.split("\n").length;
    var curColor = "";
    while(codelines.length>0){
        var isfound = false;
        for(var idx in lua_words){
            var exp = lua_words[idx][0];
            var res = codelines.match(exp);
            if(res&&res[0]&&!res.index){
                isfound = true;
                var name = lua_words[idx][1];
                var repl = lua_words[idx][2];
                var color = name!="null" && (color_map[name] || "#ddd") || color;
                if(name=="var"){
                    if(lua_pre.indexOf(res[0])!=-1){color="#f08"}
                    if(lua_predef.indexOf(res[0])!=-1){color="#08f"}
                }
                var orilen = res[0].length
                res[0] = res[0].replace(/&/g,"&amp;")
                res[0] = res[0].replace(/\</g,"&lt;")
                res[0] = res[0].replace(/\>/g,"&gt;")
                res[0] = res[0].replace(/ /g,"&nbsp;")
                res[0] = res[0].replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")
                // res[0] = res[0].replace(/\t/g,"&emsp;table")
                res[0] = res[0].replace(/\"/g,"&quot;")
                res[0] = res[0].replace(/[\r]/g,"")
                res[0] = res[0].replace(/[\n]/g,"&nbsp;</span><br/>"+"<span style='color:"+color+"'>")
                // res[0] = res[0].replace(/[\n\r]/g,"&nbsp;<br/>")
                if(curColor!=color && name!="null"){
                    curColor = color;
                    outstring+="</span><span style='color:"+curColor+"'>"
                }
                outstring+=(repl||res[0]);
                codelines = codelines.slice(orilen)
                // console.log(name,res[0],codelines.length)
                break;
            }
        }
        // if(!isfound)alert(codelines)
    }
    return {
        htmlstring:outstring+"</span>",
        linecount:lines
    };
    // return outstring+"</span></il></ol></p>";
};