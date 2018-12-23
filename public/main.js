const canv=CONSTANTS.canv;
const ctx=CONSTANTS.ctx;
const WIDTH=CONSTANTS.WIDTH;
const HEIGHT=CONSTANTS.HEIGHT;
const popsize=CONSTANTS.popsize;

const lifespan=CONSTANTS.lifespan;

let population=new Population();

let target=new Target(WIDTH/2,30);

let count=0;


function applyRandomForces(){
	
	for(let i=0;i<popsize;i++){
	let randX=Math.random()*2-1;
	let randY=Math.random()*-1;
	randX*=5;
	randY*=5;
	randX=Math.floor(randX);
	randY=Math.floor(randY);
	population.rockets[i].applyForce(new Vec(randX,randY));
	}
}
applyRandomForces();

function update(){
	population.update(count);
	count++;
	if(count>=lifespan){
		population.evaluate(target.pos);
		population.selection();
		count=0;
	}
	console.log("maxFitness: ",population.maxfit);

}

function draw(ctx,w,h){
	clearScreen(ctx,w,h);
	population.draw(ctx);
	target.draw(ctx);
	handleGUI({
		maxfit:population.maxfit
	});
}

function clearScreen(ctx,w,h){
	ctx.fillStyle="black";
	ctx.fillRect(0,0,w,h);
}


function handleGUI(data){
	const context=document.getElementById('sidepanel').getContext('2d');
	panelWidth=500;
	panelHeight=500;
	context.fillStyle="gray";
	context.fillRect(0,0,panelWidth,panelHeight);

	let {maxfit}=data;

	context.fillStyle="white";
	context.font="20px serif";
	context.fillText("maxfit:",10,40);
	context.fillText(maxfit,70,40);


}



window.onload=function(){
		setInterval(update,1000/30);
		setInterval(function(){draw(ctx,WIDTH,HEIGHT)},1000/30);

}



