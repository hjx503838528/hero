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
 * Created by yangsong on 2014/12/3.
 * Stage相关工具类
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    /**
     * 构造函数
     */
    function StageUtils() {
        var _this = _super.call(this) || this;
        _this.top = 0; //刘海状态栏高度
        if (StageUtils._uiStage == null) {
            StageUtils._uiStage = new eui.UILayer();
            StageUtils._uiStage.touchEnabled = false;
            StageUtils._uiStage.percentHeight = 100;
            StageUtils._uiStage.percentWidth = 100;
            _this.getStage().addChild(StageUtils._uiStage);
        }
        _this.getStage().maxTouches = 1;
        if (egret.Capabilities.os == "iOS") {
            if ((window.screen.width == 375 && window.screen.height == 812)
                && _this.getStage().stageWidth == 540 && _this.getStage().stageHeight == 1170) {
                //  alert("iphoneX");
                _this.top = 44;
            }
        }
        return _this;
    }
    StageUtils.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 获取游戏的高度
     * @returns {number}
     */
    StageUtils.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    /**
     * 获取游戏宽度
     * @returns {number}
     */
    StageUtils.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    StageUtils.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    StageUtils.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    /**
     * 设置帧频
     * @param value
     */
    StageUtils.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    /**
     * 设置适配方式
     * @param value
     */
    StageUtils.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取唯一UIStage
     * @returns {eui.UILayer}
     */
    StageUtils.prototype.getUIStage = function () {
        return StageUtils._uiStage;
    };
    StageUtils.w = 540;
    StageUtils.h = 930;
    return StageUtils;
}(BaseClass));
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map