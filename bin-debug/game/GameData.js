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
 * 游戏数据
 */
var GameData = (function (_super) {
    __extends(GameData, _super);
    function GameData() {
        var _this = _super.call(this) || this;
        _this.index = 1; //第几个英雄
        _this.grade = 0; //分数
        _this.bestGrade = 0; //最佳分数
        return _this;
    }
    GameData.ins = function () {
        return _super.ins.call(this);
    };
    return GameData;
}(BaseClass));
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map