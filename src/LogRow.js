
(function (_super) {
    var Event = laya.events.Event;
    function LogRow(iserr,log){
        this.__super.call(this);
        this.txtLog.text = log
        this.txtLog.color = iserr?"#ff0000":"#d0d0d0"
        this.bg
    }



    Laya.class(LogRow,"LogRow",_super);
}(LogRowUI));