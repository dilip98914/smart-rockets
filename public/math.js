class Vec{
	constructor(x,y){
		this.x=x;
		this.y=y;

	}





	add(vector){
		this.x+=vector.x;
		this.y+=vector.y;
	}

	mult(scaler){
		this.x*=scaler;
		this.y*=scaler;
			
	}


	getMagnitude(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}


	limit(scaler){
		const mag=this.getMagnitude();
		this.x/=mag;
		this.y/=mag;
		this.x*=scaler;
		this.y*=scaler;
		
	}

}


function createVector(x,y){
	return new Vec(x,y);
}


function createVectorfromVector(vec1,vec2){
	let vector=new Vec(0,0);
	vector.x=vec1.x+vec2.x;
	vector.y=vec1.y+vec2.y;
	return vector;

}

function generateRandomVector(){
	let randX=Math.random()*2-1;
	let randY=Math.random()*-1;
	// randX=Math.floor(randX*0.5);
	// randY=Math.floor(randY*0.5);
	return new Vec(randX,randY);
}
function getDistance(x1,y1,x2,y2){
	let xd=x2-x1;
	let yd=y2-y1;
	return Math.sqrt(xd*xd+yd*yd);
}
