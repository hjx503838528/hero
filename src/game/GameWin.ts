/**
 * 游戏面板
 */
class GameWin extends eui.Component {
	public bgImg: eui.Image;
	public moonImg: eui.Image;
	public gradeCon: eui.Group;
	public leftRect: eui.Image;
	public rightRect: eui.Image;
	public stick: eui.Rect;
	public red: eui.Rect;
	public overCon: eui.Group;
	public shade: eui.Rect;
	public resultCon: eui.Group;
	public gradeTxt: eui.Label;
	public bestTxt: eui.Label;
	public rankTxt: eui.Label;
	public home: eui.Image;
	public restart: eui.Image;
	public perfectTxt: eui.Label;
	public resultGradeTxt: eui.Label;
	public hero: Hero;
	public stageW: number;
	public stageH: number;
	public timer: egret.Timer;
	private stickH: number = 0;
	private lv: number = 10;
	private isDouble: boolean = false;
	private isCilck: boolean = true;

	public constructor() {
		super();
		this.skinName = "GameSkin";
		this.percentHeight = 100;
		this.percentWidth = 100;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(): void {
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
	}

	//定时器开始
	private timerFunc(): void {
		let maxH: number = this.stageH - 300;
		if (this.stickH < maxH) {
			this.stickH += 10;
			this.stick.height = this.stickH;
		}
	}

	//定时器结束
	private timerComFunc(): void {

	}

	/**初始化界面 */
	public init(): void {
		//随机背景
		let i: number = Math.floor(Math.random() * 5 + 1);
		this.bgImg.source = `bg${i}_jpg`;
		this.moonImg.visible = i == 2 ? true : false;//2图是晚上
		this.isDouble = false;
		this.touchEnabled = true;
		this.overCon.visible = false;
		this.red.visible = true;
		this.leftRect.x = 0;
		this.leftRect.width = 150;
		this.rightRect.width = 100 + Math.floor(Math.random() * 70);
		let max: number = this.stageW - this.leftRect.width - this.rightRect.width - 100;
		let poX: number = this.leftRect.width + Math.floor(max * Math.random()) + 100;
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
	}


	private onClick(e: egret.TouchEvent): void {
		switch (e.target) {
			case this.home:
				StageUtils.ins().getUIStage().removeChild(this);
				StageUtils.ins().getUIStage().addChild(new GameHoneWin);
				break;
			case this.restart:
				this.init();
				break;
		}
	}

	//点击结束
	private onClickStage(e: egret.TouchEvent): void {
		if (e.target == this) {
			this.timer.start();
		}
	}

	private onClickStageEnd(e: egret.TouchEvent): void {
		if (e.target == this) {
			this.touchEnabled = false;
			this.timer.stop();
			this.stick.anchorOffsetX = this.stick.width;
			this.stick.anchorOffsetY = this.stick.height;

			egret.Tween.get(this.stick).to({ rotation: 90 }, 300).call(() => {
				let redDistance: number = this.stick.x + this.stick.height;
				let redEndX: number = this.red.x + this.red.width;
				if (redDistance >= this.red.x && redDistance <= redEndX) {//红的距离
					this.perfectTxt.visible = true;
					this.perfectTxt.alpha = 0;
					this.perfectTxt.x = this.red.x - 50;
					this.perfectTxt.y = this.red.y;
					this.isDouble = true;
					egret.Tween.get(this.perfectTxt).to({ y: 750, alpha: 1 }, 300).call(() => {
						this.perfectTxt.visible = false;
					}, this)
				}

				let moveDistance: number = this.stick.x + this.stick.height;
				let max: number = this.rightRect.x + this.rightRect.width;
				if (moveDistance < this.rightRect.x || moveDistance > max) {
					egret.Tween.get(this.hero).to({ x: moveDistance }, 500).call(this.over, this);
				} else {
					let lastX: number = this.rightRect.x + this.rightRect.width - this.hero.width - 18;
					egret.Tween.get(this.hero).to({ x: lastX }, 500).call(this.run, this);
				}
				this.hero._mc.gotoAndPlay("walk", -1);
				this.hero._mc.anchorOffsetY = this.hero._mc.height;
			}, this);
		}
	}

	//走完
	private over(): void {
		egret.Tween.get(this.hero).to({ y: this.stageH + 100 }, 500).call(() => {
			let tw = egret.Tween.get(this);
			tw.to({ x: 20, y: 20 }, 100, egret.Ease.bounceOut);
			tw.to({ x: 0, y: 0 }, 100, egret.Ease.bounceIn);
			tw.to({ x: 20, y: 20 }, 100, egret.Ease.bounceOut);
			tw.to({ x: 0, y: 0 }, 100, egret.Ease.bounceIn);
			tw.to({ x: 20, y: 20 }, 100, egret.Ease.bounceOut);
			tw.to({ x: 0, y: 0 }, 100, egret.Ease.bounceIn);
			tw.call(this.showOverTip, this);
		}, this);
	}

	private run(): void {
		this.hero._mc.gotoAndPlay("stay", -1);
		this.hero._mc.anchorOffsetY = this.hero._mc.height;
		//得分
		if (this.isDouble) {//双倍
			this.isDouble = false;
			GameData.ins().grade += 2;
		} else {
			GameData.ins().grade++;
		}
		this.gradeTxt.text = `${GameData.ins().grade}`;
		if (GameData.ins().bestGrade < GameData.ins().grade) {//最佳分数
			GameData.ins().bestGrade = GameData.ins().grade;
			this.bestTxt.text = `${GameData.ins().bestGrade}`;
		}

		//调整棍子状态
		this.stick.rotation = 0;
		this.stickH = 0;
		this.stick.height = 0;
		this.stick.x = this.rightRect.width - 1;

		//移动
		let redX: number = this.rightRect.width / 2 - this.red.width / 2;//红点位置
		egret.Tween.get(this.red).to({ x: redX }, 300);
		egret.Tween.get(this.rightRect).to({ x: 0 }, 300);
		egret.Tween.get(this.hero).to({ x: this.rightRect.width - this.hero.width - 16 }, 300);
		egret.Tween.get(this.leftRect).to({ x: -this.leftRect.width - 200 }, 300).call(() => {
			//调换位置
			let leftW: number = this.leftRect.width;
			this.leftRect.x = 0;
			this.leftRect.width = this.rightRect.width;
			this.rightRect.x = this.stageW;
			this.red.x = this.stageW;
			//难度
			this.lv = (10 - Math.ceil(GameData.ins().grade / 10)) * 10;
			//移出
			let data: { width, x } = this.randomX(this.lv, 70, 100);
			this.rightRect.width = data.width;
			egret.Tween.get(this.red).to({ x: data.x + this.rightRect.width / 2 - this.red.width / 2 }, 500);
			egret.Tween.get(this.rightRect).to({ x: data.x }, 500).call(() => {
				this.touchEnabled = true;
			}, this)
		}, this);
	}


	//结果面板
	private showOverTip(): void {
		this.overCon.visible = true;
		this.resultGradeTxt.text = `${GameData.ins().grade}`;
		this.bestTxt.text = `${GameData.ins().bestGrade}`;
	}

	/**
	 * 随机获取
	 * @param minW最小宽度
	 * @param 随机增长范围
	 * @param scope最小范围x
	 * @return width,x
	 */
	private randomX(minW: number, maxW: number, scope: number): { width, x } {
		let data: any = {};
		data.width = minW + Math.floor(Math.random() * maxW);//宽度
		let max: number = this.stageW - this.leftRect.width - data.width - scope;//最大范围
		data.x = this.leftRect.width + Math.floor(max * Math.random()) + scope;//位置
		return data;
	}



	//获取人物位移的位置
	private getHeroX(tag: egret.DisplayObject): number {
		if (!tag) return;
		let heroX: number = tag.x + tag.width - this.hero.width - 16;
		return heroX;
	}

}