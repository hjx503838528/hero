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
 * 游戏面板
 */
var GameWin = (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super.call(this) || this;
        _this.stickH = 6;
        _this.lv = 10;
        _this.isDouble = false;
        _this.isCilck = true;
        _this.skinName = "GameSkin";
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameWin.prototype.onAddToStage = function () {
        this.stageW = StageUtils.ins().getWidth();
        this.stageH = StageUtils.ins().getHeight();
        //添加人物
        this.hero = new Hero(GameData.ins().index);
        this.addChild(this.hero);
        this.init();
        //事件
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //注册事件侦听器
        this.timer = new egret.Timer(1000 / 60, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageEnd, this);
    };
    //定时器开始
    GameWin.prototype.timerFunc = function () {
        var maxH = this.stageH - 300;
        if (this.stickH < maxH) {
            this.stickH += 8;
            this.stick.height = this.stickH;
        }
    };
    //定时器结束
    GameWin.prototype.timerComFunc = function () {
    };
    /**初始化界面 */
    GameWin.prototype.init = function () {
        //随机背景
        var i = Math.floor(Math.random() * 5 + 1);
        this.bgImg.source = "bg" + i + "_jpg";
        this.moonImg.visible = i == 2 ? true : false; //2图是晚上
        this.isDouble = false;
        this.touchEnabled = true;
        this.overCon.visible = false;
        this.red.visible = true;
        this.leftRect.x = 0;
        this.leftRect.width = 150;
        this.rightRect.width = 100 + Math.floor(Math.random() * 70);
        var max = this.stageW - this.leftRect.width - this.rightRect.width - 100;
        var poX = this.leftRect.width + Math.floor(max * Math.random()) + 100;
        this.rightRect.x = poX;
        this.red.x = this.rightRect.x + this.rightRect.width / 2 - this.red.width / 2;
        this.red.y = this.stageH - this.rightRect.height;
        GameData.ins().grade = 0;
        this.stick.rotation = 0;
        this.stickH = 0;
        this.stick.height = 0;
        this.stick.width = 6;
        this.stick.x = this.leftRect.x + this.leftRect.width - 1;
        if (this.hero) {
            this.hero.x = this.leftRect.x + this.leftRect.width - this.hero.width - 10;
            this.hero.y = this.stageH - this.rightRect.height + 2;
        }
    };
    GameWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.home:
                StageUtils.ins().getUIStage().removeChild(this);
                StageUtils.ins().getUIStage().addChild(new GameHoneWin);
                break;
            case this.restart:
                this.init();
                break;
        }
    };
    //点击结束
    GameWin.prototype.onClickStage = function (e) {
        if (e.target == this) {
            this.timer.start();
        }
    };
    GameWin.prototype.onClickStageEnd = function (e) {
        var _this = this;
        if (e.target == this) {
            this.touchEnabled = false;
            this.timer.stop();
            this.stick.anchorOffsetX = this.stick.width;
            this.stick.anchorOffsetY = this.stick.height;
            egret.Tween.get(this.stick).to({ rotation: 90 }, 300).call(function () {
                var redDistance = _this.stick.x + _this.stick.height;
                var redEndX = _this.red.x + _this.red.width;
                if (redDistance >= _this.red.x && redDistance <= redEndX) {
                    _this.perfectTxt.visible = true;
                    _this.perfectTxt.alpha = 0;
                    _this.perfectTxt.x = _this.red.x - 50;
                    _this.perfectTxt.y = _this.red.y;
                    _this.isDouble = true;
                    egret.Tween.get(_this.perfectTxt).to({ y: 750, alpha: 1 }, 300).call(function () {
                        _this.perfectTxt.visible = false;
                    }, _this);
                }
                var moveDistance = _this.stick.x + _this.stick.height;
                var max = _this.rightRect.x + _this.rightRect.width;
                if (moveDistance < _this.rightRect.x || moveDistance > max) {
                    egret.Tween.get(_this.hero).to({ x: moveDistance }, 500).call(_this.over, _this);
                }
                else {
                    var lastX = _this.rightRect.x + _this.rightRect.width - _this.hero.width - 18;
                    egret.Tween.get(_this.hero).to({ x: lastX }, 500).call(_this.run, _this);
                }
                _this.hero._mc.gotoAndPlay("walk", -1);
                _this.hero._mc.anchorOffsetY = _this.hero._mc.height;
            }, this);
        }
    };
    //走完
    GameWin.prototype.over = function () {
        var _this = this;
        egret.Tween.get(this.hero).to({ y: this.stageH + 100 }, 500).call(function () {
            var tw = egret.Tween.get(_this);
            tw.to({ x: 20, y: 20 }, 100, egret.Ease.bounceOut);
            tw.to({ x: 0, y: 0 }, 100, egret.Ease.bounceIn);
            tw.to({ x: 20, y: 20 }, 100, egret.Ease.bounceOut);
            tw.to({ x: 0, y: 0 }, 100, egret.Ease.bounceIn);
            tw.to({ x: 20, y: 20 }, 100, egret.Ease.bounceOut);
            tw.to({ x: 0, y: 0 }, 100, egret.Ease.bounceIn);
            tw.call(_this.showOverTip, _this);
        }, this);
    };
    GameWin.prototype.run = function () {
        var _this = this;
        this.hero._mc.gotoAndPlay("stay", -1);
        this.hero._mc.anchorOffsetY = this.hero._mc.height;
        //得分
        if (this.isDouble) {
            this.isDouble = false;
            GameData.ins().grade += 2;
        }
        else {
            GameData.ins().grade++;
        }
        this.gradeTxt.text = "" + GameData.ins().grade;
        if (GameData.ins().bestGrade < GameData.ins().grade) {
            GameData.ins().bestGrade = GameData.ins().grade;
            this.bestTxt.text = "" + GameData.ins().bestGrade;
        }
        //调整棍子状态
        this.stick.rotation = 0;
        this.stickH = 0;
        this.stick.height = 0;
        this.stick.x = this.rightRect.width - 1;
        //移动
        var redX = this.rightRect.width / 2 - this.red.width / 2; //红点位置
        egret.Tween.get(this.red).to({ x: redX }, 300);
        egret.Tween.get(this.rightRect).to({ x: 0 }, 300);
        egret.Tween.get(this.hero).to({ x: this.rightRect.width - this.hero.width - 16 }, 300);
        egret.Tween.get(this.leftRect).to({ x: -this.leftRect.width - 200 }, 300).call(function () {
            //调换位置
            var leftW = _this.leftRect.width;
            _this.leftRect.x = 0;
            _this.leftRect.width = _this.rightRect.width;
            _this.rightRect.x = _this.stageW;
            _this.red.x = _this.stageW;
            //难度
            _this.lv = (10 - Math.ceil(GameData.ins().grade / 10)) * 10;
            //移出
            var data = _this.randomX(_this.lv, 70, 100);
            _this.rightRect.width = data.width;
            egret.Tween.get(_this.red).to({ x: data.x + _this.rightRect.width / 2 - _this.red.width / 2 }, 300);
            egret.Tween.get(_this.rightRect).to({ x: data.x }, 300).call(function () {
                _this.touchEnabled = true;
            }, _this);
        }, this);
    };
    //结果面板
    GameWin.prototype.showOverTip = function () {
        this.overCon.visible = true;
        this.resultGradeTxt.text = "" + GameData.ins().grade;
        this.bestTxt.text = "" + GameData.ins().bestGrade;
    };
    /**
     * 随机获取
     * @param minW最小宽度
     * @param 随机增长范围
     * @param scope最小范围x
     * @return width,x
     */
    GameWin.prototype.randomX = function (minW, maxW, scope) {
        var data = {};
        data.width = minW + Math.floor(Math.random() * maxW); //宽度
        var max = this.stageW - this.leftRect.width - data.width - scope; //最大范围
        data.x = this.leftRect.width + Math.floor(max * Math.random()) + scope; //位置
        return data;
    };
    //获取人物位移的位置
    GameWin.prototype.getHeroX = function (tag) {
        if (!tag)
            return;
        var heroX = tag.x + tag.width - this.hero.width - 16;
        return heroX;
    };
    return GameWin;
}(eui.Component));
__reflect(GameWin.prototype, "GameWin");
//# sourceMappingURL=GameWin.js.map