class Rocket{
	constructor(dna){
		this.pos=createVector(250,400);
		this.vel=createVector(0,0);
		this.accel=createVector(0,0);
		this.w=5;
		this.h=25;
		this.angle=0;
		if(dna){
			this.dna=dna;
		}else{
			this.dna=new DNA();
		}

		this.fitness=0;
	}



	//takes vector force
	applyForce(force){
		this.accel.add(force);
		let vector=createVectorfromVector(this.pos,this.accel);
		this.angle=this.calculateAngle(this.pos,vector);

	}


	calculateFitness(target){
		var d=getDistance(this.pos.x,this.pos.y,target.x,target.y);
		this.fitness=1/d;

	}


	//from vertical
	calculateAngle(vec1,vec2){
		let x1=vec1.x;
		let y1=vec1.y;
		let x2=vec2.x;
		let y2=vec2.y;

		let xd=-Math.floor(x2-x1);
		let yd=Math.floor(y2-y1);
		// console.log("Xd",xd);
		

		let angle=Math.atan(xd/yd);//radians
		return angle;
	}

	update(count){
		this.updatePhy();
		this.applyForce(this.dna.genes[count]);
	}

	updatePhy(){
		this.vel.add(this.accel);
		this.pos.add(this.vel);
		this.accel.mult(0);
	}


	draw(ctx){
		ctx.save();
		ctx.fillStyle="white";
		ctx.translate(this.pos.x,this.pos.y);
		ctx.rotate(this.angle);
		ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h);
		ctx.restore();

	}

}


