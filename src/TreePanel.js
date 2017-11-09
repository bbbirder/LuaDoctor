
function initWithTree(panel,tree,fitem,spacing){
	var addin;
	var box;
	function insertTreeNodeChildren(tn){
		// tnIdx = tnIdx==-1?0:tnIdx;
		for(var k=0;k<tn.childs.length;k++){
			var v = tn.childs[k];
			v.indexs = tn.indexs+","+k;
			v.depth = tn.depth+1;
			v.folded = true;
			var node = fitem(v);
			node.name = v.indexs
			box.addChild(node)
			box.refresh();
		}
	}
	function removeTreeNodeChildren(tn){
		for(var k=box.numChildren-1;k>=0;k--){
			var node = box.getChildAt(k);
			if(node.name.match(RegExp(tn.indexs+".+"))){
				node.removeSelf();
			}
		}
	}
	function updateFoldingState(tn){
		tn.folded?removeTreeNodeChildren(tn)
			:insertTreeNodeChildren(tn);
		addin.width = 0;
		box.refresh()
		addin.width = box.width+30;
	}
	function fold(tn){
		tn.folded = true;
		updateFoldingState(tn);
	}
	function unfold(tn){
		tn.folded = false;
		updateFoldingState(tn);
	}
	function toggle(tn){
		tn.folded = !tn.folded;
		updateFoldingState(tn);
	}
	function navto(indexs){
		indexs = indexs || "0"
		var tn = [tree];
		var arr = indexs.split(",")
		for(var i in arr){
			var v = arr[i]
			tn = tn[v] 
		}
		init(tn);
	}
	function init(tn){
		panel.removeChildByName("boxContainer")
		addin = new Laya.Box();
		addin.dataSource={height:30,name:"1"}
		box = new Laya.VBox();
		box.space = spacing || 0;
		box.name = "boxContainer";
		box.sortItem = function(items){
			return items.sort(function(a,b){
				return a.name>b.name?1:-1;
			})
		}
		box.addChild(addin)
		panel.addChild(box);
        //register interface
        panel.fold = fold;
        panel.unfold = unfold;
        panel.toggle = toggle;
        panel.init = init;
        panel.navto = navto;
		insertTreeNodeChildren(tn)
	}
	tree.indexs = "0";
	tree.depth = -1;
	init(tree);
}