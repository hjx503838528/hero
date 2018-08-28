/**
 * 主界面
 */
class GameHoneWin extends eui.Component {
	public bgImg: eui.Image;
	public mainCon: eui.Group;
	public moonImg: eui.Image;
	public titleImg: eui.Image;
	public startBtn: eui.Group;
	public rect: eui.Image;
	public selectBtn: eui.Image;
	public _mc: Hero;//
	public constructor() {
		super();
		this.skinName = "GameHomeSkin";
		this.percentHeight = 100;
		this.percentWidth = 100;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(): void {
		this.init();
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
		this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
		this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	private init(): void {
		let i: number = Math.floor(Math.random() * 5 + 1);
		this.bgImg.source = `bg${i}_jpg`;
		this.moonImg.visible = i == 2 ? true : false;//2图是晚上

		egret.Tween.get(this.startBtn, { loop: true }).to({ y: 570 }, 1000).to({ y: 550 }, 1000);
		this._mc = new Hero(GameData.ins().index);
		this.addChild(this._mc);
		this._mc.x = StageUtils.ins().getWidth() / 2 - this._mc.width / 2;
		this._mc.y = StageUtils.ins().getHeight() - 300 + 2;
	}

	private onClick(e: egret.TouchEvent): void {
		let target = e.target;
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
				} else if (target == this.selectBtn) {
					GameData.ins().index = GameData.ins().index < 4 ? GameData.ins().index + 1 : 0;
					console.log("第" + GameData.ins().index + "人物");
					this._mc.setIndex(GameData.ins().index);
					this._mc.x = StageUtils.ins().getWidth() / 2 - this._mc.width / 2;
					this._mc.y = StageUtils.ins().getHeight() - 300 + 2;
				}
				break;
		}
	}
}