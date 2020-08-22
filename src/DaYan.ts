class DaYan extends eui.Component implements  eui.UIComponent {
public pic:eui.Image;
public scoreLabel:eui.Label;


	private animation:DaYanAnimation;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		console.log(this.x+","+this.y)
		super.childrenCreated();
		this.init();
		this.addEventListener(egret.Event.ENTER_FRAME,this.move,this);

	}

	public init():void{
		this.animation = DaYanAnimation.getInstance(this.parent);
		this.x = this.animation.startX;
		this.y = this.animation.startY;
		this.visible = true;
		if(this.animation.score<0){
			this.pic.texture = RES.getRes("pig_png")
		}else{
			this.pic.texture = RES.getRes("bird_png")
		}
		this.scoreLabel.text = parseInt(this.animation.score+"")+"";
	}

	public move(e:egret.Event):void{
		
		this.x = Math.cos((this.animation.rotation/180*Math.PI))* this.animation.speed + this.x;
		this.y = Math.sin(this.animation.rotation/180*Math.PI)* this.animation.speed + this.y;
		this.pic.rotation = this.rotation+1;


		if(this.x > this.parent.width || this.y < 0 || this.y > this.parent.height){
			this.init();
		}
		console.log("move")
	}

	public getScore():number{
		return this.animation.score;
	}
	

	public end():void{

		this.removeEventListener(egret.Event.ENTER_FRAME,this.move,this);
	}

	
}

class DaYanAnimation{
	public startX:number;
	public startY:number;
	public speed:number;
	public rotation:number;//角度
	public score:number;

	public static getInstance(ctx:egret.DisplayObject):DaYanAnimation{
		let animation = new DaYanAnimation();
		animation.startX = -10;
		animation.startY = (ctx.height/2)*Math.random()+40;
		animation.rotation = 180 * Math.random() - 90;
		animation.speed = Math.random()*3+Math.random()*5;
		animation.score = Math.random()*100-50;
		return animation;
	}
}