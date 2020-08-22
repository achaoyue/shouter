class MainGame extends eui.Component implements  eui.UIComponent {

public arrow:eui.Image;
public arrow_1:eui.Image;
public score:eui.Label;
public resultLabel:eui.Label;
public aginBtn:eui.Label;



	private pointId:number;
	private lastX = 0;
	private lastY = 0;
	private lastRotation = 0;
	private arrow_1_move:boolean = false;
	private daYanList : DaYan[] = [];
	private scoreNum:number = 0;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toucheStart, this);
		this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toucheMove, this);
		this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.toucheEnd, this);
	}


	protected childrenCreated():void{
		super.childrenCreated();
		StageUtils.getSingtonInstance().startFullscreenAdaptation(640 , 1136, this.resize);
		this.aginBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.init,this);
		this.init();
	}

	private init():void{
		this.aginBtn.visible = false;
		this.resultLabel.visible=false;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		for(let i = 0;i<5;i++){
			let item = new DaYan();
			this.daYanList.push(item);
			this.addChild(item);
		}
		this.scoreNum+=0;
		this.score.text = ""+this.scoreNum;
		setTimeout(this.end,1000*60);
	}

	public resize = ()=>{
        this.height = StageUtils.getSingtonInstance().getHeight();
		this.arrow.y = this.height - 10;
		this.resetArrow();
    }

	private toucheStart(e:egret.TouchEvent):void{
		if(this.arrow_1_move == true){
			//不允许射箭
			return;
		}
		if(this.pointId != null){
			return;
		}
		this.pointId = e.touchPointID;
		this.lastX = e.stageX;
		this.lastY = e.stageY;
		this.lastRotation = this.arrow.rotation;
	}

	private toucheMove(e:egret.TouchEvent):void{
		if(this.pointId != e.touchPointID){
			return;
		}
		let currentX = e.stageX;
		let length = currentX - this.lastX;
		 this.arrow.rotation = length/this.width*180 + this.lastRotation;
		 this.arrow_1.rotation = this.arrow.rotation;
	}

	private toucheEnd(e:egret.TouchEvent):void{
		if(this.pointId != e.touchPointID){
			return;
		}
		this.pointId = null;
		this.arrow_1_move = true;
		this.arrow_1.visible = true;
		console.log(this.arrow.rotation)
	}


	private onEnterFrame(e:egret.Event):void{
		if(!this.arrow_1_move){
			return;
		}

		this.arrow_1.x = this.arrow_1.x + Math.cos((this.arrow.rotation-135)/180*Math.PI)*50
		this.arrow_1.y = this.arrow_1.y + Math.sin((this.arrow.rotation-135)/180*Math.PI)*50

		if(this.arrow_1.x < 0 || this.arrow_1.x > this.width || this.arrow_1.y < 0 || this.arrow_1.y > this.height){
			this.resetArrow();
		}

		this.daYanList.forEach(element => {
			if(this.testhint(element)){
				element.visible = false;
				this.resetArrow();
				this.scoreNum+=element.getScore();
				this.score.text = parseInt(""+this.scoreNum)+"";
				element.init();
			}
		});

	}

	public end= ()=>{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		this.resultLabel.text = "本次游戏得分："+this.score.text;
		this.resultLabel.visible = true;

		this.daYanList.forEach( element => {
			this.removeChild(element);
			element.end();
		});
		this.daYanList = [];
		this.resetArrow();
		this.aginBtn.visible = true;
	}

	private resetArrow():void{
		this.arrow_1_move = false;
		this.arrow_1.x = this.arrow.x;
		this.arrow_1.y=this.arrow.y;
		this.arrow_1.visible = false;
		this.arrow_1.rotation = this.arrow.rotation;
	}
	
	private testhint(dayan:DaYan):boolean{
		return dayan.hitTestPoint(this.arrow_1.x,this.arrow_1.y, true);
	}
	
}