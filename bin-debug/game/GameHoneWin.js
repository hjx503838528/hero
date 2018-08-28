var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 主界面
 */
var GameHoneWin = (function (_super) {
    __extends(GameHoneWin, _super);
    function GameHoneWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameHomeSkin";
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameHoneWin.prototype.onAddToStage = function () {
        this.init();
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    GameHoneWin.prototype.init = function () {
        var i = Math.floor(Math.random() * 5 + 1);
        this.bgImg.source = "bg" + i + "_jpg";
        this.moonImg.visible = i == 2 ? true : false; //2图是晚上
        egret.Tween.get(this.startBtn, { loop: true }).to({ y: 570 }, 1000).to({ y: 550 }, 1000);
        this._mc = new Hero(GameData.ins().index);
        this.addChild(this._mc);
        this._mc.x = StageUtils.ins().getWidth() / 2 - this._mc.width / 2;
        this._mc.y = StageUtils.ins().getHeight() - 300 + 2;
    };
    GameHoneWin.prototype.onClick = function (e) {
        var target = e.target;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                target.scaleX = target.scaleY = 0.9;
                break;
            case egret.TouchEvent.TOUCH_END:
                target.scaleX = target.scaleY = 1;
                break;
            case egret.TouchEvent.TOUCH_TAP:
                if (target == this.startBtn) {
                    StageUtils.ins().getUIStage().removeChild(this);
                    StageUtils.ins().getUIStage().addChild(new GameWin);
                }
                else if (target == this.selectBtn) {
                    GameData.ins().index = GameData.ins().index < 4 ? GameData.ins().index + 1 : 0;
                    console.log("第" + GameData.ins().index + "人物");
                    this._mc.setIndex(GameData.ins().index);
                    this._mc.x = StageUtils.ins().getWidth() / 2 - this._mc.width / 2;
                    this._mc.y = StageUtils.ins().getHeight() - 300 + 2;
                }
                break;
        }
    };
    return GameHoneWin;
}(eui.Component));
__reflect(GameHoneWin.prototype, "GameHoneWin");
//# sourceMappingURL=GameHoneWin.js.map