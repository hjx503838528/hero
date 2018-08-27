//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onaddToStage, this)
    }

    private textField: egret.TextField;
    private con: egret.DisplayObjectContainer;


    private onaddToStage(): void {
        this.con = new egret.DisplayObjectContainer();
        this.con.x = StageUtils.ins().getWidth() / 2;
        this.con.y = StageUtils.ins().getHeight() / 2;
        this.addChild(this.con);

        let bgImg: egret.ImageLoader = new egret.ImageLoader();
        bgImg.once(egret.Event.COMPLETE, (e: egret.Event) => {
            let loader: egret.ImageLoader = e.currentTarget;
            let bmd: egret.BitmapData = loader.data;
            let texture: egret.Texture = new egret.Texture();
            texture._setBitmapData(bmd);
            let bitmap = new egret.Bitmap(texture);
            bitmap.width = StageUtils.ins().getWidth();
            bitmap.height = StageUtils.ins().getHeight();
            this.addChildAt(bitmap, 0);
        }, this);
        bgImg.load("resource/assets/images/bg3.jpg");

        let angle: number = 0;
        let alpha: number = 0.1;
        let rot: egret.Shape;
        for (let i: number = 0; i < 10; i++) {
            rot = new egret.Shape();
            rot.graphics.beginFill(0xffffff, alpha);
            rot.graphics.drawCircle(0, 0, 10);
            rot.graphics.endFill();
            rot.anchorOffsetX = -70;
            rot.anchorOffsetY = rot.height >> 1;
            rot.rotation = angle;
            angle += 36;
            alpha += 0.1;
            this.con.addChild(rot);
        }

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.x = StageUtils.ins().getWidth() / 2 - 50;
        this.textField.y = StageUtils.ins().getHeight() / 2 - 15;
        this.textField.width = 100;
        this.textField.textAlign = "center";


        this.addEventListener(egret.Event.ENTER_FRAME, this.upLoadingData, this);
    }

    private upLoadingData(): void {
        this.con.rotation += 36;
    }

    public onProgress(current: number, total: number): void {
        let progress: number = Math.floor((current / total) * 100);
        this.textField.text = `${progress}%`;
    }
}
