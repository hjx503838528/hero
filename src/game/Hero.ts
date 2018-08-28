/**
 */
class Hero extends egret.Sprite {
	public _mcDataFactory: egret.MovieClipDataFactory;
	public _mc: egret.MovieClip;
	public _name: egret.TextField;
	public _nameStr: string[] = ["王者啦啦", "王者Top", "铂金哎呦喂", "钻石佳佳", "钻石咔咔"];
	public _nameColor: number[] = [0xff0000, 0xfe6702, 0x343498, 0x6600cd, 0x15d49c];
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
	}

	public setIndex(type): void {
		if (this._mc && this._mc.parent) {
			this._mc.parent.removeChild(this._mc);
		}
		this.init(type);
	}

}