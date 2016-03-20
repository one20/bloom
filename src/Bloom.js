class Bloom {
	constructor(){
		this.renderer = PIXI.autoDetectRenderer(800, 600,{transparent: true, resolution: 2});
		this.stage = new PIXI.Container();

		this.flower = new Flower();
		this.flower.position.x = 200;
		this.flower.position.y = 600;
		this.stage.addChild(this.flower);

		this.grass = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage('images/grass_texture.png'), this.renderer.width, 200);
		
		this.stage.addChild(this.grass);

		this.renderer.autoResize = true;
		document.body.appendChild(this.renderer.view);
		this.update();
	}

	update(){
		let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		this.renderer.resize(viewportWidth, viewportHeight);
		this.flower.position.x = viewportWidth/2;
		this.flower.position.y = viewportHeight;
		this.flower.update();
		this.grass.y = viewportHeight - 200;
		this.renderer.render(this.stage);
		window.requestAnimationFrame(this.update.bind(this));
	}
}

new Bloom();