class Petal extends PIXI.Sprite {

	constructor(){
		super();
		let texture = PIXI.Texture.fromImage('images/petal.png');
		this.petalImage = new PIXI.Sprite(texture);
		this.petalImage.anchor.y = .5;
		this.addChild(this.petalImage);
		this.angle = 0;
		this.rotate = 6;
		this.speedModifier = (Math.floor(Math.random() *8) + 1)/100;
		this.buttonMode = true;
		this.interactive = true;
		this.plucked = false;

		this.click = this.tap = this.onPluck;
	}

	onPluck(){
		this.plucked = true;
		this.buttonMode = this.interactive = false;
	}

	update(){
		if(!this.plucked){
			if(this.petalImage.x > 0) this.petalImage.x = 0;
			if(this.petalImage.alpha < 1){
				this.petalImage.alpha += .1;
			}
			this.petalImage.rotation = Math.sin(this.angle) * (this.rotate * (Math.PI/180));
			this.angle += this.speedModifier;
		} else {
			if(this.petalImage.x < 100){
				this.petalImage.x += 4;
			}
			if(this.petalImage.alpha > 0){
				this.petalImage.alpha -= .1;
			}
		}
	}

}

class Head extends PIXI.Sprite {
	constructor(){
		super();
		this.numPetals = 20;
		this.petals = [];
		this.generatePetals();
	}

	generatePetals(){
		this.removeChildren();
		for(let a=0;a<this.numPetals;a++){
			let petal = new Petal();
			petal.rotation = a*30;
			this.petals.push(petal);
			this.addChildAt(petal, 0);
		}
	}

	update(){
		let allplucked = true;
		for (let petal of this.petals){
			petal.update();
			if(!petal.plucked){
				allplucked = false;
			}
		}
		if(allplucked){
			this.generatePetals();
		}
	}
}

class Stem extends PIXI.Sprite {
	constructor(){
		super(PIXI.Texture.fromImage('images/stem.png'));
		this.anchor.x = .5;
		this.anchor.y = 1;
		this.angle = 0;
		this.rotate = 6;
	}

	update(){
		this.rotation = Math.sin(this.angle) * (this.rotate * (Math.PI/180));
	 	this.angle += .01;
	}
}

class Flower extends PIXI.Sprite {
	constructor(){
		super();
		this.head = new Head();
		this.stem = new Stem();

		this.addChild(this.stem);
		this.addChild(this.head);
		
		this.scale.x = this.scale.y = .5;
	}

	update(){
		this.head.update();
		this.stem.update();
		let stemHeight = this.stem.height - 30;
		this.head.x = this.stem.x + Math.sin(this.stem.rotation) * stemHeight;
		this.head.y = -(this.stem.y + Math.cos(this.stem.rotation) * stemHeight);
		//this.head.y = -this.stem.height;
	}
}