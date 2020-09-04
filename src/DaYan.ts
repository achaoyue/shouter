class DaYan extends eui.Component implements  eui.UIComponent {
public pic:eui.Image;
public scoreLabel:eui.Label;


	private animation:DaYanAnimation;
	private tween:egret.Tween;


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
		if(this.tween){
			egret.Tween.pauseTweens(this);
			this.tween = null;
		}
		this.animation = DaYanAnimation.getInstance(this.parent);
		this.x = this.animation.startX;
		this.y = this.animation.startY;
		this.visible = true;

		this.width = 140;
        this.height = 140;
        this.visible = !0;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.alpha = 1;

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
		}else if(new Date().getTime()>this.animation.life){
			this.tween = egret.Tween.get(this).to({
				width: 10,
            	height: 10,
            	alpha: 0
			},1500).call(function(){
				this.init();
			})
		}
		
		console.log("move")
	}

	public getScore():number{
		return this.animation.score;
	}
	

	public end():void{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.move,this);
	}

	public bolm():void{
		if(this.animation.score<0){
			var sound:egret.Sound = RES.getRes("three_mp3");
  			sound.play(0,1);
		}else{
			var sound:egret.Sound = RES.getRes("first_mp3");
  			sound.play(0,1);
		}
		
		
		let num = Math.random()*10+10;
		for(let i=0;i<num;i++){
			let img:eui.Image = new eui.Image();
			img.texture = this.pic.texture;
			img.x = this.x;
			img.y = this.y;
			img.width = this.width;
			img.height = this.height;
			img.anchorOffsetX = this.width / 2;
            img.anchorOffsetY = this.height / 2;
			this.parent.addChild(img);
			
			let r = Math.random()*500;
			let angr = 2 * Math.random() * Math.PI;
			egret.Tween.get(img).to({
                x: Math.cos(angr) * r + this.x,
                y: Math.sin(angr) * r + this.y,
                alpha: 0,
                width: 20,
                height: 20,
                rotation: 360 * Math.random()
            },
            600, egret.Ease.sineInOut).call(function() {
                this.parent.removeChild(this);
            })
		}
	}

	
}

class DaYanAnimation{
	public startX:number;
	public startY:number;
	public speed:number;
	public rotation:number;//角度
	public score:number;
	public life:number;

	public static getInstance(ctx:egret.DisplayObject):DaYanAnimation{
		let animation = new DaYanAnimation();
		animation.startX = -10;
		animation.startY = (ctx.height/2)*Math.random()+40;
		animation.rotation = 180 * Math.random() - 90;
		animation.speed = Math.random()*8+5;
		animation.score = Math.random()*100-50;
		animation.life = Math.random()*1000*15+new Date().getTime();
		return animation;
	}
}