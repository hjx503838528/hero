/**
 * 游戏数据
 */
class GameData extends BaseClass {
	public index: number = 1;//第几个英雄
	public grade: number = 0;//分数
	public bestGrade: number = 0;//最佳分数
	public constructor() {
		super();
	}

	public static ins(): GameData {
		return super.ins() as GameData
	}
}