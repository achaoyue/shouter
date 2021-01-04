class MainGame extends eui.Component implements  eui.UIComponent {

public arrow:eui.Image;
public arrow_1:eui.Image;
public tostsImg:eui.Image;
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
	private arrows:Array<eui.Image> = [];
	private lock:boolean = false;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		// this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toucheStart, this);
		// this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toucheMove, this);
		// this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.toucheEnd, this);
		this.parent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toucheTap, this);
	}


	protected childrenCreated():void{
		super.childrenCreated();
		this.tostsImg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.tostsImg.visible = false;
			this.init();
		},this);
		StageUtils.getSingtonInstance().startFullscreenAdaptation(640 , 1136, this.resize);
		this.aginBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.init,this);
		
	}

	private init():void{
		this.arrows = [];
		this.daYanList = [];
		this.aginBtn.visible = false;
		this.resultLabel.visible=false;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		for(let i = 0;i<10;i++){
			let item = new DaYan();
			this.daYanList.push(item);
			this.addChild(item);
		}
		this.scoreNum=0;
		this.score.text = ""+this.scoreNum;
		setTimeout(this.end,1000*60);
	}

	public resize = ()=>{
        this.height = StageUtils.getSingtonInstance().getHeight();
		this.width = StageUtils.getSingtonInstance().getWidth();
		this.arrow.y = this.height - 10;
		this.resetArrow();
    }

	private toucheStart(e:egret.TouchEvent):void{
		// if(this.arrow_1_move == true){
		// 	//不允许射箭
		// 	return;
		// }
		if(this.pointId == null){
			this.pointId = e.touchPointID;
			this.lastX = e.stageX;
			this.lastY = e.stageY;
			this.lastRotation = this.arrow.rotation;
		}
	}

	private toucheMove(e:egret.TouchEvent):void{
		if(this.pointId != e.touchPointID){
			return;
		}
		let currentX = e.stageX;
		let length = currentX - this.lastX;
		this.arrow.rotation = length/this.width*180 + this.lastRotation;
		//  this.arrow_1.rotation = this.arrow.rotation;
	}

	private toucheEnd(e:egret.TouchEvent):void{
		if(this.pointId == e.touchPointID){
			this.pointId = null;
		}
		this.fire();
	}

	private fire(){
		let arrow = new eui.Image();
		arrow.texture = RES.getRes("arrow2_png");
		arrow.rotation = this.arrow.rotation;
		arrow.x = this.arrow.x;
		arrow.y = this.arrow.y;
		arrow.width=140;
		arrow.height = 140;
		arrow.visible = true;
		this.arrows.push(arrow);
		this.addChild(arrow);
	}

	private toucheTap(e:egret.TouchEvent){
		this.arrow.rotation = Math.atan2(e.stageY-this.arrow.y,e.stageX-this.arrow.x)*180/Math.PI+135;
		this.fire();
	}

	private onEnterFrame(e:egret.Event):void{
		// if(!this.arrow_1_move){
		// 	return;
		// }

		for(let i = this.arrows.length-1;i>=0;i--){
			let arrowItem = this.arrows[i];

			arrowItem.x = arrowItem.x + Math.cos((arrowItem.rotation-135)/180*Math.PI)*50
			arrowItem.y = arrowItem.y + Math.sin((arrowItem.rotation-135)/180*Math.PI)*50

			if(arrowItem.x < 0 || arrowItem.x > this.width || arrowItem.y < 0 || arrowItem.y > this.height){
				this.arrows.splice(i,1);
				arrowItem.parent && arrowItem.parent.removeChild(arrowItem);
				return;
			}

			let hit = false;
			this.daYanList.forEach(element => {

				if(this.testhint(element,arrowItem)){
					element.bolm();
					element.visible = false;
					hit = true;
					this.scoreNum+=element.getScore();
					this.score.text = parseInt(""+this.scoreNum)+"";
					element.init();
				}
			});
			if(hit){
				this.arrows.splice(i,1);
				arrowItem.parent && arrowItem.parent.removeChild(arrowItem);
			}
		}

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
		this.arrows.forEach(e=>{
			e.parent && e.parent.removeChild(e);
			
		})
		this.arrows = [];
	}

	private resetArrow():void{
		this.arrow_1_move = false;
		this.arrow_1.x = this.arrow.x;
		this.arrow_1.y=this.arrow.y;
		this.arrow_1.visible = false;
		this.arrow_1.rotation = this.arrow.rotation;
	}
	
	private testhint(dayan:DaYan,arrowItem:eui.Image):boolean{
		return dayan.pic.hitTestPoint(arrowItem.x,arrowItem.y, false);
	}
	
}