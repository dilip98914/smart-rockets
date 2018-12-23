class Population{
	constructor(){
		this.rockets=[];
		this.matingPool=[];
		this.maxfit=0;
		this.successCount=0;
		this.success=0;

		for(let i=0;i<popsize;i++){
			this.rockets[i]=new Rocket();
		}


	}



	calculateSuccess(){
		for(let i=0;i<popsize;i++){
			if(this.rockets[i].completed){
				this.successCount++;
			}
		}
		this.success=this.successCount/popsize;
		this.success*=100;
		console.log('success',this.success);
		// console.log(this.success);
	}


	calculateAndNormalizePopFitness(targetVector){
		for(let i=0;i<popsize;i++){
			this.rockets[i].calculateFitness(targetVector);
		}
		let maxfit=0;
		for(let i=0;i<popsize;i++){
			if(this.rockets[i].fitness>maxfit){
				maxfit=this.rockets[i].fitness;
			}
		}
		this.maxfit=maxfit;
		for(let i=0;i<popsize;i++){
			this.rockets[i].fitness/=maxfit;
		}
		
	}



	evaluate(targetVector){
		this.calculateAndNormalizePopFitness(targetVector);	
		this.matingPool=[];//reseting mating pool array

		for(let i=0;i<popsize;i++){
			let n=this.rockets[i].fitness*100;
			for(let j=0;j<n;j++){
				this.matingPool.push(this.rockets[i]);
			}

		}

	}


	randomIndex(){
		let randomIndex=Math.floor(Math.random()*this.matingPool.length);
		return randomIndex;
	}

	selection(){
		let newRockets=[];

		for(let i=0;i<popsize;i++){
			let parent1DNA=this.matingPool[this.randomIndex()].dna;
			let parent2DNA=this.matingPool[this.randomIndex()].dna;
			let childDNA=parent1DNA.crossover(parent2DNA);
			childDNA.mutation();
			newRockets[i]=new Rocket(childDNA);
		}
		this.rockets=newRockets;
	}





	update(count){
		for(let i=0;i<popsize;i++){
			this.rockets[i].update(count);
		}
		this.calculateSuccess();
	}

	draw(ctx){
		for(let i=0;i<popsize;i++){
			this.rockets[i].draw(ctx);
		}
	}

}