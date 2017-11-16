# LuaDoctor
a wireless debug tool for game script,
published for macos &amp; windows.

already support: 
* cocos-lua

will support: 
* cocos-js
* unity-lua
* unity-js
## Abilities
### real-time log report
Logs will be uploaded into console view when game is running on mobile phone.
### error recognize
Errors will be uploaded and shown in red.
### logs management
You can filter, toggle and watch logs in details easily.
### real-time breakpoint
There are two ways to make a breakpoint:
* modify source <br/>
*&emsp;insert `LuaDoctor.BreakPoint();` into where you want to make a breakpoint,such as:*
```lua
function foo(...)
  ...
  print("enter break point.");
  LuaDoctor.BreakPoint();--lua will be paused when reach this line
  print("continue.");
  ...
end
```
* via console <br/>
*&emsp;You can toggle breakpoint on certain line by **clicking on line-number** of source code view*

when game enters breakpoint,scoop information will be shown on console view, 
and you can click continue button to pass the current breakpoint.
### fetch call stack traceback
Every log can be located on certain line and you can either open third-part editor.
### fetch scoop
When reached break point,local vairent and upvalue can be saw in scoop view.
### eval script on the remote
You can run certain string as codes and gain the result every time you want.
### running state monitor
Running state shows the mem-use curve.You can run a gc procedure manually by clicking a button.
### source upload
one button to upload all modified files onto mobile phone.(hotfixing procedure will be ignored)

## Why Useful
If your project runs on simulator successfully and you may want to test it on a real mobile phone.
This is when you may meet troubles soon.

LuaDoctor was designed for the common issues of mobile testing,which are listed as following:
* hard to view real-time log
* unable to make breakpoint
* unable to view call stack traceback
* unable to view scoop information
* unable to monitor real-time running state
* unable to eval a testing script and gain the useful result
* must build&install project again every time script modified
## Tutorial
Only several steps needed to start the wonderful debugging experience.

**On Game Project:**
1. **copy** supportting files into game project
2. specify **IP address** of LuaDoctor in `config.lua`
3. **invoke** `import "support.init"` in initialization code

**On LuaDoctor:**
1. **select** local source folder

the last,run your game on mobile phone.

## Download
* Mac
   * [mac-x86_64-20171115](#)
* Windows
   * [win-x86_64-20171115](#)
## Author:bbbirder

Thanks for reading this page.

Thanks for supporting LuaDoctor.

Glad to get your feedback.

oicq:502100554

wechat:bbbirder

email:lzy@syujoy.com
