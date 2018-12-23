class Target{
	constructor(x,y){
		this.pos=createVector(x,y);
		this.w=20;
		this.h=20;

	}


	draw(ctx){
		ctx.fillStyle="white";
		ctx.fillRect(this.pos.x,this.pos.y,this.w,this.h);
	}
}