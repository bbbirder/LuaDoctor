class PingPongMapping {
	constructor(){
		this.m_map = {};
	}
	make_trans(a,b){
		this.m_map[a] = this.m_map[a] || {};
		this.m_map[a][b] = true;
	}
	break_trans(a,b){
		this.m_map[a] = this.m_map[a] || {};
		delete this.m_map[a][b];
	}
	for_each_v1(a,func){
		this.m_map[a] = this.m_map[a] || {};
		for(var b in this.m_map[a]) func(b);
	}
	for_each_v2(b,func){
		for(var a in this.m_map)
			if(this.m_map[a][b])
				func(a);
	}
	drop_v1(a){
		delete this.m_map[a];
	}
	drop_v2(b){
		for(var a in this.m_map)
			delete this.m_map[a][b];
	}
	get_trans_v1(a){
		let ret = [];
		this.m_map[a] = this.m_map[a] || {};
		for(var b in this.m_map[a]){
			ret.push(b);
		}
		return ret;
	}
	get_trans_v2(b){
		let ret = [];
		for(var a in this.m_map)
			if(this.m_map[a][b])
				ret.push(a);
		return ret;
	}
}
global.PingPongMapping = PingPongMapping;