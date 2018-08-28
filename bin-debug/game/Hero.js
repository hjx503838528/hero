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
 */
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(type) {
        var _this = _super.call(this) || this;
        _this._nameStr = ["王者啦啦", "王者Top", "铂金哎呦喂", "钻石佳佳", "钻石咔咔"];
        _this._nameColor = [0xff0000, 0xfe6702, 0x343498, 0x6600cd, 0x15d49c];
        _this.init(type);
        return _this;
    }
    Hero.prototype.init = function (type) {
        var data = RES.getRes("hero_json");
        var texture = RES.getRes("hero_png");
        this._mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this._mc = new egret.MovieClip(this._mcDataFactory.generateMovieClipData("hero" + type));
        this.addChild(this._mc);
        this._mc.gotoAndPlay("stay", -1);
        this._mc.anchorOffsetY = this._mc.height;
        this.width = this._mc.width;
        if (!this._name) {
            this._name = new egret.TextField();
            this.addChild(this._name);
        }
        this._name.text = this._nameStr[type];
        this._name.textColor = this._nameColor[type];
        this._name.size = 26;
        this._name.bold = true;
        this._name.y = -(this._mc.height + this._name.height);
        this._name.x = this.width / 2 - this._name.width / 2;
    };
    Hero.prototype.setIndex = function (type) {
        if (this._mc && this._mc.parent) {
            this._mc.parent.removeChild(this._mc);
        }
        this.init(type);
    };
    return Hero;
}(egret.Sprite));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map