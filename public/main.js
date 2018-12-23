const canv=CONSTANTS.canv;
const ctx=CONSTANTS.ctx;
const WIDTH=CONSTANTS.WIDTH;
const HEIGHT=CONSTANTS.HEIGHT;
const popsize=CONSTANTS.popsize;

const lifespan=CONSTANTS.lifespan;

let population=new Population();

let targetVector=CONSTANTS.targetVector;

let count=0;
let generation=1;


let fps=60;
let ups=30;
let up=false;
let down=false;
let mousePressed=false;


// function applyRandomForces(){
	
// 	for(let i=0;i<popsize;i++){
// 	let randX=Math.random()*2-1;
// 	let randY=Math.random()*-1;
// 	randX*=5;
// 	randY*=5;
// 	randX=Math.floor(randX);
// 	randY=Math.floor(randY);
// 	population.rockets[i].applyForce(new Vec(randX,randY));
// 	}
// }
// applyRandomForces();

function update(){
	population.successCount=0;
	population.update(count);
	count++;
	if(count>=lifespan){
		population.evaluate(targetVector);
		// population.calculateSuccess();
		population.selection();
		count=0;
		generation++;
	}
	// console.log("maxFitness: ",population.maxfit);
	if(up){
		for(var i=0;i<30;i++){
			population.successCount=0;
			population.update(count);
			count++;
			if(count>=lifespan){
				population.evaluate(targetVector);
				// population.calculateSuccess();
				population.selection();

				count=0;
				generation++;
			}

		}		
		
	}


}

function draw(ctx,w,h){
	clearScreen(ctx,w,h);
	population.draw(ctx);

	// target.draw(ctx);
	ctx.fillStyle="green";
	ctx.fillRect(targetVector.x-10,targetVector.y-10,20,20);


	handleGUI({
		maxfit:population.maxfit
	});

	if(up){
		for(let i=0;i<30;i++){
				clearScreen(ctx,w,h);
				population.draw(ctx);
				// target.draw(ctx);
				ctx.fillStyle="green";
				ctx.fillRect(targetVector.x-10,targetVector.y-10,20,20);
				handleGUI({
				maxfit:population.maxfit
				});
		}		
	}



}

function clearScreen(ctx,w,h){
	ctx.fillStyle="black";
	ctx.fillRect(0,0,w,h);
}


function fontRenderer(context0,text,x,y){
	context0.fillStyle="white";
	context0.font="20px serif"
	context0.fillText(text,x,y);

}


function keyListener(evt){
	evt.preventDefault();
	let {key}=evt;
	if(key=="ArrowUp"){
		up=true;
	}else if(key=="ArrowDown"){
		up=false;
	}

}


function mouseListener(evt){
	let {buttons}=evt;
	let {clientX,clientY}=evt;
	if(buttons==1 ){
		console.log("clientX",clientX);
		CONSTANTS.targetVector.x=clientX;
		CONSTANTS.targetVector.y=clientY;
			
	}


}


function handleGUI(data){
	const context=document.getElementById('sidepanel').getContext('2d');
	panelWidth=500;
	panelHeight=500;
	context.fillStyle="gray";
	context.fillRect(0,0,panelWidth,panelHeight);

	let {maxfit}=data;
	const FIRST_MARGINX=10;
	const MARGIN_CONSTX=70;

	const FIRST_MARGINY=40;
	const MARGIN_CONSTY=40;

		

	fontRenderer(context,"MAXFIT: ",FIRST_MARGINX,FIRST_MARGINY);
	fontRenderer(context,maxfit,FIRST_MARGINX+MARGIN_CONSTX+20,FIRST_MARGINY);


	let sucess0=population.success;
	fontRenderer(context,"SUCESS %: ",FIRST_MARGINX,FIRST_MARGINY+MARGIN_CONSTY);
	fontRenderer(context,sucess0,FIRST_MARGINX+MARGIN_CONSTX+50,FIRST_MARGINY+MARGIN_CONSTY);
	

	fontRenderer(context,"GENERATION: ",FIRST_MARGINX,FIRST_MARGINY+MARGIN_CONSTY*2);
	fontRenderer(context,generation,FIRST_MARGINX+MARGIN_CONSTX*2,FIRST_MARGINY+MARGIN_CONSTY*2);
		

	context.fillStyle="black";
	context.fillRect(0,450,200,60);
	fontRenderer(context,"dilip98914@gmail.com",FIRST_MARGINX-4,480);

}



window.onload=function(){
		document.addEventListener('mousedown',mouseListener);
		document.addEventListener('keydown',keyListener);
		setInterval(update,1000/ups);
		setInterval(function(){draw(ctx,WIDTH,HEIGHT)},1000/fps);

}



