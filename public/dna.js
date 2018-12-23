class DNA{
	constructor(genes){
		if(genes){
			this.genes=genes;
		}else{
			this.genes=[];
			for(var i=0;i<CONSTANTS.lifespan;i++){
				this.genes[i]=generateRandomVector();
			}
		}
	}


	crossover(partnerDNA){
		let newGenes=[];
		let midIndex=Math.floor(Math.random()*this.genes.length);
		
		for(let i=0;i<this.genes.length;i++){
			if(i>midIndex){
				newGenes[i]=this.genes[i];
			}else{
				newGenes[i]=partnerDNA.genes[i];
			}
		}
		return new DNA(newGenes);
	}


	mutation(){
		for(let i=0;i<this.genes.length;i++){
			if(Math.random()<0.01){
				this.genes[i]=generateRandomVector();
				console.log('mutation done!');
			}
		}
	}



}