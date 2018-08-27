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
    };
    Hero.prototype.setIndex = function (type) {
        this.removeChild(this._mc);
        this.init(type);
    };
    return Hero;
}(egret.Sprite));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map