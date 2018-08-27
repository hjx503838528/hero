/**
 */
class Hero extends egret.Sprite {
	public _mcDataFactory: egret.MovieClipDataFactory;
	public _mc: egret.MovieClip;
	public constructor(type: number) {
		super();
		this.init(type);
	}

	private init(type: number): void {
		let data = RES.getRes("hero_json");
		let texture = RES.getRes("hero_png");
		this._mcDataFactory = new egret.MovieClipDataFactory(data, texture);
		this._mc = new egret.MovieClip(this._mcDataFactory.generateMovieClipData("hero" + type));
		this.addChild(this._mc);
		this._mc.gotoAndPlay("stay", -1);
		this._mc.anchorOffsetY = this._mc.height;
	}

	public setIndex(type): void {
		this.removeChild(this._mc);
		this.init(type);
	}

}